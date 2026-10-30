import Link from "next/link";
import { cn } from "./primitives";

/** Growth mark: a dark dot, a soft orange bar, and a tall orange bar stepping upward. Each drops in on load, then the dot rolls into the middle bar, which tips onto the tall bar (replayed on hover). */
export function LogoMark({ className, dark }: { className?: string; dark?: boolean }) {
  const ink = dark ? "#F7F7F2" : "#171918";
  return (
    <svg aria-hidden="true" viewBox="0 0 26 24" className={cn("h-6 w-auto", className)}>
      <circle className="logo-ball" cx="3.5" cy="18.5" r="3.5" fill={ink} />
      <rect className="logo-mid" x="9.5" y="10" width="6.5" height="12" rx="1.75" fill="#E8875F" />
      <rect className="logo-tall" x="19" y="1" width="6.5" height="21" rx="1.75" fill="#F66135" />
    </svg>
  );
}

export function Logo({ className, dark }: { className?: string; dark?: boolean }) {
  return (
    <Link
      href="/"
      className={cn("logo-link inline-flex items-center gap-2.5 font-extrabold tracking-[-0.035em]", dark ? "text-white" : "text-ink", className)}
    >
      <LogoMark dark={dark} />
      <span className="text-[1.375rem] leading-none sm:text-[1.5rem]">
        Growbytes<span className="sr-only"> home</span>
      </span>
    </Link>
  );
}
