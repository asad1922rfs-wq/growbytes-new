import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

export function cn(...parts: (string | false | null | undefined)[]) {
  return parts.filter(Boolean).join(" ");
}

export function Container({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <div className={cn("mx-auto w-full max-w-site px-[var(--spacing-gutter)]", className)}>{children}</div>
  );
}

type Tone = "paper" | "white" | "surface" | "ink";

const toneClass: Record<Tone, string> = {
  paper: "bg-paper text-ink",
  white: "bg-white text-ink",
  surface: "bg-surface text-ink",
  ink: "on-dark bg-ink text-paper",
};

export function Section({
  tone = "paper",
  size = "lg",
  className,
  children,
  ...rest
}: {
  tone?: Tone;
  size?: "lg" | "sm" | "none";
  className?: string;
  children: ReactNode;
} & Omit<ComponentProps<"section">, "className" | "children">) {
  const pad = size === "lg" ? "py-section" : size === "sm" ? "py-section-sm" : "";
  return (
    <section className={cn(toneClass[tone], pad, className)} {...rest}>
      {children}
    </section>
  );
}

export function Eyebrow({ children, className, dark }: { children: ReactNode; className?: string; dark?: boolean }) {
  return (
    <p
      className={cn(
        "flex items-center text-eyebrow font-extrabold uppercase",
        dark ? "text-white/70" : "text-[#4a525a]",
        className,
      )}
    >
      {children}
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  id,
  dark,
  className,
  as: As = "h2",
}: {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  id?: string;
  dark?: boolean;
  className?: string;
  as?: "h1" | "h2";
}) {
  return (
    <div className={cn("max-w-3xl", className)}>
      {eyebrow && <Eyebrow dark={dark}>{eyebrow}</Eyebrow>}
      <As id={id} className={cn("font-bold", As === "h1" ? "text-h1" : "text-h2", eyebrow && "mt-4")}>
        {title}
      </As>
      {intro && (
        <p className={cn("mt-5 max-w-2xl text-lead", dark ? "text-muted-on-dark" : "text-muted")}>{intro}</p>
      )}
    </div>
  );
}

type ButtonVariant = "primary" | "brand" | "accent" | "secondary" | "ghost-dark";

const buttonClass: Record<ButtonVariant, string> = {
  primary: "bg-ink text-white hover:bg-ink-soft",
  /* Orange CTA: white on #D2461F = 4.5:1, hover #C2401B = 5.2:1 */
  brand: "bg-accent-button text-white hover:bg-accent-strong",
  accent: "bg-accent-strong text-white hover:bg-[#a83618]",
  secondary: "border border-ink/20 bg-transparent text-ink hover:border-ink hover:bg-white",
  "ghost-dark": "border border-white/25 text-white hover:border-white hover:bg-white/5",
};

export function buttonStyles(variant: ButtonVariant = "primary", className?: string) {
  return cn(
    "inline-flex min-h-12 items-center justify-center gap-2 rounded-md px-5 py-3 text-[1.0625rem] font-bold leading-tight",
    "transition-colors duration-[var(--duration-fast)] ease-[var(--ease-out-soft)]",
    buttonClass[variant],
    className,
  );
}

export function ButtonLink({
  href,
  variant = "primary",
  className,
  children,
  arrow = false,
}: {
  href: string;
  variant?: ButtonVariant;
  className?: string;
  children: ReactNode;
  arrow?: boolean;
}) {
  return (
    <Link href={href} className={cn(buttonStyles(variant, className), "group")}>
      {children}
      {arrow && <ArrowIcon className="transition-transform duration-[var(--duration-base)] group-hover:translate-x-0.5" />}
    </Link>
  );
}

export function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" width="16" height="16" className={cn("shrink-0", className)} fill="none">
      <path d="M3 8h9.5M8.5 4l4 4-4 4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Text link with arrow. Pass descriptive children; avoid "learn more". */
export function ArrowLink({
  href,
  children,
  className,
  dark,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  dark?: boolean;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex items-center gap-2 font-bold underline decoration-1 underline-offset-[6px]",
        dark ? "text-white decoration-accent" : "text-ink decoration-accent-strong",
        "hover:decoration-2",
        className,
      )}
    >
      {children}
      <GrowArrow />
    </Link>
  );
}

/**
 * Arrow whose shaft lengthens when its parent `.group` is hovered or focused.
 * One SVG, one coordinate system (24×12, drawn 1:1 in px): the shaft scales from
 * its left end and the head moves to its tip, so the two always meet exactly.
 * The box is sized for the longest state, so the growth never shifts layout.
 */
export function GrowArrow({ className }: { className?: string }) {
  const motion =
    "transition-transform duration-[var(--duration-base)] ease-[var(--ease-out-soft)] motion-reduce:transition-none";
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 12"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("h-3 w-6 shrink-0 overflow-visible", className)}
    >
      {/* Shaft: 21 units long, shown at half length until hover */}
      <path
        d="M1 6h21"
        vectorEffect="non-scaling-stroke"
        className={cn(
          "origin-left scale-x-50 [transform-box:fill-box] group-hover:scale-x-100 group-focus-visible:scale-x-100",
          motion,
        )}
      />
      {/* Head: tip at x=22, shifted back to meet the half-length shaft (tip at 11.5) */}
      <path
        d="M18 2l4 4-4 4"
        className={cn("-translate-x-[10.5px] group-hover:translate-x-0 group-focus-visible:translate-x-0", motion)}
      />
    </svg>
  );
}

export function Chip({ children, dark }: { children: ReactNode; dark?: boolean }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-sm border px-2.5 py-1 text-[0.8125rem] font-semibold leading-none",
        dark ? "border-white/20 text-paper" : "border-line bg-white text-ink",
      )}
    >
      {children}
    </span>
  );
}
