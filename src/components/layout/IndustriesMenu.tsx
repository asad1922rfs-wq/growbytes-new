"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { IndustryIcon } from "@/components/icons/IndustryIcon";
import { ArrowIcon, cn } from "@/components/ui/primitives";
import { industries } from "@/content/industries";

const OPEN_DELAY = 120;
const CLOSE_DELAY = 220;

/**
 * Industries disclosure for desktop, built like ServicesMenu: a button toggles
 * the panel, a mouse can open it on hover, and the closed panel is inert.
 */
export function IndustriesMenu() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const panelId = useId();
  const wrapRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const active = pathname.startsWith("/industries");

  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
  }

  const clearTimer = () => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = null;
  };
  useEffect(() => clearTimer, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    const outside = (e: Event) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", outside);
    document.addEventListener("focusin", outside);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", outside);
      document.removeEventListener("focusin", outside);
    };
  }, [open]);

  const onPointerEnter = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    clearTimer();
    if (!open) timer.current = setTimeout(() => setOpen(true), OPEN_DELAY);
  };
  const onPointerLeave = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    clearTimer();
    timer.current = setTimeout(() => setOpen(false), CLOSE_DELAY);
  };

  return (
    <div ref={wrapRef} onPointerEnter={onPointerEnter} onPointerLeave={onPointerLeave}>
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => {
          clearTimer();
          setOpen((v) => !v);
        }}
        className={cn(
          "inline-flex min-h-11 items-center gap-1.5 rounded-md px-3 text-[1.0625rem] font-semibold transition-colors",
          "hover:text-accent-strong focus-visible:outline-2 focus-visible:outline-offset-2",
          (active || open) && "text-accent-strong",
        )}
      >
        Industries
        <svg aria-hidden="true" viewBox="0 0 12 12" className={cn("size-3 transition-transform motion-reduce:transition-none", open && "rotate-180")} fill="none">
          <path d="M2.5 4.5 6 8l3.5-3.5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <div
        id={panelId}
        inert={!open}
        className={cn(
          "absolute inset-x-0 top-full z-10 border-b border-line bg-white shadow-[0_14px_30px_-24px_rgb(23_25_24/0.2)]",
          "transition-[opacity,translate,visibility] duration-150 ease-out motion-reduce:transition-none",
          open ? "visible translate-y-0 opacity-100" : "invisible -translate-y-1 opacity-0",
        )}
      >
        <span aria-hidden="true" className="absolute inset-x-0 top-0 h-0.5 bg-accent" />
        <div className="mx-auto max-w-site px-[var(--spacing-gutter)] pt-7 pb-5">
          <div className="grid gap-6 xl:grid-cols-[18rem_1fr]">
            {/* Feature column */}
            <div className="on-dark relative hidden overflow-hidden rounded-2xl bg-ink p-6 text-white xl:flex xl:flex-col">
              <span aria-hidden="true" className="absolute -top-10 -right-10 size-36 rounded-full bg-accent/30 blur-2xl" />
              <span className="relative text-[0.75rem] font-bold tracking-[0.14em] text-accent uppercase">Industries</span>
              <span className="relative mt-3 text-[1.25rem] leading-snug font-extrabold">Solutions shaped around how your industry works.</span>
              <span className="relative mt-3 text-[0.9375rem] text-white/65">
                {industries.length} sectors, one team for websites, software, and growth.
              </span>
              <Link
                href="/industries/"
                onClick={() => setOpen(false)}
                className="relative mt-auto inline-flex items-center gap-2 pt-6 font-bold hover:text-accent"
              >
                See all industries <ArrowIcon />
              </Link>
            </div>

            {/* All industries */}
            <ul className="grid grid-cols-2 gap-1 lg:grid-cols-3">
              {industries.map((ind, i) => (
                <li
                  key={ind.slug}
                  className={cn("transition-[opacity,translate] duration-200 ease-out", open ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0")}
                  style={{ transitionDelay: open ? `${20 + i * 18}ms` : "0ms" }}
                >
                  <Link
                    href={`/industries/${ind.slug}/`}
                    onClick={() => setOpen(false)}
                    className="group flex h-full items-center gap-3 rounded-xl p-2.5 transition-colors hover:bg-paper"
                  >
                    <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-paper text-ink ring-1 ring-line transition-colors group-hover:bg-accent group-hover:text-white group-hover:ring-accent">
                      <IndustryIcon path={ind.icon} className="size-5" />
                    </span>
                    <span className="min-w-0">
                      <span className="block font-bold group-hover:text-accent-strong">{ind.name}</span>
                      <span className="block truncate text-[0.8125rem] text-muted">{ind.blurb}</span>
                    </span>
                    <ArrowIcon className="ml-auto shrink-0 -translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-4 text-[0.9375rem]">
            <p className="text-muted">
              Not listed? We work with businesses of all kinds.
            </p>
            <Link href="/contact/" onClick={() => setOpen(false)} className="inline-flex items-center gap-2 font-bold hover:text-accent-strong">
              Tell us about yours <ArrowIcon />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
