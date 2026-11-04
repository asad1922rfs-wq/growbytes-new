import Link from "next/link";
import { departments, type Department } from "@/lib/db";
import type { Overview } from "@/lib/admin/data";
import { AiCore } from "./AiCore";
import { DEPTS, LiveDot, timeAgo } from "./ui";

/**
 * The organisation as a map: the company's AI core in the middle, each
 * department's agent around it. Work waiting for you travels in along the
 * lines; open orders travel out to the agent that will do them.
 */
const W = 1000;
const H = 470;
const CORE = { x: 500, y: 225 };
const POS: Record<Department, { x: number; y: number }> = {
  sales: { x: 125, y: 95 },
  marketing: { x: 875, y: 95 },
  projects: { x: 125, y: 360 },
  operations: { x: 875, y: 360 },
};

function edge(d: Department) {
  const p = POS[d];
  const mx = (p.x + CORE.x) / 2;
  return `M ${p.x} ${p.y} C ${mx} ${p.y}, ${mx} ${CORE.y}, ${CORE.x} ${CORE.y}`;
}
function edgeOut(d: Department) {
  const p = POS[d];
  const mx = (p.x + CORE.x) / 2;
  return `M ${CORE.x} ${CORE.y} C ${mx} ${CORE.y}, ${mx} ${p.y}, ${p.x} ${p.y}`;
}

function status(d: Department, s: Overview["byDept"][Department]) {
  if (!DEPTS[d].live) return DEPTS[d].role;
  if (s.pending) return `Sent you ${s.pending} thing${s.pending === 1 ? "" : "s"} to decide`;
  if (s.orders) return `Working on ${s.orders} order${s.orders === 1 ? "" : "s"} from you`;
  return s.last ?? "Standing by";
}

export function OrgMap({ o, lines }: { o: Overview; lines: string[] }) {
  return (
    <>
      {/* Wide screens: the map */}
      <div className="relative hidden aspect-[1000/470] w-full md:block">
        <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 size-full" aria-hidden="true">
          {departments.map((d) => {
            const s = o.byDept[d];
            const live = DEPTS[d].live;
            return (
              <g key={d}>
                <path d={edge(d)} fill="none" stroke={live ? "rgb(255 255 255 / 0.16)" : "rgb(255 255 255 / 0.08)"} strokeWidth="1.25" strokeDasharray={live ? undefined : "3 7"} />
                {s.pending > 0 &&
                  [0, 1.07, 2.13].slice(0, Math.min(3, s.pending)).map((delay) => (
                    <circle key={delay} r="5" fill={DEPTS[d].hue} className="hq-packet" style={{ offsetPath: `path("${edge(d)}")`, animationDelay: `${delay}s` }} />
                  ))}
                {s.orders > 0 && (
                  <circle r="4" fill="none" stroke={DEPTS[d].hue} strokeWidth="1.5" className="hq-packet" style={{ offsetPath: `path("${edgeOut(d)}")`, animationDuration: "4.6s" }} />
                )}
              </g>
            );
          })}
        </svg>

        <Link
          href="/admin/approvals/"
          aria-label={`${o.pending} decisions waiting for you`}
          className="absolute w-[31%] -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${(CORE.x / W) * 100}%`, top: `${(CORE.y / H) * 100}%` }}
        >
          <AiCore pending={o.pending} lines={lines} />
        </Link>

        {departments.map((d) => (
          <Node key={d} d={d} s={o.byDept[d]} className="absolute w-[22%] -translate-x-1/2 -translate-y-1/2" style={{ left: `${(POS[d].x / W) * 100}%`, top: `${(POS[d].y / H) * 100}%` }} />
        ))}
      </div>

      {/* Phones: the core on top, the agents below */}
      <div className="md:hidden">
        <Link href="/admin/approvals/" className="mx-auto block w-[78%] pb-20">
          <AiCore pending={o.pending} lines={lines} />
        </Link>
        <div className="space-y-3">
          {departments.map((d) => (
            <Node key={d} d={d} s={o.byDept[d]} />
          ))}
        </div>
      </div>
    </>
  );
}

