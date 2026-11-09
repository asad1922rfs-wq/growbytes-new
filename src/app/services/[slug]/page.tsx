import { ArticleIllustration } from "@/components/visuals/ArticleIllustration";
import type { Article } from "@/content/types";
import type { Metadata } from "next";
import type React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleCard } from "@/components/cards";
import { ServiceTabs } from "@/components/sections/ServiceTabs";
import { TechStack } from "@/components/sections/TechStack";
import { IndustryTabs } from "@/components/sections/IndustryTabs";
import { industries } from "@/content/industries";
import { EngagementArt } from "@/components/visuals/EngagementArt";
import { ServiceVisual } from "@/components/visuals/ServiceVisuals";
import { Breadcrumbs, CtaBand, FaqList } from "@/components/ui/blocks";
import { ArrowIcon, ArrowLink, ButtonLink, Container, Eyebrow, Section, SectionHeading, cn } from "@/components/ui/primitives";
import { GbIcon } from "@/components/icons/GbIcon";
import { GrowGrid } from "@/components/visuals/GrowGrid";
import { PerspectiveGrid } from "@/components/visuals/PerspectiveGrid";
import { ServiceHeroArt } from "@/components/visuals/ServiceHeroArt";
import { engagementModels } from "@/content/home";
import { articles, getArticle } from "@/content/insights";
import { getService, serviceFaqs, serviceGroups, serviceNoun, services } from "@/content/services";
import { subServicesFor } from "@/content/subservices";
import { pageMetadata } from "@/lib/seo";
import { faqSchema, JsonLd, serviceSchema } from "@/lib/structured-data";

type Props = { params: Promise<{ slug: string }> };

