import { describe, expect, it, vi } from "vitest";
import { FORM_INBOX, getInquiryAdapter, type InquiryAdapter } from "@/lib/inquiry/adapters";
import { MIN_FILL_MS, processInquiry } from "@/lib/inquiry/process";
import { createRateLimiter } from "@/lib/inquiry/rate-limit";

const NOW = 1_800_000_000_000;

function form(overrides: Record<string, string> = {}) {
  const fd = new FormData();
  const base = {
    name: "Alex Rivera",
    email: "alex@example.com",
    company: "Example Co",
    website: "example.com",
    phone: "+1 555 010 2030",
    service: "shopify-development",
    budget: "not-sure",
    message: "We need help improving collection filtering on our store.",
    fax_number: "",
    started_at: String(NOW - 60_000),
    ...overrides,
  };
  for (const [k, v] of Object.entries(base)) fd.set(k, v);
  return fd;
}

function okAdapter() {
  return { name: "test", send: vi.fn(async () => ({ ok: true as const })) } satisfies InquiryAdapter;
}

const ctx = (o: Partial<Parameters<typeof processInquiry>[1]> = {}) => ({
  adapter: okAdapter() as InquiryAdapter | null,
  now: NOW,
  rateLimitAllowed: true,
  allowDemo: false,
  ...o,
});

describe("processInquiry: validation", () => {
  it("returns field-level errors and keeps submitted values", async () => {
    const res = await processInquiry(form({ name: "", email: "not-an-email", message: "short", service: "" }), ctx());
    expect(res.status).toBe("invalid");
    expect(Object.keys(res.fieldErrors ?? {}).sort()).toEqual(["email", "message", "name", "service"]);
    expect(res.values?.email).toBe("not-an-email");
    expect(res.values?.company).toBe("Example Co");
  });

  it("accepts optional fields left blank", async () => {
    const res = await processInquiry(form({ company: "", website: "", budget: "" }), ctx());
    expect(res.status).toBe("sent");
  });

  it("requires a valid phone number", async () => {
    expect((await processInquiry(form({ phone: "" }), ctx())).fieldErrors?.phone).toBeTruthy();
    expect((await processInquiry(form({ phone: "call me" }), ctx())).fieldErrors?.phone).toBeTruthy();
  });

  it("rejects an unknown service value", async () => {
    const res = await processInquiry(form({ service: "crypto-mining" }), ctx());
    expect(res.fieldErrors?.service).toBeTruthy();
  });

  it("rejects an invalid website format", async () => {
    const res = await processInquiry(form({ website: "not a url" }), ctx());
    expect(res.fieldErrors?.website).toBeTruthy();
  });
});

describe("processInquiry: spam and abuse", () => {
  it("rejects when the honeypot is filled, without calling the adapter", async () => {
    const adapter = okAdapter();
    const res = await processInquiry(form({ fax_number: "spam" }), ctx({ adapter }));
    expect(res.status).toBe("error");
    expect(adapter.send).not.toHaveBeenCalled();
  });

  it("rejects submissions faster than the minimum fill time", async () => {
    const res = await processInquiry(form({ started_at: String(NOW - (MIN_FILL_MS - 500)) }), ctx());
    expect(res.status).toBe("error");
  });

  it("allows submissions without a timestamp (JavaScript disabled)", async () => {
    const res = await processInquiry(form({ started_at: "" }), ctx());
    expect(res.status).toBe("sent");
  });

  it("returns rate_limited and keeps values", async () => {
    const res = await processInquiry(form(), ctx({ rateLimitAllowed: false }));
    expect(res.status).toBe("rate_limited");
    expect(res.values?.name).toBe("Alex Rivera");
  });
});

describe("processInquiry: delivery", () => {
  it("only reports sent when the adapter accepts", async () => {
    const adapter = okAdapter();
    const res = await processInquiry(form(), ctx({ adapter }));
    expect(res.status).toBe("sent");
    expect(adapter.send).toHaveBeenCalledOnce();
  });

  it("returns an error with values retained when the adapter fails", async () => {
    const adapter: InquiryAdapter = { name: "failing", send: async () => ({ ok: false, reason: "500" }) };
    const res = await processInquiry(form(), ctx({ adapter }));
    expect(res.status).toBe("error");
    expect(res.values?.message).toContain("collection filtering");
  });

  it("uses explicit demo mode (never sent) when no adapter is configured outside production", async () => {
    const res = await processInquiry(form(), ctx({ adapter: null, allowDemo: true }));
    expect(res.status).toBe("demo");
    expect(res.message).toMatch(/NOT sent/);
  });

  it("returns an error, not success, in production without an adapter", async () => {
    const res = await processInquiry(form(), ctx({ adapter: null, allowDemo: false }));
    expect(res.status).toBe("error");
  });

  it("does not log personal information", async () => {
    const log = vi.fn();
    const adapter: InquiryAdapter = { name: "failing", send: async () => ({ ok: false, reason: "timeout" }) };
    await processInquiry(form(), ctx({ adapter, log }));
    const logged = log.mock.calls.flat().join(" ");
    expect(logged).not.toContain("alex@example.com");
    expect(logged).not.toContain("Alex Rivera");
  });
});

describe("adapter selection", () => {
  it("returns null when nothing is configured", () => {
    expect(getInquiryAdapter({})).toBeNull();
  });
  it("emails info@growbytes.co by default once a Resend key is set", () => {
    expect(getInquiryAdapter({ INQUIRY_ADAPTER: "resend" })).toBeNull();
    expect(getInquiryAdapter({ RESEND_API_KEY: "x" })?.name).toBe("resend");
    expect(getInquiryAdapter({ INQUIRY_ADAPTER: "resend", RESEND_API_KEY: "x" })?.name).toBe("resend");
    expect(FORM_INBOX).toBe("info@growbytes.co");
  });
  it("selects the webhook adapter", () => {
    const env = { INQUIRY_ADAPTER: "webhook", INQUIRY_WEBHOOK_URL: "https://hooks.example" };
    expect(getInquiryAdapter(env)?.name).toBe("webhook");
  });
});

describe("rate limiter", () => {
  it("blocks after the limit and resets after the window", () => {
    const check = createRateLimiter({ limit: 2, windowMs: 1000 });
    expect(check("k", 0).allowed).toBe(true);
    expect(check("k", 10).allowed).toBe(true);
    expect(check("k", 20).allowed).toBe(false);
    expect(check("other", 20).allowed).toBe(true);
    expect(check("k", 1001).allowed).toBe(true);
  });
});
