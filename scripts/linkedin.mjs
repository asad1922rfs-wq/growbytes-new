#!/usr/bin/env node
/**
 * Post to LinkedIn from the terminal.
 *
 *   npm run linkedin -- login                       sign in (opens the browser); repeat every ~60 days
 *   npm run linkedin -- whoami                      show the connected account
 *   npm run linkedin -- post "Text to share"        text post on your profile
 *   npm run linkedin -- article <insights-slug> ["Intro text"]   share an Insights article as a link post
 *   npm run linkedin -- image <file.png> "Text"   image post (e.g. a card from npm run social:card)
 *
 * Add --dry to post/article/image to print what would be sent without posting.
 * Add --page to any command to use the Growbytes company page instead of your profile
 * (second app with Community Management API; `npm run linkedin -- login --page` first).
 *
 * Reads/writes .env.local:
 *   LINKEDIN_CLIENT_ID, LINKEDIN_CLIENT_SECRET   from the LinkedIn developer app
 *   LINKEDIN_ACCESS_TOKEN, LINKEDIN_TOKEN_EXPIRES, LINKEDIN_PERSON_URN   written by `login`
 *   LINKEDIN_PAGE_CLIENT_ID, LINKEDIN_PAGE_CLIENT_SECRET, LINKEDIN_ORG_ID   company page app
 *   LINKEDIN_PAGE_ACCESS_TOKEN, LINKEDIN_PAGE_TOKEN_EXPIRES   written by `login --page`
 */
import { readFileSync, writeFileSync } from "node:fs";
import { createServer } from "node:http";
import { randomBytes } from "node:crypto";
import { exec } from "node:child_process";

const ENV_FILE = ".env.local";
const PORT = 3999;
const REDIRECT = `http://localhost:${PORT}/callback`;
const SITE = (process.env.GSC_SITE_URL || "https://www.growbytes.co").replace(/\/$/, "");
const VERSION = process.env.LINKEDIN_API_VERSION || "202610"; // LinkedIn-Version header (YYYYMM)

const PAGE = process.argv.includes("--page");

function fail(msg) {
  console.error(`\n  ${msg}\n`);
  process.exit(1);
}

function saveEnv(values) {
  let text = "";
  try {
    text = readFileSync(ENV_FILE, "utf8");
  } catch {}
  for (const [k, v] of Object.entries(values)) {
    const line = `${k}=${v}`;
    const re = new RegExp(`^${k}=.*$`, "m");
    text = re.test(text) ? text.replace(re, line) : `${text.replace(/\s*$/, "")}\n${line}\n`;
  }
  writeFileSync(ENV_FILE, text);
}

