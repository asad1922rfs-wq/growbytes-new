import type { Article } from "./types";

/** Authorship: articles are attributed to the team, without invented individual credentials. */
export const ARTICLE_AUTHOR = "Growbytes editorial team";

export const articles: Article[] = [
  {
    slug: "prepare-before-redesigning-your-business-website",
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
