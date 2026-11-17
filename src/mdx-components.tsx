import type { MDXComponents } from "mdx/types";
import Link from "next/link";
import { ArrowIcon, buttonStyles } from "@/components/ui/primitives";

/** Large partner call-to-action used inside articles. Always marked sponsored. */
function PartnerCta({ href, title, body, button }: { href: string; title: string; body: string; button: string }) {
  return (
    <aside className="not-prose my-10 overflow-hidden rounded-2xl bg-ink p-8 text-white sm:p-10">
      <p className="text-sm font-semibold text-white/60">Recommended partner</p>
      <p className="mt-3 text-2xl font-bold leading-tight tracking-tight sm:text-3xl">{title}</p>
      <p className="mt-3 max-w-xl text-base leading-relaxed text-white/75">{body}</p>
      <a
        href={href}
        rel="sponsored nofollow noopener noreferrer"
        target="_blank"
        className={buttonStyles("brand", "mt-6 no-underline")}
      >
        {button}
        <ArrowIcon />
      </a>
      <p className="mt-4 text-xs text-white/50">Affiliate link. We may earn a commission at no extra cost to you.</p>
    </aside>
  );
}

const components: MDXComponents = {
  PartnerCta,
  a: ({ href = "", children }) =>
    href.startsWith("/") ? (
      <Link href={href}>{children}</Link>
    ) : (
      <a
        href={href}
        // Affiliate links must be marked sponsored for search engines.
        rel={/tidd\.ly|awin1\.com/.test(href) ? "sponsored nofollow noopener noreferrer" : "noopener noreferrer"}
        target="_blank"
      >
        {children}
      </a>
    ),
  // Article pages own the H1; demote any stray "#" heading in MDX.
  h1: ({ children }) => <h2>{children}</h2>,
  // Article figures: a framed image with its alt text as the caption.
  img: ({ src = "", alt = "" }) => (
    <figure className="my-8">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={String(src)} alt={alt} loading="lazy" className="w-full rounded-2xl border border-black/5" />
      {alt && <figcaption className="mt-2 text-sm text-[var(--color-muted,#5B5F63)]">{alt}</figcaption>}
    </figure>
  ),
};

export function useMDXComponents(): MDXComponents {
  return components;
}
