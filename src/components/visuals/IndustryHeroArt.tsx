import type { CSSProperties } from "react";
import { IndustryIcon } from "@/components/icons/IndustryIcon";
import type { Industry } from "@/content/industries";

const delay = (s: number) => ({ "--d": `${s}s` }) as CSSProperties;

// Per-industry details for the mock site: brand, call to action, a live event, and the image tint
const theme: Record<string, { brand: string; cta: string; event: string; detail: string; tint: string; cards: [string, string, string] }> = {
  "retail-ecommerce": { brand: "Hearth & Co.", cta: "Add to cart", event: "New order", detail: "2 items · Express delivery", tint: "#e8dfd1", cards: ["Bestsellers", "New in", "Sale"] },
  healthcare: { brand: "Riverside Clinic", cta: "Book appointment", event: "Appointment booked", detail: "Thu 10:30 · Dr. Patel", tint: "#dbe8e4", cards: ["Check-ups", "Physio", "Dental"] },
  "real-estate": { brand: "Keystone Homes", cta: "Book a viewing", event: "Viewing request", detail: "3-bed house · Sat 11:00", tint: "#e3e6ee", cards: ["For sale", "To rent", "Valuations"] },
  "professional-services": { brand: "Norland Advisory", cta: "Book a consultation", event: "New enquiry", detail: "Strategy review · via website", tint: "#e6e3dc", cards: ["Advisory", "Audit", "Training"] },
  hospitality: { brand: "The Harbour Hotel", cta: "Book your stay", event: "Direct booking", detail: "2 nights · Sea view room", tint: "#f0e1d2", cards: ["Rooms", "Dining", "Spa"] },
  education: { brand: "Brightpath Academy", cta: "Enrol now", event: "New enrolment", detail: "Spring intake · Design course", tint: "#e4e8f2", cards: ["Courses", "Dates", "Fees"] },
  manufacturing: { brand: "Forge Industrial", cta: "Request a quote", event: "Quote request", detail: "500 units · Part FX-220", tint: "#e2e4e3", cards: ["Products", "Specs", "Dealers"] },
  "media-publishing": { brand: "The Daily Ledger", cta: "Subscribe", event: "New subscriber", detail: "Yearly plan · Digital edition", tint: "#ece6dc", cards: ["Today", "Archive", "E-paper"] },
  automotive: { brand: "Apex Motors", cta: "Book a test drive", event: "Test drive booked", detail: "Hybrid SUV · Fri 14:00", tint: "#e1e4e8", cards: ["New cars", "Used", "Service"] },
  "financial-services": { brand: "Ledgerline Wealth", cta: "Book a call", event: "New client enquiry", detail: "Retirement planning", tint: "#e0e8e3", cards: ["Planning", "Pensions", "Tax"] },
  construction: { brand: "Stonebridge Builders", cta: "Get a quote", event: "Quote request", detail: "Kitchen extension · photos attached", tint: "#ebe3d6", cards: ["Extensions", "Roofing", "Renovations"] },
  nonprofit: { brand: "Open Hands", cta: "Donate now", event: "Monthly donation", detail: "New supporter · via campaign", tint: "#f0dfda", cards: ["Our impact", "Volunteer", "Events"] },
};

/**
 * Industry hero artwork: a mock website for a typical business in the sector,
 * with a live notification on a phone and a small "growing" results card.
 */
