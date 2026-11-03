import Link from "next/link";
import { siBehance, siDribbble, siFacebook, siInstagram, siLinkedin, siX, siYoutube } from "simple-icons";
import { siteConfig } from "@/config/site";
import { ArticleIllustration } from "@/components/visuals/ArticleIllustration";
import { CookieSettingsLink } from "@/components/layout/CookieConsent";
import { SubscribeForm } from "@/components/forms/SubscribeForm";
import { companyLinks } from "@/content/navigation";
import { industries } from "@/content/industries";
import { articles } from "@/content/insights";
import { serviceGroups, services } from "@/content/services";
import { Logo } from "@/components/ui/Logo";

export function Footer() {
  const latestArticles = [...articles].sort((x, y) => y.published.localeCompare(x.published)).slice(0, 5);
  const { email, phone } = siteConfig.contact;
  return (
    <footer className="on-dark border-t border-white/10 bg-ink text-paper">
      <div className="mx-auto max-w-site px-[var(--spacing-gutter)]">
        <div className="grid gap-10 border-b border-white/10 py-16 md:grid-cols-[1.3fr_1fr] md:items-end">
          <div>
            <Logo dark />
            <p className="mt-6 max-w-md text-lead text-muted-on-dark">{siteConfig.statement}</p>
            {siteConfig.social.length > 0 && (
              <div className="mt-6">
                <ul className="flex gap-2.5">
                  {siteConfig.social.map((s) => {
                    const icon = (
                      <svg aria-hidden="true" viewBox="0 0 24 24" className="size-[18px] fill-current">
                        <path d={socialIcons[s.platform]} />
                      </svg>
                    );
                    const base = "grid size-10 place-items-center rounded-full border border-white/15 text-white/75";
                    return (
                      <li key={s.platform}>
                        {s.href ? (
                          <a
                            href={s.href}
                            rel="me noopener"
                            target="_blank"
                            aria-label={`${s.label} (opens in a new tab)`}
                            className={`${base} transition-colors hover:border-accent hover:bg-accent hover:text-white`}
                          >
                            {icon}
                          </a>
                        ) : (
                          // Placeholder until the profile URL is added in siteConfig.social.
                          <span role="img" aria-label={`${s.label} (coming soon)`} className={base}>
                            {icon}
                          </span>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </div>
          <div className="md:justify-self-end">
            <p className="text-[1.375rem] font-extrabold tracking-tight">
              Stay in the loop<span className="text-accent">.</span>
            </p>
            <SubscribeForm />
            {(email || phone) && (
              <ul className="mt-5 space-y-1 text-sm text-muted-on-dark">
                {email && (
                  <li>
                    <a href={`mailto:${email}`} className="hover:text-white">
                      {email}
                    </a>
                  </li>
                )}
                {phone && (
                  <li>
                    <a href={`tel:${phone.replace(/\s/g, "")}`} className="hover:text-white">
                      {phone}
                    </a>
                  </li>
                )}
              </ul>
            )}
          </div>
        </div>

        <div className="grid gap-x-8 gap-y-10 py-14 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-[1fr_1fr_1fr_1.15fr_0.8fr_1.5fr]">
          {serviceGroups.map((g) => (
            <FooterColumn
              key={g.id}
              title={g.label}
              links={services.filter((s) => s.group === g.id).map((s) => ({ label: s.shortName, href: `/services/${s.slug}/` }))}
            />
          ))}
          <FooterColumn
            title="Industries"
            links={[
              ...industries.slice(0, 6).map((i) => ({ label: i.name, href: `/industries/${i.slug}/` })),
              { label: "All industries →", href: "/industries/" },
            ]}
          />
          <FooterColumn title="Company" links={[...companyLinks]} />
          {/* Resources: the five newest articles, each with its thumbnail */}
          <div>
            <h2 className="text-[0.8125rem] font-bold uppercase tracking-[0.12em] text-muted-on-dark">Resources</h2>
            <ul className="mt-4 space-y-4">
              {latestArticles.map((a) => (
                <li key={a.slug}>
                  <Link href={`/insights/${a.slug}/`} className="group grid grid-cols-[5rem_1fr] items-center gap-3.5">
                    <span aria-hidden="true" className="overflow-hidden rounded-md ring-1 ring-white/10">
                      <ArticleIllustration kind={a.illustration} className="rounded-none transition-transform duration-300 group-hover:scale-105" />
                    </span>
                    <span className="text-[0.9375rem] leading-snug text-paper group-hover:text-accent">{a.title}</span>
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/insights/" className="text-base text-paper hover:text-accent hover:underline">
                  All insights →
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-white/10 py-8 text-[0.9375rem] text-muted-on-dark sm:flex-row sm:items-center sm:justify-between">
          <p>© {siteConfig.legal.entityName ?? siteConfig.name}. All rights reserved.</p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {policyLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-white hover:underline">
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <CookieSettingsLink className="cursor-pointer hover:text-white hover:underline" />
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <h2 className="text-[0.8125rem] font-bold uppercase tracking-[0.12em] text-muted-on-dark">{title}</h2>
      <ul className="mt-4 space-y-3">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="text-base leading-snug text-paper hover:text-accent hover:underline">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Brand marks from simple-icons, keyed by the platform names allowed in siteConfig.social. */
const socialIcons: Record<(typeof siteConfig.social)[number]["platform"], string> = {
  linkedin: siLinkedin.path,
  instagram: siInstagram.path,
  facebook: siFacebook.path,
  x: siX.path,
  youtube: siYoutube.path,
  behance: siBehance.path,
  dribbble: siDribbble.path,
};

const policyLinks = [
  { label: "Privacy policy", href: "/privacy/" },
  { label: "Terms of use", href: "/terms/" },
  { label: "Cookie policy", href: "/cookies/" },
  { label: "Accessibility", href: "/accessibility/" },
];
