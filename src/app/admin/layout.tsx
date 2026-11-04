import type { Metadata, Viewport } from "next";
import { Urbanist } from "next/font/google";
import "./hq.css";

// One clean geometric family for the whole room: large, light and white.
const hq = Urbanist({ subsets: ["latin"], variable: "--font-hq", display: "swap" });

export const metadata: Metadata = {
  title: { default: "Growbytes HQ", template: "%s | Growbytes HQ" },
  robots: { index: false, follow: false, nocache: true },
};

export const viewport: Viewport = { themeColor: "#080908" };

/** Shell for the private dashboard. The public header and footer don't render here. */
export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return <div className={`hq ${hq.variable} min-h-dvh overflow-x-clip`}>{children}</div>;
}
