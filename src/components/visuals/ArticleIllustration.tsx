import type { Article } from "@/content/types";
import { cn } from "@/components/ui/primitives";

const alt: Record<Article["illustration"], string> = {
  redesign: "Illustration: an old page layout with scattered blocks being reorganized into a clear, structured page.",
  storefront: "Illustration: a fork between a theme-based storefront built from blocks and a custom storefront connected through an API.",
  workflow: "Illustration: a sequence of task steps where repetitive steps are highlighted as candidates for automation and one step remains with a person.",
  brief: "Illustration: a project brief document with a prioritized checklist, the top item highlighted.",
  marketing: "Illustration: two paths, a gradually rising line for search and a quick step-up for paid ads, meeting at a website.",
};

/** Each topic gets its own ground color so cards are distinguishable at a glance. */
const ground: Record<Article["illustration"], string> = {
  redesign: "bg-ink",
  storefront: "bg-[#4a2a1f]",
  workflow: "bg-[#1f3b33]",
  brief: "bg-[#2b2f3a]",
  marketing: "bg-[#3a2f1f]",
};

/** Branded article art: geometric shapes with the accent color. */
export function ArticleIllustration({ kind, className }: { kind: Article["illustration"]; className?: string }) {
  return (
    <div className={cn("relative aspect-[16/10] overflow-hidden rounded-lg", ground[kind], className)}>
      <svg role="img" aria-label={alt[kind]} viewBox="0 0 320 200" className="absolute inset-0 size-full">
        <defs>
          <pattern id={`grid-${kind}`} width="16" height="16" patternUnits="userSpaceOnUse">
            <path d="M16 0H0V16" fill="none" stroke="#ffffff" strokeOpacity="0.05" />
          </pattern>
        </defs>
        <rect width="320" height="200" fill={`url(#grid-${kind})`} />
        {kind === "redesign" && <Redesign />}
        {kind === "storefront" && <Storefront />}
        {kind === "workflow" && <Workflow />}
        {kind === "brief" && <Brief />}
        {kind === "marketing" && <Marketing />}
      </svg>
    </div>
  );
}

function Redesign() {
  return (
    <g>
      <g opacity="0.55" transform="rotate(-6 80 100)">
        <rect x="34" y="46" width="92" height="112" rx="6" fill="#2a2d2b" stroke="#5D645F" />
        <rect x="44" y="58" width="40" height="10" rx="2" fill="#5D645F" />
        <rect x="70" y="78" width="46" height="18" rx="2" fill="#5D645F" />
        <rect x="44" y="104" width="30" height="30" rx="2" fill="#5D645F" />
        <rect x="82" y="118" width="34" height="8" rx="2" fill="#5D645F" />
      </g>
      <path d="M140 100h32" stroke="#F66135" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M166 92l8 8-8 8" stroke="#F66135" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="186" y="40" width="104" height="124" rx="7" fill="#F7F7F2" />
      <rect x="198" y="54" width="54" height="8" rx="2" fill="#171918" />
      <rect x="198" y="68" width="80" height="5" rx="2" fill="#A3ABA5" />
      <rect x="198" y="78" width="64" height="5" rx="2" fill="#A3ABA5" />
      <rect x="198" y="90" width="34" height="10" rx="2" fill="#F66135" />
      {[0, 1, 2].map((i) => (
        <rect key={i} x={198 + i * 28} y="112" width="24" height="38" rx="3" fill="#DDE2DC" />
      ))}
    </g>
  );
}

