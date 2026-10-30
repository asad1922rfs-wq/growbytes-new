"use client";

import { useActionState, useEffect, useRef } from "react";
import { submitInquiry } from "@/app/contact/actions";
import { buttonStyles, cn } from "@/components/ui/primitives";
import { initialInquiryState } from "@/lib/inquiry/process";
import { budgetOptions, engagementOptions, serviceInterestOptions, type InquiryField } from "@/lib/inquiry/schema";

const inputClass =
  "mt-2 block w-full rounded-md border border-field bg-white px-3.5 py-3 text-base text-ink placeholder:text-muted/70 focus:border-ink focus:outline-2 focus:outline-offset-1 focus:outline-accent-strong aria-[invalid=true]:border-danger";

export function InquiryForm({
  defaultService,
  defaultEngagement,
  compact,
}: {
  defaultService?: string;
  defaultEngagement?: string;
  /** Short version (name, email, service, message) for embedding in page sections. */
  compact?: boolean;
}) {
  const [state, formAction, pending] = useActionState(submitInquiry, initialInquiryState);
  const summaryRef = useRef<HTMLDivElement>(null);
  const startedAtRef = useRef<HTMLInputElement>(null);

  // Record when the form became interactive (spam timing check). Setting
  // defaultValue keeps it intact when React resets the form after an action.
  useEffect(() => {
    if (startedAtRef.current) startedAtRef.current.defaultValue = String(Date.now());
  }, []);

  useEffect(() => {
    if (state.status !== "idle") summaryRef.current?.focus();
  }, [state]);

  const v = state.values ?? {};
  const err = state.fieldErrors ?? {};
  const validService = serviceInterestOptions.some((o) => o.value === defaultService) ? defaultService : "";

  const validEngagement = engagementOptions.some((o) => o.value === defaultEngagement) ? defaultEngagement : "";

  const field = (name: InquiryField, hasHint = false) => ({
    id: `f-${name}`,
    name,
    "aria-invalid": err[name] ? true : undefined,
    "aria-describedby": [err[name] && `f-${name}-error`, hasHint && `f-${name}-hint`].filter(Boolean).join(" ") || undefined,
  });

  return (
    <form action={formAction} noValidate className="space-y-6" aria-describedby="form-required-note">
      <div ref={summaryRef} tabIndex={-1} aria-live="polite" className="outline-none">
        {state.status !== "idle" && state.message && (
          <div
            role={state.status === "demo" ? "status" : "alert"}
            className={cn(
              "rounded-md border p-4 text-[0.975rem]",
              state.status === "demo" ? "border-[#b28a1e] bg-[#fdf6e3] text-ink" : "border-danger/40 bg-[#fbecE8] text-ink",
            )}
          >
            <p className="font-bold">{state.status === "demo" ? "Not sent — demo mode" : "Your inquiry was not sent"}</p>
            <p className="mt-1">{state.message}</p>
            {state.fieldErrors && (
              <ul className="mt-2 list-disc pl-5">
                {Object.entries(state.fieldErrors).map(([k, msg]) => (
                  <li key={k}>
                    <a href={`#f-${k}`} className="underline underline-offset-2">
                      {msg}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>

      <p id="form-required-note" className="sr-only !mt-0">
        Fields marked “optional” can be left blank. Everything else is required.
      </p>

      {/* No gap above the first row while the message area above is empty */}
      <div className={cn("grid gap-6 sm:grid-cols-2", state.status === "idle" && "!mt-0")}>
        <Field label="Your name" name="name" error={err.name}>
          <input {...field("name")} type="text" autoComplete="name" required defaultValue={v.name} className={inputClass} />
        </Field>
        <Field label="Work email" name="email" error={err.email}>
          <input {...field("email")} type="email" autoComplete="email" inputMode="email" required defaultValue={v.email} className={inputClass} />
        </Field>
        {!compact && (
          <>
        <Field label="Company" optional name="company" error={err.company}>
          <input {...field("company")} type="text" autoComplete="organization" defaultValue={v.company} className={inputClass} />
        </Field>
        <Field label="Current website" optional name="website" error={err.website}>
          <input {...field("website", true)} type="text" inputMode="url" autoComplete="url" defaultValue={v.website} className={inputClass} />
        </Field>
          </>
        )}
        <Field label="Phone" name="phone" error={err.phone}>
          <input {...field("phone", !compact)} type="tel" autoComplete="tel" inputMode="tel" required defaultValue={v.phone} className={inputClass} />
        </Field>
        <Field label="Service you're interested in" name="service" error={err.service}>
          <select {...field("service")} required defaultValue={v.service ?? validService} className={cn(inputClass, "appearance-auto")}>
            <option value="" disabled>
              Choose one
            </option>
            {serviceInterestOptions.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </Field>
      </div>

      {!compact && (
      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="How you'd like to work" optional name="engagement" error={err.engagement}>
          <select {...field("engagement", true)} defaultValue={v.engagement ?? validEngagement} className={cn(inputClass, "appearance-auto")}>
            <option value="">Not sure yet</option>
            {engagementOptions.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Approximate budget" optional name="budget" error={err.budget}>
          <select {...field("budget", true)} defaultValue={v.budget ?? ""} className={cn(inputClass, "appearance-auto")}>
            <option value="">Prefer not to say</option>
            {budgetOptions.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </Field>
      </div>
      )}

      <Field
        label="What do you want to build or improve?"
        name="message"
        error={err.message}
        hint={compact ? undefined : "What you need, why now, and anything we should know about timing or existing systems."}
      >
        <textarea {...field("message", !compact)} rows={compact ? 4 : 6} required defaultValue={v.message} className={cn(inputClass, "resize-y")} />
      </Field>

      {/* Spam protection: hidden honeypot + render timestamp. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="fax_number">Leave this field empty</label>
        <input id="fax_number" name="fax_number" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <input ref={startedAtRef} type="hidden" name="started_at" defaultValue="" />

      <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center">
        <button type="submit" disabled={pending} className={buttonStyles("brand", "w-full disabled:cursor-wait disabled:opacity-70 sm:w-auto")}>
          {pending ? "Sending…" : compact ? "Send inquiry" : "Send project inquiry"}
        </button>
        {!compact && <p className="text-sm text-muted">We use these details only to respond to your inquiry.</p>}
      </div>
    </form>
  );
}

function Field({
  label,
  name,
  optional,
  hint,
  error,
  children,
}: {
  label: string;
  name: InquiryField;
  optional?: boolean;
  hint?: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={`f-${name}`} className="block font-bold">
        {label}
        {optional && <span className="ml-1.5 text-sm font-medium text-muted">(optional)</span>}
      </label>
      {hint && (
        <p id={`f-${name}-hint`} className="mt-1 text-sm text-muted">
          {hint}
        </p>
      )}
      {children}
      {error && (
        <p id={`f-${name}-error`} className="mt-2 flex items-start gap-1.5 text-sm font-semibold text-danger">
          <span aria-hidden="true">!</span>
          {error}
        </p>
      )}
    </div>
  );
}
