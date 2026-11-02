import Link from "next/link";
import { ArticleCard } from "@/components/cards";
import { InsightsFilter } from "@/components/sections/InsightsFilter";
import { Breadcrumbs, CtaBand } from "@/components/ui/blocks";
import { ArrowIcon, Container, Eyebrow } from "@/components/ui/primitives";
import { ArticleIllustration } from "@/components/visuals/ArticleIllustration";
import { InsightsArt } from "@/components/visuals/InsightsArt";
import { PerspectiveGrid } from "@/components/visuals/PerspectiveGrid";
import { articles, formatDate, getArticle } from "@/content/insights";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Insights: Website, SEO & Automation Guides",
  description:
    "Plain-English guides from Growbytes on website redesigns, Shopify storefronts, SEO vs paid ads, project briefs, and which workflows to automate.",
  path: "/insights/",
});

// Suggested order for someone just starting out
const readingPath = [
  "how-to-write-a-project-brief-for-an-agency",
  "seo-or-paid-ads-where-to-start",
  "prepare-before-redesigning-your-business-website",
];

export default function InsightsPage() {
  const [lead, ...rest] = articles;
  const path = readingPath.map((s) => getArticle(s)).filter((a) => a !== undefined);

  return (
    <>
      {/* Header */}
      <section className="relative isolate overflow-hidden bg-paper">
        <PerspectiveGrid className="h-[60%]" />
        <Container className="pt-10 pb-14 sm:pt-12 lg:pb-20">
          <Breadcrumbs items={[{ name: "Insights", path: "/insights/" }]} />
          <div className="mt-10 grid items-center gap-12 lg:grid-cols-[1.3fr_1fr] lg:gap-16">
            <div>
              <Eyebrow>Insights</Eyebrow>
              <h1 className="mt-4 text-display font-extrabold lg:text-[min(4.8vw,4.5rem)] lg:leading-[1.03]">
                Straight answers <span className="text-accent">before you spend.</span>
              </h1>
              <p className="mt-7 max-w-[34rem] text-lead text-muted">
                Plain-English guides on websites, Shopify, SEO, ads, and automation. Useful whether or not you ever work with
                us.
              </p>
              <p className="mt-6 text-[0.9375rem] font-semibold text-muted">
                {articles.length} guides · {articles.reduce((n, a) => n + a.readingMinutes, 0)} minutes of reading
              </p>
            </div>
            <InsightsArt className="mx-auto w-full max-w-[28rem] max-sm:scale-90 lg:mr-0" />
          </div>
        </Container>
      </section>

      {/* Featured guide */}
      <section className="border-t border-line bg-white">
        <Container className="py-14 lg:py-20">
          <article className="group relative grid overflow-hidden rounded-3xl bg-ink text-paper lg:grid-cols-[1.1fr_1fr]">
            <div className="p-6 sm:p-10">
              <ArticleIllustration kind={lead.illustration} className="rounded-2xl transition-transform duration-500 group-hover:scale-[1.02]" />
            </div>
            <div className="flex flex-col justify-center p-8 pt-0 sm:p-10 lg:pl-0">
              <p className="flex items-center gap-3 text-[0.75rem] font-bold tracking-[0.12em] uppercase">
                <span className="rounded-full bg-accent px-2.5 py-1 text-white">Latest</span>
                <span className="text-white/60">{lead.category}</span>
              </p>
              <h2 className="mt-5 text-h2 font-extrabold text-white">
                <Link href={`/insights/${lead.slug}/`} className="after:absolute after:inset-0">
                  {lead.title}
                </Link>
              </h2>
              <p className="mt-4 text-white/70">{lead.description}</p>
              <p className="mt-8 flex items-center justify-between text-[0.9375rem] text-white/60">
                <span>
                  <time dateTime={lead.published}>{formatDate(lead.published)}</time> · {lead.readingMinutes} min read
                </span>
                <span className="inline-flex items-center gap-2 font-bold text-white">
                  Read the guide <ArrowIcon className="transition-transform group-hover:translate-x-1" />
                </span>
              </p>
            </div>
          </article>
        </Container>
      </section>

      {/* All guides with filter */}
      <section aria-labelledby="all-guides" className="bg-paper">
        <Container className="py-14 lg:py-20">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <h2 id="all-guides" className="text-h2 font-extrabold">
              More guides
            </h2>
          </div>
          <div className="mt-8">
            <InsightsFilter
              items={rest.map((a) => ({ key: a.slug, category: a.category, card: <ArticleCard article={a} headingLevel="h3" /> }))}
            />
          </div>
        </Container>
      </section>

      {/* Reading path */}
      <section aria-labelledby="start-here" className="border-t border-line bg-white">
        <Container className="grid gap-10 py-14 lg:grid-cols-[1fr_2fr] lg:gap-16 lg:py-20">
          <div>
            <Eyebrow>New here?</Eyebrow>
            <h2 id="start-here" className="mt-4 text-h2 font-extrabold">
              Start with these three.
            </h2>
            <p className="mt-4 max-w-[22rem] text-muted">Read them in order and you&rsquo;ll be ready to plan your project with confidence.</p>
          </div>
          <ol className="border-t-2 border-ink">
            {path.map((a, i) => (
              <li key={a.slug} className="border-b border-line">
                <Link href={`/insights/${a.slug}/`} className="group grid grid-cols-[3.5rem_1fr_auto] items-center gap-4 py-6">
                  <span className="text-[2.5rem] leading-none font-extrabold tracking-tighter text-transparent transition-colors [-webkit-text-stroke:1.5px_var(--color-ink)] group-hover:text-accent group-hover:[-webkit-text-stroke-color:var(--color-accent)]">
                    {i + 1}
                  </span>
                  <span>
                    <span className="block text-[1.25rem] leading-snug font-extrabold tracking-tight group-hover:text-accent-strong">{a.title}</span>
                    <span className="mt-1 block text-[0.9375rem] text-muted">
                      {a.category} · {a.readingMinutes} min read
                    </span>
                  </span>
                  <ArrowIcon className="transition-transform group-hover:translate-x-1" />
                </Link>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <CtaBand heading="Have a question we haven’t covered?" body="Describe your situation and we’ll point you in a useful direction." label="Ask about your project" />
    </>
  );
}
