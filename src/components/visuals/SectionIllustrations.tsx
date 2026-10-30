import type { ServiceGroup } from "@/content/types";
import { cn } from "@/components/ui/primitives";
import { Browser, C, Check, Connector, Cursor, Ground, Node, Panel, Person, Status, Swatches, TextLine } from "./kit";

/* ------------------------------------------------------------------ */
/* Service-group scenes (4:3). Decorative: the adjacent HTML names    */
/* the group and lists every service.                                  */
/* ------------------------------------------------------------------ */

export function GroupIllustration({ group, className }: { group: ServiceGroup; className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 320 240" className={cn("block aspect-[4/3] w-full rounded-lg", className)}>
      {group === "design" && <DesignScene />}
      {group === "software" && <SoftwareScene />}
      {group === "marketing" && <MarketingScene />}
    </svg>
  );
}

function DesignScene() {
  return (
    <g>
      <Ground id="design" fill={C.sand} gridColor={C.ink} gridOpacity={0.05} />
      {/* Website layout */}
      <g data-hl="web-design-development ui-ux-design">
      <Browser x={22} y={26} w={196} h={150}>
        <TextLine x={14} y={14} w={34} fill={C.ink} />
        <TextLine x={120} y={14} w={18} />
        <TextLine x={144} y={14} w={18} />
        <rect x={14} y={30} width={88} height={10} rx="2" fill={C.ink} />
        <TextLine x={14} y={48} w={80} />
        <TextLine x={14} y={58} w={64} />
        <rect x={14} y={72} width={44} height={14} rx="3" fill={C.orange} />
        <rect x={112} y={30} width={70} height={58} rx="4" fill={C.stone} />
        <circle cx={147} cy={56} r="13" fill={C.wood} opacity="0.55" />
        <rect x={14} y={100} width={52} height={24} rx="3" fill={C.stone} />
        <rect x={72} y={100} width={52} height={24} rx="3" fill={C.stone} />
        <rect x={130} y={100} width={52} height={24} rx="3" fill={C.stone} />
      </Browser>
      </g>
      {/* Product tile, selected */}
      <g data-hl="shopify-development">
        <rect x={190} y={84} width={108} height={130} rx="7" fill={C.paper} />
        <rect x={198} y={92} width={92} height={74} rx="4" fill="#e3d6c3" />
        <path d="M233 108h22l-3 46h-16z" fill="#7f9a86" />
        <path d="M244 108c-1-7 2-12 6-15" stroke="#3f6b4f" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <TextLine x={198} y={176} w={60} fill={C.ink} />
        <TextLine x={198} y={186} w={30} fill={C.orange} />
        <TextLine x={198} y={198} w={46} />
        <rect x={185} y={79} width={118} height={140} rx="10" fill="none" stroke={C.orange} strokeWidth="2" strokeDasharray="5 4" />
        <Cursor x={286} y={196} />
      </g>
      {/* Palette + type */}
      <g data-hl="branding ui-ux-design">
        <Swatches x={24} y={196} colors={[C.ink, C.orange, "#7f9a86", C.paper]} size={14} gap={6} />
        <text x={112} y={209} fontSize="18" fontWeight="800" fill={C.ink} fontFamily="inherit">
          Aa
        </text>
      </g>
    </g>
  );
}

