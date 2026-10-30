/**
 * Central site configuration.
 *
 * Rule: unknown business facts stay `null`. Components must render nothing
 * (not a placeholder) when a value is null. Every null here is tracked in
 * docs/LAUNCH_CHECKLIST.md.
 */

const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const siteConfig = {
  name: "Growbytes",
  statement:
    "Growbytes builds websites, software, and marketing systems that help businesses move forward.",
  description:
    "Growbytes designs and builds websites, Shopify stores, custom software, SEO, paid advertising, branding, and AI automation for businesses that want their digital tools to work together.",

  /** Production origin without trailing slash, e.g. https://www.growbytes.com (set via env). */
  url: rawSiteUrl.replace(/\/$/, ""),

  /**
   * Indexing is opt-in. Only a production deployment with
   * NEXT_PUBLIC_ALLOW_INDEXING=true is indexable.
   */
  allowIndexing: process.env.NEXT_PUBLIC_ALLOW_INDEXING === "true",

  /** Markets we write for. These are NOT offices or registered locations. */
  focusMarkets: ["United States", "United Kingdom", "United Arab Emirates", "Saudi Arabia"],

  contact: {
    /** Public inquiry email; every form is delivered here. */
    email: "info@growbytes.co" as string | null,
    /** Public phone number. Not supplied yet. */
    phone: null as string | null,
  },

  /**
   * Only add profiles that are live and maintained. Each one shows as an icon in
   * the footer, e.g. { platform: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/company/..." }.
   */
  // href: null shows the icon without a link (placeholder until the profile is live).
  social: [
    { platform: "linkedin", label: "LinkedIn", href: null },
    { platform: "instagram", label: "Instagram", href: null },
    { platform: "facebook", label: "Facebook", href: null },
    { platform: "x", label: "X", href: null },
  ] as { platform: "linkedin" | "instagram" | "facebook" | "x" | "youtube" | "behance" | "dribbble"; label: string; href: string | null }[],

  legal: {
    /** Founder states a US LLC exists; exact registered name not supplied. */
    entityName: null as string | null,
    entityType: "US limited liability company (details pending verification)",
    registrationState: null as string | null,
    registeredAddress: null as string | null,
  },
} as const;

export type SiteConfig = typeof siteConfig;

export function absoluteUrl(path = "/") {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${siteConfig.url}${normalized}`;
}
