import type { Faq, Service, ServiceGroup, ServiceSlug } from "./types";

export const serviceGroups: { id: ServiceGroup; label: string; description: string }[] = [
  {
    id: "design",
    label: "Design & Commerce",
    description: "Websites, storefronts, and identities customers trust.",
  },
  {
    id: "software",
    label: "Software & Automation",
    description: "Systems built around how your business actually works.",
  },
  {
    id: "marketing",
    label: "Digital Marketing",
    description: "Search and paid acquisition tied to clear objectives.",
  },
];

export const services: Service[] = [
  {
    slug: "web-design-development",
    name: "Web design and development",
    shortName: "Web design & development",
    group: "design",
    menuBlurb: "Responsive websites built around your business.",
    summary: "Fast, accessible websites that explain your offer clearly and turn interest into inquiries.",
    metaTitle: "Web Design and Development Services",
    metaDescription:
      "Website design and development for established businesses: content structure, UX, accessible front ends, CMS setup, and technical SEO foundations.",
    h1: "Websites that explain what you do and make the next step obvious",
    intro:
      "We plan, design, and build websites for businesses that have outgrown their current site. The work starts with what visitors need to understand and what you need them to do, then carries through to a fast, accessible build your team can edit.",
    audience: [
      "Established businesses whose website no longer reflects their services or quality",
      "Service companies that rely on the site to generate qualified inquiries",
      "Teams that struggle to update their current site without a developer",
      "Businesses consolidating several old sites or microsites into one",
    ],
    problemsHeading: "When a website starts holding the business back",
    problems: [
      {
        title: "Visitors can't tell what you offer",
        body: "Services are buried, described in internal language, or spread across pages that overlap. Prospects leave before they find the page that answers their question.",
      },
      {
        title: "Inquiries arrive without context",
        body: "Generic contact forms produce vague messages. Your team spends the first call collecting information the site could have gathered.",
      },
      {
        title: "Every change needs a developer",
        body: "An inflexible theme or page builder makes simple edits risky, so content goes stale and new services never get a proper page.",
      },
      {
        title: "Slow pages and accessibility gaps",
        body: "Heavy scripts, unoptimized images, and inaccessible components frustrate visitors on phones and exclude people who use assistive technology.",
      },
    ],
    deliverables: [
      {
        title: "Content and page architecture",
        body: "A sitemap, page inventory, and content outline for each template, based on your services and the questions buyers ask.",
      },
      {
        title: "UX wireframes and visual design",
        body: "Responsive layouts for key templates, a component library, and type, color, and spacing tokens documented for reuse.",
      },
      {
        title: "Front-end and CMS build",
        body: "A production site built with modern tooling, with editable content types so your team can publish pages without breaking layouts.",
      },
      {
        title: "Inquiry and conversion paths",
        body: "Forms, calls to action, and routing designed around your sales process, including spam protection and delivery to email or CRM.",
      },
      {
        title: "Technical SEO foundations",
        body: "Clean URLs, metadata, structured data where content supports it, XML sitemaps, redirects from old URLs, and crawlable server-rendered pages.",
      },
      {
        title: "Launch, training, and handover",
        body: "Pre-launch QA across devices, an accessibility review, analytics setup, editor training, and documentation of how the site is built.",
      },
    ],
    visual: "web",
    visualCaption:
      "Illustration: a service-business homepage wireframe evolving into a finished layout with a clear headline, service navigation, and an inquiry form.",
    process: [
      {
        title: "Discovery and content audit",
        body: "We review your current site, analytics if available, competitors, and sales conversations to agree on goals, audiences, and the pages that matter most.",
      },
      {
        title: "Architecture and wireframes",
        body: "We define the sitemap and page structures before visual design, so content and layout are solved together.",
      },
      {
        title: "Design system and key pages",
        body: "We design the main templates and the components they share, reviewed with you at agreed milestones.",
      },
      {
        title: "Build and content population",
        body: "We build in staged environments, connect the CMS and forms, and migrate or write content as agreed in scope.",
      },
      {
        title: "QA, launch, and redirects",
        body: "We test across browsers and devices, check accessibility and performance, map old URLs to new ones, and launch with monitoring in place.",
      },
    ],
    scopeFactors: [
      "Number of unique page templates versus repeated pages",
      "Whether we write, edit, or migrate content",
      "CMS choice and the editing flexibility your team needs",
      "Integrations such as CRM, booking, or marketing automation",
      "Multilingual or right-to-left language support",
      "Volume of existing URLs that need redirect mapping",
    ],
    technologies: [
      { label: "Front end", items: ["Next.js", "React", "TypeScript", "Tailwind CSS"] },
      { label: "Content management", items: ["Headless CMS options", "WordPress", "Webflow (where suitable)"] },
      { label: "Quality", items: ["Lighthouse", "axe accessibility checks", "Search Console"] },
    ],
    faqs: [
      {
        q: "Do you redesign existing sites or only build new ones?",
        a: "Both. Many projects are redesigns. We start by auditing what exists so useful content and search history are kept, and we map old URLs to new ones before launch.",
      },
      {
        q: "Which CMS will you use?",
        a: "It depends on who edits the site and how often. We recommend a platform after discovery and explain the trade-offs, including hosting and long-term maintenance.",
      },
      {
        q: "Will we be able to edit the website ourselves?",
        a: "Yes. Editable content types and training are part of the handover. Changes that alter layouts or add new functionality may still need development.",
      },
      {
        q: "Do you write the content?",
        a: "We can. Copywriting is scoped separately from design and development, because the effort depends on how much material you already have.",
      },
      {
        q: "Does a new website improve search rankings?",
        a: "A well-built site removes technical obstacles and gives search engines clear, useful pages. Rankings also depend on competition, content, and links, so we don't promise positions.",
      },
    ],
    related: ["seo", "branding", "paid-advertising"],
    articles: ["prepare-before-redesigning-your-business-website"],
    workSlug: "northgate-property-care",
    clientInputs: [
      "Access to your current site, analytics, and Search Console",
      "Your services, pricing logic, and the questions customers ask before buying",
      "Brand assets, or a decision to include branding in scope",
      "One person who can approve content and design decisions",
    ],
    afterLaunch:
      "You get editor training, documentation, and accounts in your name. We monitor for broken links and redirect errors in the first weeks, and can stay on for maintenance or conversion improvements if you want ongoing help.",
    cta: {
      heading: "Planning a new website or a redesign?",
      body: "Share your current site and what isn't working. We'll respond with questions and a suggested next step.",
    },
  },
  {
    slug: "shopify-development",
    name: "Shopify development",
    shortName: "Shopify development",
    group: "design",
    menuBlurb: "Custom storefronts, theme development, and integrations.",
    summary: "Shopify storefronts, theme work, integrations, and migrations focused on removing buying friction.",
    metaTitle: "Shopify Development Agency: Build & Grow",
    metaDescription:
      "Shopify development agency for ecommerce brands: store builds, theme customisation, migrations, app and ERP integrations, and speed fixes.",
    h1: "Shopify stores that make products easy to find, understand, and buy",
    intro:
      "We design and develop Shopify storefronts, extend themes, connect the systems behind your store, and migrate catalogs from other platforms. Our focus is the path from first visit to checkout, and the operations that support it.",
    audience: [
      "Ecommerce brands moving to Shopify from another platform",
      "Shopify merchants whose theme has become hard to change",
      "Brands with large or complex catalogs that need better navigation",
      "Retailers connecting Shopify to inventory, fulfillment, or ERP systems",
    ],
    problemsHeading: "Where Shopify stores lose customers",
    problems: [
      {
        title: "Shoppers can't find the right product",
        body: "Collections mirror internal categories rather than how customers shop. Filters are missing or unreliable, and search returns poor matches.",
      },
      {
        title: "Product pages don't answer key questions",
        body: "Sizing, materials, delivery, and returns are hidden or inconsistent, which creates hesitation and support tickets.",
      },
      {
        title: "The theme fights every change",
        body: "Years of edits and stacked apps leave a slow theme where small changes break unrelated pages.",
      },
      {
        title: "Store data lives in disconnected tools",
        body: "Orders, inventory, and customer data are copied manually between Shopify and other systems, causing errors and delays.",
      },
    ],
    deliverables: [
      {
        title: "Storefront UX review",
        body: "A prioritized review of navigation, collections, search, product pages, cart, and mobile behavior, with recommended fixes.",
      },
      {
        title: "Theme design and development",
        body: "Online Store 2.0 sections and blocks your team can rearrange, built on a maintained base theme or a custom one where justified.",
      },
      {
        title: "Product discovery",
        body: "Collection structure, filtering with metafields, and search configuration designed around how customers compare products.",
      },
      {
        title: "Integrations and apps",
        body: "App selection and cleanup, plus integrations with ERP, inventory, reviews, subscriptions, or fulfillment through APIs and middleware.",
      },
      {
        title: "Platform migration",
        body: "Product, customer, and order data migration with URL redirects, SEO checks, and a tested cutover plan.",
      },
      {
        title: "Ongoing optimization",
        body: "A monthly backlog of experiments and improvements, measured against agreed store metrics.",
      },
    ],
    visual: "shopify",
    visualCaption:
      "Illustration: a fictional homeware store showing collection filtering, a product detail page with delivery information, and a cart drawer.",
    process: [
      {
        title: "Store and data audit",
        body: "We review analytics, theme code, installed apps, catalog structure, and customer service themes to find where friction occurs.",
      },
      {
        title: "Journey and catalog design",
        body: "We redesign navigation, collections, and product templates around how customers choose, then validate the structure with your team.",
      },
      {
        title: "Theme development",
        body: "We build reusable sections in a development theme, with preview links for review at each milestone.",
      },
      {
        title: "Integration and data work",
        body: "We connect required systems, migrate data where needed, and test order flows end to end.",
      },
      {
        title: "Launch and iteration",
        body: "We publish during low-traffic windows, monitor checkout and errors, then prioritize improvements from real behavior.",
      },
    ],
    scopeFactors: [
      "Catalog size, variant complexity, and metafield needs",
      "Customizing an existing theme versus building a new one",
      "Number and complexity of third-party integrations",
      "Migration source platform and data volume",
      "Markets, currencies, and languages served",
      "Shopify plan features in use, such as B2B or Checkout extensibility",
    ],
    technologies: [
      { label: "Shopify", items: ["Online Store 2.0", "Liquid", "Metafields and metaobjects", "Shopify Functions", "Checkout extensibility"] },
      { label: "Headless (when justified)", items: ["Hydrogen", "Storefront API", "Next.js"] },
      { label: "Integrations", items: ["Admin API", "Webhooks", "ERP and 3PL connectors"] },
    ],
    faqs: [
      {
        q: "Should we customize a theme or build a custom storefront?",
        a: "Most stores are well served by a customized Online Store 2.0 theme. A headless storefront makes sense for specific content, performance, or integration needs, and it costs more to build and maintain. We explain this trade-off in detail in our article on the decision.",
      },
      {
        q: "Can you migrate our store from WooCommerce, Magento, or another platform?",
        a: "Yes. We plan migrations around data mapping, redirects, and testing, and we agree what moves, what is archived, and when the cutover happens.",
      },
      {
        q: "Will you remove apps we no longer need?",
        a: "Yes. App audits often uncover overlapping apps and leftover code that slows the store. We remove apps carefully and replace them with native features where possible.",
      },
      {
        q: "Do you work with Shopify Plus stores?",
        a: "Yes. We scope Plus-specific features such as Checkout extensibility, B2B, and expansion stores based on what your plan includes.",
      },
      {
        q: "Can you guarantee a higher conversion rate?",
        a: "No. We identify and remove friction and measure the effect, but results depend on traffic, product, pricing, and market factors outside the storefront.",
      },
    ],
    related: ["web-design-development", "paid-advertising", "seo"],
    articles: ["how-to-choose-a-shopify-development-agency", "migrate-to-shopify-without-losing-seo", "shopify-theme-customization-or-custom-storefront"],
    workSlug: "hearthline-homeware",
    clientInputs: [
      "Staff access to your Shopify admin and any connected apps",
      "Product data, or a list of where it currently lives",
      "Your shipping, returns, and fulfilment rules",
      "Access to ERP, inventory, or 3PL systems we need to integrate",
    ],
    afterLaunch:
      "We watch checkout, apps, and error logs closely after launch, then hand over a theme your team can edit with documented sections. Optional monthly work covers testing, app reviews, and seasonal updates.",
    cta: {
      heading: "Tell us what's slowing your store down",
      body: "Share your store URL and the problem you most want solved. We'll review it before we talk.",
    },
  },
  {
    slug: "custom-software-development",
    name: "Custom software development",
    shortName: "Custom software",
    group: "software",
    menuBlurb: "Applications, portals, and tools for your workflows.",
    summary: "Internal tools, portals, and integrations designed around your workflows rather than generic software.",
    metaTitle: "Custom Software Development",
    metaDescription:
      "Custom software for businesses: discovery, workflow design, web applications, dashboards, portals, integrations, testing, and long-term maintenance.",
    h1: "Custom software built around the way your business actually works",
    intro:
      "When spreadsheets, email threads, and disconnected tools limit how your team operates, we design and build web applications that fit the workflow. That includes internal tools, client portals, dashboards, and integrations, with testing and maintenance planned from the start.",
    audience: [
      "Operations teams managing critical work in spreadsheets and email",
      "Businesses that need a customer or partner portal",
      "Companies whose off-the-shelf software no longer fits their process",
      "Teams that need several existing systems to share data reliably",
    ],
    problemsHeading: "Signs a business has outgrown its tools",
    problems: [
      {
        title: "The process lives in someone's head",
        body: "Work depends on a few people who know which spreadsheet is current and which steps to follow. Mistakes surface late and onboarding is slow.",
      },
      {
        title: "The same data is entered twice",
        body: "Staff re-key orders, jobs, or customer details between systems, creating delays and inconsistencies.",
      },
      {
        title: "Managers can't see status without asking",
        body: "There is no reliable view of what is in progress, overdue, or blocked, so reporting takes hours.",
      },
      {
        title: "Software forces workarounds",
        body: "Generic tools solve most of the problem, but the remaining steps require manual workarounds that grow with the business.",
      },
    ],
    deliverables: [
      {
        title: "Discovery and workflow mapping",
        body: "Documented current and future workflows, user roles, data entities, and the priority features for a first release.",
      },
      {
        title: "Product and interface design",
        body: "Clickable prototypes for key tasks, tested with the people who will use the software.",
      },
      {
        title: "Architecture and technical plan",
        body: "Recommended stack, hosting, data model, security approach, and integration design, written down and explained.",
      },
      {
        title: "Application development",
        body: "A web application developed in iterations, with access control, audit trails where needed, and automated tests for critical paths.",
      },
      {
        title: "Integrations",
        body: "API connections to accounting, CRM, ecommerce, or logistics systems, with error handling and logging.",
      },
      {
        title: "Deployment, documentation, and support",
        body: "Production deployment, backups, monitoring, technical documentation, and an agreed maintenance arrangement.",
      },
    ],
    visual: "software",
    visualCaption:
      "Illustration: an operations dashboard with a job pipeline, a record detail panel, and connected systems for accounting and inventory, using labeled sample data.",
    process: [
      {
        title: "Discovery",
        body: "We interview the people who do the work, map the workflow, and identify where software will remove the most effort or risk.",
      },
      {
        title: "Scope and architecture",
        body: "We define a first release that is useful on its own, and document the technical approach before development begins.",
      },
      {
        title: "Iterative development",
        body: "We build in short cycles with working demos, so priorities can change based on what you see.",
      },
      {
        title: "Testing and rollout",
        body: "We test with real scenarios, migrate data, train users, and roll out in a controlled way, sometimes alongside the old process at first.",
      },
      {
        title: "Maintenance and evolution",
        body: "We monitor, patch dependencies, fix issues, and plan the next set of features from usage.",
      },
    ],
    scopeFactors: [
      "Number of user roles and permission rules",
      "Complexity of business logic and edge cases",
      "Number and quality of systems to integrate",
      "Data migration from spreadsheets or legacy systems",
      "Security, compliance, and data residency requirements",
      "Expected usage volume and availability needs",
    ],
    technologies: [
      { label: "Application", items: ["TypeScript", "Node.js", "Next.js", "React"] },
      { label: "Data", items: ["PostgreSQL", "Prisma or Drizzle", "Background job queues"] },
      { label: "Infrastructure", items: ["Vercel", "AWS", "Docker", "CI/CD pipelines"] },
    ],
    faqs: [
      {
        q: "Should we buy software or build it?",
        a: "Buy whenever an existing product fits your process well enough. Custom software is justified when the workflow is a competitive advantage, existing tools force costly workarounds, or integration needs aren't met. Discovery helps answer this before you commit to a build.",
      },
      {
        q: "Who owns the code?",
        a: "Ownership terms are set in the contract. Our standard approach is that you own the code and data for software we build for you, with third-party licenses noted.",
      },
      {
        q: "How do you keep scope under control?",
        a: "We define a first release with clear acceptance criteria, keep a visible backlog, and discuss new requests against priorities and budget instead of absorbing them silently.",
      },
      {
        q: "Can you work with our existing systems?",
        a: "Usually, if they provide an API or data export. We assess integration options during discovery and flag limitations early.",
      },
      {
        q: "What happens after launch?",
        a: "Software needs maintenance: security updates, dependency upgrades, bug fixes, and hosting oversight. We agree on a support arrangement before launch.",
      },
    ],
    related: ["ai-automation", "web-design-development", "shopify-development"],
    articles: ["how-to-identify-a-business-workflow-worth-automating"],
    workSlug: "relay-freight-operations",
    clientInputs: [
      "Time with the people who do the work today, not only managers",
      "Example data, documents, and the spreadsheets the software will replace",
      "API access or documentation for systems we need to connect",
      "A product owner who can prioritise features and accept releases",
    ],
    afterLaunch:
      "Software needs care: security patches, dependency updates, backups, and fixes. We agree a maintenance arrangement before launch, and plan the next release from how people actually use the first one.",
    cta: {
      heading: "Describe the process you want to fix",
      body: "Tell us who is involved, which tools you use today, and where things break down.",
    },
  },
  {
    slug: "seo",
    name: "Search engine optimization",
    shortName: "SEO",
    group: "marketing",
    menuBlurb: "Technical SEO and content that support discoverability.",
    summary: "Technical foundations, intent-led content, and site structure that help the right buyers find you.",
    metaTitle: "SEO Services: Technical, Content & Structure",
    metaDescription:
      "SEO for businesses: technical audits, search intent research, content planning, internal linking, and measurement focused on qualified traffic.",
    h1: "SEO that makes your expertise easy for search engines and buyers to understand",
    intro:
      "We improve how search engines crawl, understand, and present your site, and we plan content that answers what your buyers search for. The work connects technical fixes, page structure, and content to the commercial pages that matter.",
    audience: [
      "Service businesses that depend on people finding them through search",
      "Ecommerce brands with collection and product pages that underperform",
      "Companies preparing a redesign or migration that could affect search visibility",
      "Teams publishing content without a clear plan or measurement",
    ],
    problemsHeading: "Common reasons a site underperforms in search",
    problems: [
      {
        title: "Technical issues block crawling",
        body: "Duplicate URLs, broken redirects, slow pages, or rendering problems make it harder for search engines to find and index important pages.",
      },
      {
        title: "Pages don't match search intent",
        body: "A page targets a topic, but the content doesn't answer what searchers actually need, so it struggles to rank or convert.",
      },
      {
        title: "Content isn't connected",
        body: "Articles are published without links to related services, so educational traffic rarely leads to an inquiry.",
      },
      {
        title: "Progress can't be measured",
        body: "Reports show traffic totals, but not which pages produce qualified visits or leads.",
      },
    ],
    deliverables: [
      {
        title: "Technical SEO audit",
        body: "Crawlability, indexation, redirects, canonicals, structured data, page speed, and rendering issues, prioritized by impact and effort.",
      },
      {
        title: "Search intent and topic research",
        body: "Mapping of the questions and terms buyers use to the pages that should answer them, using data from search tools and your own analytics.",
      },
      {
        title: "Site structure and internal linking",
        body: "A clear hierarchy for services, categories, and supporting content, with links that pass context between related pages.",
      },
      {
        title: "On-page improvements",
        body: "Titles, descriptions, headings, and content revisions on priority pages, written for people first.",
      },
      {
        title: "Content plan and briefs",
        body: "A prioritized content calendar with briefs covering intent, outline, sources, and the commercial page each piece supports.",
      },
      {
        title: "Measurement and reporting",
        body: "Search Console and analytics configuration, with reports on visibility, landing pages, and inquiries from organic search.",
      },
    ],
    visual: "seo",
    visualCaption:
      "Illustration: a site structure diagram with a service page at the center, linked supporting articles, and categories arranged by search intent.",
    process: [
      {
        title: "Audit and baseline",
        body: "We assess technical health, content, and current visibility, and record a baseline for later comparison.",
      },
      {
        title: "Priorities",
        body: "We agree on target pages and topics based on commercial value, intent, and realistic competition.",
      },
      {
        title: "Fix foundations",
        body: "We resolve technical issues and structural problems first, because they affect every page.",
      },
      {
        title: "Improve and create content",
        body: "We revise priority pages and produce new content according to the plan.",
      },
      {
        title: "Measure and adjust",
        body: "We review performance monthly and adjust priorities based on what search data shows.",
      },
    ],
    scopeFactors: [
      "Site size and number of templates",
      "Severity of technical issues found",
      "Whether your platform allows the necessary changes",
      "Volume of content to revise or create",
      "Competitiveness of the topics you need to cover",
      "Number of markets and languages",
    ],
    technologies: [
      { label: "Tools", items: ["Google Search Console", "Google Analytics 4", "Site crawlers", "Lighthouse and PageSpeed Insights"] },
    ],
    faqs: [
      {
        q: "How long does SEO take?",
        a: "Technical fixes can be completed quickly, but search engines take time to recrawl pages and rankings shift gradually. Most businesses should plan for a sustained effort over several months before judging results.",
      },
      {
        q: "Can you guarantee first-page rankings?",
        a: "No. Nobody controls search engine rankings. We focus on the factors we can improve and report honestly on the results.",
      },
      {
        q: "Do you build backlinks?",
        a: "We don't buy links or use link schemes. We focus on content and digital PR opportunities that earn links legitimately, scoped as a separate activity when appropriate.",
      },
      {
        q: "Will you write our content?",
        a: "We can write it, edit drafts from your team, or provide briefs for your writers. Subject-matter input from your team generally makes content stronger.",
      },
      {
        q: "Can you help with a site migration?",
        a: "Yes. Migrations are a common cause of lost visibility. We plan redirects, preserve important content, and monitor indexing after launch.",
      },
    ],
    related: ["web-design-development", "paid-advertising", "shopify-development"],
    articles: ["prepare-before-redesigning-your-business-website"],
    clientInputs: [
      "Access to Search Console, analytics, and your CMS",
      "Your most valuable services or products, in order of priority",
      "Subject-matter input or review for content we write",
      "Permission to make technical changes, or a developer contact",
    ],
    afterLaunch:
      "SEO is ongoing. Monthly work continues on the plan: fixing new technical issues, improving priority pages, and publishing content. Reports show visibility, landing pages, and organic inquiries, with what we did and why.",
    cta: {
      heading: "Want a clearer view of your search performance?",
      body: "Share your website and the services you most want to be found for.",
    },
  },
  {
    slug: "paid-advertising",
    name: "Paid advertising",
    shortName: "Paid advertising",
    group: "marketing",
    menuBlurb: "Search and social campaigns with clear measurement.",
    summary: "Search and social campaigns with reliable tracking, focused landing pages, and disciplined optimization.",
    metaTitle: "Paid Advertising: Google Ads and Paid Social",
    metaDescription:
      "Paid advertising management: conversion tracking, campaign structure, ad creative, landing pages, and ongoing optimization for Google and Meta campaigns.",
    h1: "Paid advertising built on accurate tracking and pages worth clicking through to",
    intro:
      "We plan, build, and manage paid campaigns on search and social platforms. Before increasing spend, we make sure conversions are tracked correctly and the landing page matches the promise in the ad.",
    audience: [
      "Service businesses that need a steady flow of qualified leads",
      "Ecommerce brands advertising products on Google and Meta",
      "Companies that have run ads but cannot tell what is working",
      "Teams launching a new service or market and needing early demand signals",
    ],
    problemsHeading: "Why ad spend often disappears without clear results",
    problems: [
      {
        title: "Tracking is incomplete or wrong",
        body: "Conversions are double-counted, missing, or limited to form views, so platforms optimize toward the wrong signal.",
      },
      {
        title: "Ads send people to generic pages",
        body: "Clicks land on a homepage or broad service page that doesn't match the search or offer, so visitors leave.",
      },
      {
        title: "Campaign structure hides waste",
        body: "Broad targeting and mixed intent in the same campaigns make it hard to see which searches or audiences produce leads.",
      },
      {
        title: "Creative stops performing",
        body: "The same ads run for months, and nobody has time to test new angles or formats.",
      },
    ],
    deliverables: [
      {
        title: "Tracking audit and setup",
        body: "Conversion actions, tag configuration, consent-aware measurement, and offline conversion imports where your CRM supports them.",
      },
      {
        title: "Campaign strategy and structure",
        body: "Campaigns organized by intent, product, or audience, with budgets aligned to agreed objectives.",
      },
      {
        title: "Ad copy and creative",
        body: "Search ads, social ad concepts, and creative variations designed for testing.",
      },
      {
        title: "Landing pages",
        body: "Focused pages designed and built for specific campaigns, with fast load times and short forms.",
      },
      {
        title: "Ongoing management",
        body: "Search term reviews, negative keywords, bid and budget adjustments, audience refinement, and creative testing.",
      },
      {
        title: "Clear reporting",
        body: "Reports that connect spend to leads or sales and explain what changed and why.",
      },
    ],
    visual: "ads",
    visualCaption:
      "Illustration: a search ad leading to a dedicated landing page and a tracked inquiry, with the campaign, page, and conversion steps labeled.",
    process: [
      {
        title: "Audit and objectives",
        body: "We review existing accounts, tracking, and landing pages, and agree on what a valuable conversion is.",
      },
      {
        title: "Measurement first",
        body: "We fix or set up tracking so every later decision is based on reliable data.",
      },
      {
        title: "Build and launch",
        body: "We create campaigns, ads, and landing pages, then launch with controlled budgets.",
      },
      {
        title: "Optimize",
        body: "We review performance weekly, cut waste, and test new copy, creative, and audiences.",
      },
      {
        title: "Report and plan",
        body: "Monthly reviews cover results, lessons, and next steps.",
      },
    ],
    scopeFactors: [
      "Number of platforms and campaigns",
      "Monthly ad spend and how often it changes",
      "Creative volume needed per month",
      "Whether new landing pages are required",
      "Tracking complexity, including CRM or offline conversions",
      "Number of markets and languages",
    ],
    technologies: [
      { label: "Platforms", items: ["Google Ads", "Meta Ads", "LinkedIn Ads (B2B)"] },
      { label: "Measurement", items: ["Google Tag Manager", "Google Analytics 4", "Server-side tagging where appropriate"] },
    ],
    faqs: [
      {
        q: "What budget do we need?",
        a: "It depends on your market, competition, and goals. We'll discuss a test budget that can produce enough data to learn from, and we won't recommend spend we can't justify.",
      },
      {
        q: "Is ad spend included in your fees?",
        a: "No. Ad spend is paid directly to the platforms from your account. Our fees cover strategy, setup, management, and creative.",
      },
      {
        q: "Do we keep ownership of our ad accounts?",
        a: "Yes. Accounts should be owned by your business, with access granted to us. You keep the account, history, and data if we stop working together.",
      },
      {
        q: "Can you guarantee a return on ad spend?",
        a: "No. Advertising outcomes depend on your offer, pricing, market, and competitors as well as campaign management. We set realistic targets and report transparently.",
      },
      {
        q: "Do you create landing pages?",
        a: "Yes. Dedicated landing pages often matter as much as the ads. We design and build them with our web development team.",
      },
    ],
    related: ["seo", "web-design-development", "shopify-development"],
    articles: ["prepare-before-redesigning-your-business-website"],
    clientInputs: [
      "Admin access to ad accounts owned by your business (we can set them up)",
      "Clear rules for what counts as a qualified lead or sale",
      "Your monthly ad budget, paid directly to the platforms",
      "Product photography or brand assets for creative",
    ],
    afterLaunch:
      "Media spend is paid by you directly to Google, Meta, or LinkedIn and is separate from our fees. Management continues weekly, with search term reviews, creative tests, and budget changes, and a monthly review of results against agreed targets.",
    cta: {
      heading: "Planning or reviewing paid campaigns?",
      body: "Tell us which platforms you use, what you sell, and what counts as a good lead.",
    },
  },
  {
    slug: "branding",
    name: "Branding and visual identity",
    shortName: "Branding & identity",
    group: "design",
    menuBlurb: "Distinctive identities with practical brand guidelines.",
    summary: "Positioning, naming support, and visual identity systems that work consistently across every channel.",
    metaTitle: "Branding and Visual Identity",
    metaDescription:
      "Branding for growing businesses: positioning, messaging, logo and visual identity systems, brand guidelines, and digital-first brand assets.",
    h1: "A brand identity that helps buyers recognize you and understand what you stand for",
    intro:
      "We help businesses clarify their positioning and express it through a consistent visual identity. The output is a usable system, not just a logo: messaging, typography, color, imagery direction, and templates your team can apply.",
    audience: [
      "Businesses whose identity no longer matches their quality or ambitions",
      "New ventures and spin-offs that need an identity before launch",
      "Companies with inconsistent materials created by different suppliers",
      "Businesses entering new markets and needing a clearer story",
    ],
    problemsHeading: "When the brand creates doubt instead of confidence",
    problems: [
      {
        title: "You look smaller than you are",
        body: "Dated or inconsistent visuals make an experienced business appear less established than its competitors.",
      },
      {
        title: "Nobody describes the business the same way",
        body: "Sales, the website, and proposals each use different words, so prospects get a fuzzy picture.",
      },
      {
        title: "Every new asset starts from scratch",
        body: "Without guidelines and templates, designers and staff improvise, and consistency erodes.",
      },
      {
        title: "The identity doesn't work on screens",
        body: "Logos that fail at small sizes, unreadable color combinations, and fonts without web licenses cause problems online.",
      },
    ],
    deliverables: [
      {
        title: "Positioning and messaging",
        body: "A positioning statement, value proposition, key messages by audience, and voice guidelines.",
      },
      {
        title: "Logo and wordmark",
        body: "A primary logo, variations for different spaces, and a symbol where useful, tested at small sizes.",
      },
      {
        title: "Visual identity system",
        body: "Typography, accessible color palette, layout principles, iconography, and imagery direction.",
      },
      {
        title: "Brand guidelines",
        body: "A practical guide explaining how to apply the identity, with correct and incorrect examples.",
      },
      {
        title: "Core brand assets",
        body: "Templates for presentations, social media, documents, and email signatures, as scoped.",
      },
      {
        title: "Digital design tokens",
        body: "Color, type, and spacing values ready for use in websites and products.",
      },
    ],
    visual: "branding",
    visualCaption:
      "Illustration: a brand system sheet showing a logo lockup, an accessible color palette with contrast labels, a type scale, and application examples.",
    process: [
      {
        title: "Discovery",
        body: "Workshops and interviews to understand your business, customers, competitors, and ambitions.",
      },
      {
        title: "Positioning",
        body: "We define and agree on the strategic foundation before any visual work.",
      },
      {
        title: "Identity concepts",
        body: "We present distinct directions with rationale, then refine the chosen route.",
      },
      {
        title: "System development",
        body: "We extend the identity into a full system and test it on real applications.",
      },
      {
        title: "Guidelines and rollout",
        body: "We deliver guidelines and assets and help plan how the brand is introduced.",
      },
    ],
    scopeFactors: [
      "Whether positioning work is needed or already defined",
      "Refresh of an existing identity versus a new one",
      "Number of brand applications and templates",
      "Naming support and trademark screening (screening requires legal counsel)",
      "Number of sub-brands or product lines",
      "Languages and scripts the identity must support, including Arabic",
    ],
    faqs: [
      {
        q: "Do you only design logos?",
        a: "We design complete identity systems. A logo alone rarely solves inconsistency; guidelines, typography, and templates do most of the practical work.",
      },
      {
        q: "Can you refresh our brand without starting over?",
        a: "Yes. Many businesses benefit from an evolution that keeps recognizable elements while fixing problems.",
      },
      {
        q: "Can the identity support Arabic?",
        a: "Yes, if scoped from the start. Bilingual identities need typography and layouts designed for both scripts and reading directions.",
      },
      {
        q: "Do you handle trademark registration?",
        a: "No. We can avoid obvious conflicts during design, but trademark searches and registration should be handled by a qualified attorney.",
      },
      {
        q: "What files will we receive?",
        a: "Vector and raster logo files, color and type specifications, guidelines, and the templates included in scope, organized for your team.",
      },
    ],
    related: ["web-design-development", "shopify-development", "paid-advertising"],
    articles: ["prepare-before-redesigning-your-business-website"],
    clientInputs: [
      "Time with founders or leaders for positioning workshops",
      "Honest views on competitors and why customers choose you",
      "Existing brand materials, including the ones you dislike",
      "A small group who can make the final decision",
    ],
    afterLaunch:
      "You receive organised files, guidelines, and templates. We can help roll the brand out across your website, signage, and marketing, and review early applications by your team or other suppliers.",
    cta: {
      heading: "Ready to make your brand match your business?",
      body: "Tell us what has changed in your business and where your current identity falls short.",
    },
  },
  {
    slug: "ai-automation",
    name: "AI automation and integrations",
    shortName: "AI automation",
    group: "software",
    menuBlurb: "Connected workflows with practical human oversight.",
    summary: "Workflow automation and AI-assisted processes with human review, error handling, and careful data use.",
    metaTitle: "AI Automation and Business Integrations",
    metaDescription:
      "AI automation for businesses: workflow assessment, system integrations, AI-assisted document and inquiry processing, human review steps, and monitoring.",
    h1: "Automation that removes repetitive work while keeping people in control",
    intro:
      "We identify workflows that are worth automating, connect the systems involved, and use AI where it is genuinely useful, such as classifying requests, extracting details from documents, or drafting responses. Every automation has a defined owner, review step where needed, and a plan for when something fails.",
    audience: [
      "Teams spending hours on repetitive data entry or copying between tools",
      "Businesses handling high volumes of inquiries, documents, or support requests",
      "Operations managers who want to reduce errors in routine processes",
      "Companies exploring AI but unsure where it is appropriate",
    ],
    problemsHeading: "Where manual work slows operations",
    problems: [
      {
        title: "Routine work consumes skilled people",
        body: "Experienced staff spend time sorting emails, re-entering data, and producing routine reports.",
      },
      {
        title: "Handoffs cause delays",
        body: "Work waits in inboxes between steps, and requests are missed when someone is unavailable.",
      },
      {
        title: "AI experiments don't reach production",
        body: "Promising demos stall because nobody planned for accuracy checks, data privacy, or what happens when the model is wrong.",
      },
      {
        title: "Fragile automations break silently",
        body: "Existing scripts and no-code flows fail without alerts, so errors are discovered by customers.",
      },
    ],
    deliverables: [
      {
        title: "Automation assessment",
        body: "A review of candidate workflows, scored by volume, rules, risk, and data availability, with recommended starting points.",
      },
      {
        title: "Workflow design",
        body: "Documented triggers, steps, decision rules, human review points, and exception handling for each automation.",
      },
      {
        title: "System integrations",
        body: "Connections between your CRM, email, forms, accounting, ecommerce, or internal tools using APIs and webhooks.",
      },
      {
        title: "AI-assisted processing",
        body: "Classification, extraction, summarization, or drafting steps with prompts, evaluations, and confidence thresholds.",
      },
      {
        title: "Monitoring and recovery",
        body: "Logging, alerting, retry logic, and a dashboard or report showing what ran and what needs attention.",
      },
      {
        title: "Documentation and training",
        body: "Runbooks explaining how each automation works, who owns it, and how to pause or adjust it.",
      },
    ],
    visual: "automation",
    visualCaption:
      "Illustration: an automation flow from a trigger (new inquiry), through AI classification, to a human review step, and on to actions in a CRM and email.",
    process: [
      {
        title: "Assess workflows",
        body: "We observe how work is done today and choose automations where value is clear and risk is manageable.",
      },
      {
        title: "Design with oversight",
        body: "We define where humans review or approve, what data is used, and how errors are handled.",
      },
      {
        title: "Build and evaluate",
        body: "We build the automation and test it against real examples, measuring accuracy before going live.",
      },
      {
        title: "Pilot",
        body: "We run with limited scope or in parallel with the manual process, then expand once results are verified.",
      },
      {
        title: "Monitor and improve",
        body: "We track failures and exceptions and refine the workflow over time.",
      },
    ],
    scopeFactors: [
      "Number of workflows and systems involved",
      "Quality and consistency of the data the automation uses",
      "Whether AI steps are required or rules are enough",
      "Accuracy requirements and the cost of errors",
      "Data privacy, retention, and regional requirements",
      "Expected volume and need for real-time processing",
    ],
    technologies: [
      { label: "Integration", items: ["REST and GraphQL APIs", "Webhooks", "n8n or Make where suitable", "Custom Node.js services"] },
      { label: "AI", items: ["Large language model APIs", "Structured output and evaluation", "Document extraction"] },
    ],
    faqs: [
      {
        q: "Which processes are good candidates for automation?",
        a: "Repetitive, frequent tasks with clear inputs and rules are usually the best starting point. Our article on identifying workflows worth automating explains how to assess them.",
      },
      {
        q: "Do we need AI, or is simple automation enough?",
        a: "Often, rules-based automation is enough and is more predictable. We use AI where inputs are unstructured, such as free-text emails or documents, and add review steps where mistakes matter.",
      },
      {
        q: "What happens with our data?",
        a: "We document which data each automation uses, where it is processed, and how long it is kept. We choose providers and settings to meet your privacy requirements and avoid sending unnecessary personal data.",
      },
      {
        q: "What happens when an automation fails?",
        a: "Each workflow includes error handling, retries where safe, alerts to an owner, and a manual fallback path.",
      },
      {
        q: "Will automation replace our staff?",
        a: "Our aim is to remove repetitive work so people can focus on judgment, customers, and exceptions. How you use the time saved is your decision.",
      },
    ],
    related: ["custom-software-development", "web-design-development", "shopify-development"],
    articles: ["how-to-identify-a-business-workflow-worth-automating"],
    workSlug: "relay-freight-operations",
    clientInputs: [
      "A description of the workflow and examples of real inputs",
      "Access to the systems involved (CRM, inbox, forms, accounting)",
      "Your rules for privacy, data retention, and approvals",
      "An owner who will be alerted when something needs attention",
    ],
    afterLaunch:
      "Every automation is monitored. We review failures and exceptions, adjust prompts and rules as inputs change, and keep runbooks current so your team can pause or change a workflow without us.",
    cta: {
      heading: "Have a process you'd like to automate?",
      body: "Describe the task, how often it happens, and which tools are involved.",
    },
  },
  {
    slug: "crm-integrations",
    name: "CRM and system integrations",
    shortName: "CRM & integrations",
    group: "software",
    menuBlurb: "Connect your CRM, store, and accounting tools.",
    summary: "Reliable connections between your CRM, ecommerce, accounting, and operations tools, so data is entered once.",
    metaTitle: "CRM and System Integrations",
    metaDescription:
      "Integration services for growing businesses: CRM setup and data mapping, Shopify, accounting, and form connections, with monitoring and error handling.",
    h1: "Your tools, connected so data is entered once and trusted everywhere",
    intro:
      "Most businesses already have good software: a CRM, a store, an accounting package, a booking tool. The problem is the gaps between them. We map how data should move, connect the systems through their APIs, and add the monitoring that tells you when something stops syncing.",
    audience: [
      "Teams copying orders, leads, or invoices between systems by hand",
      "Businesses adopting a CRM and needing it fed from the website and store",
      "Companies whose current integrations break silently or duplicate records",
      "Operations that rely on several SaaS tools that were never designed to work together",
    ],
    problemsHeading: "What disconnected systems cost you",
    problems: [
      {
        title: "Re-keyed data and avoidable mistakes",
        body: "Staff type the same customer or order details into two or three tools, and small errors spread into invoices and reports.",
      },
      {
        title: "No single view of a customer",
        body: "Sales, support, and finance each see part of the picture, so nobody can answer simple questions quickly.",
      },
      {
        title: "Fragile connectors",
        body: "Plug-ins and no-code zaps were added one at a time. When one fails, records go missing and nobody is alerted.",
      },
      {
        title: "A CRM nobody trusts",
        body: "Without clean, automatic inputs, the CRM falls out of date and the team goes back to spreadsheets.",
      },
    ],
    deliverables: [
      {
        title: "Systems and data map",
        body: "A diagram of each tool, which one owns each type of record, and how and when data should move between them.",
      },
      {
        title: "CRM setup and clean-up",
        body: "Pipelines, fields, and properties structured around your sales process, with duplicates merged and imports validated.",
      },
      {
        title: "Integrations",
        body: "Connections between your website forms, Shopify, CRM, accounting, email, and booking tools using native features, APIs, or a small integration service.",
      },
      {
        title: "Data mapping and rules",
        body: "Field-by-field mapping, deduplication rules, and clear decisions about which system wins when records conflict.",
      },
      {
        title: "Monitoring and error handling",
        body: "Logging, retries where safe, and alerts to a named owner when a sync fails, instead of silent gaps.",
      },
      {
        title: "Documentation and handover",
        body: "A plain-English description of every connection, how to pause it, and what to check when something looks wrong.",
      },
    ],
    visual: "crm",
    visualCaption:
      "Illustration: an operations interface connected to accounting, inventory, and carrier systems, with sync status shown for each connection.",
    process: [
      {
        title: "Audit the current setup",
        body: "We list every tool, existing connector, and manual hand-off, and find where data is duplicated or lost.",
      },
      {
        title: "Agree the source of truth",
        body: "We decide which system owns customers, orders, products, and invoices, and document the rules.",
      },
      {
        title: "Build and test with real data",
        body: "We build the connections in a test environment and run them against copies of real records before going live.",
      },
      {
        title: "Migrate and switch over",
        body: "We clean and import historical data where needed, then switch the live connections on in a planned order.",
      },
      {
        title: "Monitor and refine",
        body: "We watch the first weeks closely, fix edge cases, and hand over monitoring to your team or keep it under support.",
      },
    ],
    scopeFactors: [
      "Number of systems and the direction of each sync",
      "Whether each tool offers a usable API or export",
      "Volume and quality of existing data to clean or migrate",
      "Real-time versus scheduled syncing",
      "Custom objects or unusual business rules",
      "Licensing limits on the platforms involved",
    ],
    technologies: [
      { label: "Common platforms", items: ["HubSpot", "Salesforce", "Pipedrive", "Shopify", "Xero", "QuickBooks"] },
      { label: "Integration", items: ["REST and GraphQL APIs", "Webhooks", "Make or n8n where suitable", "Custom Node.js services"] },
    ],
    faqs: [
      {
        q: "Should we use a no-code tool or a custom integration?",
        a: "For simple, low-volume flows, a well-built no-code automation is often enough and cheaper to run. Custom code makes sense when volumes are high, rules are complex, or reliability matters more than speed of setup. We recommend per connection.",
      },
      {
        q: "Which CRM should we choose?",
        a: "It depends on your sales process, team size, and the tools it must connect to. We compare options against your requirements and explain running costs, but we have no commercial ties to any CRM vendor.",
      },
      {
        q: "Can you clean up our existing CRM data?",
        a: "Yes. We merge duplicates, standardise fields, and archive what is no longer needed, after agreeing the rules with you and taking a full backup first.",
      },
      {
        q: "What happens if an integration fails?",
        a: "Each connection logs what it does, retries where that is safe, and alerts a named owner. The runbook explains how to pause it and re-run missed records.",
      },
      {
        q: "Is this different from AI automation?",
        a: "Integrations move structured data reliably between systems. AI automation adds judgment steps, such as reading free-text emails. Many projects use both, and we scope them together when they overlap.",
      },
    ],
    related: ["custom-software-development", "ai-automation", "shopify-development"],
    articles: ["how-to-identify-a-business-workflow-worth-automating"],
    workSlug: "relay-freight-operations",
    clientInputs: [
      "Admin access to each system, or an introduction to whoever holds it",
      "Examples of the records that should move, including awkward edge cases",
      "Your rules for which system is correct when data conflicts",
      "A named person to receive alerts and approve changes",
    ],
    afterLaunch:
      "Platforms change their APIs and limits over time. We monitor connections, update them when vendors make changes, and adjust mappings as your process evolves, under a support arrangement agreed before launch.",
    cta: {
      heading: "Tired of typing the same data twice?",
      body: "List the tools you use and where information gets copied by hand. We'll suggest which connections matter most.",
    },
  },
  {
    slug: "conversion-optimization",
    name: "Conversion rate optimisation",
    shortName: "Conversion optimisation",
    group: "marketing",
    menuBlurb: "Turn more existing visitors into inquiries.",
    summary: "Research-led improvements to pages, forms, and checkout so more of your existing visitors take the next step.",
    metaTitle: "Conversion Rate Optimisation (CRO)",
    metaDescription:
      "Conversion rate optimisation for websites and Shopify stores: analytics review, user research, prioritised fixes, A/B testing, and honest reporting.",
    h1: "More inquiries and orders from the visitors you already have",
    intro:
      "Before spending more on traffic, it is usually worth fixing what stops current visitors from acting. We study how people use your site, find the points where they hesitate or leave, and improve those pages, forms, and checkout steps in a measured order.",
    audience: [
      "Businesses spending on ads or SEO whose website converts poorly",
      "Shopify stores with healthy traffic but abandoned carts",
      "Service companies whose contact forms rarely produce good leads",
      "Teams that want decisions based on evidence rather than opinions",
    ],
    problemsHeading: "Where visitors usually give up",
    problems: [
      {
        title: "The offer is unclear",
        body: "Visitors cannot quickly tell what you sell, who it is for, or why they should choose you over the next result.",
      },
      {
        title: "Forms ask too much, too early",
        body: "Long forms, unclear required fields, and error messages that wipe input cause people to give up.",
      },
      {
        title: "Checkout surprises",
        body: "Shipping costs, delivery times, or account requirements appear late and undermine the decision to buy.",
      },
      {
        title: "Changes based on guesswork",
        body: "Redesigns happen because someone dislikes a page, and nobody can say afterwards whether they helped.",
      },
    ],
    deliverables: [
      {
        title: "Analytics and funnel review",
        body: "A check that tracking is accurate, then an analysis of where visitors drop out on key journeys.",
      },
      {
        title: "Qualitative research",
        body: "Session recordings, on-page surveys, and short usability sessions to understand why people hesitate.",
      },
      {
        title: "Prioritised improvement backlog",
        body: "A list of problems and proposed fixes, ranked by expected impact, confidence, and effort.",
      },
      {
        title: "Design and implementation",
        body: "Revised copy, layouts, forms, and checkout steps, designed and built by the same team.",
      },
      {
        title: "Testing where traffic allows",
        body: "A/B tests for pages with enough visitors to reach a reliable answer, and careful before-and-after comparisons where they do not.",
      },
      {
        title: "Plain reporting",
        body: "What we changed, what the data shows, and how confident we are, including changes that did not help.",
      },
    ],
    visual: "cro",
    visualCaption:
      "Illustration: a visitor's path from an ad to a focused landing page and a tracked inquiry, showing where each step is measured.",
    process: [
      {
        title: "Check the measurement",
        body: "We confirm that conversions are tracked correctly, because every later decision depends on it.",
      },
      {
        title: "Research",
        body: "We combine analytics with recordings, surveys, and user sessions to find where and why people leave.",
      },
      {
        title: "Prioritise",
        body: "We agree a short list of changes with you, starting with the biggest problems on the highest-value pages.",
      },
      {
        title: "Change and test",
        body: "We design, build, and release improvements, testing them where traffic is sufficient.",
      },
      {
        title: "Review and repeat",
        body: "Each month we report results and decide the next changes from what we learned.",
      },
    ],
    scopeFactors: [
      "Monthly traffic, which decides whether A/B testing is practical",
      "Number of key journeys and page templates",
      "Platform constraints, such as Shopify checkout limits",
      "Whether development is done by us or your team",
      "Research methods included, such as user sessions",
      "Length of the engagement",
    ],
    technologies: [
      { label: "Research and analytics", items: ["Google Analytics 4", "Microsoft Clarity or Hotjar", "On-page surveys"] },
      { label: "Testing", items: ["A/B testing tools where traffic allows", "Shopify and CMS native features"] },
    ],
    faqs: [
      {
        q: "How much traffic do we need for A/B testing?",
        a: "Enough conversions per variation to reach a dependable result, which many smaller sites do not have. In that case we rely on research, best-practice fixes, and before-and-after comparisons, and we say clearly how confident we are.",
      },
      {
        q: "Can you guarantee a higher conversion rate?",
        a: "No. Conversion depends on your offer, pricing, and market as well as your website. We commit to a rigorous process and honest reporting, including changes that did not work.",
      },
      {
        q: "Is this the same as a redesign?",
        a: "No. CRO improves specific steps based on evidence and keeps what already works. If research shows a deeper problem, we may recommend a redesign, scoped separately.",
      },
      {
        q: "Do you work on Shopify stores?",
        a: "Yes. Product pages, collections, cart, and checkout extensibility are common areas of work, within what your Shopify plan allows.",
      },
      {
        q: "How long before we see results?",
        a: "Fixes to obvious problems can show an effect quickly. Testing programmes need several weeks per test to produce reliable answers, so we plan in months rather than days.",
      },
    ],
    related: ["paid-advertising", "seo", "web-design-development"],
    articles: ["prepare-before-redesigning-your-business-website", "shopify-theme-customization-or-custom-storefront"],
    workSlug: "northgate-property-care",
    clientInputs: [
      "Access to analytics, your CMS or Shopify admin, and any testing tools",
      "What a good lead or order is worth to you",
      "Customer questions and objections your sales or support team hears",
      "Approval to run recordings or surveys, in line with your privacy policy",
    ],
    afterLaunch:
      "CRO is ongoing by nature. We keep a monthly cycle of research, changes, and reporting, and hand over a record of every test and decision so the learning stays with your business.",
    cta: {
      heading: "Getting visits but not enough inquiries?",
      body: "Share your site and the action you want visitors to take. We'll tell you where we would look first.",
    },
  },
  {
    slug: "ui-ux-design",
    name: "UI/UX design",
    shortName: "UI/UX design",
    group: "design",
    menuBlurb: "Research-led interfaces for websites and apps.",
    summary: "User research, information architecture, wireframes, and interface design for websites, apps, and internal tools.",
    metaTitle: "UI/UX Design Services",
    metaDescription:
      "UI/UX design for websites, apps, and software: user research, information architecture, wireframes, prototypes, interface design, and design systems.",
    h1: "Interfaces that make the next step obvious to the people using them",
    intro:
      "Good interface design starts with understanding what people are trying to do. We research your users, structure the information, test ideas as wireframes and prototypes, and turn the result into a consistent interface and design system your developers can build from.",
    audience: [
      "Teams planning a new product, app, or customer portal",
      "Businesses whose software works but confuses customers or staff",
      "In-house developers who need design support before building",
      "Companies preparing a redesign and wanting evidence, not opinions",
    ],
    problemsHeading: "When design is getting in the way",
    problems: [
      {
        title: "Users can't find what they need",
        body: "Menus follow the organisation chart instead of the tasks people come to complete, so they give up or call support.",
      },
      {
        title: "Every screen looks slightly different",
        body: "Without shared components, each new feature invents its own buttons and layouts, and the product feels unfinished.",
      },
      {
        title: "Decisions are made in development",
        body: "Developers fill design gaps under deadline pressure, and changes cost more once code is written.",
      },
      {
        title: "Nobody has watched real users",
        body: "Assumptions about how people use the product go untested until complaints arrive.",
      },
    ],
    deliverables: [
      {
        title: "User research",
        body: "Interviews, task analysis, and a review of existing data to understand who uses the product and why.",
      },
      {
        title: "Information architecture",
        body: "Navigation, content structure, and user flows for the key tasks, agreed before visual design.",
      },
      {
        title: "Wireframes and prototypes",
        body: "Low- and high-fidelity layouts and clickable prototypes, tested with real users where possible.",
      },
      {
        title: "Interface design",
        body: "Polished screens for desktop and mobile, with states for loading, empty, and error cases.",
      },
      {
        title: "Design system",
        body: "Reusable components, tokens, and usage notes so new features stay consistent.",
      },
      {
        title: "Developer handover",
        body: "Annotated designs, interaction notes, and support during build to answer questions quickly.",
      },
    ],
    visual: "ux",
    visualCaption:
      "Illustration: a wireframe evolving into a finished interface with a clear headline, navigation, and a primary action.",
    process: [
      { title: "Research", body: "We learn about your users, their tasks, and where the current experience fails them." },
      { title: "Structure", body: "We map flows and information architecture, and agree priorities with you." },
      { title: "Prototype and test", body: "We test key flows as prototypes and refine them based on what users actually do." },
      { title: "Design", body: "We produce the final interface and the components behind it." },
      { title: "Support the build", body: "We hand over to your developers or ours and review the result before release." },
    ],
    scopeFactors: [
      "Number of user types and key journeys",
      "Amount of research and testing included",
      "Platforms covered: web, iOS, Android, or all three",
      "Whether a design system already exists",
      "Accessibility requirements",
      "Who builds the design: our team or yours",
    ],
    technologies: [{ label: "Tools", items: ["Figma", "FigJam", "Maze or similar for remote testing"] }],
    faqs: [
      {
        q: "What's the difference between UI and UX?",
        a: "UX is how the product works: structure, flows, and whether people can complete their tasks. UI is how it looks and feels: layout, typography, and components. We design both together, because one depends on the other.",
      },
      {
        q: "Do you test designs with real users?",
        a: "Where the budget allows, yes, usually with short remote sessions. Even five users per round reveal most serious problems.",
      },
      {
        q: "Can you design for our existing developers to build?",
        a: "Yes. We hand over annotated Figma files and a component library, and stay available to answer questions during development.",
      },
      {
        q: "Will you follow our existing brand?",
        a: "Yes. We apply your brand to the interface and flag where it needs adjusting for screens, such as colours that fail contrast checks.",
      },
    ],
    related: ["web-design-development", "mobile-app-development", "branding"],
    articles: ["prepare-before-redesigning-your-business-website"],
    workSlug: "hearthline-homeware",
    clientInputs: [
      "Access to analytics and any existing research or support data",
      "Time with users or customers for interviews and tests",
      "Your brand guidelines and any existing design files",
      "A decision-maker for design reviews",
    ],
    afterLaunch:
      "We review how the released design performs, using analytics and feedback, and can support new features through the design system so the product stays consistent as it grows.",
    cta: {
      heading: "Planning a product or redesign?",
      body: "Tell us who uses it and where they struggle. We'll suggest how much research and design it needs.",
    },
  },
  {
    slug: "mobile-app-development",
    name: "Mobile app development",
    shortName: "Mobile apps",
    group: "software",
    menuBlurb: "iOS and Android apps built for real use.",
    summary: "iOS and Android apps for customers or staff, built cross-platform where it makes sense, with the backend and store release included.",
    metaTitle: "Mobile App Development for iOS and Android",
    metaDescription:
      "Mobile app development for businesses: discovery, UX design, cross-platform iOS and Android builds, backend integration, App Store release, and maintenance.",
    h1: "Mobile apps your customers and staff will keep using",
    intro:
      "We plan, design, and build iOS and Android apps, usually from a single cross-platform codebase so you are not paying for the same work twice. That includes the backend and integrations the app depends on, store submission, and the maintenance every app needs after release.",
    audience: [
      "Businesses whose customers repeat an action often enough to justify an app",
      "Field teams who need offline access, photos, or barcode scanning",
      "Companies extending an existing platform or portal to mobile",
      "Ecommerce brands considering an app alongside their store",
    ],
    problemsHeading: "Why many app projects disappoint",
    problems: [
      {
        title: "An app that didn't need to exist",
        body: "Some ideas work better as a mobile-friendly website. An app only pays off when people return to it regularly.",
      },
      {
        title: "Two codebases, twice the cost",
        body: "Separate iOS and Android builds double development and maintenance for features that are identical.",
      },
      {
        title: "Store rejection and late surprises",
        body: "Privacy declarations, review guidelines, and payment rules delay launch when they aren't planned for.",
      },
      {
        title: "No plan after version 1.0",
        body: "Operating system updates break apps that nobody maintains, and reviews suffer.",
      },
    ],
    deliverables: [
      {
        title: "Discovery and app strategy",
        body: "Whether an app is the right answer, which features matter for a first release, and how success will be measured.",
      },
      {
        title: "UX and interface design",
        body: "Flows and screens designed for touch, small screens, and platform conventions on iOS and Android.",
      },
      {
        title: "Cross-platform development",
        body: "One React Native codebase for iOS and Android, with native modules where the app needs device features.",
      },
      {
        title: "Backend and integrations",
        body: "APIs, authentication, push notifications, and connections to your existing systems.",
      },
      {
        title: "Testing and store release",
        body: "Device testing, beta distribution, and App Store and Google Play submission, including privacy disclosures.",
      },
      {
        title: "Analytics and maintenance",
        body: "Crash reporting, usage analytics, OS updates, and a plan for the next releases.",
      },
    ],
    visual: "mobile",
    visualCaption:
      "Illustration: an application interface with a list of records, status markers, and connections to backend systems.",
    process: [
      { title: "Discovery", body: "We confirm the app is worth building and agree the smallest useful first release." },
      { title: "Design", body: "We design and prototype key flows, testing them on real devices." },
      { title: "Build in iterations", body: "We develop in short cycles with test builds you can install on your own phone." },
      { title: "Beta and release", body: "We run a beta with real users, fix issues, and manage store submission." },
      { title: "Maintain and improve", body: "We keep the app compatible with new OS versions and plan updates from usage data." },
    ],
    scopeFactors: [
      "Number of screens and user roles",
      "Device features: camera, location, offline mode, payments",
      "Whether a backend exists or must be built",
      "Integrations with existing systems",
      "Cross-platform build or separate native apps",
      "Store requirements, such as in-app purchase rules",
    ],
    technologies: [
      { label: "App", items: ["React Native", "Expo", "TypeScript", "Swift or Kotlin modules when required"] },
      { label: "Backend", items: ["Node.js", "PostgreSQL", "Firebase where suitable", "Push notification services"] },
    ],
    faqs: [
      {
        q: "Do we need an app or a mobile website?",
        a: "If people use the service occasionally, a fast mobile website is usually better and cheaper. Apps make sense for frequent use, device features, offline access, or notifications. We'll tell you honestly which fits.",
      },
      {
        q: "Native or cross-platform?",
        a: "For most business apps, a cross-platform React Native build gives near-native quality for one codebase. Fully native development suits apps with heavy graphics or deep platform integration.",
      },
      {
        q: "Who owns the app and the store accounts?",
        a: "You do. Apps should be published under your own Apple and Google developer accounts, and code ownership is set out in the contract.",
      },
      {
        q: "Can you guarantee App Store approval?",
        a: "No one can, but we plan for the review guidelines from the start and handle any feedback from Apple or Google.",
      },
    ],
    related: ["custom-software-development", "ui-ux-design", "crm-integrations"],
    articles: ["how-to-identify-a-business-workflow-worth-automating"],
    clientInputs: [
      "Apple and Google developer accounts in your business's name (we can help set them up)",
      "Access to any existing systems or APIs the app must use",
      "Content, branding, and a list of must-have features",
      "A small group of users for beta testing",
    ],
    afterLaunch:
      "Apple and Google release major OS updates every year, and apps need attention to keep working. We agree a maintenance arrangement before launch covering updates, fixes, and monitoring, and plan new versions from real usage.",
    cta: {
      heading: "Thinking about an app?",
      body: "Tell us who would use it and how often. We'll tell you whether an app or a website is the better first step.",
    },
  },
  {
    slug: "email-marketing",
    name: "Email marketing and automation",
    shortName: "Email marketing",
    group: "marketing",
    menuBlurb: "Campaigns and automated flows that bring people back.",
    summary: "Welcome sequences, abandoned-cart flows, newsletters, and campaigns, set up properly and tied to your CRM or store.",
    metaTitle: "Email Marketing and Automation",
    metaDescription:
      "Email marketing for growing businesses: platform setup, deliverability, automated flows, campaign design, list segmentation, and honest reporting.",
    h1: "Email that keeps customers coming back, without becoming noise",
    intro:
      "Email is often the most direct line to people who already know you. We set up your platform and deliverability correctly, build the automated flows that should run on their own, and plan campaigns that respect your subscribers' time.",
    audience: [
      "Ecommerce brands without welcome, abandoned-cart, or post-purchase flows",
      "Service businesses that want to nurture inquiries that aren't ready to buy",
      "Teams sending newsletters that nobody measures",
      "Companies moving to a new email platform",
    ],
    problemsHeading: "Where email usually falls short",
    problems: [
      {
        title: "Emails land in spam",
        body: "Missing authentication records and poor list hygiene quietly reduce how many people ever see your messages.",
      },
      {
        title: "No automated flows",
        body: "Every message is sent by hand, so new subscribers and abandoned carts get no timely follow-up.",
      },
      {
        title: "Everyone gets the same email",
        body: "Without segmentation, messages feel irrelevant and unsubscribes rise.",
      },
      {
        title: "Results aren't tied to revenue",
        body: "Open rates are reported, but nobody knows which emails led to inquiries or orders.",
      },
    ],
    deliverables: [
      {
        title: "Platform and deliverability setup",
        body: "SPF, DKIM, and DMARC records, sending domain configuration, and list import with consent checks.",
      },
      {
        title: "Automated flows",
        body: "Welcome, abandoned cart or inquiry follow-up, post-purchase, and win-back sequences, written and designed.",
      },
      {
        title: "Segmentation",
        body: "Groups based on behaviour, purchase history, or interests, synced from your store or CRM.",
      },
      {
        title: "Templates and design",
        body: "Accessible, on-brand templates that render well in common email clients and on phones.",
      },
      {
        title: "Campaign planning",
        body: "A practical calendar of newsletters and promotions, with copy and design support as scoped.",
      },
      {
        title: "Reporting",
        body: "Results tied to clicks, inquiries, and orders, with recommendations for the next month.",
      },
    ],
    visual: "email",
    visualCaption:
      "Illustration: an automated sequence from a trigger, through processing and a review step, to an action such as sending a message.",
    process: [
      { title: "Audit", body: "We review your platform, list health, deliverability, and existing emails." },
      { title: "Fix the foundations", body: "We set up authentication, consent records, and integrations with your store or CRM." },
      { title: "Build core flows", body: "We create the automated sequences that run every day, starting with the highest-value ones." },
      { title: "Plan campaigns", body: "We agree a sending rhythm and content plan that suits your audience." },
      { title: "Measure and refine", body: "We review results monthly and test subject lines, timing, and content." },
    ],
    scopeFactors: [
      "Number of automated flows and campaigns per month",
      "Whether we write the copy or edit yours",
      "Platform migration and list size",
      "Integrations with Shopify, CRM, or forms",
      "Languages and regions you send to",
      "Consent and privacy requirements in your markets",
    ],
    technologies: [
      { label: "Platforms", items: ["Klaviyo", "Mailchimp", "HubSpot", "Brevo"] },
      { label: "Deliverability", items: ["SPF, DKIM, DMARC", "Google Postmaster Tools"] },
    ],
    faqs: [
      {
        q: "Which email platform should we use?",
        a: "It depends on whether you sell online, which CRM you use, and your list size. Klaviyo suits Shopify stores well; HubSpot or Brevo often suit service businesses. We recommend based on your setup.",
      },
      {
        q: "Can you guarantee open or click rates?",
        a: "No. Results depend on your audience, offer, and list quality. We commit to correct setup, good practice, and honest reporting.",
      },
      {
        q: "Can we email people on our existing customer list?",
        a: "Only if you have the right consent for your markets. We review how contacts were collected and recommend a compliant approach, but legal questions should be confirmed with your advisers.",
      },
      {
        q: "How often should we send?",
        a: "As often as you have something useful to say. Automated flows run continuously; campaigns are usually weekly to monthly, adjusted from engagement data.",
      },
    ],
    related: ["crm-integrations", "conversion-optimization", "shopify-development"],
    articles: ["how-to-identify-a-business-workflow-worth-automating"],
    workSlug: "hearthline-homeware",
    clientInputs: [
      "Admin access to your email platform, store, or CRM",
      "Details of how your contacts gave consent",
      "Brand assets, product information, and offers you plan to run",
      "Someone to approve copy before campaigns send",
    ],
    afterLaunch:
      "Automated flows keep running on their own, but they need reviewing as products and offers change. Ongoing work covers campaigns, flow improvements, list hygiene, and monthly reporting.",
    cta: {
      heading: "Sending email but not sure it's working?",
      body: "Tell us which platform you use and what you send today. We'll suggest the flows worth building first.",
    },
  },
];

