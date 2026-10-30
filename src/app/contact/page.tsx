import Link from "next/link";
import { Suspense, type ReactNode } from "react";
import { InquiryForm } from "@/components/forms/InquiryForm";
import { InquiryFormFromParams } from "@/components/forms/InquiryFormFromParams";
import { Breadcrumbs, FaqList } from "@/components/ui/blocks";
import { Container, Eyebrow } from "@/components/ui/primitives";
import { ContactArt } from "@/components/visuals/ContactArt";
import { GlobalReach } from "@/components/visuals/GlobalReach";
import { PerspectiveGrid } from "@/components/visuals/PerspectiveGrid";
import { siteConfig } from "@/config/site";
import { services } from "@/content/services";
import { pageMetadata } from "@/lib/seo";
import { faqSchema, JsonLd } from "@/lib/structured-data";

export const metadata = pageMetadata({
  title: "Contact Us | Website, SEO & AI Projects",
  description:
    "Contact Growbytes about a new website, Shopify store, SEO, Google Ads, custom software, or AI automation. Share a few details and a person will reply with next steps.",
  path: "/contact/",
});

const nextSteps = [
  { title: "We read your message", body: "A real person, not a bot." },
  { title: "We reply or book a call", body: "Quick questions or a time to talk." },
  { title: "You get a clear quote", body: "Scope and cost in writing. No obligation." },
];

/** Small icon tile used at the top of each sidebar card. */
function BoxIcon({ children }: { children: ReactNode }) {
  return (
    <span
      aria-hidden="true"
      className="grid size-10 shrink-0 place-items-center rounded-xl bg-accent text-white"
    >
      <svg
        viewBox="0 0 20 20"
        className="size-5 fill-none stroke-current"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {children}
      </svg>
    </span>
  );
}

const contactFaqs = [
  {
    q: "How quickly will you get back to me?",
    a: "A person reads every message and replies as soon as they can on working days. If your project has a deadline, mention it in the form so we can prioritise.",
  },
  {
    q: "Do I need a full brief before I contact you?",
    a: "No. A few lines about what you want to change and why is enough. We’ll ask the questions that fill in the rest.",
  },
  {
    q: "Is the first call free?",
    a: "Yes. The first conversation is free and there’s no obligation. You only pay once you’ve approved a written proposal.",
  },
  {
    q: "What if I don’t know which service I need?",
    a: "Choose “Not sure yet” and describe the problem in your own words. We’ll suggest the right mix of website, marketing, or automation work.",
  },
];

