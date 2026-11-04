"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createSession, destroySession, loginAllowed, passwordMatches, recordFailedLogin, requireAdmin } from "@/lib/admin/auth";
import { db, departments, leadStatuses, type AgentAction, type Department, type LeadStatus } from "@/lib/db";

export type LoginState = { error?: string };

export async function login(_prev: LoginState, formData: FormData): Promise<LoginState> {
  const ip = (await headers()).get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  if (!loginAllowed(ip)) return { error: "Too many attempts. Wait 15 minutes and try again." };
  if (!passwordMatches(String(formData.get("password") ?? ""))) {
    recordFailedLogin(ip);
    return { error: "That password isn't right." };
  }
  await createSession();
  redirect("/admin/");
}

export async function logout() {
  await destroySession();
  redirect("/admin/login/");
}

const uuid = (v: FormDataEntryValue | null) => {
  const s = String(v ?? "");
  if (!/^[0-9a-f-]{36}$/i.test(s)) throw new Error("bad id");
  return s;
};

async function sendEmail(to: string, subject: string, body: string) {
  const key = process.env.RESEND_API_KEY;
  if (!key) return { ok: false, reason: "RESEND_API_KEY is not set" };
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${key}` },
    body: JSON.stringify({
      from: "Growbytes <info@growbytes.co>",
      to: [to],
      bcc: ["info@growbytes.co"],
      reply_to: "info@growbytes.co",
      subject,
      text: body,
    }),
    signal: AbortSignal.timeout(10_000),
  });
  return res.ok ? { ok: true } : { ok: false, reason: `Resend responded ${res.status}` };
}

/** Approve an agent action (optionally with your edits) and carry it out. */
export async function approveAction(formData: FormData) {
  await requireAdmin();
  const sql = db()!;
  const id = uuid(formData.get("id"));
  const [action] = (await sql`select * from actions where id = ${id} and status = 'pending'`) as AgentAction[];
  if (!action) return;

  const payload = { ...action.payload };
  for (const k of ["to", "subject", "body", "text"]) {
    const v = formData.get(k);
    if (typeof v === "string") payload[k] = v.trim();
  }

  let status: AgentAction["status"] = "done";
  let result = "Approved";
  if (action.kind === "email_reply") {
    const sent = await sendEmail(String(payload.to), String(payload.subject), String(payload.body));
    status = sent.ok ? "done" : "failed";
    result = sent.ok ? `Email sent to ${payload.to}` : `Not sent: ${sent.reason}`;
    if (sent.ok && action.lead_id) await sql`update leads set status = 'contacted', updated_at = now() where id = ${action.lead_id} and status in ('new','qualified')`;
  } else if (action.kind === "social_post") {
    // Publishing runs from the Marketing agent (npm run meta) once approved.
    status = "approved";
    result = "Approved. The Marketing agent will publish it.";
  }

  await sql`update actions set status = ${status}, payload = ${JSON.stringify(payload)}::jsonb, decided_at = now(), result = ${result} where id = ${id}`;
  await sql`insert into activity (department, message, lead_id) values (${action.department}, ${`${status === "failed" ? "Failed" : "Approved"}: ${action.title}. ${result}`}, ${action.lead_id})`;
  revalidatePath("/admin", "layout");
}

export async function rejectAction(formData: FormData) {
  await requireAdmin();
  const sql = db()!;
  const id = uuid(formData.get("id"));
  const [a] = (await sql`update actions set status = 'rejected', decided_at = now(), result = 'Rejected by you' where id = ${id} and status = 'pending' returning department, title, lead_id`) as AgentAction[];
  if (a) await sql`insert into activity (department, message, lead_id) values (${a.department}, ${`Rejected: ${a.title}`}, ${a.lead_id})`;
  revalidatePath("/admin", "layout");
}

export async function updateLead(formData: FormData) {
  await requireAdmin();
  const sql = db()!;
  const id = uuid(formData.get("id"));
  const status = String(formData.get("status") ?? "") as LeadStatus;
  if (!leadStatuses.includes(status)) return;
  const nextStep = String(formData.get("next_step") ?? "").trim() || null;
  const [before] = (await sql`select status from leads where id = ${id}`) as { status: string }[];
  await sql`update leads set status = ${status}, next_step = ${nextStep}, updated_at = now() where id = ${id}`;
  if (before && before.status !== status) await sql`insert into activity (department, message, lead_id) values ('sales', ${`You moved the lead to ${status}`}, ${id})`;
  revalidatePath("/admin", "layout");
}

export type OrderState = { ok?: boolean; error?: string };

/** Give a department an order. Its agent picks it up first on its next run. */
export async function createOrder(_prev: OrderState, formData: FormData): Promise<OrderState> {
  await requireAdmin();
  const sql = db()!;
  const department = String(formData.get("department") ?? "") as Department;
  const text = String(formData.get("text") ?? "").trim();
  if (!departments.includes(department)) return { error: "Choose a department." };
  if (text.length < 3) return { error: "Write what you want done." };
  if (text.length > 1000) return { error: "Keep the order under 1000 characters." };
  await sql`insert into orders (department, text) values (${department}, ${text})`;
  await sql`insert into activity (department, message) values (${department}, ${`New order from you: ${text.slice(0, 120)}`})`;
  revalidatePath("/admin", "layout");
  return { ok: true };
}

export async function dropOrder(formData: FormData) {
  await requireAdmin();
  const sql = db()!;
  const id = uuid(formData.get("id"));
  await sql`update orders set status = 'dropped', done_at = now(), result = 'Cancelled by you' where id = ${id} and status = 'open'`;
  revalidatePath("/admin", "layout");
}
