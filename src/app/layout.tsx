import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { Analytics } from "@/components/layout/Analytics";
import { CookieConsent } from "@/components/layout/CookieConsent";
import { MetaPixel } from "@/components/layout/MetaPixel";
import { BackToTop } from "@/components/layout/BackToTop";
import { Header } from "@/components/layout/Header";
import { SiteChrome } from "@/components/layout/SiteChrome";
import { siteConfig } from "@/config/site";
import { robotsFor } from "@/lib/seo";
import { JsonLd, organizationSchema, websiteSchema } from "@/lib/structured-data";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — Websites, software, and digital growth`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  robots: robotsFor(),
  openGraph: { siteName: siteConfig.name, type: "website", locale: "en_US" },
  // Google Search Console HTML-tag verification (only needed for URL-prefix properties)
  ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? { verification: { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION } }
    : {}),
};

export const viewport: Viewport = {
  themeColor: "#F7F7F2",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={manrope.variable}>
      <body className="min-h-dvh">
        <SiteChrome
          header={<Header />}
          footer={<Footer />}
          extras={
            <>
              <BackToTop />
              <JsonLd data={[organizationSchema(), websiteSchema()]} />
              <Analytics />
              <MetaPixel />
              <CookieConsent />
            </>
          }
        >
          {children}
        </SiteChrome>
      </body>
    </html>
  );
}
