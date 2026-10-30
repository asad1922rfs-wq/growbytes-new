import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleCard } from "@/components/cards";
import { GbIcon } from "@/components/icons/GbIcon";
import { Breadcrumbs, CtaBand } from "@/components/ui/blocks";
import { ArrowIcon, ButtonLink, Container } from "@/components/ui/primitives";
import { ArticleIllustration } from "@/components/visuals/ArticleIllustration";
import { PerspectiveGrid } from "@/components/visuals/PerspectiveGrid";
import {
  ARTICLE_AUTHOR,
  articles,
  formatDate,
  getArticle,
} from "@/content/insights";
import { getService, serviceNoun } from "@/content/services";
import { pageMetadata } from "@/lib/seo";
import { tableOfContents } from "@/lib/toc";
import { articleSchema, JsonLd } from "@/lib/structured-data";

type Props = { params: Promise<{ slug: string }> };

// Every slug is known at build time; keep these pages fully static.
export const ensureStatic = "navigation";

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a) return {};
  return pageMetadata({
    title: a.title,
    description: a.description,
    path: `/insights/${slug}/`,
    type: "article",
    publishedTime: a.published,
    modifiedTime: a.updated ?? a.published,
  });
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const { default: Body } = await import(`@/content/insights/${slug}.mdx`);
  const primary = getService(article.services[0])!;
  const toc = tableOfContents(`src/content/insights/${slug}.mdx`);
  const more = articles.filter((a) => a.slug !== slug).slice(0, 3);
  const contactHref = `/contact/?service=${primary.slug}`;

  return (
    <>
      <JsonLd data={articleSchema(article)} />

      {/* Reading progress (scroll-driven where supported) */}
      <div
        aria-hidden="true"
        className="read-progress fixed inset-x-0 top-0 z-[60] h-1 origin-left bg-accent"
      />

      {/* Header */}
      <section className="relative isolate overflow-hidden bg-paper">
        <PerspectiveGrid className="h-[70%]" />
        <Container className="pt-10 pb-14 sm:pt-12 lg:pb-20">
          <Breadcrumbs
            items={[
              { name: "Insights", path: "/insights/" },
              { name: article.category, path: `/insights/${slug}/` },
            ]}
          />
          <div className="mt-12 grid items-center gap-12 lg:grid-cols-[1.25fr_1fr] lg:gap-14">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-[0.8125rem] font-bold ring-1 ring-line">
                <span className="size-2 rounded-full bg-accent" />
                {article.category} guide
              </p>
              <h1 className="mt-6 text-h1 font-extrabold">{article.title}</h1>
              <p className="mt-5 max-w-3xl text-lead text-muted">
                {article.description}
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-[0.9375rem] text-muted">
                <span className="inline-flex items-center gap-2.5 font-semibold text-ink">
                  <span
                    aria-hidden="true"
                    className="grid size-8 place-items-center rounded-full bg-ink text-[0.75rem] font-extrabold text-white"
                  >
                    G
                  </span>
                  {ARTICLE_AUTHOR}
                </span>
                <span aria-hidden="true">·</span>
                <time dateTime={article.published}>
                  {formatDate(article.published)}
                </time>
                <span aria-hidden="true">·</span>
                <span>{article.readingMinutes} min read</span>
              </div>
            </div>
            <ArticleIllustration
              kind={article.illustration}
              className="rounded-3xl shadow-[0_40px_80px_-40px_rgb(23_25_24/0.45)] ring-1 ring-line"
            />
          </div>
        </Container>
      </section>

      {/* Article + sidebar */}
      <section className="border-t border-line bg-white">
        <Container className="grid gap-12 py-14 lg:grid-cols-[minmax(0,1fr)_21rem] lg:gap-14 lg:py-20 xl:gap-16">
          <div>
            <article className="prose-gb article-body">
              <Body />
            </article>

            {/* End of article */}
            <div className="mt-16 rounded-3xl bg-paper p-8 ring-1 ring-line">
              <div className="flex items-center gap-4">
                <span
                  aria-hidden="true"
                  className="grid size-12 place-items-center rounded-full bg-ink text-[1rem] font-extrabold text-white"
                >
                  G
                </span>
                <div>
                  <p className="font-extrabold">
                    Written by the {ARTICLE_AUTHOR}
                  </p>
                  <p className="text-[0.9375rem] text-muted">
                    Plain-English guides from the people who do the work.
                  </p>
                </div>
              </div>
              <p className="mt-6 text-[1.0625rem]">
                Planning something like this? Tell us about it and we&rsquo;ll
                suggest the smallest useful first step.
              </p>
              <ButtonLink
                href={contactHref}
                variant="brand"
                arrow
                className="mt-5"
              >
                Talk to us about {serviceNoun(primary)}
              </ButtonLink>
            </div>
          </div>

          <aside className="space-y-5 lg:sticky lg:top-28 lg:self-start">
            {toc.length > 2 && (
              <nav
                aria-label="In this guide"
                className="rounded-3xl border border-line p-6"
              >
                <p className="text-[0.75rem] font-bold tracking-[0.14em] text-muted uppercase">
                  In this guide
                </p>
                <ol className="mt-4 space-y-1">
                  {toc.map((t, i) => (
                    <li key={t.id}>
                      <a
                        href={`#${t.id}`}
                        className="group flex gap-3 rounded-lg px-2 py-1.5 text-[0.9375rem] leading-snug transition-colors hover:bg-paper"
                      >
                        <span className="text-[0.8125rem] font-bold text-accent tabular-nums">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="group-hover:text-accent-strong">
                          {t.text}
                        </span>
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            )}

            <div className="on-dark relative overflow-hidden rounded-3xl bg-ink p-7 text-white">
              <span
                aria-hidden="true"
                className="absolute -top-8 -right-8 size-28 rounded-full bg-accent/25 blur-2xl"
              />
              <GbIcon
                name={primary.slug}
                className="relative size-9 text-accent"
              />
              <p className="relative mt-4 text-[1.25rem] leading-snug font-extrabold">
                Need help with {serviceNoun(primary)}?
              </p>
              <p className="relative mt-2 text-[0.9375rem] text-white/65">
                {primary.summary}
              </p>
              <Link
                href={contactHref}
                className="relative mt-5 inline-flex items-center gap-2 font-bold text-accent hover:text-white"
              >
                Start a project <ArrowIcon />
              </Link>
            </div>

            <div className="rounded-3xl border border-line p-6">
              <p className="text-[0.75rem] font-bold tracking-[0.14em] text-muted uppercase">
                Related services
              </p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {article.services.map((s) => (
                  <li key={s}>
                    <Link
                      href={`/services/${s}/`}
                      className="inline-flex rounded-full bg-paper px-3 py-1.5 text-[0.8125rem] font-semibold ring-1 ring-line transition-colors hover:bg-accent hover:text-white hover:ring-accent"
                    >
                      {getService(s)!.shortName}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </Container>
      </section>

      {/* Keep reading */}
      <section className="border-t border-line bg-paper">
        <Container className="py-14 lg:py-20">
          <div className="flex items-end justify-between gap-6">
            <h2 className="text-h2 font-extrabold">Keep reading</h2>
            <Link
              href="/insights/"
              className="inline-flex items-center gap-2 font-bold hover:text-accent-strong"
            >
              All guides <ArrowIcon />
            </Link>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {more.map((a) => (
              <ArticleCard key={a.slug} article={a} />
            ))}
          </div>
        </Container>
      </section>

      <CtaBand
        heading={primary.cta.heading}
        body={primary.cta.body}
        href={contactHref}
      />
    </>
  );
}
