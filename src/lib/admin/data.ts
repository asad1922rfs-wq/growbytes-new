import "server-only";
import { requireAdmin } from "@/lib/admin/auth";
import { db, type Activity, type AgentAction, type Department, type Lead, type LeadStatus } from "@/lib/db";
import type { Inquiry } from "@/lib/inquiry/schema";

/** Saves a website inquiry as a new lead. Never throws: the form must not fail because of the database. */
export async function saveInquiryLead(inquiry: Inquiry, log?: (m: string) => void) {
  const sql = db();
  if (!sql) return;
  try {
    const [lead] = (await sql`
      insert into leads (name, email, company, website, phone, service, budget, engagement, message, source)
      values (${inquiry.name}, ${inquiry.email}, ${inquiry.company ?? null}, ${inquiry.website ?? null}, ${inquiry.phone},
              ${inquiry.service}, ${inquiry.budget ?? null}, ${inquiry.engagement ?? null}, ${inquiry.message}, 'website')
      returning id`) as { id: string }[];
    await sql`insert into activity (department, message, lead_id) values ('sales', ${`New inquiry from ${inquiry.name} (${inquiry.service})`}, ${lead.id})`;
  } catch (e) {
    log?.(`lead save failed: ${(e as Error).name}`);
  }
}

export type Overview = {
  configured: boolean;
  leads: { total: number; new: number; thisWeek: number; won: number; open: number };
  pending: number;
  byDept: Record<Department, { pending: number; done7d: number; last: string | null }>;
};

const emptyDept = () => ({ pending: 0, done7d: 0, last: null as string | null });

export async function getOverview(): Promise<Overview> {
  await requireAdmin(); // data never leaves the database without a valid session
  const sql = db();
  const base: Overview = {
    configured: Boolean(sql),
    leads: { total: 0, new: 0, thisWeek: 0, won: 0, open: 0 },
    pending: 0,
    byDept: { sales: emptyDept(), marketing: emptyDept(), projects: emptyDept(), operations: emptyDept() },
  };
  if (!sql) return base;
  const [l] = (await sql`
    select count(*)::int total,
           count(*) filter (where status = 'new')::int new,
           count(*) filter (where created_at > now() - interval '7 days')::int "thisWeek",
           count(*) filter (where status = 'won')::int won,
           count(*) filter (where status not in ('won','lost'))::int open
    from leads`) as Overview["leads"][];
  const depts = (await sql`
    select d.department,
      (select count(*)::int from actions a where a.department = d.department and a.status = 'pending') pending,
      (select count(*)::int from actions a where a.department = d.department and a.status = 'done' and a.decided_at > now() - interval '7 days') done7d,
      (select message from activity x where x.department = d.department order by created_at desc limit 1) last
    from (values ('sales'),('marketing'),('projects'),('operations')) d(department)`) as { department: Department; pending: number; done7d: number; last: string | null }[];
  for (const d of depts) base.byDept[d.department] = { pending: d.pending, done7d: d.done7d, last: d.last };
  base.leads = l;
  base.pending = depts.reduce((n, d) => n + d.pending, 0);
  return base;
}

export async function listLeads(status?: LeadStatus | "all"): Promise<Lead[]> {
  await requireAdmin(); // data never leaves the database without a valid session
  const sql = db();
  if (!sql) return [];
  return (status && status !== "all"
    ? await sql`select * from leads where status = ${status} order by created_at desc limit 200`
    : await sql`select * from leads order by created_at desc limit 200`) as Lead[];
}

export async function getLead(id: string): Promise<Lead | null> {
  await requireAdmin(); // data never leaves the database without a valid session
  const sql = db();
  if (!sql || !/^[0-9a-f-]{36}$/i.test(id)) return null;
  const [lead] = (await sql`select * from leads where id = ${id}`) as Lead[];
  return lead ?? null;
}

export async function listActions(opts: { status?: AgentAction["status"]; leadId?: string; limit?: number } = {}): Promise<AgentAction[]> {
  await requireAdmin(); // data never leaves the database without a valid session
  const sql = db();
  if (!sql) return [];
  const limit = opts.limit ?? 50;
  if (opts.leadId)
    return (await sql`select a.*, l.name lead_name from actions a left join leads l on l.id = a.lead_id where a.lead_id = ${opts.leadId} order by a.created_at desc limit ${limit}`) as AgentAction[];
  if (opts.status)
    return (await sql`select a.*, l.name lead_name from actions a left join leads l on l.id = a.lead_id where a.status = ${opts.status} order by a.created_at desc limit ${limit}`) as AgentAction[];
  return (await sql`select a.*, l.name lead_name from actions a left join leads l on l.id = a.lead_id order by a.created_at desc limit ${limit}`) as AgentAction[];
}

export async function listActivity(limit = 30, leadId?: string): Promise<Activity[]> {
  await requireAdmin(); // data never leaves the database without a valid session
  const sql = db();
  if (!sql) return [];
  return (leadId
    ? await sql`select * from activity where lead_id = ${leadId} order by created_at desc limit ${limit}`
    : await sql`select * from activity order by created_at desc limit ${limit}`) as Activity[];
}
