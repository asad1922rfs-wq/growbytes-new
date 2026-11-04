#!/usr/bin/env node
/**
 * Tools the Growbytes HQ agents (Claude skills) use to read and write the dashboard.
 * Nothing here sends anything outside: drafts wait in /admin/approvals for the owner.
 *
 *   npm run agent -- leads [--status new] [--unscored]       list leads as JSON
 *   npm run agent -- lead <id>                               one lead with its actions
 *   npm run agent -- score <id> --score 72 --reason "..." --summary "..." [--status qualified] [--next "..."]
 *   npm run agent -- draft-reply <id> --subject "..." --body-file reply.txt
 *   npm run agent -- propose <dept> <kind> --title "..." [--text-file f.txt] [--lead <id>]
 *   npm run agent -- propose marketing social_post --title "..." --text-file caption.txt --image /social/x.jpg [--when "Mon 10 Nov"]
 *   npm run agent -- publish <action-id>          posts an approved social_post to Facebook and Instagram
 *   npm run agent -- actions [--status approved] [--dept marketing]
 *   npm run agent -- done <action-id> "what happened"        mark an approved action as carried out
 *   npm run agent -- log <dept> "message" [--lead <id>]
 *   npm run agent -- stats
 *   npm run agent -- orders [--dept sales]                  open orders from the owner (do these first)
 *   npm run agent -- order-done <order-id> "what you did"
 */
import { readFileSync } from "node:fs";
import { neon } from "@neondatabase/serverless";

const url = (process.env.DATABASE_URL || "").replace(/^"|"$/g, "");
if (!url) fail("Set DATABASE_URL in .env.local first.");
const sql = neon(url);
const DEPTS = ["sales", "marketing", "projects", "operations"];
const STATUSES = ["new", "qualified", "contacted", "proposal", "won", "lost"];

function fail(msg) {
  console.error(msg);
  process.exit(1);
}

const argv = process.argv.slice(2);
const flags = {};
const pos = [];
for (let i = 0; i < argv.length; i++) {
  if (argv[i].startsWith("--")) {
    const k = argv[i].slice(2);
    const next = argv[i + 1];
    flags[k] = next === undefined || next.startsWith("--") ? true : (i++, next);
  } else pos.push(argv[i]);
}
const [cmd, a1, a2] = pos;
const out = (v) => console.log(JSON.stringify(v, null, 2));
const isId = (v) => typeof v === "string" && /^[0-9a-f-]{36}$/i.test(v);
const fileOrFlag = (fileKey, key) => (flags[fileKey] ? readFileSync(flags[fileKey], "utf8").trim() : flags[key] ? String(flags[key]) : "");

