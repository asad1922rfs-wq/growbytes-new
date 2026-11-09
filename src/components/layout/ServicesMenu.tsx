"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { GbIcon } from "@/components/icons/GbIcon";
import { serviceGroups, services } from "@/content/services";
import { ArrowIcon, GrowArrow, cn } from "@/components/ui/primitives";


const OPEN_DELAY = 120; // hover intent before opening
const CLOSE_DELAY = 220; // grace period while moving into the panel

/**
 * Services disclosure for desktop. One button toggles the panel (click, Enter,
 * Space); a mouse can also open it on hover with an intent delay. The closed
 * panel is `inert` and invisible, so its links are not focusable.
 * No ARIA menu roles: this is site navigation, not an application menu.
 */
export function ServicesMenu() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const panelId = useId();
  const wrapRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const active = pathname.startsWith("/services");

  // Close on navigation.
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
    <>
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
        Services
        <svg
          aria-hidden="true"
          viewBox="0 0 12 12"
          className={cn("size-3 transition-transform duration-[var(--duration-base)] motion-reduce:transition-none", open && "rotate-180")}
          fill="none"
        >
          <path d="M2.5 4.5 6 8l3.5-3.5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <div
        id={panelId}
        inert={!open}
        className={cn(
          "absolute inset-x-0 top-full border-b border-line bg-white z-10 shadow-[0_14px_30px_-24px_rgb(23_25_24/0.2)]",
          "transition-[opacity,translate,visibility] duration-150 ease-out motion-reduce:transition-none",
          open ? "visible translate-y-0 opacity-100" : "invisible -translate-y-1 opacity-0",
        )}
      >
        <span aria-hidden="true" className="absolute inset-x-0 top-0 h-0.5 bg-accent" />
        <div className="mx-auto max-w-site px-[var(--spacing-gutter)]">
          <div className="grid gap-5 pt-7 xl:grid-cols-[1fr_1fr_1fr_0.8fr] xl:gap-0">
            <div className="grid grid-cols-3 xl:col-span-3">
              {serviceGroups.map((group, gi) => (
                <section
                  key={group.id}
                  aria-labelledby={`${panelId}-${group.id}`}
                  className={cn(
                    "pr-6 transition-[opacity,translate] duration-200 ease-out motion-reduce:transition-none",
                    gi > 0 && "border-l border-line pl-6",
                    open ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0",
                  )}
                  style={{ transitionDelay: open ? `${40 + gi * 40}ms` : "0ms" }}
                >
                  <h2 id={`${panelId}-${group.id}`} className="px-3 text-[0.75rem] font-bold tracking-[0.12em] text-muted uppercase">
                    {group.label}
                  </h2>
                  <ul className="mt-3 space-y-0.5">
                    {services
                      .filter((s) => s.group === group.id)
                      .map((s) => (
                        <li key={s.slug}>
                          <Link
                            href={`/services/${s.slug}/`}
                            onClick={() => setOpen(false)}
                            aria-current={pathname === `/services/${s.slug}/` ? "page" : undefined}
                            className="group grid grid-cols-[1.5rem_1fr] gap-x-3 rounded-md px-3 py-2.5 transition-colors hover:bg-paper focus-visible:bg-paper aria-[current=page]:bg-paper"
                          >
                            <GbIcon
                              name={s.slug}
                              className="-mt-px size-6 text-ink transition-colors group-hover:text-accent-strong group-focus-visible:text-accent-strong group-aria-[current=page]:text-accent-strong"
                            />
                            <span>
                              <span className="block leading-snug font-bold group-hover:text-accent-strong group-aria-[current=page]:text-accent-strong">
                                {s.shortName}
                                <ArrowIcon className="ml-1.5 inline-block size-3.5 -translate-x-1 align-[-1px] opacity-0 transition duration-150 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100 motion-reduce:transition-none" />
                              </span>
                              <span className="mt-0.5 block text-[0.875rem] leading-snug text-muted">{s.menuBlurb}</span>
                            </span>
                          </Link>
                        </li>
                      ))}
                  </ul>
                </section>
              ))}
            </div>

            <div className="flex flex-col gap-3 self-start xl:ml-10">
            {/* Featured client project: one image moment, wide screens only */}
            <a
              href="https://blinqcare.com/"
              target="_blank"
              rel="noopener"
              onClick={() => setOpen(false)}
              className="group hidden overflow-hidden rounded-lg border border-line bg-white transition-colors hover:border-ink/25 xl:block"
            >
              <div aria-hidden="true" className="relative aspect-[16/9] overflow-hidden bg-[#e9ecf0]">
                <Image
                  src="/images/work/blinq-flosser.jpg"
                  alt=""
                  width={1440}
                  height={636}
                  sizes="20rem"
                  className="absolute top-3 left-3 w-[115%] max-w-none rounded-md shadow-sm transition-transform duration-300 ease-out group-hover:-translate-y-1 motion-reduce:transition-none"
                />
              </div>
              <div className="px-4 py-3">
                <p className="text-[0.6875rem] font-bold tracking-[0.12em] text-accent-strong uppercase">Client project</p>
                <p className="mt-1 text-[0.9375rem] leading-snug font-bold group-hover:text-accent-strong">
                  blinq: a Shopify store for premium oral care
                  <span className="sr-only"> (opens in a new tab)</span>
                </p>
              </div>
            </a>

            {/* Guidance: a slim strip below xl, a compact panel at xl */}
            <div className="on-dark flex flex-wrap items-center gap-x-4 gap-y-1 rounded-lg bg-ink px-5 py-3.5 text-paper xl:block xl:px-5 xl:py-4">
              <GbIcon name="discovery" className="size-6 text-paper xl:hidden" />
              <p className="leading-snug font-bold">Not sure where to start?</p>
              <p className="text-[0.875rem] text-muted-on-dark xl:mt-0.5">Tell us what you want to improve.</p>
              <Link
                href="/contact/"
                onClick={() => setOpen(false)}
                className="group inline-flex items-center gap-1.5 text-[0.9375rem] font-bold text-accent underline decoration-accent/50 underline-offset-4 hover:text-white hover:decoration-white xl:mt-2.5"
              >
                Discuss your project <GrowArrow />
              </Link>
            </div>
            </div>
          </div>

          <div className="mt-7 flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-t border-line py-5">
            <Link
              href="/services/"
              onClick={() => setOpen(false)}
              className="group inline-flex min-h-11 items-center gap-2 rounded-md bg-ink px-5 text-[0.9375rem] font-bold text-white transition-colors hover:bg-ink-soft"
            >
              View all services <GrowArrow />
            </Link>
            <div className="flex items-center gap-6 px-3 text-[0.9375rem] font-semibold text-muted">
              <Link href="/work/" onClick={() => setOpen(false)} className="hover:text-accent-strong">
                See our work
              </Link>
              <Link href="/insights/" onClick={() => setOpen(false)} className="hover:text-accent-strong">
                Read our guides
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
    {/* Backdrop over the page (not the header or panel). Outside the hover area,
        so moving onto it closes a hover-opened menu; clicking it closes too. */}
    <div
      aria-hidden="true"
      onClick={() => setOpen(false)}
      className={cn(
        "absolute inset-x-0 top-full h-dvh z-0 bg-ink/15 transition-opacity duration-150 motion-reduce:transition-none",
        open ? "opacity-100" : "pointer-events-none opacity-0",
      )}
    />
    </>
  );
}
