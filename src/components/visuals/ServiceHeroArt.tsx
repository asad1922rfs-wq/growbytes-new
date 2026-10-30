import type { CSSProperties } from "react";
import { ServiceVisual } from "@/components/visuals/ServiceVisuals";
import type { Service } from "@/content/types";

const delay = (s: number) => ({ "--d": `${s}s` }) as CSSProperties;
const chip =
  "ai-float absolute z-10 flex items-center gap-2 rounded-full bg-white py-2 pr-4 pl-2 text-[0.8125rem] font-bold text-ink shadow-[0_18px_40px_-20px_rgb(23_25_24/0.4)] ring-1 ring-line";

const tick = (
  <span className="grid size-6 place-items-center rounded-full bg-accent text-white">
    <svg viewBox="0 0 12 12" className="size-3 fill-none stroke-current" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m2.5 6.2 2.2 2.2 4.8-5" />
    </svg>
  </span>
);

/**
 * Service hero artwork: the service illustration floats over the brand block,
 * with the first deliverables orbiting it as chips.
 */
export function ServiceHeroArt({ service, className }: { service: Service; className?: string }) {
  const [a, b, c] = service.deliverables;
  return (
    <div className={`relative ${className ?? ""}`}>
      <div aria-hidden="true" className="absolute -top-5 -right-5 hidden h-[62%] w-[42%] rounded-xl bg-accent sm:block" />
      <figure className="ai-float relative overflow-hidden rounded-2xl bg-white p-4 shadow-[0_30px_60px_-30px_rgb(23_25_24/0.45)] ring-1 ring-line sm:p-6" style={delay(0)}>
        <ServiceVisual kind={service.visual} label={service.visualCaption} />
      </figure>
      {a && (
        <span aria-hidden="true" className={`${chip} -top-4 -left-4 sm:-left-8`} style={delay(1.1)}>
          {tick}
          {a.title}
        </span>
      )}
      {b && (
        <span aria-hidden="true" className={`${chip} -bottom-5 left-[8%]`} style={delay(2.2)}>
          {tick}
          {b.title}
        </span>
      )}
      {c && (
        <span aria-hidden="true" className={`${chip} top-[44%] -right-3 hidden sm:-right-8 sm:flex`} style={delay(3.3)}>
          {tick}
          {c.title}
        </span>
      )}
    </div>
  );
}
