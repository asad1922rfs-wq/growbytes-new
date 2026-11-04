import Link from "next/link";
import type { AgentAction } from "@/lib/db";
import { approveAction, rejectAction } from "../actions";
import { DEPTS, Pill, timeAgo } from "./ui";

const field = "w-full rounded-xl border border-white/10 bg-black/30 px-3.5 py-2.5 text-sm text-white outline-none focus:border-[#F66135]/60 focus:ring-2 focus:ring-[#F66135]/20";

/** One agent proposal. Email drafts are editable before you approve them. */
export function ApprovalCard({ action }: { action: AgentAction }) {
  const dept = DEPTS[action.department];
  const p = action.payload as Record<string, string>;
  const pending = action.status === "pending";
  return (
    <form action={approveAction} className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-5">
      <input type="hidden" name="id" value={action.id} />
      <div className="flex flex-wrap items-center gap-2">
        <span className="size-2 rounded-full" style={{ background: dept.hue }} />
        <span className="text-xs font-bold text-white/70">{dept.name} agent</span>
        <span className="text-xs text-white/30">· {timeAgo(action.created_at)}</span>
        <span className="ml-auto">
          {pending ? <Pill tone="orange">Needs you</Pill> : <Pill tone={action.status === "failed" || action.status === "rejected" ? "red" : "green"}>{action.status}</Pill>}
        </span>
      </div>
      <p className="mt-3 font-bold">{action.title}</p>
      {action.lead_id && action.lead_name && (
        <Link href={`/admin/leads/?id=${action.lead_id}`} className="mt-1 inline-block text-xs text-white/45 hover:text-white">
          Lead: {action.lead_name} →
        </Link>
      )}

      {action.kind === "email_reply" ? (
        <div className="mt-4 space-y-2.5">
          <div className="grid gap-2.5 sm:grid-cols-[1fr_1.6fr]">
            <input name="to" defaultValue={p.to} disabled={!pending} aria-label="To" className={field} />
            <input name="subject" defaultValue={p.subject} disabled={!pending} aria-label="Subject" className={field} />
          </div>
          <textarea name="body" defaultValue={p.body} disabled={!pending} rows={8} aria-label="Email body" className={`${field} leading-relaxed`} />
        </div>
      ) : (
        p.text && <textarea name="text" defaultValue={p.text} disabled={!pending} rows={5} aria-label="Content" className={`${field} mt-4 leading-relaxed`} />
      )}

      {pending ? (
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <button type="submit" className="rounded-xl bg-[#D2461F] px-4 py-2.5 text-sm font-bold text-white transition hover:bg-[#C2401B]">
            {action.kind === "email_reply" ? "Approve & send" : "Approve"}
          </button>
          <button formAction={rejectAction} className="rounded-xl bg-white/[0.06] px-4 py-2.5 text-sm font-semibold text-white/70 transition hover:bg-white/10 hover:text-white">
            Reject
          </button>
          {action.kind === "email_reply" && <span className="text-xs text-white/35">Edit anything above first. A copy goes to info@.</span>}
        </div>
      ) : (
        action.result && <p className="mt-3 text-xs text-white/45">{action.result}</p>
      )}
    </form>
  );
}
