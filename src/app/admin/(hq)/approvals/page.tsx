import { listActions } from "@/lib/admin/data";
import { ApprovalCard } from "../ApprovalCard";
import { DecisionDesk } from "../DecisionDesk";
import { DEPTS, PageHeader, Pill, timeAgo } from "../ui";

// Live, per-request data for the owner only; no instant prefetch needed.
export const instant = false;

export const metadata = { title: "Approvals" };

export default async function ApprovalsPage() {
  const [pending, recent] = await Promise.all([listActions({ status: "pending", limit: 100 }), listActions({ limit: 40 })]);
  const decided = recent.filter((a) => a.status !== "pending");
  return (
    <div className="flex flex-col gap-6 md:h-full">
      <PageHeader
        title={pending.length ? `${pending.length} waiting for you` : "Nothing waiting"}
        lead="Agents never send an email, publish a post or message a client on their own. It only goes out when you approve it."
      />
      <div className="grid gap-6 md:min-h-0 md:flex-1 lg:grid-cols-[1.5fr_1fr]">
        {/* One decision at a time; the card scrolls inside itself if a draft is long */}
        <section aria-label="Waiting for you" className="md:min-h-0 md:overflow-y-auto md:pr-1">
          {pending.length ? (
            <DecisionDesk>
              {pending.map((a) => (
                <ApprovalCard key={a.id} action={a} />
              ))}
            </DecisionDesk>
          ) : (
            <div className="hq-glass rounded-[1.5rem] p-6 text-[var(--hq-muted)]">All caught up. New drafts from your agents appear here.</div>
          )}
        </section>

        <section aria-labelledby="decided" className="hq-glass hq-glass-dim flex flex-col rounded-[1.5rem] md:min-h-0">
          <h2 id="decided" className="font-display px-6 pt-5 pb-3 text-2xl">
            Recently decided
          </h2>
          <ol className="space-y-3 px-6 pb-6 md:min-h-0 md:flex-1 md:overflow-y-auto">
            {decided.map((a) => (
              <li key={a.id} className="flex items-start gap-3">
                <span className="mt-2 size-2 shrink-0 rounded-full" style={{ background: DEPTS[a.department].hue }} />
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-white">{a.title}</span>
                  <span className="block truncate text-[0.875rem] text-[var(--hq-dim)]">{a.result ?? a.status}</span>
                </span>
                <span className="flex shrink-0 flex-col items-end gap-1">
                  <Pill tone={a.status === "failed" || a.status === "rejected" ? "red" : "green"}>{a.status}</Pill>
                  <span className="text-[0.8125rem] text-[var(--hq-dim)]">{timeAgo(a.decided_at ?? a.created_at)}</span>
                </span>
              </li>
            ))}
            {!decided.length && <li className="text-[var(--hq-muted)]">Nothing decided yet.</li>}
          </ol>
        </section>
      </div>
    </div>
  );
}
