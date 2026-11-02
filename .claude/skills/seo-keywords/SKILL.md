---
name: seo-keywords
description: Keyword research and quick-win finder for Growbytes using real Search Console data (and Google Trends). Use when asked which keywords to target, what to rank for, quick wins, low CTR pages, or content gaps.
---

# Keyword research and quick wins

Work from real data first; never invent search volumes.

## 1. Pull the data
- `npm run gsc -- queries 90` – top queries with clicks, impressions, CTR, position.
- `npm run gsc -- pages 90` – top pages.
- If the `gsc` MCP server is connected, its tools can also run filtered queries (regex, page + query pairs, quick wins).

## 2. Find the opportunities
- **Quick wins:** position 4–20 with meaningful impressions. Improve the matching page's title, description, H1, and content.
- **Low CTR:** position ≤ 10 but CTR well below peers. Rewrite title and description to match the search intent.
- **Cannibalisation:** one query spread over several pages. Pick one page; link the others to it.
- **Gaps:** relevant queries with impressions but no page that answers them. Propose a new insight article, service section, or industry page.

## 3. Trends (free)
There is no free official Google Trends API. Compare candidate terms at `https://trends.google.com/trends/explore?q=<term1>,<term2>` (ask the user to check, or use web search for seasonality and rising related terms). Semrush can be added later for volumes and difficulty.

## 4. Map keywords to pages
Produce a table: keyword → target URL → current position → action. One primary keyword per page. Services live in `src/content/services.ts`, industries in `src/content/industries.ts`, articles in `src/content/insights.ts` + `src/content/insights/*.mdx`, business formation at `src/app/business-formation/page.tsx`.

## Rules
- Use honest claims only: no invented stats, clients, rankings, or guarantees.
- Plain, easy English. Don't name specific countries in "where we work" copy.
- Hand off to the `seo-optimize-page` skill to apply changes, or `seo-write-article` for new content.
