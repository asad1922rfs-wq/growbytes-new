"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { createOrder, type OrderState } from "../actions";

const options = [
  { value: "sales", label: "Sales", hue: "var(--hq-sales)", hint: "Follow up with everyone who asked about Shopify this week" },
  { value: "marketing", label: "Marketing", hue: "var(--hq-marketing)", hint: "Plan three posts for next week about custom software" },
  { value: "projects", label: "Production", hue: "var(--hq-projects)", hint: "List what's due on client projects before Friday" },
  { value: "operations", label: "Operations", hue: "var(--hq-operations)", hint: "Summarise this week's inbox and anything unpaid" },
];

/** Give any department an order in plain words. */
export function CommandBar() {
  const [state, action, pending] = useActionState<OrderState, FormData>(createOrder, {});
  const [dept, setDept] = useState(options[0]);
  const form = useRef<HTMLFormElement>(null);
  useEffect(() => {
    if (state.ok) form.current?.reset();
  }, [state]);

  return (
    <form ref={form} action={action} className="rounded-[1.25rem] border border-[var(--hq-line)] bg-[var(--hq-panel)] p-2 focus-within:border-[var(--hq-dim)]">
      <input type="hidden" name="department" value={dept.value} />
      <div className="flex flex-wrap gap-1 p-1" role="radiogroup" aria-label="Department">
        {options.map((o) => (
          <button
            key={o.value}
            type="button"
            role="radio"
            aria-checked={dept.value === o.value}
            onClick={() => setDept(o)}
            className={`flex items-center gap-2 rounded-full px-3 py-1.5 text-[0.8125rem] font-medium transition-colors ${dept.value === o.value ? "bg-[var(--hq-raised)] text-white" : "text-[var(--hq-muted)] hover:text-white"}`}
          >
            <span className="size-1.5 rounded-full" style={{ background: o.hue }} />
            {o.label}
          </button>
        ))}
      </div>
      <div className="flex items-end gap-2 px-2 pb-1">
        <label htmlFor="order" className="sr-only">
          Order for {dept.label}
        </label>
        <textarea
          id="order"
          name="text"
          rows={2}
          required
          maxLength={1000}
          placeholder={`Tell ${dept.label} what to do. For example: ${dept.hint}.`}
          onKeyDown={(e) => {
            if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) form.current?.requestSubmit();
          }}
          className="min-h-12 flex-1 resize-none bg-transparent py-2 text-[0.9375rem] text-white outline-none placeholder:text-[var(--hq-dim)]"
        />
        <button type="submit" disabled={pending} className="mb-1 shrink-0 rounded-xl bg-[#D2461F] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#C2401B] disabled:opacity-60">
          {pending ? "Sending" : `Send to ${dept.label}`}
        </button>
      </div>
      {(state.error || state.ok) && (
        <p role="status" className={`px-3 pb-2 text-[0.8125rem] ${state.error ? "text-[#FF9AA5]" : "text-[#7FE3D0]"}`}>
          {state.error ?? "Order sent. The agent picks it up first on its next run."}
        </p>
      )}
    </form>
  );
}
