"use client";

import { usePathname } from "next/navigation";
import { useEffect, useSyncExternalStore } from "react";

/**
 * Meta Pixel, loaded only after the visitor allows marketing cookies.
 * Renders nothing unless NEXT_PUBLIC_META_PIXEL_ID is set.
 * Tracks PageView on every route change; <MetaLead /> sends Lead on the thank-you page.
 */
const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;
const KEY = "gb-marketing-consent";

type Fbq = ((...args: unknown[]) => void) & { callMethod?: (...a: unknown[]) => void; queue: unknown[]; loaded: boolean; version: string; push: unknown };
declare global {
  interface Window {
    fbq?: Fbq;
    _fbq?: Fbq;
  }
}

// Fallback when storage is blocked, so the banner still closes for this visit.
let memo: "yes" | "no" | null = null;

function readConsent(): "yes" | "no" | null {
  if (memo) return memo;
  try {
    const v = localStorage.getItem(KEY);
    return v === "yes" || v === "no" ? v : null;
  } catch {
    return null;
  }
}

function subscribe(onChange: () => void) {
  window.addEventListener(KEY, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(KEY, onChange);
    window.removeEventListener("storage", onChange);
  };
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
  // "loading" during server render and hydration, so the banner never flashes or mismatches.
  const consent = useSyncExternalStore(subscribe, readConsent, () => "loading" as const);

  useEffect(() => {
    if (!PIXEL_ID || consent !== "yes") return;
    loadPixel(PIXEL_ID);
    window.fbq?.("track", "PageView");
  }, [consent, pathname]);

  if (!PIXEL_ID || consent !== null) return null;

  const choose = (v: "yes" | "no") => {
    memo = v;
    try {
      localStorage.setItem(KEY, v);
    } catch {}
    window.dispatchEvent(new Event(KEY));
  };

  return (
    <div
      role="dialog"
      aria-label="Cookie choice"
      className="fixed inset-x-4 bottom-4 z-50 mx-auto max-w-xl rounded-2xl border border-line bg-white p-5 shadow-[0_20px_50px_-20px_rgb(23_25_24/0.35)] sm:flex sm:items-center sm:gap-5"
    >
      <p className="text-sm text-muted">
        We use Meta cookies to measure our ads and show them to people who visited us. Is that okay?{" "}
        <a href="/cookies/" className="underline underline-offset-2">
          Cookie policy
        </a>
      </p>
      <div className="mt-4 flex shrink-0 gap-2 sm:mt-0">
        <button type="button" onClick={() => choose("no")} className="rounded-full border border-line px-4 py-2 text-sm font-semibold text-ink">
          No thanks
        </button>
        <button type="button" onClick={() => choose("yes")} className="rounded-full bg-accent-button px-4 py-2 text-sm font-semibold text-white">
          Allow
        </button>
      </div>
    </div>
  );
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
