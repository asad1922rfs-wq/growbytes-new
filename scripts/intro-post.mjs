#!/usr/bin/env node
/**
 * Introduction post image for LinkedIn (1080x1350): the solid favicon mark,
 * one headline, one supporting line, and the web address. Nothing else.
 *   node scripts/intro-post.mjs   writes brand/linkedin/intro-post.png
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

// Favicon mark, same shapes and gradients as src/app/icon.svg
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

const S = 30; // mark scale: 480 x 360
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <rect width="${W}" height="${H}" fill="${PAPER}"/>
  ${mark((W - 16 * S) / 2, 230, S)}

  <text x="${W / 2}" y="790" text-anchor="middle" font-family="${FONT}" font-size="80" font-weight="800" fill="${INK}" letter-spacing="-2.4">One team for your</text>
  <text x="${W / 2}" y="880" text-anchor="middle" font-family="${FONT}" font-size="80" font-weight="800" fill="${ORANGE}" letter-spacing="-2.4">software &amp; growth.</text>

  <text x="${W / 2}" y="970" text-anchor="middle" font-family="${FONT}" font-size="30" fill="${MUTED}">Custom software, websites and marketing.</text>

  <text x="${W / 2}" y="${H - 120}" text-anchor="middle" font-family="${FONT}" font-size="32" font-weight="700" fill="${INK}" letter-spacing="0.5">growbytes.co</text>
</svg>`;

mkdirSync("brand/linkedin", { recursive: true });
await sharp(Buffer.from(svg)).png().toFile("brand/linkedin/intro-post.png");
console.log("Wrote brand/linkedin/intro-post.png");
