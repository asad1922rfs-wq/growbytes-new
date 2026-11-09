import Image from "next/image";
import type React from "react";
import { SupportingProject } from "@/components/cards";
import { Breadcrumbs, CtaBand } from "@/components/ui/blocks";
import { ArrowLink, Container, Eyebrow } from "@/components/ui/primitives";
import { PerspectiveGrid } from "@/components/visuals/PerspectiveGrid";
import { clientProjects } from "@/content/clients";
import { projects } from "@/content/work";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Our Work: Websites, Shopify & Software",
  description:
    "Live client projects from Growbytes: a Shopify store, an e-paper publishing platform, and a complete HR management system, plus concept studies.",
  path: "/work/",
});

// Panel colour behind each showcase, matched to the product
const panel: Record<string, string> = {
  blinq: "bg-[#e9ecf0]",
  "advocate-epaper": "bg-[#e3ebf3]",
  "rfs-hcm": "bg-[#2b2c2a]",
};

export default function WorkPage() {
  return (
    <>
      {/* Hero with a project index */}
      <section className="relative isolate overflow-hidden bg-paper">
        <PerspectiveGrid className="h-[60%]" />
        <Container className="pt-10 pb-16 sm:pt-12 lg:pb-24">
          <Breadcrumbs items={[{ name: "Work", path: "/work/" }]} />
          <div className="mt-10 grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:items-center lg:gap-16">
            <div>
              <Eyebrow>Our work</Eyebrow>
              <h1 className="mt-4 text-display font-extrabold lg:text-[min(5.2vw,5rem)] lg:leading-[1]">
                Work that&rsquo;s <span className="text-accent">live and working.</span>
              </h1>
              <p className="mt-7 max-w-[34rem] text-lead text-muted">
                Real projects for real businesses: an online store, a publishing platform, and an HR system. Each one shown
                with the client&rsquo;s permission.
              </p>
            </div>
            {/* Fanned stack of the three live projects */}
            <div aria-hidden="true" className="relative mx-auto aspect-[4/3] w-full max-w-[30rem] lg:mr-0">
              {clientProjects.map((p, i) => (
                <div
                  key={p.name}
                  className="ai-float absolute w-[78%] overflow-hidden rounded-xl bg-white shadow-[0_24px_50px_-24px_rgb(23_25_24/0.45)] ring-1 ring-line"
                  style={
                    {
                      left: `${i * 11}%`,
                      top: `${i * 18}%`,
                      rotate: `${(i - 1) * 4}deg`,
                      zIndex: i,
                      "--d": `${i * 1.2}s`,
                    } as React.CSSProperties
                  }
                >
                  <div className="flex items-center gap-1 border-b border-line px-3 py-2">
                    <span className="size-1.5 rounded-full bg-[#e8735a]" />
                    <span className="size-1.5 rounded-full bg-[#e9c46a]" />
                    <span className="size-1.5 rounded-full bg-[#7fb38a]" />
                  </div>
                  <Image src={p.image} alt="" width={p.width} height={p.height} sizes="24rem" className="block h-auto w-full" />
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Client showcases */}
      {clientProjects.map((p, i) => {
        const flip = i % 2 === 1;
        const darkPanel = p.name === "rfs-hcm";
        return (
          <section key={p.name} id={p.name} aria-labelledby={`${p.name}-title`} className="scroll-mt-24 border-t border-line bg-white">
            <Container className="grid items-center gap-10 py-16 lg:grid-cols-[1.25fr_1fr] lg:gap-16 lg:py-24">
              {/* Visual */}
              <div className={`group relative aspect-[16/11] overflow-hidden rounded-3xl ${panel[p.name]} ${flip ? "lg:order-2" : ""}`}>
                <div className="absolute inset-x-6 top-8 overflow-hidden rounded-lg bg-white shadow-[0_24px_60px_-28px_rgb(23_25_24/0.45)] ring-1 ring-line transition-transform duration-500 ease-[var(--ease-out-soft)] group-hover:-translate-y-1.5 sm:inset-x-12 sm:top-12">
                  <div className="flex items-center gap-1.5 border-b border-line px-4 py-2.5">
                    <span className="size-2 rounded-full bg-[#e8735a]" />
                    <span className="size-2 rounded-full bg-[#e9c46a]" />
                    <span className="size-2 rounded-full bg-[#7fb38a]" />
                    <span className="mx-auto rounded-md bg-paper px-6 py-0.5 text-[0.6875rem] text-muted">{p.domain}</span>
                  </div>
                  <Image src={p.image} alt={p.imageAlt} width={p.width} height={p.height} sizes="(min-width: 1024px) 55vw, 100vw" className="block h-auto w-full" />
                </div>
                {p.art}
              </div>

              {/* Story */}
              <div className={flip ? "lg:order-1" : ""}>
                <p className="flex items-center gap-3">
                  <span className="text-[3.5rem] leading-none font-extrabold tracking-tighter text-transparent [-webkit-text-stroke:1.5px_var(--color-ink)]">
                    0{i + 1}
                  </span>
                  <span className={`rounded-sm px-2 py-1 text-[0.75rem] font-bold text-white ${p.green ? "bg-[#1f7a46]" : "bg-accent-button"}`}>
                    Client project
                  </span>
                </p>
                <h2 id={`${p.name}-title`} className="mt-6 text-h2 font-extrabold">
                  {p.title}
                </h2>
                <p className="mt-4 text-[1.0625rem] text-ink/75">{p.body}</p>
                {p.built && (
                  <ul className="mt-6 space-y-2.5">
                    {p.built.map((b) => (
                      <li key={b} className="flex gap-3">
                        <span aria-hidden="true" className={`mt-0.5 grid size-5 shrink-0 place-items-center rounded-full text-white ${darkPanel ? "bg-[#1f7a46]" : "bg-accent"}`}>
                          <svg viewBox="0 0 12 12" className="size-2.5 fill-none stroke-current" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="m2.5 6.2 2.2 2.2 4.8-5" />
                          </svg>
                        </span>
                        {b}
                      </li>
                    ))}
                  </ul>
                )}
                {p.services && (
                  <ul className="mt-6 flex flex-wrap gap-2">
                    {p.services.map((s) => (
                      <li key={s} className="rounded-full bg-paper px-3 py-1.5 text-[0.8125rem] font-semibold ring-1 ring-line">
                        {s}
                      </li>
                    ))}
                  </ul>
                )}
                {p.href && (
                  <a
                    href={p.href}
                    target="_blank"
                    rel="noopener"
                    className="mt-8 inline-flex items-center gap-2 font-bold underline decoration-accent decoration-2 underline-offset-[6px]"
                  >
                    Visit {p.domain} <span aria-hidden="true">↗</span>
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                )}
              </div>
            </Container>
          </section>
        );
      })}

      {/* Concept studies */}
      <section id="concepts" aria-labelledby="concepts-title" className="scroll-mt-24 border-t border-line bg-paper">
        <Container className="py-16 lg:py-24">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <Eyebrow>Concept studies</Eyebrow>
              <h2 id="concepts-title" className="mt-4 max-w-[40rem] text-h2 font-extrabold">
                How we&rsquo;d solve common problems
              </h2>
            </div>
            <p className="max-w-[26rem] text-muted">
              Designed for fictional businesses to show our thinking. They are labelled as concepts and include no client
              results.
            </p>
          </div>
          <div className="mt-12 grid gap-12 md:grid-cols-3 md:gap-8">
            {projects.map((p) => (
              <SupportingProject key={p.slug} project={p} />
            ))}
          </div>
          <ArrowLink href="/contact/" className="mt-12">
            Have a similar problem? Let&rsquo;s talk
          </ArrowLink>
        </Container>
      </section>

      <CtaBand heading="Your project could be next." body="Tell us what you want to build or improve. A real person will reply." />
    </>
  );
}
