"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LEFT = [
  { href: "/admin/", label: "Command room", short: "Room" },
  { href: "/admin/approvals/", label: "Approvals", short: "Desk" },
];
const RIGHT = [
  { href: "/admin/leads/", label: "Leads", short: "Leads" },
  { href: "/admin/agents/", label: "Agents", short: "Agents" },
];

/** Header navigation, split either side of the centre mark. */
export function NavItems({ side }: { side: "left" | "right" }) {
  const path = usePathname();
  const active = (href: string) => (href === "/admin/" ? path === "/admin" || path === "/admin/" : path.startsWith(href.replace(/\/$/, "")));
  const items = side === "left" ? LEFT : RIGHT;
  return (
    <nav aria-label={side === "left" ? "Main" : "Records"} className={`flex min-w-0 gap-1 ${side === "right" ? "justify-end" : ""}`}>
      {items.map((i) => (
        <Link
          key={i.href}
          href={i.href}
          aria-current={active(i.href) ? "page" : undefined}
          className={`relative rounded-full px-2 py-1.5 text-[0.8125rem] font-medium whitespace-nowrap transition-colors sm:px-3 sm:text-sm ${active(i.href) ? "text-white" : "text-[var(--hq-muted)] hover:text-white"}`}
        >
          <span className="sm:hidden">{i.short}</span>
          <span className="hidden sm:inline">{i.label}</span>
          {active(i.href) && <span aria-hidden="true" className="absolute inset-x-3 -bottom-[1.15rem] h-0.5 rounded-full bg-[var(--hq-orange)]" />}
        </Link>
      ))}
    </nav>
  );
}
