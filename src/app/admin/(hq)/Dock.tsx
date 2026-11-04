"use client";

import { useEffect, useState } from "react";

type Tab = { id: string; label: string; count?: number; content: React.ReactNode };

/**
 * The bar along the bottom of the command room. Each button opens its panel
 * over the map, so the page itself never has to scroll.
 */
export function Dock({ tabs, children }: { tabs: Tab[]; children: React.ReactNode }) {
  const [open, setOpen] = useState<string | null>(null);
  const tab = tabs.find((t) => t.id === open);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="relative">
      {tab && (
        <section
          role="dialog"
          aria-label={tab.label}
          className="hq-glass absolute right-0 bottom-[calc(100%+0.75rem)] z-20 flex max-h-[min(62dvh,40rem)] w-full flex-col rounded-[1.5rem] md:w-[36rem]"
        >
          <header className="flex items-center justify-between gap-4 px-6 pt-5 pb-3">
            <h2 className="font-display text-2xl">{tab.label}</h2>
            <button type="button" onClick={() => setOpen(null)} aria-label={`Close ${tab.label}`} className="grid size-9 place-items-center rounded-full text-[var(--hq-muted)] hover:bg-white/10 hover:text-white">
              <svg viewBox="0 0 24 24" className="size-4 fill-none stroke-current" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
                <path d="M6 6l12 12M18 6 6 18" />
              </svg>
            </button>
          </header>
          <div className="min-h-0 flex-1 overflow-y-auto px-6 pb-6">{tab.content}</div>
        </section>
      )}

      <div className="grid items-end gap-3 md:grid-cols-[1fr_auto]">
        <div className="min-w-0">{children}</div>
        <nav aria-label="Panels" className="flex gap-2">
          {tabs.map((t) => (
            <button
              key={t.id}
              type="button"
              aria-expanded={open === t.id}
              onClick={() => setOpen(open === t.id ? null : t.id)}
              className={`flex h-14 flex-1 items-center justify-center gap-2 rounded-2xl px-4 text-[0.9375rem] whitespace-nowrap transition-colors md:flex-none ${
                open === t.id ? "bg-white text-[var(--hq-night)]" : "hq-glass text-white hover:brightness-125"
              }`}
            >
              {t.label}
              {t.count ? (
                <span className={`grid min-w-6 place-items-center rounded-full px-1.5 text-[0.8125rem] ${open === t.id ? "bg-[var(--hq-night)] text-white" : "bg-[#F66135] text-white"}`}>{t.count}</span>
              ) : null}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
}
