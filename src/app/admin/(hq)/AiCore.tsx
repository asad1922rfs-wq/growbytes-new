"use client";

import { useEffect, useId, useState } from "react";

/**
 * The company's AI, drawn as a living core: turning rings, a breathing orb,
 * and voice bars that move while it "speaks". Below it, what it is saying
 * types out line by line.
 */
const BARS = 48;

export function AiCore({ pending, lines }: { pending: number; lines: string[] }) {
  const speaking = pending > 0;
  // Unique per instance: the phone and desktop layouts each render a core.
  const uid = useId().replace(/:/g, "");
  return (
    <div className="relative mx-auto aspect-square w-full">
      <svg viewBox="0 0 400 400" className="absolute inset-0 size-full overflow-visible" aria-hidden="true">
        <defs>
          <radialGradient id={`orb-${uid}`} cx="50%" cy="45%" r="55%">
            <stop offset="0" stopColor="#FFD2BD" />
            <stop offset="0.35" stopColor="#FF9C6E" />
            <stop offset="0.7" stopColor="#F66135" />
            <stop offset="1" stopColor="#C2401B" />
          </radialGradient>
          <radialGradient id={`glow-${uid}`}>
            <stop offset="0" stopColor="#F66135" stopOpacity="0.45" />
            <stop offset="0.6" stopColor="#F66135" stopOpacity="0.08" />
            <stop offset="1" stopColor="#F66135" stopOpacity="0" />
          </radialGradient>
        </defs>

        <circle cx="200" cy="200" r="200" fill={`url(#glow-${uid})`} />

        {/* Outer scale: fine ticks, slowly turning */}
        <g className="hq-spin">
          {Array.from({ length: 120 }, (_, i) => {
            const a = (i / 120) * Math.PI * 2;
            const long = i % 10 === 0;
            const r1 = 188;
            const r2 = long ? 176 : 182;
            return (
              <line
                key={i}
                x1={(200 + Math.cos(a) * r1).toFixed(2)}
                y1={(200 + Math.sin(a) * r1).toFixed(2)}
                x2={(200 + Math.cos(a) * r2).toFixed(2)}
                y2={(200 + Math.sin(a) * r2).toFixed(2)}
                stroke={long ? "#F66135" : "#F7F7F2"}
                strokeOpacity={long ? 0.8 : 0.18}
                strokeWidth={long ? 1.6 : 1}
              />
            );
          })}
        </g>

        {/* Segmented ring, turning the other way */}
        <g className="hq-spin-rev">
          <circle cx="200" cy="200" r="160" fill="none" stroke="#F66135" strokeOpacity="0.55" strokeWidth="2" strokeDasharray="70 18 8 18" />
        </g>

        {/* Thin fast arc, like a scanner */}
        <g className="hq-spin-fast">
          <circle cx="200" cy="200" r="146" fill="none" stroke="#FFB38F" strokeOpacity="0.7" strokeWidth="1.2" strokeDasharray="90 828" strokeLinecap="round" />
        </g>

        {/* Voice: radial bars around the orb */}
        <g className="hq-voice" data-calm={!speaking}>
          {Array.from({ length: BARS }, (_, i) => {
            const deg = (i / BARS) * 360;
            const h = 14 + ((i * 37) % 22);
            return (
              <g key={i} transform={`rotate(${deg} 200 200)`}>
                <rect x="198.5" y={200 - 128 - h} width="3" height={h} rx="1.5" fill="#F66135" fillOpacity={0.55 + ((i * 13) % 40) / 100} style={{ animationDelay: `${((i * 7) % BARS) * -0.045}s` }} />
              </g>
            );
          })}
        </g>

        <circle cx="200" cy="200" r="108" fill="none" stroke="#F7F7F2" strokeOpacity="0.08" />

        {/* The orb */}
        <g className="hq-breathe">
          <circle cx="200" cy="200" r="92" fill={`url(#orb-${uid})`} />
          <circle cx="200" cy="200" r="92" fill="none" stroke="#FFD2BD" strokeOpacity="0.5" />
          <ellipse cx="182" cy="168" rx="38" ry="22" fill="#fff" fillOpacity="0.16" />
        </g>
      </svg>

      <div className="absolute inset-0 grid place-content-center text-center text-[#2A0E05]">
        <span className="font-display text-[clamp(2rem,4.6vw,3.25rem)] leading-none font-bold tabular-nums">{pending}</span>
        <span className="mt-1 text-[0.8125rem] font-semibold">{pending === 1 ? "decision for you" : "decisions for you"}</span>
      </div>

      <Voice lines={lines} />
    </div>
  );
}

/** Types each line out, holds it, then moves to the next. */
function Voice({ lines }: { lines: string[] }) {
  const [n, setN] = useState(0);
  const [shown, setShown] = useState(0);
  const line = lines[n % Math.max(lines.length, 1)] ?? "";

  useEffect(() => {
    if (!line) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const t = setTimeout(() => setShown(line.length), 0);
      const next = setTimeout(() => (setN((v) => v + 1), setShown(0)), 6000);
      return () => (clearTimeout(t), clearTimeout(next));
    }
    if (shown < line.length) {
      const t = setTimeout(() => setShown((s) => s + 1), 28);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => {
      setN((v) => v + 1);
      setShown(0);
    }, 3600);
    return () => clearTimeout(t);
  }, [shown, line]);

  return (
    <p className="absolute top-[102%] left-1/2 w-[min(40rem,92vw)] -translate-x-1/2 text-center font-display text-[1.0625rem] text-[var(--hq-text)]/90" aria-live="polite">
      <span className="sr-only">{line}</span>
      <span aria-hidden="true">
        {line.slice(0, shown)}
        <span className="hq-caret ml-0.5 inline-block h-[1.1em] w-[2px] translate-y-[0.2em] bg-[var(--hq-orange)]" />
      </span>
    </p>
  );
}
