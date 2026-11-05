import type { Article } from "@/content/types";
import { cn } from "@/components/ui/primitives";

const alt: Record<Article["illustration"], string> = {
  redesign: "Illustration: an old page layout with scattered blocks being reorganized into a clear, structured page.",
  storefront: "Illustration: a fork between a theme-based storefront built from blocks and a custom storefront connected through an API.",
  workflow: "Illustration: a sequence of task steps where repetitive steps are highlighted as candidates for automation and one step remains with a person.",
  brief: "Illustration: a project brief document with a prioritized checklist, the top item highlighted.",
  marketing: "Illustration: two paths, a gradually rising line for search and a quick step-up for paid ads, meeting at a website.",
  buildbuy: "Illustration: a ready-made boxed product on one side and a custom-built set of connected modules on the other.",
  versus: "Illustration: two online store windows side by side with a versus badge between them.",
  softwarecost: "Illustration: stacked software layers next to a cost bar that grows with each layer.",
  sitecost: "Illustration: a website in a browser window with a price tag attached.",
  storecost: "Illustration: a shopping bag next to a receipt listing monthly and one-time costs.",
  migration: "Illustration: pages moving from an old site to a new store, each link redirected with a 301.",
  agency: "Illustration: a magnifying glass over three agency cards, one of them checked.",
};

/** Each topic gets its own ground color so cards are distinguishable at a glance. */
const ground: Record<Article["illustration"], string> = {
  redesign: "bg-ink",
  storefront: "bg-[#4a2a1f]",
  workflow: "bg-[#1f3b33]",
  brief: "bg-[#2b2f3a]",
  marketing: "bg-[#3a2f1f]",
  buildbuy: "bg-[#1e2a3a]",
  versus: "bg-[#3a1f2c]",
  softwarecost: "bg-[#24331f]",
  sitecost: "bg-[#2f2440]",
  storecost: "bg-[#1f3438]",
  migration: "bg-[#382a1a]",
  agency: "bg-[#222a2f]",
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
        {kind === "buildbuy" && <BuildBuy />}
        {kind === "versus" && <Versus />}
        {kind === "softwarecost" && <SoftwareCost />}
        {kind === "sitecost" && <SiteCost />}
        {kind === "storecost" && <StoreCost />}
        {kind === "migration" && <Migration />}
        {kind === "agency" && <Agency />}
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

const L = "#F7F7F2";
const A = "#F66135";
const G = "#A3ABA5";
const D = "#DDE2DC";
const K = "#171918";

function BuildBuy() {
  return (
    <g>
      {/* Boxed product */}
      <path d="M44 82l46-20 46 20v62l-46 20-46-20z" fill="#2a3442" stroke={G} strokeWidth="1.5" />
      <path d="M44 82l46 20 46-20M90 102v62" stroke={G} strokeWidth="1.5" fill="none" />
      <path d="M67 72l46 20v14" stroke={A} strokeWidth="3" fill="none" />
      {/* Custom modules */}
      <circle cx="160" cy="100" r="13" fill={A} />
      <text x="160" y="104" textAnchor="middle" fontSize="10" fontWeight="800" fill={K}>or</text>
      <rect x="192" y="48" width="40" height="40" rx="7" fill={L} />
      <rect x="244" y="48" width="40" height="40" rx="7" fill={A} />
      <rect x="192" y="100" width="92" height="40" rx="7" fill={L} />
      <rect x="192" y="152" width="40" height="18" rx="5" fill="none" stroke={L} strokeWidth="1.5" strokeDasharray="3 3" />
      <path d="M232 68h12M212 88v12M264 88v12" stroke={G} strokeWidth="2" />
      <rect x="202" y="112" width="44" height="6" rx="2" fill={K} />
      <rect x="202" y="124" width="66" height="5" rx="2" fill={G} />
    </g>
  );
}

function Shop({ x, accent }: { x: number; accent: boolean }) {
  return (
    <g>
      <rect x={x} y="44" width="104" height="116" rx="8" fill={L} />
      <path d={`M${x} 64h104`} stroke={D} />
      <circle cx={x + 10} cy="54" r="2.5" fill={G} />
      <circle cx={x + 18} cy="54" r="2.5" fill={G} />
      <rect x={x + 10} y="74" width="84" height="30" rx="4" fill={accent ? A : "#7f54b3"} opacity="0.9" />
      {[0, 1].map((i) => (
        <g key={i}>
          <rect x={x + 10 + i * 44} y="112" width="40" height="26" rx="3" fill={D} />
          <rect x={x + 10 + i * 44} y="142" width="26" height="5" rx="2" fill={K} />
        </g>
      ))}
    </g>
  );
}

function Versus() {
  return (
    <g>
      <Shop x={32} accent />
      <Shop x={184} accent={false} />
      <circle cx="160" cy="102" r="20" fill={K} stroke={A} strokeWidth="2.5" />
      <text x="160" y="107" textAnchor="middle" fontSize="13" fontWeight="800" fill={L}>VS</text>
    </g>
  );
}

function SoftwareCost() {
  const layers = ["Interface", "Logic", "Data", "Integrations"];
  return (
    <g>
      {layers.map((t, i) => (
        <g key={t}>
          <rect x={44 + i * 8} y={44 + i * 30} width={150 - i * 16} height="24" rx="5" fill={i === 0 ? A : L} opacity={1 - i * 0.12} />
          <text x={56 + i * 8} y={60 + i * 30} fontSize="10" fontWeight="700" fill={K}>{t}</text>
        </g>
      ))}
      <path d="M226 164V60" stroke="#5D645F" strokeWidth="2" />
      {[0, 1, 2, 3].map((i) => (
        <rect key={i} x={238 + i * 12} y={150 - i * 24} width="8" height={14 + i * 24} rx="2" fill={i === 3 ? A : G} />
      ))}
      <circle cx="270" cy="56" r="14" fill={A} />
      <text x="270" y="61" textAnchor="middle" fontSize="14" fontWeight="800" fill={K}>$</text>
    </g>
  );
}

function SiteCost() {
  return (
    <g>
      <rect x="40" y="36" width="190" height="130" rx="8" fill={L} />
      <path d="M40 56h190" stroke={D} />
      {[0, 1, 2].map((i) => <circle key={i} cx={52 + i * 9} cy="46" r="2.5" fill={G} />)}
      <rect x="54" y="70" width="90" height="10" rx="2" fill={K} />
      <rect x="54" y="86" width="120" height="5" rx="2" fill={G} />
      <rect x="54" y="96" width="100" height="5" rx="2" fill={G} />
      <rect x="54" y="110" width="44" height="12" rx="3" fill={A} />
      {[0, 1, 2].map((i) => <rect key={i} x={54 + i * 56} y="132" width="50" height="22" rx="3" fill={D} />)}
      {/* Price tag */}
      <path d="M228 72l14-14 46 0 0 46-14 14z" fill={A} transform="rotate(12 258 88)" />
      <circle cx="252" cy="70" r="4" fill={K} />
      <path d="M230 50c-10-10-24-6-26 6" stroke={L} strokeWidth="1.5" fill="none" />
      <text x="262" y="98" textAnchor="middle" fontSize="18" fontWeight="800" fill={K}>$</text>
    </g>
  );
}

function StoreCost() {
  return (
    <g>
      {/* Bag */}
      <path d="M50 80h80l-6 86H56z" fill={A} />
      <path d="M72 80v-12a18 18 0 0136 0v12" stroke={L} strokeWidth="3" fill="none" />
      <circle cx="72" cy="94" r="3" fill={K} />
      <circle cx="108" cy="94" r="3" fill={K} />
      {/* Receipt */}
      <path d="M170 32h112v136l-8-6-8 6-8-6-8 6-8-6-8 6-8-6-8 6-8-6-8 6-8-6-8 6-8-6z" fill={L} />
      <rect x="182" y="46" width="56" height="8" rx="2" fill={K} />
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <rect x="182" y={66 + i * 16} width={50 - i * 6} height="5" rx="2" fill={G} />
          <rect x="250" y={66 + i * 16} width="20" height="5" rx="2" fill={i === 0 ? A : G} />
        </g>
      ))}
      <path d="M182 134h88" stroke={K} strokeDasharray="3 2" />
      <rect x="182" y="142" width="30" height="7" rx="2" fill={K} />
      <rect x="244" y="142" width="26" height="7" rx="2" fill={A} />
    </g>
  );
}

