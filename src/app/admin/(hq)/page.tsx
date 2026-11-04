import { getOverview, listActivity, listOrders } from "@/lib/admin/data";
import { dropOrder } from "../actions";
import { CommandBar } from "./CommandBar";
import { OrderPopup } from "./OrderPopup";
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

      {/* The whole room fits one screen; giving an order opens in a popup */}
      <section aria-label="Your organisation" className="relative md:min-h-0 md:flex-1 md:[container-type:size]">
        <OrgMap
          o={o}
          lines={lines}
          action={
            <OrderPopup count={orders.length}>
              <CommandBar />
              {orders.length > 0 && (
                <div className="mt-5">
                  <p className="text-[0.9375rem] text-[var(--hq-muted)]">Open orders</p>
                  <ul className="mt-2 max-h-40 space-y-2 overflow-y-auto">
                    {orders.map((ord) => (
                      <li key={ord.id} className="flex items-center gap-3 rounded-2xl border border-[var(--hq-line)] py-2 pr-2 pl-4 text-[var(--hq-muted)]">
                        <span className="size-2 shrink-0 rounded-full" style={{ background: DEPTS[ord.department].hue }} />
                        <span className="min-w-0 flex-1 truncate">
                          <span className="text-white">{DEPTS[ord.department].name}:</span> {ord.text}
                        </span>
                        <form action={dropOrder}>
                          <input type="hidden" name="id" value={ord.id} />
                          <button type="submit" className="rounded-full px-3 py-1.5 text-[0.875rem] hover:bg-white/10 hover:text-white">
                            Cancel
                          </button>
                        </form>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </OrderPopup>
          }
        />
      </section>
    </div>
  );
}
