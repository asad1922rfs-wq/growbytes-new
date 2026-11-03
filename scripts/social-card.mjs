#!/usr/bin/env node
/**
 * Branded LinkedIn image for an Insights article (1080x1350 PNG).
 *
 *   npm run social:card -- <insights-slug>   writes brand/social/<slug>.png
 *
 * Text comes from the article entry in src/content/insights.ts plus the
 * points listed below (edit POINTS per article).
 */
import { mkdirSync, readFileSync } from "node:fs";
import sharp from "sharp";

// Short checklist shown on the card, per article
const POINTS = {
  "migrate-to-shopify-without-losing-seo": [
    "Why migrations lose search traffic",
    "How to map every 301 redirect",
    "A pre-launch SEO checklist",
    "What to watch after launch",
  ],
  "how-to-choose-a-shopify-development-agency": [
    "What a Shopify agency actually does",
    "10 questions to ask before you sign",
    "What changes the cost",
    "Warning signs to avoid",
  ],
};

const W = 1080;
const H = 1350;
const INK = "#0F1E28";
const ORANGE = "#F66135";
const PAPER = "#F7F7F2";
const FONT = "'Segoe UI', 'Helvetica Neue', Arial, sans-serif";

const slug = process.argv[2];
if (!slug) {
  console.error("Usage: npm run social:card -- <insights-slug>");
  process.exit(1);
}

const src = readFileSync("src/content/insights.ts", "utf8");
const start = src.indexOf(`slug: "${slug}"`);
if (start < 0) {
  console.error(`No article "${slug}" in src/content/insights.ts`);
  process.exit(1);
}
const block = src.slice(start, src.indexOf("\n  },", start));
const pick = (k) => block.match(new RegExp(`${k}:\\s*"([^"]+)"`))?.[1] ?? "";
const title = pick("title");
const category = pick("category");
const minutes = block.match(/readingMinutes:\s*(\d+)/)?.[1];
const points = POINTS[slug] ?? [];

const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/** Greedy word wrap by an approximate character width. */
function wrap(text, maxChars) {
  const lines = [];
  let line = "";
  for (const word of text.split(" ")) {
    if ((line + " " + word).trim().length > maxChars) {
      lines.push(line.trim());
      line = word;
    } else line += " " + word;
  }
  if (line.trim()) lines.push(line.trim());
  return lines;
}

const headline = title.charAt(0).toUpperCase() + title.slice(1);
const titleLines = wrap(headline, 18);
const titleSize = titleLines.length > 4 ? 80 : 90;
const titleTop = 330;
const lineH = titleSize * 1.08;
const listTop = titleTop + titleLines.length * lineH + 70;

// Growth mark (same shapes as the site logo), scaled
const mark = (x, y, s) => {
  const blocks = [
    [0, 7.5, 4.5, "#FF9C6E", ORANGE],
    [4, 1.25, 6.25, "#FF9466", ORANGE],
    [8, 7.5, 4.5, "#FF8152", "#EA5527"],
    [12, 0, 7.5, "#FF8A5C", ORANGE],
  ];
  return blocks
    .map(([bx, by, bh, from, to], i) => {
      const id = `m${x}${i}`;
      return `<defs><linearGradient id="${id}" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="${from}"/><stop offset="1" stop-color="${to}"/></linearGradient></defs><rect x="${x + bx * s}" y="${y + by * s}" width="${4 * s}" height="${bh * s}" fill="url(#${id})"/>`;
    })
    .join("");
};

// Background grid lines
const grid = [];
for (let gx = 0; gx <= W; gx += 90) grid.push(`<line x1="${gx}" y1="0" x2="${gx}" y2="${H}"/>`);
for (let gy = 0; gy <= H; gy += 90) grid.push(`<line x1="0" y1="${gy}" x2="${W}" y2="${gy}"/>`);

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <radialGradient id="glow" cx="85%" cy="8%" r="60%">
      <stop offset="0" stop-color="${ORANGE}" stop-opacity="0.45"/>
      <stop offset="1" stop-color="${ORANGE}" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="fade" x1="0" x2="0" y1="0" y2="1">
      <stop offset="0" stop-color="#fff" stop-opacity="0.07"/>
      <stop offset="0.7" stop-color="#fff" stop-opacity="0.02"/>
      <stop offset="1" stop-color="#fff" stop-opacity="0"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="${INK}"/>
  <g stroke="url(#fade)" stroke-width="1.5">${grid.join("")}</g>
  <rect width="${W}" height="${H}" fill="url(#glow)"/>

  <!-- Brand -->
  ${mark(90, 96, 4.4)}
  <text x="176" y="140" font-family="${FONT}" font-size="42" font-weight="700" fill="${PAPER}" letter-spacing="-0.5">Growbytes</text>

  <!-- Eyebrow pill -->
  <rect x="90" y="226" width="${(category.length + 6) * 21 + 40}" height="56" rx="28" fill="${ORANGE}" fill-opacity="0.16" stroke="${ORANGE}" stroke-opacity="0.5"/>
  <circle cx="122" cy="254" r="7" fill="${ORANGE}"/>
  <text x="142" y="264" font-family="${FONT}" font-size="26" font-weight="700" fill="${ORANGE}" letter-spacing="3">${esc(category.toUpperCase())} GUIDE</text>

  <!-- Headline -->
  ${titleLines
    .map(
      (l, i) =>
        `<text x="90" y="${titleTop + (i + 1) * lineH - 18}" font-family="${FONT}" font-size="${titleSize}" font-weight="800" fill="${i === titleLines.length - 1 ? ORANGE : PAPER}" letter-spacing="-2">${esc(l)}</text>`,
    )
    .join("\n  ")}

  <!-- Checklist -->
  ${points
    .map((p, i) => {
      const y = listTop + i * 96;
      return `<rect x="90" y="${y}" width="900" height="76" rx="20" fill="#ffffff" fill-opacity="0.06" stroke="#ffffff" stroke-opacity="0.1"/>
  <circle cx="132" cy="${y + 38}" r="18" fill="${ORANGE}"/>
  <path d="M123 ${y + 38} l6 6 l12 -13" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
  <text x="170" y="${y + 48}" font-family="${FONT}" font-size="32" font-weight="600" fill="${PAPER}">${esc(p)}</text>`;
    })
    .join("\n  ")}

  <!-- Footer bar -->
  <rect x="0" y="${H - 150}" width="${W}" height="150" fill="${ORANGE}"/>
  <text x="90" y="${H - 64}" font-family="${FONT}" font-size="38" font-weight="800" fill="#fff">Read the full guide</text>
  <text x="${W - 90}" y="${H - 64}" text-anchor="end" font-family="${FONT}" font-size="32" font-weight="600" fill="#fff" fill-opacity="0.9">growbytes.co${minutes ? `  ·  ${minutes} min read` : ""}</text>
</svg>`;

mkdirSync("brand/social", { recursive: true });
const out = `brand/social/${slug}.png`;
await sharp(Buffer.from(svg)).png().toFile(out);
console.log(`Wrote ${out}`);
