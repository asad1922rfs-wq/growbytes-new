"use client";

import { useId, useState } from "react";
import { cn } from "@/components/ui/primitives";

/**
 * Deliverables as a vertical tab list beside a dark detail panel. On small
 * screens the tabs sit above the panel and scroll sideways.
 */
export function ServiceTabs({ items }: { items: { title: string; body: string }[] }) {
  const [active, setActive] = useState(0);
  const id = useId();
  const item = items[active];

  return (
    <div className="grid overflow-hidden rounded-3xl border border-line bg-white lg:grid-cols-[0.9fr_1.4fr]">
      <div role="tablist" aria-orientation="vertical" aria-label="What's included" className="flex overflow-x-auto border-b border-line lg:flex-col lg:border-r lg:border-b-0">
        {items.map((it, i) => {
          const on = i === active;
          return (
            <button
              key={it.title}
              id={`${id}-tab-${i}`}
              role="tab"
              type="button"
              aria-selected={on}
              aria-controls={`${id}-panel`}
              tabIndex={on ? 0 : -1}
              onClick={() => setActive(i)}
              onKeyDown={(e) => {
                const step = e.key === "ArrowDown" || e.key === "ArrowRight" ? 1 : e.key === "ArrowUp" || e.key === "ArrowLeft" ? -1 : 0;
                if (!step) return;
                e.preventDefault();
                const next = (active + step + items.length) % items.length;
                setActive(next);
                document.getElementById(`${id}-tab-${next}`)?.focus();
              }}
              className={cn(
                "group flex shrink-0 items-center justify-between gap-4 border-line px-6 py-5 text-left font-semibold transition-colors lg:border-b lg:last:border-b-0",
                on ? "bg-paper text-ink" : "text-muted hover:bg-paper/60 hover:text-ink",
              )}
            >
              <span className="flex items-center gap-3">
                <span className={cn("text-[0.8125rem] font-bold tabular-nums", on ? "text-accent" : "text-muted")}>{String(i + 1).padStart(2, "0")}</span>
                <span className="whitespace-nowrap lg:whitespace-normal">{it.title}</span>
              </span>
              <svg
                aria-hidden="true"
                viewBox="0 0 16 16"
                className={cn("hidden size-4 shrink-0 fill-none stroke-current transition-all lg:block", on ? "translate-x-0 text-accent opacity-100" : "-translate-x-1 opacity-0")}
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 8h10M8.5 3.5 13 8l-4.5 4.5" />
              </svg>
            </button>
          );
        })}
      </div>
      <div
        id={`${id}-panel`}
        role="tabpanel"
        aria-labelledby={`${id}-tab-${active}`}
        className="on-dark relative flex min-h-[18rem] flex-col justify-end overflow-hidden bg-ink p-8 text-paper sm:p-10"
      >
        <span aria-hidden="true" className="absolute -top-6 right-4 text-[11rem] leading-none font-extrabold tracking-tighter text-white/[0.05]">
          {String(active + 1).padStart(2, "0")}
        </span>
        <div key={active} className="relative motion-safe:animate-[fadeIn_350ms_ease-out]">
          <span className="inline-block rounded-full bg-accent px-3 py-1 text-[0.75rem] font-bold text-white">Included</span>
          <h3 className="mt-5 text-[1.75rem] leading-tight font-extrabold text-white lg:text-[2.125rem]">{item.title}</h3>
          <p className="mt-4 max-w-[34rem] text-[1.0625rem] leading-relaxed text-white/70">{item.body}</p>
        </div>
      </div>
    </div>
  );
}
