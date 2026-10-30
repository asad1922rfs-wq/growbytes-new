import { GbIcon } from "@/components/icons/GbIcon";
import { lifecycle } from "@/content/home";

/**
 * Discovery → Design and planning → Build and launch → Improvement.
 * For use on dark sections. Each stage states the client's part and the output.
 */
export function Lifecycle() {
  return (
    <ol className="grid gap-x-10 gap-y-12 md:grid-cols-2 xl:grid-cols-4">
      {lifecycle.map((stage, i) => (
        <li key={stage.step} className="flex flex-col border-t border-white/20 pt-7">
          <div className="flex items-center justify-between">
            <GbIcon name={stage.icon} className="size-9 text-paper" />
            <span className="text-sm font-bold text-muted-on-dark">
              {String(i + 1).padStart(2, "0")} / {String(lifecycle.length).padStart(2, "0")}
            </span>
          </div>
          <p className="mt-6 text-sm font-bold tracking-[0.1em] text-accent uppercase">{stage.step}</p>
          <h3 className="mt-2 text-[1.5rem] leading-tight font-extrabold tracking-tight">{stage.title}</h3>
          <p className="mt-3 text-[1.0625rem] leading-relaxed text-muted-on-dark">{stage.body}</p>
          <dl className="mt-6 space-y-4 text-[0.975rem] leading-relaxed">
            <div>
              <dt className="font-bold text-paper">You provide</dt>
              <dd className="mt-1 text-muted-on-dark">{stage.youProvide}</dd>
            </div>
            <div>
              <dt className="font-bold text-paper">You receive</dt>
              <dd className="mt-1 text-muted-on-dark">{stage.youReceive}</dd>
            </div>
          </dl>
        </li>
      ))}
    </ol>
  );
}