// Every slug is known at build time; keep these pages fully static.
export const ensureStatic = "navigation";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return pageMetadata({ title: service.metaTitle, description: service.metaDescription, path: `/services/${slug}/` });
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const group = serviceGroups.find((g) => g.id === service.group)!;
  const dark = service.group === "software";
  const related = service.related.map((s) => getService(s)!).filter(Boolean);
  const relatedArticles = service.articles.map((a) => getArticle(a)!).filter(Boolean);
  // Always show three guides: the service's own picks first, then others
  const reading = [...relatedArticles, ...articles.filter((a) => !relatedArticles.includes(a))].slice(0, 3);
  const faqs = serviceFaqs(service);
  const specialist = subServicesFor(service.slug);
  // One illustration per card, never the same twice within a service.
  const arts = specialist.reduce<Article["illustration"][]>((used, x) => {
    const pool: Article["illustration"][] = ["storefront", "workflow", "marketing", "funnel", "brief", "buildbuy", "speed", "redesign", "maintenance", "migration"];
    const want = artFor(x.slug);
    return [...used, used.includes(want) ? pool.find((k) => !used.includes(k))! : want];
  }, []);
  const contactHref = `/contact/?service=${service.slug}`;

  return (
    <>
      <JsonLd data={[serviceSchema(service), faqSchema(faqs)]} />

      {/* Hero */}
      <section className={cn("relative isolate overflow-hidden", dark ? "on-dark bg-ink text-paper" : "bg-paper")}>
        {dark ? <GrowGrid className="absolute inset-0 -z-10 size-full" /> : <PerspectiveGrid className="h-[60%]" />}
        <Container className="pt-10 pb-20 sm:pt-12 lg:pb-28">
          <Breadcrumbs
            dark={dark}
            items={[
              { name: "Services", path: "/services/" },
              { name: service.shortName, path: `/services/${service.slug}/` },
            ]}
          />
          <div className="mt-10 grid items-center gap-14 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
            <div>
              <p className={cn("flex items-center gap-3 text-eyebrow font-extrabold uppercase", dark ? "text-white" : "text-[#4a525a]")}>
                <span className={cn("grid size-9 place-items-center rounded-lg", dark ? "bg-white/10" : "bg-white ring-1 ring-line")}>
                  <GbIcon name={service.slug} className="size-5" />
                </span>
                {group.label}
              </p>
              <h1 className={cn("mt-6 text-h1 font-extrabold", dark && "text-white")}>{service.h1}</h1>
              <p className={cn("mt-6 max-w-2xl text-lead", dark ? "text-white/70" : "text-muted")}>{service.intro}</p>
              <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-7">
                <ButtonLink href={contactHref} variant="brand" arrow className="min-h-14 px-7 text-base">
                  Discuss your {serviceNoun(service)} project
                </ButtonLink>
                <ArrowLink href="#included" dark={dark} className="self-center sm:self-auto">
                  See what&rsquo;s included
                </ArrowLink>
              </div>
            </div>
            <ServiceHeroArt service={service} className="mx-auto w-full max-w-[34rem] lg:mr-0" />
          </div>
        </Container>
      </section>

      {/* Problems: dark unless the hero is already dark */}
      <section className={cn("relative", dark ? "border-t border-line bg-paper" : "on-dark bg-ink text-paper")}>
        <Container className="py-20 lg:py-28">
          <div className="max-w-3xl">
            <h2 className={cn("text-h2 font-extrabold", !dark && "text-white")}>{service.problemsHeading}</h2>
            <p className={cn("mt-5 text-lead", dark ? "text-muted" : "text-white/65")}>
              Most businesses we talk to recognise at least two of these.
            </p>
          </div>

          <ul className="mt-14 grid gap-x-16 gap-y-12 md:grid-cols-2">
            {service.problems.map((p) => (
              <li key={p.title} className="flex gap-5">
                <span aria-hidden="true" className="grid size-11 shrink-0 place-items-center rounded-full bg-accent/15 text-accent">
                  <svg viewBox="0 0 20 20" className="size-4 fill-none stroke-current" strokeWidth="2.4" strokeLinecap="round">
                    <path d="m5 5 10 10M15 5 5 15" />
                  </svg>
                </span>
                <div>
                  <h3 className={cn("text-[1.375rem] leading-snug font-extrabold", !dark && "text-white")}>{p.title}</h3>
                  <p className={cn("mt-2 text-base leading-relaxed", dark ? "text-muted" : "text-white/60")}>{p.body}</p>
                </div>
              </li>
            ))}
          </ul>

          <div className={cn("mt-16 flex flex-col gap-5 rounded-3xl p-7 sm:flex-row sm:items-center sm:justify-between sm:p-9", dark ? "bg-ink text-white" : "bg-accent text-white")}>
            <div className="flex items-center gap-4">
              <span aria-hidden="true" className={cn("grid size-11 shrink-0 place-items-center rounded-full", dark ? "bg-accent" : "bg-white text-accent")}>
                <svg viewBox="0 0 20 20" className="size-5 fill-none stroke-current" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m4 10.5 4 4 8-9" />
                </svg>
              </span>
              <p className="text-[1.25rem] leading-snug font-extrabold">Every one of these has a clear fix, and we handle all of it.</p>
            </div>
            <a href="#included" className={cn("shrink-0 rounded-xl px-6 py-3.5 font-bold", dark ? "bg-accent text-white" : "bg-ink text-white")}>
              See how we fix it
            </a>
          </div>
        </Container>
      </section>

      {/* Specialist services: the main way into this service */}
      {specialist.length > 0 && (
        <Section tone="white">
          <Container>
            <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
              <div className="max-w-2xl">
                <h2 className="text-h2 font-extrabold">Our {service.shortName} services</h2>
                <p className="mt-4 text-lead text-muted">Pick the one that fits where you are right now. Each has its own page with the full scope, process and FAQs.</p>
              </div>
              <ArrowLink href={contactHref}>Not sure which? Ask us</ArrowLink>
            </div>
            <ul className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {specialist.map((x, i) => (
                <li key={x.slug}>
                  <Link
                    href={`/services/${service.slug}/${x.slug}/`}
                    className={cn(
                      "group flex h-full flex-col overflow-hidden rounded-3xl p-6 pb-8 transition-all duration-300 hover:-translate-y-1",
                      i === 0 ? "on-dark bg-ink text-white" : "border border-line bg-paper hover:border-ink",
                    )}
                  >
                    <ArticleIllustration kind={arts[i]} className="-mx-3 -mt-3 rounded-2xl transition-transform duration-500 group-hover:scale-[1.02]" />
                    <h3 className="mt-7 text-[1.5rem] leading-tight font-extrabold">{x.name}</h3>
                    <p className={cn("mt-3 flex-1 leading-relaxed", i === 0 ? "text-white/70" : "text-muted")}>{x.metaDescription}</p>
                    <span className={cn("mt-8 inline-flex items-center gap-2 font-bold", i === 0 ? "text-white" : "text-ink group-hover:text-accent-strong")}>
                      Explore {x.name} <ArrowIcon className="transition-transform group-hover:translate-x-1" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </Container>
        </Section>
      )}

      {/* What's included */}
      <Section id="included" className="scroll-mt-24">
        <Container>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeading eyebrow="What's included" title={`Everything a ${service.shortName} project covers`} />
            <p className="max-w-[24rem] text-muted">The exact scope is agreed in writing before any work starts.</p>
          </div>
          <div className="mt-12">
            <ServiceTabs items={service.deliverables} />
          </div>
        </Container>
      </Section>

      {/* Industries */}
      <Section tone="white">
        <Container>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeading eyebrow="Industries" title={`${service.shortName} for your industry`} />
            <ArrowLink href="/industries/">All industries</ArrowLink>
          </div>
          <div className="mt-12">
            <IndustryTabs
              service={service.shortName}
              items={industries.map((i) => ({
                slug: i.slug,
                name: i.name,
                icon: i.icon,
                intro: i.intro,
                bullets: i.solutions[service.group],
                challenges: i.challenges.slice(0, 3),
              }))}
            />
          </div>
        </Container>
      </Section>

      {/* Process */}
      <Section tone="white">
        <Container className="grid gap-12 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Eyebrow>How it works</Eyebrow>
            <h2 className="mt-4 text-h2 font-extrabold">Clear steps, from first call to results.</h2>
            <p className="mt-5 max-w-[24rem] text-muted">You always know what&rsquo;s happening and what&rsquo;s next.</p>
          </div>
          <ol>
            {service.process.map((step, i) => (
              <li key={step.title} className="group grid gap-x-8 gap-y-2 border-t-2 border-ink py-8 last:border-b-2 sm:grid-cols-[6rem_1fr]">
                <span
                  aria-hidden="true"
                  className="text-[3.75rem] leading-[0.85] font-extrabold tracking-tighter text-transparent transition-colors duration-300 [-webkit-text-stroke:1.5px_var(--color-ink)] group-hover:text-accent group-hover:[-webkit-text-stroke-color:var(--color-accent)]"
                >
                  0{i + 1}
                </span>
                <div>
                  <h3 className="text-[1.5rem] leading-tight font-extrabold tracking-tight">{step.title}</h3>
                  <p className="mt-2 max-w-[36rem] text-ink/75">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      <TechStack slug={service.slug} name={service.name} />

      {/* Ways to work */}
      <Section tone="white">
        <Container>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeading eyebrow="Ways to work with us" title="Keep control, or hand it all to us." />
            <p className="max-w-[24rem] text-muted">Not sure which fits? Tell us the goal and we&rsquo;ll recommend one.</p>
          </div>
          <ul className="mt-12 grid gap-5 lg:grid-cols-3">
            {engagementModels.map((m, i) => (
              <li key={m.title}>
                <Link
                  href={contactHref}
                  className="group flex h-full min-h-[22rem] flex-col rounded-3xl bg-paper p-8 transition-colors duration-300 hover:bg-ink"
                >
                  <span className="text-[0.75rem] font-bold tracking-[0.14em] text-accent uppercase">{m.title}</span>
                  <span className="mt-3 text-[1.625rem] leading-tight font-extrabold tracking-tight transition-colors group-hover:text-white">
                    {m.question}
                  </span>
                  <span className="mt-3 text-[0.9375rem] text-muted transition-colors group-hover:text-white/65"><strong className="font-bold text-ink transition-colors group-hover:text-white">Best for:</strong> {m.bestFor}</span>
                  <span className="mt-auto flex items-end justify-between pt-10">
                    <EngagementArt kind={i} />
                    <span className="grid size-12 place-items-center rounded-full bg-white text-ink ring-1 ring-line transition-colors duration-300 group-hover:bg-accent group-hover:text-white group-hover:ring-accent">
                      <ArrowIcon />
                      <span className="sr-only">{m.link}</span>
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* Your part, our part, and what shapes the price */}
      <Section>
        <Container>
          <SectionHeading eyebrow="Working together" title="Your part, our part, and what shapes the price" />
          <div className="mt-12 grid gap-4 lg:grid-cols-[1fr_1fr_1.3fr]">
            <div className="rounded-3xl border border-line bg-white p-8">
              <p className="text-[0.75rem] font-bold tracking-[0.14em] text-muted uppercase">You bring</p>
              <ol className="mt-6 space-y-5">
                {service.clientInputs.map((item, i) => (
                  <li key={item} className="grid grid-cols-[2.25rem_1fr] gap-3">
                    <span className="grid size-9 place-items-center rounded-xl bg-paper text-[0.875rem] font-extrabold ring-1 ring-line">{i + 1}</span>
                    <span className="pt-1.5">{item}</span>
                  </li>
                ))}
              </ol>
            </div>
            <div className="relative overflow-hidden rounded-3xl bg-accent p-8 text-white">
              <svg aria-hidden="true" viewBox="0 0 120 120" className="absolute -right-6 -bottom-6 size-40 text-white/15">
                <path d="M20 90 50 60l20 20 40-45" fill="none" stroke="currentColor" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <p className="text-[0.75rem] font-bold tracking-[0.14em] text-white/75 uppercase">After launch</p>
              <p className="relative mt-6 text-[1.25rem] leading-snug font-bold">{service.afterLaunch}</p>
            </div>
            {/* Price "dials": each factor is a slider that moves the quote */}
            <div className="on-dark rounded-3xl bg-ink p-8 text-white">
              <p className="flex items-center justify-between gap-4">
                <span className="text-[0.75rem] font-bold tracking-[0.14em] text-accent uppercase">What shapes the price</span>
                <span className="rounded-full bg-white/10 px-2.5 py-1 text-[0.6875rem] font-bold text-white/70">Your quote</span>
              </p>
              <ul className="mt-6 space-y-5">
                {service.scopeFactors.map((f, i) => (
                  <li key={f}>
                    <span className="block text-[0.9375rem] text-white/85">{f}</span>
                    <span aria-hidden="true" className="relative mt-3 block h-1.5 rounded-full bg-white/10">
                      {/* Fill and knob move together; the knob sits centred on the end of the fill */}
                      <span
                        className="dial absolute inset-y-0 left-0 rounded-full bg-accent/60"
                        style={{ "--w": `${[38, 62, 45, 74, 30, 55, 66][i % 7]}%`, width: "var(--w)", animationDelay: `${i * 0.4}s` } as React.CSSProperties}
                      >
                        <span className="absolute top-1/2 -right-[7px] -mt-[7px] size-3.5 rounded-full bg-white ring-2 ring-accent" />
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-[0.875rem] text-white/55">No fixed price list. We explain how each of these affects your quote.</p>
            </div>
          </div>
        </Container>
      </Section>

      {/* FAQs */}
      <Section tone="white">
        <Container className="grid items-start gap-10 lg:grid-cols-[0.85fr_1.5fr] lg:gap-16">
          <div className="lg:sticky lg:top-28">
            <Eyebrow>FAQs</Eyebrow>
            <h2 className="mt-4 text-h2 font-extrabold">{service.shortName} questions, answered.</h2>
            <div className="on-dark relative mt-8 overflow-hidden rounded-3xl bg-ink p-8 text-white">
              <span aria-hidden="true" className="absolute -top-10 -right-10 size-36 rounded-full bg-accent/30 blur-2xl" />
              <svg aria-hidden="true" viewBox="0 0 64 48" className="relative h-12 w-16">
                <path d="M6 4h36a4 4 0 0 1 4 4v18a4 4 0 0 1-4 4H20l-9 8v-8H6a4 4 0 0 1-4-4V8a4 4 0 0 1 4-4Z" fill="#f26b3a" />
                <path d="M26 18h30a4 4 0 0 1 4 4v14a4 4 0 0 1-4 4h-4v7l-8-7H26a4 4 0 0 1-4-4V22a4 4 0 0 1 4-4Z" fill="none" stroke="#fff" strokeOpacity="0.7" strokeWidth="2" />
              </svg>
              <p className="relative mt-5 text-[1.375rem] leading-snug font-extrabold">Still have a question?</p>
              <p className="relative mt-2 text-white/65">{service.cta.body}</p>
              <ButtonLink href={contactHref} variant="brand" arrow className="relative mt-6">
                Ask us directly
              </ButtonLink>
            </div>
          </div>
          <FaqList faqs={faqs} />
        </Container>
      </Section>

      {/* Related services */}
      <Section>
        <Container>
          <div className="flex items-end justify-between gap-6">
            <SectionHeading eyebrow="Pairs well with" title="Related services" />
            <ArrowLink href="/services/">All services</ArrowLink>
          </div>
          <ul className="mt-12 grid gap-5 md:grid-cols-3">
            {related.map((r) => (
              <li key={r.slug}>
                <Link href={`/services/${r.slug}/`} className="group flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-white transition-colors duration-300 hover:border-ink">
                  <span aria-hidden="true" className="block overflow-hidden bg-paper p-5">
                    <span className="block transition-transform duration-500 group-hover:scale-[1.03]">
                      <ServiceVisual kind={r.visual} label={r.visualCaption} />
                    </span>
                  </span>
                  <span className="flex flex-1 flex-col p-7">
                    <span className="text-[1.375rem] leading-snug font-extrabold group-hover:text-accent-strong">{r.name}</span>
                    <span className="mt-2 text-muted">{r.summary}</span>
                    <span className="mt-auto inline-flex items-center gap-2 pt-6 font-bold">
                      Explore <ArrowIcon className="transition-transform group-hover:translate-x-1" />
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* Further reading */}
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

      <CtaBand heading={service.cta.heading} body={service.cta.body} href={contactHref} />
    </>
  );
}

/** Picks the closest illustration for a sub-service card from its slug. */
function artFor(slug: string): Article["illustration"] {
  const map: [RegExp, Article["illustration"]][] = [
    [/migrat/, "migration"],
    [/speed|performance/, "speed"],
    [/redesign/, "redesign"],
    [/mainten|support/, "maintenance"],
    [/conversion|cro|landing|funnel|audit/, "funnel"],
    [/(^|-)ai(-|$)|automat|workflow|crm|hubspot|salesforce|chatbot|zapier/, "workflow"],
    [/ads|ppc|seo|email|klaviyo|social|marketing/, "marketing"],
    [/software|saas|app|mvp|api|portal/, "buildbuy"],
    [/ux|ui|design|brand|logo|identity/, "brief"],
    [/shopify|store|ecommerce/, "storefront"],
  ];
  return map.find(([re]) => re.test(slug))?.[1] ?? "storefront";
}
