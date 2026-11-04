import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Geist } from "next/font/google";
import "./hq.css";

const display = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-hq-display", display: "swap" });
const ui = Geist({ subsets: ["latin"], variable: "--font-hq-ui", display: "swap" });

export const metadata: Metadata = {
  title: { default: "Growbytes HQ", template: "%s | Growbytes HQ" },
  robots: { index: false, follow: false, nocache: true },
};

export const viewport: Viewport = { themeColor: "#080908" };

/** Shell for the private dashboard. The public header and footer don't render here. */
export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return <div className={`hq ${display.variable} ${ui.variable} min-h-dvh overflow-x-clip`}>{children}</div>;
}
