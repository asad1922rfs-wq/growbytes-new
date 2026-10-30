import Image from "next/image";
import {
  aiCodingTools,
  buildTools,
  marketingTools,
} from "@/components/sections/AiTools";
import { GbIcon, type IconName } from "@/components/icons/GbIcon";
import { Breadcrumbs, CtaBand } from "@/components/ui/blocks";
import { CountUp } from "@/components/ui/CountUp";
import {
  ArrowLink,
  ButtonLink,
  Container,
  Eyebrow,
  Section,
  SectionHeading,
} from "@/components/ui/primitives";
import { AboutHeroArt } from "@/components/visuals/AboutHeroArt";
import { GlobalReach } from "@/components/visuals/GlobalReach";
import { GrowGrid } from "@/components/visuals/GrowGrid";
import { engagementModels, principles } from "@/content/home";
import { serviceGroups, services } from "@/content/services";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "About Us | One Team for Web Design, Software & Marketing",
  description:
    "Growbytes is one team for web design, Shopify, custom software, SEO, paid ads, and AI automation. Learn how we work and what we believe.",
  path: "/about/",
});

// Manifesto: words light up as the section scrolls into view; accent words stay orange
const manifesto: { text: string; accent?: boolean }[] = [
  {
    text: "A website, a campaign, and the tools behind them should work as one.",
  },
  { text: "Not three suppliers. Not three plans." },
  { text: "One team that owns the result.", accent: true },
];

const work = [
  {
    name: "blinq",
    what: "Shopify store",
    src: "/images/work/blinq-flosser.jpg",
    w: 1440,
    h: 636,
  },
  {
    name: "The Advocate News",
    what: "E-paper platform",
    src: "/images/work/advocate-epaper-dashboard.png",
    w: 1440,
    h: 587,
  },
  {
    name: "RFS HCM",
    what: "HR management system",
    src: "/images/work/rfs-hcm-overview.png",
    w: 1440,
    h: 633,
  },
];

const beliefs: { icon: IconName; title: string; body: string }[] = [
  {
    icon: "together",
    title: "Joined-up work wins",
    body: "Your website, your ads, and your daily tools depend on each other. When one team owns all three, nothing falls through the gaps.",
  },
  {
    icon: "scope",
    title: "Simple beats clever",
    body: "Clear pages, clear reports, clear proposals. If something is hard to explain, it is usually hard to use too.",
  },
  {
    icon: "measure",
    title: "Honest about results",
    body: "Nobody controls Google rankings or ad auctions. We promise the quality of our work, and we report results as they are.",
  },
];

const steps = [
  {
    stage: "Discovery",
    title: "Understand the problem",
    body: "We look at what you have and talk to the people who will use it.",
    get: "A short summary of goals and priorities.",
  },
  {
    stage: "Planning",
    title: "Decide what to build",
    body: "We plan the pages, features, and tracking, and agree the scope with you.",
    get: "Approved designs and a clear plan.",
  },
  {
    stage: "Build & launch",
    title: "Build, test, release",
    body: "We build it, test it on real devices, and launch with analytics in place.",
    get: "A live site or system, plus training.",
  },
  {
    stage: "Improve",
    title: "Learn from real use",
    body: "We watch what works, fix what gets in the way, and keep improving.",
    get: "Plain-English reports and next steps.",
  },
];

const allTools = [...buildTools, ...marketingTools, ...aiCodingTools];

