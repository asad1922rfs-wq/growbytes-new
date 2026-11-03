"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useConsent } from "@/components/layout/CookieConsent";

/**
 * Meta Pixel, loaded only after the visitor allows marketing cookies.
 * Renders nothing unless NEXT_PUBLIC_META_PIXEL_ID is set.
 * Tracks PageView on every route change; <MetaLead /> sends Lead on the thank-you page.
 */
const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;

type Fbq = ((...args: unknown[]) => void) & { callMethod?: (...a: unknown[]) => void; queue: unknown[]; loaded: boolean; version: string; push: unknown };
declare global {
  interface Window {
    fbq?: Fbq;
    _fbq?: Fbq;
  }
}

function loadPixel(id: string) {
  if (window.fbq) return;
  const f = function (...args: unknown[]) {
    if (f.callMethod) f.callMethod(...args);
    else f.queue.push(args);
  } as Fbq;
  f.push = f;
  f.loaded = true;
  f.version = "2.0";
  f.queue = [];
  window.fbq = window._fbq = f;
  const s = document.createElement("script");
  s.async = true;
  s.src = "https://connect.facebook.net/en_US/fbevents.js";
  document.head.appendChild(s);
  window.fbq("init", id);
}

/** Send a standard Meta event if the pixel is running (no-op otherwise). */
export function trackMeta(event: string, params?: Record<string, unknown>) {
  window.fbq?.("track", event, params);
}

export function MetaPixel() {
  const pathname = usePathname();
  const marketing = useConsent()?.marketing === true;

  useEffect(() => {
    if (!PIXEL_ID || !marketing) return;
    loadPixel(PIXEL_ID);
    window.fbq?.("track", "PageView");
  }, [marketing, pathname]);

  return null;
}

/** Fires a Lead event once, on the thank-you page. */
export function MetaLead() {
  useEffect(() => {
    // The pixel may still be loading; fbq queues calls until it is ready.
    const t = setTimeout(() => trackMeta("Lead"), 300);
    return () => clearTimeout(t);
  }, []);
  return null;
}
