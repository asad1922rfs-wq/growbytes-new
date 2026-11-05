import Link from "next/link";
import type { AgentAction } from "@/lib/db";
import { approveAction, rejectAction } from "../actions";
import { DEPTS, Pill, timeAgo } from "./ui";

const field =
  "w-full rounded-xl border border-[var(--hq-line)] bg-[var(--hq-night)]/60 px-3.5 py-2.5 text-[0.9375rem] text-white outline-none focus:border-[var(--hq-operations)]/60 disabled:opacity-70";

const kindLabel: Record<string, string> = { email_reply: "Email reply", social_post: "Social post", task: "Task", note: "Note" };

/** One agent proposal. Drafts are editable before you approve them. */
export function ApprovalCard({ action }: { action: AgentAction }) {
  const dept = DEPTS[action.department];
  const p = action.payload as Record<string, string>;
  const pending = action.status === "pending";
  return (
    <form action={approveAction} className="relative overflow-hidden rounded-[1.25rem] border border-[var(--hq-line)] bg-[var(--hq-panel)] p-5 sm:p-6">
      <span aria-hidden="true" className="absolute inset-y-0 left-0 w-1" style={{ background: dept.hue }} />
      <input type="hidden" name="id" value={action.id} />
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.8125rem] text-[var(--hq-muted)]">
        <span className="font-medium text-white">{dept.agent}</span>
        <span>{kindLabel[action.kind] ?? action.kind}</span>
        <span>{timeAgo(action.created_at)}</span>
        {!pending && (
          <span className="ml-auto">
            <Pill tone={action.status === "failed" || action.status === "rejected" ? "red" : "green"}>{action.status}</Pill>
          </span>
        )}
      </div>
      <p className="mt-2 font-display text-xl font-medium tracking-tight">{action.title}</p>
      {action.lead_id && action.lead_name && (
        <Link href={`/admin/leads/?id=${action.lead_id}`} className="mt-1 inline-block text-[0.8125rem] text-[var(--hq-muted)] underline-offset-4 hover:text-white hover:underline">
          Open {action.lead_name}&rsquo;s lead
        </Link>
      )}

      {action.kind === "email_reply" ? (
        <div className="mt-5 space-y-2.5">
          <div className="grid gap-2.5 sm:grid-cols-[1fr_1.6fr]">
            <input name="to" defaultValue={p.to} disabled={!pending} aria-label="To" className={field} />
            <input name="subject" defaultValue={p.subject} disabled={!pending} aria-label="Subject" className={field} />
          </div>
          <textarea name="body" defaultValue={p.body} disabled={!pending} rows={9} aria-label="Email body" className={`${field} leading-relaxed`} />
        </div>
      ) : action.kind === "social_post" ? (
        <div className="mt-5 grid gap-4 sm:grid-cols-[minmax(0,14rem)_1fr]">
          {Array.isArray(p.images) && p.images.length > 1 ? (
            <div className="flex snap-x gap-2 overflow-x-auto pb-1" aria-label={`Carousel, ${p.images.length} slides`}>
              {(p.images as string[]).map((src, i) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img key={src} src={src} alt={`Slide ${i + 1}`} className="aspect-[4/5] w-full shrink-0 snap-start rounded-xl border border-[var(--hq-line)] object-cover" />
              ))}
            </div>
          ) : p.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={p.image} alt="The post image" className="aspect-[4/5] w-full rounded-xl border border-[var(--hq-line)] object-cover" />
          ) : null}
          <div className="space-y-2">
            <textarea name="text" defaultValue={p.text} disabled={!pending} rows={8} aria-label="Caption" className={`${field} leading-relaxed`} />
            <p className="text-[0.8125rem] text-[var(--hq-dim)]">Goes to the Facebook Page and Instagram{p.when ? `, planned for ${p.when}` : ""}.</p>
          </div>
        </div>
      ) : (
        p.text && <textarea name="text" defaultValue={p.text} disabled={!pending} rows={6} aria-label="Content" className={`${field} mt-5 leading-relaxed`} />
      )}

      {pending ? (
        <div className="mt-5 flex flex-wrap items-center gap-2">
          <button type="submit" className="rounded-xl bg-[#D2461F] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#C2401B]">
            {action.kind === "email_reply" ? "Approve and send" : action.kind === "social_post" ? "Approve post" : "Approve"}
          </button>
          <button formAction={rejectAction} className="rounded-xl px-4 py-2.5 text-sm font-medium text-[var(--hq-muted)] transition-colors hover:bg-white/5 hover:text-white">
            Reject
          </button>
          {action.kind === "email_reply" && <span className="text-[0.8125rem] text-[var(--hq-dim)]">Edit anything first. A copy goes to info@growbytes.co.</span>}
        </div>
      ) : (
        action.result && <p className="mt-4 text-sm text-[var(--hq-muted)]">{action.result}</p>
      )}
    </form>
  );
}
