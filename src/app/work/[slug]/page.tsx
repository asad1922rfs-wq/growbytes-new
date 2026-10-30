import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProjectCard } from "@/components/cards";
import { Breadcrumbs, ConceptLabel, CtaBand } from "@/components/ui/blocks";
import { Chip, Container, Eyebrow, Section, cn } from "@/components/ui/primitives";
import { ProjectVisual } from "@/components/visuals/ProjectVisuals";
import { ServiceVisual } from "@/components/visuals/ServiceVisuals";
import { getService } from "@/content/services";
import { getProject, projects } from "@/content/work";
import { pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

// Every slug is known at build time; keep these pages fully static.
export const ensureStatic = "navigation";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return pageMetadata({ title: `${project.title} (Concept)`, description: project.metaDescription, path: `/work/${slug}/` });
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const { default: Body } = await import(`@/content/work/${slug}.mdx`);
  const dark = project.tone === "dark";
  const others = projects.filter((p) => p.slug !== slug);

  return (
    <>
      <section className={cn(dark ? "on-dark bg-ink text-paper" : project.tone === "warm" ? "bg-[#f1ebe2]" : "bg-surface")}>
        <Container className="pt-10 pb-section-sm sm:pt-12">
          <Breadcrumbs dark={dark} items={[{ name: "Work", path: "/work/" }, { name: project.client.split(" (")[0], path: `/work/${slug}/` }]} />
          <div className="mt-10 max-w-4xl">
            <Eyebrow dark={dark}>{project.sector}</Eyebrow>
            <h1 className="mt-4 text-h1 font-extrabold">{project.title}</h1>
            <p className={cn("mt-5 max-w-2xl text-lead", dark ? "text-muted-on-dark" : "text-muted")}>{project.summary}</p>
            <ConceptLabel dark={dark} className="mt-6" />
          </div>
          <div className="mx-auto mt-12 max-w-4xl">
            <ProjectVisual kind={project.visual} />
          </div>
        </Container>
      </section>

      {/* Key screens: supporting views with real captions */}
      <Section tone="paper" size="sm">
        <Container>
          <Eyebrow>Key screens</Eyebrow>
          <h2 className="mt-4 text-h2 font-bold">What the concept demonstrates</h2>
          <div className="mt-10 grid gap-10 lg:grid-cols-2">
            {project.screens.map((screen) => (
              <figure key={screen.title} className="flex flex-col">
                <div className="flex flex-1 items-center rounded-xl border border-line bg-white p-5 sm:p-8">
                  <ServiceVisual kind={screen.visual} label={`${screen.title}: ${screen.caption}`} />
                </div>
                <figcaption className="mt-5">
                  <h3 className="text-lg font-bold">{screen.title}</h3>
                  <p className="mt-1.5 max-w-xl text-muted">{screen.caption}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="white">
        <Container className="grid gap-12 lg:grid-cols-[1fr_2.2fr]">
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <dl className="space-y-6 border-t border-line pt-6">
              <div>
                <dt className="text-sm font-bold text-muted">Fictional business</dt>
                <dd className="mt-1 font-semibold">{project.client}</dd>
              </div>
              <div>
                <dt className="text-sm font-bold text-muted">Services demonstrated</dt>
                <dd className="mt-2 flex flex-wrap gap-2">
                  {project.services.map((s) => (
                    <Link key={s} href={`/services/${s}/`} className="hover:opacity-80">
                      <Chip>{getService(s)!.shortName}</Chip>
                    </Link>
                  ))}
                </dd>
              </div>
              <div>
                <dt className="text-sm font-bold text-muted">Key features</dt>
                <dd>
                  <ul className="mt-2 space-y-2 text-[0.975rem]">
                    {project.features.map((f) => (
                      <li key={f} className="flex gap-2">
                        <span aria-hidden="true" className="mt-2.5 size-1.5 shrink-0 rounded-full bg-accent" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
            </dl>
          </aside>
          <article className="prose-gb">
            <Body />
          </article>
        </Container>
      </Section>

      <Section size="sm">
        <Container>
          <h2 className="text-h3 font-bold">More concept work</h2>
          <div className="mt-8 grid gap-12 lg:grid-cols-2">
            {others.map((p) => (
              <ProjectCard key={p.slug} project={p} />
            ))}
          </div>
        </Container>
      </Section>

      <CtaBand heading="Facing a similar challenge?" body="Tell us what you're working on. We'll respond with questions or a suggested next step." />
    </>
  );
}
