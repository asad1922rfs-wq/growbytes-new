#!/usr/bin/env node
/**
 * On-page SEO audit of every URL in the sitemap.
 *
 *   npm run seo:audit                       audit the live site
 *   npm run seo:audit -- http://localhost:3100    audit a local build (next start)
 *
 * Checks status, title and description length, a single H1, canonical,
 * noindex, image alt text, and structured data. Exits 1 when errors are found.
 */
const base = (process.argv[2] || process.env.GSC_SITE_URL || "https://www.growbytes.co").replace(/\/$/, "");
const live = (process.env.GSC_SITE_URL || "https://www.growbytes.co").replace(/\/$/, "");

const text = (html, re) => (html.match(re)?.[1] ?? "").replace(/&amp;/g, "&").replace(/&#x27;|&#39;/g, "'").trim();

async function audit(url) {
  const res = await fetch(url, { redirect: "manual", headers: { "User-Agent": "GrowbytesSEOAudit/1.0" } });
  const issues = [];
  if (res.status !== 200) return { url, status: res.status, issues: [`status ${res.status}`] };
  const html = await res.text();

  const title = text(html, /<title>([^<]*)<\/title>/i);
  const desc = text(html, /<meta name="description" content="([^"]*)"/i);
  const canonical = text(html, /<link rel="canonical" href="([^"]*)"/i);
  const robots = text(html, /<meta name="robots" content="([^"]*)"/i);
  const h1s = (html.match(/<h1[\s>]/gi) || []).length;
  const imgs = html.match(/<img\b[^>]*>/gi) || [];
  const noAlt = imgs.filter((t) => !/\balt=/.test(t)).length;
  const schema = (html.match(/application\/ld\+json/g) || []).length;

  if (!title) issues.push("missing title");
  else if (title.length > 60) issues.push(`title ${title.length} chars (>60)`);
  else if (title.length < 25) issues.push(`title ${title.length} chars (<25)`);
  if (!desc) issues.push("missing description");
  else if (desc.length > 160) issues.push(`description ${desc.length} chars (>160)`);
  else if (desc.length < 70) issues.push(`description ${desc.length} chars (<70)`);
  if (h1s !== 1) issues.push(`${h1s} H1 tags`);
  if (!canonical) issues.push("missing canonical");
  else if (!canonical.startsWith(live)) issues.push(`canonical not on ${live}: ${canonical}`);
  if (/noindex/i.test(robots)) issues.push("noindex");
  if (noAlt) issues.push(`${noAlt} images without alt`);
  if (!schema) issues.push("no structured data");

  return { url, status: 200, title, issues };
}

const sitemap = await (await fetch(`${base}/sitemap.xml`)).text();
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].replace(live, base));
if (!urls.length) {
  console.error(`No URLs found in ${base}/sitemap.xml`);
  process.exit(1);
}

const results = [];
for (let i = 0; i < urls.length; i += 6) results.push(...(await Promise.all(urls.slice(i, i + 6).map(audit))));

const titles = new Map();
for (const r of results) if (r.title) titles.set(r.title, [...(titles.get(r.title) || []), r.url]);
for (const [t, list] of titles) if (list.length > 1) for (const r of results) if (list.includes(r.url)) r.issues.push(`duplicate title: "${t}"`);

const bad = results.filter((r) => r.issues.length);
console.log(`\nAudited ${results.length} URLs from ${base}/sitemap.xml`);
if (!bad.length) console.log("No issues found.");
else console.table(bad.map((r) => ({ page: r.url.replace(base, "") || "/", issues: r.issues.join("; ") })));
process.exit(bad.some((r) => r.issues.some((i) => /status|missing|noindex|canonical|H1/.test(i))) ? 1 : 0);