function SoftwareScene() {
  // Two-way sync arrow between x1 and x2 at height y (CRM integrations).
  const sync = (x1: number, x2: number, y: number) => (
    <g stroke={C.orange} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" fill="none">
      <path d={`M${x1} ${y - 4}h${x2 - x1}M${x2 - 4} ${y - 8}l4 4-4 4`} />
      <path d={`M${x2} ${y + 4}h${x1 - x2}M${x1 + 4} ${y}l-4 4 4 4`} />
    </g>
  );
  return (
    <g>
      <Ground id="software" fill={C.green} />

      {/* Custom software: desktop app */}
      <g data-hl="custom-software-development">
        <Panel x={16} y={20} w={128} h={100} fill={C.ink} r={7} />
        <rect x={16} y={20} width={26} height={100} rx="7" fill="#232624" />
        {[34, 46, 58].map((y, i) => (
          <rect key={y} x={22} y={y} width={14} height={4} rx="2" fill={i === 0 ? C.orange : C.line} />
        ))}
        {[34, 56, 78, 100].map((y, i) => (
          <g key={y}>
            <rect x={50} y={y - 7} width={86} height={17} rx="4" fill={C.inkSoft} />
            <TextLine x={57} y={y} w={38} fill={C.mute} />
            <Status cx={127} cy={y + 1.5} color={i === 1 ? C.orange : "#6aa37f"} />
          </g>
        ))}
      </g>

      {/* CRM: contact records, synced both ways */}
      <g data-hl="crm-integrations">
        {sync(146, 162, 70)}
        <Panel x={164} y={24} w={74} h={92} fill={C.paper} r={7} />
        <rect x={172} y={32} width={30} height={5} rx="2.5" fill={C.ink} />
        <rect x={210} y={31} width={20} height={8} rx="4" fill={C.orange} />
        {[52, 70, 88].map((y) => (
          <g key={y}>
            <circle cx={177} cy={y} r="5" fill={C.stone} />
            <circle cx={177} cy={y - 1.3} r="1.8" fill={C.mute} />
            <TextLine x={186} y={y - 4} w={40} fill={C.ink} h={3} />
            <TextLine x={186} y={y + 2} w={26} h={3} />
          </g>
        ))}
        {sync(240, 254, 70)}
      </g>

      {/* Mobile apps: phone showing the same records */}
      <g data-hl="mobile-app-development">
        <rect x={256} y={22} width={48} height={96} rx="9" fill={C.ink} stroke={C.line} strokeWidth="1.5" />
        <rect x={276} y={27} width={8} height={3} rx="1.5" fill={C.line} />
        {[40, 56, 72].map((y, i) => (
          <g key={y}>
            <rect x={262} y={y - 4} width={36} height={12} rx="3" fill={C.inkSoft} />
            <TextLine x={266} y={y} w={18} fill={C.mute} h={3} />
            <Status cx={292} cy={y + 2} color={i === 0 ? C.orange : "#6aa37f"} />
          </g>
        ))}
        <rect x={262} y={94} width={36} height={12} rx="3" fill={C.orange} />
        <rect x={273} y={111} width={14} height={2} rx="1" fill={C.line} />
      </g>

      {/* AI automation: workflow with human review */}
      <g data-hl="ai-automation">
        <Connector d="M80 120v52" color={C.orange} dashed id="sw-app" />
        <Connector d="M56 194h214" color={C.paper} width={1.5} />
        <Node cx={56} cy={194} fill={C.ink}>
          <path d="M-8-5h16v10h-16zM-8-5l8 6 8-6" fill="none" stroke={C.paper} strokeWidth="1.8" strokeLinejoin="round" />
        </Node>
        <Node cx={128} cy={194} fill={C.ink}>
          <path d="M-8-5h16M-8 0h10M-8 5h13" stroke={C.paper} strokeWidth="2" strokeLinecap="round" />
        </Node>
        <Node cx={200} cy={194} size={42} fill={C.orange}>
          <Person fill={C.ink} />
        </Node>
        <Node cx={270} cy={194} fill={C.ink}>
          <Check />
        </Node>
      </g>
    </g>
  );
}

