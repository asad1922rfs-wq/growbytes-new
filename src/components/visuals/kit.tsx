/**
 * Shared SVG illustration vocabulary, derived from the article thumbnails:
 * flat geometric shapes on a gridded ground, ink + warm white + one orange accent.
 * All primitives draw inside a parent <svg>; sizes are in viewBox units.
 */
import type { ReactNode } from "react";

export const C = {
  ink: "#171918",
  inkSoft: "#2a2d2b",
  line: "#3a3d3b",
  paper: "#F7F7F2",
  sand: "#ece4d8",
  stone: "#DDE2DC",
  mute: "#A3ABA5",
  orange: "#F66135",
  green: "#1f3b33",
  greenSoft: "#2d5246",
  brown: "#4a2a1f",
  wood: "#b08a5b",
} as const;

/** Full-bleed ground with the faint grid used across the article art. */
export function Ground({ id, fill, w = 320, h = 240, gridOpacity = 0.06, gridColor = "#ffffff" }: {
  id: string;
  fill: string;
  w?: number;
  h?: number;
  gridOpacity?: number;
  gridColor?: string;
}) {
  return (
    <>
      <defs>
        <pattern id={`g-${id}`} width="16" height="16" patternUnits="userSpaceOnUse">
          <path d="M16 0H0V16" fill="none" stroke={gridColor} strokeOpacity={gridOpacity} />
        </pattern>
      </defs>
      <rect width={w} height={h} fill={fill} />
      <rect width={w} height={h} fill={`url(#g-${id})`} />
    </>
  );
}

/** Browser window: chrome bar with three dots, body rendered by children. */
export function Browser({ x, y, w, h, fill = C.paper, chrome = C.stone, children }: {
  x: number;
  y: number;
  w: number;
  h: number;
  fill?: string;
  chrome?: string;
  children?: ReactNode;
}) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect width={w} height={h} rx="7" fill={fill} />
      <path d={`M7 0h${w - 14}a7 7 0 0 1 7 7v7H0V7a7 7 0 0 1 7-7z`} fill={chrome} />
      {[9, 17, 25].map((cx) => (
        <circle key={cx} cx={cx} cy="7" r="2" fill={C.ink} opacity="0.35" />
      ))}
      <g transform="translate(0 14)">{children}</g>
    </g>
  );
}

/** Rounded panel. */
export function Panel({ x, y, w, h, fill = C.paper, stroke, r = 6 }: {
  x: number;
  y: number;
  w: number;
  h: number;
  fill?: string;
  stroke?: string;
  r?: number;
}) {
  return <rect x={x} y={y} width={w} height={h} rx={r} fill={fill} stroke={stroke} strokeWidth={stroke ? 1.5 : undefined} />;
}

/** Text placeholder line. */
export function TextLine({ x, y, w, fill = C.mute, h = 4 }: { x: number; y: number; w: number; fill?: string; h?: number }) {
  return <rect x={x} y={y} width={w} height={h} rx={h / 2} fill={fill} />;
}

/** Workflow node: rounded square with an inner glyph. */
export function Node({ cx, cy, size = 34, fill = C.inkSoft, stroke, children }: {
  cx: number;
  cy: number;
  size?: number;
  fill?: string;
  stroke?: string;
  children?: ReactNode;
}) {
  return (
    <g transform={`translate(${cx - size / 2} ${cy - size / 2})`}>
      <rect width={size} height={size} rx={size * 0.24} fill={fill} stroke={stroke} strokeWidth={stroke ? 1.5 : undefined} />
      <g transform={`translate(${size / 2} ${size / 2})`}>{children}</g>
    </g>
  );
}

/** Connector path with optional arrowhead. */
export function Connector({ d, color = C.orange, dashed, arrow, width = 2, id }: {
  d: string;
  color?: string;
  dashed?: boolean;
  arrow?: boolean;
  width?: number;
  id?: string;
}) {
  const markerId = `arrow-${id ?? color.replace("#", "")}`;
  return (
    <>
      {arrow && (
        <defs>
          <marker id={markerId} viewBox="0 0 8 8" refX="6.5" refY="4" markerWidth="5" markerHeight="5" orient="auto">
            <path d="M0 0 8 4 0 8z" fill={color} />
          </marker>
        </defs>
      )}
      <path
        d={d}
        fill="none"
        stroke={color}
        strokeWidth={width}
        strokeLinecap="round"
        strokeDasharray={dashed ? "4 4" : undefined}
        markerEnd={arrow ? `url(#${markerId})` : undefined}
      />
    </>
  );
}

/** Pointer cursor. */
export function Cursor({ x, y, fill = C.orange, scale = 1 }: { x: number; y: number; fill?: string; scale?: number }) {
  return (
    <path
      transform={`translate(${x} ${y}) scale(${scale})`}
      d="M0 0l0 17 4.6-4.4 3.2 7 3-1.4-3.2-6.8H14z"
      fill={fill}
      stroke={C.ink}
      strokeWidth="1"
      strokeLinejoin="round"
    />
  );
}

/** Row of color swatches. */
export function Swatches({ x, y, colors, size = 12, gap = 5 }: { x: number; y: number; colors: string[]; size?: number; gap?: number }) {
  return (
    <g>
      {colors.map((c, i) => (
        <rect key={c + i} x={x + i * (size + gap)} y={y} width={size} height={size} rx="3" fill={c} stroke={C.ink} strokeOpacity="0.15" />
      ))}
    </g>
  );
}

/** Small status marker: filled dot, optionally ringed. */
export function Status({ cx, cy, color = C.orange, ring }: { cx: number; cy: number; color?: string; ring?: boolean }) {
  return (
    <g>
      {ring && <circle cx={cx} cy={cy} r="6" fill="none" stroke={color} strokeOpacity="0.4" strokeWidth="1.5" />}
      <circle cx={cx} cy={cy} r="3" fill={color} />
    </g>
  );
}

/** Person glyph for human-review steps (centered on 0,0). */
export function Person({ fill = C.ink, scale = 1 }: { fill?: string; scale?: number }) {
  return (
    <g transform={`scale(${scale})`} fill={fill}>
      <circle cx="0" cy="-5" r="4.5" />
      <path d="M-8.5 9c1.4-6.5 15.6-6.5 17 0z" />
    </g>
  );
}

/** Check glyph (centered on 0,0). */
export function Check({ color = C.paper }: { color?: string }) {
  return <path d="M-6 0l4 4 8-8" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />;
}
