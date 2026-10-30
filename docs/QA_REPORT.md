# QA report

Date: 2026-10-28 · Next.js 16.4.3 · Node 24 · Windows 11 · Chromium (via Playwright)

## Automated checks (all run, all passing)

| Check | Result |
| --- | --- |
| `npm run lint` | 0 problems |
| `npm run typecheck` | 0 errors |
| `npm test` | 27/27 passed. Covers validation errors, retained values, honeypot, fill-time check, rate limiting, demo mode, production without an adapter, adapter failure, success only on adapter acceptance, no personal data in logs, adapter selection, indexing rules, canonicals, sitemap contents, content integrity (unique titles, valid cross-references, MDX links resolve, banned phrases). |
| `npm run build` | Succeeded. All 19 public pages and draft/utility pages prerendered (31 build entries). |
| `npm run test:smoke` (production build) | All passed. 19 routes return 200, each has exactly one `<h1>`, a unique `<title>`, a correct canonical, and the project CTA. Concept label present on every project page. `/thank-you/` doesn't show success without a delivered inquiry. `/privacy/` and `/terms/` are noindex. Unknown routes return 404. `/blog` permanently redirects to `/insights/`. The sitemap has exactly the 19 public URLs. `robots.txt` disallows everything when indexing is off. |

## Manual browser checks

- **Inquiry flow (production build, local test webhook):**
  - A failing destination (HTTP 500) shows an error and keeps every field.
  - A successful destination (HTTP 200) redirects to `/thank-you/` with no personal data in the URL. The webhook received the payload with the bearer token.
  - In development without an adapter, the form shows "Not sent — demo mode".
  - An empty submit shows an error summary that receives focus, with `aria-invalid` and `aria-describedby` linking each field to its error.
  - `?service=` preselects the service.
- **Desktop mega menu:**
  - Opens from its disclosure button.
  - Escape closes it and returns focus to the button.
  - Closes when focus or a click moves outside, and on navigation.
  - The "Services" link still works without JavaScript.
- **Mobile menu (390px):** opens full-height, moves focus inside, traps Tab, locks page scroll, and closes with Escape, returning focus to the toggle.
- **Horizontal overflow:** none at 360, 390, 768, 1024, or 1440px across all page templates.
- **Contrast:** token pairs were computed against WCAG formulas (see README → Design system).

## Issues found and fixed during QA

1. The header CTA rendered at 360–390px because `inline-flex` overrode `hidden`, causing 35px of horizontal overflow. Visibility moved to a wrapper.
2. The mobile menu panel was invisible: `backdrop-filter` on the sticky header made it the containing block for the fixed panel. The header now has a solid background.
3. The spam fill-time check ran before validation, so a quick empty submit showed a generic error. Validation now runs first.
4. `/blog` redirect sources didn't account for `trailingSlash`. Fixed.
5. Dynamic routes raised a Cache Components instant-navigation error. Fixed with `ensureStatic = 'navigation'` (all slugs are prerendered, and unknown slugs return 404).
6. The About page title repeated the brand. Fixed.
7. The hero composition was crowded on phones. It now uses a taller aspect ratio below 640px.

## Not done / not measured

- **No Lighthouse, PageSpeed, or Core Web Vitals measurements were taken.** Performance goals are design intent: no images in the hero, one font family through `next/font`, small client components (menus and form only), and static prerendering. Measure on the deployed site.
- No screen reader testing (NVDA or VoiceOver). Semantics were checked through DOM and ARIA inspection only.
- No cross-browser testing beyond Chromium (Safari and Firefox untested).
- No automated axe scan was run.
- The reference sites (bairesdev.com, webfx.com) were **not browsed**. The direction was taken from the supplied screenshots only.
- During browser testing, the Playwright window occasionally navigated between pages without any recorded script input, possibly manual interaction with the visible window. This isn't reproducible from site code (no click or pushState events were captured), but it is noted for transparency.

## Refinement pass (audit after first build)

Inspected in Chromium at 1440px: homepage, `/services/` with mega menu, `/services/shopify-development/`, `/services/seo/`, `/work/hearthline-homeware/`, an insights article, and `/contact/`. At 390px: homepage and mobile menu. At 360px, 768px, and 1024px: overflow scan across all templates.

Issues found and fixed:
1. Concept storefront mockup used flat color blocks. It now has drawn products, prices, swatches, and filter state.
2. Project pages were a single mockup followed by text. They now include a "Key screens" section with two captioned supporting views per project.
3. CTA text lowercased acronyms ("Discuss your seo project", "ai automation"). A `serviceNoun()` helper now keeps SEO and AI.
4. The homepage engagement options were a third identical 3-card grid. They are now editorial comparison rows.
5. The article hero illustration was letterboxed across the full width. It is now constrained to the reading column.

After this pass: lint, typecheck, 27/27 unit tests, production build, and route smoke checks all passed.
