import type { ServiceSlug } from "@/content/types";
import { cn } from "@/components/ui/primitives";

/**
 * Growbytes icon family.
 * Rules: 32×32 viewBox, 2px stroke, round caps and joins, currentColor for the
 * main drawing, one orange accent element per icon. Decorative by default.
 */
export type IconName =
  | ServiceSlug
  | "discovery"
  | "planning"
  | "build"
  | "improve"
  | "scope"
  | "handover"
  | "milestones"
  | "measure"
  | "together"
  | "engage-defined"
  | "engage-ongoing"
  | "engage-phased"
  | "ai-inquiry"
  | "ai-connected"
  | "ai-oversight"
  | "ai-secure";

const ACCENT = "#F66135";

export function GbIcon({
  name,
  className,
  title,
}: {
  name: IconName;
  className?: string;
  /** Provide only when the icon is the sole content of a control. */
  title?: string;
}) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      // Default 32px unless the caller sets a size (avoids two conflicting size utilities).
      className={cn("shrink-0", !/(^|\s)size-/.test(className ?? "") && "size-8", className)}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
    >
      {title && <title>{title}</title>}
      {paths[name]}
    </svg>
  );
}

const paths: Record<IconName, React.ReactNode> = {
  /* Services */
  "web-design-development": (
    <>
      <rect x="4" y="6" width="24" height="20" rx="3" />
      <path d="M4 11h24" />
      <path d="M9 16h8M9 20h5" />
      <rect x="20" y="15" width="4" height="6" rx="1" stroke={ACCENT} />
    </>
  ),
  "shopify-development": (
    <>
      <path d="M7 11h18l-1.6 13.2A2 2 0 0 1 21.4 26H10.6a2 2 0 0 1-2-1.8z" />
      <path d="M12 11V9a4 4 0 0 1 8 0v2" />
      <path d="M12.5 18.5l2.5 2.5 4.5-4.5" stroke={ACCENT} />
    </>
  ),
  "custom-software-development": (
    <>
      <rect x="4" y="5" width="24" height="16" rx="3" />
      <path d="M11 27h10M16 21v6" />
      <path d="M12 10l-3 3 3 3M20 10l3 3-3 3" />
      <path d="M17.2 9.5l-2.4 7" stroke={ACCENT} />
    </>
  ),
  seo: (
    <>
      <circle cx="14" cy="14" r="8" />
      <path d="M20 20l7 7" />
      <path d="M10.5 16.5l2.5-3 2 2 3-4" stroke={ACCENT} />
    </>
  ),
  "paid-advertising": (
    <>
      <path d="M5 13v6a2 2 0 0 0 2 2h3l9 5V6l-9 5H7a2 2 0 0 0-2 2z" />
      <path d="M10 21l1.5 5" />
      <path d="M24 12a5 5 0 0 1 0 8" stroke={ACCENT} />
    </>
  ),
  branding: (
    <>
      <circle cx="16" cy="16" r="11" />
      <path d="M16 5v22" />
      <path d="M16 5a11 11 0 0 1 0 22" fill={ACCENT} stroke={ACCENT} />
    </>
  ),
  "ai-automation": (
    <>
      <rect x="4" y="12" width="8" height="8" rx="2" />
      <rect x="20" y="12" width="8" height="8" rx="2" />
      <path d="M12 16h8" />
      <path d="M16 4l1.4 3.1L20.5 8.5l-3.1 1.4L16 13l-1.4-3.1-3.1-1.4 3.1-1.4z" stroke={ACCENT} />
      <path d="M8 20v4h16v-4" />
    </>
  ),

  "crm-integrations": (
    <>
      <rect x="4" y="5" width="10" height="9" rx="2" />
      <rect x="18" y="18" width="10" height="9" rx="2" />
      <path d="M9 14v4a3 3 0 0 0 3 3h6" />
      <path d="M23 18v-4a3 3 0 0 0-3-3h-6" stroke={ACCENT} />
    </>
  ),
  "conversion-optimization": (
    <>
      <path d="M5 6h22l-8 9v8l-6 3V15z" />
      <path d="M20 24l3 3 5-6" stroke={ACCENT} />
    </>
  ),

  "mobile-app-development": (
    <>
      <rect x="9" y="3" width="14" height="26" rx="3" />
      <path d="M14 25h4" />
      <rect x="12.5" y="8" width="7" height="7" rx="1.5" stroke={ACCENT} />
    </>
  ),
  "ui-ux-design": (
    <>
      <rect x="4" y="6" width="24" height="20" rx="3" />
      <path d="M4 11h24M11 11v15" />
      <path d="M15 16h9M15 20h6" />
      <path d="M21 19l4 7 1.2-2.8L29 22z" fill={ACCENT} stroke={ACCENT} strokeWidth="1.5" />
    </>
  ),
  "email-marketing": (
    <>
      <rect x="4" y="7" width="24" height="18" rx="3" />
      <path d="M4 10l12 8 12-8" />
      <path d="M20 21h8M24 17v8" stroke={ACCENT} />
    </>
  ),

  /* Process */
  discovery: (
    <>
      <path d="M6 7h14a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-8l-5 4v-4H6a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2z" />
      <path d="M22 12h4a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-1v3l-4-3h-5" />
      <path d="M9 12h8M9 15.5h5" stroke={ACCENT} />
    </>
  ),
  planning: (
    <>
      <rect x="5" y="5" width="22" height="22" rx="3" />
      <path d="M5 12h22M12 12v15" />
      <path d="M16 17h7M16 21h5" stroke={ACCENT} />
    </>
  ),
  build: (
    <>
      <rect x="4" y="6" width="24" height="17" rx="3" />
      <path d="M4 27h24" />
      <path d="M13 11l-3 3.5 3 3.5M19 11l3 3.5-3 3.5" stroke={ACCENT} />
    </>
  ),
  improve: (
    <>
      <path d="M5 26h22" />
      <path d="M8 22v-5M14 22v-8M20 22V11" />
      <path d="M24 13l3-3 0 0M27 10v4M27 10h-4" stroke={ACCENT} />
      <path d="M20 11l7-1" stroke={ACCENT} />
    </>
  ),

  /* Principles */
  scope: (
    <>
      <path d="M9 4h10l6 6v16a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" />
      <path d="M19 4v6h6" />
      <path d="M11 17l2.5 2.5L19 14" stroke={ACCENT} />
    </>
  ),
  together: (
    <>
      <circle cx="12" cy="16" r="7" />
      <circle cx="20" cy="16" r="7" stroke={ACCENT} />
    </>
  ),
  milestones: (
    <>
      <path d="M4 22h24" />
      <circle cx="8" cy="22" r="2.5" />
      <circle cx="16" cy="22" r="2.5" />
      <circle cx="24" cy="22" r="2.5" fill={ACCENT} stroke={ACCENT} />
      <path d="M24 19V7l-5 3 5 3" stroke={ACCENT} />
    </>
  ),
  handover: (
    <>
      <rect x="5" y="9" width="22" height="17" rx="3" />
      <path d="M12 9V7a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      <path d="M5 16h22" />
      <path d="M14 16v3h4v-3" stroke={ACCENT} />
    </>
  ),
  measure: (
    <>
      <circle cx="16" cy="16" r="11" />
      <circle cx="16" cy="16" r="6" />
      <circle cx="16" cy="16" r="1.5" fill={ACCENT} stroke={ACCENT} />
      <path d="M16 16l7-7" stroke={ACCENT} />
    </>
  ),

  /* Engagement models */
  "engage-defined": (
    <>
      {/* Project brief with a completion mark */}
      <path d="M8 4h11l5 5v17a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" />
      <path d="M19 4v5h5" />
      <path d="M10 13h6M10 17h4" />
      <circle cx="21" cy="22" r="5" fill="#fff" stroke={ACCENT} />
      <path d="M19 22l1.5 1.5 2.5-3" stroke={ACCENT} />
    </>
  ),
  "engage-ongoing": (
    <>
      {/* Iteration loop around an adjustment slider */}
      <path d="M26 13a11 11 0 0 0-19.5-3.5M6 19a11 11 0 0 0 19.5 3.5" />
      <path d="M6.5 4.5v5h5M25.5 27.5v-5h-5" />
      <path d="M11 16h10" />
      <circle cx="18" cy="16" r="2.25" fill="#fff" stroke={ACCENT} />
    </>
  ),
  "engage-phased": (
    <>
      {/* Three connected milestones, rising */}
      <rect x="3" y="20" width="7" height="7" rx="2" />
      <rect x="12.5" y="13" width="7" height="7" rx="2" />
      <rect x="22" y="6" width="7" height="7" rx="2" stroke={ACCENT} />
      <path d="M10 23.5h2.5a2 2 0 0 0 2-2V20M19.5 16.5H22a2 2 0 0 0 2-2V13" />
    </>
  ),

  /* AI & automation capabilities */
  "ai-inquiry": (
    <>
      {/* Inbox tray with one message routed out to the right */}
      <path d="M4 17l3-10h12l3 10" />
      <path d="M4 17v7a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7h-5l-2 3h-4l-2-3z" />
      <path d="M22 11h6M25 8l3 3-3 3" stroke={ACCENT} />
    </>
  ),
  "ai-connected": (
    <>
      {/* Two systems linked by a two-way sync */}
      <rect x="3" y="6" width="10" height="20" rx="2.5" />
      <rect x="19" y="6" width="10" height="20" rx="2.5" />
      <path d="M13 13h6M17 11l2 2-2 2" stroke={ACCENT} />
      <path d="M19 19h-6M15 17l-2 2 2 2" stroke={ACCENT} />
    </>
  ),
  "ai-oversight": (
    <>
      {/* A person with a review flag */}
      <circle cx="13" cy="11" r="5" />
      <path d="M4 27c.8-5 4.4-8 9-8s8.2 3 9 8" />
      <path d="M23 4v10" stroke={ACCENT} />
      <path d="M23 4h6l-1.5 2.5L29 9h-6" stroke={ACCENT} />
    </>
  ),
  "ai-secure": (
    <>
      {/* Padlock with an orange keyhole */}
      <rect x="6" y="14" width="20" height="14" rx="3" />
      <path d="M10 14v-3a6 6 0 0 1 12 0v3" />
      <path d="M16 19v4" stroke={ACCENT} />
      <circle cx="16" cy="19" r="1.5" fill={ACCENT} stroke={ACCENT} />
    </>
  ),
};
