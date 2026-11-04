#!/usr/bin/env node
/**
 * Feed posts (1080x1350) in the intro-post style: small mark, one headline
 * (last line orange), one supporting line, web address.
 *   node scripts/content-posts.mjs   writes public/social/<slug>.jpg
 * Add a post to POSTS below, run it, then post with npm run meta.
 */
import { mkdirSync } from "node:fs";
import sharp from "sharp";

const W = 1080;
const H = 1350;
const PAPER = "#F4F1EA";
const INK = "#171918";
const ORANGE = "#F66135";
const MUTED = "#5B5F63";
const FONT = "'Segoe UI', 'Helvetica Neue', Arial, sans-serif";

export const POSTS = [
  { slug: "custom-vs-ready-made", ink: ["Ready-made tool,", "or build"], orange: ["your own?"], sub: ["When custom software is worth it,", "and when it isn't."] },
  { slug: "slow-shopify-store", ink: ["Is your Shopify", "store slow?"], orange: ["Check these first."], sub: ["Apps, images and theme code", "are the usual causes."] },
  { slug: "shopify-migration-seo", ink: ["Moving to Shopify?"], orange: ["Keep your", "Google traffic."], sub: ["Redirects and content", "matter more than the move."] },
  { slug: "signs-custom-software", ink: ["Still running your", "business on"], orange: ["spreadsheets?"], sub: ["Three signs it's time", "for custom software."] },
  { slug: "website-enquiries", ink: ["Visitors come,", "but nobody"], orange: ["gets in touch?"], sub: ["Four things to check", "on your website."] },
  { slug: "choose-shopify-agency", ink: ["Hiring a", "Shopify agency?"], orange: ["Ask these first."], sub: ["The questions that save", "time and money later."] },
];

const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");
const BLOCKS = [
  [0, 7.5, 4.5, "#FF9C6E", ORANGE],
  [4, 1.25, 6.25, "#FF9466", ORANGE],
  [8, 7.5, 4.5, "#FF8152", "#EA5527"],
  [12, 0, 7.5, "#FF8A5C", ORANGE],
];
const mark = (x, y, s) =>
  BLOCKS.map(
    ([bx, by, bh, from, to], i) =>
      `<defs><linearGradient id="b${i}" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="${from}"/><stop offset="1" stop-color="${to}"/></linearGradient></defs><rect x="${x + bx * s}" y="${y + by * s}" width="${4 * s}" height="${bh * s}" fill="url(#b${i})"/>`,
  ).join("");

function render(p) {
  const X = 96;
  const lines = [...p.ink.map((t) => [t, INK]), ...p.orange.map((t) => [t, ORANGE])];
  const size = 96;
  const lh = 106;
  const top = 470;
  const head = lines
    .map(([t, c], i) => `<text x="${X}" y="${top + i * lh}" font-family="${FONT}" font-size="${size}" font-weight="800" fill="${c}" letter-spacing="-2.8">${esc(t)}</text>`)
    .join("");
  const subTop = top + lines.length * lh + 50;
  const sub = p.sub
    .map((t, i) => `<text x="${X}" y="${subTop + i * 46}" font-family="${FONT}" font-size="34" fill="${MUTED}">${esc(t)}</text>`)
    .join("");
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <rect width="${W}" height="${H}" fill="${PAPER}"/>
  ${mark(X, 110, 7)}
  ${head}
  ${sub}
  <text x="${X}" y="${H - 110}" font-family="${FONT}" font-size="30" font-weight="700" fill="${INK}" letter-spacing="0.5">growbytes.co</text>
</svg>`;
}

mkdirSync("public/social", { recursive: true });
for (const p of POSTS) {
  await sharp(Buffer.from(render(p))).flatten({ background: PAPER }).jpeg({ quality: 92 }).toFile(`public/social/${p.slug}.jpg`);
  console.log(`Wrote public/social/${p.slug}.jpg`);
}
