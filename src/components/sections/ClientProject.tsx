import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import type { ReactNode } from "react";

export type ClientProjectData = {
  name: string;
  tag: string;
  title: string;
  body: string;
  /** Public path under /public; the card shows a placeholder until the file exists. */
  image: string;
  imageAlt: string;
  /** Intrinsic size of the screenshot. */
  width: number;
  height: number;
  /** Address shown in the browser bar. */
  domain: string;
  /** Public link; omit for private tools such as admin dashboards. */
  href?: string;
  /** Services delivered, shown as tags on the Work page. */
  services?: string[];
  /** What we built, as short bullet points. */
  built?: string[];
  /** Optional artwork layered over the compact card's empty space. */
  art?: ReactNode;
  /** Client logo shown in the large card. */
  /** Dark backdrop behind the screenshot (compact card). */
  dark?: boolean;
  /** Green "Client project" tag instead of orange, to tell neighbouring cards apart. */
  green?: boolean;
  logo?: { src: string; width: number; height: number };
};

function Screenshot({ project }: { project: ClientProjectData }) {
  const hasImage = fs.existsSync(path.join(process.cwd(), "public", project.image));
  return hasImage ? (
    <Image
      src={project.image}
      alt={project.imageAlt}
      width={project.width}
      height={project.height}
      sizes="(min-width: 1024px) 45vw, 100vw"
      className="block h-auto w-full"
    />
  ) : (
    <div className="grid aspect-[16/10] place-items-center bg-paper text-sm text-muted">Screenshot coming soon</div>
  );
}

function BrowserBar({ domain }: { domain: string }) {
  return (
    <div className="flex items-center gap-1.5 border-b border-line px-4 py-2.5">
      <span className="size-2 rounded-full bg-[#e8735a]" />
      <span className="size-2 rounded-full bg-[#e9c46a]" />
      <span className="size-2 rounded-full bg-[#7fb38a]" />
      <span className="mx-auto rounded-md bg-paper px-6 py-0.5 text-[0.6875rem] text-muted">{domain}</span>
    </div>
  );
}

/** Smaller client card that sits in the grid beside concept projects. */
export function ClientProjectCompact({ project }: { project: ClientProjectData }) {
  return (
    <article className="group relative flex flex-col">
      <div className={`relative aspect-[16/11] overflow-hidden rounded-xl ${project.dark ? "bg-[#2b2c2a]" : "bg-[#efe9df]"}`}>
        <div className="absolute inset-x-6 top-7 overflow-hidden rounded-lg bg-white shadow-[0_20px_50px_-24px_rgb(23_25_24/0.35)] ring-1 ring-line transition-transform duration-500 ease-[var(--ease-out-soft)] group-hover:-translate-y-1.5 sm:inset-x-10 sm:top-10">
          <BrowserBar domain={project.domain} />
          <Screenshot project={project} />
        </div>
        {project.art}
      </div>
      <p className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm">
        <span className={`rounded-sm px-2 py-1 text-[0.75rem] font-bold text-white ${project.green ? "bg-[#1f7a46]" : "bg-accent-button"}`}>Client project</span>
        <span className="font-semibold text-muted">{project.tag}</span>
      </p>
      <h3 className="mt-3 text-h3 font-bold tracking-tight">{project.title}</h3>
      <p className="mt-2 max-w-xl text-muted">{project.body}</p>
    </article>
  );
}

/** Client project card (shown with the client's permission). */
export function ClientProject({ project }: { project: ClientProjectData }) {
  return (
    <article className="group relative grid overflow-hidden rounded-xl bg-[#efe9df] lg:grid-cols-[1.55fr_1fr]">
      <div className="px-5 pt-6 sm:px-10 sm:pt-12 lg:pr-0">
        <div className="translate-y-2 overflow-hidden rounded-t-lg bg-white shadow-[0_20px_50px_-24px_rgb(23_25_24/0.35)] ring-1 ring-line transition-transform duration-500 ease-[var(--ease-out-soft)] group-hover:translate-y-0">
          <BrowserBar domain={project.domain} />
          <Screenshot project={project} />
        </div>
      </div>
      <div className="flex flex-col p-7 sm:p-10 lg:p-12">
        <p className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm">
          <span className={`rounded-sm px-2 py-1 text-[0.75rem] font-bold text-white ${project.green ? "bg-[#1f7a46]" : "bg-accent-button"}`}>Client project</span>
          <span className="font-semibold text-muted">{project.tag}</span>
        </p>
        <h3 className="mt-4 text-h3 font-extrabold tracking-tight lg:text-[2rem] lg:leading-[1.15]">{project.title}</h3>
        <p className="mt-4 text-muted">{project.body}</p>
        {project.logo && (
          <Image
            src={project.logo.src}
            alt={`${project.name} logo`}
            width={project.logo.width}
            height={project.logo.height}
            className="mt-auto h-auto w-24 pt-8"
          />
        )}
        {project.href && (
          <p className="mt-auto pt-8">
            <a
              href={project.href}
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-2 font-bold underline decoration-accent decoration-2 underline-offset-[6px] after:absolute after:inset-0"
            >
              Visit {project.domain}
              <span aria-hidden="true">↗</span>
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          </p>
        )}
      </div>
    </article>
  );
}
