/**
 * Hero floor grid: verticals converge on a vanishing point above the hero,
 * horizontals get further apart toward the viewer. Drawn as crisp 1px SVG lines
 * and faded at the top and bottom so it never ends on a hard edge.
 */
export function PerspectiveGrid({ className }: { className?: string }) {
  const W = 1600;
  const H = 360;
  const vpX = W / 2;
  const vpY = -900; // vanishing point above the visible area
  const verticals = Array.from({ length: 41 }, (_, i) => -1200 + i * 100); // x at the bottom edge
  const horizontals = Array.from(
    { length: 9 },
    (_, i) => H * ((i + 1) / 9) ** 1.8,
  );
  const xAtTop = (xb: number) => vpX + (xb - vpX) * (-vpY / (H - vpY));
  return (
    <svg
      aria-hidden="true"
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="none"
      className={`pointer-events-none absolute inset-x-0 bottom-0 -z-10 w-full ${className ?? "h-[46%]"} [mask-image:linear-gradient(to_bottom,transparent,black_30%,black_70%,transparent)]`}
    >
      <g
        stroke="rgb(23 25 24 / 0.10)"
        strokeWidth="1"
        vectorEffect="non-scaling-stroke"
        shapeRendering="crispEdges"
      >
        {verticals.map((xb) => (
          <line
            key={xb}
            x1={xAtTop(xb)}
            y1={0}
            x2={xb}
            y2={H}
            vectorEffect="non-scaling-stroke"
          />
        ))}
        {horizontals.map((y) => (
          <line
            key={y}
            x1={0}
            y1={y}
            x2={W}
            y2={y}
            vectorEffect="non-scaling-stroke"
          />
        ))}
      </g>
    </svg>
  );
}
