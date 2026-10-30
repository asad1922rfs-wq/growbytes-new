# Growbytes website

Marketing website for Growbytes, built with Next.js 16 (App Router, Cache Components), TypeScript, Tailwind CSS v4, and local MDX.

> Status: feature-complete build of all launch routes. **Not ready to go live** until the items in
> [docs/LAUNCH_CHECKLIST.md](docs/LAUNCH_CHECKLIST.md) are resolved. The blockers are inquiry delivery, verified business details, and legal policies.

## Requirements

- Node.js 20.9+ (developed on Node 24)
- npm

## Commands

| Command | What it does |
| --- | --- |
| `npm install` | Install dependencies |
| `npm run dev` | Development server at http://localhost:3000 |
| `npm run build` | Production build (prerenders every public page) |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript, no emit |
| `npm test` | Unit tests (Vitest): form handling, adapters, rate limiting, indexing, sitemap, content integrity |
| `npm run test:smoke` | Route smoke test against a running server (`BASE_URL`, default `http://localhost:3000`) |

## Project structure

```
src/
  app/                    Routes, layouts, metadata routes (robots, sitemap, OG image)
    contact/actions.ts    Server action for the inquiry form
  components/
    layout/               Header, services mega menu, mobile nav, footer
    ui/                   Primitives (Container, Section, ButtonLink…) and blocks (FAQ, CTA, breadcrumbs, concept label)
    sections/             Reusable page sections (ServicesIndex)
    visuals/              Original HTML/SVG illustrations (hero, service, project, article, lifecycle)
    forms/                Inquiry form
    cards.tsx             Project and article cards
  config/site.ts          Brand, domain, contact, social, legal entity, indexing flag
  content/                Typed content: services, work, insights, home, navigation
    insights/*.mdx        Article bodies
    work/*.mdx            Concept project write-ups
  lib/
    seo.ts                Metadata helper, robots rules, non-indexable paths
    structured-data.tsx   JSON-LD (Organization, WebSite, BreadcrumbList, Service, Article)
    routes.ts             Public route list used by the sitemap
    inquiry/              Schema, adapters, rate limiter, processing core
docs/                     Content map, QA report, launch checklist
tests/                    Vitest unit tests
scripts/smoke.mjs         Route smoke test
```

## Editing content

All copy lives in `src/content`, not in components.

- **Services:** `src/content/services.ts`. Each service defines its H1, audience, problems, deliverables, process, scope factors, technologies, FAQs, related services, and articles. Add a service by adding an object. The route, mega menu, footer, sitemap, and contact form options update automatically. Then add a matching `VisualKey` illustration in `components/visuals/ServiceVisuals.tsx`.
- **Articles:** add metadata to `src/content/insights.ts` and the body to `src/content/insights/<slug>.mdx`. GitHub-flavored Markdown (tables, task lists) is enabled. Use root-relative links (`/services/seo/`); `npm test` fails on links to routes that don't exist.
- **Concept projects:** `src/content/work.ts` plus `src/content/work/<slug>.mdx`. Keep the concept label. Never add results, metrics, or client claims to fictional work.
- **Homepage sections:** `src/content/home.ts`.
- **Business details:** `src/config/site.ts`. Unknown values are `null`, and components render nothing for them. Fill them in only with verified information.

## Inquiry form setup

The form posts to a server action (`src/app/contact/actions.ts`) that validates input server-side with zod, applies a honeypot, a minimum fill time, and per-IP rate limiting, then hands off to a **delivery adapter** (`src/lib/inquiry/adapters.ts`).

| Mode | Behavior |
| --- | --- |
| No adapter, development | Validates, then shows **"Not sent — demo mode"**. No success page. |
| No adapter, production | Shows an error ("temporarily unavailable"). No success page. |
| Adapter configured | Visitors see `/thank-you/` only after the destination accepts the submission (HTTP 2xx). |

Configure one adapter (see `.env.example`):

- **Webhook:** `INQUIRY_ADAPTER=webhook`, `INQUIRY_WEBHOOK_URL`, optional `INQUIRY_WEBHOOK_SECRET`. The JSON payload is `{ type, receivedAt, inquiry: { name, email, company, website, phone, service, budget, message } }`.
- **Resend email:** `INQUIRY_ADAPTER=resend`, `RESEND_API_KEY`, `INQUIRY_TO_EMAIL`, `INQUIRY_FROM_EMAIL` (verified domain). Sends plain text with `reply_to` set to the visitor.

To add a CRM, implement the `InquiryAdapter` interface and return it from `getInquiryAdapter()`.

The rate limiter is in-memory, which suits a single long-running server. On serverless or multi-instance hosting, back it with a shared store such as Upstash Redis.

## Deployment

1. Set the environment variables from `.env.example` on your host (Vercel, or any Node host that can run `next start`).
2. Set `NEXT_PUBLIC_SITE_URL` to the production origin. Set `NEXT_PUBLIC_ALLOW_INDEXING=true` **only** on production. Previews stay `noindex` and `robots.txt` disallows everything.
3. `NEXT_PUBLIC_*` values are inlined at build time, so rebuild after changing them.
4. After deploying, submit a real test inquiry and confirm it arrives.
5. Submit `/sitemap.xml` in Google Search Console.

## Indexing and SEO

- Canonicals, Open Graph, and Twitter metadata come from `pageMetadata()` in `src/lib/seo.ts`.
- `/thank-you/`, `/privacy/`, and `/terms/` are always `noindex` and excluded from the sitemap. Privacy and terms are drafts and are not linked anywhere.
- Structured data covers only what is visible on the page. There is no review or rating markup and no LocalBusiness entity.
- Permanent redirects for common alternate paths are in `next.config.ts`.

## Design system

Tokens live in `src/app/globals.css` (`@theme`): colors, fluid type scale, spacing, radii, shadows, and motion.

- Ink `#171918`, paper `#F7F7F2`, surface `#EFF1EE`, line `#DDE2DC`, muted `#5D645F`.
- Accent `#F25A36` is for display text, dark backgrounds (5.3:1 on ink), and decoration only. Small text and filled buttons use `accent-strong` `#B93A1B` (5.7:1 with white).
- Form borders use `field` `#747C76` to meet 3:1 for UI components.
- Typography is Manrope only (via `next/font`). Hero text runs 40–68px, and body text is 17–18px.
- Motion is limited to hover and menu transitions. `prefers-reduced-motion` disables it.