const tile = "relative overflow-hidden rounded-3xl p-7 lg:p-8";

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="on-dark relative isolate overflow-hidden bg-ink text-paper">
        <GrowGrid className="absolute inset-0 -z-10 size-full" />
        <Container className="pt-10 pb-16 sm:pt-12 lg:pb-24">
          <Breadcrumbs dark items={[{ name: "About", path: "/about/" }]} />
          <div className="mt-10 grid items-center gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
            <div>
              <p className="text-eyebrow font-extrabold text-white uppercase">
                About Growbytes
              </p>
              <h1 className="mt-4 text-display font-extrabold text-white lg:text-[min(4.6vw,4.5rem)] lg:leading-[1.02]">
                The one team behind your website, software,{" "}
                <span className="text-accent">and growth.</span>
              </h1>
              <p className="mt-7 max-w-[34rem] text-lead text-white/70">
                We design websites and Shopify stores, build custom software and
                AI automation, and run SEO and ads. All planned together, so
                every piece helps the others.
              </p>
              <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-7">
                <ButtonLink
                  href="/contact/"
                  variant="brand"
                  arrow
                  className="min-h-14 px-7 text-base"
                >
                  Work with us
                </ButtonLink>
                <ArrowLink
                  href="/services/"
                  dark
                  className="self-center sm:self-auto"
                >
                  See what we do
                </ArrowLink>
              </div>
            </div>
            <AboutHeroArt
              dark
              className="mx-auto w-full max-w-[28rem] max-sm:scale-90 lg:mr-0"
            />
          </div>
        </Container>
      </section>

      {/* Manifesto */}
      <section aria-labelledby="manifesto" className="bg-paper">
        <Container className="py-20 lg:py-32">
          <Eyebrow>Why we exist</Eyebrow>
          <h2
            id="manifesto"
            className="mt-6 max-w-[62rem] text-[clamp(2rem,1.4rem+2.8vw,3.75rem)] leading-[1.12] font-extrabold tracking-tight"
          >
            {manifesto.map((line, li) =>
              line.text.split(" ").map((word, wi) => (
                <span
                  key={`${li}-${wi}`}
                  className={line.accent ? "mf-word text-accent" : "mf-word"}
                >
                  {word}{" "}
                </span>
              )),
            )}
          </h2>
          <div className="relative mt-14 grid gap-4 lg:grid-cols-2">
            {/* vs badge */}
            <span
              aria-hidden="true"
              className="absolute top-1/2 left-1/2 z-10 hidden size-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-accent text-[0.9375rem] font-extrabold text-white ring-8 ring-paper lg:grid"
            >
              vs
            </span>
            <div className="rounded-3xl border border-line bg-white p-8 lg:p-10">
              <p className="text-[0.75rem] font-bold tracking-[0.14em] text-muted uppercase">
                The usual way
              </p>
              <p className="mt-3 text-[1.75rem] leading-tight font-extrabold">
                Three suppliers, three plans.
              </p>
              <ul className="mt-6 grid grid-cols-3 gap-2">
                {["Web agency", "Ad agency", "Developers"].map((t) => (
                  <li
                    key={t}
                    className="rounded-xl border border-dashed border-ink/25 px-3 py-4 text-center text-[0.875rem] font-semibold text-muted"
                  >
                    {t}
                  </li>
                ))}
              </ul>
              <ul className="mt-6 space-y-3">
                {[
                  "Three contracts and three invoices",
                  "Reports that never line up",
                  "Gaps between them nobody owns",
                ].map((t) => (
                  <li key={t} className="flex items-center gap-3">
                    <span
                      aria-hidden="true"
                      className="grid size-6 shrink-0 place-items-center rounded-full bg-[#fde3dc] text-accent-strong"
                    >
                      <svg
                        viewBox="0 0 12 12"
                        className="size-2.5 fill-none stroke-current"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                      >
                        <path d="m3 3 6 6M9 3 3 9" />
                      </svg>
                    </span>
                    {t}
                  </li>
                ))}
              </ul>
            </div>
            <div className="on-dark rounded-3xl bg-ink p-8 text-white lg:p-10">
              <p className="text-[0.75rem] font-bold tracking-[0.14em] text-accent uppercase">
                The Growbytes way
              </p>
              <p className="mt-3 text-[1.75rem] leading-tight font-extrabold">
                One team, one plan.
              </p>
              <div className="mt-6 flex items-center gap-3 rounded-xl bg-white/[0.06] p-3 ring-1 ring-white/10">
                <span className="grid size-10 place-items-center rounded-lg bg-accent text-[0.8125rem] font-extrabold">
                  G
                </span>
                <span className="flex-1 text-[0.875rem] font-semibold text-white/85">
                  Design · Software · Marketing
                </span>
                <span className="rounded-full bg-[#1f7a46] px-2.5 py-1 text-[0.6875rem] font-bold">
                  Connected
                </span>
              </div>
              <ul className="mt-6 space-y-3">
                {[
                  "One contract, one clear quote",
                  "One plan and one report",
                  "One person to call, every time",
                ].map((t) => (
                  <li key={t} className="flex items-center gap-3">
                    <span
                      aria-hidden="true"
                      className="grid size-6 shrink-0 place-items-center rounded-full bg-accent text-white"
                    >
                      <svg
                        viewBox="0 0 12 12"
                        className="size-3 fill-none stroke-current"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="m2.5 6.2 2.2 2.2 4.8-5" />
                      </svg>
                    </span>
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* At a glance: bento grid */}
      <Section tone="white">
        <Container>
          <SectionHeading
            eyebrow="At a glance"
            title="Growbytes in six tiles"
          />
          <div className="mt-12 grid gap-4 md:grid-cols-6">
            {/* Globe */}
            <div
              className={`${tile} on-dark bg-ink text-paper md:col-span-3 md:row-span-2`}
            >
              <p className="text-[0.75rem] font-bold tracking-[0.12em] text-white/50 uppercase">
                Where we work
              </p>
              <p className="mt-3 max-w-[18rem] text-[1.75rem] leading-tight font-extrabold text-white">
                Remote, with clients{" "}
                <span className="text-accent">around the world.</span>
              </p>
              <p className="mt-3 max-w-[20rem] text-white/65">
                Calls planned around your time zone. Multilingual sites welcome.
              </p>
              <div
                aria-hidden="true"
                className="pointer-events-none mx-auto mt-6 w-[78%] max-w-[22rem] md:absolute md:-right-10 md:-bottom-14 md:mt-0 md:w-[68%]"
              >
                <GlobalReach />
              </div>
            </div>

            {/* One team */}
            <div className={`${tile} bg-accent text-white md:col-span-3`}>
              <p className="text-[0.75rem] font-bold tracking-[0.12em] text-white/75 uppercase">
                From first call to support
              </p>
              <p className="mt-2 flex items-end gap-4">
                <span className="text-[5rem] leading-none font-extrabold tracking-tighter">
                  <CountUp to={1} />
                </span>
                <span className="pb-2 text-[1.25rem] leading-tight font-bold">
                  team, one plan,
                  <br /> one point of contact
                </span>
              </p>
            </div>

            {/* Counters */}
            <div
              className={`${tile} grid grid-cols-2 border border-line bg-paper md:col-span-3`}
            >
              {[
                {
                  n: services.length,
                  suffix: "",
                  label: "Services under one roof",
                },
                { n: serviceGroups.length, suffix: "", label: "Disciplines" },
              ].map((st, i) => (
                <div
                  key={st.label}
                  className={i ? "border-l border-line pl-6" : "pr-6"}
                >
                  <span className="block text-[3.5rem] leading-none font-semibold tracking-tighter">
                    <CountUp to={st.n} suffix={st.suffix} />
                  </span>
                  <span className="mt-2 block text-ink/70">{st.label}</span>
                </div>
              ))}
            </div>

            {/* Tools */}
            <div
              className={`${tile} border border-line bg-paper md:col-span-4`}
            >
              <p className="text-[0.75rem] font-bold tracking-[0.12em] text-muted uppercase">
                Our toolkit
              </p>
              <p className="mt-2 text-[1.25rem] font-extrabold">
                Tools we use every day
              </p>
              <ul className="mt-5 flex flex-wrap gap-2.5">
                {allTools.map((t) => (
                  <li
                    key={t.title}
                    title={t.title}
                    className="grid size-11 place-items-center rounded-xl bg-white ring-1 ring-line"
                  >
                    <svg
                      role="img"
                      aria-label={t.title}
                      viewBox="0 0 24 24"
                      className="size-5"
                      style={{ fill: `#${t.hex}` }}
                    >
                      <path d={t.path} />
                    </svg>
                  </li>
                ))}
              </ul>
            </div>

            {/* Disciplines */}
            <div
              className={`${tile} border border-line bg-paper md:col-span-2`}
            >
              <p className="text-[0.75rem] font-bold tracking-[0.12em] text-muted uppercase">
                What we do
              </p>
              <ul className="mt-4 space-y-2.5">
                {serviceGroups.map((g) => (
                  <li
                    key={g.id}
                    className="flex items-center gap-2.5 font-bold"
                  >
                    <span
                      aria-hidden="true"
                      className="size-2 rounded-full bg-accent"
                    />
                    {g.label}
                  </li>
                ))}
              </ul>
              <ArrowLink href="/services/" className="mt-6">
                All services
              </ArrowLink>
            </div>

            {/* Client work */}
            <div
              className={`${tile} border border-line bg-paper md:col-span-6`}
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-[0.75rem] font-bold tracking-[0.12em] text-muted uppercase">
                    Built and shipped
                  </p>
                  <p className="mt-2 text-[1.25rem] font-extrabold">
                    Recent client work
                  </p>
                </div>
                <ArrowLink href="/#work">See the projects</ArrowLink>
              </div>
              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                {work.map((w) => (
                  <figure key={w.name} className="group">
                    <div className="overflow-hidden rounded-xl bg-white p-2 ring-1 ring-line">
                      <Image
                        src={w.src}
                        alt={`${w.name}: ${w.what}`}
                        width={w.w}
                        height={w.h}
                        sizes="(min-width: 640px) 30vw, 100vw"
                        className="block h-auto w-full rounded-md transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                    </div>
                    <figcaption className="mt-3">
                      <span className="font-bold">{w.name}</span>
                      <span className="text-muted"> · {w.what}</span>
                    </figcaption>
                  </figure>
                ))}
              </div>
              <p className="mt-4 text-[0.8125rem] text-muted">
                Shown with each client&rsquo;s permission.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* Beliefs */}
      <Section>
        <Container>
          <SectionHeading
            eyebrow="What we believe"
            title="Three ideas behind everything we do"
          />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {beliefs.map((b) => (
              <div
                key={b.title}
                className="group relative overflow-hidden rounded-3xl border border-line bg-white p-8 transition-colors duration-300 hover:bg-ink hover:text-white"
              >
                <span className="grid size-16 place-items-center rounded-2xl bg-accent text-white transition-transform duration-300 group-hover:-rotate-6">
                  <GbIcon name={b.icon} className="size-8" />
                </span>
                <h3 className="mt-6 text-h3 font-bold">{b.title}</h3>
                <p className="mt-3 text-muted transition-colors duration-300 group-hover:text-white/70">
                  {b.body}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Process */}
      <section
        aria-labelledby="process-heading"
        className="border-t border-line bg-paper"
      >
        <Container className="grid gap-12 py-20 lg:grid-cols-[1fr_1.6fr] lg:gap-20 lg:py-28">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <Eyebrow>How we work</Eyebrow>
            <h2 id="process-heading" className="mt-4 text-h2 font-extrabold">
              How a project runs, from first call to launch and beyond.
            </h2>
            <p className="mt-5 max-w-[26rem] text-muted">
              Same four steps whether it&rsquo;s a website, a marketing plan, or
              custom software. You always know where we are.
            </p>
          </div>
          <ol>
            {steps.map((s, i) => (
              <li
                key={s.title}
                className="group grid gap-x-8 gap-y-3 border-t-2 border-ink py-9 sm:grid-cols-[7rem_1fr] last:border-b-2"
              >
                <span
                  aria-hidden="true"
                  className="text-[4.5rem] leading-[0.85] font-extrabold tracking-tighter text-transparent transition-colors duration-300 [-webkit-text-stroke:1.5px_var(--color-ink)] group-hover:text-accent group-hover:[-webkit-text-stroke-color:var(--color-accent)]"
                >
                  0{i + 1}
                </span>
                <div>
                  <h3 className="text-[1.625rem] leading-tight font-extrabold tracking-tight lg:text-[1.875rem]">
                    {s.title}
                  </h3>
                  <p className="mt-2 max-w-[34rem] text-[1.0625rem] text-ink/75">
                    {s.body}
                  </p>
                  <p className="mt-4 text-[0.9375rem] text-muted">
                    <span className="font-bold text-ink">You get:</span> {s.get}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* Commitments */}
      <Section tone="white">
        <Container>
          <SectionHeading
            eyebrow="Our commitments"
            title="What you can count on"
          />
          <ul className="mt-12 grid border-t border-l border-line sm:grid-cols-2 lg:grid-cols-3">
            {principles.map((p) => (
              <li
                key={p.title}
                className="group border-r border-b border-line p-8 transition-colors duration-300 hover:bg-paper"
              >
                <GbIcon
                  name={p.icon}
                  className="size-9 text-ink transition-colors duration-300 group-hover:text-accent"
                />
                <h3 className="mt-6 text-[1.25rem] font-extrabold tracking-tight">
                  {p.title}
                </h3>
                <p className="mt-2 text-muted">{p.body}</p>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* Ways to work */}
      <Section>
        <Container>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              eyebrow="Ways to work with us"
              title="Pick the setup that fits"
            />
            <p className="max-w-[24rem] text-muted">
              Not sure? Tell us the problem and we&rsquo;ll suggest the right
              one.
            </p>
          </div>
          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {engagementModels.map((m, i) => {
              const dark = i === 1;
              return (
                <div
                  key={m.title}
                  className={`flex flex-col rounded-3xl p-8 transition-transform duration-300 hover:-translate-y-1 ${
                    dark
                      ? "on-dark bg-ink text-paper"
                      : "border border-line bg-white"
                  }`}
                >
                  <GbIcon
                    name={m.icon}
                    className={`size-10 ${dark ? "text-accent" : "text-ink"}`}
                  />
                  <p
                    className={`mt-6 text-[0.9375rem] font-semibold ${dark ? "text-white/60" : "text-muted"}`}
                  >
                    {m.question}
                  </p>
                  <h3
                    className={`mt-1 text-[1.75rem] leading-tight font-extrabold tracking-tight ${dark ? "text-white" : ""}`}
                  >
                    {m.title}
                  </h3>
                  <p
                    className={`mt-3 ${dark ? "text-white/70" : "text-ink/75"}`}
                  >
                    {m.body}
                  </p>
                  <dl
                    className={`mt-6 space-y-3 border-t pt-6 text-[0.9375rem] ${dark ? "border-white/15" : "border-line"}`}
                  >
                    {[
                      ["Best for", m.bestFor],
                      ["Scope", m.scope],
                      ["Billing", m.billing],
                    ].map(([k, v]) => (
                      <div key={k} className="grid grid-cols-[5rem_1fr] gap-3">
                        <dt className={`font-bold ${dark ? "text-white" : ""}`}>
                          {k}
                        </dt>
                        <dd className={dark ? "text-white/65" : "text-muted"}>
                          {v}
                        </dd>
                      </div>
                    ))}
                  </dl>
                  <div className="mt-auto pt-8">
                    <ButtonLink
                      href="/contact/"
                      variant={dark ? "brand" : "primary"}
                      arrow
                      className="w-full justify-center"
                    >
                      {m.link}
                    </ButtonLink>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </Section>

      <CtaBand
        heading="Let’s build what’s next for your business."
        body="Tell us what you want to improve. A real person will reply."
      />
    </>
  );
}
