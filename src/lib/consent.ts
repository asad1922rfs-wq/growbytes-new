"use client";

/**
 * Cookie consent store (browser only). Categories:
 *   analytics → Google Analytics,  marketing → Meta Pixel.
 * Necessary cookies need no consent. Choices live in localStorage, with an
 * in-memory fallback when storage is blocked.
 */
export type Consent = { analytics: boolean; marketing: boolean };
type Stored = Consent & { v: 1; at: string };

const KEY = "gb-consent";
const CHANGE = "gb-consent-change";
const OPEN = "gb-consent-open";

let memo: Stored | null = null;
let cache: { raw: string | null; value: Stored | null } = { raw: null, value: null };

/** null = the visitor hasn't chosen yet. Returns a stable object for useSyncExternalStore. */
export function readConsent(): Stored | null {
  let raw: string | null = null;
  try {
    raw = localStorage.getItem(KEY);
  } catch {}
  if (raw === null) return memo;
  if (raw === cache.raw) return cache.value;
  let value: Stored | null = null;
  try {
    const p = JSON.parse(raw);
    if (p?.v === 1) value = { v: 1, at: String(p.at), analytics: !!p.analytics, marketing: !!p.marketing };
  } catch {}
  cache = { raw, value };
  return value;
}

export function saveConsent(c: Consent) {
  const prev = readConsent();
  const next: Stored = { v: 1, at: new Date().toISOString(), analytics: c.analytics, marketing: c.marketing };
  memo = next;
  try {
    localStorage.setItem(KEY, JSON.stringify(next));
  } catch {}
  window.dispatchEvent(new Event(CHANGE));
  // Scripts that already loaded can't be unloaded, so withdrawing consent reloads the page.
  if (prev && ((prev.analytics && !c.analytics) || (prev.marketing && !c.marketing))) window.location.reload();
}

export function subscribeConsent(onChange: () => void) {
  window.addEventListener(CHANGE, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(CHANGE, onChange);
    window.removeEventListener("storage", onChange);
  };
}

/** Opens the cookie settings panel (used by the footer link). */
export function openConsentSettings() {
  window.dispatchEvent(new Event(OPEN));
}

export function onOpenConsentSettings(fn: () => void) {
  window.addEventListener(OPEN, fn);
  return () => window.removeEventListener(OPEN, fn);
}
