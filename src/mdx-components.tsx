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
};

export function useMDXComponents(): MDXComponents {
  return components;
}
