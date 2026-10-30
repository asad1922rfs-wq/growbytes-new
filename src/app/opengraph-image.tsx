import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";

export const alt = "Growbytes — websites, software, and marketing systems that help businesses move forward";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#171918", color: "#F7F7F2", padding: 80 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 6 }}>
            <div style={{ width: 30, height: 36, background: "#F7F7F2", borderRadius: 6 }} />
            <div style={{ width: 30, height: 66, background: "#F66135", borderRadius: 6 }} />
          </div>
          <div style={{ fontSize: 44, fontWeight: 800 }}>{siteConfig.name}</div>
        </div>
        <div style={{ fontSize: 68, fontWeight: 800, lineHeight: 1.05, letterSpacing: -2, maxWidth: 980 }}>
          Build better digital experiences. Create more room to grow.
        </div>
        <div style={{ fontSize: 26, color: "#A3ABA5" }}>Web · Shopify · Custom software · SEO · Paid ads · Branding · AI automation</div>
      </div>
    ),
    size,
  );
}
