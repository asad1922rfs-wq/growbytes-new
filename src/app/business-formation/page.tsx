import Link from "next/link";
import { Breadcrumbs, CtaBand, FaqList } from "@/components/ui/blocks";
import { ArrowIcon, ArrowLink, ButtonLink, Container, Eyebrow, Section, SectionHeading } from "@/components/ui/primitives";
import { PerspectiveGrid } from "@/components/visuals/PerspectiveGrid";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbSchema, faqSchema, JsonLd } from "@/lib/structured-data";

export const metadata = pageMetadata({
  title: "Business Formation: Start Your LLC and Launch Online",
  description:
    "Start your business the right way: choose a structure, form your LLC, get an EIN and registered agent, then launch with a brand, website, and marketing from Growbytes.",
  path: "/business-formation/",
});

const steps = [
  { title: "Choose your business structure", body: "LLC, corporation, or sole proprietorship. An LLC suits most small businesses: it separates your personal assets and keeps tax simple." },
  { title: "Pick and check your business name", body: "Make sure the name is free in your state, and that the matching domain and social handles are available too." },
  { title: "File your formation documents", body: "File the Articles of Organization with your state. Fees and processing times vary by state." },
  { title: "Appoint a registered agent", body: "Every LLC needs a registered agent with a physical address in its state to receive legal and tax mail." },
  { title: "Get your EIN", body: "Apply for an Employer Identification Number from the IRS. You need it to open a bank account, hire, and file taxes." },
  { title: "Write an operating agreement", body: "Set out who owns what, how decisions are made, and what happens if an owner leaves." },
  { title: "Open a business bank account", body: "Keep business and personal money separate. It protects your LLC status and makes bookkeeping easier." },
  { title: "Stay compliant", body: "File annual reports, renew licences, and track deadlines so your business stays in good standing." },
];

const launch = [
  { title: "Brand identity", body: "Name check, logo, colours, and the basics you need on day one.", href: "/services/branding/" },
  { title: "Business website", body: "A fast, professional site that explains what you do and brings in enquiries.", href: "/services/web-design-development/" },
  { title: "Get found on Google", body: "Google Business Profile, local SEO, and the first pages customers search for.", href: "/services/seo/" },
  { title: "Email and automation", body: "Professional email, enquiry forms, and simple automations from the start.", href: "/services/ai-automation/" },
];

const faqs = [
  {
    q: "What is business formation?",
    a: "Business formation is the process of legally setting up your company: choosing a structure such as an LLC, registering it with your state, getting an EIN, and putting the basic paperwork in place.",
  },
  {
    q: "Should I form an LLC or a corporation?",
    a: "Most small businesses start as an LLC because it protects personal assets with less paperwork. Corporations suit businesses planning to raise investment. A tax adviser can confirm what fits your situation.",
  },
  {
    q: "Do I need a registered agent?",
    a: "Yes. Every LLC must name a registered agent with a physical address in its state of formation to receive legal documents. You can act as your own, or use a registered agent service for privacy.",
  },
  {
    q: "How long does it take to form an LLC?",
    a: "It depends on the state. Online filings can be approved within days, while some states take a few weeks.",
  },
  {
    q: "What does Growbytes do?",
    a: "We help new businesses launch properly once they are formed: brand identity, website, Google Business Profile, SEO, and simple automations. We can point you to a trusted formation partner for the legal filing.",
  },
  {
    q: "Is this legal or tax advice?",
    a: "No. This page is general information. For legal or tax decisions, speak to a qualified professional in your state.",
  },
];