export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}

export function getServicesByGroup(group: ServiceGroup) {
  return services.filter((s) => s.group === group);
}

export function servicePath(slug: ServiceSlug) {
  return `/services/${slug}/`;
}

export const serviceOptions = services.map((s) => ({ value: s.slug, label: s.name }));

/** Service name for use mid-sentence: lowercases words but keeps acronyms (SEO, AI). */
export function serviceNoun(service: { shortName: string }) {
  return service.shortName
    .split(" ")
    .map((w) => (w.length > 1 && w === w.toUpperCase() ? w : w.toLowerCase()))
    .join(" ");
}

/**
 * A service's own FAQs plus common questions it doesn't already cover,
 * capped at ten so every service page answers the basics.
 */
export function serviceFaqs(service: Service): Faq[] {
  const asked = service.faqs.map((f) => f.q.toLowerCase()).join(" ");
  const name = serviceNoun(service);
  const common: { skip: RegExp; faq: Faq }[] = [
    {
      skip: /cost|budget|price/,
      faq: {
        q: `How much does a ${name} project cost?`,
        a: "It depends on the scope, so we don't use a fixed price list. After a short call we send a written quote that shows exactly what's included. If you have a set budget, tell us and we'll show you what fits.",
      },
    },
    {
      skip: /how long|timeline|results/,
      faq: {
        q: "How long does it take?",
        a: "It depends on the size of the work and how quickly content and feedback are ready. We agree a schedule with milestones before we start and tell you early if anything changes.",
      },
    },
    {
      skip: /own/,
      faq: {
        q: "Do we own everything at the end?",
        a: "Yes. Accounts, code, designs, and content stay in your name, and we hand over simple guides so your team can manage them.",
      },
    },
    {
      skip: /existing developers|in-house|our team/,
      faq: {
        q: "Can you work with our in-house team?",
        a: "Yes. We can take on one part of the work, share our files and notes, and agree who decides what so handoffs stay clear.",
      },
    },
    {
      skip: /after launch/,
      faq: {
        q: "Do you offer support after launch?",
        a: "Yes. We fix anything that comes up early on, and you can choose ongoing support for updates and improvements. It's optional and agreed separately.",
      },
    },
    {
      skip: /countr|abroad|international/,
      faq: {
        q: "Do you work with businesses in other countries?",
        a: "Yes. We work remotely with clients around the world and plan calls around your time zone.",
      },
    },
  ];
  const extra = common.filter((c) => !c.skip.test(asked)).map((c) => c.faq);
  return [...service.faqs, ...extra].slice(0, 10);
}
