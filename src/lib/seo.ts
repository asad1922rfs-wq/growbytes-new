import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/config/site";

type PageMetaInput = {
  title: string;
  description: string;
  path: string;
  /** Force noindex regardless of environment (drafts, thank-you, etc.). */
  noindex?: boolean;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
};

/** Paths that must never be indexed or listed in the sitemap. */
export const NON_INDEXABLE_PATHS = ["/thank-you/"];

export function isIndexingAllowed() {
  return siteConfig.allowIndexing;
}

export function robotsFor(noindex = false): Metadata["robots"] {
  const index = isIndexingAllowed() && !noindex;
  return { index, follow: index, googleBot: { index, follow: index } };
}

export function pageMetadata({
  title,
  description,
  path,
  noindex,
  type = "website",
  publishedTime,
  modifiedTime,
}: PageMetaInput): Metadata {
  const url = absoluteUrl(path);
  return {
    title,
    description,
    alternates: { canonical: url },
    robots: robotsFor(noindex),
    openGraph: {
      type,
      url,
      title,
      description,
      siteName: siteConfig.name,
      locale: "en_US",
      ...(type === "article" ? { publishedTime, modifiedTime } : {}),
    },
    twitter: { card: "summary_large_image", title, description },
  };
}
