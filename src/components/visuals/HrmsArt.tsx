/** Illustrative overlays for the HRMS client card: a leave approval and a biometric check-in. No real data. */
export function HrmsArt() {
  return (
    <div aria-hidden="true" className="hidden sm:block">
      {/* Leave approval */}
      <div className="absolute bottom-5 left-5 w-[46%] rounded-lg bg-white p-3 shadow-[0_18px_40px_-18px_rgb(23_25_24/0.4)] ring-1 ring-line transition-transform duration-500 ease-[var(--ease-out-soft)] group-hover:-translate-y-1 sm:bottom-7 sm:left-8 sm:p-4">
        <p className="text-[0.625rem] font-bold tracking-[0.12em] text-muted uppercase sm:text-[0.6875rem]">Leave request</p>
        <div className="mt-2.5 flex items-center gap-2.5">
          <span className="size-7 shrink-0 rounded-full bg-[#dbe6fb] sm:size-8" />
          <div className="flex-1 space-y-1.5">
            <span className="block h-2 w-3/4 rounded-full bg-ink/70" />
            <span className="block h-1.5 w-1/2 rounded-full bg-line" />
          </div>
        </div>
        <p className="mt-2.5 text-[0.6875rem] font-semibold sm:text-[0.75rem]">Annual leave · 2 days</p>
        <div className="mt-2.5 grid grid-cols-2 gap-1.5 text-center text-[0.625rem] font-bold sm:text-[0.6875rem]">
          <span className="rounded-md bg-[#2563eb] py-1.5 text-white">Approve</span>
          <span className="rounded-md border border-ink/15 py-1.5">Decline</span>
        </div>
      </div>

      {/* Biometric check-in */}
      <div className="absolute right-5 bottom-10 w-[36%] rotate-[2deg] rounded-lg bg-white p-3 shadow-[0_18px_40px_-18px_rgb(23_25_24/0.45)] ring-1 ring-line transition-transform duration-500 ease-[var(--ease-out-soft)] group-hover:-translate-y-1.5 group-hover:rotate-0 sm:right-8 sm:bottom-14 sm:p-4">
        <div className="flex items-center gap-2">
          <span className="grid size-7 place-items-center rounded-md bg-[#e7f6ec] text-[#1f9d55] sm:size-8">
            <svg viewBox="0 0 24 24" className="size-4 fill-none stroke-current" strokeWidth="1.8" strokeLinecap="round">
              <path d="M12 11v3m-4-3a4 4 0 0 1 8 0v2a8 8 0 0 1-1 4M8 11v2a8 8 0 0 0 1.5 4.5M5 9a7.5 7.5 0 0 1 14 0" />
            </svg>
          </span>
          <div>
            <p className="text-[0.6875rem] font-bold sm:text-[0.75rem]">Checked in</p>
            <p className="text-[0.5625rem] text-muted sm:text-[0.625rem]">Biometric device</p>
          </div>
        </div>
        <span className="mt-3 block h-1.5 overflow-hidden rounded-full bg-line">
          <span className="block h-full w-2/3 rounded-full bg-[#1e3a5f]" />
        </span>
        <p className="mt-1.5 flex justify-between text-[0.5625rem] text-muted sm:text-[0.625rem]">
          <span>Today</span>
          <span>On shift</span>
        </p>
      </div>
    </div>
  );
}
