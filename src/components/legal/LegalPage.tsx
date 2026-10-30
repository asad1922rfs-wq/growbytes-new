import Link from "next/link";
import type { ReactNode } from "react";
import { Breadcrumbs } from "@/components/ui/blocks";
import { Container, Eyebrow } from "@/components/ui/primitives";
import { PerspectiveGrid } from "@/components/visuals/PerspectiveGrid";

export type LegalSection = { id: string; heading: string; body: ReactNode };

const policies = [
  { name: "Privacy policy", path: "/privacy/" },
  { name: "Terms of use", path: "/terms/" },
  { name: "Cookie policy", path: "/cookies/" },
  { name: "Accessibility", path: "/accessibility/" },
];

/** Shared layout for policy pages: header, sticky contents, numbered sections. */
export function LegalPage({
  title,
  path,
  intro,
  updated,
  sections,
}: {
  title: string;
  path: string;
  intro: string;
  updated: string;
  sections: LegalSection[];
}) {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-paper">
        <PerspectiveGrid className="h-[70%]" />
        <Container className="pt-10 pb-14 sm:pt-12 lg:pb-16">
          <Breadcrumbs items={[{ name: title, path }]} />
          <div className="mt-10 max-w-3xl">
            <Eyebrow>Legal</Eyebrow>
            <h1 className="mt-4 text-h1 font-extrabold">{title}</h1>
            <p className="mt-5 text-lead text-muted">{intro}</p>
            <p className="mt-6 inline-flex rounded-full bg-white px-3 py-1.5 text-[0.8125rem] font-semibold ring-1 ring-line">Last updated: {updated}</p>
          </div>
        </Container>
      </section>

      <section className="border-t border-line bg-white">
        <Container className="grid gap-12 py-14 lg:grid-cols-[17rem_minmax(0,1fr)] lg:gap-16 lg:py-20">
          <aside className="space-y-5 lg:sticky lg:top-28 lg:self-start">
            <nav aria-label="On this page" className="rounded-3xl border border-line p-6">
              <p className="text-[0.75rem] font-bold tracking-[0.14em] text-muted uppercase">On this page</p>
              <ol className="mt-4 space-y-1">
                {sections.map((s, i) => (
                  <li key={s.id}>
                    <a href={`#${s.id}`} className="group flex gap-3 rounded-lg px-2 py-1.5 text-[0.9375rem] leading-snug hover:bg-paper">
                      <span className="text-[0.8125rem] font-bold text-accent tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                      <span className="group-hover:text-accent-strong">{s.heading}</span>
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
            <nav aria-label="Other policies" className="rounded-3xl bg-paper p-6">
              <p className="text-[0.75rem] font-bold tracking-[0.14em] text-muted uppercase">Policies</p>
              <ul className="mt-3 space-y-1.5">
                {policies.map((p) => (
                  <li key={p.path}>
                    <Link
                      href={p.path}
                      aria-current={p.path === path ? "page" : undefined}
                      className="font-semibold hover:text-accent-strong aria-[current=page]:text-accent-strong"
                    >
                      {p.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          <article className="prose-gb article-body">
            {sections.map((s, i) => (
              <section key={s.id} aria-labelledby={s.id}>
                <h2 id={s.id}>
                  <span className="mr-2 text-accent">{String(i + 1).padStart(2, "0")}</span>
                  {s.heading}
                </h2>
                {s.body}
              </section>
            ))}
            <div className="!mt-14 rounded-3xl bg-paper p-7 ring-1 ring-line">
              <p className="font-bold">Questions about this policy?</p>
              <p className="!mt-2 text-muted">
                Email us at{" "}
                <a href="mailto:info@growbytes.co" className="font-semibold">
                  info@growbytes.co
                </a>{" "}
                and a person will reply.
              </p>
            </div>
          </article>
        </Container>
      </section>
    </>
  );
}
