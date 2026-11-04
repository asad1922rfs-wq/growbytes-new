import type { Department } from "@/lib/db";

/** Shared pieces for the HQ dashboard. */

export const DEPTS: Record<Department, { name: string; agent: string; role: string; skills: string[]; live: boolean; hue: string }> = {
  sales: {
    name: "Sales",
    agent: "Sales agent",
    role: "Reads every inquiry, scores it, and drafts your reply.",
    skills: ["Lead scoring", "Reply drafts", "Follow-ups", "Pipeline"],
    live: true,
    hue: "var(--hq-sales)",
  },
  marketing: {
    name: "Marketing",
    agent: "Marketing agent",
    role: "Plans content and prepares posts for Facebook, Instagram and LinkedIn.",
    skills: ["Content calendar", "Social posts", "SEO report", "Articles"],
    live: false,
    hue: "var(--hq-marketing)",
  },
  projects: {
    name: "Production",
    agent: "Production agent",
    role: "Tracks client projects, tasks and deadlines, and writes status updates.",
    skills: ["Projects", "Tasks", "Deadlines", "Client updates"],
    live: false,
    hue: "var(--hq-projects)",
  },
  operations: {
    name: "Operations",
    agent: "Operations agent",
    role: "Keeps the inbox, invoices and the weekly summary in order.",
    skills: ["Inbox triage", "Invoices", "Weekly summary"],
    live: false,
    hue: "var(--hq-operations)",
  },
};

export function Card({ className = "", children }: { className?: string; children: React.ReactNode }) {
  return <div className={`rounded-[1.25rem] border border-[var(--hq-line)] bg-[var(--hq-panel)] ${className}`}>{children}</div>;
}

export function Pill({ children, tone = "muted" }: { children: React.ReactNode; tone?: "muted" | "orange" | "green" | "red" | "amber" }) {
  const tones = {
    muted: "bg-white/[0.05] text-[var(--hq-muted)]",
    orange: "bg-[#F66135]/15 text-[#FF9470]",
    green: "bg-[#EFE9DF]/10 text-[#EFE9DF]",
    red: "bg-[#FF6B7A]/12 text-[#FF9AA5]",
    amber: "bg-[#FFB38F]/12 text-[#FFB38F]",
  };
  return <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${tones[tone]}`}>{children}</span>;
}

export function LiveDot({ on = true }: { on?: boolean }) {
  return (
    <span className="relative inline-flex size-2">
      {on && <span className="absolute inset-0 animate-ping rounded-full bg-[#FFB38F]/60 motion-reduce:hidden" />}
      <span className={`relative inline-flex size-2 rounded-full ${on ? "bg-[#FFB38F]" : "bg-[var(--hq-dim)]"}`} />
    </span>
  );
}

export function timeAgo(iso: string) {
  const s = Math.max(1, Math.round((Date.now() - new Date(iso).getTime()) / 1000));
  if (s < 60) return "just now";
  const m = Math.round(s / 60);
  if (m < 60) return `${m}m ago`;
  const h = Math.round(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.round(h / 24);
  return d < 30 ? `${d}d ago` : new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short" });
}

export function scoreTone(score: number | null) {
  if (score === null) return "muted" as const;
  if (score >= 70) return "green" as const;
  if (score >= 40) return "amber" as const;
  return "red" as const;
}

export const statusTone: Record<string, "muted" | "orange" | "green" | "red" | "amber"> = {
  new: "orange",
  qualified: "amber",
  contacted: "muted",
  proposal: "amber",
  won: "green",
  lost: "red",
};

export function PageHeader({ title, lead, children }: { title: string; lead?: string; children?: React.ReactNode }) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div className="max-w-2xl">
        <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">{title}</h1>
        {lead && <p className="mt-2 text-[0.9375rem] text-[var(--hq-muted)]">{lead}</p>}
      </div>
      {children}
    </div>
  );
}

export function SectionTitle({ children, aside }: { children: React.ReactNode; aside?: React.ReactNode }) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <h2 className="font-display text-lg font-semibold tracking-tight">{children}</h2>
      {aside}
    </div>
  );
}

export function NotConfigured() {
  return (
    <Card className="p-6 text-sm text-[var(--hq-muted)]">
      The database isn&rsquo;t connected. Set <code className="text-white">DATABASE_URL</code> and run <code className="text-white">npm run db:migrate</code>.
    </Card>
  );
}
