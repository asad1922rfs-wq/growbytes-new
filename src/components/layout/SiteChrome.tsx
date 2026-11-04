"use client";

import { usePathname } from "next/navigation";

/**
 * Public site chrome (header, footer, analytics, cookie banner). The admin
 * dashboard under /admin has its own shell, so none of this renders there.
 */
export function SiteChrome({ header, footer, extras, children }: { header: React.ReactNode; footer: React.ReactNode; extras: React.ReactNode; children: React.ReactNode }) {
  const admin = usePathname()?.startsWith("/admin");
  if (admin) return <>{children}</>;
  return (
    <>
      {header}
      <main id="main" tabIndex={-1} className="outline-none">
        {children}
      </main>
      {footer}
      {extras}
    </>
  );
}
