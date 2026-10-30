"use client";

import { useState, type ReactNode } from "react";
import { cn } from "@/components/ui/primitives";

/**
 * Category pills over a grid of server-rendered article cards. Filtering only
 * hides cards; every article stays in the HTML for search engines.
 */
export function InsightsFilter({ items }: { items: { key: string; category: string; card: ReactNode }[] }) {
  const categories = ["All", ...new Set(items.map((i) => i.category))];
  const [active, setActive] = useState("All");

  return (
    <>
      <div role="group" aria-label="Filter by topic" className="flex flex-wrap gap-2">
        {categories.map((c) => (
          <button
            key={c}
            type="button"
            aria-pressed={active === c}
            onClick={() => setActive(c)}
            className={cn(
              "min-h-10 rounded-full border px-4 text-[0.9375rem] font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-strong",
              active === c ? "border-ink bg-ink text-white" : "border-ink/15 hover:border-ink/40",
            )}
          >
            {c}
          </button>
        ))}
      </div>
      <div aria-live="polite" className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {items.map((i) => (
          <div key={i.key} hidden={active !== "All" && active !== i.category} className="motion-safe:animate-[fadeIn_300ms_ease-out]">
            {i.card}
          </div>
        ))}
      </div>
    </>
  );
}
