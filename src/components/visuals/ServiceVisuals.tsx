import type { VisualKey } from "@/content/types";
import { Bar, BrowserFrame, Illustration, SampleTag } from "./frames";
import { CroVisual, CrmVisual, EmailVisual, MobileVisual, UxVisual } from "./ServiceVisualsExtra";

export function ServiceVisual({ kind, label }: { kind: VisualKey; label: string }) {
  const V = visuals[kind];
  return (
    <Illustration label={label} className="w-full">
      <V />
    </Illustration>
  );
}

const visuals: Record<VisualKey, () => React.JSX.Element> = {
  web: WebVisual,
  shopify: ShopifyVisual,
  software: SoftwareVisual,
  seo: SeoVisual,
  ads: AdsVisual,
  branding: BrandingVisual,
  automation: AutomationVisual,
  cro: CroVisual,
  email: EmailVisual,
  crm: CrmVisual,
  mobile: MobileVisual,
  ux: UxVisual,
};

function WebVisual() {
  return (
    <div className="grid grid-cols-[0.8fr_1.2fr] items-center gap-4">
      <div className="rounded-lg border border-dashed border-field/60 bg-white/60 p-3">
        <p className="text-[9px] font-bold tracking-[0.12em] text-muted uppercase">Wireframe</p>
        <div className="mt-3 space-y-2">
          <span className="block h-2 w-1/2 rounded-sm bg-ink/20" />
          <span className="block h-5 w-full rounded-sm bg-ink/10" />
          <span className="block h-2 w-3/4 rounded-sm bg-ink/10" />
          <div className="grid grid-cols-3 gap-1.5 pt-2">
            {[0, 1, 2].map((i) => (
              <span key={i} className="block h-8 rounded-sm border border-dashed border-ink/20" />
            ))}
          </div>
          <span className="block h-6 w-full rounded-sm border border-dashed border-ink/20" />
        </div>
      </div>
      <BrowserFrame url="northgate.example/commercial">
        <div className="p-4">
          <p className="text-[8px] font-bold tracking-[0.14em] text-accent-strong uppercase">For facilities managers</p>
          <p className="mt-1.5 text-[16px] leading-[1.1] font-extrabold tracking-tight">Planned maintenance across every site you manage.</p>
          <div className="mt-2 space-y-1.5">
            <Bar w="90%" />
            <Bar w="65%" />
          </div>
          <span className="mt-3 inline-block rounded-[3px] bg-accent-strong px-2 py-1 text-[8px] font-bold text-white">Request a site survey</span>
          <div className="mt-4 grid grid-cols-3 gap-1.5">
            {["HVAC", "Electrical", "Fabric repairs"].map((t) => (
              <div key={t} className="rounded-md bg-surface p-2">
                <p className="text-[8px] font-bold">{t}</p>
                <Bar w="70%" className="mt-1 h-1" />
              </div>
            ))}
          </div>
          <div className="mt-3 flex items-center justify-between rounded-md border border-line p-2">
            <p className="text-[8px] font-semibold">Accessibility checked · Mobile ready</p>
            <span className="text-[8px] font-bold text-success">✓</span>
          </div>
        </div>
      </BrowserFrame>
    </div>
  );
}

