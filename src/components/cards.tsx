import Link from "next/link";
import { formatDate } from "@/content/insights";
import { getService } from "@/content/services";
import type { Article, Project } from "@/content/types";
import { ArrowIcon, GrowArrow, cn } from "@/components/ui/primitives";
import { ArticleIllustration } from "@/components/visuals/ArticleIllustration";
import { ProjectVisual } from "@/components/visuals/ProjectVisuals";

const toneBg: Record<Project["tone"], string> = {
  warm: "bg-[#e6e9ed]",
  light: "bg-surface",
  dark: "bg-ink-soft",
};

export function ProjectCard({ project, headingLevel = "h3", large }: { project: Project; headingLevel?: "h2" | "h3"; large?: boolean }) {
  const H = headingLevel;
  return (
    <article className="group relative flex flex-col">
      <div className={cn("overflow-hidden rounded-xl p-5 sm:p-8", toneBg[project.tone], large && "lg:p-12")}>
        <div className={cn("mx-auto transition-transform duration-500 ease-[var(--ease-out-soft)] group-hover:-translate-y-1", large && "max-w-3xl")}>
          <ProjectVisual kind={project.visual} />
        </div>
      </div>
      <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2">
        <span className="rounded-sm border border-accent-strong/30 bg-accent-tint px-2 py-1 text-[0.75rem] font-bold text-accent-strong">
          Concept project
        </span>
        <span className="text-sm text-muted">{project.sector}</span>
      </div>
      <H className={cn("mt-3 font-bold tracking-tight", large ? "text-h3 lg:text-[1.875rem] lg:leading-tight" : "text-h3")}>
        <Link href={`/work/${project.slug}/`} className="after:absolute after:inset-0 group-hover:text-accent-strong">
          {project.title}
        </Link>
      </H>
      <p className="mt-2 max-w-xl text-muted">{project.summary}</p>
      <p className="mt-3 text-sm text-muted">
        Illustrative work, not a client engagement · {project.services.map((s) => getService(s)?.shortName).join(", ")}
      </p>
    </article>
  );
}

export function ArticleCard({ article, headingLevel = "h3" }: { article: Article; headingLevel?: "h2" | "h3" }) {
  const H = headingLevel;
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-lg border border-line bg-white transition-shadow hover:shadow-card">
      <ArticleIllustration kind={article.illustration} className="rounded-none" />
      <div className="flex flex-1 flex-col p-7">
        <p className="text-eyebrow font-bold tracking-[0.14em] text-accent-strong uppercase">{article.category}</p>
        <H className="mt-3 text-xl font-bold leading-snug tracking-tight">
          <Link href={`/insights/${article.slug}/`} className="after:absolute after:inset-0 group-hover:underline group-hover:decoration-accent-strong group-hover:underline-offset-4">
            {article.title}
          </Link>
        </H>
        <p className="mt-2 text-[0.975rem] leading-relaxed text-muted">{article.description}</p>
        <p className="mt-auto flex items-center justify-between pt-5 text-sm text-muted">
          <span>
            <time dateTime={article.published}>{formatDate(article.published)}</time> · {article.readingMinutes} min read
          </span>
          <ArrowIcon className="text-ink transition-transform group-hover:translate-x-0.5" />
        </p>
      </div>
    </article>
  );
}

/** Homepage portfolio: the featured concept, mockup large on the left, details beside it. */
export function FeaturedProject({ project }: { project: Project }) {
  return (
    <article className="group relative grid overflow-hidden rounded-xl bg-[#e6e9ed] lg:grid-cols-[1.55fr_1fr]">
      <div className="px-5 pt-6 sm:px-10 sm:pt-12 lg:pr-0 lg:pb-0">
        {/* Bottom-cropped so the storefront reads as a large, continuous screen. */}
        <div className="translate-y-2 transition-transform duration-500 ease-[var(--ease-out-soft)] group-hover:translate-y-0">
          <ProjectVisual kind={project.visual} />
        </div>
      </div>
      <div className="flex flex-col p-7 sm:p-10 lg:p-12">
        <ProjectMeta />
        <h3 className="mt-4 text-h3 font-extrabold tracking-tight lg:text-[2rem] lg:leading-[1.15]">
          <Link href={`/work/${project.slug}/`} className="after:absolute after:inset-0">
            {project.title}
          </Link>
        </h3>
        <p className="mt-4 text-muted">{project.summary}</p>
        <p className="mt-auto flex items-center gap-2 pt-8 font-bold">
          <span className="underline decoration-accent decoration-2 underline-offset-[6px]">View the concept</span>
          <GrowArrow />
        </p>
      </div>
    </article>
  );
}

/** Supporting concept: fixed-ratio frame, mockup cropped at the bottom edge. */
export function SupportingProject({ project }: { project: Project }) {
  return (
    <article className="group relative flex flex-col">
      <div className={cn("relative aspect-[16/11] overflow-hidden rounded-xl", toneBg[project.tone])}>
        <div className="absolute inset-x-6 top-7 transition-transform duration-500 ease-[var(--ease-out-soft)] group-hover:-translate-y-1.5 sm:inset-x-10 sm:top-10">
          <ProjectVisual kind={project.visual} />
        </div>
      </div>
      <div className="mt-6">
        <ProjectMeta />
      </div>
      <h3 className="mt-3 text-h3 font-bold tracking-tight">
        <Link href={`/work/${project.slug}/`} className="after:absolute after:inset-0 group-hover:text-accent-strong">
          {project.title}
        </Link>
      </h3>
      <p className="mt-2 max-w-xl text-muted">{project.summary}</p>
    </article>
  );
}

function ProjectMeta() {
  return (
    <p className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm">
      <span className="rounded-sm bg-ink px-2 py-1 text-[0.75rem] font-bold text-white">Concept project</span>
    </p>
  );
}
