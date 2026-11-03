#!/usr/bin/env node
/**
 * Post to the Growbytes Facebook Page and Instagram account (Meta Graph API).
 *
 *   npm run meta -- connect                       turns META_USER_TOKEN into a lasting Page token
 *   npm run meta -- whoami                        shows the connected Page and Instagram account
 *   npm run meta -- fb "text" [link]              text post on the Facebook Page
 *   npm run meta -- fb-image <image-url> "text"   image post on the Facebook Page
 *   npm run meta -- ig <image-url> "caption"      image post on Instagram (JPEG at a public URL)
 * Add --dry to print what would be sent without posting.
 *
 * .env.local:
 *   META_APP_ID, META_APP_SECRET   from developers.facebook.com → your app → Settings → Basic
 *   META_USER_TOKEN                short-lived token from Graph API Explorer (used once by `connect`)
 *   META_PAGE_ID, META_PAGE_TOKEN, META_IG_ID   written by `connect`
 */
import { readFileSync, writeFileSync } from "node:fs";

const GRAPH = "https://graph.facebook.com/v23.0";
const ENV_FILE = ".env.local";
const DRY = process.argv.includes("--dry");
const env = process.env;

function fail(msg) {
  console.error(msg);
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

async function graph(method, path, params = {}) {
  const url = new URL(`${GRAPH}/${path}`);
  const init = { method };
  if (method === "GET") for (const [k, v] of Object.entries(params)) url.searchParams.set(k, v);
  else init.body = new URLSearchParams(params);
  const res = await fetch(url, init);
  const data = await res.json();
  if (!res.ok || data.error) fail(`Meta API error (${path}): ${data.error?.message || res.status}`);
  return data;
}

function pageAuth() {
  if (!env.META_PAGE_TOKEN || !env.META_PAGE_ID) fail("Not connected. Run: npm run meta -- connect");
  return { id: env.META_PAGE_ID, token: env.META_PAGE_TOKEN };
}

async function connect() {
  const { META_APP_ID: id, META_APP_SECRET: secret, META_USER_TOKEN: short } = env;
  if (!id || !secret || !short) fail("Set META_APP_ID, META_APP_SECRET and META_USER_TOKEN in .env.local first.");
  // Short-lived user token → 60-day user token; Page tokens taken from it do not expire.
  const long = await graph("GET", "oauth/access_token", {
    grant_type: "fb_exchange_token",
    client_id: id,
    client_secret: secret,
    fb_exchange_token: short,
  });
  const pages = await graph("GET", "me/accounts", {
    access_token: long.access_token,
    fields: "id,name,access_token,instagram_business_account{id,username}",
  });
  if (!pages.data?.length) fail("No Facebook Pages found. Give the token pages_show_list and pick your Page when asked.");
  const page = pages.data.find((p) => /growbytes/i.test(p.name)) || pages.data[0];
  const ig = page.instagram_business_account;
  saveEnv({ META_PAGE_ID: page.id, META_PAGE_TOKEN: page.access_token, META_IG_ID: ig?.id || "", META_USER_TOKEN: "" });
  console.log(`Facebook Page connected: ${page.name} (${page.id})`);
  console.log(ig ? `Instagram connected: @${ig.username} (${ig.id})` : "No Instagram account linked to this Page yet.");
}

async function whoami() {
  const { id, token } = pageAuth();
  const page = await graph("GET", id, { access_token: token, fields: "name,link,instagram_business_account{username}" });
  console.log(`Page: ${page.name}  ${page.link}`);
  console.log(`Instagram: ${page.instagram_business_account ? "@" + page.instagram_business_account.username : "not linked"}`);
}

async function fbPost(message, link) {
  if (!message) fail('Usage: npm run meta -- fb "text" [link]');
  const { id, token } = pageAuth();
  const params = { message, ...(link ? { link } : {}) };
  if (DRY) return console.log("Would post to Facebook:", params);
  const r = await graph("POST", `${id}/feed`, { ...params, access_token: token });
  console.log(`Posted on Facebook: https://www.facebook.com/${r.id}`);
}

async function fbImage(imageUrl, caption = "") {
  if (!imageUrl) fail('Usage: npm run meta -- fb-image <image-url> "text"');
  const { id, token } = pageAuth();
  if (DRY) return console.log("Would post image to Facebook:", { imageUrl, caption });
  const r = await graph("POST", `${id}/photos`, { url: imageUrl, caption, access_token: token });
  console.log(`Posted on Facebook: https://www.facebook.com/${r.post_id || r.id}`);
}

async function igPost(imageUrl, caption = "") {
  if (!imageUrl) fail('Usage: npm run meta -- ig <image-url> "caption"');
  const { token } = pageAuth();
  const ig = env.META_IG_ID || fail("No Instagram account linked. Link it to the Page, then run connect again.");
  if (DRY) return console.log("Would post to Instagram:", { imageUrl, caption });
  const container = await graph("POST", `${ig}/media`, { image_url: imageUrl, caption, access_token: token });
  // Wait until Instagram has fetched and processed the image.
  for (let i = 0; i < 20; i++) {
    const s = await graph("GET", container.id, { fields: "status_code", access_token: token });
    if (s.status_code === "FINISHED") break;
    if (s.status_code === "ERROR") fail("Instagram could not process the image (use a public JPEG URL).");
    await new Promise((r) => setTimeout(r, 3000));
  }
  const r = await graph("POST", `${ig}/media_publish`, { creation_id: container.id, access_token: token });
  const media = await graph("GET", r.id, { fields: "permalink", access_token: token });
  console.log(`Posted on Instagram: ${media.permalink}`);
}

const [cmd, a1, a2] = process.argv.slice(2).filter((x) => x !== "--dry");
const commands = {
  connect: () => connect(),
  whoami: () => whoami(),
  fb: () => fbPost(a1, a2),
  "fb-image": () => fbImage(a1, a2),
  ig: () => igPost(a1, a2),
};
if (!commands[cmd]) fail("Commands: connect | whoami | fb | fb-image | ig   (see the top of scripts/meta.mjs)");
await commands[cmd]();
