import { getOverview, listActivity, listOrders } from "@/lib/admin/data";
import { dropOrder } from "../actions";
import { CommandBar } from "./CommandBar";
import { OrgMap } from "./OrgMap";
import { DEPTS, NotConfigured } from "./ui";

// Live, per-request data for the owner only; no instant prefetch needed.
export const instant = false;

export const metadata = { title: "Command room" };

function greeting() {
  // Pakistan time, where the owner works from.
  const h = Number(new Intl.DateTimeFormat("en-GB", { hour: "numeric", hour12: false, timeZone: "Asia/Karachi" }).format(new Date()));
  return h < 5 ? "Working late" : h < 12 ? "Good morning" : h < 17 ? "Good afternoon" : "Good evening";
}

export default async function CommandRoom() {
  const [o, activity, orders] = await Promise.all([getOverview(), listActivity(10), listOrders("open", 8)]);
  if (!o.configured) return <NotConfigured />;

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

  return (
    <div className="flex flex-col gap-4 md:h-full">
      <h1 className="sr-only">
        {greeting()}, Asad. {line}
      </h1>

      {/* The map fills whatever height is left, so the room always fits one screen */}
      <section aria-label="Your organisation" className="relative md:min-h-0 md:flex-1 md:[container-type:size]">
        <OrgMap o={o} lines={lines} />
      </section>

      <div>
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
      </div>
    </div>
  );
}
