#!/usr/bin/env node
/**
 * LinkedIn covers in the Growbytes style: light paper background, plain
 * typography, and the zigzag mark used large as a cropped graphic.
 *   node scripts/linkedin-cover.mjs   writes brand/linkedin/company-cover.png (1128x191)
 *                                      and brand/linkedin/profile-banner.png (1584x396)
 * The left side stays clear where LinkedIn overlaps the logo / profile photo.
 */
import { mkdirSync } from "node:fs";
import sharp from "sharp";

const PAPER = "#F4F1EA";
const INK = "#171918";
const ORANGE = "#F66135";
const MUTED = "#5B5F63";
const FONT = "'Segoe UI', 'Helvetica Neue', Arial, sans-serif";

// Zigzag mark: four blocks on a 16 x 12 grid (same shapes as the favicon), solid fills
const BLOCKS = [
  [0, 7.5, 4.5, "#FFB38F"],
  [4, 1.25, 6.25, ORANGE],
  [8, 7.5, 4.5, "#FF8A5C"],
  [12, 0, 7.5, ORANGE],
];
const mark = (x, y, s) => BLOCKS.map(([bx, by, bh, c]) => `<rect x="${x + bx * s}" y="${y + by * s}" width="${4 * s}" height="${bh * s}" fill="${c}"/>`).join("");

function cover({ W, H, textX, line1, line2, small, size, smallSize, markX, markY, markScale }) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <rect width="${W}" height="${H}" fill="${PAPER}"/>
  <rect x="0" y="${H - 4}" width="${W}" height="4" fill="${ORANGE}"/>
  ${mark(markX, markY, markScale)}
  <text x="${textX}" y="${H * 0.46}" font-family="${FONT}" font-size="${size}" font-weight="800" fill="${INK}" letter-spacing="${-size * 0.03}">${line1}</text>
  <text x="${textX}" y="${H * 0.46 + size * 1.08}" font-family="${FONT}" font-size="${size}" font-weight="800" fill="${INK}" letter-spacing="${-size * 0.03}">${line2}</text>
  ${small ? `<text x="${textX}" y="${H * 0.46 + size * 1.08 + smallSize * 2.1}" font-family="${FONT}" font-size="${smallSize}" font-weight="500" fill="${MUTED}" letter-spacing="0.2">${small}</text>` : ""}
</svg>`;
}

mkdirSync("brand/linkedin", { recursive: true });

// Company page cover: the logo overlaps the bottom-left on desktop, so text starts after it.
await sharp(
  Buffer.from(
    cover({
      W: 1128,
      H: 191,
      textX: 300,
      line1: "We build websites, software",
      line2: `and marketing that <tspan fill="${ORANGE}">grow businesses.</tspan>`,
      small: "",
      size: 34,
      smallSize: 15,
      markX: 860,
      markY: 22,
      markScale: 17,
    }),
  ),
)
  .png()
  .toFile("brand/linkedin/company-cover.png");

// Personal profile banner: the photo covers roughly the bottom-left 450px.
await sharp(
  Buffer.from(
    cover({
      W: 1584,
      H: 396,
      textX: 520,
      line1: "We build websites, software",
      line2: `and marketing that <tspan fill="${ORANGE}">grow businesses.</tspan>`,
      small: "Founder, Growbytes  ·  growbytes.co",
      size: 48,
      smallSize: 21,
      markX: 1360,
      markY: 108,
      markScale: 24,
    }),
  ),
)
  .png()
  .toFile("brand/linkedin/profile-banner.png");

console.log("Wrote brand/linkedin/company-cover.png and brand/linkedin/profile-banner.png");
