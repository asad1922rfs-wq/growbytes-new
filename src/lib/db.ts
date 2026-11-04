import "server-only";
import { neon, type NeonQueryFunction } from "@neondatabase/serverless";

let client: NeonQueryFunction<false, false> | null = null;

/** Neon SQL client, or null when DATABASE_URL isn't configured (the site still works without it). */
export function db() {
  const url = process.env.DATABASE_URL?.replace(/^"|"$/g, "");
  if (!url) return null;
  client ??= neon(url);
  return client;
}

export type Lead = {
  id: string;
  created_at: string;
  updated_at: string;
  name: string;
  email: string;
  company: string | null;
  website: string | null;
  phone: string | null;
  service: string | null;
  budget: string | null;
  engagement: string | null;
  message: string | null;
  source: string;
  status: LeadStatus;
  score: number | null;
  score_reason: string | null;
  summary: string | null;
  next_step: string | null;
  next_step_at: string | null;
};

export const leadStatuses = ["new", "qualified", "contacted", "proposal", "won", "lost"] as const;
export type LeadStatus = (typeof leadStatuses)[number];

export type AgentAction = {
  id: string;
  created_at: string;
  department: Department;
  kind: string;
  title: string;
  payload: Record<string, unknown>;
  lead_id: string | null;
  status: "pending" | "approved" | "rejected" | "done" | "failed";
  decided_at: string | null;
  result: string | null;
  lead_name?: string | null;
};

export type Activity = { id: number; created_at: string; department: Department; message: string; lead_id: string | null };

export const departments = ["sales", "marketing", "projects", "operations"] as const;
export type Department = (typeof departments)[number];