const commands = {
  async leads() {
    const status = flags.status && STATUSES.includes(flags.status) ? flags.status : null;
    const rows = await sql`
      select id, created_at, name, email, company, website, phone, service, budget, engagement, message, status, score, summary, next_step
      from leads
      where (${status}::text is null or status = ${status})
        and (${!!flags.unscored} = false or score is null)
      order by created_at desc limit 100`;
    out(rows);
  },

  async lead() {
    if (!isId(a1)) fail("Usage: lead <id>");
    const [lead] = await sql`select * from leads where id = ${a1}`;
    if (!lead) fail("No lead with that id.");
    const actions = await sql`select id, created_at, kind, title, status, payload, result from actions where lead_id = ${a1} order by created_at desc`;
    out({ ...lead, actions });
  },

  async score() {
    if (!isId(a1)) fail("Usage: score <id> --score 0-100 --reason ... --summary ...");
    const score = Number(flags.score);
    if (!Number.isInteger(score) || score < 0 || score > 100) fail("--score must be a whole number 0-100.");
    const status = flags.status && STATUSES.includes(flags.status) ? flags.status : null;
    const [lead] = await sql`
      update leads set score = ${score}, score_reason = ${flags.reason || null}, summary = ${flags.summary || null},
        next_step = coalesce(${flags.next || null}, next_step),
        status = coalesce(${status}, case when status = 'new' and ${score} >= 40 then 'qualified' else status end),
        updated_at = now()
      where id = ${a1} returning name, status`;
    if (!lead) fail("No lead with that id.");
    await sql`insert into activity (department, message, lead_id) values ('sales', ${`Scored ${lead.name}: ${score}/100`}, ${a1})`;
    out({ ok: true, ...lead, score });
  },

  async "draft-reply"() {
    if (!isId(a1)) fail("Usage: draft-reply <id> --subject ... --body-file reply.txt");
    const body = fileOrFlag("body-file", "body");
    if (!flags.subject || !body) fail("--subject and --body-file (or --body) are required.");
    const [lead] = await sql`select name, email from leads where id = ${a1}`;
    if (!lead) fail("No lead with that id.");
    await sql`delete from actions where lead_id = ${a1} and kind = 'email_reply' and status = 'pending'`;
    const [action] = await sql`
      insert into actions (department, kind, title, payload, lead_id)
      values ('sales', 'email_reply', ${`Reply to ${lead.name}`}, ${JSON.stringify({ to: lead.email, subject: flags.subject, body })}::jsonb, ${a1})
      returning id`;
    await sql`insert into activity (department, message, lead_id) values ('sales', ${`Drafted a reply to ${lead.name}`}, ${a1})`;
    out({ ok: true, action: action.id, waiting: "/admin/approvals/" });
  },

  async propose() {
    if (!DEPTS.includes(a1) || !a2 || !flags.title) fail("Usage: propose <dept> <kind> --title ... [--text-file f.txt] [--lead <id>]");
    const text = fileOrFlag("text-file", "text");
    const lead = isId(flags.lead) ? flags.lead : null;
    const [action] = await sql`
      insert into actions (department, kind, title, payload, lead_id)
      values (${a1}, ${a2}, ${flags.title}, ${JSON.stringify({ text, ...(flags.image ? { image: flags.image.replace(/^.*?\/social\//, "/social/") } : {}), ...(flags.when ? { when: flags.when } : {}) })}::jsonb, ${lead})
      returning id`;
    await sql`insert into activity (department, message, lead_id) values (${a1}, ${`Proposed: ${flags.title}`}, ${lead})`;
    out({ ok: true, action: action.id });
  },

  async actions() {
    const status = flags.status || null;
    const dept = flags.dept || null;
    out(await sql`
      select id, created_at, department, kind, title, status, payload, lead_id, result from actions
      where (${status}::text is null or status = ${status}) and (${dept}::text is null or department = ${dept})
      order by created_at desc limit 50`);
  },

  async done() {
    if (!isId(a1)) fail('Usage: done <action-id> "what happened"');
    const [a] = await sql`update actions set status = 'done', result = ${a2 || "Done"}, decided_at = coalesce(decided_at, now()) where id = ${a1} and status = 'approved' returning department, title, lead_id`;
    if (!a) fail("No approved action with that id.");
    await sql`insert into activity (department, message, lead_id) values (${a.department}, ${`Done: ${a.title}${a2 ? `. ${a2}` : ""}`}, ${a.lead_id})`;
    out({ ok: true });
  },

  // Publish an approved social post to the Facebook Page and Instagram, then mark it done.
  async publish() {
    if (!isId(a1)) fail("Usage: publish <action-id>");
    const [a] = await sql`select * from actions where id = ${a1} and kind = 'social_post' and status = 'approved'`;
    if (!a) fail("No approved social post with that id.");
    const img = a.payload.image?.startsWith("http") ? a.payload.image : `https://www.growbytes.co${a.payload.image}`;
    const { execFileSync } = await import("node:child_process");
    const run = (...args) => execFileSync(process.execPath, ["--env-file-if-exists=.env.local", "scripts/meta.mjs", ...args], { encoding: "utf8" }).trim();
    const results = [];
    for (const target of ["fb-image", "ig"]) {
      try {
        results.push(run(target, img, a.payload.text || ""));
      } catch (e) {
        results.push(`${target} failed: ${(e.stderr || e.message).toString().trim()}`);
      }
    }
    const ok = !results.some((r) => r.includes("failed"));
    const result = results.join(" | ");
    await sql`update actions set status = ${ok ? "done" : "failed"}, result = ${result} where id = ${a1}`;
    await sql`insert into activity (department, message) values ('marketing', ${`${ok ? "Published" : "Publish failed"}: ${a.title}`})`;
    out({ ok, result });
  },

  async log() {
    if (!DEPTS.includes(a1) || !a2) fail('Usage: log <dept> "message" [--lead <id>]');
    await sql`insert into activity (department, message, lead_id) values (${a1}, ${a2}, ${isId(flags.lead) ? flags.lead : null})`;
    out({ ok: true });
  },

  async orders() {
    const dept = flags.dept || null;
    out(await sql`select id, created_at, department, text from orders where status = 'open' and (${dept}::text is null or department = ${dept}) order by created_at`);
  },

  async "order-done"() {
    if (!isId(a1)) fail('Usage: order-done <order-id> "what you did"');
    const [o] = await sql`update orders set status = 'done', done_at = now(), result = ${a2 || "Done"} where id = ${a1} and status = 'open' returning department, text`;
    if (!o) fail("No open order with that id.");
    await sql`insert into activity (department, message) values (${o.department}, ${`Finished your order: ${o.text}${a2 ? `. ${a2}` : ""}`})`;
    out({ ok: true });
  },

  async stats() {
    const [l] = await sql`select count(*)::int total, count(*) filter (where status='new')::int new, count(*) filter (where score is null)::int unscored from leads`;
    const [p] = await sql`select count(*)::int pending from actions where status='pending'`;
    const [ap] = await sql`select count(*)::int approved from actions where status='approved'`;
    const [o] = await sql`select count(*)::int open from orders where status='open'`;
    out({ leads: l, pendingApprovals: p.pending, approvedToCarryOut: ap.approved, openOrders: o.open });
  },
};

if (!commands[cmd]) fail("Commands: " + Object.keys(commands).join(" | ") + "   (see the top of scripts/agent.mjs)");
await commands[cmd]();