function Storefront() {
  return (
    <g>
      <circle cx="58" cy="100" r="12" fill="#F66135" />
      <path d="M70 100h28M98 100c20 0 20-44 44-44M98 100c20 0 20 44 44 44" stroke="#A3ABA5" strokeWidth="2" fill="none" />
      <g>
        <rect x="146" y="30" width="120" height="54" rx="6" fill="#F7F7F2" />
        {[0, 1, 2].map((i) => (
          <rect key={i} x={156 + i * 36} y="42" width="28" height="30" rx="3" fill={i === 1 ? "#F66135" : "#DDE2DC"} />
        ))}
      </g>
      <g>
        <rect x="146" y="118" width="54" height="52" rx="6" fill="none" stroke="#F7F7F2" strokeWidth="2" />
        <rect x="212" y="118" width="54" height="52" rx="6" fill="none" stroke="#F7F7F2" strokeWidth="2" />
        <path d="M200 144h12" stroke="#F66135" strokeWidth="2" strokeDasharray="3 2" />
        <text x="173" y="148" textAnchor="middle" fontSize="10" fontWeight="700" fill="#F7F7F2">API</text>
        <text x="239" y="148" textAnchor="middle" fontSize="10" fontWeight="700" fill="#F7F7F2">UI</text>
      </g>
    </g>
  );
}

function Workflow() {
  const xs = [36, 92, 148, 204, 260];
  return (
    <g>
      <path d="M48 100H272" stroke="#5D645F" strokeWidth="2" />
      {xs.map((x, i) => {
        const auto = i === 1 || i === 2 || i === 4;
        const person = i === 3;
        return (
          <g key={x}>
            <rect
              x={x - 22}
              y="78"
              width="44"
              height="44"
              rx="8"
              fill={auto ? "#F66135" : person ? "#F7F7F2" : "#2a2d2b"}
              stroke={auto || person ? "none" : "#5D645F"}
            />
            {person ? (
              <g fill="#171918">
                <circle cx={x} cy="94" r="6" />
                <path d={`M${x - 10} 114c2-8 18-8 20 0z`} />
              </g>
            ) : (
              <path d={`M${x - 8} 100h16M${x - 8} 94h10M${x - 8} 106h12`} stroke={auto ? "#171918" : "#A3ABA5"} strokeWidth="2" strokeLinecap="round" />
            )}
          </g>
        );
      })}
      <path d="M90 142c20 12 96 12 116 0" stroke="#F66135" strokeWidth="1.5" strokeDasharray="4 3" fill="none" />
    </g>
  );
}

function Brief() {
  return (
    <g>
      <rect x="92" y="28" width="136" height="148" rx="8" fill="#F7F7F2" />
      <rect x="108" y="44" width="62" height="9" rx="2" fill="#171918" />
      <rect x="108" y="60" width="96" height="5" rx="2" fill="#A3ABA5" />
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <rect x="108" y={82 + i * 22} width="12" height="12" rx="3" fill={i === 0 ? "#F66135" : "none"} stroke={i === 0 ? "none" : "#A3ABA5"} strokeWidth="1.5" />
          {i === 0 && <path d="M110.5 88l2.5 2.5 4.5-5" stroke="#171918" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />}
          <rect x="128" y={85 + i * 22} width={i === 0 ? 84 : 70 - i * 8} height="6" rx="2" fill={i === 0 ? "#171918" : "#DDE2DC"} />
        </g>
      ))}
      <path d="M240 60l10-10M246 74h14M240 88l10 10" stroke="#F66135" strokeWidth="2.5" strokeLinecap="round" />
    </g>
  );
}

function Marketing() {
  return (
    <g>
      <path d="M40 160H280" stroke="#5D645F" strokeWidth="2" />
      <path d="M40 150C90 148 120 130 160 112S240 70 270 56" stroke="#A3ABA5" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M40 140H96V86H270" stroke="#F66135" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="270" cy="56" r="5" fill="#A3ABA5" />
      <circle cx="270" cy="86" r="5" fill="#F66135" />
      <text x="56" y="132" fontSize="10" fontWeight="700" fill="#F66135">Ads</text>
      <text x="196" y="72" fontSize="10" fontWeight="700" fill="#DDE2DC">SEO</text>
    </g>
  );
}
