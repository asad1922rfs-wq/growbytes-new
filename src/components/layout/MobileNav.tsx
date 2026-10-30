"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { primaryNav, projectCta } from "@/content/navigation";
import { serviceGroups, services } from "@/content/services";
import { industries } from "@/content/industries";
import { IndustryIcon } from "@/components/icons/IndustryIcon";
import { GbIcon } from "@/components/icons/GbIcon";
import { GrowArrow, buttonStyles, cn } from "@/components/ui/primitives";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [industriesOpen, setIndustriesOpen] = useState(false);
  const pathname = usePathname();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panelRef.current?.querySelector<HTMLElement>("a,button")?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
        return;
      }
      // Keep focus inside the open menu (toggle button + panel).
      if (e.key === "Tab" && panelRef.current) {
        const items = [buttonRef.current, ...panelRef.current.querySelectorAll<HTMLElement>("a,button")].filter(
          Boolean,
        ) as HTMLElement[];
        const first = items[0];
        const last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen((v) => !v)}
        className="relative z-50 inline-flex min-h-11 items-center gap-2 rounded-md border border-line bg-white px-3.5 text-sm font-bold"
      >
        {open ? "Close" : "Menu"}
        <span aria-hidden="true" className="relative block h-3 w-4">
          <span className={cn("absolute left-0 h-0.5 w-4 bg-ink transition-transform", open ? "top-1.5 rotate-45" : "top-0.5")} />
          <span className={cn("absolute left-0 h-0.5 w-4 bg-ink transition-transform", open ? "top-1.5 -rotate-45" : "top-2")} />
        </span>
      </button>

      <div
        id="mobile-menu"
        ref={panelRef}
        hidden={!open}
        className="fixed inset-x-0 top-[var(--header-h)] bottom-0 z-40 overflow-y-auto border-t border-line bg-paper"
      >
        <nav aria-label="Mobile" className="px-[var(--spacing-gutter)] pt-4 pb-12">
          <button
            type="button"
            aria-expanded={servicesOpen}
            aria-controls="mobile-services"
            onClick={() => setServicesOpen((v) => !v)}
            className="flex min-h-14 w-full items-center justify-between text-2xl font-bold"
          >
            Services
            <svg
              aria-hidden="true"
              viewBox="0 0 12 12"
              className={cn("size-4 transition-transform motion-reduce:transition-none", servicesOpen && "rotate-180")}
              fill="none"
            >
              <path d="M2.5 4.5 6 8l3.5-3.5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <div id="mobile-services" hidden={!servicesOpen} className="pb-4">
            {serviceGroups.map((g) => (
              <div key={g.id} className="mt-4 first:mt-1">
                <p className="text-[0.75rem] font-bold tracking-[0.12em] text-muted uppercase">{g.label}</p>
                <ul className="mt-1">
                  {services
                    .filter((s) => s.group === g.id)
                    .map((s) => (
                      <li key={s.slug}>
                        <Link href={`/services/${s.slug}/`} className="flex min-h-12 items-center gap-3 font-semibold">
                          <GbIcon name={s.slug} className="size-6 text-ink" />
                          {s.shortName}
                        </Link>
                      </li>
                    ))}
                </ul>
              </div>
            ))}
            <Link href="/services/" className="group mt-3 inline-flex min-h-11 items-center gap-1.5 font-bold text-accent-strong">
              View all services <GrowArrow />
            </Link>
          </div>
          <button
            type="button"
            aria-expanded={industriesOpen}
            aria-controls="mobile-industries"
            onClick={() => setIndustriesOpen((v) => !v)}
            className="flex min-h-14 w-full items-center justify-between border-t border-line text-2xl font-bold"
          >
            Industries
            <svg
              aria-hidden="true"
              viewBox="0 0 12 12"
              className={cn("size-4 transition-transform motion-reduce:transition-none", industriesOpen && "rotate-180")}
              fill="none"
            >
              <path d="M2.5 4.5 6 8l3.5-3.5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <div id="mobile-industries" hidden={!industriesOpen} className="pb-4">
            <ul>
              {industries.map((ind) => (
                <li key={ind.slug}>
                  <Link href={`/industries/${ind.slug}/`} className="flex min-h-12 items-center gap-3 font-semibold">
                    <IndustryIcon path={ind.icon} className="size-6 text-ink" />
                    {ind.name}
                  </Link>
                </li>
              ))}
            </ul>
            <Link href="/industries/" className="group mt-3 inline-flex min-h-11 items-center gap-1.5 font-bold text-accent-strong">
              View all industries <GrowArrow />
            </Link>
          </div>
          <ul className="space-y-0 border-t border-line pt-2">
            {primaryNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="flex min-h-14 items-center text-2xl font-bold">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link href={projectCta.href} className={buttonStyles("brand", "mt-6 w-full")}>
            {projectCta.label}
          </Link>
        </nav>
      </div>
    </div>
  );
}
