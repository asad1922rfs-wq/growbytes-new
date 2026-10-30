"use client";

import { useId, useState, type ReactNode } from "react";
import { ArrowLink, cn } from "@/components/ui/primitives";
import { automationScenes } from "@/components/visuals/AutomationScenes";

export type AutomationItem = { title: string; body: string };

/**
 * AI automation feature: intro + illustration on the left, capability list on
 * the right. One item open at a time; the illustration follows the open item
 * (and keeps the last one shown if every item is closed). All panels are
 * server-rendered; closed panels are `inert` so they leave the keyboard order.
 */
export function AutomationFeature({ items, intro, href }: { items: AutomationItem[]; intro: ReactNode; href: string }) {
  const [open, setOpen] = useState<number | null>(0);
  const [shown, setShown] = useState(0);
  const baseId = useId();

  const toggle = (i: number) => {
    const next = open === i ? null : i;
    setOpen(next);
    if (next !== null) setShown(next);
  };

  return (
    <div className="grid gap-10 md:grid-cols-[minmax(0,14fr)_minmax(0,11fr)] md:gap-10 lg:gap-16 xl:gap-20">
      <div>
        {intro}
        <div
          aria-hidden="true"
          className="relative mt-8 aspect-[16/9] overflow-hidden rounded-xl bg-[#f6f2ea] ring-1 ring-line"
          style={{
            // Graph paper: fine 12px squares with a stronger line every 60px.
            backgroundImage:
              "linear-gradient(rgb(194 64 27 / 0.14) 1px, transparent 1px), linear-gradient(90deg, rgb(194 64 27 / 0.14) 1px, transparent 1px), linear-gradient(rgb(23 25 24 / 0.05) 1px, transparent 1px), linear-gradient(90deg, rgb(23 25 24 / 0.05) 1px, transparent 1px)",
            backgroundSize: "60px 60px, 60px 60px, 12px 12px, 12px 12px",
            backgroundPosition: "-1px -1px",
          }}
        >
          {automationScenes.map((scene, i) => (
            <svg
              key={i}
              viewBox="0 0 320 180"
              className={cn(
                "absolute inset-0 size-full transition-[opacity,transform] duration-300 ease-out motion-reduce:transition-none",
                shown === i ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-1.5 opacity-0",
              )}
            >
              {scene}
            </svg>
          ))}
        </div>
      </div>

      <ul className="grid content-start gap-2">
        {items.map((item, i) => {
          const isOpen = open === i;
          const triggerId = `${baseId}-trigger-${i}`;
          const panelId = `${baseId}-panel-${i}`;
          return (
            <li
              key={item.title}
              className={cn(
                "border-l-2 pl-5 transition-colors duration-200 motion-reduce:transition-none sm:pl-6",
                isOpen ? "border-accent" : "border-line",
              )}
            >
              <h3>
                <button
                  type="button"
                  id={triggerId}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => toggle(i)}
                  className="group flex w-full items-center py-2.5 text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-strong"
                >
                  <span
                    className={cn(
                      "text-[1.1875rem] leading-snug font-semibold tracking-tight transition-colors duration-200 motion-reduce:transition-none sm:text-[1.3125rem]",
                      isOpen ? "text-ink" : "text-ink/55 group-hover:text-ink",
                    )}
                  >
                    {item.title}
                  </span>
                </button>
              </h3>
              <div
                id={panelId}
                role="region"
                aria-labelledby={triggerId}
                inert={!isOpen}
                className={cn(
                  "grid transition-[grid-template-rows,opacity] duration-250 ease-out motion-reduce:transition-none",
                  isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                )}
              >
                <div className="min-h-0 overflow-hidden">
                  <div className="max-w-[40rem] pt-1 pr-2 pb-5">
                    <p className="text-[1.0625rem] leading-relaxed text-ink/75">{item.body}</p>
                    <div className="mt-4">
                      <ArrowLink href={href}>Explore AI automation services</ArrowLink>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
