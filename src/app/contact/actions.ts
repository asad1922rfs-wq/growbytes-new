"use server";

import { createHash, randomUUID } from "node:crypto";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { saveInquiryLead } from "@/lib/admin/data";
import { getInquiryAdapter } from "@/lib/inquiry/adapters";
import { processInquiry, type InquiryState } from "@/lib/inquiry/process";
import { inquiryRateLimiter } from "@/lib/inquiry/rate-limit";

import { THANK_YOU_COOKIE } from "@/lib/inquiry/constants";

export async function submitInquiry(_prev: InquiryState, formData: FormData): Promise<InquiryState> {
  const h = await headers();
  const ip = h.get("x-forwarded-for")?.split(",")[0]?.trim() || h.get("x-real-ip") || "unknown";
  // Hash so raw IPs are never stored in memory.
  const key = createHash("sha256").update(ip).digest("hex").slice(0, 32);
  const now = Date.now();

  const state = await processInquiry(formData, {
    adapter: getInquiryAdapter(),
    now,
    rateLimitAllowed: inquiryRateLimiter(key, now).allowed,
    allowDemo: process.env.NODE_ENV !== "production" || process.env.INQUIRY_DEMO_MODE === "true",
    log: (msg) => console.warn(`[inquiry] ${msg}`),
    onDelivered: (inquiry) => saveInquiryLead(inquiry, (msg) => console.warn(`[inquiry] ${msg}`)),
  });

  if (state.status === "sent") {
    // Short-lived, non-identifying token that unlocks the thank-you page.
    (await cookies()).set(THANK_YOU_COOKIE, randomUUID(), {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 300,
    });
    redirect("/thank-you/");
  }
  return state;
}
