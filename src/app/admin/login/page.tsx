import { redirect } from "next/navigation";
import { Suspense } from "react";
import { isAdmin } from "@/lib/admin/auth";
import { LoginForm } from "./LoginForm";

export const metadata = { title: "Sign in" };

async function RedirectIfSignedIn() {
  if (await isAdmin()) redirect("/admin/");
  return null;
}

export default function LoginPage() {
  return (
    <div className="relative grid min-h-dvh place-items-center overflow-hidden px-4">
      <div aria-hidden="true" className="pointer-events-none absolute -top-40 left-1/2 size-[42rem] -translate-x-1/2 rounded-full bg-[#8A9BFF]/15 blur-[120px]" />
      <Suspense fallback={null}>
        <RedirectIfSignedIn />
      </Suspense>
      <div className="relative w-full max-w-sm">
        <LoginForm />
        <p className="mt-6 text-center text-xs text-white/35">Private workspace. Only the owner can sign in.</p>
      </div>
    </div>
  );
}
