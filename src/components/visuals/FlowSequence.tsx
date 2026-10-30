import { cn } from "@/components/ui/primitives";
import { C, Check, Node, Person } from "./kit";

const steps = [
  { title: "Inquiry arrives", body: "From a form or email", glyph: "mail" },
  { title: "Organize", body: "AI sorts by service and urgency", glyph: "sort" },
  { title: "Human review", body: "A person checks unsure cases", glyph: "person" },
  { title: "Into the CRM", body: "Record created, reply sent", glyph: "check" },
] as const;

function Glyph({ kind, highlight }: { kind: (typeof steps)[number]["glyph"]; highlight: boolean }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 48 48" className="size-12 shrink-0">
      <Node cx={24} cy={24} size={44} fill={highlight ? C.orange : C.inkSoft} stroke={highlight ? undefined : C.line}>
        {kind === "mail" && <path d="M-9-6h18v12h-18zM-9-6l9 7 9-7" fill="none" stroke={C.paper} strokeWidth="2" strokeLinejoin="round" />}
        {kind === "sort" && <path d="M-9-6h18M-9 0h12M-9 6h7" stroke={C.paper} strokeWidth="2.2" strokeLinecap="round" />}
        {kind === "person" && <Person fill={C.ink} />}
        {kind === "check" && <Check />}
      </Node>
    </svg>
  );
}

/**
 * Inquiry → Organize → Human review → CRM, as real HTML text.
 * Horizontal with arrow connectors from md up; a vertical timeline on mobile.
 */
export function FlowSequence() {
  return (
    <div>
      <ol className="relative grid gap-6 md:grid-cols-4 md:gap-4">
        {/* Mobile connector line */}
        <span aria-hidden="true" className="absolute top-6 bottom-6 left-6 w-px bg-white/15 md:hidden" />
        {steps.map((s, i) => {
          const highlight = s.glyph === "person";
          return (
            <li key={s.title} className="relative flex items-start gap-4 md:flex-col md:gap-4">
              <div className="relative z-10 flex items-center md:w-full">
                <Glyph kind={s.glyph} highlight={highlight} />
                {i < steps.length - 1 && (
                  <svg aria-hidden="true" viewBox="0 0 40 12" preserveAspectRatio="none" className="mx-2 hidden h-3 flex-1 md:block">
                    <path d="M0 6h34M29 1l5 5-5 5" fill="none" stroke={C.orange} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
                  </svg>
                )}
              </div>
              <div>
                <p className="text-[0.8125rem] font-bold tracking-[0.1em] text-muted-on-dark uppercase">Step {i + 1}</p>
                <h4 className={cn("mt-1 text-lg font-bold leading-snug", highlight && "text-accent")}>{s.title}</h4>
                <p className="mt-1 text-[0.9375rem] leading-snug text-muted-on-dark">{s.body}</p>
              </div>
            </li>
          );
        })}
      </ol>
      <p className="mt-8 rounded-md border border-dashed border-white/20 px-4 py-3 text-[0.9375rem] text-muted-on-dark">
        <span className="font-bold text-paper">If a step fails:</span> it retries safely, alerts an owner, and moves to a
        manual queue.
      </p>
    </div>
  );
}
