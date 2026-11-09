import type { CSSProperties } from "react";
import { siFigma, siFlutter, siNextdotjs, siNodedotjs, siReact, siShopify, siTailwindcss, siTypescript, siWordpress } from "simple-icons";

const box = "absolute rounded-xl bg-white ring-1 ring-line shadow-[0_18px_40px_-22px_rgb(23_25_24/0.3)]";
const delay = (s: number) => ({ "--d": `${s}s` }) as CSSProperties;

const stack = [siFigma, siNextdotjs, siReact, siTypescript, siTailwindcss, siNodedotjs, siShopify, siWordpress, siFlutter];

// Real code, one array of [text, colour] tokens per line
const K = "#c792ea"; // keyword
const F = "#82aaff"; // function / component
const S = "#c3e88d"; // string
const A = "#ffcb6b"; // attribute
const P = "#89ddff"; // punctuation
const T = "#e6e6e6"; // plain
const code: { indent: number; tokens: [string, string][] }[] = [
  { indent: 0, tokens: [["export default function ", K], ["Home", F], ["() {", P]] },
  { indent: 1, tokens: [["return ", K], ["(", P]] },
  { indent: 2, tokens: [["<", P], ["Hero", F]] },
  { indent: 3, tokens: [["title", A], ["=", P], ["\"Grow faster\"", S]] },
  { indent: 3, tokens: [["cta", A], ["=", P], ["\"Start a project\"", S], [" />", P]] },
  { indent: 1, tokens: [[");", P]] },
  { indent: 0, tokens: [["}", T]] },
];

/**
 * Hero artwork for the design and development slide: a page assembling block
 * by block in a browser, with the design system, code, stack, and quality
 * checks around it.
 */
