import type { InquiryAdapter } from "./adapters";
import { inquiryFields, inquirySchema, type InquiryField } from "./schema";

export type InquiryStatus = "idle" | "invalid" | "rate_limited" | "error" | "demo" | "sent";

export type InquiryState = {
  status: InquiryStatus;
  message?: string;
  fieldErrors?: Partial<Record<InquiryField, string>>;
  /** Echoed back so the form keeps the visitor's input after a recoverable error. */
  values?: Partial<Record<InquiryField, string>>;
};

export const initialInquiryState: InquiryState = { status: "idle" };

/** Minimum time between page render and submit (ms) when the client sends a timestamp. */
export const MIN_FILL_MS = 3000;

type Context = {
  adapter: InquiryAdapter | null;
  now: number;
  rateLimitAllowed: boolean;
  /** Demo mode is only allowed outside production. */
  allowDemo: boolean;
  log?: (msg: string) => void;
};

/** Pure, testable core of the inquiry action. No PII is logged. */
export async function processInquiry(formData: FormData, ctx: Context): Promise<InquiryState> {
  const values = Object.fromEntries(
    inquiryFields.map((f) => [f, String(formData.get(f) ?? "")]),
  ) as Record<InquiryField, string>;

  const spamRejection: InquiryState = {
    status: "error",
    message: "We couldn't submit your inquiry. Please wait a moment and try again.",
    values,
  };

  // Spam: the hidden honeypot field must stay empty.
  if (String(formData.get("fax_number") ?? "")) {
    ctx.log?.("inquiry rejected: honeypot");
    return spamRejection;
  }

  if (!ctx.rateLimitAllowed) {
    return {
      status: "rate_limited",
      message: "Too many submissions from this connection. Please wait a few minutes and try again.",
      values,
    };
  }

  const parsed = inquirySchema.safeParse(values);
  if (!parsed.success) {
    const fieldErrors: InquiryState["fieldErrors"] = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as InquiryField;
      if (key && !fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return {
      status: "invalid",
      message: `Please correct ${Object.keys(fieldErrors).length === 1 ? "the highlighted field" : "the highlighted fields"} and submit again.`,
      fieldErrors,
      values,
    };
  }

  // Spam: valid submissions completed implausibly fast. Checked after
  // validation so a person who submits an empty form sees field errors.
  const startedAt = Number(formData.get("started_at") ?? 0);
  if (startedAt > 0 && ctx.now - startedAt < MIN_FILL_MS) {
    ctx.log?.("inquiry rejected: submitted too quickly");
    return spamRejection;
  }

  if (!ctx.adapter) {
    if (ctx.allowDemo) {
      return {
        status: "demo",
        message:
          "Demo mode: your details passed validation, but this inquiry was NOT sent anywhere because no delivery destination is configured. See README → Inquiry form setup.",
        values,
      };
    }
    ctx.log?.("inquiry delivery not configured");
    return {
      status: "error",
      message: "Online inquiries are temporarily unavailable. Your details are still in the form; please try again later.",
      values,
    };
  }

  const result = await ctx.adapter.send(parsed.data, { receivedAt: new Date(ctx.now).toISOString() });
  if (!result.ok) {
    ctx.log?.(`inquiry delivery failed via ${ctx.adapter.name}: ${result.reason}`);
    return {
      status: "error",
      message: "Something went wrong while sending your inquiry. Your details are still in the form; please try again.",
      values,
    };
  }

  return { status: "sent" };
}
