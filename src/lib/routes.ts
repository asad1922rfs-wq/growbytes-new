import { industries } from "@/content/industries";
import { articles } from "@/content/insights";
import { services } from "@/content/services";
import { projects } from "@/content/work";
import { NON_INDEXABLE_PATHS } from "@/lib/seo";

/** Every public, indexable route. Drafts, thank-you, and 404 are excluded. */
export function publicRoutes(): { path: string; lastModified?: string }[] {
  const routes = [
    { path: "/" },
    { path: "/services/" },
    ...services.map((s) => ({ path: `/services/${s.slug}/` })),
    { path: "/industries/" },
    ...industries.map((i) => ({ path: `/industries/${i.slug}/` })),
    { path: "/work/" },
    ...projects.map((p) => ({ path: `/work/${p.slug}/` })),
    { path: "/about/" },
    { path: "/insights/" },
    ...articles.map((a) => ({ path: `/insights/${a.slug}/`, lastModified: a.updated ?? a.published })),
    { path: "/contact/" },
    { path: "/privacy/" },
    { path: "/terms/" },
    { path: "/cookies/" },
    { path: "/accessibility/" },
  ];
  return routes.filter((r) => !NON_INDEXABLE_PATHS.includes(r.path));
}