export default function BusinessFormationPage() {
  return (
    <>
      <JsonLd data={[breadcrumbSchema([{ name: "Business formation", path: "/business-formation/" }]), faqSchema(faqs)]} />

      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-paper">
        <PerspectiveGrid className="h-[60%]" />
        <Container className="pt-10 pb-16 sm:pt-12 lg:pb-24">
          <Breadcrumbs items={[{ name: "Business formation", path: "/business-formation/" }]} />
          <div className="mt-10 grid items-center gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
            <div>
              <Eyebrow>Business formation</Eyebrow>
              <h1 className="mt-4 text-display font-extrabold lg:text-[min(4.6vw,4.5rem)] lg:leading-[1.03]">
                Start your business, <span className="text-accent">then launch it properly.</span>
              </h1>
              <p className="mt-7 max-w-[34rem] text-lead text-muted">
                Form your LLC the right way, then get the brand, website, and marketing a new business needs to win its first
                customers.
              </p>
              <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-7">
                <ButtonLink href="/contact/" variant="brand" arrow className="min-h-14 px-7 text-base">
                  Get help starting up
                </ButtonLink>
                <ArrowLink href="#steps" className="self-center sm:self-auto">
                  See the steps
                </ArrowLink>
              </div>
            </div>

            {/* Formation checklist artwork */}
            <div aria-hidden="true" className="relative mx-auto w-full max-w-[28rem] lg:mr-0">
              <div className="absolute -top-5 -right-5 hidden h-[60%] w-[42%] rounded-xl bg-accent sm:block" />
              <div className="ai-float relative rounded-2xl bg-white p-6 shadow-[0_30px_60px_-30px_rgb(23_25_24/0.45)] ring-1 ring-line">
                <p className="flex items-center justify-between text-[0.6875rem] font-bold tracking-[0.12em] text-muted uppercase">
                  <span>New LLC</span>
                  <span className="rounded-full bg-[#e3f4e8] px-2 py-0.5 text-[#1f8a4c]">In progress</span>
                </p>
                <p className="mt-2 text-[1.125rem] font-extrabold">Your Business, LLC</p>
                <ul className="mt-5 space-y-2.5">
                  {["Articles of Organization", "Registered agent", "EIN from the IRS", "Operating agreement", "Website and brand"].map((t, i) => (
                    <li key={t} className="flex items-center gap-3 rounded-lg bg-paper px-3 py-2.5 text-[0.875rem] font-semibold">
                      <span className={`grid size-5 place-items-center rounded-full text-white ${i < 3 ? "bg-[#1f8a4c]" : i === 3 ? "bg-accent" : "bg-ink/20"}`}>
                        <svg viewBox="0 0 12 12" className="size-3 fill-none stroke-current" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="m2.5 6.2 2.2 2.2 4.8-5" />
                        </svg>
                      </span>
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Steps */}
      <Section id="steps" tone="white" className="scroll-mt-24">
        <Container className="grid gap-12 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Eyebrow>Step by step</Eyebrow>
            <h2 className="mt-4 text-h2 font-extrabold">How to form an LLC in 8 steps</h2>
            <p className="mt-5 max-w-[24rem] text-muted">The core steps are the same in every state. Details and fees vary, so check your state&rsquo;s rules.</p>
          </div>
          <ol>
            {steps.map((s, i) => (
              <li key={s.title} className="group grid gap-x-8 gap-y-2 border-t-2 border-ink py-7 last:border-b-2 sm:grid-cols-[5.5rem_1fr]">
                <span
                  aria-hidden="true"
                  className="text-[3.25rem] leading-[0.85] font-extrabold tracking-tighter text-transparent transition-colors [-webkit-text-stroke:1.5px_var(--color-ink)] group-hover:text-accent group-hover:[-webkit-text-stroke-color:var(--color-accent)]"
                >
                  {String(i + 1).padStart(2, "0")}
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

      {/* Launch */}
      <Section>
        <Container>
          <SectionHeading eyebrow="After formation" title="Everything you need to launch" />
          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {launch.map((l) => (
              <li key={l.title}>
                <Link href={l.href} className="group flex h-full flex-col rounded-3xl border border-line bg-white p-7 transition-colors duration-300 hover:border-ink hover:bg-ink">
                  <span className="text-[1.25rem] font-extrabold transition-colors group-hover:text-white">{l.title}</span>
                  <span className="mt-2 text-muted transition-colors group-hover:text-white/65">{l.body}</span>
                  <span className="mt-auto inline-flex items-center gap-2 pt-6 font-bold transition-colors group-hover:text-accent">
                    Learn more <ArrowIcon />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* FAQs */}
      <Section tone="white">
        <Container className="grid items-start gap-10 lg:grid-cols-[0.85fr_1.5fr] lg:gap-16">
          <div className="lg:sticky lg:top-28">
            <Eyebrow>FAQs</Eyebrow>
            <h2 className="mt-4 text-h2 font-extrabold">Business formation questions, answered.</h2>
          </div>
          <FaqList faqs={faqs} />
        </Container>
      </Section>

      <CtaBand heading="Starting a new business?" body="Tell us where you are and we’ll help you launch with a brand, website, and plan to win customers." />
    </>
  );
}
