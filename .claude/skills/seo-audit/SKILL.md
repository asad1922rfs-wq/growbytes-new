---
name: seo-audit
description: Full technical and on-page SEO audit of the Growbytes site (live or local). Use when asked to audit SEO, check the site before or after a deploy, find SEO issues, or "why isn't a page ranking/indexed".
---

# SEO audit

Run a complete audit, then report findings ranked by impact and offer to fix them.

## 1. Crawl and on-page checks
- `npm run seo:audit` audits the live site from its sitemap. For a local build: `npm run build`, start it on port 3100 (stop any old process on 3100 first), then `npm run seo:audit -- http://localhost:3100`.
- The script flags: non-200 status, title length (25–60 chars), description length (70–160), H1 count ≠ 1, canonical not on `https://www.growbytes.co`, `noindex`, images without `alt`, missing structured data, duplicate titles.

## 2. Indexing and crawl health
- `curl -s https://www.growbytes.co/robots.txt` must show `Allow: /` and the sitemap line. A `Disallow: /` on production is critical: check `src/config/site.ts` (`allowIndexing`) and Vercel env vars.
- `npm run gsc -- sitemaps` for sitemap errors; `npm run gsc -- inspect <url>` for any page that should rank but doesn't.
- Every route in `src/lib/routes.ts` should appear in `/sitemap.xml`; `NON_INDEXABLE_PATHS` in `src/lib/seo.ts` lists what is deliberately excluded.

## 3. Performance
- `npm run pagespeed -- key-pages` (mobile and desktop). Flag performance < 90, LCP > 2.5s, CLS > 0.1, and any "no field data" pages with high traffic.

## 4. Redirects from old URLs
- `npm run gsc -- pages 90` lists URLs Google still knows. Any old URL with impressions that returns 404 needs a 301 in `next.config.ts` `redirects()`.

## Where things are fixed
- Page titles and descriptions: `metaTitle` / `metaDescription` in `src/content/services.ts`, `src/content/industries.ts`; `title`/`description` in `src/content/insights.ts`; `pageMetadata({...})` at the top of each `src/app/**/page.tsx`.
- The layout adds ` | Growbytes` (12 chars) to every page title except the homepage, so keep page titles ≤ 48 characters.
- Structured data helpers: `src/lib/structured-data.tsx`.

## Report format
Lead with critical issues (blocking indexing, 404s on ranking URLs, wrong canonicals), then high-impact on-page fixes, then nice-to-haves. Give file and line for each fix. After fixes: `npx tsc --noEmit`, `npx eslint src`, `npx vitest run`, `npx next build`, then re-run the audit.
