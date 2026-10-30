import type { CSSProperties } from "react";

const rows = [
  { area: "Search", pain: "Hard to find on Google", fix: "Ranking for the searches that matter", icon: "M8.5 3.5a5 5 0 1 0 0 10 5 5 0 0 0 0-10ZM12.2 12.2 16.5 16.5" },
  { area: "Ads", pain: "Spend with no clear return", fix: "Every campaign tracked to real leads", icon: "M3 13V7l9-3.5v13L3 13Zm9-6.5 4.5-1v9L12 13.5M5.5 13.5 7 17" },
  { area: "Conversion", pain: "Visitors leave without calling", fix: "More visitors turn into inquiries", icon: "M3 4h14l-5.5 6.5V16l-3-1.5v-4Z" },
  { area: "Email", pain: "Past customers forgotten", fix: "Regular emails that bring them back", icon: "M3 5h14v10H3zM3 5l7 5.5L17 5" },
];

const inquiries = [
  { source: "via Google search", text: "Do you have availability this month?" },
  { source: "via Instagram ad", text: "Saw your offer, can I get a quote?" },
  { source: "via your newsletter", text: "We would like to book again…" },
];

const bars = [28, 36, 32, 48, 56, 70, 88];

const box = "absolute rounded-xl bg-white ring-1 ring-line shadow-[0_24px_50px_-24px_rgb(23_25_24/0.35)]";
const delay = (s: number) => ({ "--d": `${s}s` }) as CSSProperties;

/**
 * Hero artwork for the marketing slide: floating panels where common growth
 * problems swap to their fix, while visibility, campaigns, and inquiries
 * improve around them. Everything shows its solved state under reduced motion.
 */
export function HeroPainPoints({ className }: { className?: string }) {
  return (
    <div
      role="img"
      aria-label="Marketing problems such as poor search visibility, untracked ads, and lost visitors, each replaced by a fix, with rising visibility, live campaigns, and more inquiries."
      className={`relative aspect-[4/5] ${className ?? ""}`}
    >
      <div aria-hidden="true">
        {/* Main panel: pain points → fixes */}
        <div className={`${box} pp-float top-[19%] right-[4%] left-[2%] p-4 sm:p-5`} style={delay(0)}>
          <ul className="space-y-2.5">
            {rows.map((r, i) => (
              <li key={r.pain} className="flex items-center gap-3 rounded-lg border border-line bg-paper p-3" style={delay(i * 1.1)}>
                <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-white text-ink ring-1 ring-line">
                  <svg viewBox="0 0 20 20" className="size-[18px] fill-none stroke-current" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <path d={r.icon} />
                  </svg>
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-[0.625rem] font-bold tracking-[0.1em] text-muted uppercase">{r.area}</p>
                  <div className="relative mt-0.5 h-5 overflow-hidden text-[0.8125rem] leading-5 sm:text-[0.875rem]">
                    <p className="pp-pain absolute inset-0 truncate font-semibold text-accent-strong">{r.pain}</p>
                    <p className="pp-fix absolute inset-0 truncate font-bold">{r.fix}</p>
                  </div>
                </div>
                <div className="relative h-6 w-[4.25rem] shrink-0 text-[0.625rem] font-bold">
                  <span className="pp-pain absolute inset-0 grid place-items-center rounded-full bg-[#fde3dc] text-accent-strong">Problem</span>
                  <span className="pp-fix absolute inset-0 grid place-items-center rounded-full bg-[#e3f4e8] text-[#1f8a4c]">Fixed</span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Search visibility gauge */}
        <div className={`${box} pp-float -top-4 -right-3 w-[34%] p-3.5 sm:-right-5`} style={delay(1.2)}>
          <p className="text-[0.625rem] font-bold tracking-[0.1em] text-muted uppercase">Search visibility</p>
          <svg viewBox="0 0 100 56" className="mt-1.5 w-full">
            <path d="M8 50a42 42 0 0 1 84 0" fill="none" stroke="var(--color-line)" strokeWidth="9" strokeLinecap="round" />
            <path className="pp-gauge" d="M8 50a42 42 0 0 1 84 0" fill="none" stroke="#1f8a4c" strokeWidth="9" strokeLinecap="round" pathLength={1} />
          </svg>
          <p className="-mt-1 text-center text-[0.8125rem] font-extrabold text-[#1f8a4c]">Rising</p>
        </div>

        {/* Inquiries chart */}
        <div className={`${box} pp-float bottom-[9%] left-[-4%] w-[54%] p-4`} style={delay(2.4)}>
          <p className="flex items-baseline justify-between text-[0.75rem] font-semibold">
            Inquiries
            <span className="text-[0.6875rem] font-bold text-[#1f8a4c]">↑ Trending up</span>
          </p>
          <div className="mt-3 flex h-16 items-end gap-1.5 sm:h-20">
            {bars.map((h, i) => (
              <span
                key={i}
                className={`pp-bar flex-1 origin-bottom rounded-t-sm ${i === bars.length - 1 ? "bg-accent" : "bg-ink/15"}`}
                style={{ height: `${h}%`, ...delay(i * 0.12) }}
              />
            ))}
          </div>
        </div>

        {/* Campaigns running */}
        <div
          className="pp-float absolute right-[-2%] bottom-[5%] w-[44%] rounded-xl bg-ink p-3.5 text-white shadow-[0_24px_50px_-20px_rgb(23_25_24/0.6)]"
          style={delay(3.2)}
        >
          <p className="flex items-center gap-1.5 text-[0.625rem] font-bold tracking-[0.1em] text-white/60 uppercase">
            <span className="pp-dot size-1.5 rounded-full bg-accent" /> Campaigns live
          </p>
          <ul className="mt-2 space-y-1.5 text-[0.75rem] font-semibold">
            {["Google Ads", "Meta retargeting", "Monthly newsletter"].map((t, i) => (
              <li key={t} className="pp-tick flex items-center gap-1.5" style={delay(3.6 + i * 0.35)}>
                <span className="size-1.5 shrink-0 rounded-full bg-[#4ade80]" />
                {t}
              </li>
            ))}
          </ul>
        </div>

        {/* New inquiry notifications, arriving one after another */}
        <div className="absolute top-0 left-[-6%] z-10 grid w-[62%]">
          {inquiries.map((q, i) => (
            <div
              key={q.text}
              className="pp-msg rounded-xl bg-white p-3.5 shadow-[0_12px_28px_-16px_rgb(23_25_24/0.22)] ring-1 ring-line [grid-area:1/1]"
              style={delay(i * 2.2)}
            >
              <div className="flex items-center gap-3">
                <span className="relative grid size-9 shrink-0 place-items-center rounded-full bg-accent text-white">
                  <span className="pp-ring absolute inset-0 rounded-full border-2 border-accent" />
                  <svg viewBox="0 0 16 16" className="size-4 fill-none stroke-current" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2.5 4.5h11v7h-11zM2.5 4.5 8 9l5.5-4.5" />
                  </svg>
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex items-baseline justify-between gap-2">
                    <span className="text-[0.8125rem] font-bold">New inquiry</span>
                    <span className="text-[0.625rem] font-semibold text-muted">Just now</span>
                  </span>
                  <span className="block truncate text-[0.6875rem] text-muted">{q.source}</span>
                </span>
              </div>
              <p className="mt-2.5 truncate rounded-md bg-paper px-2.5 py-2 text-[0.6875rem] text-ink/80">&ldquo;{q.text}&rdquo;</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
