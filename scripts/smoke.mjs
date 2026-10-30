// Route smoke test against a running server (default http://localhost:3000).
// Usage: npm run build && npm run start, then in another terminal: npm run test:smoke
const BASE = (process.env.BASE_URL ?? "http://localhost:3000").replace(/\/$/, "");

const services = [
  "web-design-development",
  "shopify-development",
  "custom-software-development",
  "seo",
  "paid-advertising",
  "branding",
  "ai-automation",
  "crm-integrations",
  "conversion-optimization",
  "mobile-app-development",
  "ui-ux-design",
  "email-marketing",
];
const work = ["hearthline-homeware", "northgate-property-care", "relay-freight-operations"];
const insights = [
  "prepare-before-redesigning-your-business-website",
  "shopify-theme-customization-or-custom-storefront",
  "how-to-identify-a-business-workflow-worth-automating",
  "how-to-write-a-project-brief-for-an-agency",
  "seo-or-paid-ads-where-to-start",
];

const pages = [
  "/",
  "/services/",
  ...services.map((s) => `/services/${s}/`),
  "/work/",
  ...work.map((s) => `/work/${s}/`),
  "/about/",
  "/insights/",
  ...insights.map((s) => `/insights/${s}/`),
  "/contact/",
];

let failures = 0;
const fail = (msg) => {
  failures++;
  console.error(`  ✗ ${msg}`);
};

async function get(path, opts = {}) {
  return fetch(BASE + path, { redirect: "manual", ...opts });
}

for (const path of pages) {
  const res = await get(path);
  const html = await res.text();
  const h1s = (html.match(/<h1[\s>]/g) ?? []).length;
  const title = html.match(/<title>([^<]*)<\/title>/)?.[1];
  const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
  const ok = res.status === 200 && h1s === 1 && title && canonical?.endsWith(path);
  console.log(`${ok ? "✓" : "✗"} ${path}  [${res.status}] h1=${h1s} title="${title ?? ""}"`);
  if (res.status !== 200) fail(`${path} returned ${res.status}`);
  if (h1s !== 1) fail(`${path} has ${h1s} <h1> elements`);
  if (!title) fail(`${path} missing <title>`);
  if (!canonical?.endsWith(path)) fail(`${path} canonical is ${canonical}`);
  if (!html.includes('href="/contact/"')) fail(`${path} missing project CTA link`);
  if (path.startsWith("/work/") && path !== "/work/" && !html.includes("Concept project — illustrative work, not a client engagement."))
    fail(`${path} missing concept label`);
}

// Titles must be unique across public pages.
{
  const titles = await Promise.all(pages.map(async (p) => (await (await get(p)).text()).match(/<title>([^<]*)<\/title>/)?.[1]));
  if (new Set(titles).size !== titles.length) fail("duplicate <title> values across pages");
}

// Utility and draft routes.
{
  const r = await get("/thank-you/");
  const html = await r.text();
  // Without the post-submission cookie, the page must not show the success message.
  const leaked = html.includes("Your project details reached us");
  console.log(`${!leaked ? "✓" : "✗"} /thank-you/ gated without cookie [${r.status}]`);
  if (leaked) fail("/thank-you/ shows success without a delivered inquiry");
}
for (const p of ["/privacy/", "/terms/", "/cookies/", "/accessibility/"]) {
  const html = await (await get(p)).text();
  const noindex = /<meta name="robots" content="noindex/.test(html);
  console.log(`${noindex ? "✓" : "✗"} ${p} noindex`);
  if (!noindex) fail(`${p} must be noindex`);
}
{
  const r = await get("/this-page-does-not-exist/");
  console.log(`${r.status === 404 ? "✓" : "✗"} unknown route → ${r.status}`);
  if (r.status !== 404) fail("unknown route should return 404");
}
{
  // Follow the chain (trailing-slash normalization, then the permanent redirect).
  let path = "/blog";
  let r;
  const hops = [];
  for (let i = 0; i < 4; i++) {
    r = await get(path);
    if (![301, 308].includes(r.status)) break;
    path = new URL(r.headers.get("location"), BASE).pathname;
    hops.push(`${r.status} ${path}`);
  }
  const loc = hops.join(" → ");
  const ok = path === "/insights/" && r.status === 200;
  console.log(`${ok ? "✓" : "✗"} /blog redirect → ${r.status} ${loc}`);
  if (!ok) fail("/blog should permanently redirect to /insights/");
}
{
  const sitemap = await (await get("/sitemap.xml")).text();
  const locs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  const bad = locs.filter((l) => /thank-you|privacy|terms|cookies|accessibility/.test(l));
  console.log(`${locs.length === pages.length && !bad.length ? "✓" : "✗"} sitemap.xml has ${locs.length} URLs`);
  if (locs.length !== pages.length) fail(`sitemap has ${locs.length} URLs, expected ${pages.length}`);
  if (bad.length) fail(`sitemap includes non-public routes: ${bad.join(", ")}`);
  const robots = await (await get("/robots.txt")).text();
  console.log(`  robots.txt: ${robots.replace(/\n/g, " | ")}`);
}

console.log(failures ? `\n${failures} check(s) failed` : "\nAll smoke checks passed");
process.exit(failures ? 1 : 0);
