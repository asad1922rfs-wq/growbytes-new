"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

/** A single button under the AI core; everything for giving an order opens in a popup. */
export function OrderPopup({
  count,
  children,
}: {
  count: number;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="hq-glass inline-flex items-center gap-2.5 rounded-full px-6 py-3.5 text-[1.0625rem] text-white transition-[filter] hover:brightness-125"
      >
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          className="size-5 fill-none stroke-[#F66135]"
          strokeWidth="2"
          strokeLinecap="round"
        >
          <path d="M12 5v14M5 12h14" />
        </svg>
        Give your team an order
        {count > 0 && (
          <span className="grid min-w-6 place-items-center rounded-full bg-[#F66135] px-1.5 text-[0.8125rem]">
            {count}
          </span>
        )}
      </button>

      {open &&
        createPortal(
          <div
            className="fixed inset-0 z-50 grid place-items-center bg-black/70 p-4 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          >
            <div
              role="dialog"
              aria-modal="true"
              aria-labelledby="order-title"
              onClick={(e) => e.stopPropagation()}
              className="hq-glass w-full max-w-2xl rounded-[1.75rem] p-6 sm:p-7"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 id="order-title" className="font-display text-3xl">
                    Give your team an order
                  </h2>
                  <p className="mt-1.5 text-[var(--hq-muted)]">
                    Pick a department and say what you want done, in your own
                    words.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close"
                  className="grid size-10 shrink-0 place-items-center rounded-full text-[var(--hq-muted)] hover:bg-white/10 hover:text-white"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="size-5 fill-none stroke-current"
                    strokeWidth="2"
                    strokeLinecap="round"
                    aria-hidden="true"
                  >
                    <path d="M6 6l12 12M18 6 6 18" />
                  </svg>
                </button>
              </div>
              <div className="mt-5">{children}</div>
            </div>
          </div>,
          // Render at the dashboard root so the popup covers the whole screen and keeps the HQ styles
          document.querySelector(".hq") ?? document.body,
        )}
    </>
  );
}
