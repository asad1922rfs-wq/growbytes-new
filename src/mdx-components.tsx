import type { MDXComponents } from "mdx/types";
import Link from "next/link";

const components: MDXComponents = {
  a: ({ href = "", children }) =>
    href.startsWith("/") ? (
      <Link href={href}>{children}</Link>
    ) : (
      <a href={href} rel="noopener noreferrer" target="_blank">
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
