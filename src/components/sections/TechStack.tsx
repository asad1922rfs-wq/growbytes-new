import * as si from "simple-icons";
import { Container } from "@/components/ui/primitives";
import type { ServiceSlug } from "@/content/types";

type Icon = { title: string; hex: string; path: string };

// simple-icons export names (without the "si" prefix) for each service's usual stack
const stacks: Record<ServiceSlug, string[]> = {
  "web-design-development": ["Figma", "Nextdotjs", "React", "Typescript", "Tailwindcss", "Wordpress", "Webflow", "Sanity", "Contentful", "Nodedotjs", "Vercel", "Netlify", "Cloudflare", "Lighthouse", "Googlesearchconsole"],
  "shopify-development": ["Shopify", "React", "Nextdotjs", "Typescript", "Tailwindcss", "Graphql", "Stripe", "Paypal", "Figma", "Googleanalytics", "Googletagmanager", "Meta", "Mailchimp", "Vercel", "Lighthouse"],
  "custom-software-development": ["Typescript", "Nodedotjs", "React", "Nextdotjs", "Python", "Laravel", "Php", "Postgresql", "Mongodb", "Redis", "Prisma", "Supabase", "Docker", "Kubernetes", "Googlecloud", "Github", "Sentry", "Jest", "Cypress", "Vercel"],
  seo: ["Googlesearchconsole", "Googleanalytics", "Googletagmanager", "Semrush", "Lighthouse", "Googlechrome", "Cloudflare", "Wordpress", "Yoast", "Shopify", "Googlemaps", "Googlebigquery"],
  "paid-advertising": ["Googleads", "Meta", "Tiktok", "Linkedin", "Googleanalytics", "Googletagmanager", "Hotjar", "Googlesheets", "Googlebigquery", "Shopify", "Hubspot", "Zapier"],
  branding: ["Figma", "Adobeillustrator", "Adobephotoshop", "Canva", "Framer", "Miro", "Notion", "Pinterest", "Webflow", "Googlechrome"],
  "ai-automation": ["Openai", "Claude", "Anthropic", "Googlegemini", "Langchain", "Huggingface", "Python", "Zapier", "Make", "N8n", "Slack", "Gmail", "Hubspot", "Airtable", "Supabase"],
  "crm-integrations": ["Hubspot", "Salesforce", "Zoho", "Zapier", "Make", "N8n", "Slack", "Gmail", "Googlesheets", "Airtable", "Stripe", "Calendly", "Typeform", "Intercom", "Whatsapp"],
  "conversion-optimization": ["Googleanalytics", "Hotjar", "Googletagmanager", "Mixpanel", "Figma", "Webflow", "Shopify", "Wordpress", "Lighthouse", "Googlesheets"],
  "ui-ux-design": ["Figma", "Framer", "Miro", "Notion", "Storybook", "Hotjar", "Googleanalytics", "Loom", "Webflow", "Tailwindcss"],
  "mobile-app-development": ["Swift", "Kotlin", "Flutter", "Dart", "React", "Expo", "Android", "Ios", "Firebase", "Sqlite", "Realm", "Supabase", "Fastlane", "Github", "Sentry"],
  "email-marketing": ["Mailchimp", "Hubspot", "Brevo", "Shopify", "Zapier", "Make", "Gmail", "Googleanalytics", "Googlesheets", "Canva", "Figma"],
};

const lookup = si as unknown as Record<string, Icon | undefined>;

// Brand colours that are too light on white get drawn in ink instead
const tooLight = (hex: string) => {
  const n = parseInt(hex, 16);
  const [r, g, b] = [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  return 0.2126 * r + 0.7152 * g + 0.0722 * b > 210;
};

/** "Our ___ tech stack": heading beside an intro, then a grid of brand marks with names. */
export function TechStack({ slug, name }: { slug: ServiceSlug; name: string }) {
  const icons = stacks[slug].map((k) => lookup[`si${k}`]).filter((i): i is Icon => Boolean(i));
  return (
    <section aria-labelledby="stack-heading" className="border-t border-line bg-paper">
      <Container className="py-20 lg:py-28">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-16">
          <h2 id="stack-heading" className="text-h2 font-extrabold">
            Our tech stack for <span className="text-accent">{name.toLowerCase()}</span>
          </h2>
          <p className="text-[1.1875rem] leading-relaxed text-ink/80 lg:pt-2">
            We use proven <strong className="font-bold text-ink">platforms, frameworks, and tools</strong>, picked around your goals,
            your team, and your budget rather than what&rsquo;s trendy.
          </p>
        </div>
        <ul className="mt-14 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3 lg:grid-cols-5">
          {icons.map((t) => (
            <li key={t.title} className="group flex items-center gap-3.5">
              <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-white ring-1 ring-line transition-transform duration-300 group-hover:-translate-y-0.5">
                <svg aria-hidden="true" viewBox="0 0 24 24" className="size-6" style={{ fill: tooLight(t.hex) ? "#171918" : `#${t.hex}` }}>
                  <path d={t.path} />
                </svg>
              </span>
              <span className="text-[1rem] font-semibold">{t.title}</span>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
