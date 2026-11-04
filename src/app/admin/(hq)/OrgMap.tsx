import Link from "next/link";
import { departments, type Department } from "@/lib/db";
import type { Overview } from "@/lib/admin/data";
import { DEPTS, LiveDot, timeAgo } from "./ui";

/**
 * The organisation as a map: you in the middle, each department's agent
 * around you. Work waiting for you travels in along the lines; open orders
 * travel out to the agent that will do them.
 */
const W = 1000;
const H = 440;
const YOU = { x: 500, y: 220 };
const POS: Record<Department, { x: number; y: number }> = {
  sales: { x: 165, y: 92 },
  marketing: { x: 835, y: 92 },
  projects: { x: 165, y: 348 },
  operations: { x: 835, y: 348 },
};

function edge(d: Department) {
  const p = POS[d];
  const mx = (p.x + YOU.x) / 2;
  return `M ${p.x} ${p.y} C ${mx} ${p.y}, ${mx} ${YOU.y}, ${YOU.x} ${YOU.y}`;
}
function edgeOut(d: Department) {
  const p = POS[d];
  const mx = (p.x + YOU.x) / 2;
  return `M ${YOU.x} ${YOU.y} C ${mx} ${YOU.y}, ${mx} ${p.y}, ${p.x} ${p.y}`;
}

function status(d: Department, s: Overview["byDept"][Department]) {
  if (!DEPTS[d].live) return "Waiting to be switched on";
  if (s.pending) return `Sent you ${s.pending} thing${s.pending === 1 ? "" : "s"} to decide`;
  if (s.orders) return `Working on ${s.orders} order${s.orders === 1 ? "" : "s"} from you`;
  return s.last ?? "Standing by";
}

export function OrgMap({ o }: { o: Overview }) {
  return (
    <>
      {/* Wide screens: the map */}
      <div className="relative hidden aspect-[1000/440] w-full md:block">
        <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 size-full" aria-hidden="true">
          <defs>
            <radialGradient id="you-glow">
              <stop offset="0" stopColor="#F66135" stopOpacity="0.35" />
              <stop offset="1" stopColor="#F66135" stopOpacity="0" />
            </radialGradient>
          </defs>
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
                  <circle r="3.5" fill="none" stroke={DEPTS[d].hue} strokeWidth="1.5" className="hq-packet" style={{ offsetPath: `path("${edgeOut(d)}")`, animationDuration: "4.6s" }} />
                )}
              </g>
            );
          })}
          <circle cx={YOU.x} cy={YOU.y} r="120" fill="url(#you-glow)" />
          {o.pending > 0 && <circle cx={YOU.x} cy={YOU.y} r="54" fill="none" stroke="#F66135" strokeWidth="1.5" className="hq-you-ring" />}
          <circle cx={YOU.x} cy={YOU.y} r="54" fill="var(--hq-raised)" stroke={o.pending ? "#F66135" : "var(--hq-line)"} strokeWidth="1.5" />
        </svg>

        <Link
          href="/admin/approvals/"
          className="absolute grid size-[10.8%] min-h-24 min-w-24 -translate-x-1/2 -translate-y-1/2 place-content-center rounded-full text-center"
          style={{ left: `${(YOU.x / W) * 100}%`, top: `${(YOU.y / H) * 100}%` }}
        >
          <span className="font-display text-xl font-bold">You</span>
          <span className={`text-xs ${o.pending ? "text-[#FF9470]" : "text-[var(--hq-muted)]"}`}>{o.pending ? `${o.pending} to decide` : "nothing waiting"}</span>
        </Link>

        {departments.map((d) => (
          <Node key={d} d={d} s={o.byDept[d]} className="absolute w-[25%] -translate-x-1/2 -translate-y-1/2" style={{ left: `${(POS[d].x / W) * 100}%`, top: `${(POS[d].y / H) * 100}%` }} />
        ))}
      </div>

      {/* Phones: you on top, your agents below */}
      <div className="space-y-3 md:hidden">
        <Link href="/admin/approvals/" className="flex items-center gap-4 rounded-[1.25rem] border border-[var(--hq-line)] bg-[var(--hq-raised)] p-4">
          <span className={`grid size-12 place-items-center rounded-full border font-display font-bold ${o.pending ? "border-[#F66135]" : "border-[var(--hq-line)]"}`}>You</span>
          <span className={`text-sm ${o.pending ? "text-[#FF9470]" : "text-[var(--hq-muted)]"}`}>{o.pending ? `${o.pending} to decide` : "Nothing waiting for you"}</span>
        </Link>
        {departments.map((d) => (
          <Node key={d} d={d} s={o.byDept[d]} />
        ))}
      </div>
    </>
  );
}

function Node({ d, s, className = "", style }: { d: Department; s: Overview["byDept"][Department]; className?: string; style?: React.CSSProperties }) {
  const dept = DEPTS[d];
  return (
    <Link
      href={dept.live ? (d === "sales" ? "/admin/leads/" : "/admin/agents/") : "/admin/agents/"}
      className={`group block rounded-[1.25rem] border bg-[var(--hq-panel)]/95 p-4 backdrop-blur transition-colors hover:bg-[var(--hq-raised)] ${dept.live ? "border-[var(--hq-line)]" : "border-dashed border-[var(--hq-line)]"} ${className}`}
      style={style}
    >
      <span className="flex items-center gap-2.5">
        <span className="grid size-8 place-items-center rounded-lg font-display text-sm font-bold text-[var(--hq-night)]" style={{ background: dept.live ? dept.hue : "var(--hq-line)" }}>
          {dept.name.slice(0, 1)}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block font-display font-semibold leading-tight">{dept.name}</span>
          <span className="flex items-center gap-1.5 text-xs text-[var(--hq-muted)]">
            <LiveDot on={dept.live} /> {dept.live ? "Agent live" : "Not on yet"}
          </span>
        </span>
      </span>
      <span className={`mt-3 block truncate text-[0.8125rem] ${s.pending ? "text-white" : "text-[var(--hq-muted)]"}`}>{status(d, s)}</span>
      {s.lastAt && dept.live && <span className="mt-0.5 block text-[0.6875rem] text-[var(--hq-dim)]">Last move {timeAgo(s.lastAt)}</span>}
    </Link>
  );
}