function Migration() {
  return (
    <g>
      <rect x="30" y="50" width="86" height="104" rx="7" fill="#2a2d2b" stroke="#5D645F" />
      <rect x="204" y="50" width="86" height="104" rx="7" fill={L} />
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x="42" y={64 + i * 28} width="62" height="16" rx="3" fill="#5D645F" />
          <rect x="216" y={64 + i * 28} width="62" height="16" rx="3" fill={i === 0 ? A : D} />
          <path d={`M110 ${72 + i * 28}C150 ${72 + i * 28} 170 ${72 + i * 28} 210 ${72 + i * 28}`} stroke={A} strokeWidth="1.8" strokeDasharray="4 3" fill="none" />
        </g>
      ))}
      <rect x="140" y="30" width="40" height="18" rx="9" fill={A} />
      <text x="160" y="43" textAnchor="middle" fontSize="10" fontWeight="800" fill={K}>301</text>
      <path d="M202 128l8 4-8 4" stroke={A} strokeWidth="1.8" fill="none" />
    </g>
  );
}

function Agency() {
  return (
    <g>
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x={36 + i * 86} y="56" width="74" height="96" rx="7" fill={i === 1 ? L : "#2f383e"} stroke={i === 1 ? "none" : "#5D645F"} />
          <circle cx={73 + i * 86} cy="84" r="12" fill={i === 1 ? A : "#5D645F"} />
          <rect x={50 + i * 86} y="106" width="46" height="6" rx="2" fill={i === 1 ? K : "#5D645F"} />
          <rect x={56 + i * 86} y="118" width="34" height="5" rx="2" fill={i === 1 ? G : "#454d52"} />
        </g>
      ))}
      <path d="M152 136l6 6 12-12" stroke={K} strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="226" cy="74" r="30" fill="none" stroke={A} strokeWidth="4" />
      <path d="M248 96l22 22" stroke={A} strokeWidth="7" strokeLinecap="round" />
    </g>
  );
}
