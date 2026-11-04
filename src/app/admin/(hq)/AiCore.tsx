"use client";

import { useEffect, useRef, useState } from "react";

/**
 * The company's AI, drawn like an eclipse: a dark core with a corona of
 * glowing particles streaming off its edge. It burns brighter and faster
 * while something is waiting for you. Below it, what it is saying types out.
 */
export function AiCore({ pending, lines }: { pending: number; lines: string[] }) {
  return (
    <div className="relative mx-auto aspect-square w-full">
      <Corona active={pending > 0} />
      <div className="absolute inset-0 grid place-content-center text-center">
        <span className="font-display text-[clamp(2.5rem,5vw,4rem)] leading-none text-white tabular-nums">{pending}</span>
        <span className="mt-2 text-[0.9375rem] text-[#FFB38F]">{pending === 1 ? "decision for you" : "decisions for you"}</span>
        {pending > 0 && <span className="mt-1 text-[0.8125rem] text-white/60">Tap to open your desk</span>}
      </div>
      <Voice lines={lines} />
    </div>
  );
}

type P = { a: number; r: number; v: number; life: number; max: number; size: number; hue: number };

function Corona({ active }: { active: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let size = 0;
    let dpr = 1;
    const fit = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      size = canvas.clientWidth;
      canvas.width = size * dpr;
      canvas.height = size * dpr;
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(canvas);

    // Particles live in units of the core radius (1 = the edge of the dark disc).
    const COUNT = active ? 6000 : 4500;
    const spawn = (p: Partial<P> = {}): P => {
      const max = 60 + Math.random() * 140;
      return {
        a: Math.random() * Math.PI * 2,
        r: 1 + Math.pow(Math.random(), 2.2) * 0.4,
        v: (0.0004 + Math.random() * 0.0016) * (active ? 1.7 : 1),
        life: Math.random() * max,
        max,
        size: 0.5 + Math.random() * 1.6,
        hue: Math.random(),
        ...p,
      };
    };
    const ps: P[] = Array.from({ length: COUNT }, () => spawn());

    let raf = 0;
    let t = 0;
    const draw = () => {
      const w = size * dpr;
      const c = w / 2;
      const R = w * 0.29; // radius of the dark disc
      ctx.clearRect(0, 0, w, w);

      // Corona particles (no outer haze: only the particles and the rim give off light)
      ctx.globalCompositeOperation = "lighter";
      for (const p of ps) {
        if (!still) {
          p.life += 1;
          p.r += p.v;
          p.a += 0.0006;
          if (p.life > p.max || p.r > 1.5) Object.assign(p, spawn({ life: 0 }));
        }
        const fadeIn = Math.min(1, p.life / 12);
        const fadeOut = 1 - p.life / p.max;
        const edge = 1 - Math.min(1, (p.r - 1) / 0.5);
        const flicker = 0.85 + Math.sin(t * 0.2 + p.a * 40) * 0.25;
        const alpha = Math.max(0, fadeIn * fadeOut * edge * flicker);
        if (alpha < 0.02) continue;
        const x = c + Math.cos(p.a) * p.r * R;
        const y = c + Math.sin(p.a) * p.r * R;
        // Hot white-gold near the edge, deep orange further out
        const g = Math.round(150 + p.hue * 80 * edge);
        const b = Math.round(70 + p.hue * 110 * edge * edge);
        ctx.globalAlpha = alpha;
        ctx.fillStyle = `rgb(255,${g},${b})`;
        ctx.fillRect(x, y, p.size * dpr, p.size * dpr);
      }
      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = "source-over";

      // Bright rim where the light wraps the disc
      const rim = ctx.createRadialGradient(c, c, R * 0.96, c, c, R * 1.08);
      rim.addColorStop(0, "rgba(246,97,53,0)");
      rim.addColorStop(0.45, `rgba(246,97,53,${active ? 0.35 : 0.22})`);
      rim.addColorStop(1, "rgba(246,97,53,0)");
      ctx.fillStyle = rim;
      ctx.beginPath();
      ctx.arc(c, c, R * 1.08, 0, Math.PI * 2);
      ctx.fill();

      // The dark core
      const core = ctx.createRadialGradient(c, c - R * 0.2, R * 0.1, c, c, R);
      core.addColorStop(0, "#070707");
      core.addColorStop(0.85, "#020202");
      core.addColorStop(1, "#000000");
      ctx.fillStyle = core;
      ctx.beginPath();
      ctx.arc(c, c, R, 0, Math.PI * 2);
      ctx.fill();

      t += 1;
      if (!still) raf = requestAnimationFrame(draw);
    };
    draw();

    const onVis = () => {
      cancelAnimationFrame(raf);
      if (!document.hidden && !still) raf = requestAnimationFrame(draw);
    };
    document.addEventListener("visibilitychange", onVis);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [active]);

  return <canvas ref={ref} aria-hidden="true" className="absolute inset-0 size-full" />;
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
    <p className="absolute top-[100%] left-1/2 w-[min(40rem,92vw)] -translate-x-1/2 text-center font-display text-[clamp(1.25rem,1.8vw,1.75rem)] leading-snug text-white" aria-live="polite">
      <span className="sr-only">{line}</span>
      <span aria-hidden="true">
        {line.slice(0, shown)}
        <span className="hq-caret ml-0.5 inline-block h-[1.1em] w-[2px] translate-y-[0.2em] bg-[var(--hq-orange)]" />
      </span>
    </p>
  );
}
