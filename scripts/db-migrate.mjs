#!/usr/bin/env node
/**
 * Creates or updates the Growbytes HQ database tables (Neon Postgres).
 *   npm run db:migrate
 * Safe to run again: every statement is idempotent.
 */
import { neon } from "@neondatabase/serverless";

const url = process.env.DATABASE_URL_UNPOOLED || process.env.DATABASE_URL;
if (!url) {
  console.error("Set DATABASE_URL in .env.local first.");
  process.exit(1);
}
const sql = neon(url.replace(/^"|"$/g, ""));

const statements = [
  `create extension if not exists pgcrypto`,

  // Every inquiry from the website, plus leads the agents or you add by hand.
  `create table if not exists leads (
    id uuid primary key default gen_random_uuid(),
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now(),
    name text not null,
    email text not null,
    company text,
    website text,
    phone text,
    service text,
    budget text,
    engagement text,
    message text,
    source text not null default 'website',
    status text not null default 'new',          -- new | qualified | contacted | proposal | won | lost
    score int,                                    -- 0-100, set by the Sales agent
    score_reason text,
    summary text,                                 -- one-paragraph brief from the Sales agent
    next_step text,
    next_step_at timestamptz
  )`,
  `create index if not exists leads_status_idx on leads (status, created_at desc)`,

  // Anything an agent wants to do in the outside world waits here for your approval.
  `create table if not exists actions (
    id uuid primary key default gen_random_uuid(),
    created_at timestamptz not null default now(),
    department text not null,                     -- sales | marketing | projects | operations
    kind text not null,                           -- email_reply | social_post | task | note
    title text not null,
    payload jsonb not null default '{}'::jsonb,   -- e.g. { to, subject, body } for email_reply
    lead_id uuid references leads(id) on delete set null,
    status text not null default 'pending',       -- pending | approved | rejected | done | failed
    decided_at timestamptz,
    result text
  )`,
  `create index if not exists actions_status_idx on actions (status, created_at desc)`,

  // A running log of what each agent (and you) did.
  `create table if not exists activity (
    id bigserial primary key,
    created_at timestamptz not null default now(),
    department text not null,
    message text not null,
    lead_id uuid references leads(id) on delete set null
  )`,
  `create index if not exists activity_created_idx on activity (created_at desc)`,
];

for (const s of statements) await sql.query(s);
const [{ count }] = await sql`select count(*)::int as count from leads`;
console.log(`Database ready. Leads stored: ${count}.`);
