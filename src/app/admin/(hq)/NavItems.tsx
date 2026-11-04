"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  { href: "/admin/", label: "Command room", icon: "M4 13h6V4H4v9Zm0 7h6v-5H4v5Zm10 0h6v-9h-6v9Zm0-16v5h6V4h-6Z" },
  { href: "/admin/approvals/", label: "Approvals", icon: "M9 12.5 11 14.5l4-5M12 21a9 9 0 1 1 0-18 9 9 0 0 1 0 18Z" },
  { href: "/admin/leads/", label: "Leads", icon: "M16 19v-1.5a3.5 3.5 0 0 0-3.5-3.5h-5A3.5 3.5 0 0 0 4 17.5V19M10 10.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM20 19v-1.5a3.5 3.5 0 0 0-2.5-3.35M15.5 4.6a3 3 0 0 1 0 5.8" },
  { href: "/admin/agents/", label: "Agents", icon: "M12 3v2m0 14v2M5 12H3m18 0h-2M7 7h10v10H7V7Zm3 3h4v4h-4v-4Z" },
];

export function NavItems({ compact }: { compact?: boolean }) {
  const path = usePathname();
  const active = (href: string) => (href === "/admin/" ? path === "/admin" || path === "/admin/" : path.startsWith(href.replace(/\/$/, "")));
  if (compact)
    return (
      <nav className="flex gap-1 overflow-x-auto">
        {items.map((i) => (
          <Link key={i.href} href={i.href} className={`rounded-lg px-2.5 py-1.5 text-xs font-semibold whitespace-nowrap ${active(i.href) ? "bg-white/10 text-white" : "text-white/50"}`}>
            {i.label}
          </Link>
        ))}
      </nav>
    );
  return (
    <nav className="mt-10 space-y-1">
      {items.map((i) => (
        <Link
          key={i.href}
          href={i.href}
          className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition ${active(i.href) ? "bg-[var(--hq-raised)] text-white" : "text-white/50 hover:bg-white/[0.04] hover:text-white"}`}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true" className={`size-[1.125rem] fill-none stroke-current ${active(i.href) ? "text-[var(--hq-operations)]" : ""}`} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d={i.icon} />
          </svg>
          {i.label}
        </Link>
      ))}
    </nav>
  );
}
