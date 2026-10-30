import Link from "next/link";
import { ButtonLink, Container, Eyebrow } from "@/components/ui/primitives";
import { services } from "@/content/services";

export const metadata = { title: "Page not found", robots: { index: false, follow: true } };

export default function NotFound() {
  return (
    <section className="bg-paper">
      <Container className="grid gap-12 py-section lg:grid-cols-[1.2fr_1fr]">
        <div>
          <Eyebrow>Error 404</Eyebrow>
          <h1 className="mt-4 text-h1 font-extrabold">We couldn&apos;t find that page</h1>
          <p className="mt-5 max-w-xl text-lead text-muted">
            The link may be out of date, or the page may have moved. These pages might help you find what you were looking
            for.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/" arrow>
              Go to the homepage
            </ButtonLink>
            <ButtonLink href="/contact/" variant="secondary">
              Start a project
            </ButtonLink>
          </div>
        </div>
        <nav aria-label="Helpful links" className="rounded-xl border border-line bg-white p-7">
          <h2 className="font-bold">Services</h2>
          <ul className="mt-3 grid gap-2">
            {services.map((s) => (
              <li key={s.slug}>
                <Link href={`/services/${s.slug}/`} className="underline decoration-line decoration-2 underline-offset-4 hover:decoration-accent-strong">
                  {s.name}
                </Link>
              </li>
            ))}
          </ul>
          <h2 className="mt-6 font-bold">Elsewhere</h2>
          <ul className="mt-3 grid gap-2">
            {[
              ["Concept work", "/work/"],
              ["Insights", "/insights/"],
              ["About", "/about/"],
            ].map(([l, h]) => (
              <li key={h}>
                <Link href={h} className="underline decoration-line decoration-2 underline-offset-4 hover:decoration-accent-strong">
                  {l}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
    </section>
  );
}
