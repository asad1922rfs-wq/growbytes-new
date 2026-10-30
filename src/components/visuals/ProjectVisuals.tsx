import type { Project } from "@/content/types";
import { cn } from "@/components/ui/primitives";
import { BrowserFrame, Illustration, SampleTag } from "./frames";

const labels: Record<Project["visual"], string> = {
  homeware:
    "Concept storefront for Hearthline, a fictional homeware brand: room-based navigation, material filter chips, and a product grid showing a side table, throw, vase, and lamp with illustrative prices.",
  property:
    "Concept website for Northgate Property Care, a fictional business: a homepage offering separate paths for homeowners and facilities managers, plus a quote request step.",
  logistics:
    "Concept operations dashboard for Relay Freight, a fictional logistics company, using labeled sample data: shipment pipeline, exception queue, and a document review panel.",
};

export function ProjectVisual({ kind, className }: { kind: Project["visual"]; className?: string }) {
  return (
    <Illustration label={labels[kind]} className={cn("w-full", className)}>
      {kind === "homeware" && <Homeware />}
      {kind === "property" && <Property />}
      {kind === "logistics" && <Logistics />}
    </Illustration>
  );
}

/** Simple product drawings so the storefront reads as a real catalog, not color blocks. */
export function ProductArt({ kind }: { kind: "table" | "throw" | "vase" | "lamp" }) {
  return (
    <svg viewBox="0 0 80 100" className="absolute inset-0 size-full">
      <ellipse cx="40" cy="88" rx="24" ry="3.5" fill="#171918" opacity="0.08" />
      {kind === "table" && (
        <g>
          <ellipse cx="40" cy="44" rx="24" ry="5" fill="#b08a5b" />
          <rect x="16" y="44" width="48" height="4" fill="#9a774b" />
          <path d="M24 48l-3 38M56 48l3 38M40 48v38" stroke="#8a6a42" strokeWidth="3" strokeLinecap="round" />
        </g>
      )}
      {kind === "throw" && (
        <g>
          <path d="M18 34h44v40c-6 6-38 6-44 0z" fill="#d9cfbf" />
          <path d="M18 34h44v8H18z" fill="#c9bca6" />
          {[24, 32, 40, 48, 56].map((x) => (
            <path key={x} d={`M${x} 74v8`} stroke="#c9bca6" strokeWidth="1.5" strokeLinecap="round" />
          ))}
          <path d="M18 54h44" stroke="#bfae92" strokeWidth="1" strokeDasharray="2 2" />
        </g>
      )}
      {kind === "vase" && (
        <g>
          <path d="M33 30h14c0 8 12 14 12 32 0 16-10 24-19 24s-19-8-19-24c0-18 12-24 12-32z" fill="#7f9a86" />
          <path d="M33 30h14" stroke="#5f7a66" strokeWidth="2" />
          <path d="M40 30c-2-10 2-18 8-22M40 30c3-8-1-15-6-18" stroke="#3f6b4f" strokeWidth="2" fill="none" strokeLinecap="round" />
        </g>
      )}
      {kind === "lamp" && (
        <g>
          <path d="M26 22h28l6 24H20z" fill="#efe3cc" stroke="#d8c7a8" />
          <path d="M40 46v36" stroke="#3a3d3b" strokeWidth="2.5" />
          <ellipse cx="40" cy="84" rx="12" ry="3" fill="#3a3d3b" />
        </g>
      )}
    </svg>
  );
}

function Homeware() {
  const items = [
    { bg: "#efe6d8", n: "Oak side table", meta: "Oak · 45 cm", art: "table", price: "$240", tag: "New" },
    { bg: "#eceae4", n: "Linen throw", meta: "Linen · 3 colors", art: "throw", price: "$85" },
    { bg: "#e4ebe5", n: "Glazed vase", meta: "Stoneware · 28 cm", art: "vase", price: "$62" },
    { bg: "#f1ebe1", n: "Pleat table lamp", meta: "Linen shade", art: "lamp", price: "$130", tag: "Low stock" },
  ] as const;
  return (
    <BrowserFrame url="hearthline.example/living-room">
      <div className="bg-[#faf7f1] p-4 sm:p-5">
        <div className="flex items-center justify-between border-b border-line pb-3">
          <p className="text-[13px] font-extrabold tracking-tight">hearthline</p>
          <div className="flex gap-3 text-[8px] font-semibold text-muted">
            <span className="border-b border-ink pb-0.5 text-ink">Living</span>
            <span>Kitchen</span>
            <span>Bedroom</span>
            <span className="hidden sm:inline">Outdoor</span>
          </div>
          <span className="flex items-center gap-1 text-[8px] font-bold">
            Cart <span className="grid size-3.5 place-items-center rounded-full bg-ink text-[7px] text-white">2</span>
          </span>
        </div>
        <div className="mt-4 flex items-end justify-between gap-2">
          <div>
            <p className="text-[8px] text-muted">Shop by room · 48 products</p>
            <p className="text-[18px] leading-tight font-extrabold tracking-tight">Living room</p>
          </div>
          <div className="flex gap-1">
            {["Oak", "Stoneware", "Linen", "Under 60 cm"].map((f, i) => (
              <span
                key={f}
                className={
                  i === 0
                    ? "rounded-[3px] bg-ink px-1.5 py-0.5 text-[7px] font-bold text-white"
                    : "hidden rounded-[3px] border border-line bg-white px-1.5 py-0.5 text-[7px] font-semibold sm:inline"
                }
              >
                {f}
              </span>
            ))}
          </div>
        </div>
        <div className="mt-3 grid grid-cols-4 gap-2">
          {items.map((it) => (
            <div key={it.n}>
              <div className="relative aspect-[4/5] overflow-hidden rounded-sm" style={{ background: it.bg }}>
                <ProductArt kind={it.art} />
                {"tag" in it && (
                  <span className="absolute top-1 left-1 rounded-[2px] bg-white px-1 py-px text-[6px] font-bold">{it.tag}</span>
                )}
              </div>
              <p className="mt-1.5 text-[8px] font-bold leading-tight">{it.n}</p>
              <p className="text-[7px] text-muted">{it.meta}</p>
              <p className="mt-0.5 text-[8px] font-bold">{it.price}</p>
            </div>
          ))}
        </div>
      </div>
    </BrowserFrame>
  );
}

