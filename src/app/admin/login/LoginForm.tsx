"use client";

import { useActionState } from "react";
import { LogoMark } from "@/components/ui/Logo";
import { login, type LoginState } from "../actions";

export function LoginForm() {
  const [state, action, pending] = useActionState<LoginState, FormData>(login, {});
  return (
    <form action={action} className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 shadow-[0_40px_80px_-40px_rgb(0_0_0/0.8)] backdrop-blur">
      <LogoMark className="h-7 w-auto" />
      <h1 className="mt-6 text-2xl font-extrabold tracking-tight">Growbytes HQ</h1>
      <p className="mt-1 text-sm text-white/55">Your agents are waiting.</p>
      <label htmlFor="password" className="mt-8 block text-xs font-semibold tracking-wide text-white/60 uppercase">
        Password
      </label>
      <input
        id="password"
        name="password"
        type="password"
        required
        autoFocus
        autoComplete="current-password"
        className="mt-2 w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none placeholder:text-white/25 focus:border-[#F66135]/70 focus:ring-2 focus:ring-[#F66135]/25"
      />
      {state.error && (
        <p role="alert" className="mt-3 text-sm text-[#FF8A66]">
          {state.error}
        </p>
      )}
      <button
        type="submit"
        disabled={pending}
        className="mt-6 w-full rounded-xl bg-[#D2461F] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#C2401B] disabled:opacity-60"
      >
        {pending ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
