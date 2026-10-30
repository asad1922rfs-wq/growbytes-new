import type { CSSProperties } from "react";

const delay = (s: number) => ({ "--d": `${s}s` }) as CSSProperties;

// Three disciplines around the business they all serve (positions in % of the square)
const nodes = [
  { label: "Design", sub: "Websites & stores", x: 18, y: 16, icon: "M3 4.5h14v11H3zM3 8h14M6 6.2h.01" },
  { label: "Software", sub: "Apps & automation", x: 82, y: 30, icon: "M7 6 3 10l4 4M13 6l4 4-4 4M11 4 9 16" },
  { label: "Marketing", sub: "SEO & ads", x: 26, y: 84, icon: "M3 13V7l9-3.5v13L3 13Zm9-6.5 4.5-1v9L12 13.5" },
];

/**
 * About hero artwork: design, software, and marketing each feed one central
 * "your business" node along flowing lines, which is the point of the page.
 */
export function AboutHeroArt({ className, dark }: { className?: string; dark?: boolean }) {
  return (
    <div aria-hidden="true" className={`relative aspect-square ${className ?? ""}`}>
      {/* Connecting lines with a flow running toward the centre */}
      <svg viewBox="0 0 100 100" className="absolute inset-0 size-full overflow-visible">
        {nodes.map((n, i) => (
          <g key={n.label}>
            <line x1={n.x} y1={n.y} x2={58} y2={56} stroke={dark ? "rgb(255 255 255 / 0.18)" : "var(--color-line)"} strokeWidth="0.6" />
            <line
              className="about-flow"
              x1={n.x}
              y1={n.y}
              x2={58}
              y2={56}
              stroke="#f26b3a"
              strokeWidth="0.8"
              strokeLinecap="round"
              strokeDasharray="2 6"
              style={delay(i * 0.4)}
            />
          </g>
        ))}
        <circle cx="58" cy="56" r="17" fill="none" stroke="#f26b3a" strokeOpacity="0.25" strokeWidth="0.5" className="about-ring" />
        <circle cx="58" cy="56" r="24" fill="none" stroke="#f26b3a" strokeOpacity="0.12" strokeWidth="0.5" className="about-ring" style={delay(1)} />
      </svg>

      {/* Centre: the client's business */}
      <div className="absolute top-[56%] left-[58%] grid size-[30%] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-accent text-center text-white shadow-[0_24px_50px_-18px_rgb(242_107_58/0.6)]">
        <div>
          <p className="text-[0.625rem] font-bold tracking-[0.12em] text-white/80 uppercase">Your</p>
          <p className="text-[1.125rem] leading-tight font-extrabold sm:text-[1.375rem]">business</p>
        </div>
      </div>

      {/* Discipline cards */}
      {nodes.map((n, i) => (
        <div
          key={n.label}
          className="ai-float absolute flex -translate-x-1/2 -translate-y-1/2 items-center gap-2.5 rounded-xl bg-white p-3 pr-4 text-ink shadow-[0_18px_40px_-22px_rgb(23_25_24/0.35)] ring-1 ring-line"
          style={{ left: `${n.x}%`, top: `${n.y}%`, ...delay(i * 1.3) }}
        >
          <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-ink text-white">
            <svg viewBox="0 0 20 20" className="size-[18px] fill-none stroke-current" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <path d={n.icon} />
            </svg>
          </span>
          <span className="whitespace-nowrap">
            <span className="block text-[0.875rem] font-bold">{n.label}</span>
            <span className="block text-[0.6875rem] text-muted">{n.sub}</span>
          </span>
        </div>
      ))}
    </div>
  );
}