async function login() {
  const id = PAGE ? process.env.LINKEDIN_PAGE_CLIENT_ID : process.env.LINKEDIN_CLIENT_ID;
  const secret = PAGE ? process.env.LINKEDIN_PAGE_CLIENT_SECRET : process.env.LINKEDIN_CLIENT_SECRET;
  if (!id || !secret)
    fail(PAGE ? "Set LINKEDIN_PAGE_CLIENT_ID and LINKEDIN_PAGE_CLIENT_SECRET in .env.local first." : "Set LINKEDIN_CLIENT_ID and LINKEDIN_CLIENT_SECRET in .env.local first.");
  if (PAGE && !process.env.LINKEDIN_ORG_ID) fail("Set LINKEDIN_ORG_ID (the number in linkedin.com/company/<id>/admin/) in .env.local first.");
  const state = randomBytes(16).toString("hex");
  const scopes = PAGE ? ["w_organization_social", "r_organization_social"] : ["openid", "profile", "w_member_social"];
  const url = `https://www.linkedin.com/oauth/v2/authorization?${new URLSearchParams({
    response_type: "code",
    client_id: id,
    redirect_uri: REDIRECT,
    state,
    scope: scopes.join(" "),
  })}`;

  const code = await new Promise((resolve, reject) => {
    const server = createServer((req, res) => {
      const u = new URL(req.url, REDIRECT);
      if (u.pathname !== "/callback") return res.end();
      const ok = u.searchParams.get("state") === state && u.searchParams.get("code");
      res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
      res.end(ok ? "<h2>LinkedIn connected. You can close this tab.</h2>" : `<h2>Sign-in failed: ${u.searchParams.get("error_description") || "state mismatch"}</h2>`);
      server.close();
      ok ? resolve(u.searchParams.get("code")) : reject(new Error(u.searchParams.get("error_description") || "state mismatch"));
    }).listen(PORT, () => {
      console.log(`\nOpening LinkedIn sign-in… If it doesn't open, visit:\n${url}\n`);
      const opener = process.platform === "win32" ? `start "" "${url}"` : process.platform === "darwin" ? `open "${url}"` : `xdg-open "${url}"`;
      exec(opener);
    });
    setTimeout(() => {
      server.close();
      reject(new Error("timed out after 5 minutes"));
    }, 300_000);
  }).catch((e) => fail(`Sign-in failed: ${e.message}`));

  const tokenRes = await fetch("https://www.linkedin.com/oauth/v2/accessToken", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ grant_type: "authorization_code", code, redirect_uri: REDIRECT, client_id: id, client_secret: secret }),
  });
  const token = await tokenRes.json();
  if (!tokenRes.ok) fail(`Token exchange failed: ${token.error_description || token.error}`);

  const expiresOn = new Date(Date.now() + token.expires_in * 1000).toISOString().slice(0, 10);
  if (PAGE) {
    saveEnv({ LINKEDIN_PAGE_ACCESS_TOKEN: token.access_token, LINKEDIN_PAGE_TOKEN_EXPIRES: expiresOn });
    console.log(`Company page connected (organization ${process.env.LINKEDIN_ORG_ID}). Token valid until ${expiresOn}.`);
    return;
  }

  const me = await (await fetch("https://api.linkedin.com/v2/userinfo", { headers: { Authorization: `Bearer ${token.access_token}` } })).json();
  if (!me.sub) fail("Signed in, but could not read the profile. Is 'Sign In with LinkedIn using OpenID Connect' added to the app?");

  const expires = expiresOn;
  saveEnv({ LINKEDIN_ACCESS_TOKEN: token.access_token, LINKEDIN_TOKEN_EXPIRES: expires, LINKEDIN_PERSON_URN: `urn:li:person:${me.sub}` });
  console.log(`Connected as ${me.name}. Token saved to ${ENV_FILE}, valid until ${expires}.`);
}

function auth() {
  const token = PAGE ? process.env.LINKEDIN_PAGE_ACCESS_TOKEN : process.env.LINKEDIN_ACCESS_TOKEN;
  const relogin = PAGE ? "npm run linkedin -- login --page" : "npm run linkedin -- login";
  if (!token) fail(`Not signed in. Run: ${relogin}`);
  const exp = PAGE ? process.env.LINKEDIN_PAGE_TOKEN_EXPIRES : process.env.LINKEDIN_TOKEN_EXPIRES;
  if (exp && new Date(exp) < new Date()) fail(`Token expired on ${exp}. Run: ${relogin}`);
  return token;
}

function author() {
  if (PAGE) return `urn:li:organization:${process.env.LINKEDIN_ORG_ID || fail("Missing LINKEDIN_ORG_ID in .env.local")}`;
  return process.env.LINKEDIN_PERSON_URN || fail("Missing LINKEDIN_PERSON_URN. Run: npm run linkedin -- login");
}

