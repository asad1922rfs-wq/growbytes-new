import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  trailingSlash: true,
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  poweredByHeader: false,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  async redirects() {
    // Posts from the previous growbytes.co site. Temporary until the three posts with
    // partner links are rebuilt; then point those slugs at their new pages.
    const oldPosts = [
      "complete-llc-formation-checklist",
      "how-to-choose-a-business-structure",
      "how-to-start-an-llc",
      "llc-operating-agreement-guide",
      "llc-tax-strategies-save-thousands",
      "llc-vs-corporation-vs-sole-proprietorship",
      "registered-agent-compliance-deadlines",
      "registered-agent-protects-business-24-7",
      "registered-agent-vs-diy-privacy-compliance",
      "small-business-compliance-calendar",
      "what-is-a-registered-agent",
    ];
    // Common alternate paths visitors (or old links) may use.
    return [
      ...oldPosts.map((slug) => ({ source: `/blog/${slug}/`, destination: "/insights/", permanent: false })),
      { source: "/ai-workflow-automation/", destination: "/services/ai-automation/", permanent: true },
      { source: "/blog/", destination: "/insights/", permanent: true },
      { source: "/blog/:slug/", destination: "/insights/:slug/", permanent: true },
      { source: "/portfolio/", destination: "/work/", permanent: true },
      { source: "/case-studies/", destination: "/work/", permanent: true },
      { source: "/services/web-design/", destination: "/services/web-design-development/", permanent: true },
      { source: "/services/shopify/", destination: "/services/shopify-development/", permanent: true },
      { source: "/services/custom-software/", destination: "/services/custom-software-development/", permanent: true },
      { source: "/services/ppc/", destination: "/services/paid-advertising/", permanent: true },
      { source: "/start-a-project/", destination: "/contact/", permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
};

// Plugins are referenced by name so they work with Turbopack.
const withMDX = createMDX({
  options: { remarkPlugins: ["remark-gfm"], rehypePlugins: ["rehype-slug"] },
});

export default withMDX(nextConfig);
