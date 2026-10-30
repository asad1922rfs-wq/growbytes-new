import type { ReactNode } from "react";
import { cn } from "@/components/ui/primitives";

/**
 * Illustration wrapper: exposes one accessible description and hides the
 * decorative interior (mock UI text is not page content).
 */
export function Illustration({
  label,
  className,
  children,
}: {
  label: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div role="img" aria-label={label} className={cn("relative select-none", className)}>
      <div aria-hidden="true" className="contents">
        {children}
      </div>
    </div>
  );
}

export function BrowserFrame({
  url,
  className,
  children,
  dark,
}: {
  url: string;
  className?: string;
  children: ReactNode;
  dark?: boolean;
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-lg border shadow-float",
        dark ? "border-white/10 bg-ink-soft" : "border-line bg-white",
        className,
      )}
    >
      <div className={cn("flex items-center gap-3 border-b px-3 py-2", dark ? "border-white/10" : "border-line bg-paper")}>
        <div className="flex gap-1.5">
          <span className="size-2 rounded-full bg-[#e2643f]/70" />
          <span className="size-2 rounded-full bg-[#d9b54a]/70" />
          <span className="size-2 rounded-full bg-[#6aa37f]/70" />
        </div>
        <div
          className={cn(
            "flex-1 truncate rounded-sm px-2 py-0.5 text-center text-[9px] font-medium",
            dark ? "bg-white/5 text-muted-on-dark" : "bg-white text-muted",
          )}
        >
          {url}
        </div>
      </div>
      {children}
    </div>
  );
}

export function Bar({ w, className }: { w: string; className?: string }) {
  return <span className={cn("block h-1.5 rounded-full bg-ink/10", className)} style={{ width: w }} />;
}

export function SampleTag({ children = "Sample data", className }: { children?: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-sm border border-dashed border-accent-strong/50 bg-accent-tint px-1.5 py-0.5 text-[8px] font-bold tracking-wide text-accent-strong uppercase",
        className,
      )}
    >
      {children}
    </span>
  );
}
