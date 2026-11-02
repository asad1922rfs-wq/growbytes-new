---
name: seo-report
description: Monthly SEO and traffic report for Growbytes combining Search Console, GA4, and PageSpeed. Use when asked for an SEO report, monthly report, how the site is doing, or progress since launch.
---

# SEO report

## Collect
- Search: `npm run gsc -- report 28` and `npm run gsc -- report 56` (to compare the previous period), `npm run gsc -- queries 28`, `npm run gsc -- pages 28`.
- Traffic: `npm run ga4 -- overview 28`, `npm run ga4 -- sources 28`, `npm run ga4 -- organic 28` (needs `GA4_PROPERTY_ID` and the service account added in GA4; if missing, say so and skip).
- Speed: `npm run pagespeed -- key-pages`.
- Health: `npm run gsc -- sitemaps`, `npm run seo:audit`.

## Write the report
1. **Summary:** 3–4 lines: clicks, impressions, CTR, average position, organic sessions, and the change versus the previous period.
2. **What grew / what dropped:** top queries and pages that moved, with likely reasons.
3. **Quick wins:** queries at position 4–20 and pages with low CTR, each with a concrete fix.
4. **Technical health:** audit issues, sitemap errors, Core Web Vitals.
5. **Next month:** 3–5 prioritised actions.

## Rules
- Only report numbers the tools returned. If data is missing or too small to judge, say so plainly.
- Keep it short and readable for a business owner. Offer to publish it as a page if it will be shared.
