import Link from "next/link";
import { getLead, listActions, listActivity, listLeads } from "@/lib/admin/data";
import { leadStatuses, type LeadStatus } from "@/lib/db";
import { updateLead } from "../../actions";
import { ApprovalCard } from "../ApprovalCard";
import { Card, PageHeader, Pill, scoreTone, statusTone, timeAgo } from "../ui";

// Live, per-request data for the owner only; no instant prefetch needed.
export const instant = false;

export const metadata = { title: "Leads" };

type Props = { searchParams: Promise<{ status?: string; id?: string }> };

export default async function LeadsPage({ searchParams }: Props) {
  const { status: s, id } = await searchParams;
  const status = (leadStatuses as readonly string[]).includes(s ?? "") ? (s as LeadStatus) : "all";
  const [leads, lead] = await Promise.all([listLeads(status), id ? getLead(id) : null]);
  const [actions, activity] = lead ? await Promise.all([listActions({ leadId: lead.id }), listActivity(20, lead.id)]) : [[], []];

  return (
    <div className="flex flex-col gap-5 md:h-full">
      <PageHeader title="Leads" />
      <nav className="flex flex-wrap gap-1.5">
        {(["all", ...leadStatuses] as const).map((t) => (
          <Link
            key={t}
            href={t === "all" ? "/admin/leads/" : `/admin/leads/?status=${t}`}
            className={`rounded-full px-3.5 py-1.5 text-[0.8125rem] font-medium capitalize transition ${status === t ? "bg-white text-[var(--hq-night)]" : "bg-white/[0.05] text-white/55 hover:text-white"}`}
          >
            {t}
          </Link>
        ))}
      </nav>

      <div className="grid gap-6 md:min-h-0 md:flex-1 lg:grid-cols-[1fr_1.15fr]">
        {/* The list and the detail each scroll inside their own box; the page stays put */}
        <Card className="divide-y divide-white/[0.06] self-start md:max-h-full md:overflow-y-auto">
          {leads.map((l) => (
            <Link
              key={l.id}
              href={`/admin/leads/?${status !== "all" ? `status=${status}&` : ""}id=${l.id}`}
              className={`grid grid-cols-[2.25rem_1fr_auto] items-center gap-3 px-5 py-4 transition hover:bg-white/[0.03] ${lead?.id === l.id ? "bg-white/[0.05]" : ""}`}
            >
              <span className="grid size-9 place-items-center rounded-full bg-white/[0.06] text-[0.8125rem] font-medium">{l.name.slice(0, 1).toUpperCase()}</span>
              <span className="min-w-0">
                <span className="block truncate text-sm font-medium">
                  {l.name}
                  {l.company && <span className="font-normal text-white/40"> · {l.company}</span>}
                </span>
                <span className="block truncate text-[0.8125rem] text-white/40">
                  {l.service} · {timeAgo(l.created_at)}
                </span>
              </span>
              <span className="flex items-center gap-1.5">
                {l.score !== null && <Pill tone={scoreTone(l.score)}>{l.score}</Pill>}
                <Pill tone={statusTone[l.status]}>{l.status}</Pill>
              </span>
            </Link>
          ))}
          {!leads.length && <p className="px-5 py-8 text-sm text-white/45">No leads here yet.</p>}
        </Card>

        {!lead && (
          <div className="hidden place-items-center rounded-[1.5rem] border border-dashed border-[var(--hq-line)] p-10 text-center text-[var(--hq-muted)] lg:grid">
            Pick a lead on the left to see the brief, their message and the reply draft.
          </div>
        )}

        {lead && (
          <div className="space-y-4 md:min-h-0 md:overflow-y-auto md:pr-1">
            <Card className="p-6">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h2 className="font-display text-2xl font-medium">{lead.name}</h2>
                  <p className="mt-1 text-sm text-white/50">
                    <a href={`mailto:${lead.email}`} className="hover:text-white">
                      {lead.email}
                    </a>
                    {lead.phone && <> · {lead.phone}</>}
                  </p>
                </div>
                {lead.score !== null && (
                  <div className="text-right">
                    <p className="text-3xl font-medium tabular-nums">{lead.score}</p>
                    <p className="text-[0.8125rem] text-white/40">lead score</p>
                  </div>
                )}
              </div>

              {lead.summary && (
                <div className="mt-5 rounded-xl border border-[#F66135]/20 bg-[#F66135]/[0.05] p-4">
                  <p className="text-[0.8125rem] font-medium text-[#FF9470]">What the Sales agent found</p>
                  <p className="mt-2 text-sm leading-relaxed text-white/80">{lead.summary}</p>
                  {lead.score_reason && <p className="mt-2 text-[0.8125rem] text-white/45">Why this score: {lead.score_reason}</p>}
                </div>
              )}

              <dl className="mt-5 grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
                {[
                  ["Service", lead.service],
                  ["Budget", lead.budget],
                  ["Way of working", lead.engagement],
                  ["Company", lead.company],
                  ["Website", lead.website],
                  ["Received", new Date(lead.created_at).toLocaleString("en-GB", { dateStyle: "medium", timeStyle: "short", timeZone: "Asia/Karachi" })],
                ].map(([k, v]) => (
                  <div key={k}>
                    <dt className="text-[0.8125rem] text-white/40">{k}</dt>
                    <dd className="mt-0.5 break-words text-white/85">{v || "—"}</dd>
                  </div>
                ))}
              </dl>

              {lead.message && (
                <div className="mt-5">
                  <p className="text-[0.8125rem] text-white/40">Their message</p>
                  <p className="mt-1 text-sm leading-relaxed whitespace-pre-wrap text-white/80">{lead.message}</p>
                </div>
              )}

              <form action={updateLead} className="mt-6 grid gap-3 border-t border-[var(--hq-line)] pt-5 sm:grid-cols-[10rem_1fr_auto]">
                <input type="hidden" name="id" value={lead.id} />
                <select name="status" defaultValue={lead.status} aria-label="Status" className="rounded-xl border border-white/10 bg-black/30 px-3 py-2.5 text-sm capitalize text-white">
                  {leadStatuses.map((st) => (
                    <option key={st} value={st} className="bg-[var(--hq-panel)]">
                      {st}
                    </option>
                  ))}
                </select>
                <input name="next_step" defaultValue={lead.next_step ?? ""} placeholder="Next step, e.g. call on Friday" aria-label="Next step" className="rounded-xl border border-white/10 bg-black/30 px-3.5 py-2.5 text-sm text-white placeholder:text-white/25" />
                <button type="submit" className="rounded-xl bg-white/[0.08] px-4 py-2.5 text-sm font-medium hover:bg-white/[0.14]">
                  Save
                </button>
              </form>
            </Card>

            {actions.map((a) => (
              <ApprovalCard key={a.id} action={a} />
            ))}

            {activity.length > 0 && (
              <Card className="p-5">
                <p className="font-display font-medium">History</p>
                <ol className="mt-3 space-y-2">
                  {activity.map((a) => (
                    <li key={a.id} className="flex justify-between gap-4 text-sm">
                      <span className="text-white/70">{a.message}</span>
                      <span className="shrink-0 text-[0.8125rem] text-white/35">{timeAgo(a.created_at)}</span>
                    </li>
                  ))}
                </ol>
              </Card>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