async function publish(body, dry) {
  if (dry) {
    console.log("\n[dry run] Would post:\n");
    console.log(JSON.stringify(body, null, 2));
    return;
  }
  const res = await fetch("https://api.linkedin.com/rest/posts", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${auth()}`,
      "Content-Type": "application/json",
      "LinkedIn-Version": VERSION,
      "X-Restli-Protocol-Version": "2.0.0",
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const t = await res.text();
    fail(`LinkedIn rejected the post (${res.status}): ${t}`);
  }
  const id = res.headers.get("x-restli-id");
  console.log(`Posted. ${id ? `https://www.linkedin.com/feed/update/${id}/` : ""}`);
}

/** Uploads a PNG/JPG through the Images API and returns its image URN. */
async function uploadImage(file) {
  const headers = {
    Authorization: `Bearer ${auth()}`,
    "Content-Type": "application/json",
    "LinkedIn-Version": VERSION,
    "X-Restli-Protocol-Version": "2.0.0",
  };
  const init = await fetch("https://api.linkedin.com/rest/images?action=initializeUpload", {
    method: "POST",
    headers,
    body: JSON.stringify({ initializeUploadRequest: { owner: author() } }),
  });
  const data = await init.json();
  if (!init.ok) fail(`Image upload could not start (${init.status}): ${JSON.stringify(data)}`);
  const { uploadUrl, image } = data.value;
  const put = await fetch(uploadUrl, { method: "PUT", headers: { Authorization: `Bearer ${auth()}` }, body: readFileSync(file) });
  if (!put.ok) fail(`Image upload failed (${put.status}): ${await put.text()}`);
  return image;
}

const base = (commentary) => ({
  author: author(),
  commentary,
  visibility: "PUBLIC",
  distribution: { feedDistribution: "MAIN_FEED", targetEntities: [], thirdPartyDistributionChannels: [] },
  lifecycleState: "PUBLISHED",
  isReshareDisabledByAuthor: false,
});

// LinkedIn "little text" format reserves these characters
const escape = (s) => s.replace(/[\\|{}@[\]()<>#*_~]/g, (c) => `\\${c}`);

function article(slug) {
  const src = readFileSync("src/content/insights.ts", "utf8");
  const start = src.indexOf(`slug: "${slug}"`);
  if (start < 0) fail(`No article with slug "${slug}" in src/content/insights.ts`);
  const block = src.slice(start, src.indexOf("\n  },", start));
  const pick = (k) => block.match(new RegExp(`${k}:\\s*"([^"]+)"`))?.[1];
  return { title: pick("title"), description: pick("description"), url: `${SITE}/insights/${slug}/` };
}

const args = process.argv.slice(2);
const dry = args.includes("--dry");
const [cmd, a1, a2] = args.filter((x) => x !== "--dry" && x !== "--page");

switch (cmd) {
  case "login":
    await login();
    break;
  case "whoami": {
    const me = await (await fetch("https://api.linkedin.com/v2/userinfo", { headers: { Authorization: `Bearer ${auth()}` } })).json();
    console.log(me.name ? `${me.name} (${process.env.LINKEDIN_PERSON_URN}), token valid until ${process.env.LINKEDIN_TOKEN_EXPIRES}` : me);
    break;
  }
  case "post":
    if (!a1) fail('Usage: npm run linkedin -- post "Text to share"');
    await publish(base(escape(a1)), dry);
    break;
  case "article": {
    if (!a1) fail("Usage: npm run linkedin -- article <insights-slug> [\"Intro text\"]");
    const art = article(a1);
    const text = a2 || `${art.description}\n\nRead the full guide:`;
    await publish(
      { ...base(escape(text)), content: { article: { source: art.url, title: art.title, description: art.description } } },
      dry,
    );
    break;
  }
  case "image": {
    if (!a1 || !a2) fail('Usage: npm run linkedin -- image <file.png> "Text"');
    if (dry) {
      console.log(`\n[dry run] Would upload ${a1} and post:\n\n${a2}`);
      break;
    }
    const image = await uploadImage(a1);
    await publish({ ...base(escape(a2)), content: { media: { id: image, altText: "Growbytes guide cover" } } }, false);
    break;
  }
  default:
    console.log(`Usage:
  npm run linkedin -- login
  npm run linkedin -- whoami
  npm run linkedin -- post "Text" [--dry]
  npm run linkedin -- article <slug> ["Intro text"] [--dry]
  npm run linkedin -- image <file.png> "Text" [--dry]`);
}
