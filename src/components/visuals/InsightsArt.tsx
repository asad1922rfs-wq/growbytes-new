import type { CSSProperties } from "react";

const delay = (s: number) => ({ "--d": `${s}s` }) as CSSProperties;

/**
 * Insights header artwork: an open guide where a line gets highlighted and the
 * checklist ticks itself off. Loops; static under reduced motion.
 */
export function InsightsArt({ className }: { className?: string }) {
  return (
    <div aria-hidden="true" className={`relative aspect-[5/4] ${className ?? ""}`}>
      <div className="absolute top-0 right-0 hidden h-[60%] w-[40%] rounded-xl bg-accent sm:block" />

      {/* Back page */}
      <div className="absolute top-[10%] left-[10%] h-[78%] w-[70%] -rotate-6 rounded-xl bg-white/70 ring-1 ring-line" />

      {/* The guide */}
      <div className="ai-float absolute top-[8%] right-[8%] left-[4%] rounded-xl bg-white p-6 shadow-[0_24px_50px_-24px_rgb(23_25_24/0.4)] ring-1 ring-line" style={delay(0)}>
        <p className="flex items-center justify-between text-[0.6875rem] font-bold tracking-[0.12em] text-muted uppercase">
          <span>Guide</span>
          <span>9 min read</span>
        </p>
        <p className="mt-3 text-[1.0625rem] leading-snug font-extrabold">Before you redesign your website</p>
        <div className="mt-4 space-y-2">
          <span className="block h-1.5 w-[95%] rounded-full bg-ink/15" />
          <span className="relative block h-1.5 w-[80%] rounded-full bg-ink/15">
            <span className="ins-mark absolute -inset-y-1 left-0 w-full origin-left rounded-sm bg-accent/35" />
          </span>
          <span className="block h-1.5 w-[88%] rounded-full bg-ink/15" />
        </div>
        <ul className="mt-5 space-y-2.5 text-[0.8125rem] font-semibold">
          {["Set clear goals", "Keep your best pages", "Plan redirects"].map((t, i) => (
            <li key={t} className="flex items-center gap-2.5">
              <span className="relative grid size-5 place-items-center rounded-md ring-1 ring-line">
                <span className="ins-check absolute inset-0 grid place-items-center rounded-md bg-accent text-white" style={delay(1.2 + i * 0.6)}>
                  <svg viewBox="0 0 12 12" className="size-3 fill-none stroke-current" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m2.5 6.2 2.2 2.2 4.8-5" />
                  </svg>
                </span>
              </span>
              {t}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
