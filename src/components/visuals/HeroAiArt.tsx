import type { CSSProperties } from "react";
import { siGmail, siGooglecalendar, siMeta, siGooglesheets, siHubspot, siShopify, siSlack, siStripe, siWhatsapp, siZapier } from "simple-icons";

const connected = [siGmail, siHubspot, siSlack, siWhatsapp, siGooglecalendar, siShopify, siStripe, siGooglesheets, siZapier];

const box = "absolute rounded-xl bg-white ring-1 ring-line shadow-[0_18px_40px_-22px_rgb(23_25_24/0.3)]";
const delay = (s: number) => ({ "--d": `${s}s` }) as CSSProperties;

const steps = [
  { label: "Capture the lead", done: "From Meta ads and email" },
  { label: "Update the CRM", done: "New deal created in HubSpot" },
  { label: "Notify the team", done: "Posted to #sales in Slack" },
  { label: "Draft a reply", done: "Waiting for your approval" },
];

const check = (
  <svg viewBox="0 0 12 12" className="size-3 fill-none stroke-current" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m2.5 6.2 2.2 2.2 4.8-5" />
  </svg>
);

/**
 * Hero artwork for the AI slide: leads arrive from Meta and email, an assistant works through
 * it step by step across connected tools, and a person approves the reply.
 */
