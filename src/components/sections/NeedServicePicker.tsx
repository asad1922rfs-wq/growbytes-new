"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowIcon, cn } from "@/components/ui/primitives";

/**
 * Search-style keyword pills for a "What's next" card. Visitors can pick one or
 * several; a call to action then opens the inquiry form with the matching
 * service preselected ("multiple" when the picks span different services).
 */
export function NeedServicePicker({ keywords, dark }: { keywords: { label: string; service: string }[]; dark?: boolean }) {
  const [selected, setSelected] = useState<string[]>([]);
  const chosen = keywords.filter((k) => selected.includes(k.label));
  const services = [...new Set(chosen.map((k) => k.service))];
  const service = services.length === 1 ? services[0] : "multiple";

  const toggle = (label: string) => setSelected((cur) => (cur.includes(label) ? cur.filter((l) => l !== label) : [...cur, label]));

  return (
    <div className="mt-7 self-start">
      <div role="group" aria-label="What do you need? Choose one or more" className="flex flex-wrap gap-1.5 sm:gap-2">
        {keywords.map((k) => {
          const on = selected.includes(k.label);
          return (
            <button
              key={k.label}
              type="button"
              aria-pressed={on}
              onClick={() => toggle(k.label)}
              className={cn(
                "min-h-9 rounded-full border px-3 text-[0.8125rem] font-semibold sm:min-h-10 sm:px-4 sm:text-[0.9375rem] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-strong",
                on
                  ? "border-accent bg-accent text-white"
                  : dark
                    ? "border-white/20 text-paper hover:border-white/50"
                    : "border-ink/15 text-ink hover:border-ink/40",
              )}
            >
              {k.label}
            </button>
          );
        })}
      </div>

      <div aria-live="polite">
        {chosen.length > 0 && (
          <Link
            href={`/contact/?service=${service}`}
            className="mt-6 inline-flex min-h-12 items-center gap-2 rounded-lg bg-accent-button px-5 font-bold text-white transition-colors hover:bg-accent-strong motion-safe:animate-[fadeIn_250ms_ease-out]"
          >
            {chosen.length === 1 ? `Get started with ${chosen[0].label}` : `Get started with ${chosen.length} selected`}
            <ArrowIcon />
          </Link>
        )}
      </div>
    </div>
  );
}
