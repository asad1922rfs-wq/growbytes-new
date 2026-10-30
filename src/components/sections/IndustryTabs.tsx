"use client";

import Link from "next/link";
import { useId, useState } from "react";
import { IndustryIcon } from "@/components/icons/IndustryIcon";
import { ArrowIcon, cn } from "@/components/ui/primitives";

type Item = { slug: string; name: string; icon: string; intro: string; bullets: string[] };

/** Industry list beside a detail panel: what this service builds for the chosen industry. */
export function IndustryTabs({ items }: { items: Item[] }) {
  const [active, setActive] = useState(0);
  const id = useId();
  const item = items[active];

  return (
    <div className="grid overflow-hidden rounded-[2rem] border border-line bg-white lg:grid-cols-[0.8fr_1.6fr]">
      <div role="tablist" aria-orientation="vertical" aria-label="Industries" className="flex overflow-x-auto border-b border-line lg:flex-col lg:border-r lg:border-b-0">
        {items.map((it, i) => {
          const on = i === active;
          return (
            <button
              key={it.slug}
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
                "flex shrink-0 items-center gap-3 border-line px-6 py-4 text-left font-semibold transition-colors lg:border-b lg:last:border-b-0",
                on ? "bg-paper text-ink" : "text-muted hover:bg-paper/60 hover:text-ink",
              )}
            >
              <IndustryIcon path={it.icon} className={cn("size-5 shrink-0", on ? "text-accent" : "")} />
              <span className="flex-1 whitespace-nowrap">{it.name}</span>
              <ArrowIcon className={cn("hidden shrink-0 transition-all lg:block", on ? "text-accent opacity-100" : "-translate-x-1 opacity-0")} />
            </button>
          );
        })}
      </div>

      <div id={`${id}-panel`} role="tabpanel" aria-labelledby={`${id}-tab-${active}`} className="flex flex-col">
        <div key={`h-${active}`} className="on-dark relative overflow-hidden bg-ink p-8 text-white motion-safe:animate-[fadeIn_350ms_ease-out] sm:p-10">
          <IndustryIcon path={item.icon} className="pointer-events-none absolute -right-6 -bottom-8 size-48 text-white/[0.06]" />
          <h3 className="relative text-[1.75rem] font-extrabold">{item.name}</h3>
          <p className="relative mt-3 max-w-[36rem] text-white/70">{item.intro}</p>
        </div>
        <div key={`b-${active}`} className="flex flex-1 flex-col p-8 motion-safe:animate-[fadeIn_350ms_ease-out] sm:p-10">
          <p className="text-[0.75rem] font-bold tracking-[0.14em] text-muted uppercase">What we build for you</p>
          <ul className="mt-5 grid gap-x-8 gap-y-3 sm:grid-cols-2">
            {item.bullets.map((b) => (
              <li key={b} className="flex gap-2.5">
                <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" />
                {b}
              </li>
            ))}
          </ul>
          <Link href={`/industries/${item.slug}/`} className="mt-auto inline-flex items-center gap-2 self-start pt-8 font-bold hover:text-accent-strong">
            Explore {item.name.toLowerCase()} <ArrowIcon />
          </Link>
        </div>
      </div>
    </div>
  );
}