export function HeroAiArt() {
  return (
    <div
      role="img"
      aria-label="Leads arrive from Meta ads and email; an AI assistant captures them, updates the CRM, notifies the team, and drafts a reply that a person approves."
      className="relative aspect-[4/5]"
    >
      <div aria-hidden="true">
        {/* Assistant run */}
        <div className={`${box} ai-float top-[11%] right-[4%] left-[2%] px-4 pt-10 pb-4 sm:px-5`} style={delay(0)}>
          <div className="flex items-center gap-2.5">
            <span className="grid size-8 place-items-center rounded-lg bg-ink text-white">
              <svg viewBox="0 0 20 20" className="size-4 fill-current">
                <path d="M10 2.5 11.6 7.4 16.5 9 11.6 10.6 10 15.5 8.4 10.6 3.5 9 8.4 7.4Z" />
              </svg>
            </span>
            <p className="flex-1 text-[0.8125rem] font-bold">AI assistant</p>
            <span className="flex items-center gap-1.5 rounded-full bg-[#e3f4e8] px-2 py-1 text-[0.625rem] font-bold text-[#1f8a4c]">
              <span className="pp-dot size-1.5 rounded-full bg-[#1f8a4c]" /> Working
            </span>
          </div>
          <ol className="relative mt-3.5 space-y-2">
            {/* Progress rail behind the step markers */}
            <span className="absolute top-3 bottom-3 left-[1.3rem] w-px bg-line" />
            {steps.map((s, i) => (
              <li key={s.label} className="ai-step relative flex items-center gap-3 rounded-lg bg-paper px-2.5 py-2" style={delay(i * 1.1)}>
                <span className="relative grid size-6 shrink-0 place-items-center rounded-full bg-white ring-1 ring-line">
                  <span className="ai-spin absolute inset-0 rounded-full border-2 border-transparent border-t-accent" />
                  <span className="ai-check absolute inset-0 grid place-items-center rounded-full bg-[#1f8a4c] text-white">{check}</span>
                </span>
                <span className="min-w-0">
                  <span className="block text-[0.8125rem] font-semibold">{s.label}</span>
                  <span className="block truncate text-[0.6875rem] text-muted">{s.done}</span>
                </span>
              </li>
            ))}
          </ol>
        </div>

        {/* Incoming leads, alternating: a Meta ad lead, then an email */}
        <div className="ai-float absolute top-[4%] left-[-6%] z-10 grid w-[58%]" style={delay(0.8)}>
            <div className="alt-msg  rounded-xl bg-white p-3.5 shadow-[0_18px_40px_-22px_rgb(23_25_24/0.3)] ring-1 ring-line [grid-area:1/1]" style={delay(0)}>
              <div className="flex items-center gap-2.5">
                <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-paper ring-1 ring-line">
                  <svg viewBox="0 0 24 24" className="size-4" style={{ fill: `#${siMeta.hex}` }}>
                    <path d={siMeta.path} />
                  </svg>
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex items-baseline justify-between gap-2">
                    <span className="text-[0.75rem] font-bold">New Meta lead</span>
                    <span className="text-[0.625rem] font-semibold text-muted">09:40</span>
                  </span>
                  <span className="block truncate text-[0.6875rem] text-muted">Instagram ad · wants a quote</span>
                </span>
              </div>
            </div>
            <div className="alt-msg  rounded-xl bg-white p-3.5 shadow-[0_18px_40px_-22px_rgb(23_25_24/0.3)] ring-1 ring-line [grid-area:1/1]" style={delay(3)}>
              <div className="flex items-center gap-2.5">
                <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-paper ring-1 ring-line">
                  <svg viewBox="0 0 24 24" className="size-4" style={{ fill: `#${siGmail.hex}` }}>
                    <path d={siGmail.path} />
                  </svg>
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex items-baseline justify-between gap-2">
                    <span className="text-[0.75rem] font-bold">New email</span>
                    <span className="text-[0.625rem] font-semibold text-muted">09:41</span>
                  </span>
                  <span className="block truncate text-[0.6875rem] text-muted">Quote for a new booking site</span>
                </span>
              </div>
            </div>
        </div>

        {/* Connected tools, overlapping the top-right corner */}
        <div className={`${box} ai-float top-[2%] -right-3 z-10 p-3 sm:-right-5`} style={delay(1.6)}>
          <p className="text-[0.625rem] font-bold tracking-[0.1em] text-muted uppercase">Connected</p>
          <div className="mt-2 grid grid-cols-3 gap-1.5">
            {connected.map((icon, i) => (
              <span key={icon.slug} title={icon.title} className="ai-tool grid size-8 place-items-center rounded-lg bg-paper ring-1 ring-line" style={delay(i * 0.25)}>
                <svg viewBox="0 0 24 24" className="size-4" style={{ fill: `#${icon.hex}` }}>
                  <path d={icon.path} />
                </svg>
              </span>
            ))}
          </div>
        </div>

        {/* Revenue climbing as leads get answered faster */}
        <div className={`${box} ai-float bottom-[20%] left-[-5%] z-10 w-[42%] p-3.5`} style={delay(2.4)}>
          <p className="flex items-baseline justify-between">
            <span className="text-[0.625rem] font-bold tracking-[0.1em] text-muted uppercase">Revenue</span>
            <span className="text-[0.625rem] font-bold text-[#1f8a4c]">↑ Growing</span>
          </p>
          <svg viewBox="0 0 120 48" className="mt-2 w-full overflow-visible">
            <defs>
              <linearGradient id="rev-fill" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0" stopColor="#f26b3a" stopOpacity="0.28" />
                <stop offset="1" stopColor="#f26b3a" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path className="rev-area" d="M2 40 L22 37 L42 38 L62 29 L82 24 L102 13 L118 5 L118 48 L2 48Z" fill="url(#rev-fill)" />
            <path className="rev-line" d="M2 40 L22 37 L42 38 L62 29 L82 24 L102 13 L118 5" fill="none" stroke="#f26b3a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" pathLength={1} />
            <circle className="rev-dot" cx="118" cy="5" r="3.5" fill="#f26b3a" />
          </svg>
          <p className="mt-1.5 text-[0.625rem] text-muted">More leads answered, more deals won</p>
        </div>

        {/* Website chatbot, overlapping the assistant's bottom-right */}
        <div
          className="ai-float absolute right-[-3%] bottom-[6%] z-10 w-[56%] overflow-hidden rounded-xl bg-ink text-white shadow-[0_18px_40px_-20px_rgb(23_25_24/0.5)]"
          style={delay(3.2)}
        >
          <div className="flex items-center gap-2 border-b border-white/10 px-3.5 py-2.5">
            <span className="grid size-6 place-items-center rounded-full bg-accent">
              <svg viewBox="0 0 20 20" className="size-3 fill-current">
                <path d="M10 2.5 11.6 7.4 16.5 9 11.6 10.6 10 15.5 8.4 10.6 3.5 9 8.4 7.4Z" />
              </svg>
            </span>
            <span className="flex-1 text-[0.75rem] font-bold">AI chat</span>
            <span className="flex items-center gap-1 text-[0.625rem] font-semibold text-white/60">
              <span className="size-1.5 rounded-full bg-[#4ade80]" /> Online
            </span>
          </div>
          <div className="flex flex-col gap-1.5 px-3.5 py-3 text-[0.6875rem] leading-snug">
            <p className="bot-msg self-end rounded-2xl rounded-br-sm bg-accent-button px-2.5 py-1.5" style={delay(0)}>
              Do you have time this week?
            </p>
            <span className="bot-typing flex w-fit gap-1 self-start rounded-2xl rounded-bl-sm bg-white/10 px-2.5 py-2" style={delay(0.9)}>
              {[0, 1, 2].map((d) => (
                <span key={d} className="bot-dot size-1 rounded-full bg-white/70" style={delay(d * 0.15)} />
              ))}
            </span>
            <p className="bot-msg self-start rounded-2xl rounded-bl-sm bg-white/10 px-2.5 py-1.5 text-white/90" style={delay(1.9)}>
              Yes! Thursday 10:00 or Friday 14:00?
            </p>
          </div>
          <div className="mx-3.5 mb-3 flex items-center gap-2 rounded-lg bg-white/5 px-2.5 py-1.5 ring-1 ring-white/10">
            <span className="flex-1 text-[0.625rem] text-white/40">Type a message…</span>
            <svg viewBox="0 0 16 16" className="size-3.5 fill-accent">
              <path d="M2 2.5 14 8 2 13.5l1.6-5.5Zm1.6 5.5H8" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
