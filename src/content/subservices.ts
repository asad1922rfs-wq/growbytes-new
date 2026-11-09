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
      "Local SEO services that help nearby customers find you: Google Business Profile, local pages, reviews, citations and map visibility, with monthly reports.",
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
  {
    slug: "landing-page-design",
    parent: "web-design-development",
    name: "Landing Page Design",
    metaTitle: "Landing Page Design Services That Convert",
    metaDescription:
      "Landing page design services for ads, launches and offers: one clear message, fast loading, strong proof and one next step, built and tested for mobile.",
    h1: "Landing page design services that turn clicks into enquiries",
    intro:
      "When you pay for clicks, the page they land on decides whether you get a lead. We design focused landing pages with one message, one offer and one next step, so visitors know what to do.",
    signs: [
      "Your ads send people to your home page",
      "You get clicks but very few form fills or calls",
      "Launching a new offer page takes weeks",
      "Your landing pages load slowly or look poor on phones",
    ],
    included: [
      { title: "Message and offer", body: "A clear headline and offer that match the ad or email that brought the visitor." },
      { title: "Page copy", body: "Short, plain copy that answers the main questions and objections in order." },
      { title: "Design", body: "A clean, mobile-first layout in your brand, with the call to action always easy to find." },
      { title: "Forms and tracking", body: "Short forms, thank-you pages and conversion tracking set up for your ad platforms." },
      { title: "Speed", body: "Light pages that load fast, so you don't pay for clicks that leave before the page appears." },
      { title: "Test variants", body: "A second version of key sections ready for A/B testing when traffic allows." },
    ],
    process: [
      { title: "Brief", body: "We agree the audience, offer, traffic source and goal." },
      { title: "Write and design", body: "Copy and design together, shared for your review." },
      { title: "Build and track", body: "We build the page and test forms and tracking." },
      { title: "Launch and improve", body: "We watch the results and suggest changes based on real data." },
    ],
    faqs: [
      { q: "How is a landing page different from my home page?", a: "A home page serves many visitors with many goals. A landing page serves one audience with one offer and one action, which usually makes it easier to convert." },
      { q: "Which platform do you build on?", a: "Your existing website platform where possible, such as WordPress, Webflow or Shopify, so you can edit pages yourself. We can also build on a landing page tool if you already use one." },
      { q: "Do you write the copy?", a: "Yes. Copy and design are planned together. You give us the facts about your offer and we turn them into a clear page." },
      { q: "Can you set up A/B tests?", a: "Yes, when the page gets enough traffic for a fair result. With low traffic, we suggest bigger changes and compare periods instead." },
    ],
    articles: ["seo-or-paid-ads-where-to-start", "how-to-write-a-project-brief-for-an-agency"],
  },
  {
    slug: "technical-seo-audit",
    parent: "seo",
    name: "Technical SEO Audit",
    metaTitle: "Technical SEO Audit Services",
    metaDescription:
      "Technical SEO audit services: crawling, indexing, site speed, structured data and site structure checked, with a clear list of fixes ranked by impact.",
    h1: "Technical SEO audit services with fixes you can act on",
    intro:
      "If Google can't crawl or understand your site, good content won't rank. Our technical SEO audit finds the problems that hold your pages back and gives you a clear, ranked list of fixes.",
    signs: [
      "Pages you care about are missing from Google",
      "Search Console shows many errors or excluded pages",
      "Traffic dropped after a redesign, migration or update",
      "Your site is slow or has many duplicate pages",
    ],
    included: [
      { title: "Crawl review", body: "A full crawl of your site to find broken links, redirect chains, orphan pages and duplicates." },
      { title: "Indexing check", body: "Search Console coverage, sitemaps, robots.txt, canonicals and noindex tags reviewed." },
      { title: "Speed and Core Web Vitals", body: "Field and lab data for key templates, with the main causes of slow pages." },
      { title: "Structured data", body: "Schema checked for errors and gaps, such as organization, product, article and FAQ." },
      { title: "Site structure", body: "Internal linking, URL structure and navigation reviewed so important pages get found." },
      { title: "Prioritized fix list", body: "Every issue ranked by impact and effort, with clear notes for your developer or for us." },
    ],
    process: [
      { title: "Access", body: "We connect to Search Console, analytics and your site." },
      { title: "Crawl and review", body: "We crawl the site and check each technical area." },
      { title: "Report", body: "A plain-English report with a ranked fix list." },
      { title: "Fix", body: "We fix the issues for you, or support your team while they do." },
    ],
    faqs: [
      { q: "What is the difference between a technical audit and a full SEO audit?", a: "A technical audit focuses on how Google crawls, indexes and loads your site. A full audit also covers content, keywords and links. Technical issues are often the first thing to fix." },
      { q: "Will you fix the issues or just report them?", a: "Either. Many clients ask us to fix them after the audit, but the report is written so any capable developer can act on it." },
      { q: "Do you need access to my website?", a: "Read access to Search Console and analytics is enough for the audit. We only need site access if we are also making the fixes." },
      { q: "Will an audit improve my rankings?", a: "An audit alone changes nothing. Fixing the issues it finds removes barriers to ranking, but no one can promise a set position on Google." },
    ],
    articles: ["migrate-to-shopify-without-losing-seo", "seo-or-paid-ads-where-to-start"],
  },
  {
    slug: "ecommerce-seo",
    parent: "seo",
    name: "Ecommerce SEO",
    metaTitle: "Ecommerce SEO Services for Online Stores",
    metaDescription:
      "Ecommerce SEO services for online stores: category and product pages, site structure, product schema and content that help shoppers find you on Google.",
    h1: "Ecommerce SEO services that bring shoppers to your products",
    intro:
      "Online stores have their own SEO problems: thin product pages, duplicate variants, filters that create endless URLs. We fix the structure, improve category and product pages, and help Google show your products to shoppers.",
    signs: [
      "Most of your sales come from paid ads, not search",
      "Product pages use the maker's description word for word",
      "Collection or category pages have no helpful text",
      "Filters and variants create many duplicate URLs",
    ],
    included: [
      { title: "Keyword research", body: "The words shoppers use for your products and categories, mapped to the right pages." },
      { title: "Category pages", body: "Clear titles, helpful text and internal links on the pages that matter most." },
      { title: "Product pages", body: "Unique descriptions, useful details and image alt text for your key products." },
      { title: "Technical fixes", body: "Canonicals, filters, pagination and out-of-stock pages handled so Google indexes the right URLs." },
      { title: "Product schema", body: "Structured data for price, availability and reviews, so your products can show rich results." },
      { title: "Monthly report", body: "Organic traffic, revenue from search and the next priorities, in plain English." },
    ],
    process: [
      { title: "Audit", body: "We review your store structure, pages, data and competitors." },
      { title: "Fix the base", body: "Technical issues and key category pages first." },
      { title: "Grow", body: "Product pages, new categories and helpful content." },
      { title: "Report", body: "Monthly results tied to search revenue, not just rankings." },
    ],
    faqs: [
      { q: "Which ecommerce platforms do you work with?", a: "Shopify, WooCommerce, BigCommerce and custom stores. Each has its own quirks, such as Shopify's collection URLs, and we handle them." },
      { q: "Do I need a blog for ecommerce SEO?", a: "Not always. Strong category and product pages come first. Helpful guides help when shoppers research before they buy." },
      { q: "Should I write unique descriptions for every product?", a: "Start with your best sellers and most searched products. Rewriting thousands at once is rarely the best use of time." },
      { q: "How long before I see results?", a: "Technical fixes can help within weeks. Gains from content usually build over several months, depending on your competition." },
    ],
    articles: ["shopify-speed-optimization", "increase-shopify-conversion-rate", "migrate-to-shopify-without-losing-seo"],
  },
  {
    slug: "saas-development",
    parent: "custom-software-development",
    name: "SaaS Development",
    metaTitle: "SaaS Development Services for Startups",
    metaDescription:
      "SaaS development services: we plan, design and build your product with user accounts, subscriptions, admin tools and secure cloud hosting, step by step.",
    h1: "SaaS development services from first version to growing product",
    intro:
      "Building a SaaS product means more than features. You need accounts, billing, security and a setup that can grow. We help you build a focused first version, launch it, and keep improving it with real user feedback.",
    signs: [
      "You have a product idea and need a team to build it",
      "Your first version was built fast and is now hard to change",
      "You need subscriptions, user roles or team accounts",
      "You want to launch sooner with a smaller, focused first release",
    ],
    included: [
      { title: "Product scope", body: "The smallest version that solves the main problem, agreed before building starts." },
      { title: "Design", body: "User flows and screens tested with you before development." },
      { title: "Accounts and billing", body: "Sign-up, login, user roles, teams and subscription billing with a provider such as Stripe." },
      { title: "Admin tools", body: "A simple admin area to manage users, plans and support tasks." },
      { title: "Cloud setup", body: "Secure hosting, backups, monitoring and automatic deployments." },
      { title: "Ongoing development", body: "Regular releases after launch, based on what users actually do." },
    ],
    process: [
      { title: "Discover", body: "We map users, problems and the core features." },
      { title: "Design", body: "Clickable screens you can test with real users." },
      { title: "Build", body: "Short cycles with a working version to review each time." },
      { title: "Launch and grow", body: "Release, measure and improve." },
    ],
    faqs: [
      { q: "What tech stack do you use?", a: "Usually TypeScript with React or Next.js, Node.js and PostgreSQL, hosted on a major cloud. We pick proven tools your future team can easily work with." },
      { q: "Who owns the code?", a: "You do. The code lives in your own repository and accounts from day one." },
      { q: "How much does a SaaS product cost to build?", a: "It depends on the features and integrations. Our guide to custom software development cost explains the main cost drivers." },
      { q: "Can you take over an existing SaaS codebase?", a: "Yes. We start with a code review, then fix the riskiest issues before adding new features." },
    ],
    articles: ["custom-software-development-cost", "custom-software-vs-off-the-shelf", "how-to-write-a-project-brief-for-an-agency"],
  },
  {
    slug: "web-application-development",
    parent: "custom-software-development",
    name: "Web Application Development",
    metaTitle: "Web Application Development Services",
    metaDescription:
      "Web application development services: portals, dashboards and internal tools built around how your team works, secure, fast and easy to use daily.",
    h1: "Web application development built around how your business works",
    intro:
      "When spreadsheets and off-the-shelf tools no longer fit, a custom web application can. We build portals, dashboards and internal tools that match your process, so your team spends less time on manual work.",
    signs: [
      "Your team runs key work in shared spreadsheets",
      "Staff copy the same data between several tools",
      "Customers ask for a portal to see orders, files or status",
      "Off-the-shelf software forces you to change how you work",
    ],
    included: [
      { title: "Process mapping", body: "How work flows today, where time is lost, and what the app needs to do." },
      { title: "User experience", body: "Simple screens designed for the people who use them every day." },
      { title: "Development", body: "A secure, fast web app that works in any modern browser." },
      { title: "Integrations", body: "Connections to the tools you already use, such as your CRM, accounting or email." },
      { title: "Roles and security", body: "User roles, permissions, audit logs and secure login." },
      { title: "Support", body: "Hosting, monitoring, fixes and new features after launch." },
    ],
    process: [
      { title: "Discover", body: "We talk to the people who will use the app." },
      { title: "Design", body: "Screens and flows agreed before any code." },
      { title: "Build", body: "Working releases every few weeks for you to review." },
      { title: "Launch and support", body: "Roll-out, training and ongoing care." },
    ],
    faqs: [
      { q: "Should I build custom or buy software?", a: "Buy when a tool fits most of your needs. Build when your process is a real advantage or no tool fits. Our guide on custom versus off-the-shelf software helps you decide." },
      { q: "Can it work on phones?", a: "Yes. We design web apps to work well on phones and tablets as well as desktops." },
      { q: "Can you connect it to our existing systems?", a: "Usually, yes. If a system has an API or can export data, we can connect it." },
      { q: "How long does it take?", a: "A focused first version often takes a few months. We give you a timeline after the discovery stage." },
    ],
    articles: ["custom-software-vs-off-the-shelf", "custom-software-development-cost", "how-to-identify-a-business-workflow-worth-automating"],
  },
  {
    slug: "api-integration",
    parent: "custom-software-development",
    name: "API Integration",
    metaTitle: "API Integration Services for Business Systems",
    metaDescription:
      "API integration services that connect your website, CRM, store, payments and accounting tools, so data moves on its own and your team stops copying it.",
    h1: "API integration services that connect your business tools",
    intro:
      "Most businesses use many tools that don't talk to each other. We connect them through their APIs, so orders, leads, customers and invoices move between systems on their own, with clear error alerts.",
    signs: [
      "Staff copy data from one system into another by hand",
      "Numbers in different tools don't match",
      "A no-code connector has become slow, costly or unreliable",
      "You need a system connected that has no ready-made integration",
    ],
    included: [
      { title: "Integration plan", body: "Which data moves where, how often, and what happens when something fails." },
      { title: "Custom connectors", body: "Code that connects your systems through their official APIs." },
      { title: "Data mapping", body: "Fields matched between systems, with clean-up of duplicates and format differences." },
      { title: "Webhooks and sync", body: "Real-time updates where possible, scheduled syncs where not." },
      { title: "Error handling", body: "Retries, logs and alerts so failed syncs are caught and fixed." },
      { title: "Documentation", body: "Clear notes on how the integration works, for your team or future developers." },
    ],
    process: [
      { title: "Map", body: "We list your systems, data and the gaps between them." },
      { title: "Build", body: "We build and test the connection in a safe test setup." },
      { title: "Go live", body: "We switch it on and watch the first syncs closely." },
      { title: "Monitor", body: "Ongoing checks and updates when an API changes." },
    ],
    faqs: [
      { q: "Can't I just use Zapier or Make?", a: "For simple, low-volume tasks, often yes. Custom integrations make sense when volumes are high, logic is complex, or a tool has no ready connector." },
      { q: "Which systems can you connect?", a: "Any system with a documented API, such as Shopify, HubSpot, Salesforce, Stripe, Xero, QuickBooks and many more." },
      { q: "What happens when an API changes?", a: "Providers usually announce changes in advance. With ongoing support, we update the integration before the old version stops working." },
      { q: "Is our data safe?", a: "We use secure authentication, store keys safely, and only request the access the integration needs." },
    ],
    articles: ["how-to-identify-a-business-workflow-worth-automating", "custom-software-vs-off-the-shelf"],
  },
  {
    slug: "google-ads-management",
    parent: "paid-advertising",
    name: "Google Ads Management",
    metaTitle: "Google Ads Management Services",
    metaDescription:
      "Google Ads management services: search, Performance Max and shopping campaigns set up, tracked and improved weekly, with clear reports on cost and leads.",
    h1: "Google Ads management services focused on leads and sales, not clicks",
    intro:
      "Google Ads can bring ready-to-buy customers, or quietly waste your budget. We build campaigns around the searches that matter, track real leads and sales, and keep improving them every week.",
    signs: [
      "You spend on Google Ads but can't tell which leads it brings",
      "Your ads show for searches that have nothing to do with you",
      "Costs keep rising while results stay flat",
      "No one has checked the account properly in months",
    ],
    included: [
      { title: "Account setup or rebuild", body: "Campaigns, ad groups and keywords organized around your services and products." },
      { title: "Conversion tracking", body: "Forms, calls and purchases tracked correctly, so bidding optimizes for real results." },
      { title: "Ad copy and extensions", body: "Clear ads with sitelinks, callouts and other assets that match each search." },
      { title: "Negative keywords", body: "Regular search term reviews to block wasted spend." },
      { title: "Shopping and Performance Max", body: "Product feeds and campaign setup for online stores." },
      { title: "Weekly optimization and reports", body: "Bids, budgets and ads adjusted weekly, with a plain monthly report." },
    ],
    process: [
      { title: "Audit", body: "We review your account, tracking and landing pages." },
      { title: "Set up", body: "Tracking fixed and campaigns built or rebuilt." },
      { title: "Launch", body: "Campaigns go live with close daily checks at first." },
      { title: "Improve", body: "Weekly changes based on cost per lead or sale." },
    ],
    faqs: [
      { q: "How much should I spend on Google Ads?", a: "It depends on your market and what a click costs in it. We look at keyword costs and your goals, then suggest a test budget before scaling up." },
      { q: "Who owns the ad account?", a: "You do. We work inside your own Google Ads account, so you keep all the data if we stop working together." },
      { q: "How soon will I see results?", a: "Ads start showing as soon as they launch. Results usually become stable after a few weeks of data and tuning." },
      { q: "Can you guarantee a number of leads?", a: "No. Results depend on your market, offer and website. We commit to clear tracking, steady work and honest reporting." },
    ],
    articles: ["seo-or-paid-ads-where-to-start"],
  },
  {
    slug: "meta-ads-management",
    parent: "paid-advertising",
    name: "Meta Ads Management",
    metaTitle: "Meta Ads Management for Facebook and Instagram",
    metaDescription:
      "Meta ads management for Facebook and Instagram: audiences, creative, pixel and Conversions API tracking, and weekly testing to find ads that sell.",
    h1: "Meta ads management that finds the ads and audiences that work",
    intro:
      "On Facebook and Instagram, the creative does most of the work. We plan audiences, test new ads often, fix your tracking, and move budget to what brings sales or leads.",
    signs: [
      "Your ads get likes but few sales or leads",
      "You boost posts instead of running proper campaigns",
      "Ad results dropped after tracking changes",
      "You run the same few ads for months",
    ],
    included: [
      { title: "Tracking setup", body: "Meta Pixel and Conversions API set up so results are measured more fully." },
      { title: "Campaign structure", body: "Prospecting and retargeting campaigns built for your goal and budget." },
      { title: "Creative testing", body: "New images, videos and copy tested regularly to find what works." },
      { title: "Audiences", body: "Broad, interest and lookalike audiences, plus retargeting of site visitors and customers." },
      { title: "Catalog ads", body: "Product catalog and dynamic ads for online stores." },
      { title: "Reports", body: "Spend, cost per result and what we are testing next, in plain English." },
    ],
    process: [
      { title: "Audit", body: "We review your account, pixel, past ads and offer." },
      { title: "Plan", body: "Audiences, creative ideas and budget split agreed." },
      { title: "Launch and test", body: "Campaigns go live with several ad versions." },
      { title: "Scale", body: "We grow budget behind the ads that perform." },
    ],
    faqs: [
      { q: "Do you make the ad creative?", a: "We write the copy and can design image ads. For video, we can edit footage you supply or work with your content team." },
      { q: "What budget do I need?", a: "Enough for Meta to gather data on each ad set. We suggest a starting budget based on your goal after the audit." },
      { q: "Is Meta or Google better for my business?", a: "Google catches people already searching. Meta reaches people who are not searching yet. Many businesses use both, and our guide on SEO or paid ads covers where to start." },
      { q: "Will I own the ad account?", a: "Yes. We work in your Business Manager, and you keep full access and all data." },
    ],
    articles: ["seo-or-paid-ads-where-to-start"],
  },
  {
    slug: "ppc-audit",
    parent: "paid-advertising",
    name: "PPC Audit",
    metaTitle: "PPC Audit Service for Google and Meta Ads",
    metaDescription:
      "PPC audit service for Google Ads and Meta Ads: we check tracking, structure, keywords, ads and landing pages, and give you a clear list of fixes to make.",
    h1: "PPC audit service that shows where your ad budget is going",
    intro:
      "If you are not sure your ad spend is working, an audit gives you answers. We go through your accounts, tracking and landing pages, and show you what is wasting money and what to fix first.",
    signs: [
      "You don't trust the numbers in your ad accounts",
      "Cost per lead or sale has crept up",
      "You want a second opinion on your current agency or freelancer",
      "You are about to raise your ad budget",
    ],
    included: [
      { title: "Tracking check", body: "Are conversions counted correctly, once, and for the right actions?" },
      { title: "Account structure", body: "Campaign and ad group setup reviewed against your goals." },
      { title: "Keywords and search terms", body: "Wasted spend found in irrelevant searches and match types." },
      { title: "Ads and audiences", body: "Ad copy, assets, targeting and audience overlap reviewed." },
      { title: "Landing pages", body: "Speed, message match and forms on the pages your ads send people to." },
      { title: "Action plan", body: "A ranked list of fixes, with what to do first." },
    ],
    process: [
      { title: "Access", body: "You give us read-only access to your accounts." },
      { title: "Review", body: "We go through every area in detail." },
      { title: "Report", body: "A clear report in plain English." },
      { title: "Walkthrough", body: "A call to explain the findings and answer questions." },
    ],
    faqs: [
      { q: "Which platforms do you audit?", a: "Google Ads, Microsoft Ads and Meta Ads. We can also review LinkedIn and TikTok accounts." },
      { q: "Do you need full access?", a: "No. Read-only access is enough for an audit." },
      { q: "Will you tell my current agency?", a: "No. The audit is for you. You decide what to share and with whom." },
      { q: "Do I have to hire you after the audit?", a: "No. The report is yours to use with your own team or another partner." },
    ],
    articles: ["seo-or-paid-ads-where-to-start"],
  },
  {
    slug: "logo-design",
    parent: "branding",
    name: "Logo Design",
    metaTitle: "Logo Design Services for Small Businesses",
    metaDescription:
      "Logo design services for small businesses: original concepts, refinement rounds and a full set of files for web, print and social, ready for any use.",
    h1: "Logo design services for a mark that fits your business",
    intro:
      "Your logo is often the first thing people notice. We design an original, simple mark that works on a sign, a website and a tiny phone screen, and give you every file you need.",
    signs: [
      "You are starting a new business or product",
      "Your current logo looks dated or homemade",
      "Your logo is hard to read when small",
      "You only have a low-quality image of your logo",
    ],
    included: [
      { title: "Discovery", body: "Your business, audience, competitors and the feel you want." },
      { title: "Concepts", body: "Several original logo ideas, shown in real-world examples." },
      { title: "Refinement", body: "Rounds of changes on your chosen direction." },
      { title: "Variations", body: "Full logo, icon, and horizontal and stacked versions." },
      { title: "Color and type", body: "Logo colors and matching fonts so everything looks consistent." },
      { title: "File pack", body: "Vector, PNG and SVG files for web, print and social, plus a simple usage guide." },
    ],
    process: [
      { title: "Brief", body: "We learn about your business and goals." },
      { title: "Concepts", body: "We present original logo directions." },
      { title: "Refine", body: "We improve the chosen idea with your feedback." },
      { title: "Deliver", body: "Final files and a short usage guide." },
    ],
    faqs: [
      { q: "Do I own the logo?", a: "Yes. Once the project is paid, the full rights to the final logo are yours." },
      { q: "Do you use templates or AI-generated logos?", a: "No. Every logo is designed from scratch for your business, so it is original and you can protect it." },
      { q: "What files will I get?", a: "Vector files such as AI, EPS and SVG, plus PNG and JPG in color, black and white, for web, print and social." },
      { q: "Do I need a full brand identity too?", a: "Not always. A logo is a good start. A brand identity adds colors, fonts and rules, which helps once you have more materials to design." },
    ],
    articles: [],
  },
  {
    slug: "brand-identity-design",
    parent: "branding",
    name: "Brand Identity Design",
    metaTitle: "Brand Identity Design Services",
    metaDescription:
      "Brand identity design services: logo, color palette, fonts, imagery style and brand guidelines, so everything your business makes looks consistent.",
    h1: "Brand identity design that makes your business easy to recognize",
    intro:
      "A brand identity is more than a logo. It is the colors, fonts, images and rules that make everything you publish look like it came from the same business. We design it and write it down so anyone can use it.",
    signs: [
      "Your website, social posts and print all look different",
      "Each designer you hire does things their own way",
      "Your business has grown but the brand hasn't",
      "You are launching or rebranding and want it done properly",
    ],
    included: [
      { title: "Brand foundations", body: "Your audience, values, positioning and personality, agreed in plain words." },
      { title: "Logo system", body: "A new or refreshed logo with all the versions you need." },
      { title: "Color and typography", body: "A color palette and fonts that work on screen and in print." },
      { title: "Visual style", body: "Rules for photos, icons, illustrations and layouts." },
      { title: "Key applications", body: "Business cards, social templates and email signatures in the new style." },
      { title: "Brand guidelines", body: "A clear guide so your team and partners use the brand correctly." },
    ],
    process: [
      { title: "Discover", body: "Workshop on your business, audience and competitors." },
      { title: "Direction", body: "Visual directions to choose from." },
      { title: "Develop", body: "The full identity built from the chosen direction." },
      { title: "Hand over", body: "Guidelines, files and templates delivered." },
    ],
    faqs: [
      { q: "How is brand identity different from a logo?", a: "A logo is one part. Brand identity is the full system of logo, colors, fonts and style that keeps everything consistent." },
      { q: "Can you refresh our brand without starting over?", a: "Yes. Many businesses keep what people recognize and modernize the rest. We will advise which route suits you." },
      { q: "Will you update our website too?", a: "We can. Our web design team can apply the new identity to your site, or we can hand guidelines to your developer." },
      { q: "What do brand guidelines include?", a: "Logo use, colors, fonts, imagery, tone of voice basics and examples of right and wrong use." },
    ],
    articles: ["prepare-before-redesigning-your-business-website"],
  },
  {
    slug: "brand-strategy",
    parent: "branding",
    name: "Brand Strategy",
    metaTitle: "Brand Strategy Services for Growing Businesses",
    metaDescription:
      "Brand strategy services that define who you serve, what makes you different and how you talk, so your marketing, website and sales speak with one voice.",
    h1: "Brand strategy services that make your business clear and different",
    intro:
      "If customers can't tell why they should choose you, good design won't fix it. Brand strategy defines who you serve, what you stand for and how you say it, so every message points the same way.",
    signs: [
      "You struggle to explain what makes you different",
      "Your team describes the business in different ways",
      "You compete mostly on price",
      "You are entering a new market or launching a new offer",
    ],
    included: [
      { title: "Research", body: "Interviews with customers and your team, and a review of competitors." },
      { title: "Audience", body: "Clear profiles of your best customers and what they care about." },
      { title: "Positioning", body: "A short statement of who you serve, what you offer and why you are different." },
      { title: "Messaging", body: "Key messages, proof points and a tagline direction." },
      { title: "Tone of voice", body: "How your brand sounds, with simple do and don't examples." },
      { title: "Strategy document", body: "A short, usable guide for your team, writers and partners." },
    ],
    process: [
      { title: "Research", body: "We talk to customers and study the market." },
      { title: "Workshop", body: "We work through the findings with your team." },
      { title: "Define", body: "Positioning, messaging and voice written up." },
      { title: "Apply", body: "We show how it changes your website and marketing." },
    ],
    faqs: [
      { q: "Do small businesses need brand strategy?", a: "Yes, in a simple form. Even a one-page positioning and message guide makes your website and marketing clearer." },
      { q: "How is this different from brand identity?", a: "Strategy decides what you say and to whom. Identity decides how it looks. Strategy usually comes first." },
      { q: "Do you need to talk to our customers?", a: "It helps a lot. A few short interviews often reveal the words customers actually use to describe you." },
      { q: "What do we get at the end?", a: "A short strategy document covering audience, positioning, messages and tone of voice, ready to use." },
    ],
    articles: ["how-to-write-a-project-brief-for-an-agency"],
  },
  {
    slug: "ai-chatbot-development",
    parent: "ai-automation",
    name: "AI Chatbot Development",
    metaTitle: "AI Chatbot Development Services",
    metaDescription:
      "AI chatbot development services: chatbots trained on your own content that answer customer questions, capture leads and hand off to your team when needed.",
    h1: "AI chatbot development that answers customers using your own content",
    intro:
      "A good AI chatbot answers common questions any time of day, using your own content, and knows when to pass the chat to a person. We build chatbots that are accurate, on-brand and connected to your tools.",
    signs: [
      "Your team answers the same questions every day",
      "Visitors leave your site when no one is online to help",
      "Leads arrive at night and wait until morning",
      "An old rule-based chatbot frustrates your customers",
    ],
    included: [
      { title: "Use-case plan", body: "Which questions the bot should answer, and which it should hand to people." },
      { title: "Knowledge base", body: "The bot connected to your pages, help docs and product data, so answers come from your content." },
      { title: "Conversation design", body: "Tone, greetings, fallbacks and clear limits on what the bot will say." },
      { title: "Integrations", body: "Lead capture into your CRM, bookings, order lookups or help desk hand-off." },
      { title: "Safety and testing", body: "Tests against tricky questions, with guardrails to reduce wrong answers." },
      { title: "Review and tuning", body: "Regular review of chats to improve answers over time." },
    ],
    process: [
      { title: "Scope", body: "We study your top questions and goals." },
      { title: "Build", body: "We set up the bot with your content and tools." },
      { title: "Test", body: "You and your team try to break it before launch." },
      { title: "Launch and tune", body: "We go live and improve it from real chats." },
    ],
    faqs: [
      { q: "Will the chatbot make things up?", a: "Any AI model can make mistakes. We limit the bot to your own content, test it carefully, and set it to hand off when it is unsure." },
      { q: "Where can the chatbot live?", a: "On your website, and often on WhatsApp, Messenger or inside your help desk, depending on your needs." },
      { q: "Can it book appointments or capture leads?", a: "Yes. It can collect details and send them to your CRM, or connect to a booking tool." },
      { q: "Is customer data safe?", a: "We choose providers with clear data policies, avoid sending data that isn't needed, and follow your privacy requirements." },
    ],
    articles: ["how-to-identify-a-business-workflow-worth-automating"],
  },
  {
    slug: "workflow-automation",
    parent: "ai-automation",
    name: "Workflow Automation",
    metaTitle: "Workflow Automation Services for Small Teams",
    metaDescription:
      "Workflow automation services that remove repetitive tasks: data entry, follow-ups, reports and hand-offs automated with tools like Zapier, Make or code.",
    h1: "Workflow automation services that give your team hours back",
    intro:
      "Many tasks follow the same steps every time: copy this, send that, update a sheet. We find those tasks, automate them with the right tool, and make sure someone is alerted when something goes wrong.",
    signs: [
      "Staff spend hours on copy-and-paste work",
      "Follow-ups get missed because they rely on memory",
      "Reports are built by hand every week",
      "Hand-offs between teams are slow or messy",
    ],
    included: [
      { title: "Workflow review", body: "We map your repeat tasks and pick the ones worth automating first." },
      { title: "Automation build", body: "Workflows built in Zapier, Make, n8n or custom code, whichever fits best." },
      { title: "AI steps", body: "AI used where it helps, such as sorting emails, summarizing notes or drafting replies." },
      { title: "Integrations", body: "Your CRM, forms, email, spreadsheets and accounting tools connected." },
      { title: "Alerts and logs", body: "Clear alerts when a step fails, so nothing breaks silently." },
      { title: "Documentation", body: "Simple notes on each workflow so your team understands it." },
    ],
    process: [
      { title: "Map", body: "We list your tasks and time spent on each." },
      { title: "Prioritize", body: "We pick the automations with the best return." },
      { title: "Build and test", body: "Each workflow tested with real examples." },
      { title: "Hand over", body: "Training, notes and ongoing support." },
    ],
    faqs: [
      { q: "Which tasks are worth automating?", a: "Tasks that happen often, follow clear rules and take real time. Our guide on finding a workflow worth automating walks through how to spot them." },
      { q: "Zapier, Make or custom code?", a: "No-code tools are fast and cheap for simple flows. Custom code suits high volumes or complex logic. We recommend what fits your case." },
      { q: "Will automation replace my staff?", a: "It removes repetitive work, so people can spend time on customers and decisions instead." },
      { q: "What if an automation breaks?", a: "We build in alerts and logs, so failures are spotted quickly, and we can support you after launch." },
    ],
    articles: ["how-to-identify-a-business-workflow-worth-automating", "custom-software-vs-off-the-shelf"],
  },
  {
    slug: "ai-agent-development",
    parent: "ai-automation",
    name: "AI Agent Development",
    metaTitle: "AI Agent Development Services for Business",
    metaDescription:
      "AI agent development services: AI assistants that research, draft, sort and update your systems, with human approval steps and clear limits built in.",
    h1: "AI agent development for real business tasks, with people in control",
    intro:
      "AI agents can do multi-step work, such as reading a request, checking your systems and drafting a reply. We build agents for specific tasks, connect them to your tools, and keep a person in the loop for key decisions.",
    signs: [
      "Your team handles many requests that need a few lookups and a reply",
      "Simple automations can't handle messy inputs like emails or documents",
      "You want to use AI but don't know where it would help",
      "You tried AI tools but they never connected to your systems",
    ],
    included: [
      { title: "Use-case selection", body: "We find tasks where an agent saves real time and the risk is manageable." },
      { title: "Agent design", body: "Clear steps, tools and limits for what the agent can and can't do." },
      { title: "Tool connections", body: "Access to your CRM, inbox, documents or databases through secure APIs." },
      { title: "Human approval", body: "Review steps before the agent sends, updates or spends anything important." },
      { title: "Testing", body: "Tests with real examples, including edge cases and tricky inputs." },
      { title: "Monitoring", body: "Logs of what the agent did, so you can check and improve it." },
    ],
    process: [
      { title: "Discover", body: "We study the task and how your team does it today." },
      { title: "Prototype", body: "A working version tested on past examples." },
      { title: "Pilot", body: "A small live trial with close review." },
      { title: "Roll out", body: "Wider use, monitoring and improvements." },
    ],
    faqs: [
      { q: "What is the difference between an AI agent and a chatbot?", a: "A chatbot mainly answers questions. An agent can take steps, such as looking up records, updating systems or drafting documents, within limits you set." },
      { q: "Can an agent make mistakes?", a: "Yes, so we keep people in control of important actions and log everything the agent does." },
      { q: "Which AI models do you use?", a: "We choose from leading models based on the task, cost and your data needs, and can switch later if a better option appears." },
      { q: "How do we start?", a: "Pick one task your team repeats often. We build a small pilot, measure it, and expand only if it works." },
    ],
    articles: ["how-to-identify-a-business-workflow-worth-automating"],
  },
  {
    slug: "hubspot-crm-setup",
    parent: "crm-integrations",
    name: "HubSpot CRM Setup",
    metaTitle: "HubSpot CRM Setup and Onboarding",
    metaDescription:
      "HubSpot CRM setup and onboarding: pipelines, properties, forms, email, data import and automations configured for how your team sells, plus training.",
    h1: "HubSpot CRM setup that your sales team will actually use",
    intro:
      "HubSpot is powerful, but a messy setup means your team stops using it. We set it up around how you sell, import your data cleanly, and train your team so the CRM becomes the place work gets done.",
    signs: [
      "You bought HubSpot but it is half set up",
      "Leads from your website don't reach the right person",
      "Your contacts are full of duplicates and old data",
      "Reports don't show where deals come from",
    ],
    included: [
      { title: "Pipelines and stages", body: "Deal pipelines that match your real sales steps." },
      { title: "Properties and data", body: "Custom fields, clean data import and duplicate clean-up." },
      { title: "Forms and tracking", body: "Website forms, tracking code and lead sources connected." },
      { title: "Email and calendar", body: "Team inboxes, calendars and meeting links connected." },
      { title: "Automations", body: "Lead assignment, follow-up tasks and simple nurture emails." },
      { title: "Training and reports", body: "Team training and dashboards for pipeline and lead sources." },
    ],
    process: [
      { title: "Discover", body: "We map your sales process and data." },
      { title: "Configure", body: "We set up HubSpot to match." },
      { title: "Import", body: "We clean and import your data." },
      { title: "Train", body: "We train your team and support the first weeks." },
    ],
    faqs: [
      { q: "Which HubSpot plan do I need?", a: "It depends on your team size and the automation you need. We review your needs and suggest the lowest plan that covers them." },
      { q: "Can you move our data from another CRM?", a: "Yes. We move contacts, companies, deals and notes from spreadsheets or CRMs such as Salesforce, Pipedrive or Zoho." },
      { q: "Can HubSpot connect to our other tools?", a: "Usually. HubSpot has many native integrations, and we can build custom ones through its API when needed." },
      { q: "Do you offer support after setup?", a: "Yes. We can provide ongoing admin, new automations and help as your team grows." },
    ],
    articles: ["how-to-identify-a-business-workflow-worth-automating", "custom-software-vs-off-the-shelf"],
  },
  {
    slug: "salesforce-integration",
    parent: "crm-integrations",
    name: "Salesforce Integration",
    metaTitle: "Salesforce Integration Services",
    metaDescription:
      "Salesforce integration services that connect your website, store, marketing and finance tools to Salesforce, with clean data mapping and error alerts.",
    h1: "Salesforce integration services that keep your data in sync",
    intro:
      "Salesforce works best when it has the full picture. We connect it to your website, ecommerce, marketing and finance tools, so your team sees accurate data without copying it by hand.",
    signs: [
      "Web leads are entered into Salesforce manually",
      "Sales can't see orders, invoices or support tickets",
      "Data in Salesforce doesn't match other systems",
      "An old integration breaks often and no one owns it",
    ],
    included: [
      { title: "Integration plan", body: "What data flows where, how often, and which system is the source of truth." },
      { title: "Web-to-lead", body: "Website forms sending clean leads to Salesforce with source details." },
      { title: "System connections", body: "Ecommerce, marketing, accounting and support tools linked through APIs or proven connectors." },
      { title: "Data mapping", body: "Objects and fields matched, with rules for duplicates." },
      { title: "Error handling", body: "Logs and alerts so sync problems are fixed fast." },
      { title: "Documentation", body: "Clear notes for your Salesforce admin and team." },
    ],
    process: [
      { title: "Review", body: "We study your org, data and connected tools." },
      { title: "Design", body: "We agree the data flows and rules." },
      { title: "Build and test", body: "Built and tested in a Salesforce sandbox first." },
      { title: "Go live", body: "Release and close monitoring of the first syncs." },
    ],
    faqs: [
      { q: "Do you build in a sandbox?", a: "Yes. We build and test in a sandbox, so your live Salesforce data is not at risk." },
      { q: "Can you use an existing connector?", a: "Yes, when one fits. We only build custom when a connector can't handle your data or volume." },
      { q: "Which tools can you connect?", a: "Any system with an API, such as Shopify, HubSpot, Stripe, QuickBooks, Xero and help desks." },
      { q: "Can you also clean our Salesforce data?", a: "Yes. A data clean-up before integration often prevents duplicate and sync problems later." },
    ],
    articles: ["how-to-identify-a-business-workflow-worth-automating", "custom-software-vs-off-the-shelf"],
  },
  {
    slug: "crm-migration",
    parent: "crm-integrations",
    name: "CRM Migration",
    metaTitle: "CRM Migration Services: Move Data Safely",
    metaDescription:
      "CRM migration services that move contacts, companies, deals, notes and history to your new CRM, cleaned and checked, with no gap in daily sales work.",
    h1: "CRM migration services that move your data without the mess",
    intro:
      "Moving to a new CRM is the best chance to clean up years of data. We plan the move, map and clean your records, transfer the history, and switch over without stopping your sales team.",
    signs: [
      "You are moving to HubSpot, Salesforce or another CRM",
      "Your old CRM is full of duplicates and outdated records",
      "You worry about losing notes, emails or deal history",
      "Your team still keeps data in spreadsheets on the side",
    ],
    included: [
      { title: "Migration plan", body: "What moves, what is archived and the switch-over date." },
      { title: "Data clean-up", body: "Duplicates merged, formats fixed and old records removed or archived." },
      { title: "Field mapping", body: "Old fields and stages matched to the new CRM." },
      { title: "History transfer", body: "Notes, activities, emails and attachments moved where the platforms allow." },
      { title: "Test import", body: "A sample import checked with your team before the full move." },
      { title: "Switch-over support", body: "Help in the first weeks so your team settles in." },
    ],
    process: [
      { title: "Audit", body: "We review your old data and new CRM setup." },
      { title: "Map and clean", body: "Fields mapped and data cleaned." },
      { title: "Test", body: "A test import reviewed with you." },
      { title: "Migrate", body: "Full move, checks and team support." },
    ],
    faqs: [
      { q: "Which CRMs can you migrate between?", a: "Common moves include Pipedrive, Zoho, Salesforce, HubSpot, Monday and spreadsheets. If the old system can export data, we can usually move it." },
      { q: "Will we lose email history?", a: "Most email and activity history can be moved, but some platforms limit what can be exported. We tell you what will and won't move before we start." },
      { q: "Will sales work stop during the move?", a: "No. We plan a short cut-over and move recent changes at the end, so your team keeps working." },
      { q: "Can you set up the new CRM too?", a: "Yes. Most migrations include pipelines, fields and automations in the new CRM." },
    ],
    articles: ["custom-software-vs-off-the-shelf"],
  },
  {
    slug: "cro-audit",
    parent: "conversion-optimization",
    name: "CRO Audit",
    metaTitle: "CRO Audit: Find What Stops Visitors Converting",
    metaDescription:
      "CRO audit that reviews your analytics, key pages, forms and checkout to find what stops visitors buying or enquiring, with a clear list of fixes to test.",
    h1: "CRO audit that shows why visitors leave without buying",
    intro:
      "More traffic won't help if visitors leave without acting. Our conversion audit looks at your data and pages to find where people drop off and why, then gives you a ranked list of fixes.",
    signs: [
      "You get traffic but few sales or enquiries",
      "Many shoppers add to cart and never check out",
      "You are about to spend more on ads",
      "You are not sure your analytics are accurate",
    ],
    included: [
      { title: "Analytics review", body: "Tracking checked, and funnels analyzed to find the biggest drop-offs." },
      { title: "Page review", body: "Home, landing, product and service pages reviewed for clarity and trust." },
      { title: "Forms and checkout", body: "Every step of your forms or checkout tested on mobile and desktop." },
      { title: "User behavior", body: "Heatmaps and session recordings reviewed where available." },
      { title: "Speed and usability", body: "Slow pages and usability problems that cost conversions." },
      { title: "Fix and test list", body: "Ranked fixes and test ideas, with what to do first." },
    ],
    process: [
      { title: "Access", body: "We connect to your analytics and tools." },
      { title: "Analyze", body: "We study data and walk through your site as a customer." },
      { title: "Report", body: "A plain-English report with ranked fixes." },
      { title: "Plan", body: "We agree what to fix now and what to test." },
    ],
    faqs: [
      { q: "What is a good conversion rate?", a: "It varies a lot by industry, price and traffic source. Your own past results are a better benchmark than any average." },
      { q: "Do I need heatmap tools?", a: "They help but aren't required. If you don't have one, we can set one up for a few weeks before the review." },
      { q: "Will you make the changes?", a: "We can. Our design and development team can make the fixes and set up tests." },
      { q: "Does this work for Shopify stores?", a: "Yes. Many of our CRO audits are for Shopify stores, with a close look at product pages, cart and checkout." },
    ],
    articles: ["increase-shopify-conversion-rate", "shopify-speed-optimization"],
  },
  {
    slug: "ab-testing",
    parent: "conversion-optimization",
    name: "A/B Testing",
    metaTitle: "A/B Testing Services for Websites and Stores",
    metaDescription:
      "A/B testing services: research-based ideas, test design, build, QA and honest analysis, so you make website changes based on real visitor behavior.",
    h1: "A/B testing services that turn guesses into evidence",
    intro:
      "Opinions about what works are cheap. A/B tests show what your visitors actually do. We plan tests from research, build them carefully, and report results honestly, including when a test doesn't win.",
    signs: [
      "Website changes are decided by opinion",
      "You redesigned before and results got worse",
      "You have steady traffic and want to improve it",
      "You run tests but aren't sure the results are reliable",
    ],
    included: [
      { title: "Research", body: "Analytics, user feedback and page reviews used to find test ideas." },
      { title: "Test roadmap", body: "A ranked list of tests based on likely impact and effort." },
      { title: "Test design", body: "Clear hypotheses, goals and sample sizes before each test." },
      { title: "Build and QA", body: "Variants built and checked on browsers and devices." },
      { title: "Analysis", body: "Results reviewed with care, including segments and side effects." },
      { title: "Roll-out", body: "Winning changes made permanent on your site." },
    ],
    process: [
      { title: "Research", body: "We find where and why visitors drop off." },
      { title: "Plan", body: "We agree a test roadmap." },
      { title: "Test", body: "We build, check and run each test." },
      { title: "Learn", body: "We share results and roll out winners." },
    ],
    faqs: [
      { q: "How much traffic do I need for A/B testing?", a: "Enough conversions to reach a reliable result in a sensible time. With low traffic, we suggest bigger changes or other research methods instead." },
      { q: "Which testing tool do you use?", a: "We work with tools such as VWO, Optimizely, Convert and Shopify testing apps, or build server-side tests when needed." },
      { q: "How long does a test run?", a: "Usually at least two full weeks, to cover weekday and weekend behavior, and longer for low-traffic pages." },
      { q: "What if a test loses?", a: "A losing test still teaches you something and stops a bad change going live. We report every result honestly." },
    ],
    articles: ["increase-shopify-conversion-rate"],
  },
  {
    slug: "shopify-conversion-optimization",
    parent: "conversion-optimization",
    name: "Shopify Conversion Optimization",
    metaTitle: "Shopify Conversion Optimization Services",
    metaDescription:
      "Shopify conversion optimization services: product pages, cart, checkout, speed and trust improved step by step to turn more of your visitors into buyers.",
    h1: "Shopify conversion optimization that turns more visitors into buyers",
    intro:
      "Small changes on product pages, cart and checkout can add up. We study how shoppers use your Shopify store, fix what gets in their way, and test the changes that matter most.",
    signs: [
      "Visitors browse but don't buy",
      "Cart abandonment is high",
      "Product pages lack detail, reviews or clear shipping info",
      "Your store is slow on mobile",
    ],
    included: [
      { title: "Store review", body: "Analytics and a full walkthrough of your store as a shopper." },
      { title: "Product pages", body: "Clearer images, details, reviews, sizing and shipping info." },
      { title: "Cart and checkout", body: "Fewer steps, express checkout and clear costs before payment." },
      { title: "Navigation and search", body: "Easier ways to find products, filters and collections." },
      { title: "Speed", body: "Faster pages by trimming apps, scripts and heavy images." },
      { title: "Testing", body: "Key changes tested so you know what improved results." },
    ],
    process: [
      { title: "Review", body: "We study your data and store." },
      { title: "Prioritize", body: "We list fixes by impact and effort." },
      { title: "Improve", body: "We make changes on a duplicate theme first." },
      { title: "Measure", body: "We track results and keep improving." },
    ],
    faqs: [
      { q: "Do I need a new theme?", a: "Usually not. Most gains come from content, layout and speed fixes in your current theme." },
      { q: "Can you change the Shopify checkout?", a: "Shopify limits checkout changes, but many settings, apps and checkout extensions can still help, depending on your plan." },
      { q: "Which pages do you start with?", a: "The pages with the most traffic and the biggest drop-off, usually product pages and cart." },
      { q: "Will you guarantee a higher conversion rate?", a: "No one honestly can. We make changes based on evidence, test what we can, and report the results clearly." },
    ],
    articles: ["increase-shopify-conversion-rate", "shopify-speed-optimization", "shopify-theme-customization-or-custom-storefront"],
  },
  {
    slug: "ux-audit",
    parent: "ui-ux-design",
    name: "UX Audit",
    metaTitle: "UX Audit Services for Websites and Apps",
    metaDescription:
      "UX audit services for websites and apps: usability, accessibility, user flows and analytics reviewed, with clear, ranked fixes your team can act on.",
    h1: "UX audit services that find what frustrates your users",
    intro:
      "When users get stuck, they leave or call support. A UX audit reviews your website or app through your users' eyes, finds the problems, and gives your team a clear list of what to fix first.",
    signs: [
      "Users complain the product is confusing",
      "Support gets the same how-to questions again and again",
      "Sign-ups or checkouts drop at certain steps",
      "The product grew feature by feature with no overall design",
    ],
    included: [
      { title: "Heuristic review", body: "Each key screen checked against proven usability principles." },
      { title: "User flows", body: "Key tasks walked through step by step to find friction." },
      { title: "Accessibility check", body: "Common WCAG issues such as contrast, labels and keyboard use." },
      { title: "Analytics review", body: "Data used to confirm where users drop off." },
      { title: "User feedback", body: "Support tickets, reviews or short user tests where possible." },
      { title: "Ranked fixes", body: "Issues ranked by severity, with screenshots and suggested fixes." },
    ],
    process: [
      { title: "Scope", body: "We agree the key users and tasks." },
      { title: "Review", body: "We audit screens, flows and data." },
      { title: "Report", body: "A clear report with ranked fixes." },
      { title: "Walkthrough", body: "A session with your team to plan next steps." },
    ],
    faqs: [
      { q: "Do you test with real users?", a: "We can add short user tests to the audit. Even five users often reveal the main problems." },
      { q: "Is this for websites or apps?", a: "Both. We audit marketing sites, web apps, SaaS products and mobile apps." },
      { q: "Will you redesign the screens too?", a: "If you want. The audit is useful on its own, and our design team can turn the fixes into new screens." },
      { q: "How is a UX audit different from a CRO audit?", a: "A UX audit focuses on how easy the product is to use. A CRO audit focuses on turning visitors into customers. They overlap, and we can combine them." },
    ],
    articles: [],
  },
  {
    slug: "saas-ui-ux-design",
    parent: "ui-ux-design",
    name: "SaaS UI/UX Design",
    metaTitle: "SaaS UI/UX Design Services",
    metaDescription:
      "SaaS UI/UX design services: user research, onboarding, dashboards and design systems that make your product easier to learn, use and keep using.",
    h1: "SaaS UI/UX design that helps users get value faster",
    intro:
      "In SaaS, users decide quickly whether a product is worth it. We design onboarding, dashboards and everyday workflows that are clear and fast, so users reach value sooner and stay longer.",
    signs: [
      "New users sign up but don't come back",
      "Your product looks inconsistent from screen to screen",
      "Developers design screens on the fly",
      "You are planning a major new feature or redesign",
    ],
    included: [
      { title: "User research", body: "Interviews and data to learn what users need and where they struggle." },
      { title: "Onboarding", body: "First-run flows that guide users to their first success." },
      { title: "Information architecture", body: "Navigation and structure that make features easy to find." },
      { title: "UI design", body: "Clean, consistent screens for web and mobile." },
      { title: "Prototypes", body: "Clickable prototypes tested with users before development." },
      { title: "Design system", body: "Reusable components and rules your developers can build from." },
    ],
    process: [
      { title: "Research", body: "We learn about your users and product goals." },
      { title: "Structure", body: "Flows and wireframes for key tasks." },
      { title: "Design and test", body: "Visual design and prototypes tested with users." },
      { title: "Hand off", body: "Design files and specs for your developers." },
    ],
    faqs: [
      { q: "Which design tools do you use?", a: "Figma, with organized files and components your team can keep using." },
      { q: "Can you work with our developers?", a: "Yes. We work closely with in-house or outsourced developers, and our own team can build it too." },
      { q: "Do we need a design system?", a: "If your product has many screens and several people building it, a design system saves time and keeps things consistent." },
      { q: "Can you redesign in stages?", a: "Yes. We often start with the screens that matter most, such as onboarding, and improve the rest over time." },
    ],
    articles: ["how-to-write-a-project-brief-for-an-agency"],
  },
  {
    slug: "mobile-app-ui-design",
    parent: "ui-ux-design",
    name: "Mobile App UI Design",
    metaTitle: "Mobile App UI Design Services",
    metaDescription:
      "Mobile app UI design services for iOS and Android: user flows, wireframes, visual design and clickable prototypes that make your app easy to use daily.",
    h1: "Mobile app UI design that feels simple from the first tap",
    intro:
      "Mobile users have little patience and small screens. We design app interfaces that follow iOS and Android conventions, keep tasks short, and look good in your brand.",
    signs: [
      "You are planning a new app and need designs",
      "App store reviews mention confusing screens",
      "Your app looks different on iOS and Android for no reason",
      "Developers need clear designs before they can build",
    ],
    included: [
      { title: "User flows", body: "The main tasks mapped step by step, kept as short as possible." },
      { title: "Wireframes", body: "Simple layouts to agree structure before visual design." },
      { title: "Visual design", body: "Polished screens in your brand, following platform guidelines." },
      { title: "Prototypes", body: "Clickable prototypes to test on a real phone." },
      { title: "Accessibility", body: "Readable text, good contrast and tap targets that are easy to hit." },
      { title: "Developer hand-off", body: "Specs, assets and components ready for development." },
    ],
    process: [
      { title: "Discover", body: "We agree users, goals and key features." },
      { title: "Wireframe", body: "Flows and layouts reviewed with you." },
      { title: "Design", body: "Visual design and prototype." },
      { title: "Hand off", body: "Files and support during development." },
    ],
    faqs: [
      { q: "Do you design for both iOS and Android?", a: "Yes. We keep one consistent design and adjust details to fit each platform's conventions." },
      { q: "Can you also build the app?", a: "Yes. Our mobile app team can build it with React Native or native code." },
      { q: "What do we get at the end?", a: "Figma files with all screens, components and a clickable prototype, plus specs for developers." },
      { q: "Can you redesign an existing app?", a: "Yes. We usually start with a short UX review to find what to keep and what to change." },
    ],
    articles: [],
  },
  {
    slug: "react-native-app-development",
    parent: "mobile-app-development",
    name: "React Native App Development",
    metaTitle: "React Native App Development Services",
    metaDescription:
      "React Native app development services: one codebase for iOS and Android, with native performance where it matters, app store launch and ongoing support.",
    h1: "React Native app development for iOS and Android from one codebase",
    intro:
      "React Native lets you build one app for iOS and Android, which saves time and keeps both versions in step. We build fast, reliable React Native apps and handle the launch on both app stores.",
    signs: [
      "You need an app on both iOS and Android",
      "You want to launch sooner without two separate teams",
      "Your web team already uses React",
      "Your current cross-platform app is slow or unstable",
    ],
    included: [
      { title: "Planning", body: "Features, screens and the first release scope agreed up front." },
      { title: "App development", body: "One React Native codebase for both platforms, written in TypeScript." },
      { title: "Native features", body: "Push notifications, camera, location, payments and other device features." },
      { title: "Backend and APIs", body: "Connections to your existing systems, or a new backend if needed." },
      { title: "Testing", body: "Testing on real iOS and Android devices." },
      { title: "App store launch", body: "Store listings, review submission and release management." },
    ],
    process: [
      { title: "Plan", body: "We agree scope, design and timeline." },
      { title: "Build", body: "Regular test builds on your own phone." },
      { title: "Test", body: "Device testing and fixes." },
      { title: "Launch and support", body: "Store release and ongoing updates." },
    ],
    faqs: [
      { q: "Is React Native as good as a native app?", a: "For most business apps, users can't tell the difference. For heavy graphics or very specific device features, native code may be better, and we will tell you if so." },
      { q: "Can we reuse code from our website?", a: "Some logic and skills carry over from React, but the interface is built separately for mobile." },
      { q: "Do you publish the app for us?", a: "Yes. We handle App Store and Google Play submissions, using your own developer accounts." },
      { q: "Who owns the code?", a: "You do. The code is stored in your repository from the start." },
    ],
    articles: ["custom-software-development-cost", "how-to-write-a-project-brief-for-an-agency"],
  },
  {
    slug: "ios-app-development",
    parent: "mobile-app-development",
    name: "iOS App Development",
    metaTitle: "iOS App Development Services for iPhone",
    metaDescription:
      "iOS app development services for iPhone and iPad: native Swift apps designed to Apple guidelines, tested on real devices and launched on the App Store.",
    h1: "iOS app development for fast, polished iPhone and iPad apps",
    intro:
      "Some apps need the full power of Apple's platform. We build native iOS apps in Swift that feel at home on iPhone and iPad, and we guide you through App Store review and launch.",
    signs: [
      "Most of your customers use iPhones",
      "Your app needs deep Apple features like HealthKit, widgets or Apple Pay",
      "Performance and smooth animation really matter",
      "Your current iOS app is outdated or crashes often",
    ],
    included: [
      { title: "Scope and plan", body: "Features, screens and a first release you can launch sooner." },
      { title: "Native development", body: "Swift and SwiftUI code that follows Apple's best practices." },
      { title: "Apple features", body: "Apple Pay, Sign in with Apple, widgets, notifications and more." },
      { title: "Integrations", body: "Connections to your backend, CRM, payments or other systems." },
      { title: "Testing", body: "TestFlight builds and testing on real iPhones and iPads." },
      { title: "App Store launch", body: "Listing, screenshots, privacy details and review submission." },
    ],
    process: [
      { title: "Plan", body: "Scope, design and timeline agreed." },
      { title: "Build", body: "Regular TestFlight builds for your review." },
      { title: "Test", body: "Device testing and bug fixes." },
      { title: "Launch", body: "App Store release and ongoing updates." },
    ],
    faqs: [
      { q: "Should I build native iOS or cross-platform?", a: "If you need both iOS and Android, React Native is often more cost-effective. Native iOS suits apps that rely on Apple features or need top performance." },
      { q: "How long does App Store review take?", a: "Often a day or two, but it varies. We prepare everything Apple asks for to avoid delays." },
      { q: "Can you update our existing iOS app?", a: "Yes. We review the code first, then fix issues and add features." },
      { q: "Do you need a Mac or Apple account from us?", a: "You need an Apple Developer account in your company name so you own the app. We handle the rest." },
    ],
    articles: ["custom-software-development-cost"],
  },
  {
    slug: "mvp-app-development",
    parent: "mobile-app-development",
    name: "MVP App Development",
    metaTitle: "MVP App Development for Startups",
    metaDescription:
      "MVP app development for startups: we help you choose the core features, design and build a first version fast, launch it and learn from real users.",
    h1: "MVP app development to test your idea with real users",
    intro:
      "The fastest way to learn if an app idea works is to put a focused first version in front of users. We help you cut the idea to its core, build it well, and launch it so you can learn and improve.",
    signs: [
      "You have an app idea and want to test it before investing more",
      "Your feature list keeps growing and launch keeps slipping",
      "You need a working product to show investors or partners",
      "You don't have a technical co-founder",
    ],
    included: [
      { title: "Scope workshop", body: "We cut the idea down to the features that test your main assumption." },
      { title: "Design", body: "Simple, clear screens and a clickable prototype." },
      { title: "Build", body: "A working app on iOS, Android or web, built to be extended later." },
      { title: "Analytics", body: "Tracking set up so you can see how people use it." },
      { title: "Launch", body: "App store or web launch, with a feedback loop to real users." },
      { title: "Next steps", body: "A plan for what to build next, based on what you learn." },
    ],
    process: [
      { title: "Define", body: "Problem, users and must-have features." },
      { title: "Design", body: "Prototype tested with a few users." },
      { title: "Build", body: "Short cycles with regular demos." },
      { title: "Launch and learn", body: "Release, measure and plan the next version." },
    ],
    faqs: [
      { q: "What should an MVP include?", a: "Only what is needed to test whether people want and use the product. Everything else waits until you have feedback." },
      { q: "Will we have to rebuild it later?", a: "Not if it is built properly. We keep the MVP small but use solid foundations, so it can grow." },
      { q: "How much does an MVP cost?", a: "It depends on the features and platforms. Our guide to custom software development cost explains what drives the price." },
      { q: "Do you help after launch?", a: "Yes. We can keep improving the product as you learn from users." },
    ],
    articles: ["custom-software-development-cost", "how-to-write-a-project-brief-for-an-agency", "custom-software-vs-off-the-shelf"],
  },
  {
    slug: "klaviyo-email-marketing",
    parent: "email-marketing",
    name: "Klaviyo Email Marketing",
    metaTitle: "Klaviyo Email Marketing Agency Services",
    metaDescription:
      "Klaviyo email marketing services for online stores: setup, flows, campaigns, segments and sign-up forms, managed for steady revenue from your list.",
    h1: "Klaviyo email marketing that turns your list into repeat sales",
    intro:
      "Klaviyo is built for ecommerce, but only works well when it is set up properly. We set up your account, build the key flows, plan campaigns, and keep improving them based on results.",
    signs: [
      "You use Klaviyo but only send the odd newsletter",
      "Your welcome or abandoned cart emails are basic or missing",
      "You send the same email to your whole list",
      "Email revenue is low compared with your traffic",
    ],
    included: [
      { title: "Account setup", body: "Klaviyo connected to your store, with tracking, domains and sending settings in place." },
      { title: "Core flows", body: "Welcome, abandoned cart, browse abandonment, post-purchase and win-back flows." },
      { title: "Campaigns", body: "A regular campaign calendar, designed and written for your brand." },
      { title: "Segments", body: "Lists split by behavior and purchase history, so people get relevant emails." },
      { title: "Sign-up forms", body: "Pop-ups and embedded forms that grow your list." },
      { title: "Reporting", body: "Monthly reports on revenue, opens, clicks and deliverability." },
    ],
    process: [
      { title: "Audit", body: "We review your account, list, flows and results." },
      { title: "Build", body: "Core flows and forms built first." },
      { title: "Campaigns", body: "A regular sending calendar starts." },
      { title: "Improve", body: "Tests and changes based on results." },
    ],
    faqs: [
      { q: "Do you work with Shopify stores?", a: "Yes. Klaviyo and Shopify work closely together, and most of our Klaviyo work is for Shopify stores." },
      { q: "Can you move us from Mailchimp to Klaviyo?", a: "Yes. We move your lists and consent, rebuild your flows and templates, and warm up sending." },
      { q: "How often should we send campaigns?", a: "It depends on your products and audience. Many stores send weekly, but we start at a pace your list can handle and adjust." },
      { q: "Do you write and design the emails?", a: "Yes. We handle copy, design and setup, and send drafts for your approval." },
    ],
    articles: ["increase-shopify-conversion-rate", "shopify-store-cost"],
  },
  {
    slug: "email-automation",
    parent: "email-marketing",
    name: "Email Automation",
    metaTitle: "Email Automation Services for Small Business",
    metaDescription:
      "Email automation services: welcome series, lead nurture, follow-ups and re-engagement emails that send on their own at the right moment for each person.",
    h1: "Email automation that follows up at the right time, every time",
    intro:
      "Most follow-ups don't need to be sent by hand. We plan and build automated email sequences that welcome new subscribers, nurture leads and bring customers back, so no one slips through the cracks.",
    signs: [
      "New leads get no follow-up until someone remembers",
      "You only email your list when you have news",
      "Customers buy once and never hear from you again",
      "Your emails are the same for every subscriber",
    ],
    included: [
      { title: "Journey map", body: "The key moments where an email helps, from sign-up to repeat purchase." },
      { title: "Welcome series", body: "A short series that introduces your business and next steps." },
      { title: "Lead nurture", body: "Helpful emails that move leads toward a call, quote or purchase." },
      { title: "Behavior triggers", body: "Emails sent when someone visits a page, downloads a guide or goes quiet." },
      { title: "Copy and design", body: "Clear, on-brand emails that work on phones." },
      { title: "Tracking", body: "Opens, clicks and conversions tracked for each sequence." },
    ],
    process: [
      { title: "Map", body: "We map your customer journey and gaps." },
      { title: "Write and design", body: "Emails drafted for your review." },
      { title: "Build and test", body: "Sequences built and tested in your platform." },
      { title: "Improve", body: "Results reviewed and emails refined." },
    ],
    faqs: [
      { q: "Which email platforms do you use?", a: "Klaviyo, Mailchimp, HubSpot, ActiveCampaign and others. We usually work with the platform you already have." },
      { q: "How many emails should a sequence have?", a: "As many as are useful, often three to six. Each email should have a clear purpose." },
      { q: "Can automation connect to our CRM?", a: "Yes. Emails can trigger from CRM stages, and email activity can feed back into the CRM." },
      { q: "Will automated emails feel robotic?", a: "Not if they are written well. We write in your voice and use personal details where they help." },
    ],
    articles: ["how-to-identify-a-business-workflow-worth-automating"],
  },
  {
    slug: "email-deliverability",
    parent: "email-marketing",
    name: "Email Deliverability",
    metaTitle: "Email Deliverability Services: Reach the Inbox",
    metaDescription:
      "Email deliverability services: SPF, DKIM and DMARC setup, list cleaning, sender reputation checks and sending fixes that help your emails reach inboxes.",
    h1: "Email deliverability services that help your emails reach the inbox",
    intro:
      "Great emails don't help if they land in spam. We check your domain setup, sender reputation and list health, fix what's wrong, and set up habits that keep your emails out of the spam folder.",
    signs: [
      "Open rates dropped suddenly",
      "Customers say your emails go to spam",
      "Gmail or Yahoo bulk sender rules worry you",
      "You have never checked SPF, DKIM or DMARC",
    ],
    included: [
      { title: "Domain authentication", body: "SPF, DKIM and DMARC set up and checked for every sending tool." },
      { title: "Reputation check", body: "Sender reputation, blocklists and Google Postmaster data reviewed." },
      { title: "List cleaning", body: "Bounces, inactive and risky addresses removed or re-engaged." },
      { title: "Sending practices", body: "Frequency, segmentation and content reviewed for spam risks." },
      { title: "Unsubscribe and consent", body: "One-click unsubscribe and consent handling checked." },
      { title: "Recovery plan", body: "A step-by-step plan to rebuild reputation if it has been damaged." },
    ],
    process: [
      { title: "Diagnose", body: "We check your domain, tools and data." },
      { title: "Fix", body: "We correct authentication and settings." },
      { title: "Clean", body: "We clean and segment your list." },
      { title: "Monitor", body: "We track inbox placement and reputation." },
    ],
    faqs: [
      { q: "What are SPF, DKIM and DMARC?", a: "They are DNS records that prove your emails really come from you. Major inbox providers now expect them from bulk senders." },
      { q: "Can you guarantee inbox placement?", a: "No one can. Inbox providers decide. We fix the factors you control, which is what improves placement over time." },
      { q: "Will cleaning my list shrink it?", a: "Yes, a little, but sending to people who engage protects your reputation and usually improves results." },
      { q: "How long does recovery take?", a: "Setup fixes take effect quickly. Rebuilding a damaged reputation usually takes a few weeks of careful sending." },
    ],
    articles: [],
  },
];

export function getSubService(parent: string, slug: string) {
  return subServices.find((s) => s.parent === parent && s.slug === slug);
}

export function subServicesFor(parent: string) {
  return subServices.filter((s) => s.parent === parent);
}
