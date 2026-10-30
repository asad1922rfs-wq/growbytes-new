import type { CSSProperties } from "react";

const COLS = 16;
const ROWS = 9;

/**
 * Dark geometric backdrop: grid lines draw themselves in from the centre
 * outward, then a slow glow sweeps across. Static grid under reduced motion.
 */
export function GrowGrid({ className }: { className?: string }) {
  const w = 1600;
  const h = 900;
  const cx = COLS / 2;
  const cy = ROWS / 2;
  return (
    <svg aria-hidden="true" viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="xMidYMid slice" className={className}>
      <defs>
        <radialGradient id="gg-fade" cx="50%" cy="50%" r="60%">
          <stop offset="0" stopColor="#fff" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
        <mask id="gg-mask">
          <rect width={w} height={h} fill="url(#gg-fade)" />
        </mask>
        <linearGradient id="gg-glow" x1="0" x2="1">
          <stop offset="0" stopColor="#f26b3a" stopOpacity="0" />
          <stop offset="0.5" stopColor="#f26b3a" stopOpacity="0.55" />
          <stop offset="1" stopColor="#f26b3a" stopOpacity="0" />
        </linearGradient>
      </defs>
      <g mask="url(#gg-mask)" fill="none" strokeWidth="1">
        {Array.from({ length: COLS + 1 }, (_, i) => (
          <line
            key={`v${i}`}
            className="gg-line"
            x1={(i * w) / COLS}
            x2={(i * w) / COLS}
            y1={0}
            y2={h}
            pathLength={1}
            stroke={i % 4 === 0 ? "rgb(255 255 255 / 0.16)" : "rgb(255 255 255 / 0.07)"}
            style={{ "--d": `${Math.abs(i - cx) * 0.08}s` } as CSSProperties}
          />
        ))}
        {Array.from({ length: ROWS + 1 }, (_, i) => (
          <line
            key={`h${i}`}
            className="gg-line"
            x1={0}
            x2={w}
            y1={(i * h) / ROWS}
            y2={(i * h) / ROWS}
            pathLength={1}
            stroke={i % 3 === 0 ? "rgb(255 255 255 / 0.16)" : "rgb(255 255 255 / 0.07)"}
            style={{ "--d": `${Math.abs(i - cy) * 0.1 + 0.2}s` } as CSSProperties}
          />
        ))}
        <rect className="gg-sweep" x={-w * 0.4} y={0} width={w * 0.4} height={h} fill="url(#gg-glow)" opacity="0.25" />
      </g>
      {/* Squares that light up on the grid */}
      {[
        [5, 2],
        [11, 3],
        [3, 6],
        [12, 6],
      ].map(([c, r], i) => (
        <rect
          key={i}
          className="gg-cell"
          x={(c * w) / COLS + 1}
          y={(r * h) / ROWS + 1}
          width={w / COLS - 2}
          height={h / ROWS - 2}
          fill="#f26b3a"
          style={{ "--d": `${1.6 + i * 0.9}s` } as CSSProperties}
        />
      ))}
    </svg>
  );
}