function MarketingScene() {
  return (
    <g>
      <Ground id="marketing" fill={C.ink} />

      {/* SEO: search result */}
      <g data-hl="seo">
        <Panel x={16} y={18} w={150} h={68} fill={C.paper} r={7} />
        <rect x={25} y={27} width={132} height={13} rx="6.5" fill="none" stroke={C.stone} strokeWidth="1.5" />
        <circle cx={34} cy={33.5} r="3.2" fill="none" stroke={C.ink} strokeWidth="1.5" />
        <path d="M36.3 35.8l2.8 2.8" stroke={C.ink} strokeWidth="1.5" strokeLinecap="round" />
        <TextLine x={44} y={31.5} w={50} />
        <TextLine x={25} y={50} w={40} fill={C.stone} h={3} />
        <TextLine x={25} y={58} w={104} fill={C.orange} h={5} />
        <TextLine x={25} y={69} w={124} h={3} />
        <TextLine x={25} y={77} w={92} h={3} />
      </g>

      {/* Paid advertising: ad creative */}
      <g data-hl="paid-advertising">
        <Panel x={16} y={102} w={84} h={118} fill={C.paper} r={7} />
        <rect x={23} y={109} width={70} height={46} rx="4" fill={C.orange} />
        <circle cx={58} cy={132} r="12" fill={C.ink} opacity="0.85" />
        <TextLine x={23} y={164} w={58} fill={C.ink} />
        <TextLine x={23} y={174} w={40} />
        <rect x={23} y={188} width={36} height={13} rx="3" fill={C.ink} />
        <text x={67} y={198} fontSize="7" fontWeight="700" fill={C.mute} fontFamily="inherit">AD</text>
      </g>

      {/* Conversion optimisation: landing page destination */}
      <g data-hl="conversion-optimization">
        <Browser x={200} y={52} w={106} h={164}>
          <rect x={10} y={12} width={70} height={8} rx="2" fill={C.ink} />
          <TextLine x={10} y={28} w={82} />
          <TextLine x={10} y={37} w={58} />
          {[54, 72, 90].map((y) => (
            <rect key={y} x={10} y={y} width={86} height={12} rx="3" fill="#fff" stroke={C.stone} />
          ))}
          <rect x={10} y={112} width={86} height={16} rx="3" fill={C.orange} />
          <path d="M84 136l3 3 6-6" stroke={C.ink} strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </Browser>
      </g>

      {/* Email marketing: takes the landing page's place, shown only when Email is hovered/focused */}
      <g data-hl="email-marketing" data-reveal="">
        <Panel x={200} y={52} w={106} h={164} fill={C.paper} r={7} />
        <rect x={210} y={62} width={30} height={21} rx="3.5" fill="none" stroke={C.ink} strokeWidth="1.8" />
        <path d="M211 63.8l14 9.8 14-9.8" fill="none" stroke={C.ink} strokeWidth="1.8" strokeLinejoin="round" />
        <circle cx={243} cy={63} r="4.5" fill={C.orange} />
        <TextLine x={210} y={94} w={78} fill={C.ink} h={6} />
        <TextLine x={210} y={106} w={64} h={3} />
        <rect x={210} y={116} width={86} height={44} rx="4" fill="#e3d6c3" />
        <path d="M244 124h18l-2.5 28h-13z" fill="#7f9a86" />
        <TextLine x={210} y={170} w={82} h={3} />
        <TextLine x={210} y={177} w={60} h={3} />
        <rect x={210} y={188} width={86} height={16} rx="3" fill={C.orange} />
      </g>

      {/* Every channel leads to the landing page */}
      <g data-hl="seo paid-advertising email-marketing conversion-optimization">
        <Connector d="M166 52c20 0 22 30 34 34" dashed arrow id="mk-1" />
        <Connector d="M100 120c40 0 60-8 100-8" dashed arrow id="mk-2" />
      </g>
    </g>
  );
}

/* ------------------------------------------------------------------ */
/* Compact need illustrations (light). Decorative.                     */
/* ------------------------------------------------------------------ */

