"use client";

import { useEffect, useState, type ReactNode } from "react";
import { cn } from "@/components/ui/primitives";

/**
 * Hero carousel. Slides share one grid cell so the height never jumps; the
 * inactive slide is faded out and made inert, and the incoming slide builds in
 * (text first, then artwork; see .hero-slide in globals.css). Auto-advances unless the
 * visitor prefers reduced motion or is hovering over it.
 */
export function HeroSlider({ slides, labels, interval = 7000 }: { slides: ReactNode[]; labels: string[]; interval?: number }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setTimeout(() => setActive((a) => (a + 1) % slides.length), interval);
    return () => window.clearTimeout(id);
  }, [active, paused, interval, slides.length]);

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="Highlights"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="grid">
        {slides.map((slide, i) => (
          <div
            key={labels[i]}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${slides.length}: ${labels[i]}`}
            inert={i !== active}
            data-active={i === active || undefined}
            className={cn(
              "hero-slide [grid-area:1/1] transition-opacity duration-500 motion-reduce:transition-none",
              i === active ? "opacity-100" : "pointer-events-none opacity-0",
            )}
          >
            {slide}
          </div>
        ))}
      </div>

      <div className="mt-8 flex items-center justify-center gap-4 sm:justify-start">
        <button
          type="button"
          aria-label="Previous slide"
          onClick={() => setActive((a) => (a - 1 + slides.length) % slides.length)}
          className="group flex h-10 w-12 items-center justify-center text-ink/60 transition-colors hover:text-accent-strong focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-strong"
        >
          <svg aria-hidden="true" viewBox="0 0 40 16" className="h-4 w-10 fill-none stroke-current transition-transform duration-300 group-hover:-translate-x-1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M38 8H2M8 2 2 8l6 6" />
          </svg>
        </button>
        <div className="flex items-center gap-2">
          {labels.map((label, i) => (
            <button
              key={label}
              type="button"
              aria-label={`Show slide ${i + 1}: ${label}`}
              aria-current={i === active}
              onClick={() => setActive(i)}
              className="grid size-6 place-items-center"
            >
              <span className={cn("block h-2 rounded-full transition-all duration-500", i === active ? "w-6 bg-accent" : "w-2 bg-ink/20 hover:bg-ink/40")} />
            </button>
          ))}
        </div>
        <button
          type="button"
          aria-label="Next slide"
          onClick={() => setActive((a) => (a + 1) % slides.length)}
          className="group flex h-10 w-12 items-center justify-center text-ink/60 transition-colors hover:text-accent-strong focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-strong"
        >
          <svg aria-hidden="true" viewBox="0 0 40 16" className="h-4 w-10 fill-none stroke-current transition-transform duration-300 group-hover:translate-x-1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M2 8h36M32 2l6 6-6 6" />
          </svg>
        </button>
      </div>
    </div>
  );
}
