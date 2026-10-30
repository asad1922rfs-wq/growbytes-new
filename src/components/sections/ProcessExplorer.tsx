"use client";

import { useId, useState, type ReactNode } from "react";
import { cn } from "@/components/ui/primitives";

export type ProcessStage = { title: string; body: string; outcome: string };

/**
 * Process section, two columns: heading + the selected stage's detail + actions
 * on the left; a rising four-step "growth staircase" on the right. Steps are
 * real buttons (hover, focus, or click selects); the detail is announced
 * politely when it changes.
 */
export function ProcessExplorer({ stages, heading, actions }: { stages: ProcessStage[]; heading: ReactNode; actions: ReactNode }) {
  const [active, setActive] = useState(0);
  const baseId = useId();
  const stage = stages[active];

  return (
    <div className="grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:items-center lg:gap-16 xl:gap-24">
      <div>
        {heading}
        <div id={`${baseId}-detail`} aria-live="polite" className="mt-8 min-h-[13rem] border-l-2 border-accent pl-5 sm:pl-6">
          <div key={active} className="motion-safe:animate-[fadeIn_250ms_ease-out]">
            <p className="text-[0.8125rem] font-extrabold tracking-[0.16em] text-accent-strong uppercase">
              Stage {String(active + 1).padStart(2, "0")} of {String(stages.length).padStart(2, "0")}
            </p>
            <h3 className="mt-2 text-[1.5rem] leading-tight font-extrabold tracking-tight sm:text-[1.75rem]">{stage.title}</h3>
            <p className="mt-3 max-w-[30rem] text-[1.0625rem] leading-relaxed text-ink/75">{stage.body}</p>
            <p className="mt-4 text-[1rem] leading-relaxed text-ink">
              <span className="font-bold text-accent-strong">Outcome: </span>
              {stage.outcome}
            </p>
          </div>
        </div>
        <div className="mt-8">{actions}</div>
      </div>

      <div className="min-w-0">
        <div role="group" aria-label="Project stages" className="flex h-[17rem] items-end gap-2 pt-4 sm:h-[24rem] sm:gap-3">
          {stages.map((s, i) => {
            const on = active === i;
            return (
              <button
                key={s.title}
                type="button"
                aria-pressed={on}
                aria-controls={`${baseId}-detail`}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => setActive(i)}
                style={{ height: `${40 + i * 20}%` }}
                className={cn(
                  "relative flex min-w-0 flex-1 flex-col justify-between rounded-xl p-2.5 text-left transition-[background-color,transform,box-shadow] duration-300 ease-out focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-accent-strong motion-reduce:transition-none sm:p-4",
                  on
                    ? "-translate-y-2 bg-accent text-white shadow-[0_18px_30px_-18px_rgb(194_64_27/0.75)]"
                    : i % 2 === 0
                      ? "bg-ink text-white/85 hover:-translate-y-1"
                      : "bg-[#2a2d2b] text-white/85 hover:-translate-y-1",
                )}
              >
                <span className="text-[1.625rem] leading-none font-extrabold tracking-tight sm:text-[2.5rem]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-[0.6875rem] leading-snug font-bold sm:text-[0.9375rem]">{s.title}</span>
              </button>
            );
          })}
        </div>
        <p className="mt-4 flex items-center gap-2 text-[0.875rem] text-muted">
          <svg aria-hidden="true" viewBox="0 0 24 24" className="size-4 text-accent-strong" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M12 19V5M6 11l6-6 6 6" />
          </svg>
          Hover or select a step to explore it
        </p>
      </div>
    </div>
  );
}
