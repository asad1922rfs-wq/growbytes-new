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
    <div className="space-y-4" aria-busy="true">
      <div className="h-9 w-72 animate-pulse rounded-xl bg-white/[0.05]" />
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="h-32 animate-pulse rounded-2xl bg-white/[0.04]" />
        ))}
      </div>
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
    <div className="relative">
      <div aria-hidden="true" className="pointer-events-none fixed -top-48 right-[-10rem] size-[40rem] rounded-full bg-[#F66135]/[0.07] blur-[120px]" />
      <div className="relative mx-auto flex min-h-dvh max-w-[90rem]">
        <aside className="sticky top-0 hidden h-dvh w-64 shrink-0 flex-col border-r border-white/[0.06] px-4 py-6 lg:flex">
          <div className="flex items-center gap-3 px-3">
            <LogoMark className="h-6 w-auto" />
            <div>
              <p className="text-sm leading-none font-extrabold">Growbytes HQ</p>
              <p className="mt-1 text-[0.6875rem] text-white/40">AI company workspace</p>
            </div>
          </div>
          <NavItems />
          <form action={logout} className="mt-auto px-3">
            <button type="submit" className="text-xs font-semibold text-white/40 hover:text-white">
              Sign out
            </button>
          </form>
        </aside>
        <div className="min-w-0 flex-1">
          <header className="sticky top-0 z-20 flex items-center justify-between gap-4 border-b border-white/[0.06] bg-[#0B0C0C]/80 px-4 py-3 backdrop-blur sm:px-8 lg:hidden">
            <div className="flex items-center gap-2">
              <LogoMark className="h-5 w-auto" />
              <span className="text-sm font-extrabold">HQ</span>
            </div>
            <NavItems compact />
          </header>
          <main className="px-4 py-8 sm:px-8 lg:py-10">
            <Suspense fallback={<Loading />}>{children}</Suspense>
          </main>
        </div>
      </div>
    </div>
  );
}