const ICONS: Record<Department, string> = {
  // chat bubble
  sales: "M5 5h14a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-7l-4.5 3.5V17H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z",
  // megaphone
  marketing: "M4 10v4a1 1 0 0 0 1 1h2l5 4V5L7 9H5a1 1 0 0 0-1 1Zm12-1.5a4 4 0 0 1 0 7M18.5 6a7.5 7.5 0 0 1 0 12",
  // stacked layers
  projects: "m12 3 9 5-9 5-9-5 9-5Zm-9 9 9 5 9-5M3 16.5l9 5 9-5",
  // gauge / settings
  operations: "M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm7.4-3a7.4 7.4 0 0 0-.1-1.2l2-1.6-2-3.4-2.4 1a7.6 7.6 0 0 0-2-1.2L14.5 3h-5l-.4 2.6a7.6 7.6 0 0 0-2 1.2l-2.4-1-2 3.4 2 1.6a7.4 7.4 0 0 0 0 2.4l-2 1.6 2 3.4 2.4-1a7.6 7.6 0 0 0 2 1.2l.4 2.6h5l.4-2.6a7.6 7.6 0 0 0 2-1.2l2.4 1 2-3.4-2-1.6c.1-.4.1-.8.1-1.2Z",
};
const PHASE: Partial<Record<Department, string>> = { marketing: "Arrives in Phase 2", projects: "Arrives in Phase 3", operations: "Arrives in Phase 3" };

function Node({ d, s, className = "", style }: { d: Department; s: Overview["byDept"][Department]; className?: string; style?: React.CSSProperties }) {
  const dept = DEPTS[d];
  const live = dept.live;
  return (
    <Link
      href={d === "sales" ? "/admin/leads/" : "/admin/agents/"}
      className={`group block overflow-hidden rounded-[1.5rem] p-5 transition-[filter] duration-300 hover:brightness-125 ${className.includes("absolute") ? "" : "relative"} ${
        live ? "hq-glass" : "hq-glass hq-glass-dim"
      } ${className}`}
      style={style}
    >
      {/* Glass: a lit top edge, and the department's colour glowing faintly inside live agents */}
      {live && <span aria-hidden="true" className="pointer-events-none absolute -top-16 -left-10 size-44 rounded-full opacity-[0.1] blur-3xl" style={{ background: dept.hue }} />}

      <span className="relative flex items-start gap-3">
        <span
          className="grid size-12 shrink-0 place-items-center rounded-2xl border"
          style={live ? { background: `color-mix(in srgb, ${dept.hue} 16%, transparent)`, borderColor: `color-mix(in srgb, ${dept.hue} 35%, transparent)`, color: dept.hue } : { borderColor: "rgb(255 255 255 / 0.12)", color: "rgb(255 255 255 / 0.8)" }}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true" className="size-5 fill-none stroke-current" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
            <path d={ICONS[d]} />
          </svg>
        </span>
        <span className="min-w-0 flex-1">
          <span className="flex items-center justify-between gap-2">
            <span className="font-display text-2xl leading-tight">{dept.name}</span>
            <span className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1 text-[0.875rem] ${live ? "bg-[#FFB38F]/10 text-[#FFB38F]" : "bg-white/[0.06] text-white/75"}`}>
              <LiveDot on={live} /> {live ? "Working" : "Coming soon"}
            </span>
          </span>
          <span className="mt-2 line-clamp-2 text-[1.0625rem] leading-snug text-white">{status(d, s)}</span>
        </span>
      </span>

      {live ? (
        <span className="relative mt-4 grid grid-cols-3 gap-2 border-t border-white/[0.06] pt-3.5">
          {[
            [s.pending, "for you"],
            [s.orders, "orders"],
            [s.done7d, "done this week"],
          ].map(([n, label]) => (
            <span key={label as string}>
              <span className="block font-display text-2xl leading-none tabular-nums">{n}</span>
              <span className="mt-1.5 block text-[0.875rem] text-white/75">{label}</span>
            </span>
          ))}
        </span>
      ) : (
        <span className="relative mt-4 block border-t border-white/[0.06] pt-3 text-[0.9375rem] text-white/70">{PHASE[d]}</span>
      )}
      {live && s.lastAt && <span className="relative mt-2.5 block text-[0.9375rem] text-white/70">Last move {timeAgo(s.lastAt)}</span>}
    </Link>
  );
}
