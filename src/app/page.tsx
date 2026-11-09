import Link from "next/link";
import { HeroPainPoints } from "@/components/visuals/HeroPainPoints";
import { HeroAiArt } from "@/components/visuals/HeroAiArt";
import { HeroBuildArt } from "@/components/visuals/HeroBuildArt";
import { HeroSlider } from "@/components/sections/HeroSlider";
import { clientProjects } from "@/content/clients";
import { PerspectiveGrid } from "@/components/visuals/PerspectiveGrid";
import { aiCodingTools, buildTools, marketingTools, ToolRow } from "@/components/sections/AiTools";
import {
  ClientProject,
  ClientProjectCompact,
} from "@/components/sections/ClientProject";
import { GbIcon } from "@/components/icons/GbIcon";
import { NeedIcon } from "@/components/icons/NeedIcon";
import { AutomationFeature } from "@/components/sections/AutomationAccordion";
import { NeedServicePicker } from "@/components/sections/NeedServicePicker";
import { ServicesIndex } from "@/components/sections/ServicesIndex";
import { GrowGrid } from "@/components/visuals/GrowGrid";
import { CtaBand, FaqList } from "@/components/ui/blocks";
import { faqSchema, JsonLd } from "@/lib/structured-data";
import {
  ArrowIcon,
  ArrowLink,
  ButtonLink,
  Container,
  Eyebrow,
  Section,
  cn,
} from "@/components/ui/primitives";
import {
  siAmazonwebservices,
  siClaude,
  siGoogle,
  siHubspot,
  siMeta,
  siOpenai,
  siSalesforce,
  siShopify,
} from "simple-icons";
import { ArticleIllustration } from "@/components/visuals/ArticleIllustration";
import {
  automationItems,
  businessNeeds,
  engagementModels,
  gettingStarted,
  hero,
  homeFaqs,
  nextStep,
  platforms,
  processStages,
} from "@/content/home";
import { articles, formatDate } from "@/content/insights";
import { serviceGroups, services } from "@/content/services";
import { CountUp } from "@/components/ui/CountUp";
import { GlobalReach } from "@/components/visuals/GlobalReach";
import { pageMetadata } from "@/lib/seo";


export const metadata = pageMetadata({
  title: "Web Design, SEO & AI Automation Agency | Growbytes",
  description:
    "Web design and digital marketing agency for growing businesses. Websites, Shopify stores, custom software, SEO, Google Ads, and AI automation from one team.",
  path: "/",
});

