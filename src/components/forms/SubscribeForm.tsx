"use client";

import { useActionState } from "react";
import { subscribe, type SubscribeState } from "@/app/newsletter/actions";
import { cn } from "@/components/ui/primitives";

const initial: SubscribeState = { status: "idle" };

/** Compact newsletter sign-up for the dark footer. */
export function SubscribeForm() {
  const [state, action, pending] = useActionState(subscribe, initial);
  const done = state.status === "ok";

  return (
    <form action={action} noValidate className="mt-5 max-w-md">
      <label htmlFor="newsletter-email" className="sr-only">
        Email address for practical guides on websites, software, and marketing
      </label>
      <div className="flex gap-2">
        <input
          id="newsletter-email"
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          required
          disabled={done}
          placeholder="you@company.com"
          aria-describedby="newsletter-status"
          aria-invalid={state.status === "invalid" || undefined}
          className="min-h-12 w-full min-w-0 rounded-lg border border-white/70 bg-transparent px-4 text-base text-paper placeholder:text-white/40 focus:border-white focus:outline-2 focus:outline-offset-2 focus:outline-accent aria-[invalid=true]:border-[#ff8a6b] disabled:opacity-60"
        />
        <button
          type="submit"
          disabled={pending || done}
          className="min-h-12 shrink-0 rounded-lg bg-accent-button px-5 text-[0.9375rem] font-bold text-white transition-colors hover:bg-accent-strong focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:opacity-70"
        >
          {pending ? "Subscribing…" : done ? "Subscribed" : "Subscribe"}
        </button>
      </div>
      {/* Honeypot */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="company_site">Leave this field empty</label>
        <input id="company_site" name="company_site" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <p id="newsletter-status" role="status" aria-live="polite" className={cn("mt-2 min-h-5 text-sm", done ? "text-[#9fd8b0]" : "text-[#ffb39c]")}>
        {state.message}
      </p>
    </form>
  );
}
