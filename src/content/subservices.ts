import type { Faq, Point, ServiceSlug } from "./types";

/** A focused offer inside a main service, with its own page at /services/<parent>/<slug>/. */
export type SubService = {
  slug: string;
  parent: ServiceSlug;
  name: string;
  /** ≤ 48 chars; the layout appends " | Growbytes". */
  metaTitle: string;
  /** 120–155 chars. */
  metaDescription: string;
  h1: string;
  intro: string;
  /** Signs the visitor needs this. */
  signs: string[];
  included: Point[];
  process: Point[];
  faqs: Faq[];
  /** Insight slugs to link to. */
  articles: string[];
};

export const subServices: SubService[] = [
  {
    slug: "shopify-migration",
    parent: "shopify-development",
    name: "Shopify Migration",
    metaTitle: "Shopify Migration Services: Move Without Loss",
    metaDescription:
      "Shopify migration services that move your products, customers, orders and content from WooCommerce, Magento or Wix, with redirects that protect your SEO.",
    h1: "Shopify migration services that protect your sales and rankings",
    intro:
      "Moving your store to Shopify should not cost you customers or search traffic. We plan the move, transfer your data, set up redirects for every old URL, and check everything before you switch over.",
    signs: [
      "Your current platform is slow, costly to maintain, or keeps breaking after updates",
      "You spend more time fixing the store than selling",
      "You worry about losing Google rankings if you move",
      "You have years of products, customers and orders you can't afford to lose",
    ],
    included: [
      { title: "Migration plan", body: "A list of everything that moves, what changes, and the launch date, agreed before any work starts." },
      { title: "Data transfer", body: "Products, variants, collections, customers, order history, blog posts and pages, moved and checked." },
      { title: "301 redirects", body: "Every old product, category and page URL mapped to its new Shopify address, so links and rankings carry over." },
      { title: "Theme and design", body: "Your new storefront set up on a Shopify theme, styled to your brand, or a custom design if you need one." },
      { title: "Apps and integrations", body: "Payments, shipping, email, reviews and accounting reconnected, with fewer apps where Shopify already covers the job." },
      { title: "Launch checks", body: "Test orders, tax and shipping rules, tracking, and a post-launch review of traffic and Search Console." },
    ],
    process: [
      { title: "Audit", body: "We review your current store, data, URLs, apps and traffic so nothing is missed." },
      { title: "Build and move", body: "We set up Shopify, transfer your data and map redirects on a private preview." },
      { title: "Test", body: "You review the preview. We place test orders and check every key page." },
      { title: "Switch over", body: "We launch at a quiet time, then watch traffic, orders and errors closely." },
    ],
    faqs: [
      { q: "Which platforms can you migrate from?", a: "Common moves include WooCommerce, Magento (Adobe Commerce), BigCommerce, Wix, Squarespace and custom-built stores. If your platform can export data, we can usually move it." },
      { q: "Will I lose my Google rankings?", a: "A migration always carries some risk, but most of it comes from missing redirects and changed content. We map every old URL to its new address and keep your key page content, which is what protects rankings." },
      { q: "Can customers keep their passwords?", a: "No platform can move passwords, because they are stored encrypted. Customer accounts move over, and customers set a new password with an account invite or on their next login." },
      { q: "Will my store be offline during the move?", a: "No. We build the new store in the background and only switch your domain when everything is tested." },
    ],
    articles: ["migrate-to-shopify-without-losing-seo", "shopify-vs-woocommerce", "shopify-store-cost"],
  },
  {
    slug: "shopify-speed-optimization",
    parent: "shopify-development",
    name: "Shopify Speed Optimization",
    metaTitle: "Shopify Speed Optimization Service",
    metaDescription:
      "Shopify speed optimization: we find what slows your store, from apps and images to theme code, fix it, and show you before-and-after Core Web Vitals.",
    h1: "Shopify speed optimization for a faster store that sells more",
    intro:
      "Slow pages lose shoppers, especially on phones. We find what is slowing your Shopify store down, fix it without breaking your design, and show you the before-and-after results.",
    signs: [
      "Your store feels slow on mobile, or PageSpeed Insights scores are low",
      "You have added many apps over time and never removed old ones",
      "Product images are large and load slowly",
      "Shopify's Web Performance report shows poor Core Web Vitals",
    ],
    included: [
      { title: "Speed audit", body: "A clear report of what slows each key page: home, collection, product and cart." },
      { title: "App clean-up", body: "We remove unused apps and the leftover code they leave in your theme, and replace heavy apps where Shopify can do the job." },
      { title: "Image fixes", body: "Images served at the right size and format, with lazy loading below the fold." },
      { title: "Theme code", body: "We reduce render-blocking scripts and styles, and tidy fonts, sliders and video on the home page." },
      { title: "Third-party scripts", body: "Tracking, chat and review widgets loaded later, so they don't delay your products." },
      { title: "Before-and-after report", body: "Core Web Vitals and page tests before and after, so you can see what changed." },
    ],
    process: [
      { title: "Measure", body: "We test your key pages on mobile and desktop and record the starting point." },
      { title: "Fix", body: "We work on a duplicate theme, so your live store is never at risk." },
      { title: "Check", body: "You review the faster version. We test checkout, apps and tracking." },
      { title: "Publish and track", body: "We publish the new theme and follow real-user data over the next weeks." },
    ],
    faqs: [
      { q: "Can you guarantee a 100 PageSpeed score?", a: "No honest developer can. Scores depend on your apps, content and Shopify's own scripts. We focus on real loading speed for shoppers and show you what improved." },
      { q: "Will you remove apps I need?", a: "Only with your agreement. We list each app, what it costs in speed, and whether Shopify or a lighter option can do the same job." },
      { q: "Do I need a new theme?", a: "Usually not. Most speed problems come from apps, images and extra scripts. If your theme is very old, we will tell you whether a newer Online Store 2.0 theme is worth it." },
      { q: "How long does it take?", a: "It depends on the number of apps and templates. We give you a timeline after the audit, before any work starts." },
    ],
    articles: ["shopify-speed-optimization", "increase-shopify-conversion-rate", "shopify-store-cost"],
  },
  {
    slug: "shopify-store-setup",
    parent: "shopify-development",
    name: "Shopify Store Setup",
    metaTitle: "Shopify Store Setup Service for New Brands",
    metaDescription:
      "Shopify store setup service: theme, products, payments, shipping, taxes and launch checks done for you, so your new store is ready to take orders.",
    h1: "Shopify store setup service, done right the first time",
    intro:
      "Starting a new store? We set up Shopify properly from day one: a clean theme in your brand, products and collections, payments, shipping, taxes and the pages customers expect, so you can focus on selling.",
    signs: [
      "You are launching a new brand and want it done properly",
      "You started setting up Shopify yourself and got stuck",
      "You are unsure about shipping rates, taxes or payment settings",
      "You want a store that looks professional, not like a template",
    ],
    included: [
      { title: "Theme setup", body: "A Shopify theme chosen for how your customers shop, styled with your logo, colors and fonts." },
      { title: "Products and collections", body: "Products, variants, images and collections added and organized so shoppers can find things fast." },
      { title: "Payments and checkout", body: "Shopify Payments, express checkout options and checkout settings configured." },
      { title: "Shipping and taxes", body: "Shipping zones, rates and tax settings set up for the regions you sell to." },
      { title: "Key pages", body: "Home, about, contact, FAQ, shipping and returns pages that answer customer questions." },
      { title: "Launch checklist", body: "Domain, email notifications, analytics, test orders and a final review before you go live." },
    ],
    process: [
      { title: "Plan", body: "We agree your products, regions, pages and launch date." },
      { title: "Build", body: "We set up the store on a password-protected preview." },
      { title: "Review", body: "You review it and we make your changes." },
      { title: "Launch", body: "We connect your domain, place test orders and open the store." },
    ],
    faqs: [
      { q: "Do I need to buy a paid theme?", a: "Not always. Shopify's free themes are well built. We recommend a paid theme only when its layouts fit your products much better." },
      { q: "Can you add my products for me?", a: "Yes. Send us a spreadsheet or your supplier's product data and images, and we add and organize them." },
      { q: "Will I be able to manage the store myself?", a: "Yes. We set it up so you can add products and run orders yourself, and we walk you through the admin at handover." },
      { q: "Which Shopify plan should I choose?", a: "Most new stores start on Basic and move up as sales grow. Our guide to Shopify store cost explains the plans and fees." },
    ],
    articles: ["shopify-store-cost", "increase-shopify-conversion-rate", "shopify-vs-woocommerce"],
  },
  {
    slug: "website-redesign",
    parent: "web-design-development",
    name: "Website Redesign",
    metaTitle: "Website Redesign Services for Small Business",
    metaDescription:
      "Website redesign services that keep what works, fix what doesn't, and protect your search rankings, with a clear plan from content and URLs to launch.",
    h1: "Website redesign services that keep your rankings and win more enquiries",
    intro:
      "A redesign should make your website clearer, faster and better at turning visitors into enquiries, without losing the search traffic you already have. We start from your goals and data, not just a new look.",
    signs: [
      "Your website looks dated next to your competitors",
      "Visitors arrive but few get in touch",
      "It is hard to update, or only one person knows how",
      "It is slow or awkward to use on a phone",
    ],
    included: [
      { title: "Review of the current site", body: "What brings traffic and enquiries today, so we keep it, and what holds the site back." },
      { title: "Structure and content plan", body: "Clear pages for each service, written for your customers, with one next step on every page." },
      { title: "New design", body: "A modern, accessible design in your brand, designed for mobile first." },
      { title: "Build", body: "A fast site you can update yourself, built on a platform that fits your team." },
      { title: "SEO protection", body: "Redirects for changed URLs, page titles and descriptions, and a check in Search Console after launch." },
      { title: "Launch and handover", body: "Testing on real devices, analytics set up, and a walkthrough so your team can manage the site." },
    ],
    process: [
      { title: "Discover", body: "We look at your goals, analytics, rankings and competitors." },
      { title: "Plan and design", body: "Page structure, content and design, agreed with you step by step." },
      { title: "Build and test", body: "We build on a private preview and test speed, forms and devices." },
      { title: "Launch", body: "We launch with redirects in place and monitor traffic afterwards." },
    ],
    faqs: [
      { q: "Will a redesign hurt my Google rankings?", a: "It can if URLs and content change without a plan. We map old URLs to new ones and keep the content that ranks, which is the main protection." },
      { q: "Can you reuse my existing content?", a: "Yes. We keep what works, and rewrite or restructure pages that are unclear or too thin." },
      { q: "Do I have to change platforms?", a: "No. We can redesign on your current platform, or recommend a move only when it saves you time or money." },
      { q: "What do I need to prepare?", a: "Our guide on what to prepare before a redesign lists the goals, access and content to gather first." },
    ],
    articles: ["prepare-before-redesigning-your-business-website", "small-business-website-cost", "how-to-write-a-project-brief-for-an-agency"],
  },
  {
    slug: "website-maintenance",
    parent: "web-design-development",
    name: "Website Maintenance",
    metaTitle: "Website Maintenance Services and Support",
    metaDescription:
      "Website maintenance services: updates, backups, security checks, speed monitoring and small content changes, so your site stays fast, safe and current.",
    h1: "Website maintenance services that keep your site fast, safe and up to date",
    intro:
      "Your website needs regular care to stay secure and working. We handle updates, backups, security checks and small changes each month, so problems are caught early and your team can focus on the business.",
    signs: [
      "Plugins, themes or the platform have not been updated in months",
      "You don't know if you have a recent backup",
      "Small text or image changes take weeks to happen",
      "The site has been slow, broken or hacked before",
    ],
    included: [
      { title: "Updates", body: "Platform, theme and plugin updates tested and applied safely." },
      { title: "Backups", body: "Regular backups stored off-site, with a tested way to restore them." },
      { title: "Security checks", body: "Monitoring for malware, failed logins and weak settings, with fixes when something is found." },
      { title: "Uptime and speed", body: "Alerts if the site goes down, and regular speed checks on key pages." },
      { title: "Small changes", body: "Text, image and page updates handled for you each month." },
      { title: "Monthly summary", body: "A short note on what was done and anything that needs your attention." },
    ],
    process: [
      { title: "Health check", body: "We review your site, hosting, backups and access first." },
      { title: "Fix the basics", body: "We bring updates, backups and security up to date." },
      { title: "Monthly care", body: "Ongoing updates, checks and the changes you request." },
      { title: "Report", body: "A monthly summary so you always know the state of your site." },
    ],
    faqs: [
      { q: "Which platforms do you maintain?", a: "WordPress, Shopify, Webflow and custom-built sites. Shopify needs less technical upkeep, so the focus there is apps, content and speed." },
      { q: "What if my site gets hacked?", a: "We restore a clean backup, close the gap that let the attacker in, and harden the site to reduce the chance of it happening again." },
      { q: "Is there a contract?", a: "Maintenance runs month to month. We agree the scope and the number of change requests up front." },
      { q: "What does maintenance cost?", a: "It depends on the platform, the size of the site and how many changes you need each month. We give you a clear monthly price after the health check." },
    ],
    articles: ["website-maintenance-cost", "small-business-website-cost", "prepare-before-redesigning-your-business-website"],
  },
  {
    slug: "local-seo",
    parent: "seo",
    name: "Local SEO",
    metaTitle: "Local SEO Services for Small Businesses",
    metaDescription:
      "Local SEO services that help nearby customers find you: Google Business Profile, local pages, reviews, citations and maps rankings, with clear monthly reports.",
    h1: "Local SEO services that put your business in front of nearby customers",
    intro:
      "When people search for a service near them, Google shows a map and a few local businesses first. Local SEO helps you appear there, with a strong Google Business Profile, clear location pages and consistent details across the web.",
    signs: [
      "Competitors show up in the Google map results and you don't",
      "Your Google Business Profile is incomplete or rarely updated",
      "Your name, address or phone number differs across websites",
      "You serve several towns or cities but have one generic page",
    ],
    included: [
      { title: "Google Business Profile", body: "Categories, services, photos, hours and posts set up and kept current." },
      { title: "Location and service-area pages", body: "Helpful pages for the areas you serve, written for customers, not stuffed with keywords." },
      { title: "Citations", body: "Your business name, address and phone kept consistent across the main directories." },
      { title: "Reviews", body: "A simple process to ask happy customers for reviews, and guidance on replying to them." },
      { title: "Technical basics", body: "Local business schema, fast mobile pages and correct contact details on your site." },
      { title: "Monthly report", body: "Map rankings, profile views, calls and website visits from local search." },
    ],
    process: [
      { title: "Audit", body: "We check your profile, citations, reviews, website and local competitors." },
      { title: "Fix the foundations", body: "Profile, details and key pages corrected first." },
      { title: "Grow", body: "Location pages, reviews and regular profile updates." },
      { title: "Report", body: "Monthly results and the next priorities." },
    ],
    faqs: [
      { q: "How long does local SEO take?", a: "Profile and citation fixes can help within weeks. Stronger map rankings usually build over a few months, depending on competition in your area." },
      { q: "Do I need a physical address?", a: "Not always. Service-area businesses that visit customers can hide their address and list the areas they serve instead." },
      { q: "Can you guarantee the top spot on Google Maps?", a: "No one can guarantee rankings. Google decides based on relevance, distance and prominence. We improve the parts you can control and report honestly on results." },
      { q: "Do you buy reviews?", a: "Never. Fake or paid reviews break Google's rules and can get a profile suspended. We help you ask real customers." },
    ],
    articles: ["seo-or-paid-ads-where-to-start", "small-business-website-cost"],
  },
];

export function getSubService(parent: string, slug: string) {
  return subServices.find((s) => s.parent === parent && s.slug === slug);
}

export function subServicesFor(parent: string) {
  return subServices.filter((s) => s.parent === parent);
}
