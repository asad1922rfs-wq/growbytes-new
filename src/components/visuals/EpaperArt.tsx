/** Illustrative overlays for the e-paper client card: a reader subscription panel and a front-page preview. */
export function EpaperArt() {
  return (
    <div aria-hidden="true" className="hidden sm:block">
      {/* Subscription panel */}
      <div className="absolute bottom-5 left-5 w-[44%] rounded-lg bg-white p-3 shadow-[0_18px_40px_-18px_rgb(23_25_24/0.4)] ring-1 ring-line transition-transform duration-500 ease-[var(--ease-out-soft)] group-hover:-translate-y-1 sm:bottom-7 sm:left-8 sm:p-4">
        <p className="text-[0.625rem] font-bold tracking-[0.12em] text-muted uppercase sm:text-[0.6875rem]">Subscribe</p>
        <p className="mt-1 font-serif text-[0.8125rem] leading-tight font-bold sm:text-[0.9375rem]">Read every edition, every morning</p>
        <div className="mt-2.5 grid grid-cols-2 gap-1.5">
          <div className="rounded-md border border-ink/15 p-1.5 sm:p-2">
            <p className="text-[0.625rem] font-semibold sm:text-[0.6875rem]">Monthly</p>
            <span className="mt-1 block h-1.5 w-8 rounded-full bg-line" />
          </div>
          <div className="rounded-md border-2 border-[#1d4f7a] p-1.5 sm:p-2">
            <p className="text-[0.625rem] font-semibold sm:text-[0.6875rem]">Yearly</p>
            <span className="mt-1 block h-1.5 w-10 rounded-full bg-line" />
          </div>
        </div>
        <span className="mt-2.5 block rounded-md bg-[#1d4f7a] py-1.5 text-center text-[0.625rem] font-bold text-white sm:text-[0.6875rem]">
          Subscribe
        </span>
      </div>

      {/* Front-page preview */}
      <div className="absolute right-5 -bottom-6 w-[34%] rotate-[3deg] rounded-sm bg-[#fbfaf6] p-2.5 shadow-[0_18px_40px_-18px_rgb(23_25_24/0.45)] ring-1 ring-line transition-transform duration-500 ease-[var(--ease-out-soft)] group-hover:-translate-y-1.5 group-hover:rotate-[1deg] sm:right-8 sm:p-3">
        <p className="border-b-2 border-ink pb-1 text-center font-serif text-[0.6875rem] leading-none font-bold sm:text-[0.875rem]">The Advocate News</p>
        <p className="mt-1 flex justify-between text-[0.4375rem] text-muted sm:text-[0.5rem]">
          <span>E-paper edition</span>
          <span>2 pages</span>
        </p>
        <span className="mt-2 block h-2 w-[90%] rounded-sm bg-ink/80" />
        <span className="mt-1 block h-2 w-[65%] rounded-sm bg-ink/80" />
        <div className="mt-2 grid grid-cols-[1.2fr_1fr] gap-2">
          <div className="aspect-[4/3] rounded-sm bg-[#d9d2c4]" />
          <div className="space-y-1">
            {[100, 90, 100, 75, 95, 60].map((w, i) => (
              <span key={i} className="block h-1 rounded-full bg-ink/15" style={{ width: `${w}%` }} />
            ))}
          </div>
        </div>
        <div className="mt-2 grid grid-cols-3 gap-1.5">
          {[0, 1, 2].map((c) => (
            <div key={c} className="space-y-1">
              {[100, 85, 100, 70].map((w, i) => (
                <span key={i} className="block h-1 rounded-full bg-ink/15" style={{ width: `${w}%` }} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
