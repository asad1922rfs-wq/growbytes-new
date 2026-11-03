"use client";

import Link from "next/link";
import { useEffect, useId, useState, useSyncExternalStore } from "react";
import { onOpenConsentSettings, openConsentSettings, readConsent, saveConsent, subscribeConsent } from "@/lib/consent";

/** Shown only when the site actually uses optional cookies (GA or Meta Pixel IDs set). */
const HAS_ANALYTICS = Boolean(process.env.NEXT_PUBLIC_GA_ID);
const HAS_MARKETING = Boolean(process.env.NEXT_PUBLIC_META_PIXEL_ID);
const ENABLED = HAS_ANALYTICS || HAS_MARKETING;

export function useConsent() {
  return useSyncExternalStore(subscribeConsent, readConsent, () => undefined);
}

function Toggle({ label, desc, checked, onChange, locked }: { label: string; desc: string; checked: boolean; onChange?: (v: boolean) => void; locked?: boolean }) {
  const id = useId();
  return (
    <div className="flex items-start justify-between gap-4 border-t border-white/10 py-4">
      <div>
        <label htmlFor={id} className="text-sm font-semibold text-white">
          {label}
        </label>
        <p className="mt-1 text-[0.8125rem] leading-relaxed text-muted-on-dark">{desc}</p>
      </div>
      {locked ? (
        <span className="shrink-0 pt-0.5 text-xs font-semibold text-muted-on-dark">Always on</span>
      ) : (
        <button
          id={id}
          type="button"
          role="switch"
          aria-checked={checked}
          onClick={() => onChange?.(!checked)}
          className={`relative h-6 w-11 shrink-0 rounded-full transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${checked ? "bg-accent-button" : "bg-white/20"}`}
        >
          <span className={`absolute top-0.5 left-0.5 size-5 rounded-full bg-white transition-transform ${checked ? "translate-x-5" : ""}`} />
        </button>
      )}
    </div>
  );
}

export function CookieConsent() {
  const consent = useConsent();
  const [settings, setSettings] = useState(false);
  const [draft, setDraft] = useState({ analytics: false, marketing: false });

  useEffect(
    () =>
      onOpenConsentSettings(() => {
        const c = readConsent();
        setDraft({ analytics: c?.analytics ?? false, marketing: c?.marketing ?? false });
        setSettings(true);
      }),
    [],
  );

  // undefined = server render / hydration; hide until we know.
  if (!ENABLED || consent === undefined || (consent !== null && !settings)) return null;

  const decide = (c: { analytics: boolean; marketing: boolean }) => {
    saveConsent(c);
    setSettings(false);
  };
  const btn = "rounded-full px-4 py-2.5 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-labelledby="cookie-title"
      className="fixed bottom-4 left-4 z-50 w-[calc(100%-2rem)] max-w-[26rem] rounded-2xl bg-ink p-6 text-white shadow-[0_24px_60px_-20px_rgb(0_0_0/0.55)] ring-1 ring-white/10 sm:bottom-6 sm:left-6"
    >
      <div className="flex items-start justify-between gap-4">
        <p id="cookie-title" className="text-base font-bold">
          {settings ? "Cookie settings" : "We value your privacy"}
        </p>
        {settings && consent !== null && (
          <button type="button" onClick={() => setSettings(false)} aria-label="Close cookie settings" className="-mt-1 -mr-1 grid size-8 place-items-center rounded-full text-muted-on-dark hover:bg-white/10 hover:text-white">
            <svg viewBox="0 0 24 24" className="size-4 fill-none stroke-current" strokeWidth="2.2" strokeLinecap="round"><path d="M6 6l12 12M18 6 6 18" /></svg>
          </button>
        )}
      </div>

      {settings ? (
        <div className="mt-3">
          <Toggle label="Necessary" desc="Keep the site and contact form working. These can't be turned off." checked locked />
          {HAS_ANALYTICS && (
            <Toggle
              label="Analytics"
              desc="Google Analytics shows us which pages are useful. IP addresses are anonymised."
              checked={draft.analytics}
              onChange={(v) => setDraft((d) => ({ ...d, analytics: v }))}
            />
          )}
          {HAS_MARKETING && (
            <Toggle
              label="Marketing"
              desc="Meta Pixel measures our Facebook and Instagram ads and shows them to past visitors."
              checked={draft.marketing}
              onChange={(v) => setDraft((d) => ({ ...d, marketing: v }))}
            />
          )}
          <div className="mt-4 flex flex-wrap gap-2 border-t border-white/10 pt-5">
            <button type="button" onClick={() => decide(draft)} className={`${btn} bg-accent-button text-white hover:bg-accent-strong`}>
              Save choices
            </button>
            <button type="button" onClick={() => decide({ analytics: true, marketing: true })} className={`${btn} bg-white/10 text-white hover:bg-white/20`}>
              Accept all
            </button>
          </div>
        </div>
      ) : (
        <>
          <p className="mt-2 text-sm leading-relaxed text-muted-on-dark">
            We use cookies to see how our site is used and to measure our ads. You can accept them, reject them, or choose.{" "}
            <Link href="/cookies/" className="text-white underline underline-offset-2">
              Cookie policy
            </Link>
          </p>
          <div className="mt-5 grid grid-cols-2 gap-2">
            <button type="button" onClick={() => decide({ analytics: false, marketing: false })} className={`${btn} bg-white/10 text-white hover:bg-white/20`}>
              Reject all
            </button>
            <button type="button" onClick={() => decide({ analytics: true, marketing: true })} className={`${btn} bg-accent-button text-white hover:bg-accent-strong`}>
              Accept all
            </button>
          </div>
          <button
            type="button"
            onClick={() => {
              setDraft({ analytics: false, marketing: false });
              setSettings(true);
            }}
            className="mt-3 w-full text-center text-sm font-semibold text-muted-on-dark underline-offset-2 hover:text-white hover:underline"
          >
            Customize
          </button>
        </>
      )}
    </div>
  );
}

/** Footer link that reopens the panel. */
export function CookieSettingsLink({ className }: { className?: string }) {
  if (!ENABLED) return null;
  return (
    <button type="button" onClick={openConsentSettings} className={className}>
      Cookie settings
    </button>
  );
}
