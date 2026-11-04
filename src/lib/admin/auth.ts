import "server-only";
import { createHash, createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

/**
 * Single-owner admin session: a signed, httpOnly cookie that expires.
 * The signing key is derived from ADMIN_PASSWORD, so changing the
 * password signs everyone out.
 */
export const SESSION_COOKIE = "gb_admin";
const SESSION_DAYS = 14;

function secret() {
  const pw = process.env.ADMIN_PASSWORD;
  if (!pw || pw.length < 12) return null;
  return createHash("sha256").update(`growbytes-admin:${pw}`).digest();
}

function sign(value: string, key: Buffer) {
  return createHmac("sha256", key).update(value).digest("base64url");
}

function equal(a: string, b: string) {
  const x = createHash("sha256").update(a).digest();
  const y = createHash("sha256").update(b).digest();
  return timingSafeEqual(x, y);
}

export function passwordMatches(input: string) {
  const pw = process.env.ADMIN_PASSWORD;
  return Boolean(pw && pw.length >= 12 && equal(input, pw));
}

export async function createSession() {
  const key = secret();
  if (!key) throw new Error("ADMIN_PASSWORD is not set");
  const exp = Date.now() + SESSION_DAYS * 86_400_000;
  (await cookies()).set(SESSION_COOKIE, `${exp}.${sign(String(exp), key)}`, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/admin",
    maxAge: SESSION_DAYS * 86_400,
  });
}

export async function destroySession() {
  (await cookies()).delete({ name: SESSION_COOKIE, path: "/admin" });
}

export async function isAdmin() {
  const key = secret();
  const raw = (await cookies()).get(SESSION_COOKIE)?.value;
  if (!key || !raw) return false;
  const [exp, sig] = raw.split(".");
  if (!exp || !sig || Number(exp) < Date.now()) return false;
  return equal(sig, sign(exp, key));
}

/** Call at the top of every admin page and server action. */
export async function requireAdmin() {
  if (!(await isAdmin())) redirect("/admin/login/");
}

// Slow down password guessing: 5 tries per 15 minutes per IP (per server instance).
const attempts = new Map<string, number[]>();
export function loginAllowed(ip: string) {
  const now = Date.now();
  const recent = (attempts.get(ip) ?? []).filter((t) => now - t < 15 * 60_000);
  attempts.set(ip, recent);
  return recent.length < 5;
}
export function recordFailedLogin(ip: string) {
  attempts.set(ip, [...(attempts.get(ip) ?? []), Date.now()]);
}
