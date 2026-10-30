import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/config/site";
import { isIndexingAllowed } from "@/lib/seo";

/** Non-production and unconfigured deployments block all crawling. */
export default function robots(): MetadataRoute.Robots {
  if (!isIndexingAllowed()) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }
  return {
    // Draft/utility pages stay crawlable so their noindex tag is seen.
    rules: { userAgent: "*", allow: "/" },
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
