# Image manifest

Every planned photograph or screenshot on the site. The source of truth is `src/content/images.ts`; this file documents the same entries for whoever produces the images.

**How replacement works:** save the file at the path listed below, inside `/public`, then rebuild. `<SiteImage>` checks for the file at build time and renders it with `next/image` in place of the placeholder. You don't need to change any code. Update the `alt` text in `images.ts` if the final photo differs from the description.

**Rules:**
- Use real Growbytes photographs and real project work only.
- No stock photos presented as the team.
- No client screens without permission.
- No performance figures inside images.

| Asset ID | Page / section | Subject | Ratio | Min size | Crop / focal point | Type | Replacement file | Required at launch |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `home-hero` | Home · Hero | Project workshop at a whiteboard, wireframes visible | 4:5 | 1200 × 1500 | Centre on hands and wireframes; no stock posing | Informative | `/public/images/home/hero-workshop.jpg` | No |
| `home-automation` | Home · AI automation | A natural editorial photograph of people reviewing a business workflow on a screen. Realistic workspace, restrained colors, thoughtful collaboration. No robots, glowing brains, or sci-fi effects. Not presented as the Growbytes team. | 16:9 | 1600 × 900 | People and screen centred; safe at a narrow crop | Informative | `/public/images/home/automation-workflow.jpg` | No |
| `home-process` | Home · How we work | Natural editorial photograph of a collaborative planning session, with sketches or a project plan on the table. Warm neutral colors and an uncluttered composition. Not presented as the Growbytes team. | 4:3 | 1600 × 1200 | Table and hands centred; uncluttered background | Informative | `/public/images/home/planning-workshop.jpg` | No |
| `home-team` | Home · Why Growbytes | Real team working session | 4:3 | 1600 × 1200 | Upper third; quiet space on the left | Informative | `/public/images/home/team-working.jpg` | No |
| `about-team` | About · Intro | Real team photograph | 16:9 | 2000 × 1125 | Group centred; must crop safely to 4:3 | Informative | `/public/images/about/team.jpg` | No |
| `service-web-design-development` | Service · Web design | Our website on laptop and phone | 16:10 | 1600 × 1000 | Devices centred; screens show our real work | Informative | `/public/images/services/web-design.jpg` | No |
| `service-shopify-development` | Service · Shopify | Product page and cart drawer on a phone | 16:10 | 1600 × 1000 | Product imagery legible; no client data | Informative | `/public/images/services/shopify.jpg` | No |
| `service-custom-software-development` | Service · Custom software | Internal dashboard with labelled sample data | 16:10 | 1600 × 1000 | Main table and status column | Informative | `/public/images/services/custom-software.jpg` | No |
| `service-seo` | Service · SEO | Sitemap planned with sticky notes | 16:10 | 1600 × 1000 | Readable groupings; no ranking screenshots | Informative | `/public/images/services/seo.jpg` | No |
| `service-paid-advertising` | Service · Paid advertising | Social ad beside its landing page | 16:10 | 1600 × 1000 | Both artboards visible; no metrics | Informative | `/public/images/services/paid-advertising.jpg` | No |
| `service-branding` | Service · Branding | Identity applied to stationery and packaging | 16:10 | 1600 × 1000 | Top-down flat lay; our own work | Informative | `/public/images/services/branding.jpg` | No |
| `service-ai-automation` | Service · AI automation | Person reviewing an automation's flagged items | 16:10 | 1600 × 1000 | Screen and hands; no real customer data | Informative | `/public/images/services/ai-automation.jpg` | No |
| `service-crm-integrations` | Service · CRM and integrations | CRM record with synced order and invoice | 16:10 | 1600 × 1000 | Record panel and sync status; sample data only | Informative | `/public/images/services/crm-integrations.jpg` | No |
| `service-conversion-optimization` | Service · Conversion optimisation | Two versions of a form side by side | 16:10 | 1600 × 1000 | Both legible; no invented uplift figures | Informative | `/public/images/services/conversion-optimization.jpg` | No |
| `service-mobile-app-development` | Service · Mobile apps | Two key app screens on a phone | 16:10 | 1600 × 1000 | Phone centred; our real work only | Informative | `/public/images/services/mobile-app.jpg` | No |
| `service-ui-ux-design` | Service · UI/UX design | Wireframes beside finished screens | 16:10 | 1600 × 1000 | Both stages visible; our own work | Informative | `/public/images/services/ui-ux-design.jpg` | No |
| `service-email-marketing` | Service · Email marketing | Welcome flow diagram and a designed email | 16:10 | 1600 × 1000 | Flow readable; no rate figures | Informative | `/public/images/services/email-marketing.jpg` | No |

## If an image is not ready at launch

All entries are optional, and their sections keep their reserved space. Before going live, choose one of these for each unreplaced slot:
1. Supply the real image.
2. Remove the `<SiteImage>` from that section. Each layout still works without it: text columns take the full width or stay beside the remaining content.

Placeholders show an "Image" tag and are not intended for production.
