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
    // Common alternate paths visitors (or old links) may use.
    return [
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