export default function HomePage() {
  const [leadArticle, ...moreArticles] = articles;
  return (
    <>
      {/* Hero: message first, one large image slot */}
      <section className="relative isolate overflow-hidden bg-paper">
        <PerspectiveGrid />
        <Container className="pt-12 pb-16 sm:pt-16 lg:pt-20 lg:pb-20">
          <HeroSlider
            labels={["Marketing and growth", "AI automation", "Design and development"]}
            slides={[
              <div key="main">
                <div className="hs-grid grid items-center gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
                  <div>
                    <h1 className="text-display font-extrabold lg:text-[min(4.7vw,4.5rem)] lg:leading-[1.02]">
                      {hero.headlineLines.map((line, i) => (
                        <span
                          key={line}
                          className={
                            i === hero.headlineLines.length - 1
                              ? "text-accent lg:block"
                              : "lg:block"
                          }
                        >
                          {line}{" "}
                        </span>
                      ))}
                    </h1>
                    <p className="mt-7 max-w-[34rem] text-lead text-muted">
                      {hero.body}
                    </p>
                    <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-7">
                      <ButtonLink
                        href={hero.primary.href}
                        variant="brand"
                        arrow
                        className="min-h-14 px-7 text-base"
                      >
                        {hero.primary.label}
                      </ButtonLink>
                      <ArrowLink
                        href={hero.secondary.href}
                        className="self-center sm:self-auto"
                      >
                        {hero.secondary.label}
                      </ArrowLink>
                    </div>
                    <ToolRow title="Marketing tools we use" tools={marketingTools} className="mt-10 hidden sm:block" />
                  </div>
                  <div className="relative mx-auto w-full max-w-[22rem] max-sm:-my-11 max-sm:scale-[0.8] sm:max-w-[32rem] lg:mr-0">
                    {/* Brand block from the logo, offset behind the artwork */}
                    <div
                      aria-hidden="true"
                      className="absolute -top-5 -right-5 hidden h-[62%] w-[42%] rounded-xl bg-accent sm:block"
                    />
                    <HeroPainPoints />
                  </div>
                </div>
                {/* On phones the tools follow the artwork */}
                <ToolRow title="Marketing tools we use" tools={marketingTools} className="mt-10 sm:hidden" />
              </div>,
              <div key="ai">
                <div className="hs-grid grid items-center gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
                  <div>
                    <h2 className="text-display font-extrabold lg:text-[min(4.7vw,4.5rem)] lg:leading-[1.02]">
                      <span className="lg:block">AI that takes the </span>
                      <span className="lg:block">busywork off </span>
                      <span className="text-accent lg:block">your team.</span>
                    </h2>
                    <p className="mt-7 max-w-[34rem] text-lead text-muted">
                      AI automation for small businesses: chatbots that answer
                      customers, tools that keep your CRM up to date, and
                      follow-ups that go out on time. A person still approves
                      anything important.
                    </p>
                    <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-7">
                      <ButtonLink
                        href="/contact/?service=ai-automation"
                        variant="brand"
                        arrow
                        className="min-h-14 px-7 text-base"
                      >
                        Discuss your workflow
                      </ButtonLink>
                      <ArrowLink
                        href="/services/ai-automation/"
                        className="self-center sm:self-auto"
                      >
                        Explore AI automation
                      </ArrowLink>
                    </div>
                    <ToolRow title="AI coding tools we use" tools={aiCodingTools} className="mt-10 hidden sm:block" />
                  </div>
                  <div className="relative mx-auto w-full max-w-[22rem] max-sm:-my-11 max-sm:scale-[0.8] sm:max-w-[32rem] lg:mr-0">
                    {/* Brand block from the logo, offset behind the artwork */}
                    <div
                      aria-hidden="true"
                      className="absolute -top-5 -right-5 hidden h-[62%] w-[42%] rounded-xl bg-accent sm:block"
                    />
                    <HeroAiArt />
                  </div>
                </div>
                {/* On phones the tools follow the artwork */}
                <ToolRow title="AI coding tools we use" tools={aiCodingTools} className="mt-10 sm:hidden" />
              </div>,
              <div key="build">
                <div className="hs-grid grid items-center gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
                  <div>
                    <h2 className="text-display font-extrabold lg:text-[min(4.7vw,4.5rem)] lg:leading-[1.02]">
                      <span className="lg:block">Websites and </span>
                      <span className="lg:block">software built </span>
                      <span className="text-accent lg:block">to perform.</span>
                    </h2>
                    <p className="mt-7 max-w-[34rem] text-lead text-muted">
                      Website design and development, Shopify stores, mobile
                      apps, and custom software. Fast, easy to use, and simple
                      for your team to update.
                    </p>
                    <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-7">
                      <ButtonLink
                        href="/contact/"
                        variant="brand"
                        arrow
                        className="min-h-14 px-7 text-base"
                      >
                        Start a project
                      </ButtonLink>
                      <ArrowLink
                        href="/services/"
                        className="self-center sm:self-auto"
                      >
                        Explore our services
                      </ArrowLink>
                    </div>
                    <ToolRow title="Design & development tools we use" tools={buildTools} className="mt-10 hidden sm:block" />
                  </div>
                  <div className="relative mx-auto w-full max-w-[22rem] max-sm:-my-11 max-sm:scale-[0.8] sm:max-w-[32rem] lg:mr-0">
                    {/* Brand block from the logo, offset behind the artwork */}
                    <div
                      aria-hidden="true"
                      className="absolute -top-5 -right-5 hidden h-[62%] w-[42%] rounded-xl bg-accent sm:block"
                    />
                    <HeroBuildArt />
                  </div>
                </div>
                {/* On phones the tools follow the artwork */}
                <ToolRow title="Design & development tools we use" tools={buildTools} className="mt-10 sm:hidden" />
              </div>,
            ]}
          />
        </Container>
      </section>

      {/* Platforms: what we build on, presented as a quiet wordmark grid */}
      <section
        aria-labelledby="platforms-heading"
        className="bg-white py-12 lg:py-16"
      >
        <Container className="grid items-center gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
          <div>
            <h2
              id="platforms-heading"
              className="max-w-[28rem] text-[1.75rem] leading-[1.18] font-extrabold tracking-tight text-balance lg:text-[2.25rem]"
            >
              Built on the platforms your business{" "}
              <span className="underline decoration-accent decoration-[3px] underline-offset-[6px]">
                already relies on
              </span>
              <span className="text-accent">.</span>
            </h2>
            <p className="mt-4 max-w-[26rem] text-[1.0625rem] leading-relaxed text-ink/75">
              We work inside the tools you use today, so your team keeps the
              accounts, the data, and the know-how.
            </p>
          </div>
          <PlatformGrid />
        </Container>
      </section>

      {/* Next step: intro row, then three open columns (no cards, no numbering) */}
      <Section tone="white">
        <Container>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-3xl">
              <h2 className="text-[clamp(2rem,1.5rem+1.6vw,3rem)] leading-[1.08] font-extrabold tracking-[-0.025em]">
                {nextStep.heading}
              </h2>
              <p className="mt-4 text-lead text-muted">{nextStep.intro}</p>
            </div>
          </div>

          {/* Three panels; the middle one is dark. Subgrid keeps icon, heading,
              description and services aligned across panels without fixed heights. */}
          <ul className="mt-12 grid gap-5 md:grid-cols-3 md:grid-rows-[repeat(4,auto)] lg:gap-6">
            {businessNeeds.map((need, i) => {
              const dark = i === 1;
              return (
                <li
                  key={need.title}
                  className={cn(
                    "flex flex-col rounded-2xl p-7 md:row-span-4 md:grid md:grid-rows-subgrid md:gap-y-0 lg:p-9",
                    dark
                      ? "on-dark bg-ink text-paper"
                      : "border border-line bg-white",
                  )}
                >
                  <NeedIcon
                    name={need.icon}
                    className={cn("size-14", dark ? "text-paper" : "text-ink")}
                  />
                  <h3 className="mt-7 text-[clamp(1.4375rem,1.3rem+0.4vw,1.6875rem)] leading-[1.2] font-extrabold tracking-tight text-balance">
                    {need.title}
                  </h3>
                  <p
                    className={cn(
                      "mt-4 text-[1.0625rem] leading-relaxed",
                      dark ? "text-muted-on-dark" : "text-muted",
                    )}
                  >
                    {need.body}
                  </p>

                  <NeedServicePicker dark={dark} keywords={need.keywords} />
                </li>
              );
            })}
          </ul>
          <div className="mt-10 text-center">
            <ArrowLink href={nextStep.aside.href}>
              {nextStep.aside.label}
            </ArrowLink>
          </div>
        </Container>
      </Section>

      {/* Services */}
      <Section id="services" size="none" className="pt-section pb-10 lg:pb-14">
        <Container>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <Eyebrow>Services</Eyebrow>
              <h2 className="mt-4 max-w-3xl text-h2 font-extrabold">
                Web design, marketing, and software
                <br className="hidden sm:block" /> services in one place.
              </h2>
            </div>
            <ArrowLink href="/services/">Compare all services</ArrowLink>
          </div>
          <div className="mt-12">
            <ServicesIndex />
          </div>
        </Container>
      </Section>

      {/* AI automation: introduction and image on the left, capability accordion on the right */}
      <section
        aria-labelledby="automation-heading"
        className="bg-white py-16 sm:py-20 lg:py-24"
      >
        <Container>
          <AutomationFeature
            items={automationItems}
            intro={
              <>
                <Eyebrow>AI automation &amp; integrations</Eyebrow>
                <h2
                  id="automation-heading"
                  className="mt-4 text-[2rem] leading-[1.12] font-extrabold tracking-tight [text-wrap:wrap] sm:text-[2.25rem] lg:text-[clamp(2.375rem,3vw,2.75rem)]"
                >
                  Put AI to work on the tasks that slow you down.
                </h2>
                <p className="mt-5 text-[1.0625rem] leading-relaxed text-ink/75">
                  From incoming inquiries to everyday admin, we help you
                  identify where AI can be useful, connect it to your tools, and
                  keep your team in control.
                </p>
              </>
            }
            href="/services/ai-automation/"
          />
        </Container>
      </section>

      {/* Call to action on a growing grid */}
      <section
        aria-labelledby="grid-cta-heading"
        className="on-dark relative isolate overflow-hidden bg-ink py-24 text-paper sm:py-28 lg:py-36"
      >
        <GrowGrid className="absolute inset-0 -z-10 size-full" />
        <Container className="text-center">
          <p className="text-eyebrow font-extrabold text-white uppercase">
            Ready when you are
          </p>
          <h2
            id="grid-cta-heading"
            className="mx-auto mt-4 max-w-[46rem] text-[2.25rem] leading-[1.1] font-extrabold tracking-tight text-balance text-white sm:text-[2.75rem] lg:text-[3.25rem]"
          >
            Tell us what is slowing you down.{" "}
            <span className="text-accent">We will map the fix.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-[36rem] text-lead text-white/70">
            One short call to understand the problem, then a clear plan with
            scope, timeline, and cost. No obligation.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
            <ButtonLink
              href="/contact/"
              variant="brand"
              arrow
              className="min-h-14 px-7 text-base"
            >
              Book a free consultation
            </ButtonLink>
            <ArrowLink href="/services/" dark>
              Browse services
            </ArrowLink>
          </div>
        </Container>
      </section>

      {/* Selected work */}
      <Section id="work" tone="white">
        <Container>
          <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr] lg:items-end">
            <div>
              <Eyebrow>Selected work</Eyebrow>
              <h2 className="mt-4 max-w-3xl text-h2 font-extrabold">
                Client work we have built and shipped.
              </h2>
              <p className="mt-5 max-w-2xl text-lead text-muted">
                A Shopify store, a publishing platform, and an HR system, each
                shown with the client’s permission.
              </p>
            </div>
            <div className="lg:justify-self-end">
              <ArrowLink href="/work/">See more work</ArrowLink>
            </div>
          </div>
          <div className="mt-14">
            <ClientProject project={clientProjects[0]} />
          </div>

          <div className="mt-14 grid gap-14 md:grid-cols-2 md:gap-10">
            <ClientProjectCompact project={clientProjects[1]} />
            <ClientProjectCompact project={clientProjects[2]} />
          </div>
        </Container>
      </Section>

      {/* Process: a simple four-step timeline on dark */}
      <Section tone="ink" className="on-dark text-paper">
        <Container>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <Eyebrow dark>How we work</Eyebrow>
              <h2 className="mt-4 max-w-[40rem] text-h2 font-extrabold text-white">
                From first conversation{" "}
                <span className="text-accent">to what’s next.</span>
              </h2>
            </div>
            <ArrowLink href="/about/" dark>
              How we work in detail
            </ArrowLink>
          </div>
          <ol className="mt-14 grid gap-10 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4 lg:gap-8">
            {processStages.map((stage) => (
              <li key={stage.title}>
                <div aria-hidden="true" className="flex items-center">
                  <span className="grid size-10 shrink-0 place-items-center rounded-full bg-accent/20">
                    <span className="size-5 rounded-full bg-accent" />
                  </span>
                  <span className="h-px flex-1 bg-gradient-to-r from-accent/70 to-transparent" />
                </div>
                <h3 className="mt-6 text-[1.5rem] leading-tight font-extrabold tracking-tight text-white lg:text-[1.75rem]">
                  {stage.title}
                </h3>
                <p className="mt-3 text-[1.0625rem] leading-relaxed text-white/70">
                  {stage.body}
                </p>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      {/* Engagement options: centred intro, three equal cards overlapping a panel that explains how work starts */}
      <Section>
        <Container>
          <div className="mx-auto max-w-[46rem] text-center">
            <Eyebrow className="justify-center">Ways to work with us</Eyebrow>
            <h2 className="mt-4 text-h2 font-extrabold text-balance">
              A way of working that fits your project.
            </h2>
            <p className="mx-auto mt-4 max-w-[38rem] text-[1.125rem] leading-relaxed text-ink/75">
              Start with a defined project, ongoing support, or a phased build.
              We’ll agree the scope and cost before work begins.
            </p>
          </div>

          <ul className="relative z-10 mt-12 grid gap-5 md:grid-cols-3 sm:px-10 lg:gap-6 lg:px-16">
            {engagementModels.map((m, i) => (
              <li
                key={m.title}
                className="group relative flex min-h-[17rem] flex-col overflow-hidden rounded-xl border border-line bg-white p-6 transition-colors duration-300 ease-out focus-within:border-ink focus-within:bg-ink hover:border-ink hover:bg-ink lg:p-7"
              >
                <p className="text-[0.75rem] font-bold tracking-[0.12em] text-accent-strong uppercase transition-colors duration-300 group-hover:text-accent group-focus-within:text-accent">
                  {m.title}
                </p>
                <h3 className="mt-3 text-[1.5rem] leading-snug font-bold tracking-tight transition-colors lg:text-[1.75rem] lg:leading-[1.2] duration-300 group-hover:text-white group-focus-within:text-white">
                  <Link
                    href={`/contact/?engagement=${m.engagement}`}
                    className="after:absolute after:inset-0 after:rounded-xl focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-offset-2 focus-visible:after:outline-accent"
                  >
                    {m.question}
                  </Link>
                </h3>
                <p className="mt-3 text-base leading-relaxed text-ink/75 transition-colors duration-300 group-hover:text-white/70 group-focus-within:text-white/70">
                  {m.body}
                </p>
                <div className="mt-auto flex items-end justify-between pt-8">
                  <DotGrid filled={dotFill[i]} />
                  <span className="grid size-10 place-items-center rounded-full bg-ink text-white transition-colors duration-300 group-hover:bg-accent-button group-focus-within:bg-accent-button">
                    <ArrowIcon />
                    <span className="sr-only">{m.link}</span>
                  </span>
                </div>
              </li>
            ))}
          </ul>

          <div className="-mt-20 rounded-2xl bg-[#e9ecf0] px-5 pt-32 pb-12 sm:px-10 lg:-mt-28 lg:px-16 lg:pt-44 lg:pb-16">
            <h3 className="mx-auto max-w-[36rem] text-center text-[1.75rem] leading-tight font-extrabold tracking-tight text-balance lg:text-[2.25rem]">
              How every engagement starts.
            </h3>
            <div className="mx-auto mt-12 grid max-w-[60rem] gap-10 md:grid-cols-[14rem_1fr] md:gap-14">
              <div className="md:pt-1">
                <p className="text-[1.125rem] leading-snug font-bold">
                  Not sure which fits?
                </p>
                <p className="mt-2 text-base leading-relaxed text-ink/75">
                  Describe the problem instead. We’ll suggest the engagement
                  that suits it.
                </p>
              </div>
              <div>
                <ol className="relative grid gap-9">
                  {gettingStarted.map((step) => (
                    <li
                      key={step.title}
                      className="relative grid grid-cols-[3rem_1fr] gap-x-5"
                    >
                      {/* Grey dashed segment below each ring, stopping short of the next one */}
                      <span
                        aria-hidden="true"
                        className="absolute top-[3.75rem] -bottom-6 left-6 border-l border-dashed border-ink/35"
                      />
                      <span className="relative grid size-12 place-items-center rounded-full border-[1.5px] border-accent bg-white text-accent">
                        <GbIcon name={step.icon} className="size-5" />
                      </span>
                      <div className="pt-1">
                        <p className="text-[1.25rem] leading-snug font-bold tracking-tight">
                          {step.title}
                        </p>
                        <p className="mt-1.5 text-base leading-relaxed text-ink/75">
                          {step.body}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
                <div className="relative mt-9 pl-[4.25rem]">
                  {/* Last segment bends into the button */}
                  <span
                    aria-hidden="true"
                    className="absolute -top-3 left-6 h-[calc(50%+0.75rem)] w-10 rounded-bl-xl border-b border-l border-dashed border-ink/35"
                  />
                  <ButtonLink href="/contact/" variant="brand" arrow>
                    Start a project
                  </ButtonLink>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Where we work: map with stat cards on the left, message on the right (counts come from site data) */}
      <Section tone="white">
        <Container className="grid items-center gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
          <div className="relative order-2 mx-auto w-full max-w-[30rem] lg:order-1">
            <GlobalReach />
          </div>
          <div className="order-1 lg:order-2">
            <Eyebrow>Where we work</Eyebrow>
            <h2 className="mt-4 text-h2 font-extrabold">
              One team, working with{" "}
              <span className="text-accent">businesses worldwide.</span>
            </h2>
            <p className="mt-8 max-w-[38rem] text-[1.0625rem] leading-relaxed text-ink/75">
              We work remotely with clients around the world. Meetings are
              planned around your time zone, and multilingual or right-to-left
              layouts can be included in scope.
            </p>
            <dl className="mt-10 grid grid-cols-2 gap-y-8 border-t border-line pt-8">
              {(
                [
                  {
                    n: services.length,
                    suffix: "",
                    label: "Services under one roof",
                  },
                  { n: 100, suffix: "%", label: "Remote, across time zones" },
                  {
                    n: serviceGroups.length,
                    suffix: "",
                    label: "Disciplines: design, software, marketing",
                  },
                  { n: 1, suffix: "", label: "Team from brief to support" },
                ] as const
              ).map((st, i) => (
                <div
                  key={st.label}
                  className={cn(
                    "pr-6",
                    i % 2 === 1 && "border-l border-line pl-6",
                  )}
                >
                  <dt className="sr-only">{st.label}</dt>
                  <dd>
                    <span className="block text-[3.75rem] leading-none font-semibold tracking-tighter lg:text-[4.5rem]">
                      <CountUp to={st.n} suffix={st.suffix} />
                    </span>
                    <span className="mt-3 block text-[1.0625rem] leading-snug text-ink/75">
                      {st.label}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </Container>
      </Section>

      {/* Insights: one lead article, the rest as a list */}
      <Section>
        <Container>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <Eyebrow>Insights</Eyebrow>
              <h2 className="mt-4 max-w-2xl text-h2 font-extrabold">
                Read these before you brief an agency, including us.
              </h2>
            </div>
            <ArrowLink href="/insights/">All insights</ArrowLink>
          </div>
          <div className="mt-12 grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-14">
            <article className="group relative">
              <ArticleIllustration kind={leadArticle.illustration} />
              <p className="mt-6 text-sm font-bold tracking-[0.1em] text-accent-strong uppercase">
                {leadArticle.category}
              </p>
              <h3 className="mt-2 text-[1.75rem] leading-tight font-extrabold tracking-tight">
                <Link
                  href={`/insights/${leadArticle.slug}/`}
                  className="after:absolute after:inset-0 group-hover:underline group-hover:decoration-accent group-hover:underline-offset-4"
                >
                  {leadArticle.title}
                </Link>
              </h3>
              <p className="mt-3 max-w-xl text-[1.0625rem] text-muted">
                {leadArticle.description}
              </p>
            </article>
            <ul className="self-start border-t border-ink">
              {moreArticles.map((a) => (
                <li
                  key={a.slug}
                  className="group relative grid grid-cols-[1fr_7.5rem] gap-5 border-b border-line py-7 sm:grid-cols-[1fr_10rem]"
                >
                  <div>
                    <p className="text-sm font-bold tracking-[0.1em] text-accent-strong uppercase">
                      {a.category}
                    </p>
                    <h3 className="mt-2 text-xl leading-snug font-bold tracking-tight">
                      <Link
                        href={`/insights/${a.slug}/`}
                        className="after:absolute after:inset-0 group-hover:underline group-hover:decoration-accent group-hover:underline-offset-4"
                      >
                        {a.title}
                      </Link>
                    </h3>
                    <p className="mt-2 text-sm text-muted">
                      <time dateTime={a.published}>
                        {formatDate(a.published)}
                      </time>{" "}
                      · {a.readingMinutes} min read
                    </p>
                  </div>
                  <ArticleIllustration kind={a.illustration} />
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      {/* FAQs */}
      <Section tone="white">
        <Container className="grid gap-10 lg:grid-cols-[0.75fr_1.5fr]">
          <div>
            <h2 className="text-h2 font-extrabold">
              Questions we hear before most projects
            </h2>
            <p className="mt-5 max-w-xs text-muted">
              Something else on your mind?{" "}
              <Link
                href="/contact/"
                className="font-bold text-ink underline decoration-accent decoration-2 underline-offset-4"
              >
                Ask us directly
              </Link>
              .
            </p>
            {/* Simple line art: a question met by an answer */}
            <svg
              aria-hidden="true"
              viewBox="0 0 280 200"
              className="mt-12 hidden w-full max-w-[20rem] lg:block"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path
                d="M24 30h132a14 14 0 0 1 14 14v52a14 14 0 0 1-14 14H76l-26 22v-22H24a14 14 0 0 1-14-14V44a14 14 0 0 1 14-14z"
                stroke="#171918"
                strokeWidth="2"
              />
              <path
                d="M78 58a12 12 0 1 1 18 10c-4 2.5-6 5-6 9"
                stroke="#171918"
                strokeWidth="2.5"
              />
              <circle cx="90" cy="88" r="2" fill="#171918" />
              <path
                d="M256 92H136a14 14 0 0 0-14 14v48a14 14 0 0 0 14 14h76l26 22v-22h18a14 14 0 0 0 14-14v-48a14 14 0 0 0-14-14z"
                fill="#fdebe5"
                stroke="#F66135"
                strokeWidth="2"
              />
              <path
                d="M146 118h80M146 132h96M146 146h56"
                stroke="#F66135"
                strokeWidth="2.5"
              />
              <path d="M222 150l7 7 13-14" stroke="#171918" strokeWidth="2.5" />
            </svg>
          </div>
          <FaqList faqs={homeFaqs} />
          <JsonLd data={faqSchema(homeFaqs)} />
        </Container>
      </Section>

      <CtaBand
        heading="Tell us what needs to work better."
        body="A few sentences about your business and the problem is enough to start. We reply with questions or a suggested first step."
      />
    </>
  );
}

/**
 * Growth "bytes": a 4×3 field of rounded squares (echoing the logo) where orange
 * columns rise higher as the engagement deepens. Heights are per column, in blocks.
 */
const dotFill = [
  [1, 1, 0, 0],
  [1, 1, 2, 2],
  [1, 2, 3, 3],
];

function DotGrid({ filled }: { filled: number[] }) {
  return (
    <span aria-hidden="true" className="grid grid-cols-4 gap-1">
      {Array.from({ length: 12 }, (_, k) => {
        const col = k % 4;
        const rowFromBottom = 2 - Math.floor(k / 4);
        const on = rowFromBottom < filled[col];
        return (
          <span
            key={k}
            className={cn(
              "size-5 rounded-[5px] transition-colors duration-300",
              on
                ? "bg-accent"
                : "bg-ink/10 group-hover:bg-white/15 group-focus-within:bg-white/15",
            )}
          />
        );
      })}
    </span>
  );
}

/** Brand marks from simple-icons (CC0 paths), rendered in neutral grey. */
const platformIcons: Record<string, string> = {
  shopify: siShopify.path,
  google: siGoogle.path,
  hubspot: siHubspot.path,
  salesforce: siSalesforce.path,
  meta: siMeta.path,
  aws: siAmazonwebservices.path,
  // Not in simple-icons: the four-square mark, drawn on the same 24px grid.
  microsoft:
    "M1 1h10.5v10.5H1zM12.5 1H23v10.5H12.5zM1 12.5h10.5V23H1zM12.5 12.5H23V23H12.5z",
  claude: siClaude.path,
  openai: siOpenai.path,
};

/** Platform marks as grey logo lockups (mark + name) in a quiet 3-column grid. */
function PlatformGrid() {
  return (
    <ul className="mx-auto grid w-fit grid-cols-2 gap-x-10 gap-y-8 sm:grid-cols-[repeat(3,auto)] sm:gap-y-10 lg:mr-0 lg:ml-auto lg:gap-x-12">
      {platforms.slice(0, 9).map((p) => (
        <li
          key={p.name}
          className="flex items-center gap-2.5 text-[#55606b] transition-colors duration-300 hover:text-ink"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="size-7 shrink-0 fill-current sm:size-8 lg:size-9"
          >
            <path d={platformIcons[p.icon]} />
          </svg>
          <span className="text-[1.125rem] leading-none font-bold tracking-tight whitespace-nowrap sm:text-[1.375rem] lg:text-[1.625rem]">
            {p.name}
          </span>
        </li>
      ))}
    </ul>
  );
}
