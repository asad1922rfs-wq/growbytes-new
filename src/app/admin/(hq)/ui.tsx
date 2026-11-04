import type { Department } from "@/lib/db";

/** Shared pieces for the HQ dashboard. */

export const DEPTS: Record<Department, { name: string; role: string; skills: string[]; live: boolean; hue: string }> = {
  sales: {
    name: "Sales",
    role: "Reads every inquiry, scores it, and drafts your reply.",
    skills: ["Lead scoring", "Reply drafts", "Follow-ups", "Pipeline"],
    live: true,
    hue: "#F66135",
  },
  marketing: {
    name: "Marketing",
    role: "Plans content and prepares posts for Facebook, Instagram and LinkedIn.",
    skills: ["Content calendar", "Social posts", "SEO report", "Articles"],
    live: false,
    hue: "#E8B04B",
  },
  projects: {
    name: "Production",
    role: "Tracks client projects, tasks and deadlines, and writes status updates.",
    skills: ["Projects", "Tasks", "Deadlines", "Client updates"],
    live: false,
    hue: "#5FB3A1",
  },
  operations: {
    name: "Operations",
    role: "Keeps the inbox, invoices and the weekly summary in order.",
    skills: ["Inbox triage", "Invoices", "Weekly summary"],
    live: false,
    hue: "#8C9EFF",
  },
};

export function Card({ className = "", children }: { className?: string; children: React.ReactNode }) {
  return <div className={`rounded-2xl border border-white/[0.08] bg-white/[0.025] ${className}`}>{children}</div>;
}

export function Pill({ children, tone = "muted" }: { children: React.ReactNode; tone?: "muted" | "orange" | "green" | "red" | "amber" }) {
  const tones = {
    muted: "bg-white/[0.06] text-white/60",
    orange: "bg-[#F66135]/15 text-[#FF9470]",
    green: "bg-emerald-400/10 text-emerald-300",
    red: "bg-red-400/10 text-red-300",
    amber: "bg-amber-300/10 text-amber-200",
  };
  return <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[0.6875rem] font-semibold ${tones[tone]}`}>{children}</span>;
}

export function LiveDot({ on = true }: { on?: boolean }) {
  return (
    <span className="relative inline-flex size-2">
      {on && <span className="absolute inset-0 animate-ping rounded-full bg-emerald-400/60" />}
      <span className={`relative inline-flex size-2 rounded-full ${on ? "bg-emerald-400" : "bg-white/25"}`} />
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

export function PageHeader({ eyebrow, title, children }: { eyebrow: string; title: string; children?: React.ReactNode }) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div>
        <p className="text-[0.6875rem] font-bold tracking-[0.18em] text-[#F66135] uppercase">{eyebrow}</p>
        <h1 className="mt-2 text-2xl font-extrabold tracking-tight sm:text-3xl">{title}</h1>
      </div>
      {children}
    </div>
  );
}

export function NotConfigured() {
  return (
    <Card className="p-6 text-sm text-white/60">
      The database isn&rsquo;t connected. Set <code className="text-white">DATABASE_URL</code> and run <code className="text-white">npm run db:migrate</code>.
    </Card>
  );
}