export function HeroBuildArt() {
  return (
    <div
      role="img"
      aria-label="A website being assembled from design to code: a browser page builds block by block, with a design system, code editor, technology stack, and passing quality checks."
      className="relative aspect-[4/5]"
    >
      <div aria-hidden="true">
        {/* Browser with the page building */}
        <div className={`${box} ai-float top-[12%] right-[4%] left-[2%] overflow-hidden`} style={delay(0)}>
          <div className="flex items-center gap-1.5 border-b border-line px-3.5 py-2.5">
            <span className="size-2 rounded-full bg-[#e8735a]" />
            <span className="size-2 rounded-full bg-[#e9c46a]" />
            <span className="size-2 rounded-full bg-[#7fb38a]" />
            <span className="mx-auto rounded-md bg-paper px-6 py-0.5 text-[0.625rem] text-muted">yourbusiness.com</span>
          </div>
          <div className="space-y-2.5 p-4">
            <div className="build-block flex items-center justify-between" style={delay(0.2)}>
              <span className="h-2.5 w-14 rounded-full bg-ink" />
              <span className="flex gap-2">
                {[0, 1, 2].map((i) => (
                  <span key={i} className="h-1.5 w-7 rounded-full bg-ink/20" />
                ))}
                <span className="h-1.5 w-9 rounded-full bg-accent" />
              </span>
            </div>
            <div className="build-block grid grid-cols-[1.2fr_1fr] gap-3 rounded-lg bg-paper p-3" style={delay(0.7)}>
              <div className="space-y-1.5 py-1">
                <span className="block h-3 w-[90%] rounded-sm bg-ink/85" />
                <span className="block h-3 w-[70%] rounded-sm bg-ink/85" />
                <span className="block h-1.5 w-[85%] rounded-full bg-ink/20" />
                <span className="block h-1.5 w-[60%] rounded-full bg-ink/20" />
                <span className="mt-2 block h-5 w-16 rounded-md bg-accent" />
              </div>
              <div className="rounded-md bg-[#e8dfd1]" />
            </div>
            <div className="build-block grid grid-cols-3 gap-2" style={delay(1.2)}>
              {[0, 1, 2].map((i) => (
                <div key={i} className="space-y-1.5 rounded-lg border border-line p-2">
                  <span className="block aspect-[4/3] rounded-sm bg-paper" />
                  <span className="block h-1.5 w-[80%] rounded-full bg-ink/30" />
                  <span className="block h-1.5 w-[55%] rounded-full bg-ink/15" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Design system */}
        <div className={`${box} ai-float top-[2%] left-[-6%] z-10 p-3.5`} style={delay(0.8)}>
          <p className="text-[0.625rem] font-bold tracking-[0.1em] text-muted uppercase">Design system</p>
          <div className="mt-2 flex items-center gap-1.5">
            {["#171918", "#f26b3a", "#7fb38a", "#e8dfd1"].map((c) => (
              <span key={c} className="size-6 rounded-md ring-1 ring-line" style={{ background: c }} />
            ))}
            <span className="ml-1.5 text-lg leading-none font-extrabold">Aa</span>
          </div>
        </div>

        {/* Stack */}
        <div className={`${box} ai-float top-[2%] -right-3 z-10 p-3 sm:-right-5`} style={delay(1.6)}>
          <p className="text-[0.625rem] font-bold tracking-[0.1em] text-muted uppercase">Built with</p>
          <div className="mt-2 grid grid-cols-3 gap-1.5">
            {stack.map((icon, i) => (
              <span key={icon.slug} title={icon.title} className="ai-tool grid size-8 place-items-center rounded-lg bg-paper ring-1 ring-line" style={delay(i * 0.25)}>
                <svg viewBox="0 0 24 24" className="size-4" style={{ fill: `#${icon.hex}` }}>
                  <path d={icon.path} />
                </svg>
              </span>
            ))}
          </div>
        </div>

        {/* Mobile app */}
        <div
          className="ai-float absolute bottom-[1%] left-[-6%] z-10 w-[30%] rounded-[0.9rem] bg-ink p-1.5 shadow-[0_18px_40px_-20px_rgb(23_25_24/0.5)]"
          style={delay(2.4)}
        >
          <div className="overflow-hidden rounded-[0.75rem] bg-white">
            <div className="flex justify-center pt-1.5">
              <span className="h-1.5 w-10 rounded-full bg-ink" />
            </div>
            <div className="space-y-2 p-2.5">
              <div className="build-block flex items-center justify-between" style={delay(1.4)}>
                <span className="h-2 w-10 rounded-full bg-ink" />
                <span className="size-4 rounded-full bg-accent" />
              </div>
              <div className="build-block space-y-1 rounded-lg bg-accent p-2" style={delay(1.8)}>
                <span className="block h-1.5 w-[60%] rounded-full bg-white/80" />
                <span className="block h-2.5 w-[40%] rounded-sm bg-white" />
              </div>
              {[0, 1, 2].map((i) => (
                <div key={i} className="build-block flex items-center gap-1.5" style={delay(2.2 + i * 0.3)}>
                  <span className="size-5 shrink-0 rounded-md bg-paper ring-1 ring-line" />
                  <span className="flex-1 space-y-1">
                    <span className="block h-1.5 w-[80%] rounded-full bg-ink/30" />
                    <span className="block h-1 w-[50%] rounded-full bg-ink/15" />
                  </span>
                </div>
              ))}
            </div>
            <div className="flex justify-around border-t border-line py-2">
              {[0, 1, 2, 3].map((i) => (
                <span key={i} className={`size-2.5 rounded-sm ${i === 0 ? "bg-accent" : "bg-ink/20"}`} />
              ))}
            </div>
          </div>
        </div>

        {/* Code editor */}
        <div
          className="ai-float absolute right-[-3%] bottom-[4%] z-10 w-[62%] overflow-hidden rounded-xl bg-[#1e2127] shadow-[0_18px_40px_-20px_rgb(23_25_24/0.5)]"
          style={delay(3.2)}
        >
          <div className="flex items-center gap-2 border-b border-white/10 px-3.5 py-2 text-[0.625rem] font-semibold text-white/60">
            <span className="rounded bg-white/10 px-1.5 py-0.5 text-white/80">page.tsx</span>
            <span>styles.css</span>
          </div>
          <pre className="px-3.5 py-3 font-mono text-[0.625rem] leading-[1.6] sm:text-[0.6875rem]">
            {code.map((line, i) => (
              <div key={i} className="build-code flex" style={{ paddingLeft: `${line.indent * 1.25}ch`, ...delay(0.4 + i * 0.35) }}>
                <span className="mr-3 w-3 shrink-0 text-right text-white/25 select-none">{i + 1}</span>
                <span className="whitespace-pre">
                  {line.tokens.map(([t, c], j) => (
                    <span key={j} style={{ color: c }}>
                      {t}
                    </span>
                  ))}
                </span>
              </div>
            ))}
          </pre>
        </div>
      </div>
    </div>
  );
}
