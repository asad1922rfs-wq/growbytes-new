/**
 * Shared Google service-account sign-in for the SEO scripts (Search Console, GA4).
 * The key file path comes from GSC_KEY_FILE in .env.local; the key never leaves this machine.
 */
import { createSign } from "node:crypto";
import { readFileSync } from "node:fs";

export function fail(msg) {
  console.error(`\n  ${msg}\n`);
  process.exit(1);
}

function loadKey() {
  const file = process.env.GSC_KEY_FILE;
  if (!file) fail("GSC_KEY_FILE is not set. Add it to .env.local (see .env.example).");
  try {
    const key = JSON.parse(readFileSync(file, "utf8"));
    if (!key.client_email || !key.private_key) throw new Error("missing client_email or private_key");
    return key;
  } catch (e) {
    fail(`Could not read the key file at ${file}: ${e.message}`);
  }
}

const b64url = (v) => Buffer.from(typeof v === "string" ? v : JSON.stringify(v)).toString("base64url");

/** Exchanges a signed JWT for a short-lived access token with the given scope. */
export async function accessToken(scope) {
  const key = loadKey();
  const now = Math.floor(Date.now() / 1000);
  const unsigned = `${b64url({ alg: "RS256", typ: "JWT" })}.${b64url({
    iss: key.client_email,
    scope,
    aud: "https://oauth2.googleapis.com/token",
    iat: now,
    exp: now + 3600,
  })}`;
  const signature = createSign("RSA-SHA256").update(unsigned).sign(key.private_key, "base64url");
  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer", assertion: `${unsigned}.${signature}` }),
  });
  const data = await res.json();
  if (!res.ok) fail(`Google sign-in failed: ${data.error_description || data.error || res.status}`);
  return data.access_token;
}

/** Authenticated JSON request. `who` names the property for the 403 hint. */
export async function googleApi(scope, method, url, body, who = "this property") {
  const token = await accessToken(scope);
  const res = await fetch(url, {
    method,
    headers: { Authorization: `Bearer ${token}`, ...(body ? { "Content-Type": "application/json" } : {}) },
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await res.text();
  const data = text ? JSON.parse(text) : {};
  if (!res.ok) {
    const hint = res.status === 403 ? ` Is the service account added as a user on ${who}?` : "";
    fail(`Google API error ${res.status}: ${data.error?.message || text}${hint}`);
  }
  return data;
}

/** Date range ending two days ago (Search Console and GA4 data lag slightly). */
export function range(days) {
  const end = new Date(Date.now() - 2 * 864e5);
  const start = new Date(end.getTime() - (Number(days) || 28) * 864e5);
  const iso = (d) => d.toISOString().slice(0, 10);
  return { startDate: iso(start), endDate: iso(end) };
}
