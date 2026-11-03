import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { IndustryIcon } from "@/components/icons/IndustryIcon";
import { GbIcon, type IconName } from "@/components/icons/GbIcon";
import { Breadcrumbs, CtaBand, FaqList } from "@/components/ui/blocks";
import { ArrowIcon, ArrowLink, ButtonLink, Container, Eyebrow, Section, SectionHeading, cn } from "@/components/ui/primitives";
import { GrowGrid } from "@/components/visuals/GrowGrid";
import { ServiceVisual } from "@/components/visuals/ServiceVisuals";
import { IndustryHeroArt } from "@/components/visuals/IndustryHeroArt";
import { processStages } from "@/content/home";
import { getIndustry, industries } from "@/content/industries";
import { getService, serviceGroups } from "@/content/services";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbSchema, faqSchema, JsonLd } from "@/lib/structured-data";

type Props = { params: Promise<{ slug: string }> };

export const ensureStatic = "navigation";

export function generateStaticParams() {
  return industries.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const ind = getIndustry(slug);
  if (!ind) return {};
  return pageMetadata({ title: ind.metaTitle, description: ind.metaDescription, path: `/industries/${slug}/` });
}

const groupIcon: Record<string, IconName> = {
  design: "web-design-development",
  software: "custom-software-development",
  marketing: "seo",
};

const check = (
  <svg aria-hidden="true" viewBox="0 0 12 12" className="size-3 fill-none stroke-current" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m2.5 6.2 2.2 2.2 4.8-5" />
  </svg>
);

