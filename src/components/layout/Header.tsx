import Link from "next/link";
import { primaryNav, projectCta } from "@/content/navigation";
import { Logo } from "@/components/ui/Logo";
import { buttonStyles } from "@/components/ui/primitives";
import { MobileNav } from "./MobileNav";
import { ServicesMenu } from "./ServicesMenu";
import { IndustriesMenu } from "./IndustriesMenu";
import { NavLink } from "./NavLink";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-line/80 bg-paper [--header-h:4.5rem] lg:[--header-h:5rem]">
      <a
        href="#main"
        className="absolute top-2 left-2 z-[60] -translate-y-24 rounded-md bg-ink px-4 py-3 font-bold text-white focus:translate-y-0"
      >
        Skip to main content
      </a>
      <div className="relative">
        <div className="mx-auto flex h-[var(--header-h)] max-w-site items-center justify-between gap-6 px-[var(--spacing-gutter)]">
          <Logo />
          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              <li>
                <ServicesMenu />
              </li>
              <li>
                <IndustriesMenu />
              </li>
              {primaryNav.map((item) => (
                <li key={item.href}>
                  <NavLink href={item.href}>{item.label}</NavLink>
                </li>
              ))}
            </ul>
          </nav>
          <div className="flex items-center gap-3">
            {/* Visibility lives on the wrapper: buttonStyles sets display itself. */}
            <span className="hidden sm:block">
              <Link href={projectCta.href} className={buttonStyles("brand", "min-h-12 px-6")}>
                {projectCta.label}
              </Link>
            </span>
            <MobileNav />
          </div>
        </div>
      </div>
    </header>
  );
}
