import { ProductArt } from "./ProjectVisuals";
import { BrowserFrame, Illustration } from "./frames";

/**
 * Hero composition, art-directed as one scene:
 *  1. a dominant storefront browser (the experience customers see),
 *  2. a supporting orders panel (the software behind it),
 *  3. a small automation strip (the workflow that connects them).
 * Pure HTML/SVG, so it never becomes the LCP image. On small screens the
 * pieces stack instead of shrinking into illegibility.
 */
export function HeroVisual() {
  return (
    <Illustration
      label="Illustration of a fictional homeware store: a product page for an oak side table with an add-to-cart button, an orders panel listing recent orders and their status, and an automation that updates stock and sends a confirmation when an order is placed."
      className="mx-auto w-full max-w-[44rem] sm:aspect-[10/9.4]"
    >
      <div className="grid gap-3 sm:block">
        {/* 1. Storefront */}
        <BrowserFrame url="hearthline.example/oak-side-table" className="sm:absolute sm:top-0 sm:right-0 sm:w-[86%]">
          <div className="bg-[#faf7f1]">
            <div className="flex items-center justify-between border-b border-line px-5 py-3">
              <p className="text-[15px] font-extrabold tracking-tight">hearthline</p>
              <div className="hidden gap-4 text-[11px] font-semibold text-muted sm:flex">
                <span className="text-ink">Living</span>
                <span>Kitchen</span>
                <span>Bedroom</span>
              </div>
              <span className="flex items-center gap-1.5 text-[11px] font-bold">
                Cart
                <span className="grid size-4 place-items-center rounded-full bg-ink text-[9px] text-white">1</span>
              </span>
            </div>
            <div className="grid grid-cols-[1.05fr_1fr] gap-5 p-5">
              <div className="relative aspect-[4/5] overflow-hidden rounded-md bg-[#efe6d8]">
                <ProductArt kind="table" />
                <span className="absolute top-2.5 left-2.5 rounded-sm bg-white px-2 py-0.5 text-[10px] font-bold">New</span>
              </div>
              <div className="flex flex-col">
                <p className="text-[10px] font-bold tracking-[0.12em] text-muted uppercase">Living room</p>
                <p className="mt-1 text-[20px] leading-tight font-extrabold tracking-tight">Oak side table</p>
                <p className="mt-1 text-[15px] font-bold">$240</p>
                <div className="mt-3 flex gap-1.5">
                  {["#b08a5b", "#3a3d3b", "#e8e4dc"].map((c, i) => (
                    <span
                      key={c}
                      className={i === 0 ? "size-5 rounded-full ring-2 ring-ink ring-offset-2" : "size-5 rounded-full border border-line"}
                      style={{ background: c }}
                    />
                  ))}
                </div>
                <dl className="mt-4 space-y-1.5 text-[11px]">
                  {[
                    ["Size", "45 × 45 × 52 cm"],
                    ["Material", "Solid oak"],
                    ["Delivery", "Shown before checkout"],
                  ].map(([k, v]) => (
                    <div key={k} className="flex justify-between gap-2 border-b border-line pb-1.5">
                      <dt className="text-muted">{k}</dt>
                      <dd className="text-right font-semibold">{v}</dd>
                    </div>
                  ))}
                </dl>
                <span className="mt-auto block rounded-md bg-accent py-2.5 text-center text-[12px] font-bold text-ink">Add to cart</span>
              </div>
            </div>
          </div>
        </BrowserFrame>

        {/* 2. Orders panel */}
        <div className="rounded-lg border border-line bg-white p-4 shadow-float sm:absolute sm:bottom-[11%] sm:left-0 sm:w-[47%]">
          <div className="flex items-center justify-between">
            <p className="text-[13px] font-bold">Orders</p>
            <span className="rounded-sm border border-dashed border-accent-strong/50 bg-accent-tint px-1.5 py-0.5 text-[9px] font-bold text-accent-strong uppercase">
              Sample data
            </span>
          </div>
          <ul className="mt-3 divide-y divide-line text-[11px]">
            {[
              ["#1042", "Oak side table", "Paid", "bg-[#e3efe7] text-success"],
              ["#1041", "Linen throw", "Packed", "bg-surface text-ink"],
              ["#1040", "Glazed vase", "Shipped", "bg-surface text-ink"],
            ].map(([id, item, status, tone]) => (
              <li key={id} className="flex items-center gap-3 py-2">
                <span className="font-bold">{id}</span>
                <span className="flex-1 truncate text-muted">{item}</span>
                <span className={`rounded-sm px-1.5 py-0.5 text-[10px] font-bold ${tone}`}>{status}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* 3. Automation strip */}
        <div className="rounded-lg bg-ink px-4 py-3 text-paper shadow-float sm:absolute sm:right-0 sm:bottom-0 sm:w-[64%]">
          <p className="text-[10px] font-bold tracking-[0.12em] text-muted-on-dark uppercase">When an order is placed</p>
          <ol className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-[12px] font-semibold xl:flex-nowrap sm:text-[11.5px]">
            {["Update stock", "Notify team", "Email customer"].map((step, i) => (
              <li key={step} className="flex items-center gap-2">
                {i > 0 && (
                  <svg viewBox="0 0 16 10" className="w-3.5 shrink-0 text-accent" fill="none">
                    <path d="M1 5h12M9 1l4 4-4 4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
                <span className="flex items-center gap-1.5 whitespace-nowrap">
                  <span className="size-1.5 rounded-full bg-accent" />
                  {step}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </Illustration>
  );
}