export function NeedIllustration({ kind }: { kind: "presence" | "customers" | "operations" }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 200 110" className="block aspect-[20/11] w-full max-w-[15rem] rounded-lg">
      <rect width="200" height="110" rx="10" fill="#EFF1EE" />
      {kind === "presence" && (
        <Browser x={30} y={14} w={140} h={84} fill="#fff">
          <rect x={10} y={10} width={58} height={8} rx="2" fill={C.ink} />
          <TextLine x={10} y={26} w={52} />
          <TextLine x={10} y={34} w={40} />
          <rect x={10} y={46} width={30} height={11} rx="3" fill={C.orange} />
          <rect x={80} y={10} width={50} height={47} rx="4" fill={C.stone} />
        </Browser>
      )}
      {kind === "customers" && (
        <g>
          <Panel x={14} y={24} w={84} h={30} fill="#fff" stroke={C.stone} r={15} />
          <circle cx={32} cy={39} r="5" fill="none" stroke={C.ink} strokeWidth="2" />
          <path d="M35.5 42.5l4 4" stroke={C.ink} strokeWidth="2" strokeLinecap="round" />
          <TextLine x={46} y={37} w={40} fill={C.ink} />
          <Panel x={24} y={64} w={64} h={26} fill={C.orange} r={5} />
          <TextLine x={32} y={73} w={36} fill={C.ink} />
          <TextLine x={32} y={81} w={24} fill={C.ink} />
          <Connector d="M98 39c20 0 24 16 42 16M88 77c22 0 32-14 52-14" dashed arrow id="need-c" />
          <Panel x={142} y={30} w={44} h={52} fill="#fff" stroke={C.stone} />
          <TextLine x={150} y={40} w={28} fill={C.ink} />
          <rect x={150} y={50} width={28} height={7} rx="2" fill={C.stone} />
          <rect x={150} y={62} width={28} height={10} rx="2" fill={C.ink} />
        </g>
      )}
      {kind === "operations" && (
        <g>
          <Connector d="M40 55h120" color={C.ink} width={1.75} />
          <Node cx={40} cy={55} size={30} fill={C.ink}>
            <path d="M-6-3h12M-6 2h8" stroke={C.paper} strokeWidth="2" strokeLinecap="round" />
          </Node>
          <Node cx={100} cy={55} size={38} fill={C.orange}>
            <Person fill={C.ink} scale={0.95} />
          </Node>
          <Node cx={160} cy={55} size={30} fill={C.ink}>
            <Check />
          </Node>
        </g>
      )}
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Final CTA composition. Decorative.                                  */
/* ------------------------------------------------------------------ */

export function CtaArtwork({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 420 340" className={cn("block w-full", className)}>
      <defs>
        <pattern id="cta-grid" width="16" height="16" patternUnits="userSpaceOnUse">
          <path d="M16 0H0V16" fill="none" stroke="#fff" strokeOpacity="0.05" />
        </pattern>
      </defs>
      {/* Background motif: the Growbytes stepped blocks, outlined */}
      <g opacity="0.5">
        <rect x="186" y="120" width="96" height="120" rx="14" fill="none" stroke={C.line} strokeWidth="2" />
        <rect x="296" y="20" width="96" height="220" rx="14" fill="url(#cta-grid)" stroke={C.line} strokeWidth="2" />
      </g>
      {/* Browser */}
      <Browser x={40} y={70} w={210} h={156} fill={C.paper}>
        <rect x={14} y={14} width={96} height={11} rx="2" fill={C.ink} />
        <TextLine x={14} y={34} w={120} />
        <TextLine x={14} y={44} w={92} />
        <rect x={14} y={58} width={56} height={16} rx="3" fill={C.orange} />
        <rect x={14} y={88} width={56} height={40} rx="4" fill={C.stone} />
        <rect x={78} y={88} width={56} height={40} rx="4" fill={C.stone} />
        <rect x={142} y={88} width={54} height={40} rx="4" fill={C.stone} />
      </Browser>
      {/* Modules connected by an orange path */}
      <Connector d="M250 120c34 0 34-50 70-50M250 178c34 0 30 60 64 60" width={2.5} dashed id="cta" />
      <Node cx={340} cy={70} size={44} fill={C.inkSoft} stroke={C.line}>
        <path d="M-9-6h18v12h-18zM-9-6l9 7 9-7" fill="none" stroke={C.paper} strokeWidth="2" strokeLinejoin="round" />
      </Node>
      <Node cx={336} cy={238} size={44} fill={C.orange}>
        <Check color={C.ink} />
      </Node>
      <Status cx={250} cy={120} />
      <Status cx={250} cy={178} />
    </svg>
  );
}
