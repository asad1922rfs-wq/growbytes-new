---
name: seo-optimize-page
description: Optimise an existing Growbytes page for a target keyword: title, meta description, H1, headings, copy, internal links, FAQ schema. Use when asked to improve, optimise, or fix SEO on a specific page or set of pages.
---

# Optimise a page

## Before editing
1. Get the page's current data: `npm run gsc -- inspect <url>` and the queries it ranks for (`npm run gsc -- queries 90`, or the `gsc` MCP server filtered to that page).
2. Pick one primary keyword and 2–4 close variants from that data.

## What to change
- **Title:** primary keyword near the start, ≤ 48 chars (the layout appends ` | Growbytes`; the homepage title in `src/app/page.tsx` is used as-is, ≤ 60).
- **Meta description:** 120–155 chars, says what the visitor gets, includes the keyword naturally, ends with a reason to click.
- **H1:** one per page, contains the keyword or a close variant, reads naturally.
- **Headings:** H2s answer the questions people search; use the query wording where it fits.
- **Copy:** first paragraph states the topic plainly. Easy tone, short sentences.
- **Internal links:** link to and from related services (`src/content/services.ts`), industries, and insights with descriptive anchor text.
- **FAQs:** service pages use `serviceFaqs()` in `src/content/services.ts`; industry FAQs are in `src/content/industries.ts`. FAQ schema is generated automatically from them.

## Where the fields live
- Services: `metaTitle`, `metaDescription`, `h1`, `intro`, `faqs` in `src/content/services.ts`.
- Industries: same fields in `src/content/industries.ts`.
- Articles: `title`, `description` in `src/content/insights.ts`; body in `src/content/insights/<slug>.mdx`.
- Other pages: `pageMetadata({ title, description, path })` at the top of `src/app/**/page.tsx`.

## Rules
- No fabricated stats, client names, testimonials, or ranking promises.
- Don't change URLs of pages that already rank. If a URL must change, add a 301 in `next.config.ts`.
- Verify: `npx tsc --noEmit && npx eslint src && npx vitest run && npx next build`, then `npm run seo:audit -- http://localhost:3100` against the local build on port 3100.
