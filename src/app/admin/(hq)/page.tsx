import Link from "next/link";
import { departments } from "@/lib/db";
import { getOverview, listActions, listActivity, listLeads } from "@/lib/admin/data";
import { ApprovalCard } from "./ApprovalCard";
import { Card, DEPTS, LiveDot, NotConfigured, Pill, scoreTone, statusTone, timeAgo } from "./ui";

export const metadata = { title: "Overview" };

function greeting() {
  // Pakistan time, since that's where the owner works from.
  const h = Number(new Intl.DateTimeFormat("en-GB", { hour: "numeric", hour12: false, timeZone: "Asia/Karachi" }).format(new Date()));
  return h < 12 ? "Good morning" : h < 17 ? "Good afternoon" : "Good evening";
}

export default async function OverviewPage() {
  const [o, pending, activity, leads] = await Promise.all([getOverview(), listActions({ status: "pending", limit: 4 }), listActivity(12), listLeads()]);
  if (!o.configured) return <NotConfigured />;

  const kpis = [
    { label: "Waiting for you", value: o.pending, hint: "approvals", accent: o.pending > 0 },
    { label: "New leads", value: o.leads.new, hint: "not reviewed yet" },
    { label: "Leads this week", value: o.leads.thisWeek, hint: "last 7 days" },
    { label: "Open pipeline", value: o.leads.open, hint: `${o.leads.won} won so far` },
  ];

  return (
    <div className="space-y-10">
      <div>
        <p className="flex items-center gap-2 text-xs font-semibold text-white/45">
          <LiveDot /> {departments.filter((d) => DEPTS[d].live).length} of {departments.length} agents live
        </p>
        <h1 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
          {greeting()}, Asad.{" "}
          <span className="bg-gradient-to-r from-[#FF9C6E] to-[#F66135] bg-clip-text text-transparent">
            {o.pending > 0 ? `${o.pending} thing${o.pending === 1 ? "" : "s"} need${o.pending === 1 ? "s" : ""} you.` : "All clear."}
          </span>
        </h1>
      </div>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {kpis.map((k) => (
          <Card key={k.label} className={`p-5 ${k.accent ? "border-[#F66135]/30 bg-[#F66135]/[0.06]" : ""}`}>
            <p className="text-xs font-semibold text-white/50">{k.label}</p>
            <p className="mt-3 text-4xl font-extrabold tracking-tight tabular-nums">{k.value}</p>
            <p className="mt-1 text-xs text-white/35">{k.hint}</p>
          </Card>
        ))}
      </div>

      <section>
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold tracking-wide text-white/70 uppercase">Departments</h2>
          <Link href="/admin/agents/" className="text-xs font-semibold text-white/45 hover:text-white">
            All agents →
          </Link>
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {departments.map((d) => {
            const dept = DEPTS[d];
            const s = o.byDept[d];
            return (
              <Card key={d} className="relative overflow-hidden p-5">
                <span aria-hidden="true" className="absolute -top-10 -right-10 size-28 rounded-full opacity-25 blur-2xl" style={{ background: dept.hue }} />
                <div className="relative flex items-center justify-between">
                  <p className="font-extrabold">{dept.name}</p>
                  {dept.live ? (
                    <Pill tone="green">
                      <LiveDot /> Live
                    </Pill>
                  ) : (
                    <Pill>Coming soon</Pill>
                  )}
                </div>
                <p className="relative mt-2 text-[0.8125rem] leading-relaxed text-white/50">{dept.role}</p>
                <div className="relative mt-4 flex gap-4 text-xs text-white/45">
                  <span>
                    <b className="text-white tabular-nums">{s.pending}</b> waiting
                  </span>
                  <span>
                    <b className="text-white tabular-nums">{s.done7d}</b> done this week
                  </span>
                </div>
                {s.last && <p className="relative mt-3 truncate border-t border-white/[0.06] pt-3 text-xs text-white/40">{s.last}</p>}
              </Card>
            );
          })}
        </div>
      </section>

      <div className="grid gap-8 xl:grid-cols-[1.4fr_1fr]">
        <section>
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold tracking-wide text-white/70 uppercase">Needs your approval</h2>
            <Link href="/admin/approvals/" className="text-xs font-semibold text-white/45 hover:text-white">
              Open queue →
            </Link>
          </div>
          <div className="mt-4 space-y-3">
            {pending.length ? (
              pending.map((a) => <ApprovalCard key={a.id} action={a} />)
            ) : (
              <Card className="p-6 text-sm text-white/45">Nothing waiting. When an agent drafts a reply or a post, it lands here first.</Card>
            )}
          </div>
        </section>

        <div className="space-y-8">
          <section>
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold tracking-wide text-white/70 uppercase">Latest leads</h2>
              <Link href="/admin/leads/" className="text-xs font-semibold text-white/45 hover:text-white">
                All leads →
              </Link>
            </div>
            <Card className="mt-4 divide-y divide-white/[0.06]">
              {leads.slice(0, 5).map((l) => (
                <Link key={l.id} href={`/admin/leads/?id=${l.id}`} className="flex items-center gap-3 px-5 py-3.5 transition hover:bg-white/[0.03]">
                  <span className="grid size-9 shrink-0 place-items-center rounded-full bg-white/[0.06] text-xs font-bold">{l.name.slice(0, 1).toUpperCase()}</span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-semibold">{l.name}</span>
                    <span className="block truncate text-xs text-white/40">
                      {l.service} · {timeAgo(l.created_at)}
                    </span>
                  </span>
                  {l.score !== null && <Pill tone={scoreTone(l.score)}>{l.score}</Pill>}
                  <Pill tone={statusTone[l.status]}>{l.status}</Pill>
                </Link>
              ))}
              {!leads.length && <p className="px-5 py-6 text-sm text-white/45">No leads yet. New website inquiries appear here automatically.</p>}
            </Card>
          </section>

          <section>
            <h2 className="text-sm font-bold tracking-wide text-white/70 uppercase">Activity</h2>
            <ol className="mt-4 space-y-3 border-l border-white/[0.08] pl-5">
              {activity.map((a) => (
                <li key={a.id} className="relative">
                  <span className="absolute top-1.5 -left-[1.4rem] size-2 rounded-full" style={{ background: DEPTS[a.department]?.hue ?? "#888" }} />
                  <p className="text-sm text-white/75">{a.message}</p>
                  <p className="text-xs text-white/35">
                    {DEPTS[a.department]?.name ?? a.department} · {timeAgo(a.created_at)}
                  </p>
                </li>
              ))}
              {!activity.length && <li className="text-sm text-white/45">Quiet so far.</li>}
            </ol>
          </section>
        </div>
      </div>
    </div>
  );
}
