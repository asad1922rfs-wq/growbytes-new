---
name: seo-write-article
description: Write and publish a new SEO article in the Growbytes Insights section, targeting a real search query. Use when asked to write a blog post, article, guide, or content for a keyword.
---

# Write an Insights article

## 1. Pick the topic from data
Use queries from `npm run gsc -- queries 90` (or the `seo-keywords` skill). The article should answer one clear search intent that matches a Growbytes service.

## 2. Outline
- Title ≤ 48 chars with the keyword near the start (the layout adds ` | Growbytes`).
- Description 120–155 chars.
- 5–8 H2 sections that answer what searchers want to know, in the order they'd ask it.
- One practical takeaway per section; a short checklist or table where it helps.

## 3. Write
- Plain, easy English: short sentences, no buzzwords, no filler.
- Specific and honest: no invented stats, clients, or guarantees. If a number is needed, explain it as a range or "it depends", or cite the source.
- Link to 1–3 relevant services (`/services/<slug>/`) and, where it fits, an industry page.

## 4. Publish
1. Create `src/content/insights/<slug>.mdx` (copy the structure of an existing article there; H2s use `##`).
2. Add an entry to the `articles` array in `src/content/insights.ts` with `slug`, `title`, `description`, `category`, `published` (today, `YYYY-MM-DD`), `readingMinutes`, `services`, and an `illustration` key that already exists.
3. It appears automatically on `/insights/`, in the footer, in the sitemap, and with Article schema.
4. Verify: `npx tsc --noEmit && npx vitest run && npx next build`; preview on port 3100 (stop the old process first).
5. After deploy: `npm run gsc -- inspect https://www.growbytes.co/insights/<slug>/` and ask the user to click "Request indexing" in Search Console.
