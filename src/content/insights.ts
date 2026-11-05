import type { Article } from "./types";

/** Authorship: articles are attributed to the team, without invented individual credentials. */
export const ARTICLE_AUTHOR = "Growbytes editorial team";

export const articles: Article[] = [
  {
    slug: "custom-software-vs-off-the-shelf",
    seoTitle: "Custom Software vs Off-the-Shelf: How to Choose",
    title: "Custom software vs off-the-shelf tools: how to choose",
    description:
      "Custom software vs off-the-shelf tools: when each one makes sense, how the real costs compare, and a five-question test to help you decide.",
    category: "Software",
    published: "2026-11-05",
    readingMinutes: 6,
    services: ["custom-software-development", "ai-automation", "crm-integrations"],
    illustration: "buildbuy",
  },
  {
    slug: "shopify-vs-woocommerce",
    seoTitle: "Shopify vs WooCommerce: Which Should You Pick?",
    title: "Shopify vs WooCommerce: which is right for your store?",
    description:
      "Shopify vs WooCommerce compared on cost, ease of use, flexibility, upkeep and SEO, with a simple table to help you pick the right platform for your store.",
    category: "Ecommerce",
    published: "2026-11-05",
    readingMinutes: 7,
    services: ["shopify-development", "web-design-development", "seo"],
    illustration: "versus",
  },
  {
    slug: "custom-software-development-cost",
    seoTitle: "Custom Software Development Cost Explained",
    title: "How much does custom software development cost?",
    description:
      "What drives custom software development cost, how pricing models work, what you pay after launch, and how to start small and keep the budget under control.",
    category: "Software",
    published: "2026-11-05",
    readingMinutes: 7,
    services: ["custom-software-development", "ai-automation", "crm-integrations"],
    illustration: "softwarecost",
  },
  {
    slug: "small-business-website-cost",
    seoTitle: "Small Business Website Cost: What You Pay For",
    title: "How much does a small business website cost?",
    description:
      "Small business website cost explained: DIY, freelancer or agency, what changes the price, running costs after launch, and the questions to ask before you hire.",
    category: "Web design",
    published: "2026-11-05",
    readingMinutes: 7,
    services: ["web-design-development", "seo", "conversion-optimization"],
    illustration: "sitecost",
  },
  {
    slug: "shopify-store-cost",
    seoTitle: "Shopify Store Cost in 2026: Full Breakdown",
    title: "How much does a Shopify store cost?",
    description:
      "Shopify store cost explained: monthly plans, payment fees, themes, apps, and setup. A clear breakdown and checklist to plan your budget before you start.",
    category: "Ecommerce",
    published: "2026-11-05",
    readingMinutes: 7,
    services: ["shopify-development", "web-design-development", "conversion-optimization"],
    illustration: "storecost",
  },
  {
    slug: "migrate-to-shopify-without-losing-seo",
    seoTitle: "Migrate to Shopify Without Losing SEO",
    title: "How to migrate to Shopify without losing SEO",
    description:
      "A step-by-step Shopify migration plan: inventory your URLs, map 301 redirects, move content, check the basics, and protect your rankings after launch.",
    category: "Ecommerce",
    published: "2026-11-03",
    readingMinutes: 9,
    services: ["shopify-development", "seo", "web-design-development"],
    illustration: "migration",
  },
  {
    slug: "how-to-choose-a-shopify-development-agency",
    seoTitle: "How to Choose a Shopify Development Agency",
    title: "How to choose a Shopify development agency",
    description:
      "What a Shopify agency does, what to look for, 10 questions to ask before you sign, what affects the cost, and the warning signs to avoid.",
    category: "Ecommerce",
    published: "2026-11-02",
    readingMinutes: 8,
    services: ["shopify-development", "conversion-optimization", "seo"],
    illustration: "agency",
  },
  {
    slug: "prepare-before-redesigning-your-business-website",
    seoTitle: "Website Redesign Checklist: What to Prepare",
    title: "What to prepare before redesigning your business website",
    description:
      "A practical checklist for goals, content, analytics, URLs, and decisions to make before a website redesign, so the project starts with fewer surprises.",
    category: "Websites",
    published: "2026-10-28",
    readingMinutes: 9,
    services: ["web-design-development", "seo", "branding"],
    illustration: "redesign",
  },
  {
    slug: "shopify-theme-customization-or-custom-storefront",
    seoTitle: "Shopify Theme or Custom Storefront?",
    title: "Shopify theme customization or a custom storefront: how to decide",
    description:
      "When a customized Online Store 2.0 theme is enough, when a headless Shopify storefront is justified, and the costs each choice carries after launch.",
    category: "Ecommerce",
    published: "2026-10-28",
    readingMinutes: 10,
    services: ["shopify-development", "web-design-development"],
    illustration: "storefront",
  },
  {
    slug: "how-to-identify-a-business-workflow-worth-automating",
    seoTitle: "Which Business Workflows Should You Automate?",
    title: "How to identify a business workflow worth automating",
    description:
      "A simple scoring method for choosing which processes to automate first, where AI helps, where rules are enough, and when to leave work manual.",
    category: "Automation",
    published: "2026-10-28",
    readingMinutes: 10,
    services: ["ai-automation", "custom-software-development"],
    illustration: "workflow",
  },
  {
    slug: "how-to-write-a-project-brief-for-an-agency",
    seoTitle: "How to Write a Project Brief for an Agency",
    title: "How to write a project brief an agency can quote accurately",
    description:
      "What to include in a website, software, or marketing brief, what you can leave out, and how to compare the proposals you receive.",
    category: "Planning",
    published: "2026-10-30",
    readingMinutes: 7,
    services: ["web-design-development", "custom-software-development"],
    illustration: "brief",
  },
  {
    slug: "seo-or-paid-ads-where-to-start",
    seoTitle: "SEO or Paid Ads: Where to Start",
    title: "SEO or paid ads: where to start with a limited budget",
    description:
      "How search engine optimization and paid advertising differ, when each tends to fit, and the foundations to fix before spending on either.",
    category: "Marketing",
    published: "2026-10-30",
    readingMinutes: 7,
    services: ["seo", "paid-advertising"],
    illustration: "marketing",
  },
];

export function getArticle(slug: string) {
  return articles.find((a) => a.slug === slug);
}

export function formatDate(iso: string) {
  // Fixed locale and UTC to keep output identical between server and client.
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${iso}T00:00:00Z`));
}
