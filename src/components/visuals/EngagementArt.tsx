/**
 * Small dot-grid illustrations for the three engagement models:
 * 0 = defined project (a grid that fills in), 1 = ongoing (a loop),
 * 2 = phased (steps that rise one after another).
 */
export function EngagementArt({ kind }: { kind: number }) {
  if (kind === 1) {
    return (
      <svg aria-hidden="true" viewBox="0 0 96 64" className="h-16 w-24">
        <g className="eng-spin" style={{ transformOrigin: "32px 32px" }}>
          <circle cx="32" cy="32" r="20" fill="none" stroke="currentColor" strokeOpacity="0.2" strokeWidth="6" />
          <path d="M32 12a20 20 0 0 1 20 20" fill="none" stroke="#f26b3a" strokeWidth="6" strokeLinecap="round" />
        </g>
        {[0, 1, 2].map((i) => (
          <rect key={i} x={64 + i * 10} y={40 - i * 8} width="7" height="7" rx="1.5" className="eng-cell" fill="#f26b3a" style={{ animationDelay: `${i * 0.3}s` }} />
        ))}
      </svg>
    );
  }
  if (kind === 2) {
    return (
      <svg aria-hidden="true" viewBox="0 0 96 64" className="h-16 w-24">
        {[0, 1, 2, 3].map((i) => (
          <rect
            key={i}
            x={4 + i * 23}
            y={48 - i * 14}
            width="18"
            height={12 + i * 14}
            rx="3"
            className="eng-cell"
            fill={i === 3 ? "#f26b3a" : "currentColor"}
            fillOpacity={i === 3 ? 1 : 0.2}
            style={{ animationDelay: `${i * 0.35}s` }}
          />
        ))}
      </svg>
    );
  }
  return (
    <svg aria-hidden="true" viewBox="0 0 96 64" className="h-16 w-24">
      {Array.from({ length: 12 }, (_, i) => (
        <rect
          key={i}
          x={4 + (i % 4) * 16}
          y={6 + Math.floor(i / 4) * 18}
          width="12"
          height="12"
          rx="2.5"
          className="eng-cell"
          fill={i % 5 === 0 ? "#f26b3a" : "currentColor"}
          fillOpacity={i % 5 === 0 ? 1 : 0.2}
          style={{ animationDelay: `${i * 0.12}s` }}
        />
      ))}
    </svg>
  );
}
