import type { CSSProperties } from "react";
import Link from "next/link";
import { IndustryIcon } from "@/components/icons/IndustryIcon";
import { Breadcrumbs, CtaBand } from "@/components/ui/blocks";
import { ArrowIcon, Container, Eyebrow } from "@/components/ui/primitives";
import { PerspectiveGrid } from "@/components/visuals/PerspectiveGrid";
import { industries } from "@/content/industries";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Industries We Serve: Web, Software & Marketing",
  description:
    "Growbytes builds websites, software, and marketing for retail, healthcare, real estate, professional services, hospitality, education, manufacturing, and media.",
  path: "/industries/",
});

export default function IndustriesPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-paper">
        <PerspectiveGrid className="h-[60%]" />
        <Container className="pt-10 pb-16 sm:pt-12 lg:pb-24">
          <Breadcrumbs items={[{ name: "Industries", path: "/industries/" }]} />
          <div className="mt-10 grid items-center gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
            <div>
              <Eyebrow>Industries</Eyebrow>
              <h1 className="mt-4 text-display font-extrabold lg:text-[min(4.8vw,4.5rem)] lg:leading-[1.03]">
                Built for how <span className="text-accent">your industry works.</span>
              </h1>
              <p className="mt-7 max-w-[34rem] text-lead text-muted">
                Every sector has its own customers, rules, and busy seasons. We shape websites, software, and marketing
                around yours.
              </p>
            </div>
            {/* Floating grid of industry icons */}
            <div aria-hidden="true" className="relative mx-auto grid w-full max-w-[26rem] grid-cols-4 gap-3 lg:mr-0">
              {industries.map((ind, i) => (
                <span
                  key={ind.slug}
                  className={`ai-float grid aspect-square place-items-center rounded-2xl ring-1 ${
                    i === 2 || i === 5 ? "bg-accent text-white ring-accent" : i % 3 === 0 ? "bg-ink text-white ring-ink" : "bg-white text-ink ring-line"
                  } shadow-[0_18px_40px_-22px_rgb(23_25_24/0.35)]`}
                  style={{ "--d": `${i * 0.5}s` } as CSSProperties}
                >
                  <IndustryIcon path={ind.icon} className="size-8" />
                </span>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="border-t border-line bg-white">
        <Container className="py-16 lg:py-24">
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {industries.map((ind) => (
              <li key={ind.slug}>
                <Link
                  href={`/industries/${ind.slug}/`}
                  className="group flex h-full flex-col rounded-3xl border border-line bg-paper p-7 transition-colors duration-300 hover:border-ink hover:bg-ink"
                >
                  <span className="grid size-14 place-items-center rounded-2xl bg-white text-ink ring-1 ring-line transition-colors duration-300 group-hover:bg-accent group-hover:text-white group-hover:ring-accent">
                    <IndustryIcon path={ind.icon} className="size-7" />
                  </span>
                  <span className="mt-6 text-[1.375rem] leading-snug font-extrabold transition-colors group-hover:text-white">{ind.name}</span>
                  <span className="mt-2 text-muted transition-colors group-hover:text-white/65">{ind.blurb}</span>
                  <span className="mt-auto inline-flex items-center gap-2 pt-8 font-bold transition-colors group-hover:text-accent">
                    Explore <ArrowIcon className="transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <CtaBand heading="Don’t see your industry?" body="We work with businesses of all kinds. Tell us about yours and we’ll show you how we’d help." />
    </>
  );
}
