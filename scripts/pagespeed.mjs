#!/usr/bin/env node
/**
 * Google PageSpeed Insights (Lighthouse + real-user Core Web Vitals). Free.
 *
 *   npm run pagespeed                       homepage, mobile and desktop
 *   npm run pagespeed -- <url> [mobile|desktop]
 *   npm run pagespeed -- key-pages          homepage, services, contact, one service and article
 *
 * Optional: PAGESPEED_API_KEY in .env.local raises the free quota.
 */
const SITE = (process.env.GSC_SITE_URL || "https://www.growbytes.co").replace(/\/$/, "");
const KEY = process.env.PAGESPEED_API_KEY;

const KEY_PAGES = ["/", "/services/", "/services/web-design-development/", "/contact/", "/insights/seo-or-paid-ads-where-to-start/"];

async function run(url, strategy) {
  const q = new URLSearchParams({ url, strategy });
  for (const c of ["performance", "accessibility", "best-practices", "seo"]) q.append("category", c);
  if (KEY) q.set("key", KEY);
  const res = await fetch(`https://www.googleapis.com/pagespeedonline/v5/runPagespeed?${q}`, { signal: AbortSignal.timeout(120_000) });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error?.message || `status ${res.status}`);

  const cats = data.lighthouseResult?.categories ?? {};
  const audits = data.lighthouseResult?.audits ?? {};
  const field = data.loadingExperience?.metrics ?? {};
  const score = (c) => (c ? Math.round(c.score * 100) : "-");
  const fieldVal = (k, unit = "ms") => (field[k] ? `${field[k].percentile}${unit} (${field[k].category})` : "no field data");

  return {
    page: url.replace(SITE, "") || "/",
    strategy,
    performance: score(cats.performance),
    accessibility: score(cats.accessibility),
    bestPractices: score(cats["best-practices"]),
    seo: score(cats.seo),
    LCP: audits["largest-contentful-paint"]?.displayValue ?? "-",
    CLS: audits["cumulative-layout-shift"]?.displayValue ?? "-",
    TBT: audits["total-blocking-time"]?.displayValue ?? "-",
    realLCP: fieldVal("LARGEST_CONTENTFUL_PAINT_MS"),
    realINP: fieldVal("INTERACTION_TO_NEXT_PAINT"),
  };
}

const [a, b] = process.argv.slice(2);
const targets = a === "key-pages" ? KEY_PAGES.map((p) => SITE + p) : [a || `${SITE}/`];
const strategies = b ? [b] : ["mobile", "desktop"];

const rows = [];
for (const url of targets) {
  for (const s of strategies) {
    try {
      rows.push(await run(url, s));
    } catch (e) {
      rows.push({ page: url, strategy: s, error: e.message });
    }
  }
}
console.table(rows);
