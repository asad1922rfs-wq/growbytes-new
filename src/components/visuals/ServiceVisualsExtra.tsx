import { siCalendly, siGmail, siGooglesheets, siHubspot, siSlack, siStripe } from "simple-icons";
import { Bar, BrowserFrame } from "./frames";

/** Conversion optimisation: an A/B test where variant B wins, with a funnel below. */
export function CroVisual() {
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        {(["A", "B"] as const).map((v) => (
          <BrowserFrame key={v} url={`variant-${v.toLowerCase()}.example`}>
            <div className="relative p-3">
              {v === "B" && <span className="absolute top-2 right-2 rounded-full bg-success px-1.5 py-0.5 text-[7px] font-bold text-white">Winner</span>}
              <p className="text-[8px] font-bold tracking-[0.12em] text-muted uppercase">Variant {v}</p>
              <p className="mt-1.5 text-[10px] leading-tight font-extrabold">{v === "A" ? "Learn about our services" : "Get a free quote in 2 minutes"}</p>
              <Bar w="80%" className="mt-2 h-1" />
              <span className={`mt-2.5 block rounded-[3px] py-1 text-center text-[8px] font-bold ${v === "B" ? "bg-accent-strong text-white" : "border border-line text-muted"}`}>
                {v === "A" ? "Read more" : "Get my quote"}
              </span>
            </div>
          </BrowserFrame>
        ))}
      </div>
      <div className="rounded-lg border border-line bg-white p-3 shadow-card">
        <p className="text-[8px] font-bold tracking-[0.12em] text-muted uppercase">Funnel</p>
        <div className="mt-2 space-y-1.5">
          {[
            ["Visitors", "100%"],
            ["Viewed offer", "62%"],
            ["Started form", "34%"],
            ["Inquiry sent", "21%"],
          ].map(([label, w], i) => (
            <div key={label} className="grid grid-cols-[4.5rem_1fr] items-center gap-2">
              <span className="text-[8px] font-semibold">{label}</span>
              <span className={`block h-2 rounded-sm ${i === 3 ? "bg-accent" : "bg-ink/15"}`} style={{ width: w }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/** Email marketing: a branded email beside its send sequence. */
export function EmailVisual() {
  return (
    <div className="grid grid-cols-[1.25fr_0.9fr] items-center gap-3">
      <div className="overflow-hidden rounded-lg border border-line bg-white shadow-float">
        <div className="border-b border-line px-3 py-2">
          <p className="text-[8px] text-muted">From: Hearthline · To: you</p>
          <p className="mt-0.5 text-[9px] font-bold">New in: the autumn living room edit</p>
        </div>
        <div className="p-3">
          <span className="block h-12 rounded-md bg-[#e8dfd1]" />
          <p className="mt-2 text-[10px] leading-tight font-extrabold">Warm up your space this season</p>
          <Bar w="90%" className="mt-1.5 h-1" />
          <Bar w="70%" className="mt-1 h-1" />
          <span className="mt-2.5 inline-block rounded-[3px] bg-accent-strong px-2 py-1 text-[8px] font-bold text-white">Shop the edit</span>
        </div>
      </div>
      <div className="rounded-lg bg-ink p-3 text-paper">
        <p className="text-[8px] font-bold tracking-[0.12em] text-muted-on-dark uppercase">Sequence</p>
        <ol className="mt-2 space-y-2">
          {["Welcome", "Day 3 · Best sellers", "Day 7 · Offer", "Win-back"].map((s, i) => (
            <li key={s} className="flex items-center gap-2 text-[8px] font-semibold">
              <span className={`grid size-4 shrink-0 place-items-center rounded-full text-[7px] font-bold ${i < 2 ? "bg-accent text-white" : "bg-white/15"}`}>{i + 1}</span>
              {s}
            </li>
          ))}
        </ol>
        <p className="mt-3 text-[7px] text-muted-on-dark">Sample data</p>
      </div>
    </div>
  );
}

/** CRM integrations: the CRM in the middle, everyday tools wired into it. */
export function CrmVisual() {
  const around = [siGmail, siSlack, siStripe, siCalendly, siGooglesheets];
  const pos = [
    [10, 14],
    [50, 4],
    [90, 14],
    [18, 84],
    [82, 84],
  ];
  return (
    <div className="relative aspect-[16/9]">
      <svg viewBox="0 0 100 56" preserveAspectRatio="none" className="absolute inset-0 size-full" aria-hidden="true">
        {pos.map(([x, y], i) => (
          <line key={i} x1={x} y1={(y * 56) / 100} x2="50" y2="30" stroke="#f26b3a" strokeWidth="0.4" strokeDasharray="1.5 1.5" />
        ))}
      </svg>
      <div className="absolute top-[54%] left-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 rounded-xl bg-ink px-3 py-2 text-paper shadow-float">
        <svg viewBox="0 0 24 24" className="size-5" style={{ fill: `#${siHubspot.hex}` }} aria-hidden="true">
          <path d={siHubspot.path} />
        </svg>
        <span>
          <span className="block text-[9px] font-bold">Your CRM</span>
          <span className="block text-[7px] text-success">● All synced</span>
        </span>
      </div>
      {around.map((icon, i) => (
        <span
          key={icon.slug}
          className="absolute grid size-9 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-lg bg-white shadow-card ring-1 ring-line"
          style={{ left: `${pos[i][0]}%`, top: `${pos[i][1]}%` }}
        >
          <svg viewBox="0 0 24 24" className="size-4" style={{ fill: `#${icon.hex}` }} aria-hidden="true">
            <path d={icon.path} />
          </svg>
        </span>
      ))}
    </div>
  );
}

/** Mobile apps: two phone screens, home and booking, with a push notification. */
export function MobileVisual() {
  const phone = "w-[42%] rounded-[1.1rem] bg-ink p-1 shadow-float";
  return (
    <div className="relative flex items-end justify-center gap-4 pt-4">
      <div className={`${phone} -rotate-3`}>
        <div className="overflow-hidden rounded-[0.85rem] bg-white">
          <div className="flex justify-center pt-1">
            <span className="h-1 w-8 rounded-full bg-ink" />
          </div>
          <div className="space-y-2 p-2.5">
            <p className="text-[9px] font-extrabold">Good morning, Sara</p>
            <span className="block rounded-md bg-accent p-2">
              <span className="block text-[7px] font-bold text-white/80">Next booking</span>
              <span className="block text-[9px] font-extrabold text-white">Thu · 10:00</span>
            </span>
            {[0, 1, 2].map((i) => (
              <span key={i} className="flex items-center gap-1.5">
                <span className="size-4 rounded-md bg-surface" />
                <Bar w="70%" className="h-1" />
              </span>
            ))}
          </div>
          <div className="flex justify-around border-t border-line py-1.5">
            {[0, 1, 2, 3].map((i) => (
              <span key={i} className={`size-2 rounded-sm ${i === 0 ? "bg-accent" : "bg-ink/20"}`} />
            ))}
          </div>
        </div>
      </div>
      <div className={`${phone} rotate-3`}>
        <div className="overflow-hidden rounded-[0.85rem] bg-white">
          <div className="flex justify-center pt-1">
            <span className="h-1 w-8 rounded-full bg-ink" />
          </div>
          <div className="space-y-2 p-2.5">
            <p className="text-[9px] font-extrabold">Pick a time</p>
            <div className="grid grid-cols-3 gap-1">
              {["9:00", "10:00", "11:30", "13:00", "15:00", "16:30"].map((t, i) => (
                <span key={t} className={`rounded-[3px] py-1 text-center text-[7px] font-bold ${i === 1 ? "bg-ink text-white" : "bg-surface"}`}>
                  {t}
                </span>
              ))}
            </div>
            <span className="block rounded-[3px] bg-accent-strong py-1 text-center text-[8px] font-bold text-white">Confirm</span>
          </div>
        </div>
      </div>
      <div className="absolute top-0 left-1/2 flex -translate-x-1/2 items-center gap-1.5 rounded-lg bg-white px-2.5 py-1.5 shadow-float ring-1 ring-line">
        <span className="size-3 rounded-[3px] bg-accent" />
        <span className="text-[8px] font-bold">Booking confirmed</span>
      </div>
    </div>
  );
}

/** UI/UX design: a design canvas with a flow, a research note, and a teammate's cursor. */
export function UxVisual() {
  return (
    <div className="relative rounded-lg border border-line bg-[#f3f1ec] p-3 shadow-card">
      <div className="mb-2 flex items-center gap-1.5">
        {["Research", "Flows", "Screens"].map((t, i) => (
          <span key={t} className={`rounded-full px-2 py-0.5 text-[7px] font-bold ${i === 2 ? "bg-ink text-white" : "bg-white text-muted ring-1 ring-line"}`}>
            {t}
          </span>
        ))}
      </div>
      <div className="grid grid-cols-[1fr_auto_1fr_auto_1fr] items-center gap-1.5">
        {["Sign up", "Choose plan", "Pay"].map((screen, i) => (
          <div key={screen} className="contents">
            <div className={`rounded-md bg-white p-2 shadow-card ring-1 ${i === 1 ? "ring-2 ring-accent" : "ring-line"}`}>
              <p className="text-[7px] font-bold text-muted uppercase">{screen}</p>
              <Bar w="80%" className="mt-1.5 h-1" />
              <Bar w="55%" className="mt-1 h-1" />
              <span className={`mt-2 block h-3 rounded-[3px] ${i === 2 ? "bg-accent-strong" : "bg-ink/15"}`} />
            </div>
            {i < 2 && <span className="text-[10px] font-bold text-accent">→</span>}
          </div>
        ))}
      </div>
      <div className="mt-3 flex items-start gap-2">
        <span className="max-w-[60%] rotate-[-2deg] rounded-sm bg-[#fde68a] p-2 text-[8px] leading-snug font-semibold shadow-card">
          4 of 6 users missed the plan comparison. Make it the first thing they see.
        </span>
        <span className="ml-auto mt-3 flex items-center gap-1">
          <svg viewBox="0 0 12 12" className="size-3 fill-accent" aria-hidden="true">
            <path d="M1 1l9 4-4 1.2L4.8 10Z" />
          </svg>
          <span className="rounded-full bg-accent px-1.5 py-0.5 text-[7px] font-bold text-white">Designer</span>
        </span>
      </div>
    </div>
  );
}
