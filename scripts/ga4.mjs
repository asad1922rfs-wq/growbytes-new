#!/usr/bin/env node
/**
 * Google Analytics 4 from the terminal, using the same service account as Search Console.
 *
 *   npm run ga4 -- overview [days]   users, sessions, engagement, key events (default 28 days)
 *   npm run ga4 -- pages [days]      top landing pages
 *   npm run ga4 -- sources [days]    traffic by channel (organic, direct, referral...)
 *   npm run ga4 -- organic [days]    landing pages for organic search only
 *
 * Reads from .env.local:
 *   GSC_KEY_FILE       service account JSON key (shared with npm run gsc)
 *   GA4_PROPERTY_ID    numeric GA4 property ID (Admin > Property details)
 */
import { fail, googleApi, range } from "./lib/google-auth.mjs";

const PROPERTY_ID = process.env.GA4_PROPERTY_ID;
const SCOPE = "https://www.googleapis.com/auth/analytics.readonly";

if (!PROPERTY_ID && process.argv[2]) fail("GA4_PROPERTY_ID is not set. Add it to .env.local (see .env.example).");

const report = (body) =>
  googleApi(SCOPE, "POST", `https://analyticsdata.googleapis.com/v1beta/properties/${PROPERTY_ID}:runReport`, body, "this GA4 property");

const pct = (v) => `${(Number(v) * 100).toFixed(1)}%`;
const secs = (v) => `${Math.round(Number(v))}s`;

const [cmd, arg] = process.argv.slice(2);
const dateRanges = [range(arg)];

const metrics = ["activeUsers", "sessions", "engagementRate", "averageSessionDuration", "keyEvents"].map((name) => ({ name }));

function rowsToTable(data, dimLabel) {
  return (data.rows || []).map((r) => {
    const [users, sessions, engagement, duration, keyEvents] = r.metricValues.map((m) => m.value);
    return {
      ...(dimLabel ? { [dimLabel]: r.dimensionValues[0].value } : {}),
      users: Number(users),
      sessions: Number(sessions),
      engaged: pct(engagement),
      avgTime: secs(duration),
      keyEvents: Number(keyEvents),
    };
  });
}

switch (cmd) {
  case "overview": {
    const data = await report({ dateRanges, metrics });
    console.log(`\nGA4 ${PROPERTY_ID}  ${dateRanges[0].startDate} → ${dateRanges[0].endDate}`);
    const rows = rowsToTable(data);
    if (rows.length) console.table(rows);
    else console.log("No data for this period.");
    break;
  }
  case "pages":
  case "organic": {
    const data = await report({
      dateRanges,
      metrics,
      dimensions: [{ name: "landingPagePlusQueryString" }],
      orderBys: [{ metric: { metricName: "sessions" }, desc: true }],
      limit: 30,
      ...(cmd === "organic"
        ? { dimensionFilter: { filter: { fieldName: "sessionDefaultChannelGroup", stringFilter: { value: "Organic Search" } } } }
        : {}),
    });
    const rows = rowsToTable(data, "page");
    if (rows.length) console.table(rows);
    else console.log("No data for this period.");
    break;
  }
  case "sources": {
    const data = await report({
      dateRanges,
      metrics,
      dimensions: [{ name: "sessionDefaultChannelGroup" }],
      orderBys: [{ metric: { metricName: "sessions" }, desc: true }],
    });
    const rows = rowsToTable(data, "channel");
    if (rows.length) console.table(rows);
    else console.log("No data for this period.");
    break;
  }
  default:
    console.log(`Usage:
  npm run ga4 -- overview [days]
  npm run ga4 -- pages [days]
  npm run ga4 -- sources [days]
  npm run ga4 -- organic [days]`);
}
