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
                <path d={edge(d)} fill="none" stroke="var(--hq-line)" strokeWidth="1.5" strokeDasharray={live ? undefined : "4 6"} />
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

function Node({ d, s, className = "", style }: { d: Department; s: Overview["byDept"][Department]; className?: string; style?: React.CSSProperties }) {
  const dept = DEPTS[d];
  return (
    <Link
      href={d === "sales" ? "/admin/leads/" : "/admin/agents/"}
      className={`group block rounded-[1.25rem] border bg-[var(--hq-panel)]/90 p-4 backdrop-blur transition-colors hover:bg-[var(--hq-raised)] ${dept.live ? "border-[var(--hq-line)]" : "border-dashed border-[var(--hq-line)]"} ${className}`}
      style={style}
    >
      <span className="flex items-center gap-2.5">
        <span className="grid size-8 place-items-center rounded-lg font-display text-sm font-medium text-[var(--hq-night)]" style={{ background: dept.live ? dept.hue : "var(--hq-line)" }}>
          {dept.name.slice(0, 1)}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block font-display text-xl leading-tight">{dept.name}</span>
          <span className="flex items-center gap-1.5 text-[0.8125rem] text-[var(--hq-muted)]">
            <LiveDot on={dept.live} /> {dept.live ? "Working" : "Coming soon"}
          </span>
        </span>
      </span>
      <span className={`mt-3 block truncate text-[0.9375rem] ${s.pending ? "text-white" : "text-[var(--hq-muted)]"}`}>{status(d, s)}</span>
      {s.lastAt && dept.live && <span className="mt-1 block text-[0.8125rem] text-[var(--hq-dim)]">Last move {timeAgo(s.lastAt)}</span>}
    </Link>
  );
}
