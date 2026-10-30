import { existsSync } from "node:fs";
import path from "node:path";
import Image from "next/image";
import { images, type ImageId } from "@/content/images";
import { cn } from "./primitives";

const ratioClass: Record<string, string> = {
  "4/5": "aspect-[4/5]",
  "5/4": "aspect-[5/4]",
  "16/9": "aspect-[16/9]",
  "16/10": "aspect-[16/10]",
  "4/3": "aspect-[4/3]",
};

/**
 * Renders the real image when its file exists under /public, otherwise a
 * neutral placeholder with reserved dimensions. Server component: the file
 * check runs at build time, so no client JavaScript is added.
 */
export function SiteImage({
  id,
  className,
  priority,
  sizes = "(min-width: 1024px) 50vw, 100vw",
  tone = "light",
  minimal,
}: {
  id: ImageId;
  className?: string;
  priority?: boolean;
  sizes?: string;
  tone?: "light" | "dark";
  /** Plain warm fill with only a small label: no hatching, no ratio readout. */
  minimal?: boolean;
}) {
  const asset = images[id];
  const aspect = ratioClass[asset.ratio] ?? "aspect-[4/3]";
  const exists = existsSync(path.join(process.cwd(), "public", asset.src));

  if (exists) {
    return (
      <div className={cn("relative overflow-hidden rounded-lg", aspect, className)}>
        <Image
          src={asset.src}
          alt={asset.decorative ? "" : asset.alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
        />
      </div>
    );
  }

  if (minimal) {
    return (
      <div
        role="img"
        aria-label={`Image placeholder: ${asset.label}`}
        data-image-placeholder={asset.id}
        className={cn("relative flex items-end overflow-hidden rounded-xl bg-[#ebe5da]", aspect, className)}
      >
        <p className="m-4 rounded-sm bg-white/70 px-2 py-1 text-[0.75rem] font-semibold text-muted sm:m-5">{asset.label}</p>
      </div>
    );
  }

  const dark = tone === "dark";
  return (
    <div
      role="img"
      aria-label={`Image placeholder: ${asset.label}`}
      data-image-placeholder={asset.id}
      className={cn(
        "relative flex overflow-hidden rounded-lg",
        aspect,
        dark ? "bg-ink-soft text-muted-on-dark" : "bg-[#e6e3da] text-muted",
        className,
      )}
    >
      {/* Quiet diagonal hatching so the box reads as an image slot, not content */}
      <svg aria-hidden="true" className="absolute inset-0 size-full opacity-60">
        <defs>
          <pattern id={`ph-${asset.id}`} width="14" height="14" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <path d="M0 0v14" stroke="currentColor" strokeOpacity="0.12" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#ph-${asset.id})`} />
      </svg>
      <div className="relative mt-auto flex w-full items-end justify-between gap-4 p-4 sm:p-5">
        <p className="max-w-[26rem] text-[0.8125rem] leading-snug font-semibold">
          <span className="mr-1.5 inline-block rounded-sm bg-ink px-1.5 py-0.5 text-[0.6875rem] font-bold tracking-wide text-white uppercase">
            Image
          </span>
          {asset.label}
        </p>
        <span className="hidden shrink-0 text-[0.75rem] font-semibold sm:block">{asset.ratio.replace("/", ":")}</span>
      </div>
    </div>
  );
}
