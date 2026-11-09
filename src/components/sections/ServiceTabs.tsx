import { cn } from "@/components/ui/primitives";

/**
 * Deliverables as an open grid: every item visible at once, no clicking to find what is included.
 */
export function ServiceTabs({ items }: { items: { title: string; body: string }[] }) {
  return (
    <ul className="grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
      {items.map((it, i) => (
        <li key={it.title} className={cn("group relative flex flex-col bg-white p-8 transition-colors duration-300 hover:bg-ink", "lg:p-10")}>
          <div className="flex items-center justify-between">
            <span aria-hidden="true" className="grid size-12 place-items-center rounded-2xl bg-accent/10 text-accent transition-colors group-hover:bg-accent group-hover:text-white">
              <svg viewBox="0 0 24 24" className="size-6 fill-none stroke-current" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d={iconFor(it.title, i)} />
              </svg>
            </span>
            <span className="text-[0.8125rem] font-bold text-muted tabular-nums group-hover:text-white/50">
              {String(i + 1).padStart(2, "0")}
            </span>
          </div>
          <h3 className="mt-7 text-[1.25rem] leading-snug font-extrabold transition-colors group-hover:text-white">{it.title}</h3>
          <p className="mt-3 leading-relaxed text-muted transition-colors group-hover:text-white/70">{it.body}</p>
        </li>
      ))}
    </ul>
  );
}

/** Simple line icons, one per tab position. */
const ICONS = [
  "M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z",
  "M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z",
  "m8 9-4 3 4 3M16 9l4 3-4 3M14 5l-4 14",
  "M4 4h16v12H8l-4 4ZM8 9h8M8 12h5",
  "M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14ZM20 20l-4-4",
  "M5 13l4 4L19 7",
  "M3 12h4l3-8 4 16 3-8h4",
  "M12 3v18M3 12h18",
];

const MATCH: [RegExp, string][] = [
  [/seo|search|keyword|discover/i, "M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14ZM20 20l-4-4"],
  [/migrat|move|transfer/i, "M4 8h13l-3-3M20 16H7l3 3"],
  [/design|wirefram|visual|brand|logo/i, "M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"],
  [/build|develop|code|cms|front|api|integrat|app/i, "m8 9-4 3 4 3M16 9l4 3-4 3M14 5l-4 14"],
  [/review|audit|research|strategy|architect/i, "M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z"],
  [/inquir|lead|form|chat|email|message/i, "M4 4h16v12H8l-4 4ZM8 9h8M8 12h5"],
  [/optimi|report|track|analytic|measure|growth/i, "M3 17l6-6 4 4 8-8M14 7h7v7"],
  [/launch|handover|training|support|maint/i, "M5 13l4 4L19 7"],
];
function iconFor(title: string, i: number) {
  return MATCH.find(([re]) => re.test(title))?.[1] ?? ICONS[i % ICONS.length];
}