function Property() {
  return (
    <BrowserFrame url="northgate.example">
      <div className="p-4 sm:p-5">
        <div className="flex items-center justify-between">
          <p className="text-[12px] font-extrabold">Northgate</p>
          <span className="rounded-[3px] bg-accent-strong px-2 py-1 text-[8px] font-bold text-white">Get a quote</span>
        </div>
        <p className="mt-4 max-w-[80%] text-[18px] leading-[1.1] font-extrabold tracking-tight">Property care for homes and commercial buildings.</p>
        <div className="mt-4 grid grid-cols-2 gap-2">
          {[
            ["I own or rent a home", "Repairs, servicing, inspections"],
            ["I manage commercial sites", "Planned maintenance contracts"],
          ].map(([t, d], i) => (
            <div key={t} className={i === 1 ? "rounded-md bg-ink p-2.5 text-paper" : "rounded-md border border-line bg-surface p-2.5"}>
              <p className="text-[9px] font-bold">{t}</p>
              <p className={i === 1 ? "mt-1 text-[7px] text-muted-on-dark" : "mt-1 text-[7px] text-muted"}>{d}</p>
            </div>
          ))}
        </div>
        <div className="mt-3 rounded-md border border-line p-2.5">
          <div className="flex items-center justify-between text-[8px] font-bold">
            <span>Quote request</span>
            <span className="text-muted">Step 2 of 3</span>
          </div>
          <div className="mt-1.5 h-1 rounded-full bg-surface">
            <span className="block h-1 w-2/3 rounded-full bg-accent-strong" />
          </div>
          <div className="mt-2 flex gap-1.5">
            {["Routine", "Within a week", "Urgent"].map((o, i) => (
              <span key={o} className={i === 1 ? "rounded-[3px] border border-ink px-1.5 py-0.5 text-[7px] font-bold" : "rounded-[3px] border border-line px-1.5 py-0.5 text-[7px]"}>
                {o}
              </span>
            ))}
          </div>
        </div>
      </div>
    </BrowserFrame>
  );
}

function Logistics() {
  const rows = [
    ["RF-1042", "Rotterdam → Leeds", "In transit", ""],
    ["RF-1043", "Jebel Ali → Riyadh", "Docs missing", "warn"],
    ["RF-1044", "Newark → Chicago", "Delivered", "ok"],
    ["RF-1045", "Felixstowe → Dubai", "Booked", ""],
  ];
  return (
    <BrowserFrame url="relay.internal / shipments" dark>
      <div className="p-4 text-paper sm:p-5">
        <div className="flex items-center justify-between">
          <p className="text-[12px] font-bold">Shipments</p>
          <SampleTag>Sample data — fictional</SampleTag>
        </div>
        <div className="mt-3 grid grid-cols-4 gap-2">
          {[
            ["Booked", "—"],
            ["In transit", "—"],
            ["Exceptions", "!"],
            ["Delivered", "—"],
          ].map(([k, v]) => (
            <div key={k} className={k === "Exceptions" ? "rounded-md border border-accent/50 bg-accent/10 p-2" : "rounded-md bg-white/5 p-2"}>
              <p className="text-[7px] text-muted-on-dark">{k}</p>
              <p className={k === "Exceptions" ? "mt-0.5 text-[12px] font-bold text-accent" : "mt-0.5 text-[12px] font-bold"}>{v}</p>
            </div>
          ))}
        </div>
        <div className="mt-3 grid grid-cols-[1.5fr_1fr] gap-2">
          <table className="w-full text-left text-[7.5px]">
            <tbody>
              {rows.map(([id, lane, status, tone]) => (
                <tr key={id} className="border-b border-white/10">
                  <td className="py-1.5 font-bold">{id}</td>
                  <td className="py-1.5 text-muted-on-dark">{lane}</td>
                  <td className={cn("py-1.5 text-right font-bold", tone === "warn" && "text-accent", tone === "ok" && "text-[#8fc7a3]")}>{status}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="rounded-md border border-white/10 bg-white/5 p-2">
            <p className="text-[8px] font-bold">Document review</p>
            <p className="mt-1 text-[7px] text-muted-on-dark">Extracted from delivery note</p>
            {["Consignee", "Weight", "Ref no."].map((f) => (
              <div key={f} className="mt-1 flex justify-between text-[7px]">
                <span className="text-muted-on-dark">{f}</span>
                <span className="h-1 w-8 self-center rounded-full bg-white/30" />
              </div>
            ))}
            <div className="mt-2 flex gap-1">
              <span className="flex-1 rounded-[3px] bg-accent py-0.5 text-center text-[7px] font-bold text-ink">Approve</span>
              <span className="flex-1 rounded-[3px] border border-white/20 py-0.5 text-center text-[7px] font-bold">Edit</span>
            </div>
          </div>
        </div>
      </div>
    </BrowserFrame>
  );
}
