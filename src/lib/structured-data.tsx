import { absoluteUrl, siteConfig } from "@/config/site";
import { ARTICLE_AUTHOR } from "@/content/insights";
import type { Article, Service } from "@/content/types";

type Json = Record<string, unknown>;

export function JsonLd({ data }: { data: Json | Json[] }) {
  return (
    <script
      type="application/ld+json"
      // Escape "<" so content can never close the script tag.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

/** Organization: only includes fields that are verified in siteConfig. */
export function faqSchema(faqs: { q: string; a: string }[]): Json {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
}

export function organizationSchema(): Json {
  const org: Json = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": absoluteUrl("/#organization"),
    name: siteConfig.name,
    url: absoluteUrl("/"),
    logo: absoluteUrl("/icon.svg"),
    description: siteConfig.statement,
  };
  if (siteConfig.legal.entityName) org.legalName = siteConfig.legal.entityName;
  if (siteConfig.contact.email) org.email = siteConfig.contact.email;
  const profiles = siteConfig.social.flatMap((s) => (s.href ? [s.href] : []));
  if (profiles.length) org.sameAs = profiles;
  return org;
}

export function websiteSchema(): Json {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": absoluteUrl("/#website"),
    name: siteConfig.name,
    url: absoluteUrl("/"),
    publisher: { "@id": absoluteUrl("/#organization") },
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]): Json {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function serviceSchema(service: Service): Json {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    serviceType: service.name,
    description: service.metaDescription,
    url: absoluteUrl(`/services/${service.slug}/`),
    provider: { "@id": absoluteUrl("/#organization") },
    areaServed: "Worldwide",
  };
}

export function articleSchema(article: Article): Json {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    datePublished: article.published,
    dateModified: article.updated ?? article.published,
    mainEntityOfPage: absoluteUrl(`/insights/${article.slug}/`),
    author: { "@type": "Organization", name: ARTICLE_AUTHOR, url: absoluteUrl("/about/") },
    publisher: { "@id": absoluteUrl("/#organization") },
  };
}