export default function ContactPage() {
  return (
    <>
      {/* Header band */}
      <section className="relative isolate overflow-hidden bg-paper">
        <PerspectiveGrid className="h-[70%]" />
        <Container className="pt-10 pb-12 sm:pt-12 lg:pb-16">
          <Breadcrumbs items={[{ name: "Contact", path: "/contact/" }]} />
          <div className="mt-10 grid items-center gap-12 lg:grid-cols-[1.3fr_1fr] lg:gap-16">
            <div>
              <Eyebrow>Contact us</Eyebrow>
              <h1 className="mt-4 text-h1 font-extrabold">
                Let&rsquo;s talk about{" "}
                <span className="text-accent">your project.</span>
              </h1>
              <p className="mt-5 max-w-2xl text-lead text-muted">
                Need a new website, more leads, or less admin? Tell us a little
                about it. It takes about three minutes, and a real person will
                reply.
              </p>
            </div>
            <ContactArt className="mx-auto w-full max-w-[30rem] max-sm:scale-90 lg:mr-0" />
          </div>
        </Container>
      </section>

      {/* Form and guidance */}
      <section className="border-t border-line bg-white">
        <Container className="grid gap-12 py-14 lg:grid-cols-[1.5fr_1fr] lg:gap-14 lg:py-20">
          <div>
            <h2 className="text-h3 font-extrabold">
              Tell us about your project
            </h2>
            <p className="mt-2 text-muted">
              The more you share, the more useful our first reply will be.
            </p>
            <div className="mt-8 rounded-2xl border border-line bg-paper/60 p-6 sm:p-10">
              <Suspense fallback={<InquiryForm />}>
                <InquiryFormFromParams />
              </Suspense>
            </div>
          </div>

          <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-2xl bg-ink p-7 text-paper sm:p-9">
              <h2 className="text-h3 font-bold">What happens next</h2>
              <ol className="relative mt-7 space-y-7">
                <span
                  aria-hidden="true"
                  className="absolute top-2 bottom-2 left-[0.9375rem] w-px bg-white/15"
                />
                {nextSteps.map((s, i) => (
                  <li
                    key={s.title}
                    className="relative grid grid-cols-[2rem_1fr] gap-4"
                  >
                    <span className="grid size-8 place-items-center rounded-full bg-accent text-sm font-extrabold text-white">
                      {i + 1}
                    </span>
                    <div>
                      <h3 className="font-bold">{s.title}</h3>
                      <p className="mt-1 text-[0.975rem] text-muted-on-dark">
                        {s.body}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>


            <div className="relative overflow-hidden rounded-2xl border border-line p-7">
              {/* Rotating dotted globe */}
              <div aria-hidden="true" className="pointer-events-none absolute -right-5 -bottom-5 w-32 opacity-90">
                <GlobalReach />
              </div>
              <div className="relative flex items-center gap-3">
                <BoxIcon>
                  <circle cx="10" cy="10" r="7" />
                  <path d="M3 10h14M10 3c2 2 2.8 4.5 2.8 7S12 15 10 17c-2-2-2.8-4.5-2.8-7S8 5 10 3Z" />
                </BoxIcon>
                <h2 className="font-bold">Wherever you are</h2>
              </div>
              <p className="relative mt-3 max-w-[72%] text-[0.975rem] text-muted">
                We work remotely with businesses around the world. Mention your
                time zone and we&rsquo;ll plan calls around it.
              </p>
              {siteConfig.contact.email && (
                <p className="mt-4 text-[0.975rem]">
                  Prefer email?{" "}
                  <a
                    className="font-bold underline decoration-accent underline-offset-4"
                    href={`mailto:${siteConfig.contact.email}`}
                  >
                    {siteConfig.contact.email}
                  </a>
                </p>
              )}
              {siteConfig.contact.phone && (
                <p className="mt-2 text-[0.975rem]">
                  Prefer to call?{" "}
                  <a
                    className="font-bold underline decoration-accent underline-offset-4"
                    href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`}
                  >
                    {siteConfig.contact.phone}
                  </a>
                </p>
              )}
            </div>

            <div className="rounded-2xl border border-line p-7">
              <div className="flex items-center gap-3">
                <BoxIcon>
                  <path d="M4 4h5v5H4zM11 4h5v5h-5zM4 11h5v5H4zM11 11h5v5h-5z" />
                </BoxIcon>
                <h2 className="font-bold">What we can help with</h2>
              </div>
              <ul className="mt-4 flex flex-wrap gap-2">
                {services.map((svc) => (
                  <li key={svc.slug}>
                    <Link
                      href={`/services/${svc.slug}/`}
                      className="inline-flex rounded-full bg-paper px-3 py-1.5 text-[0.8125rem] font-semibold ring-1 ring-line transition-colors hover:bg-accent hover:text-white hover:ring-accent"
                    >
                      {svc.shortName}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </Container>
      </section>

      {/* Contact FAQs */}
      <section className="border-t border-line bg-paper">
        <Container className="grid gap-10 py-14 lg:grid-cols-[1fr_1.6fr] lg:gap-16 lg:py-20">
          <div>
            <Eyebrow>Before you send</Eyebrow>
            <h2 className="mt-4 text-h2 font-extrabold">Common questions</h2>
          </div>
          <FaqList faqs={contactFaqs} />
          <JsonLd data={faqSchema(contactFaqs)} />
        </Container>
      </section>
    </>
  );
}
