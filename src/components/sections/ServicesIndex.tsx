import Link from "next/link";
import { GbIcon } from "@/components/icons/GbIcon";
import { serviceGroups, services } from "@/content/services";
import { ArrowIcon, cn } from "@/components/ui/primitives";
import { GroupIllustration } from "@/components/visuals/SectionIllustrations";

/**
 * Editorial index of all services, grouped. Each group pairs a heading and one
 * explanatory illustration with full-width service rows (icon, name, one line).
 * The middle group sits on a dark panel so the list alternates light, dark, light.
 * Everything is visible without hover.
 */
export function ServicesIndex({
  headingLevel = "h3",
}: {
  headingLevel?: "h2" | "h3";
}) {
  const GroupH = headingLevel;
  const ItemH = headingLevel === "h2" ? "h3" : "h4";
  return (
    <div className="border-t-2 border-ink">
      {serviceGroups.map((group, gi) => {
        const dark = gi === 1;
        return (
          <div
            key={group.id}
            className={cn(
              "svc-group grid gap-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16",
              dark
                ? "on-dark my-8 -mx-[calc(var(--spacing-gutter)/2)] rounded-xl bg-ink px-4 py-9 text-paper sm:mx-0 sm:px-10 sm:py-10 lg:my-10 lg:px-14 lg:py-14"
                : "border-b border-line py-10 lg:py-14",
              // The panel already separates the groups; avoid a double rule above it.
              gi === 0 && "border-b-0",
              // The last group needs no closing rule; the section edge ends it.
              gi === serviceGroups.length - 1 && "border-b-0",
            )}
          >
            <div>
              <p
                className={cn(
                  "text-sm font-extrabold",
                  dark ? "text-accent" : "text-accent-strong",
                )}
              >
                {String(gi + 1).padStart(2, "0")}
              </p>
              <GroupH className="mt-1 text-[1.75rem] leading-tight font-extrabold tracking-tight lg:text-[2.125rem]">
                {group.label}
              </GroupH>
              <p
                className={cn(
                  "mt-2 max-w-sm text-[1.0625rem]",
                  dark ? "text-muted-on-dark" : "text-muted",
                )}
              >
                {group.description}
              </p>
              <GroupIllustration
                group={group.id}
                className="mt-7 max-w-[30rem]"
              />
            </div>
            <div className="self-start">
              <ul
                className={cn(
                  "divide-y [&>li:first-child>a]:pt-0",
                  dark ? "divide-white/15" : "divide-line",
                )}
              >
                {services
                  .filter((s) => s.group === group.id)
                  .map((s) => (
                    <li key={s.slug}>
                      <Link
                        href={`/services/${s.slug}/`}
                        data-svc={s.slug}
                        className="group grid grid-cols-[2rem_1fr_auto] items-start gap-x-3.5 py-4 sm:grid-cols-[2.5rem_1fr_auto] sm:gap-x-5 lg:py-5"
                      >
                        <GbIcon
                          name={s.slug}
                          className={cn(
                            "mt-0.5 size-8 sm:size-9",
                            dark ? "text-paper" : "text-ink",
                          )}
                        />
                        <div>
                          <ItemH
                            className={cn(
                              "text-[1.25rem] leading-snug font-bold tracking-tight transition-colors sm:text-[1.375rem]",
                              dark
                                ? "group-hover:text-accent"
                                : "group-hover:text-accent-strong",
                            )}
                          >
                            {s.name}
                          </ItemH>
                          <p
                            className={cn(
                              "mt-1 max-w-xl text-[1rem] leading-relaxed",
                              dark ? "text-muted-on-dark" : "text-muted",
                            )}
                          >
                            {s.summary}
                          </p>
                        </div>
                        <span
                          className={cn(
                            "mt-0.5 grid size-10 place-items-center rounded-full border transition-colors group-hover:border-accent group-hover:bg-accent sm:mt-1 sm:size-11",
                            dark
                              ? "border-white/30 text-paper group-hover:text-ink"
                              : "border-ink/20",
                          )}
                        >
                          <ArrowIcon />
                          <span className="sr-only">View {s.name}</span>
                        </span>
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        );
      })}
    </div>
  );
}
