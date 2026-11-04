import Link from "next/link";
import { leadStatuses } from "@/lib/db";
import { getOverview, listActions, listActivity, listOrders } from "@/lib/admin/data";
import { dropOrder } from "../actions";
import { ApprovalCard } from "./ApprovalCard";
import { CommandBar } from "./CommandBar";
import { DecisionDesk } from "./DecisionDesk";
import { OrgMap } from "./OrgMap";
import { Dock } from "./Dock";
import { DEPTS, NotConfigured, timeAgo } from "./ui";

// Live, per-request data for the owner only; no instant prefetch needed.
export const instant = false;

export const metadata = { title: "Command room" };

function greeting() {
  // Pakistan time, where the owner works from.
  const h = Number(new Intl.DateTimeFormat("en-GB", { hour: "numeric", hour12: false, timeZone: "Asia/Karachi" }).format(new Date()));
  return h < 5 ? "Working late" : h < 12 ? "Good morning" : h < 17 ? "Good afternoon" : "Good evening";
}

const stageLabel: Record<string, string> = { new: "New", qualified: "Qualified", contacted: "Contacted", proposal: "Proposal", won: "Won", lost: "Lost" };

export default async function CommandRoom() {
  const [o, pending, activity, orders] = await Promise.all([getOverview(), listActions({ status: "pending", limit: 20 }), listActivity(10), listOrders("open", 8)]);
  if (!o.configured) return <NotConfigured />;

  const flow = leadStatuses.filter((s) => s !== "lost");
  const flowMax = Math.max(1, ...flow.map((s) => o.pipeline[s]));
  const line =
    o.pending > 0
      ? `${o.pending} decision${o.pending === 1 ? " is" : "s are"} waiting on your desk.`
      : orders.length
        ? `Your team is working on ${orders.length} order${orders.length === 1 ? "" : "s"}.`
        : "Your company is quiet. Give it something to do.";

  // What the AI core says, in turn.
  const lines = [
    `${greeting()}, Asad. ${line}`,
    ...orders.slice(0, 2).map((ord) => `${DEPTS[ord.department].name} has your order: ${ord.text}`),
    ...activity.slice(0, 3).map((a) => a.message),
  ];

  const deskPanel = pending.length ? (
      <DecisionDesk>
        {pending.map((a) => (
          <ApprovalCard key={a.id} action={a} />
        ))}
      </DecisionDesk>
    ) : (
      <p className="text-[var(--hq-muted)]">Your desk is clear. Drafts from your agents land here before anything goes out.</p>
    );

  const pipelinePanel = (
    <>
      <ol className="grid grid-cols-5 gap-1.5">
        {flow.map((s) => (
          <li key={s}>
            <Link href={`/admin/leads/?status=${s}`} className="group block">
              <span className="flex h-20 items-end rounded-xl bg-white/[0.03] p-1.5">
                <span
                  className="block w-full rounded-lg transition-colors group-hover:brightness-125"
                  style={{ height: `${Math.max(8, (o.pipeline[s] / flowMax) * 100)}%`, background: o.pipeline[s] === 0 ? "transparent" : s === "won" ? "var(--hq-projects)" : s === "new" ? "var(--hq-sales)" : "rgb(246 97 53 / 0.4)" }}
                />
              </span>
              <span className="mt-2 block text-xl text-white tabular-nums">{o.pipeline[s]}</span>
              <span className="block text-[0.875rem] text-[var(--hq-muted)]">{stageLabel[s]}</span>
            </Link>
          </li>
        ))}
      </ol>
      <p className="mt-4 text-[0.9375rem] text-[var(--hq-dim)]">
        {o.leads.thisWeek} new this week, {o.pipeline.lost} closed as lost.{" "}
        <Link href="/admin/leads/" className="text-[var(--hq-muted)] underline underline-offset-4 hover:text-white">
          Open leads
        </Link>
      </p>
    </>
  );

  const activityPanel = (
    <ol className="space-y-4">
      {activity.map((a) => (
        <li key={a.id} className="grid grid-cols-[0.5rem_1fr_auto] items-baseline gap-3">
          <span className="size-2 translate-y-[-1px] rounded-full" style={{ background: DEPTS[a.department]?.hue ?? "var(--hq-dim)" }} />
          <span className="text-[var(--hq-muted)]">{a.message}</span>
          <span className="text-[0.875rem] whitespace-nowrap text-[var(--hq-dim)]">{timeAgo(a.created_at)}</span>
        </li>
      ))}
      {!activity.length && <li className="text-[var(--hq-muted)]">Nothing yet.</li>}
    </ol>
  );

  return (
    <div className="flex flex-col gap-4 md:h-full">
      <h1 className="sr-only">
        {greeting()}, Asad. {line}
      </h1>

      {/* The map fills whatever height is left, so the room always fits one screen */}
      <section aria-label="Your organisation" className="relative md:min-h-0 md:flex-1 md:[container-type:size]">
        <OrgMap o={o} lines={lines} />
      </section>

      <Dock
        tabs={[
          { id: "desk", label: "Your desk", count: pending.length, content: deskPanel },
          { id: "pipeline", label: "Pipeline", content: pipelinePanel },
          { id: "log", label: "What happened", content: activityPanel },
        ]}
      >
        {orders.length > 0 && (
          <ul className="mb-2 flex gap-2 overflow-hidden">
            {orders.slice(0, 3).map((ord) => (
              <li key={ord.id} className="flex min-w-0 items-center gap-2 rounded-full border border-[var(--hq-line)] py-1 pr-1 pl-3 text-[0.875rem] text-[var(--hq-muted)]">
                <span className="size-1.5 shrink-0 rounded-full" style={{ background: DEPTS[ord.department].hue }} />
                <span className="truncate">
                  <span className="text-white">{DEPTS[ord.department].name}:</span> {ord.text}
                </span>
                <form action={dropOrder}>
                  <input type="hidden" name="id" value={ord.id} />
                  <button type="submit" aria-label="Cancel this order" className="grid size-6 place-items-center rounded-full hover:bg-white/10 hover:text-white">
                    <svg viewBox="0 0 24 24" className="size-3 fill-none stroke-current" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true">
                      <path d="M6 6l12 12M18 6 6 18" />
                    </svg>
                  </button>
                </form>
              </li>
            ))}
          </ul>
        )}
        <CommandBar />
      </Dock>
    </div>
  );
}
