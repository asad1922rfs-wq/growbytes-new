"use client";

import { Children, useState } from "react";

/** Shows one decision at a time, so each gets your full attention. */
export function DecisionDesk({ children }: { children: React.ReactNode }) {
  const items = Children.toArray(children);
  const [i, setI] = useState(0);
  const at = Math.min(i, Math.max(items.length - 1, 0));
  if (!items.length) return null;
  return (
    <div>
      <div className="relative">
        {/* The rest of the pile, peeking out behind the current decision */}
        {items.length > 1 && <div aria-hidden="true" className="absolute inset-x-4 -bottom-2 h-full rounded-[1.25rem] border border-[var(--hq-line)] bg-[var(--hq-panel)]/60" />}
        {items.length > 2 && <div aria-hidden="true" className="absolute inset-x-8 -bottom-4 h-full rounded-[1.25rem] border border-[var(--hq-line)] bg-[var(--hq-panel)]/30" />}
        <div className="relative">{items[at]}</div>
      </div>
      {items.length > 1 && (
        <div className="mt-6 flex items-center justify-between text-sm text-[var(--hq-muted)]">
          <span>
            Decision {at + 1} of {items.length}
          </span>
          <span className="flex gap-1">
            <button type="button" onClick={() => setI(Math.max(0, at - 1))} disabled={at === 0} className="rounded-lg px-3 py-1.5 hover:bg-white/5 disabled:opacity-30">
              Previous
            </button>
            <button type="button" onClick={() => setI(Math.min(items.length - 1, at + 1))} disabled={at === items.length - 1} className="rounded-lg px-3 py-1.5 hover:bg-white/5 disabled:opacity-30">
              Next
            </button>
          </span>
        </div>
      )}
    </div>
  );
}
