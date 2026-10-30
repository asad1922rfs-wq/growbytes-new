import { useId } from "react";
import Link from "next/link";
import { CONCEPT_LABEL } from "@/content/work";
import type { Faq } from "@/content/types";
import { breadcrumbSchema, JsonLd } from "@/lib/structured-data";
import { siteConfig } from "@/config/site";
import { ButtonLink, Container, Eyebrow, cn } from "./primitives";

export function ConceptLabel({ className, dark }: { className?: string; dark?: boolean }) {
  return (
    <p
      className={cn(
        "inline-flex items-start gap-2 rounded-sm border px-3 py-2 text-[0.8125rem] font-semibold leading-snug",
        dark ? "border-accent/50 bg-white/5 text-paper" : "border-accent-strong/30 bg-accent-tint text-ink",
        className,
      )}
    >
      <svg aria-hidden="true" viewBox="0 0 16 16" className="mt-px size-4 shrink-0" fill="none">
        <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M8 7v4M8 4.75v.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
      {CONCEPT_LABEL}
    </p>
  );
}

export type Crumb = { name: string; path: string };

export function Breadcrumbs({ items, dark }: { items: Crumb[]; dark?: boolean }) {
  const all = [{ name: "Home", path: "/" }, ...items];
  return (
    <>
      <nav aria-label="Breadcrumb">
        <ol className={cn("flex flex-wrap items-center gap-x-2 gap-y-1 text-sm", dark ? "text-muted-on-dark" : "text-muted")}>
          {all.map((c, i) => {
            const last = i === all.length - 1;
            return (
              <li key={c.path} className="flex items-center gap-2">
                {last ? (
                  <span aria-current="page" className={cn("font-semibold", dark ? "text-paper" : "text-ink")}>
                    {c.name}
                  </span>
                ) : (
                  <>
                    <Link href={c.path} className="underline-offset-4 hover:underline">
                      {c.name}
                    </Link>
                    <span aria-hidden="true">/</span>
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
      <JsonLd data={breadcrumbSchema(all)} />
    </>
  );
}

/** Native <details> keeps answers available without JavaScript. */
export function FaqList({ faqs, className }: { faqs: Faq[]; className?: string }) {
  // Shared name makes the list an exclusive accordion: opening one closes the others.
  const group = useId();
  return (
    <div className={cn("divide-y divide-line border-y border-line", className)}>
      {faqs.map((f) => (
        <details key={f.q} name={group} className="faq group">
          <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-6 py-6 font-bold leading-snug transition-colors hover:text-accent-strong [&::-webkit-details-marker]:hidden">
            <h3 className="text-lg sm:text-[1.25rem] sm:tracking-tight">{f.q}</h3>
            <span
              aria-hidden="true"
              className="relative size-5 shrink-0 before:absolute before:top-1/2 before:left-0 before:h-0.5 before:w-5 before:-translate-y-1/2 before:bg-accent-strong after:absolute after:top-0 after:left-1/2 after:h-5 after:w-0.5 after:-translate-x-1/2 after:bg-accent-strong after:transition-transform group-open:after:scale-y-0"
            />
          </summary>
          <p className="max-w-3xl pb-8 text-[1.0625rem] leading-relaxed text-muted">{f.a}</p>
        </details>
      ))}
    </div>
  );
}

/**
 * Closing band on most pages: a centered message with a button to the
 * inquiry page (a call button is added once a public phone number is set).
 */
export function CtaBand({
  heading,
  body,
  label = "Start a project",
  href = "/contact/",
  eyebrow = "Start a project",
}: {
  heading: string;
  body?: string;
  label?: string;
  href?: string;
  eyebrow?: string;
}) {
  const { phone } = siteConfig.contact;
  return (
    <section className="relative isolate overflow-hidden border-t border-line bg-paper text-ink">
      {/* Grid lines: fine squares with a stronger line every fifth, fading out toward the edges */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]"
        style={{
          backgroundImage:
            "linear-gradient(rgb(194 64 27 / 0.12) 1px, transparent 1px), linear-gradient(90deg, rgb(194 64 27 / 0.12) 1px, transparent 1px), linear-gradient(rgb(23 25 24 / 0.05) 1px, transparent 1px), linear-gradient(90deg, rgb(23 25 24 / 0.05) 1px, transparent 1px)",
          backgroundSize: "80px 80px, 80px 80px, 16px 16px, 16px 16px",
          backgroundPosition: "center",
        }}
      />
      <Container className="py-14 text-center lg:py-20">
        <Eyebrow className="justify-center">{eyebrow}</Eyebrow>
        <h2 className="mx-auto mt-4 max-w-[48rem] text-h2 font-extrabold text-balance">{heading}</h2>
        {body && <p className="mx-auto mt-4 max-w-[38rem] text-lead text-muted">{body}</p>}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <ButtonLink href={href} variant="brand" arrow className="min-h-14 px-8 text-base">
            {label}
          </ButtonLink>
          {phone && (
            <a
              href={`tel:${phone.replace(/[^+d]/g, "")}`}
              className="inline-flex min-h-14 items-center gap-2.5 rounded-lg border border-ink/20 px-7 text-base font-bold transition-colors hover:border-ink hover:bg-white"
            >
              <svg aria-hidden="true" viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 4h3l2 5-2.5 1.5a11 11 0 0 0 6 6L15 14l5 2v3a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />
              </svg>
              Call {phone}
            </a>
          )}
        </div>
      </Container>
    </section>
  );
}

/** Lighter inline CTA used mid-page on service pages and articles. */
export function InlineCta({ heading, body, href = "/contact/", label }: { heading: string; body: string; href?: string; label: string }) {
  return (
    <aside className="rounded-lg border border-line bg-white p-6 sm:p-8">
      <p className="text-h3 font-bold">{heading}</p>
      <p className="mt-2 text-muted">{body}</p>
      <ButtonLink href={href} className="mt-5" arrow>
        {label}
      </ButtonLink>
    </aside>
  );
}
