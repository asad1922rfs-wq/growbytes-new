"use client";

import { useEffect, useRef } from "react";

/**
 * Slowly rotating dotted globe drawn on a canvas. `land` is a list of
 * [lat, lng] samples computed on the server. Holds still for visitors who
 * prefer reduced motion and pauses when scrolled out of view.
 */
export function GlobeCanvas({ land, cities, className }: { land: [number, number][]; cities: [number, number][]; className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const toRad = Math.PI / 180;
    const tilt = 18 * toRad;
    const sinT = Math.sin(tilt);
    const cosT = Math.cos(tilt);
    const landRad = land.map(([la, lo]) => [la * toRad, lo * toRad] as const);
    const cityRad = cities.map(([la, lo]) => [la * toRad, lo * toRad] as const);

    let size = 0;
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      size = canvas.clientWidth;
      canvas.width = size * dpr;
      canvas.height = size * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    let rotation = -45 * toRad;
    let frame = 0;
    let visible = true;
    let last = performance.now();

    const project = (φ: number, λ: number) => {
      const l = λ - rotation;
      const cosC = sinT * Math.sin(φ) + cosT * Math.cos(φ) * Math.cos(l);
      return {
        x: Math.cos(φ) * Math.sin(l),
        y: cosT * Math.sin(φ) - sinT * Math.cos(φ) * Math.cos(l),
        z: cosC,
      };
    };

    const draw = (now: number) => {
      const r = size / 2 - 2;
      const c = size / 2;
      ctx.clearRect(0, 0, size, size);

      // Sphere with soft shading
      const g = ctx.createRadialGradient(c - r * 0.3, c - r * 0.35, r * 0.1, c, c, r);
      g.addColorStop(0, "#ffffff");
      g.addColorStop(1, "#efece6");
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(c, c, r, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "#e6e1d6";
      ctx.lineWidth = 1;
      ctx.stroke();

      // Land dots, fading toward the rim
      const dot = Math.max(1.2, r / 110);
      for (const [φ, λ] of landRad) {
        const p = project(φ, λ);
        if (p.z <= 0) continue;
        ctx.fillStyle = `rgba(150, 156, 153, ${0.25 + p.z * 0.6})`;
        ctx.beginPath();
        ctx.arc(c + p.x * r, c - p.y * r, dot * (0.55 + p.z * 0.45), 0, Math.PI * 2);
        ctx.fill();
      }

      // Pulsing city points
      const pulse = (now / 1600) % 1;
      cityRad.forEach(([φ, λ], i) => {
        const p = project(φ, λ);
        if (p.z <= 0.05) return;
        const x = c + p.x * r;
        const y = c - p.y * r;
        const t = (pulse + i * 0.17) % 1;
        ctx.fillStyle = `rgba(246, 97, 53, ${(1 - t) * 0.35 * p.z})`;
        ctx.beginPath();
        ctx.arc(x, y, dot * (2 + t * 5), 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = `rgba(246, 97, 53, ${0.5 + p.z * 0.5})`;
        ctx.beginPath();
        ctx.arc(x, y, dot * 1.6, 0, Math.PI * 2);
        ctx.fill();
      });
    };

    const tick = (now: number) => {
      const dt = Math.min(64, now - last);
      last = now;
      if (!reduce) rotation += dt * 0.00012;
      draw(now);
      if (visible && !reduce) frame = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible && !reduce) {
        last = performance.now();
        frame = requestAnimationFrame(tick);
      } else cancelAnimationFrame(frame);
    });
    io.observe(canvas);
    draw(performance.now());

    return () => {
      cancelAnimationFrame(frame);
      io.disconnect();
      ro.disconnect();
    };
  }, [land, cities]);

  return <canvas ref={ref} role="img" aria-label="Rotating dotted globe with highlighted points over major cities." className={className} />;
}
