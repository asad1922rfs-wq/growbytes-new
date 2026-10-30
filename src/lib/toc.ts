import { readFileSync } from "node:fs";
import path from "node:path";
import GithubSlugger from "github-slugger";

/**
 * Reads "## " headings from an MDX file and returns ids matching those
 * produced by rehype-slug (both use github-slugger).
 */
export function tableOfContents(mdxPath: string) {
  const source = readFileSync(path.join(process.cwd(), mdxPath), "utf8");
  const slugger = new GithubSlugger();
  const items: { id: string; text: string }[] = [];
  for (const line of source.split(/\r?\n/)) {
    const h2 = line.match(/^##\s+(.+?)\s*$/);
    const h3 = line.match(/^###\s+(.+?)\s*$/);
    // Run every heading through the slugger so duplicate-suffix numbering matches rehype-slug.
    if (h2) items.push({ id: slugger.slug(h2[1]), text: h2[1] });
    else if (h3) slugger.slug(h3[1]);
  }
  return items;
}
