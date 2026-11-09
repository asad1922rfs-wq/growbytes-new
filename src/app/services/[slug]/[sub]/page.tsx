import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleCard } from "@/components/cards";
import { GbIcon } from "@/components/icons/GbIcon";
import { Breadcrumbs, CtaBand, FaqList } from "@/components/ui/blocks";
import { ArrowIcon, ArrowLink, ButtonLink, Container, Eyebrow, Section, SectionHeading } from "@/components/ui/primitives";
import { PerspectiveGrid } from "@/components/visuals/PerspectiveGrid";
import { getArticle } from "@/content/insights";
import { getService } from "@/content/services";
import { getSubService, subServices, subServicesFor } from "@/content/subservices";
import { absoluteUrl } from "@/config/site";
import { pageMetadata } from "@/lib/seo";
import { faqSchema, JsonLd } from "@/lib/structured-data";

type Props = { params: Promise<{ slug: string; sub: string }> };

// Every page is known at build time; keep them fully static.
export const ensureStatic = "navigation";

export function generateStaticParams() {
  return subServices.map((s) => ({ slug: s.parent, sub: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, sub } = await params;
  const s = getSubService(slug, sub);
  if (!s) return {};
  return pageMetadata({ title: s.metaTitle, description: s.metaDescription, path: `/services/${slug}/${sub}/` });
}

export default async function SubServicePage({ params }: Props) {
  const { slug, sub } = await params;
  const s = getSubService(slug, sub);
  const parent = getService(slug);
  if (!s || !parent) notFound();

  const siblings = subServicesFor(parent.slug).filter((x) => x.slug !== s.slug);
  const reading = s.articles.map((a) => getArticle(a)).filter((a) => a !== undefined).slice(0, 3);
  const contactHref = `/contact/?service=${parent.slug}`;
  const path = `/services/${parent.slug}/${s.slug}/`;

  return (
    <>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "Service",
            name: s.name,
            serviceType: s.name,
            description: s.metaDescription,
            url: absoluteUrl(path),
            provider: { "@id": absoluteUrl("/#organization") },
            isRelatedTo: { "@type": "Service", name: parent.name, url: absoluteUrl(`/services/${parent.slug}/`) },
          },
          faqSchema(s.faqs),
        ]}
      />

      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-paper">
        <PerspectiveGrid className="h-[60%]" />
        <Container className="pt-10 pb-20 sm:pt-12 lg:pb-24">
          <Breadcrumbs
            items={[
              { name: "Services", path: "/services/" },
              { name: parent.shortName, path: `/services/${parent.slug}/` },
              { name: s.name, path },
            ]}
          />
          <div className="mt-10 grid items-start gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
            <div>
              <p className="flex items-center gap-3 text-eyebrow font-extrabold text-[#4a525a] uppercase">
                <span className="grid size-9 place-items-center rounded-lg bg-white ring-1 ring-line">
                  <GbIcon name={parent.slug} className="size-5" />
                </span>
                {parent.shortName}
              </p>
              <h1 className="mt-6 text-h1 font-extrabold">{s.h1}</h1>
              <p className="mt-6 max-w-2xl text-lead text-muted">{s.intro}</p>
              <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-7">
                <ButtonLink href={contactHref} variant="brand" arrow className="min-h-14 px-7 text-base">
                  Talk to us about {s.name}
                </ButtonLink>
                <ArrowLink href="#included" className="self-center sm:self-auto">
                  See what&rsquo;s included
                </ArrowLink>
              </div>
            </div>
            <div className="on-dark rounded-3xl bg-ink p-8 text-white">
              <p className="text-[0.75rem] font-bold tracking-[0.14em] text-accent uppercase">You may need this if</p>
              <ul className="mt-6 space-y-4">
                {s.signs.map((x) => (
                  <li key={x} className="flex gap-3 text-[1rem] text-white/85">
                    <span aria-hidden="true" className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-accent text-white">
                      <svg viewBox="0 0 12 12" className="size-3 fill-none stroke-current" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m2.5 6.2 2.2 2.2 4.8-5" />
                      </svg>
                    </span>
                    {x}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* What's included */}
      <Section id="included" tone="white" className="scroll-mt-24">
        <Container>
          <SectionHeading eyebrow="What's included" title={`What our ${s.name} service covers`} />
          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {s.included.map((p) => (
              <li key={p.title} className="rounded-3xl border border-line bg-paper p-7">
                <h3 className="text-[1.25rem] leading-snug font-extrabold">{p.title}</h3>
                <p className="mt-2 text-[0.9375rem] text-muted">{p.body}</p>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* Process */}
      <Section>
        <Container className="grid gap-12 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Eyebrow>How it works</Eyebrow>
            <h2 className="mt-4 text-h2 font-extrabold">Four clear steps.</h2>
            <p className="mt-5 max-w-[24rem] text-muted">The exact scope and timeline are agreed in writing before any work starts.</p>
          </div>
          <ol>
            {s.process.map((step, i) => (
              <li key={step.title} className="grid gap-x-8 gap-y-2 border-t-2 border-ink py-7 last:border-b-2 sm:grid-cols-[5rem_1fr]">
                <span aria-hidden="true" className="text-[3rem] leading-[0.85] font-extrabold tracking-tighter text-accent">
                  0{i + 1}
                </span>
                <div>
                  <h3 className="text-[1.375rem] leading-tight font-extrabold tracking-tight">{step.title}</h3>
                  <p className="mt-2 max-w-[36rem] text-ink/75">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      {/* FAQs */}
      <Section tone="white">
        <Container className="grid items-start gap-10 lg:grid-cols-[0.85fr_1.5fr] lg:gap-16">
          <div className="lg:sticky lg:top-28">
            <Eyebrow>FAQs</Eyebrow>
            <h2 className="mt-4 text-h2 font-extrabold">{s.name} questions, answered.</h2>
            <p className="mt-5 text-muted">
              Part of our{" "}
              <Link href={`/services/${parent.slug}/`} className="font-bold text-ink underline underline-offset-4 hover:text-accent-strong">
                {parent.name}
              </Link>{" "}
              service.
            </p>
          </div>
          <FaqList faqs={s.faqs} />
        </Container>
      </Section>

      {/* Related offers */}
      {siblings.length > 0 && (
        <Section>
          <Container>
            <div className="flex items-end justify-between gap-6">
              <SectionHeading eyebrow={parent.shortName} title="Related services" />
              <ArrowLink href={`/services/${parent.slug}/`}>All {parent.shortName}</ArrowLink>
            </div>
            <ul className="mt-12 grid gap-5 md:grid-cols-3">
              {siblings.map((x) => (
                <li key={x.slug}>
                  <Link
                    href={`/services/${x.parent}/${x.slug}/`}
                    className="group flex h-full flex-col rounded-3xl border border-line bg-white p-7 transition-colors duration-300 hover:border-ink"
                  >
                    <span className="text-[1.375rem] leading-snug font-extrabold group-hover:text-accent-strong">{x.name}</span>
                    <span className="mt-2 text-muted">{x.metaDescription}</span>
                    <span className="mt-auto inline-flex items-center gap-2 pt-6 font-bold">
                      Explore <ArrowIcon className="transition-transform group-hover:translate-x-1" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </Container>
        </Section>
      )}

      {/* Further reading */}
      {reading.length > 0 && (
        <Section tone="white" size="sm">
          <Container>
            <div className="flex items-end justify-between gap-6">
              <h2 className="text-h2 font-extrabold">Further reading</h2>
              <ArrowLink href="/insights/">All guides</ArrowLink>
            </div>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {reading.map((a) => (
                <ArticleCard key={a.slug} article={a} />
              ))}
            </div>
          </Container>
        </Section>
      )}

      <CtaBand heading={parent.cta.heading} body={parent.cta.body} href={contactHref} />
    </>
  );
}
