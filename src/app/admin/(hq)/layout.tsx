import Link from "next/link";
import { Suspense } from "react";
import { requireAdmin } from "@/lib/admin/auth";
import { LogoMark } from "@/components/ui/Logo";
import { logout } from "../actions";
import { NavItems } from "./NavItems";

/** Checks the session at request time; nothing inside renders for anyone else. */
async function Gate({ children }: { children: React.ReactNode }) {
  await requireAdmin();
  return <>{children}</>;
}

function Loading() {
  return (
    <div className="grid min-h-[60vh] place-items-center" aria-busy="true">
      <div className="size-40 animate-pulse rounded-full bg-[var(--hq-orange)]/10" />
    </div>
  );
}

export default function HqLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<div className="min-h-dvh" />}>
      <Gate>
        <Shell>{children}</Shell>
      </Gate>
    </Suspense>
  );
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-col md:h-dvh md:overflow-hidden">
      <header className="sticky top-0 z-30 border-b border-[var(--hq-line)] bg-[var(--hq-night)]/80 backdrop-blur-md">
        <div className="grid h-16 grid-cols-[1fr_auto_1fr] items-center gap-4 px-4 sm:px-8 lg:px-12">
          <NavItems side="left" />
          <Link href="/admin/" aria-label="Command room" className="grid place-items-center">
            <LogoMark className="h-7 w-auto" />
          </Link>
          <div className="flex items-center justify-end gap-1">
            <NavItems side="right" />
            <form action={logout}>
              <button type="submit" className="ml-2 hidden rounded-full px-3 py-1.5 text-[0.8125rem] text-[var(--hq-dim)] hover:text-white sm:block">
                Sign out
              </button>
            </form>
          </div>
        </div>
      </header>
      <main className="flex-1 px-4 py-6 sm:px-8 md:min-h-0 lg:px-12">
        <Suspense fallback={<Loading />}>{children}</Suspense>
      </main>
    </div>
  );
}
