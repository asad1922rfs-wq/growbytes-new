import type { IconName } from "@/components/icons/GbIcon";

export type WhyPoint = { icon: IconName; title: string; body: string };

/** Three reasons, all visible: large translucent numerals lead each row, for a dark section. */
export function WhyAutomation({ points }: { points: WhyPoint[] }) {
  return (
    <ol className="divide-y divide-white/10 border-y border-white/10">
      {points.map((p, i) => (
        <li key={p.title} className="group grid grid-cols-[3.5rem_1fr] gap-x-5 py-7 sm:grid-cols-[5rem_1fr] sm:gap-x-6 sm:py-8">
          <span
            aria-hidden="true"
            className="text-[2.75rem] leading-[0.9] font-extrabold tracking-tight text-paper/30 transition-colors duration-200 group-hover:text-accent sm:text-[3.5rem]"
          >
            {String(i + 1).padStart(2, "0")}
          </span>
          <div>
            <h3 className="text-[1.375rem] leading-snug font-bold tracking-tight text-white sm:text-[1.625rem]">{p.title}</h3>
            <p className="mt-2.5 max-w-[34rem] text-[1.0625rem] leading-relaxed text-white/80">{p.body}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
