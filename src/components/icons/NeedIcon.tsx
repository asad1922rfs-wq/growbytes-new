import { cn } from "@/components/ui/primitives";

/**
 * Larger companions to GbIcon for the homepage "next step" section.
 * Drawn on a 48×48 grid with a 1.75 stroke so they read as thin outlines at
 * 48–56px, matching the mega-menu icons' weight. One orange accent each.
 */
export type NeedIconName = "presence" | "inquiries" | "operations";

const ACCENT = "#F66135";

export function NeedIcon({ name, className }: { name: NeedIconName; className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("size-13 shrink-0", className)}
    >
      {name === "presence" && (
        <>
          {/* A clear page: window, image tile, copy, and a call to action */}
          <rect x="4" y="7" width="40" height="34" rx="5" />
          <path d="M4 14.5h40" />
          <circle cx="9" cy="10.8" r="1" fill="currentColor" stroke="none" />
          <circle cx="12.6" cy="10.8" r="1" fill="currentColor" stroke="none" />
          <rect x="9.5" y="19.5" width="13" height="15" rx="2.5" fill={ACCENT} fillOpacity="0.16" stroke={ACCENT} />
          <circle cx="16" cy="25" r="2.2" fill={ACCENT} stroke="none" />
          <path d="M27 21h12M27 25.5h9" />
          <rect x="27" y="30" width="10" height="4.5" rx="2.25" fill={ACCENT} stroke={ACCENT} />
        </>
      )}
      {name === "inquiries" && (
        <>
          {/* A conversation started from a search */}
          <path d="M8 8h26a4 4 0 0 1 4 4v15a4 4 0 0 1-4 4H19l-7 6v-6H8a4 4 0 0 1-4-4V12a4 4 0 0 1 4-4z" />
          <circle cx="14.5" cy="19.5" r="1.8" fill={ACCENT} stroke="none" />
          <circle cx="21" cy="19.5" r="1.8" fill={ACCENT} stroke="none" />
          <circle cx="27.5" cy="19.5" r="1.8" fill={ACCENT} stroke="none" />
          <circle cx="36" cy="35" r="8" fill={ACCENT} fillOpacity="0.16" stroke={ACCENT} />
          <circle cx="35" cy="34" r="3.2" stroke={ACCENT} strokeWidth="2" />
          <path d="M37.4 36.4l2.6 2.6" stroke={ACCENT} strokeWidth="2.2" />
        </>
      )}
      {name === "operations" && (
        <>
          {/* Task in, automated step, done: stepping diagonally */}
          <rect x="4" y="4" width="17" height="13" rx="3" />
          <path d="M8 9h9M8 12.5h5.5" />
          <path d="M12.5 17v4.5a3 3 0 0 0 3 3h2" />
          <rect x="17.5" y="17.5" width="14" height="14" rx="4" fill={ACCENT} fillOpacity="0.16" stroke={ACCENT} />
          <path d="M25.6 20.5l-4.2 5.6h3.4l-1.4 4.4 4.2-5.6h-3.4z" fill={ACCENT} stroke={ACCENT} strokeWidth="1" />
          <path d="M31.5 24.5h2a3 3 0 0 1 3 3V31" />
          <rect x="27" y="31" width="17" height="13" rx="3" />
          <path d="M31.5 37.5l2.4 2.4 5-5.4" />
        </>
      )}
    </svg>
  );
}
