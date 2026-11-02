import { industries } from "@/content/industries";
import { existsSync, readFileSync } from "node:fs";
import { afterEach, describe, expect, it, vi } from "vitest";
import { articles } from "@/content/insights";
import { services } from "@/content/services";
import { projects } from "@/content/work";
import { publicRoutes } from "@/lib/routes";

afterEach(() => {
  vi.unstubAllEnvs();
  vi.resetModules();
});

describe("indexing configuration", () => {
  it("blocks indexing unless explicitly allowed", async () => {
    vi.stubEnv("NEXT_PUBLIC_ALLOW_INDEXING", "");
    const { robotsFor } = await import("@/lib/seo");
    const robots = (await import("@/app/robots")).default();
    expect(robotsFor()).toMatchObject({ index: false, follow: false });
    expect(robots.rules).toEqual({ userAgent: "*", disallow: "/" });
  });

  it("allows indexing when enabled, but still noindexes drafts", async () => {
    vi.stubEnv("NEXT_PUBLIC_ALLOW_INDEXING", "true");
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "https://www.example.com/");
    const { robotsFor, pageMetadata } = await import("@/lib/seo");
    expect(robotsFor()).toMatchObject({ index: true });
    expect(robotsFor(true)).toMatchObject({ index: false });
    const meta = pageMetadata({ title: "T", description: "D", path: "/about/" });
    expect(meta.alternates?.canonical).toBe("https://www.example.com/about/");
    const robots = (await import("@/app/robots")).default();
    expect(robots.sitemap).toBe("https://www.example.com/sitemap.xml");
  });
});

describe("sitemap", () => {
  const paths = publicRoutes().map((r) => r.path);

  it("excludes utility pages and lists the published policies", () => {
    expect(paths).not.toContain("/thank-you/");
    for (const p of ["/privacy/", "/terms/", "/cookies/", "/accessibility/"]) expect(paths).toContain(p);
  });

  it("includes every service, industry, project, and article exactly once", () => {
    // home, services, industries, work, about, insights, contact, business formation, and four policies
    expect(paths.length).toBe(12 + services.length + industries.length + projects.length + articles.length);
    expect(new Set(paths).size).toBe(paths.length);
  });

  it("uses trailing-slash URLs", () => {
    for (const p of paths) expect(p.endsWith("/")).toBe(true);
  });
});

describe("content integrity", () => {
  it("has unique service titles and descriptions of sensible length", () => {
    expect(new Set(services.map((s) => s.metaTitle)).size).toBe(services.length);
    expect(new Set(services.map((s) => s.metaDescription)).size).toBe(services.length);
    for (const s of services) {
      expect(s.metaDescription.length).toBeGreaterThan(70);
      expect(s.metaDescription.length).toBeLessThanOrEqual(170);
      expect(s.faqs.length).toBeGreaterThanOrEqual(4);
      expect(s.deliverables.length).toBeGreaterThanOrEqual(4);
    }
  });

  it("only references services, articles, and projects that exist", () => {
    const slugs = new Set<string>(services.map((s) => s.slug));
    const articleSlugs = new Set(articles.map((a) => a.slug));
    const projectSlugs = new Set(projects.map((p) => p.slug));
    for (const s of services) {
      s.related.forEach((r) => expect(slugs.has(r)).toBe(true));
      s.articles.forEach((a) => expect(articleSlugs.has(a)).toBe(true));
      if (s.workSlug) expect(projectSlugs.has(s.workSlug)).toBe(true);
    }
    for (const p of projects) p.services.forEach((r) => expect(slugs.has(r)).toBe(true));
    for (const a of articles) a.services.forEach((r) => expect(slugs.has(r)).toBe(true));
  });

  it("has an MDX body for every project and article", () => {
    for (const p of projects) expect(existsSync(`src/content/work/${p.slug}.mdx`)).toBe(true);
    for (const a of articles) expect(existsSync(`src/content/insights/${a.slug}.mdx`)).toBe(true);
  });

  it("links from MDX only to routes that exist", () => {
    const valid = new Set(publicRoutes().map((r) => r.path));
    const files = [
      ...projects.map((p) => `src/content/work/${p.slug}.mdx`),
      ...articles.map((a) => `src/content/insights/${a.slug}.mdx`),
    ];
    for (const f of files) {
      const links = [...readFileSync(f, "utf8").matchAll(/\]\((\/[^)]*)\)/g)].map((m) => m[1]);
      for (const l of links) expect(valid.has(l), `${f} links to ${l}`).toBe(true);
    }
  });

  it("avoids banned phrases and guarantee language", () => {
    const text = JSON.stringify({ services, projects, articles }).toLowerCase();
    for (const banned of ["revolutionize", "unlock your potential", "cutting-edge", "guaranteed results", "#1 agency"]) {
      expect(text).not.toContain(banned);
    }
  });
});