export default async function IndustryPage({ params }: Props) {
  const { slug } = await params;
  const ind = getIndustry(slug);
  if (!ind) notFound();

  const featured = ind.services.map((s) => getService(s)!).filter(Boolean);
  const others = industries.filter((i) => i.slug !== ind.slug);

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Industries", path: "/industries/" },
            { name: ind.name, path: `/industries/${ind.slug}/` },
          ]),
          faqSchema(ind.faqs),
        ]}
      />

      {/* Hero */}
      <section className="on-dark relative isolate overflow-hidden bg-ink text-paper">
        <GrowGrid className="absolute inset-0 -z-10 size-full" />
        <Container className="pt-10 pb-20 sm:pt-12 lg:pb-28">
          <Breadcrumbs
            dark
            items={[
              { name: "Industries", path: "/industries/" },
              { name: ind.name, path: `/industries/${ind.slug}/` },
            ]}
          />
          <div className="mt-10 grid items-center gap-14 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
            <div>
              <p className="flex items-center gap-3 text-eyebrow font-extrabold text-white uppercase">
                <span className="grid size-9 place-items-center rounded-lg bg-white/10">
                  <IndustryIcon path={ind.icon} className="size-5" />
                </span>
                {ind.name}
              </p>
              <h1 className="mt-6 text-h1 font-extrabold text-white">{ind.h1}</h1>
              <p className="mt-6 max-w-2xl text-lead text-white/70">{ind.intro}</p>
              <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-7">
                <ButtonLink href="/contact/" variant="brand" arrow className="min-h-14 px-7 text-base">
                  Talk about your project
                </ButtonLink>
                <ArrowLink href="#solutions" dark className="self-center sm:self-auto">
                  See what we build
                </ArrowLink>
              </div>
            </div>

            <IndustryHeroArt industry={ind} className="mx-auto w-full max-w-[32rem] pb-8 lg:mr-0" />
          </div>
        </Container>
      </section>

      {/* Challenges: orange story panel beside numbered rows */}
      <Section tone="white">
        <Container>
          <div className="grid overflow-hidden rounded-[2rem] border border-line lg:grid-cols-[0.9fr_1.2fr]">
            <div className="relative overflow-hidden bg-accent p-8 text-white sm:p-12">
              <IndustryIcon path={ind.icon} className="pointer-events-none absolute -right-10 -bottom-10 size-72 text-white/15" />
              <p className="relative text-[0.75rem] font-bold tracking-[0.14em] text-white/80 uppercase">The challenges</p>
              <h2 className="relative mt-4 text-h2 font-extrabold text-white">What slows {ind.name.toLowerCase()} businesses down</h2>
              <p className="relative mt-5 max-w-[24rem] text-[1.0625rem] text-white/85">
                If any of these sound familiar, you&rsquo;re in the right place. Each one has a practical fix.
              </p>
              <ArrowLink href="#solutions" dark className="relative mt-8">
                See the fixes
              </ArrowLink>
            </div>
            <ol className="divide-y divide-line bg-white">
              {ind.challenges.map((c, i) => (
                <li key={c.title} className="group grid grid-cols-[3.5rem_1fr] gap-5 p-7 transition-colors duration-300 hover:bg-paper sm:p-9">
                  <span className="grid size-14 place-items-center rounded-2xl bg-paper text-[1.25rem] font-extrabold ring-1 ring-line transition-colors duration-300 group-hover:bg-ink group-hover:text-white group-hover:ring-ink">
                    0{i + 1}
                  </span>
                  <span>
                    <span className="block text-[1.375rem] leading-snug font-extrabold">{c.title}</span>
                    <span className="mt-1.5 block text-[1.0625rem] text-muted">{c.body}</span>
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </Section>

      {/* Solutions by discipline */}
      <Section id="solutions" className="scroll-mt-24">
        <Container>
          <SectionHeading eyebrow="What we build" title={`Solutions for ${ind.name.toLowerCase()}`} />
          <div className="mt-12 grid gap-4 lg:grid-cols-3">
            {serviceGroups.map((g, gi) => {
              const dark = gi === 1;
              return (
                <div key={g.id} className={cn("rounded-3xl p-8", dark ? "on-dark bg-ink text-white" : "border border-line bg-white")}>
                  <span className={cn("grid size-12 place-items-center rounded-2xl", dark ? "bg-accent text-white" : "bg-paper text-ink ring-1 ring-line")}>
                    <GbIcon name={groupIcon[g.id]} className="size-6" />
                  </span>
                  <h3 className={cn("mt-6 text-[1.5rem] font-extrabold", dark && "text-white")}>{g.label}</h3>
                  <ul className="mt-5 space-y-3">
                    {ind.solutions[g.id].map((s) => (
                      <li key={s} className={cn("flex gap-3", dark ? "text-white/85" : "text-ink/85")}>
                        <span className={cn("mt-0.5 grid size-5 shrink-0 place-items-center rounded-full", dark ? "bg-white/15 text-white" : "bg-accent text-white")}>{check}</span>
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* Featured services: one big feature beside compact rows */}
      <Section>
        <Container>
          <div className="flex items-end justify-between gap-6">
            <SectionHeading eyebrow="Services" title="The services that help most" />
            <ArrowLink href="/services/">All services</ArrowLink>
          </div>
          <div className="mt-12 grid gap-5 lg:grid-cols-[1.25fr_1fr]">
            {featured[0] && (
              <Link
                href={`/services/${featured[0].slug}/`}
                className="group on-dark relative flex flex-col overflow-hidden rounded-[2rem] bg-ink text-white"
              >
                <span aria-hidden="true" className="absolute -top-16 -right-16 size-64 rounded-full bg-accent/25 blur-3xl" />
                <span aria-hidden="true" className="relative block p-6 sm:p-8">
                  <span className="block rounded-2xl bg-paper p-4 text-ink transition-transform duration-500 group-hover:-translate-y-1">
                    <ServiceVisual kind={featured[0].visual} label={featured[0].visualCaption} />
                  </span>
                </span>
                <span className="relative mt-auto flex items-end justify-between gap-6 p-8 pt-2">
                  <span>
                    <span className="text-[0.75rem] font-bold tracking-[0.14em] text-accent uppercase">Most requested</span>
                    <span className="mt-2 block text-[1.75rem] leading-tight font-extrabold">{featured[0].name}</span>
                    <span className="mt-2 block max-w-[28rem] text-white/65">{featured[0].summary}</span>
                  </span>
                  <span className="grid size-12 shrink-0 place-items-center rounded-full bg-accent text-white transition-transform group-hover:translate-x-1">
                    <ArrowIcon />
                  </span>
                </span>
              </Link>
            )}
            <ul className="grid gap-5">
              {featured.slice(1).map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/services/${s.slug}/`}
                    className="group flex h-full items-center gap-5 rounded-[2rem] border border-line bg-white p-6 transition-colors duration-300 hover:border-ink sm:p-7"
                  >
                    <span className="grid size-16 shrink-0 place-items-center rounded-2xl bg-paper text-ink ring-1 ring-line transition-colors duration-300 group-hover:bg-accent group-hover:text-white group-hover:ring-accent">
                      <GbIcon name={s.slug} className="size-8" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-[1.25rem] leading-snug font-extrabold group-hover:text-accent-strong">{s.name}</span>
                      <span className="mt-1 block text-[0.9375rem] text-muted">{s.summary}</span>
                    </span>
                    <ArrowIcon className="shrink-0 transition-transform group-hover:translate-x-1" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      {/* Process */}
      <Section tone="white">
        <Container className="grid gap-12 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Eyebrow>How we work</Eyebrow>
            <h2 className="mt-4 text-h2 font-extrabold">Four clear steps, no surprises.</h2>
          </div>
          <ol>
            {processStages.map((s, i) => (
              <li key={s.title} className="group grid gap-x-8 gap-y-2 border-t-2 border-ink py-7 last:border-b-2 sm:grid-cols-[5.5rem_1fr]">
                <span
                  aria-hidden="true"
                  className="text-[3.25rem] leading-[0.85] font-extrabold tracking-tighter text-transparent transition-colors [-webkit-text-stroke:1.5px_var(--color-ink)] group-hover:text-accent group-hover:[-webkit-text-stroke-color:var(--color-accent)]"
                >
                  0{i + 1}
                </span>
                <div>
                  <h3 className="text-[1.375rem] font-extrabold">{s.title}</h3>
                  <p className="mt-1.5 text-ink/75">{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      {/* FAQs */}
      <Section>
        <Container className="grid items-start gap-10 lg:grid-cols-[0.85fr_1.5fr] lg:gap-16">
          <div className="lg:sticky lg:top-28">
            <Eyebrow>FAQs</Eyebrow>
            <h2 className="mt-4 text-h2 font-extrabold">{ind.name} questions, answered.</h2>
          </div>
          <FaqList faqs={ind.faqs} />
        </Container>
      </Section>

      {/* Other industries */}
      <Section tone="white">
        <Container>
          <div className="flex items-end justify-between gap-6">
            <SectionHeading eyebrow="Explore more" title="Other industries we work with" />
            <ArrowLink href="/industries/">All industries</ArrowLink>
          </div>
          <ul className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
            {others.map((o) => (
              <li key={o.slug}>
                <Link
                  href={`/industries/${o.slug}/`}
                  className="group flex h-full flex-col rounded-3xl border border-line bg-paper p-5 transition-colors duration-300 hover:border-ink hover:bg-ink sm:p-6"
                >
                  <span className="flex items-start justify-between">
                    <span className="grid size-12 place-items-center rounded-2xl bg-white text-ink ring-1 ring-line transition-colors duration-300 group-hover:bg-accent group-hover:text-white group-hover:ring-accent">
                      <IndustryIcon path={o.icon} className="size-6" />
                    </span>
                    <ArrowIcon className="-rotate-45 text-muted transition-all duration-300 group-hover:rotate-0 group-hover:text-accent" />
                  </span>
                  <span className="mt-6 text-[1.125rem] leading-snug font-extrabold transition-colors group-hover:text-white">{o.name}</span>
                  <span className="mt-1.5 text-[0.875rem] text-muted transition-colors group-hover:text-white/60">{o.blurb}</span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <CtaBand heading={`Let’s grow your ${ind.name.toLowerCase()} business.`} body="Tell us what you want to improve. A real person will reply." />
    </>
  );
}
