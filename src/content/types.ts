export type ServiceGroup = "design" | "software" | "marketing";

export type VisualKey =
  | "web"
  | "shopify"
  | "software"
  | "seo"
  | "ads"
  | "branding"
  | "automation"
  | "cro"
  | "email"
  | "crm"
  | "mobile"
  | "ux";

export type ServiceSlug =
  | "web-design-development"
  | "shopify-development"
  | "custom-software-development"
  | "seo"
  | "paid-advertising"
  | "branding"
  | "ai-automation"
  | "crm-integrations"
  | "conversion-optimization"
  | "mobile-app-development"
  | "ui-ux-design"
  | "email-marketing";

export type Faq = { q: string; a: string };
export type Point = { title: string; body: string };

export type Service = {
  slug: ServiceSlug;
  name: string;
  /** Short label for menus and chips. */
  shortName: string;
  group: ServiceGroup;
  /** One line for menus and lists. */
  summary: string;
  /** Very short line for the header mega menu. */
  menuBlurb: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  intro: string;
  audience: string[];
  problemsHeading: string;
  problems: Point[];
  deliverables: Point[];
  visual: VisualKey;
  /** Text equivalent of the illustration (rendered visibly next to it). */
  visualCaption: string;
  process: Point[];
  scopeFactors: string[];
  technologies?: { label: string; items: string[] }[];
  faqs: Faq[];
  related: ServiceSlug[];
  articles: string[];
  workSlug?: string;
  /** What the client provides. */
  clientInputs: string[];
  /** What happens after launch or handover. */
  afterLaunch: string;
  cta: { heading: string; body: string };
};

export type Project = {
  slug: string;
  title: string;
  /** Shorter <title> for search results. */
  seoTitle?: string;
  client: string;
  sector: string;
  services: ServiceSlug[];
  summary: string;
  metaDescription: string;
  visual: "homeware" | "property" | "logistics";
  features: string[];
  /** Supporting views shown on the project page, each with a visible caption. */
  screens: { visual: VisualKey; title: string; caption: string }[];
  tone: "light" | "dark" | "warm";
};

export type Article = {
  slug: string;
  title: string;
  /** Shorter <title> for search results; the full title stays as the H1. */
  seoTitle?: string;
  description: string;
  category: string;
  published: string;
  updated?: string;
  readingMinutes: number;
  services: ServiceSlug[];
  illustration:
    | "redesign" | "storefront" | "workflow" | "brief" | "marketing"
    | "buildbuy" | "versus" | "softwarecost" | "sitecost" | "storecost" | "migration" | "agency";
};
