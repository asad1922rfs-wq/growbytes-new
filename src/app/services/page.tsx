import Link from "next/link";
import { ServicesIndex } from "@/components/sections/ServicesIndex";
import { Breadcrumbs, CtaBand } from "@/components/ui/blocks";
import { Container, Section, SectionHeading } from "@/components/ui/primitives";
import { businessNeeds, engagementModels } from "@/content/home";
import { getService } from "@/content/services";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Services: Web, Shopify, Software, SEO, Ads, Branding, Automation",
  description:
    "Explore Growbytes services: web design and development, Shopify, custom software, SEO, paid advertising, branding, and AI automation, with deliverables and process for each.",
  path: "/services/",
});

export default function ServicesPage() {
  return (
    <>
      <section className="bg-paper">
        <Container className="pt-10 pb-section-sm sm:pt-12">
          <Breadcrumbs items={[{ name: "Services", path: "/services/" }]} />
          <div className="mt-10 grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-end">
            <SectionHeading
              as="h1"
              eyebrow="Services"
              title="Design, development, and growth services that work together"
            />
            <p className="text-lead text-muted">
              Each service can stand alone. Most clients combine two or three, such as a new site with SEO, or a Shopify build
              with integrations. Start from the problem you need to solve.
            </p>
          </div>
        </Container>
      </section>

      <Section tone="white" size="sm">
        <Container>
          <h2 className="text-h3 font-bold">Start from your goal</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {businessNeeds.map((n) => (
              <div key={n.title} className="rounded-lg border border-line bg-paper p-6">
                <h3 className="font-bold">{n.title}</h3>
                <ul className="mt-3 space-y-1.5 text-[0.975rem]">
                  {n.services.map((s) => (
                    <li key={s}>
                      <Link href={`/services/${s}/`} className="underline decoration-line decoration-2 underline-offset-4 hover:decoration-accent-strong">
                        {getService(s)!.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="white" size="none" className="pb-section-sm">
        <Container>
          <h2 className="sr-only">All services</h2>
          <ServicesIndex />
        </Container>
      </Section>

      <Section tone="surface" size="sm">
        <Container>
          <SectionHeading title="How engagements are structured" intro="We quote after understanding the work. Projects use one of these structures." />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {engagementModels.map((m) => (
              <div key={m.title} className="rounded-lg border border-line bg-white p-6">
                <h3 className="font-bold">{m.title}</h3>
                <p className="mt-2 text-muted">{m.body}</p>
                <p className="mt-4 text-sm font-bold">Best for: {m.bestFor}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <CtaBand heading="Not sure which service you need?" body="Describe the problem in your own words. We'll recommend where to start, including when a smaller step makes more sense." />
    </>
  );
}
