import type { Inquiry } from "./schema";

/**
 * Replaceable delivery adapter. Add a CRM adapter by implementing this
 * interface and returning it from getInquiryAdapter().
 */
export type DeliveryResult = { ok: true } | { ok: false; reason: string };

export interface InquiryAdapter {
  name: string;
  send(inquiry: Inquiry, meta: { receivedAt: string }): Promise<DeliveryResult>;
}

const TIMEOUT_MS = 10_000;

/** POSTs JSON to a webhook (Zapier, Make, n8n, a CRM endpoint, or your own API). */
export function webhookAdapter(url: string, secret?: string): InquiryAdapter {
  return {
    name: "webhook",
    async send(inquiry, meta) {
      try {
        const res = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(secret ? { Authorization: `Bearer ${secret}` } : {}),
          },
          body: JSON.stringify({ type: "project_inquiry", ...meta, inquiry }),
          signal: AbortSignal.timeout(TIMEOUT_MS),
        });
        return res.ok ? { ok: true } : { ok: false, reason: `webhook responded ${res.status}` };
      } catch (e) {
        return { ok: false, reason: `webhook request failed: ${(e as Error).name}` };
      }
    },
  };
}

/** Sends a plain-text email through the Resend HTTP API (no SDK needed). */
export function resendAdapter(opts: { apiKey: string; to: string; from: string }): InquiryAdapter {
  return {
    name: "resend",
    async send(inquiry, meta) {
      const lines = [
        `New project inquiry (${meta.receivedAt})`,
        "",
        `Name: ${inquiry.name}`,
        `Email: ${inquiry.email}`,
        `Company: ${inquiry.company ?? "—"}`,
        `Website: ${inquiry.website ?? "—"}`,
        `Phone: ${inquiry.phone}`,
        `Service: ${inquiry.service}`,
        `Budget: ${inquiry.budget ?? "—"}`,
        `Engagement: ${inquiry.engagement ?? "—"}`,
        "",
        inquiry.message,
      ];
      try {
        const res = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${opts.apiKey}` },
          body: JSON.stringify({
            from: opts.from,
            to: [opts.to],
            reply_to: inquiry.email,
            subject: `Project inquiry: ${inquiry.service} — ${inquiry.company ?? inquiry.name}`,
            text: lines.join("\n"),
          }),
          signal: AbortSignal.timeout(TIMEOUT_MS),
        });
        return res.ok ? { ok: true } : { ok: false, reason: `resend responded ${res.status}` };
      } catch (e) {
        return { ok: false, reason: `resend request failed: ${(e as Error).name}` };
      }
    },
  };
}

/** Every form lands in this inbox unless INQUIRY_TO_EMAIL overrides it. */
export const FORM_INBOX = "info@growbytes.co";
export const FORM_SENDER = "Growbytes Website <website@growbytes.co>";

/**
 * Returns the configured adapter, or null when no destination is configured.
 * Email (Resend) is the default whenever an API key is set; a webhook is used
 * only when INQUIRY_ADAPTER is "webhook".
 */
export function getInquiryAdapter(env: Record<string, string | undefined> = process.env): InquiryAdapter | null {
  const which = env.INQUIRY_ADAPTER;
  if (which === "webhook" && env.INQUIRY_WEBHOOK_URL) {
    return webhookAdapter(env.INQUIRY_WEBHOOK_URL, env.INQUIRY_WEBHOOK_SECRET);
  }
  if ((which === "resend" || !which) && env.RESEND_API_KEY) {
    return resendAdapter({
      apiKey: env.RESEND_API_KEY,
      to: env.INQUIRY_TO_EMAIL || FORM_INBOX,
      from: env.INQUIRY_FROM_EMAIL || FORM_SENDER,
    });
  }
  return null;
}