function ShopifyVisual() {
  return (
    <div className="grid grid-cols-[1fr_1.15fr_0.85fr] items-start gap-3">
      <div className="rounded-lg border border-line bg-white p-3 shadow-card">
        <p className="text-[8px] font-bold tracking-[0.12em] text-muted uppercase">1 · Discover</p>
        <p className="mt-2 text-[10px] font-extrabold">Living room</p>
        <div className="mt-2 flex flex-wrap gap-1">
          {["Stoneware", "Oak", "Under 60 cm"].map((f, i) => (
            <span key={f} className={i === 0 ? "rounded-[3px] bg-ink px-1.5 py-0.5 text-[7px] font-bold text-white" : "rounded-[3px] border border-line px-1.5 py-0.5 text-[7px] font-semibold"}>
              {f}
            </span>
          ))}
        </div>
        <div className="mt-2.5 grid grid-cols-2 gap-1.5">
          {["#d9c9b0", "#e8e4dc", "#b9c4b5", "#cfb7a2"].map((c) => (
            <div key={c}>
              <span className="block aspect-square rounded-sm" style={{ background: c }} />
              <Bar w="80%" className="mt-1 h-1" />
            </div>
          ))}
        </div>
      </div>
      <div className="rounded-lg border border-line bg-white p-3 shadow-float">
        <p className="text-[8px] font-bold tracking-[0.12em] text-muted uppercase">2 · Decide</p>
        <span className="mt-2 block aspect-[4/3] rounded-sm bg-[#e9e0d2]" />
        <p className="mt-2 text-[10px] font-extrabold">Oak side table</p>
        <dl className="mt-1.5 space-y-1 text-[7px]">
          {[
            ["Dimensions", "45 × 45 × 52 cm"],
            ["Care", "Wipe with dry cloth"],
            ["Delivery", "Estimate shown at checkout"],
          ].map(([k, v]) => (
            <div key={k} className="flex justify-between gap-2 border-b border-line pb-1">
              <dt className="text-muted">{k}</dt>
              <dd className="text-right font-semibold">{v}</dd>
            </div>
          ))}
        </dl>
        <span className="mt-2 block rounded-[3px] bg-ink py-1 text-center text-[8px] font-bold text-white">Add to cart</span>
      </div>
      <div className="rounded-lg border border-line bg-white p-3 shadow-card">
        <p className="text-[8px] font-bold tracking-[0.12em] text-muted uppercase">3 · Buy</p>
        <p className="mt-2 text-[10px] font-extrabold">Your cart</p>
        {["Oak side table", "Stoneware planter"].map((t) => (
          <div key={t} className="mt-2 flex items-center gap-1.5">
            <span className="size-5 shrink-0 rounded-sm bg-surface" />
            <div className="flex-1">
              <p className="text-[7px] font-bold leading-tight">{t}</p>
              <p className="text-[7px] text-muted">Qty − 1 +</p>
            </div>
          </div>
        ))}
        <div className="mt-2 border-t border-line pt-1.5 text-[7px] text-muted">Shipping calculated before payment</div>
        <span className="mt-2 block rounded-[3px] bg-accent-strong py-1 text-center text-[8px] font-bold text-white">Checkout</span>
      </div>
    </div>
  );
}

