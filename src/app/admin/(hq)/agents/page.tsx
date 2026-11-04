import { departments } from "@/lib/db";
import { getOverview } from "@/lib/admin/data";
import { Card, DEPTS, LiveDot, PageHeader, Pill } from "../ui";

export const metadata = { title: "Agents" };

const howToRun: Record<string, string> = {
  sales: "In Claude Code: “run the sales agent”. It scores new leads and drafts replies for you to approve.",
  marketing: "Arrives in Phase 2: content calendar, posts and the weekly SEO report.",
  projects: "Arrives in Phase 3: projects, tasks and client updates.",
  operations: "Arrives in Phase 3: inbox triage, invoices and the weekly summary.",
};

export default async function AgentsPage() {
  const o = await getOverview();
  return (
    <div className="space-y-8">
      <PageHeader eyebrow="Your team" title="Agents" />
      <p className="max-w-2xl text-sm text-white/50">
        Each department is a Claude agent with its own skills. They prepare the work; you decide what goes out.
      </p>
      <div className="grid gap-4 lg:grid-cols-2">
        {departments.map((d) => {
          const dept = DEPTS[d];
          const s = o.byDept[d];
          return (
            <Card key={d} className="relative overflow-hidden p-6">
              <span aria-hidden="true" className="absolute -top-16 -right-16 size-44 rounded-full opacity-20 blur-3xl" style={{ background: dept.hue }} />
              <div className="relative flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="grid size-11 place-items-center rounded-2xl text-lg font-extrabold text-[#0B0C0C]" style={{ background: dept.hue }}>
                    {dept.name.slice(0, 1)}
                  </span>
                  <div>
                    <p className="text-lg font-extrabold">{dept.name} agent</p>
                    <p className="text-xs text-white/45">{dept.live ? "Running on Claude" : "Not switched on yet"}</p>
                  </div>
                </div>
                {dept.live ? (
                  <Pill tone="green">
                    <LiveDot /> Live
                  </Pill>
                ) : (
                  <Pill>Coming soon</Pill>
                )}
              </div>
              <p className="relative mt-4 text-sm leading-relaxed text-white/65">{dept.role}</p>
              <div className="relative mt-4 flex flex-wrap gap-1.5">
                {dept.skills.map((k) => (
                  <span key={k} className="rounded-full border border-white/10 px-2.5 py-1 text-[0.6875rem] text-white/60">
                    {k}
                  </span>
                ))}
              </div>
              <div className="relative mt-5 grid grid-cols-2 gap-3 border-t border-white/[0.06] pt-4 text-sm">
                <p>
                  <b className="text-xl tabular-nums">{s.pending}</b> <span className="text-white/45">waiting for you</span>
                </p>
                <p>
                  <b className="text-xl tabular-nums">{s.done7d}</b> <span className="text-white/45">done this week</span>
                </p>
              </div>
              <p className="relative mt-4 text-xs text-white/40">{howToRun[d]}</p>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
