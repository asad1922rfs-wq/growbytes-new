"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { createOrder, type OrderState } from "../actions";

const DEPTS = [
  { value: "sales", label: "Sales", hue: "var(--hq-sales)", hint: "Reply to every new lead today" },
  { value: "marketing", label: "Marketing", hue: "var(--hq-marketing)", hint: "Plan three posts for next week" },
  { value: "projects", label: "Production", hue: "var(--hq-projects)", hint: "List what's due before Friday" },
  { value: "operations", label: "Operations", hue: "var(--hq-operations)", hint: "Summarise this week's inbox" },
];

/**
 * A chat-style input under the AI core: pick a department, type the order,
 * press Enter. The department list and open orders open as small popups.
 */
export function OrderChat({ openCount, openOrders }: { openCount: number; openOrders: React.ReactNode }) {
  const [state, action, pending] = useActionState<OrderState, FormData>(createOrder, {});
  const [dept, setDept] = useState(DEPTS[0]);
  const [menu, setMenu] = useState<null | "dept" | "orders">(null);
  const [text, setText] = useState("");
  const form = useRef<HTMLFormElement>(null);
  const box = useRef<HTMLDivElement>(null);

  // Send, then clear the box straight away; the status line below says if it failed
  const send = (fd: FormData) => {
    action(fd);
    setText("");
  };

  // Close a popup on Escape or a click anywhere else
  useEffect(() => {
    if (!menu) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenu(null);
    const onDown = (e: MouseEvent) => !box.current?.contains(e.target as Node) && setMenu(null);
    window.addEventListener("keydown", onKey);
    window.addEventListener("mousedown", onDown);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("mousedown", onDown);
    };
  }, [menu]);

  const popup = "hq-glass absolute bottom-[calc(100%+0.75rem)] z-30 rounded-[1.25rem] p-2";
  const closeBtn = (
    <button type="button" onClick={() => setMenu(null)} aria-label="Close" className="grid size-8 place-items-center rounded-full text-[var(--hq-muted)] hover:bg-white/10 hover:text-white">
      <svg viewBox="0 0 24 24" className="size-4 fill-none stroke-current" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
        <path d="M6 6l12 12M18 6 6 18" />
      </svg>
    </button>
  );

  return (
    <div ref={box} className="relative w-[min(44rem,92vw,52cqw)]">
      {menu === "dept" && (
        <div role="dialog" aria-label="Choose a department" className={`${popup} left-0 w-64`}>
          <div className="flex items-center justify-between px-3 pt-1 pb-2">
            <span className="text-[0.9375rem] text-[var(--hq-muted)]">Send to</span>
            {closeBtn}
          </div>
          {DEPTS.map((d) => (
            <button
              key={d.value}
              type="button"
              onClick={() => (setDept(d), setMenu(null))}
              className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-[1rem] transition-colors ${d.value === dept.value ? "bg-white/[0.08] text-white" : "text-[var(--hq-muted)] hover:bg-white/[0.05] hover:text-white"}`}
            >
              <span className="size-2 rounded-full" style={{ background: d.hue }} />
              {d.label}
            </button>
          ))}
        </div>
      )}

      {menu === "orders" && (
        <div role="dialog" aria-label="Open orders" className={`${popup} right-0 w-[min(32rem,92vw)] p-4`}>
          <div className="flex items-center justify-between pb-2">
            <span className="font-display text-xl">Open orders</span>
            {closeBtn}
          </div>
          <div className="max-h-64 overflow-y-auto">{openOrders}</div>
        </div>
      )}

      <form ref={form} action={send} className="hq-glass flex items-end gap-2 rounded-[1.75rem] p-2 pl-2.5 focus-within:brightness-110">
        <input type="hidden" name="department" value={dept.value} />
        <button
          type="button"
          onClick={() => setMenu(menu === "dept" ? null : "dept")}
          aria-expanded={menu === "dept"}
          aria-label={`Department: ${dept.label}. Change`}
          className="mb-0.5 flex h-11 shrink-0 items-center gap-2 rounded-full bg-white/[0.06] px-3.5 text-[0.9375rem] text-white transition-colors hover:bg-white/[0.1]"
        >
          <span className="size-2 rounded-full" style={{ background: dept.hue }} />
          {dept.label}
          <svg viewBox="0 0 24 24" className="size-3.5 fill-none stroke-current opacity-60" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true">
            <path d="m6 9 6 6 6-6" />
          </svg>
        </button>

        <label htmlFor="order-chat" className="sr-only">
          Order for {dept.label}
        </label>
        <textarea
          id="order-chat"
          name="text"
          rows={1}
          required
          maxLength={1000}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={`Tell ${dept.label} what to do…`}
          title={`For example: ${dept.hint}`}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              if (text.trim()) form.current?.requestSubmit();
            }
          }}
          className="max-h-32 min-h-11 flex-1 resize-none bg-transparent px-2 py-2.5 text-[1.0625rem] text-white outline-none focus-visible:outline-none [field-sizing:content] placeholder:text-[var(--hq-dim)]"
        />

        {openCount > 0 && (
          <button
            type="button"
            onClick={() => setMenu(menu === "orders" ? null : "orders")}
            aria-expanded={menu === "orders"}
            className="mb-0.5 h-11 shrink-0 rounded-full px-3 text-[0.875rem] text-[var(--hq-muted)] hover:bg-white/[0.06] hover:text-white"
          >
            {openCount} open
          </button>
        )}

        <button
          type="submit"
          disabled={pending || !text.trim()}
          aria-label={`Send to ${dept.label}`}
          className="mb-0.5 grid size-11 shrink-0 place-items-center rounded-full bg-[#D2461F] text-white transition-colors hover:bg-[#C2401B] disabled:bg-white/[0.08] disabled:text-[var(--hq-dim)]"
        >
          <svg viewBox="0 0 24 24" className="size-5 fill-none stroke-current" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M12 19V5M5 12l7-7 7 7" />
          </svg>
        </button>
      </form>

      <p role="status" className={`mt-2 h-5 text-center text-[0.875rem] ${state.error ? "text-[#FF9AA5]" : "text-[var(--hq-muted)]"}`}>
        {pending ? "Sending…" : state.error ? state.error : state.ok ? `Sent to ${dept.label}. Its agent starts with it on the next run.` : ""}
      </p>
    </div>
  );
}
