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
import { fail, googleApi, range } from "./lib/google-auth.mjs";

const PROPERTY = process.env.GSC_PROPERTY || "sc-domain:growbytes.co";
const SITE = (process.env.GSC_SITE_URL || "https://www.growbytes.co").replace(/\/$/, "");
const SCOPE = "https://www.googleapis.com/auth/webmasters";
const api = (method, url, body) => googleApi(SCOPE, method, url, body, "this Search Console property");

const site = encodeURIComponent(PROPERTY);
const base = `https://www.googleapis.com/webmasters/v3/sites/${site}`;

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
