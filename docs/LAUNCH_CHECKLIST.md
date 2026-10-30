# Launch checklist

Nothing below has been fabricated in the site. Each item is either unset in `src/config/site.ts` or left out of the render. Resolve these before setting `NEXT_PUBLIC_ALLOW_INDEXING=true`.

## Blockers

- [ ] **Inquiry delivery.** Configure the webhook or Resend adapter (README → Inquiry form setup), then send a live test and confirm it arrives. Without this, production shows an error rather than a success message.
- [ ] **Privacy policy.** Replace the `/privacy/` draft with a policy reviewed by qualified counsel, covering the inquiry form, hosting, delivery provider, and target markets. Then remove `/privacy/` from `NON_INDEXABLE_PATHS`, link it from the footer and form, and add it to the route list.
- [ ] **Website terms.** Same process for `/terms/`.
- [ ] **Production domain.** Set `NEXT_PUBLIC_SITE_URL` and point DNS at the host.
- [ ] **Legal entity details.** Add the registered LLC name, state, and address to `siteConfig.legal` if they will be published. The footer copyright uses the entity name once it is set.

- [ ] **Image placeholders.** 15 slots show placeholders (see `docs/IMAGE_MANIFEST.md`). Supply real photos or screenshots, or remove each `<SiteImage>` before launch. Never use stock photos presented as the team.

## Business details (add only when verified)

- [ ] Public contact email (`siteConfig.contact.email`). It appears in the footer and on the contact page automatically.
- [ ] Phone number, if you want one published.
- [ ] Social profile URLs (`siteConfig.social`). Icons for LinkedIn, Instagram, Facebook, and X currently show as non-clickable placeholders (`href: null`). Add each live profile URL, or remove platforms you won't maintain.
- [ ] Final logo. The current wordmark and symbol are temporary.

## Proof (add only when real and permitted)

- [ ] Client projects with written permission, as new entries under `/work/`, clearly distinguished from concept work.
- [ ] Testimonials with written consent and attribution. No testimonial component ships today.
- [ ] Measurable results, with sources and dates.
- [ ] Team or founder bios and photos, if desired. None are published now.

## Operations

- [ ] Shared rate-limit store (e.g. Upstash Redis) if hosting is serverless or multi-instance.
- [ ] Analytics: choose a tool, confirm consent requirements for target markets, and update the privacy policy. Never send form contents or personal data in events.
- [ ] Search Console: verify the domain and submit `/sitemap.xml`.
- [ ] Error monitoring (optional).
- [ ] Run Lighthouse and PageSpeed Insights on the deployed site and record real measurements. None have been taken yet.

## Future opportunities (not built; build only with real content)

- WordPress development
- Shopify migrations (dedicated page)
- Technical SEO (dedicated page)
- Google Ads and Meta Ads (dedicated pages)
- CRM integrations
- Industry-specific solutions, each with genuinely distinct content

No city or country landing pages that only swap location names.
