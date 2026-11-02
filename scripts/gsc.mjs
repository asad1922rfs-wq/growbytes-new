#!/usr/bin/env node
/**
 * Google Search Console from the terminal, using a service account.
 *
 *   npm run gsc -- sitemaps                 list submitted sitemaps
 *   npm run gsc -- submit [sitemap-url]     submit the sitemap (default: <site>/sitemap.xml)
 *   npm run gsc -- report [days]            clicks, impressions, CTR, position (default 28 days)
 *   npm run gsc -- queries [days]           top search queries
 *   npm run gsc -- pages [days]             top pages (use this to plan redirects)
 *   npm run gsc -- inspect <url>            index status of one URL
 *
 * Reads from .env.local:
 *   GSC_KEY_FILE   path to the service account JSON key (keep it out of git)
 *   GSC_PROPERTY   "sc-domain:growbytes.co" for a Domain property,
 *                  or "https://growbytes.co/" for a URL-prefix property
 *   GSC_SITE_URL   public site origin, used for the default sitemap URL
 */
import { createSign } from "node:crypto";
import { readFileSync } from "node:fs";

const PROPERTY = process.env.GSC_PROPERTY || "sc-domain:growbytes.co";
const SITE = (process.env.GSC_SITE_URL || "https://growbytes.co").replace(/\/$/, "");
const SCOPE = "https://www.googleapis.com/auth/webmasters";

function fail(msg) {
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

/** Exchanges a signed JWT for a short-lived access token. */
async function accessToken() {
  const key = loadKey();
  const now = Math.floor(Date.now() / 1000);
  const unsigned = `${b64url({ alg: "RS256", typ: "JWT" })}.${b64url({
    iss: key.client_email,
    scope: SCOPE,
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

async function api(method, url, body) {
  const token = await accessToken();
  const res = await fetch(url, {
    method,
    headers: { Authorization: `Bearer ${token}`, ...(body ? { "Content-Type": "application/json" } : {}) },
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await res.text();
  const data = text ? JSON.parse(text) : {};
  if (!res.ok) {
    const hint = res.status === 403 ? " Is the service account added as a user on this Search Console property?" : "";
    fail(`Search Console API error ${res.status}: ${data.error?.message || text}${hint}`);
  }
  return data;
}

const site = encodeURIComponent(PROPERTY);
const base = `https://www.googleapis.com/webmasters/v3/sites/${site}`;

function range(days) {
  const end = new Date(Date.now() - 2 * 864e5); // data lags about two days
  const start = new Date(end.getTime() - (Number(days) || 28) * 864e5);
  const iso = (d) => d.toISOString().slice(0, 10);
  return { startDate: iso(start), endDate: iso(end) };
}

const fmt = (r) => ({
  clicks: r.clicks,
  impressions: r.impressions,
  ctr: `${(r.ctr * 100).toFixed(1)}%`,
  position: r.position.toFixed(1),
});

const [cmd, arg] = process.argv.slice(2);

switch (cmd) {
  case "sitemaps": {
    const data = await api("GET", `${base}/sitemaps`);
    const rows = (data.sitemap || []).map((s) => ({
      sitemap: s.path,
      submitted: s.lastSubmitted?.slice(0, 10) ?? "-",
      downloaded: s.lastDownloaded?.slice(0, 10) ?? "-",
      errors: s.errors ?? 0,
      warnings: s.warnings ?? 0,
    }));
    if (rows.length) console.table(rows);
    else console.log("No sitemaps submitted yet. Run: npm run gsc -- submit");
    break;
  }
  case "submit": {
    const url = arg || `${SITE}/sitemap.xml`;
    await api("PUT", `${base}/sitemaps/${encodeURIComponent(url)}`);
    console.log(`Submitted ${url} to ${PROPERTY}.`);
    break;
  }
  case "report": {
    const r = range(arg);
    const data = await api("POST", `${base}/searchAnalytics/query`, { ...r });
    const total = data.rows?.[0];
    console.log(`\n${PROPERTY}  ${r.startDate} → ${r.endDate}`);
    total ? console.table([fmt(total)]) : console.log("No data for this period.");
    break;
  }
  case "queries":
  case "pages": {
    const r = range(arg);
    const data = await api("POST", `${base}/searchAnalytics/query`, {
      ...r,
      dimensions: [cmd === "queries" ? "query" : "page"],
      rowLimit: 50,
    });
    const rows = (data.rows || []).map((row) => ({ [cmd === "queries" ? "query" : "page"]: row.keys[0], ...fmt(row) }));
    console.log(`\nTop ${cmd}  ${r.startDate} → ${r.endDate}`);
    if (rows.length) console.table(rows);
    else console.log("No data for this period.");
    break;
  }
  case "inspect": {
    if (!arg) fail("Usage: npm run gsc -- inspect <full page URL>");
    const data = await api("POST", "https://searchconsole.googleapis.com/v1/urlInspection/index:inspect", {
      inspectionUrl: arg,
      siteUrl: PROPERTY,
    });
    const i = data.inspectionResult?.indexStatusResult ?? {};
    console.table([
      {
        verdict: i.verdict,
        coverage: i.coverageState,
        lastCrawl: i.lastCrawlTime?.slice(0, 10) ?? "-",
        canonical: i.googleCanonical ?? "-",
      },
    ]);
    break;
  }
  default:
    console.log(`Usage:
  npm run gsc -- sitemaps
  npm run gsc -- submit [sitemap-url]
  npm run gsc -- report [days]
  npm run gsc -- queries [days]
  npm run gsc -- pages [days]
  npm run gsc -- inspect <url>`);
}
