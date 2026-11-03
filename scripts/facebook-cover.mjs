#!/usr/bin/env node
/**
 * Facebook Page cover, 1640x924. Desktop shows the middle 1640x624 band,
 * mobile shows the middle ~1110px width, so everything sits in the centre
 * 1100x600 safe area.
 *   node scripts/facebook-cover.mjs   writes brand/facebook/cover.png
 */
import { mkdirSync } from "node:fs";
import sharp from "sharp";

const W = 1640;
const H = 924;
const PAPER = "#F4F1EA";
const INK = "#171918";
const ORANGE = "#F66135";
const MUTED = "#5B5F63";
const FONT = "'Segoe UI', 'Helvetica Neue', Arial, sans-serif";

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

const S = 9; // mark 144 x 108
const cy = H / 2;
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <rect width="${W}" height="${H}" fill="${PAPER}"/>
  ${mark((W - 16 * S) / 2, cy - 200, S)}
  <text x="${W / 2}" y="${cy + 10}" text-anchor="middle" font-family="${FONT}" font-size="64" font-weight="800" fill="${INK}" letter-spacing="-1.9">One team for your</text>
  <text x="${W / 2}" y="${cy + 84}" text-anchor="middle" font-family="${FONT}" font-size="64" font-weight="800" fill="${ORANGE}" letter-spacing="-1.9">software &amp; growth.</text>
  <text x="${W / 2}" y="${cy + 150}" text-anchor="middle" font-family="${FONT}" font-size="26" fill="${MUTED}">Custom software, websites and marketing  ·  growbytes.co</text>
</svg>`;

mkdirSync("brand/facebook", { recursive: true });
await sharp(Buffer.from(svg)).png().toFile("brand/facebook/cover.png");
// Previews of what desktop and mobile actually show
await sharp("brand/facebook/cover.png").extract({ left: 0, top: 150, width: 1640, height: 624 }).toFile(process.argv[2] ? `${process.argv[2]}/fb-desktop.png` : "brand/facebook/.preview-desktop.png");
await sharp("brand/facebook/cover.png").extract({ left: 265, top: 0, width: 1110, height: 924 }).toFile(process.argv[2] ? `${process.argv[2]}/fb-mobile.png` : "brand/facebook/.preview-mobile.png");
console.log("Wrote brand/facebook/cover.png");
