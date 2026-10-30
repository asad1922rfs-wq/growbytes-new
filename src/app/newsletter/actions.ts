"use server";

import { z } from "zod";
import { FORM_INBOX, FORM_SENDER } from "@/lib/inquiry/adapters";

export type SubscribeState = { status: "idle" | "ok" | "invalid" | "unavailable" | "error"; message?: string };

const emailSchema = z.string().trim().min(1, "Please enter your email.").max(254).pipe(z.email("Please enter a valid email address."));

/**
 * Newsletter sign-up. Delivers to NEWSLETTER_WEBHOOK_URL (e.g. a Zapier/Make hook
 * or an email platform's form endpoint). With no destination configured it says
 * so plainly instead of pretending the sign-up worked.
 */
export async function subscribe(_prev: SubscribeState, formData: FormData): Promise<SubscribeState> {
  // Honeypot: real visitors never fill this.
  if (String(formData.get("company_site") ?? "")) return { status: "ok", message: "Thanks, you're on the list." };

  const parsed = emailSchema.safeParse(formData.get("email"));
  if (!parsed.success) return { status: "invalid", message: parsed.error.issues[0]?.message ?? "Please enter a valid email address." };

  const url = process.env.NEWSLETTER_WEBHOOK_URL;
  const apiKey = process.env.RESEND_API_KEY;
  if (!url && apiKey) {
    // No list platform yet: email the sign-up to the team inbox instead.
    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
        body: JSON.stringify({
          from: process.env.INQUIRY_FROM_EMAIL || FORM_SENDER,
          to: [process.env.INQUIRY_TO_EMAIL || FORM_INBOX],
          reply_to: parsed.data,
          subject: `Newsletter sign-up: ${parsed.data}`,
          text: `New newsletter subscriber: ${parsed.data}
Source: website footer
Time: ${new Date().toISOString()}`,
        }),
        signal: AbortSignal.timeout(10_000),
      });
      if (!res.ok) throw new Error(`status ${res.status}`);
      return { status: "ok", message: "Thanks, you're on the list." };
    } catch (e) {
      console.warn(`[newsletter] email delivery failed: ${(e as Error).message}`);
      return { status: "error", message: "Something went wrong. Please try again later." };
    }
  }
  if (!url) {
    console.warn("[newsletter] No NEWSLETTER_WEBHOOK_URL or RESEND_API_KEY set; sign-up not stored.");
    return { status: "unavailable", message: "Sign-ups aren't connected yet. Please check back soon." };
  }

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: parsed.data, source: "website-footer", subscribedAt: new Date().toISOString() }),
    });
    if (!res.ok) throw new Error(`status ${res.status}`);
    return { status: "ok", message: "Thanks, you're on the list." };
  } catch (e) {
    console.warn(`[newsletter] delivery failed: ${(e as Error).message}`);
    return { status: "error", message: "Something went wrong. Please try again later." };
  }
}