function SoftwareVisual() {
  const cols = [
    { t: "Booked", n: 3 },
    { t: "In transit", n: 2 },
    { t: "Exception", n: 1, warn: true },
  ];
  return (
    <div className="relative">
      <BrowserFrame url="ops.internal / jobs" dark>
        <div className="grid grid-cols-[3.25rem_1fr] text-paper">
          <div className="space-y-2 border-r border-white/10 p-2.5">
            {["Jobs", "Clients", "Docs", "Reports"].map((n, i) => (
              <p key={n} className={i === 0 ? "rounded-sm bg-white/10 px-1.5 py-1 text-[7px] font-bold" : "px-1.5 text-[7px] text-muted-on-dark"}>
                {n}
              </p>
            ))}
          </div>
          <div className="p-3">
            <div className="flex items-center justify-between">
              <p className="text-[10px] font-bold">Job pipeline</p>
              <SampleTag>Sample data</SampleTag>
            </div>
            <div className="mt-2.5 grid grid-cols-3 gap-2">
              {cols.map((c) => (
                <div key={c.t} className="rounded-md bg-white/5 p-1.5">
                  <p className={c.warn ? "text-[7px] font-bold text-accent" : "text-[7px] font-bold text-muted-on-dark"}>{c.t}</p>
                  {Array.from({ length: c.n }).map((_, i) => (
                    <div key={i} className={c.warn ? "mt-1.5 rounded-sm border border-accent/50 bg-accent/10 p-1.5" : "mt-1.5 rounded-sm bg-white/10 p-1.5"}>
                      <span className="block h-1 w-3/4 rounded-full bg-white/40" />
                      <span className="mt-1 block h-1 w-1/2 rounded-full bg-white/20" />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </BrowserFrame>
      <div className="mt-3 grid grid-cols-3 gap-2">
        {["Accounting", "Inventory", "Carrier API"].map((s) => (
          <div key={s} className="flex items-center gap-1.5 rounded-md border border-line bg-white px-2 py-1.5 text-[8px] font-bold">
            <span className="size-1.5 rounded-full bg-success" /> {s}
            <span className="ml-auto text-muted">sync</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function SeoVisual() {
  const articles = [
    { x: 40, y: 34, t: "Guide" },
    { x: 260, y: 30, t: "Comparison" },
    { x: 22, y: 168, t: "Checklist" },
    { x: 272, y: 172, t: "FAQ" },
  ];
  return (
    <div className="rounded-lg border border-line bg-white p-3">
      <svg viewBox="0 0 360 230" className="w-full">
        <defs>
          <marker id="seo-arrow" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M0 0 8 4 0 8z" fill="#C2401B" />
          </marker>
        </defs>
        {articles.map((a) => (
          <line
            key={a.t}
            x1={a.x + 34}
            y1={a.y + 16}
            x2={180}
            y2={115}
            stroke="#C2401B"
            strokeWidth="1.25"
            strokeDasharray="3 3"
            markerEnd="url(#seo-arrow)"
          />
        ))}
        <line x1="180" y1="140" x2="180" y2="212" stroke="#171918" strokeWidth="1.25" />
        <rect x="120" y="90" width="120" height="50" rx="8" fill="#171918" />
        <text x="180" y="112" textAnchor="middle" fontSize="11" fontWeight="800" fill="#fff">Service page</text>
        <text x="180" y="127" textAnchor="middle" fontSize="8" fill="#A3ABA5">Commercial intent</text>
        {articles.map((a) => (
          <g key={a.t}>
            <rect x={a.x} y={a.y} width="68" height="32" rx="6" fill="#F7F7F2" stroke="#DDE2DC" />
            <text x={a.x + 34} y={a.y + 14} textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#171918">{a.t}</text>
            <text x={a.x + 34} y={a.y + 25} textAnchor="middle" fontSize="7" fill="#5D645F">Informational</text>
          </g>
        ))}
        <rect x="140" y="200" width="80" height="24" rx="5" fill="#FDE9E3" stroke="#C2401B" strokeOpacity="0.4" />
        <text x="180" y="215" textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#C2401B">Inquiry</text>
      </svg>
    </div>
  );
}

function AdsVisual() {
  return (
    <div className="grid grid-cols-[1fr_auto_1.15fr_auto_0.8fr] items-center gap-2">
      <div className="rounded-lg border border-line bg-white p-3 shadow-card">
        <p className="text-[8px] font-bold tracking-[0.12em] text-muted uppercase">Search ad</p>
        <p className="mt-2 text-[7px] text-muted">Sponsored · northgate.example</p>
        <p className="mt-0.5 text-[10px] font-bold leading-tight text-[#1a4fb4]">Commercial Roof Repairs — Survey Within Your Schedule</p>
        <Bar w="95%" className="mt-1.5 h-1" />
        <Bar w="70%" className="mt-1 h-1" />
      </div>
      <Arrow />
      <BrowserFrame url="northgate.example/roof-repairs">
        <div className="p-3">
          <p className="text-[10px] leading-tight font-extrabold">Commercial roof repairs, scheduled around your tenants</p>
          <Bar w="85%" className="mt-2 h-1" />
          <div className="mt-2 space-y-1">
            {["Site address", "Roof type"].map((f) => (
              <span key={f} className="block rounded-[3px] border border-line px-1.5 py-1 text-[7px] text-muted">{f}</span>
            ))}
          </div>
          <span className="mt-2 block rounded-[3px] bg-accent-strong py-1 text-center text-[8px] font-bold text-white">Book a survey</span>
        </div>
      </BrowserFrame>
      <Arrow />
      <div className="rounded-lg bg-ink p-3 text-paper">
        <p className="text-[8px] font-bold tracking-[0.12em] text-muted-on-dark uppercase">Tracked</p>
        <p className="mt-2 text-[9px] font-bold">Qualified lead</p>
        <p className="mt-1 text-[7px] text-muted-on-dark">Sent to CRM with campaign source</p>
      </div>
    </div>
  );
}

function Arrow() {
  return (
    <svg viewBox="0 0 20 12" className="w-4 text-accent-strong" fill="none">
      <path d="M1 6h16M12 1l5 5-5 5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function BrandingVisual() {
  const swatches = [
    { c: "#1F3B33", n: "Forest", r: "11.9:1" },
    { c: "#E7DCC8", n: "Linen", r: "Text: ink" },
    { c: "#C4532D", n: "Clay", r: "4.6:1" },
    { c: "#FAF8F3", n: "Paper", r: "Base" },
  ];
  return (
    <div className="grid grid-cols-2 gap-3">
      <div className="flex aspect-[4/3] flex-col justify-between rounded-lg bg-[#1F3B33] p-4 text-[#FAF8F3]">
        <p className="text-[8px] font-bold tracking-[0.14em] uppercase opacity-70">Primary lockup</p>
        <div className="flex items-center gap-2">
          <svg viewBox="0 0 24 24" className="size-7">
            <circle cx="12" cy="12" r="10" fill="none" stroke="#E7DCC8" strokeWidth="2" />
            <path d="M7 15c3-6 7-6 10 0" stroke="#C4532D" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          </svg>
          <span className="text-[18px] font-extrabold tracking-tight">Fieldstone</span>
        </div>
        <p className="text-[8px] opacity-70">Fictional brand used for illustration</p>
      </div>
      <div className="rounded-lg border border-line bg-white p-3">
        <p className="text-[8px] font-bold tracking-[0.14em] text-muted uppercase">Type scale</p>
        <p className="mt-2 text-[20px] leading-none font-extrabold tracking-tight">Aa</p>
        {[14, 11, 9].map((s) => (
          <p key={s} className="mt-1.5 truncate font-semibold" style={{ fontSize: s }}>
            Clear, practical, warm
          </p>
        ))}
      </div>
      <div className="col-span-2 grid grid-cols-4 gap-2">
        {swatches.map((s) => (
          <div key={s.n} className="overflow-hidden rounded-md border border-line bg-white">
            <span className="block h-10" style={{ background: s.c }} />
            <div className="p-1.5">
              <p className="text-[8px] font-bold">{s.n}</p>
              <p className="text-[7px] text-muted">{s.r}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AutomationVisual() {
  const steps = [
    { k: "Trigger", v: "New email or form", tone: "plain" },
    { k: "Process", v: "AI reads and sorts it", tone: "plain" },
    { k: "Human review", v: "A person checks unsure cases", tone: "accent" },
    { k: "Action", v: "CRM updated, reply sent", tone: "plain" },
  ] as const;
  return (
    <div className="rounded-lg bg-ink p-4 text-paper sm:p-5">
      <ol className="grid grid-cols-2 gap-2.5 xl:grid-cols-4">
        {steps.map((s, i) => (
          <li
            key={s.k}
            className={
              s.tone === "accent"
                ? "rounded-md border border-accent/60 bg-accent/10 p-3.5"
                : "rounded-md border border-white/10 bg-white/5 p-3.5"
            }
          >
            <p className="text-[11px] font-bold tracking-[0.12em] text-muted-on-dark uppercase">Step {i + 1}</p>
            <p className={s.tone === "accent" ? "mt-1 text-[15px] font-bold text-accent" : "mt-1 text-[15px] font-bold"}>{s.k}</p>
            <p className="mt-1.5 text-[13px] leading-snug text-muted-on-dark">{s.v}</p>
          </li>
        ))}
      </ol>
      <div className="mt-3 flex flex-wrap items-center gap-2 rounded-md border border-dashed border-white/20 p-3 text-[13px] text-muted-on-dark">
        <span className="font-bold text-paper">On failure:</span> retry safely → alert owner → manual fallback queue
      </div>
    </div>
  );
}
