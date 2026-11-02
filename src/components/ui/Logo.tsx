import Link from "next/link";
import { useId } from "react";
import { cn } from "./primitives";

/** Growth mark: four warm blocks rising in a zigzag. They grow up in turn on load and on hover. */
export function LogoMark({ className }: { className?: string; dark?: boolean }) {
  const id = useId().replace(/:/g, "");
  return (
    <svg aria-hidden="true" viewBox="0 0 16 12" className={cn("h-6 w-auto", className)}>
      <defs>
        <linearGradient id={`${id}-0`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#FFC15A" />
          <stop offset="1" stopColor="#F7893A" />
        </linearGradient>
        <linearGradient id={`${id}-1`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#FF8A4C" />
          <stop offset="1" stopColor="#F0563A" />
        </linearGradient>
        <linearGradient id={`${id}-2`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#F2665A" />
          <stop offset="1" stopColor="#D93F5C" />
        </linearGradient>
        <linearGradient id={`${id}-3`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#FFB84D" />
          <stop offset="1" stopColor="#F57A35" />
        </linearGradient>
      </defs>
      <rect className="logo-block" style={{ animationDelay: "0ms" }} x="0" y="7.5" width="4" height="4.5" fill={`url(#${id}-0)`} />
      <rect className="logo-block" style={{ animationDelay: "90ms" }} x="4" y="1.25" width="4" height="6.25" fill={`url(#${id}-1)`} />
      <rect className="logo-block" style={{ animationDelay: "180ms" }} x="8" y="7.5" width="4" height="4.5" fill={`url(#${id}-2)`} />
      <rect className="logo-block" style={{ animationDelay: "270ms" }} x="12" y="0" width="4" height="7.5" fill={`url(#${id}-3)`} />
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
