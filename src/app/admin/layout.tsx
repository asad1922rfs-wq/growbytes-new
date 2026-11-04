import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: { default: "Growbytes HQ", template: "%s · Growbytes HQ" },
  robots: { index: false, follow: false, nocache: true },
};

export const viewport: Viewport = { themeColor: "#0B0C0C" };

/** Dark shell for the private dashboard. The public header and footer don't render here. */
export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return <div className="hq min-h-dvh overflow-x-clip bg-[#0B0C0C] text-[#ECEDEA] antialiased">{children}</div>;
}
