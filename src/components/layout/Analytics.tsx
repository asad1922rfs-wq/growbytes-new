"use client";

import Script from "next/script";
import { useConsent } from "@/components/layout/CookieConsent";

/**
 * Google Analytics 4, loaded only after the visitor allows analytics cookies.
 * Renders nothing unless NEXT_PUBLIC_GA_ID is set (e.g. G-XXXXXXXXXX).
 */
export function Analytics() {
  const id = process.env.NEXT_PUBLIC_GA_ID;
  const allowed = useConsent()?.analytics === true;
  if (!id || !allowed) return null;
  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${id}`} strategy="afterInteractive" />
      <Script id="ga4" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag("js",new Date());gtag("config","${id}",{anonymize_ip:true});`}
      </Script>
    </>
  );
}
