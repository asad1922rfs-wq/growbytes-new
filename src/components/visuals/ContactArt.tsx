import type { CSSProperties } from "react";

const box = "absolute rounded-xl bg-white ring-1 ring-line shadow-[0_18px_40px_-22px_rgb(23_25_24/0.3)]";
const delay = (s: number) => ({ "--d": `${s}s` }) as CSSProperties;

// Typed out one line at a time
const lines = ["Hi! We need a new website", "and more bookings from Google.", "Can we talk this week?"];

/**
 * Contact page header artwork: a short message types itself out and gets
 * sent. Loops; static under reduced motion.
 */
export function ContactArt({ className }: { className?: string }) {
  return (
    <div aria-hidden="true" className={`relative aspect-[5/3.6] ${className ?? ""}`}>
      {/* Brand block, as on the homepage hero */}
      <div className="absolute top-0 right-0 hidden h-[58%] w-[40%] rounded-xl bg-accent sm:block" />

      {/* The brief being written */}
      <div className={`${box} ai-float top-[18%] right-[8%] left-[4%] p-6`} style={delay(0)}>
        <p className="text-[0.875rem] font-bold">Tell us about your project</p>
        <div className="mt-3 min-h-[4.5rem] rounded-lg bg-paper p-3 text-[0.8125rem] leading-6 text-ink/80 ring-1 ring-line">
          {lines.map((line, i) => (
            <span
              key={line}
              className="ct-text block w-fit whitespace-nowrap"
              style={{ ...delay(0.3 + i * 1.1), animationTimingFunction: `steps(${line.length})` }}
            >
              {line}
              {i === lines.length - 1 && <span className="ai-caret ml-0.5 inline-block h-3.5 w-[2px] translate-y-0.5 bg-accent" />}
            </span>
          ))}
        </div>
        <div className="mt-4 flex justify-end">
          <span className="ct-send rounded-lg bg-accent-button px-4 py-2 text-[0.75rem] font-bold text-white">Send</span>
        </div>
      </div>
    </div>
  );
}