export function IndustryHeroArt({ industry, className }: { industry: Industry; className?: string }) {
  const t = theme[industry.slug] ?? theme["professional-services"];
  return (
    <div aria-hidden="true" className={`relative ${className ?? ""}`}>
      <div className="absolute -top-5 -right-5 hidden h-[60%] w-[42%] rounded-xl bg-accent sm:block" />

      {/* Mock website */}
      <div className="ai-float relative overflow-hidden rounded-2xl bg-white text-ink shadow-[0_30px_60px_-24px_rgb(0_0_0/0.6)] ring-1 ring-black/5" style={delay(0)}>
        <div className="flex items-center gap-1.5 border-b border-line px-4 py-2.5">
          <span className="size-2 rounded-full bg-[#e8735a]" />
          <span className="size-2 rounded-full bg-[#e9c46a]" />
          <span className="size-2 rounded-full bg-[#7fb38a]" />
          <span className="mx-auto rounded-md bg-paper px-5 py-0.5 text-[0.625rem] text-muted">{t.brand.toLowerCase().replace(/[^a-z]+/g, "")}.com</span>
        </div>
        <div className="p-4 sm:p-5">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-[0.75rem] font-extrabold">
              <span className="grid size-5 place-items-center rounded-md bg-ink text-white">
                <IndustryIcon path={industry.icon} className="size-3" />
              </span>
              {t.brand}
            </span>
            <span className="flex gap-2">
              {[0, 1, 2].map((i) => (
                <span key={i} className="h-1.5 w-6 rounded-full bg-ink/15" />
              ))}
            </span>
          </div>
          <div className="mt-4 grid grid-cols-[1.1fr_1fr] gap-3">
            <div className="py-1">
              <p className="text-[0.9375rem] leading-tight font-extrabold">{industry.h1.split(",")[0]}</p>
              <span className="mt-2 block h-1.5 w-[90%] rounded-full bg-ink/15" />
              <span className="mt-1.5 block h-1.5 w-[70%] rounded-full bg-ink/15" />
              <span className="ind-cta mt-3 inline-block rounded-md bg-accent-button px-2.5 py-1.5 text-[0.6875rem] font-bold text-white">{t.cta}</span>
            </div>
            <div className="grid place-items-center rounded-lg" style={{ background: t.tint }}>
              <IndustryIcon path={industry.icon} className="size-14 text-ink/35" />
            </div>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-2">
            {t.cards.map((c) => (
              <div key={c} className="rounded-lg bg-paper p-2">
                <span className="block h-7 rounded-md" style={{ background: t.tint }} />
                <p className="mt-1.5 text-[0.625rem] font-bold">{c}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Phone notification */}
      <div className="ai-float absolute -bottom-6 -left-4 w-[52%] rounded-2xl bg-white p-3 text-ink shadow-[0_24px_50px_-20px_rgb(0_0_0/0.6)] sm:-left-8" style={delay(1.2)}>
        <div className="flex items-center gap-2.5">
          <span className="relative grid size-9 shrink-0 place-items-center rounded-xl bg-accent text-white">
            <span className="pp-ring absolute inset-0 rounded-xl border-2 border-accent" />
            <IndustryIcon path={industry.icon} className="size-4" />
          </span>
          <span className="min-w-0">
            <span className="flex items-baseline justify-between gap-2">
              <span className="text-[0.75rem] font-bold">{t.event}</span>
              <span className="text-[0.5625rem] text-muted">now</span>
            </span>
            <span className="block truncate text-[0.6875rem] text-muted">{t.detail}</span>
          </span>
        </div>
      </div>

      {/* Growing results */}
      <div className="ai-float absolute -right-3 -bottom-8 w-[38%] rounded-2xl bg-ink p-3.5 text-white shadow-[0_24px_50px_-20px_rgb(0_0_0/0.6)] ring-1 ring-white/10 sm:-right-6" style={delay(2.4)}>
        <p className="flex items-baseline justify-between text-[0.625rem] font-bold tracking-[0.1em] text-white/60 uppercase">
          Enquiries <span className="text-[#4ade80] normal-case">↑ Growing</span>
        </p>
        <div className="mt-2.5 flex h-12 items-end gap-1">
          {[30, 42, 38, 55, 64, 78, 92].map((h, i) => (
            <span key={i} className={`pp-bar flex-1 origin-bottom rounded-t-sm ${i === 6 ? "bg-accent" : "bg-white/20"}`} style={{ height: `${h}%`, ...delay(i * 0.12) }} />
          ))}
        </div>
      </div>
    </div>
  );
}
