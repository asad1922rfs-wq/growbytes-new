import type { IconName } from "@/components/icons/GbIcon";
import type { NeedIconName } from "@/components/icons/NeedIcon";
import type { Faq, ServiceSlug } from "./types";

export const hero = {
  eyebrow: "Design · Development · Growth",
  /** Deliberate desktop line breaks; the final line takes the accent. */
  headlineLines: ["Marketing that turns", "searches into", "paying customers."],
  body: "We help growing businesses get found on Google, run ads that bring in real leads, and turn more visitors into customers. Every campaign is tracked to inquiries and sales.",
  primary: { label: "Grow my business", href: "/contact/" },
  secondary: { label: "Explore marketing", href: "/services/seo/" },
};

export const capabilities = [
  "Web design & development",
  "Shopify",
  "Custom software",
  "SEO & paid ads",
  "Branding",
  "AI automation",
];

/**
 * Platforms we build on, shown after the hero with their marks (via simple-icons).
 * These are tools we use, not clients: no endorsement is implied.
 */
export const platforms: { name: string; use: string; icon: string }[] = [
  { name: "Shopify", use: "Ecommerce", icon: "shopify" },
  { name: "Google", use: "Search & ads", icon: "google" },
  { name: "HubSpot", use: "CRM", icon: "hubspot" },
  { name: "Salesforce", use: "CRM", icon: "salesforce" },
  { name: "Meta", use: "Paid social", icon: "meta" },
  { name: "AWS", use: "Cloud hosting", icon: "aws" },
  { name: "Microsoft", use: "Business tools", icon: "microsoft" },
  { name: "Claude", use: "AI automation", icon: "claude" },
  { name: "OpenAI", use: "AI automation", icon: "openai" },
];

/** Homepage "next step" section: three outcomes and their services. */
export const nextStep = {
  heading: "What does your business need right now?",
  intro: "Pick what you want to improve. We'll help you find the right fix.",
  aside: { label: "Not sure? Describe the problem", href: "/contact/" },
};

export const businessNeeds: {
  icon: NeedIconName;
  title: string;
  body: string;
  services: ServiceSlug[];
  /** Search-style phrases shown as pills; each opens the inquiry form for its service. */
  keywords: { label: string; service: ServiceSlug }[];
}[] = [
  {
    icon: "presence",
    title: "Look the part online",
    body: "A clear website, store, and brand that make choosing you easy.",
    services: ["web-design-development", "shopify-development", "ui-ux-design", "branding"],
    keywords: [
      { label: "New website", service: "web-design-development" },
      { label: "Website redesign", service: "web-design-development" },
      { label: "Online store", service: "shopify-development" },
      { label: "Shopify store", service: "shopify-development" },
      { label: "Landing page", service: "web-design-development" },
      { label: "Logo & branding", service: "branding" },
      { label: "UX audit", service: "ui-ux-design" },
      { label: "WordPress website", service: "web-design-development" },
      { label: "Mobile-friendly site", service: "web-design-development" },
      { label: "Ecommerce website", service: "shopify-development" },
      { label: "Brand identity", service: "branding" },
      { label: "App design", service: "ui-ux-design" },
    ],
  },
  {
    icon: "inquiries",
    title: "Get more leads",
    body: "Get found on Google, reach the right people, and turn visits into inquiries.",
    services: ["seo", "paid-advertising", "conversion-optimization", "email-marketing"],
    keywords: [
      { label: "Rank on Google", service: "seo" },
      { label: "Local SEO", service: "seo" },
      { label: "Google Ads", service: "paid-advertising" },
      { label: "Social media ads", service: "paid-advertising" },
      { label: "More leads", service: "conversion-optimization" },
      { label: "Better conversions", service: "conversion-optimization" },
      { label: "Email campaigns", service: "email-marketing" },
      { label: "SEO audit", service: "seo" },
      { label: "Facebook ads", service: "paid-advertising" },
      { label: "Instagram ads", service: "paid-advertising" },
      { label: "Landing page testing", service: "conversion-optimization" },
      { label: "Newsletter", service: "email-marketing" },
    ],
  },
  {
    icon: "operations",
    title: "Save time with automation",
    body: "Connected tools and AI automation that take repetitive work off your team.",
    services: ["custom-software-development", "ai-automation", "crm-integrations", "mobile-app-development"],
    keywords: [
      { label: "Automate tasks", service: "ai-automation" },
      { label: "AI chatbot", service: "ai-automation" },
      { label: "CRM setup", service: "crm-integrations" },
      { label: "Connect my tools", service: "crm-integrations" },
      { label: "Custom dashboard", service: "custom-software-development" },
      { label: "Internal tool", service: "custom-software-development" },
      { label: "Mobile app", service: "mobile-app-development" },
      { label: "Workflow automation", service: "ai-automation" },
      { label: "HubSpot setup", service: "crm-integrations" },
      { label: "Booking system", service: "custom-software-development" },
      { label: "Customer portal", service: "custom-software-development" },
      { label: "iOS & Android app", service: "mobile-app-development" },
    ],
  },
];

/** Delivery process. Each stage states the client's part and what they receive. */
export const lifecycle: {
  step: string;
  icon: IconName;
  title: string;
  body: string;
  youProvide: string;
  youReceive: string;
}[] = [
  {
    step: "Discovery",
    icon: "discovery",
    title: "Understand the problem",
    body: "We review your current site, systems, and data, and talk to the people who will use what we build.",
    youProvide: "Access to existing accounts, a few hours of your team's time, any brand or content assets.",
    youReceive: "A written summary of goals, constraints, and priorities.",
  },
  {
    step: "Design and planning",
    icon: "planning",
    title: "Decide what to build",
    body: "We structure content and workflows, design key screens, and plan the technical approach and tracking.",
    youProvide: "Feedback at review sessions and one person who can approve decisions.",
    youReceive: "Approved designs, a scope with deliverables, and a delivery plan.",
  },
  {
    step: "Build and launch",
    icon: "build",
    title: "Build, test, release",
    body: "We develop in a staging environment, test on real devices, migrate content, and launch with redirects and analytics in place.",
    youProvide: "Content sign-off and final checks on a preview link.",
    youReceive: "The live site or system, documentation, and training for your team.",
  },
  {
    step: "Improvement",
    icon: "improve",
    title: "Learn from real use",
    body: "We watch how people use what we built, fix what gets in the way, and run search, ads, or automation work from real data.",
    youProvide: "Sales and customer feedback, so we measure what matters to you.",
    youReceive: "A prioritised list of changes and plain-English reports.",
  },
];

/** Working principles: how collaboration feels (not a restatement of the process). */
export const principles: { icon: IconName; title: string; body: string }[] = [
  {
    icon: "scope",
    title: "Clear scope from the start",
    body: "Deliverables, assumptions, and exclusions agreed before work begins.",
  },
  {
    icon: "together",
    title: "Design and development together",
    body: "Design decisions informed by how the experience will work and be built.",
  },
  {
    icon: "milestones",
    title: "Updates that move work forward",
    body: "Know what’s complete, what’s next, and where your input is needed.",
  },
  {
    icon: "handover",
    title: "A handover you can use",
    body: "Clear documentation, account access, and guidance for the people running it.",
  },
  {
    icon: "planning",
    title: "Decisions you can see",
    body: "Trade-offs explained in plain language, so you choose with the full picture.",
  },
  {
    icon: "improve",
    title: "Support after launch",
    body: "Fixes, small changes, and improvements handled once the work is live.",
  },
];

/** Shown as a quiet strip beneath the four principles. */
export const measurePrinciple: { icon: IconName; title: string; body: string } = {
  icon: "measure",
  title: "Have a project in mind?",
  body: "Tell us what you want to improve. We’ll agree how success will be measured before any work begins.",
};

export const engagementModels: {
  icon: IconName;
  engagement: string;
  title: string;
  question: string;
  body: string;
  bestFor: string;
  scope: string;
  billing: string;
  link: string;
}[] = [
  {
    icon: "engage-defined",
    engagement: "defined-project",
    title: "Defined project",
    question: "Have a clear project to launch?",
    body: "A clear brief, agreed deliverables, and a focused build.",
    bestFor: "New websites, Shopify stores, and clearly scoped launches.",
    scope: "Agreed before work starts.",
    billing: "Project fee paid against agreed milestones.",
    link: "Discuss a project",
  },
  {
    icon: "engage-ongoing",
    engagement: "ongoing-improvement",
    title: "Ongoing improvement",
    question: "Need steady, ongoing improvement?",
    body: "Regular work on what matters most each month.",
    bestFor: "SEO, paid advertising, conversion improvements, and maintenance.",
    scope: "Priorities reviewed monthly.",
    billing: "Monthly retainer.",
    link: "Discuss ongoing support",
  },
  {
    icon: "engage-phased",
    engagement: "phased-delivery",
    title: "Phased delivery",
    question: "Building something larger in stages?",
    body: "Start with discovery, then build step by step.",
    bestFor: "Custom software, migrations, and complex automation.",
    scope: "Defined and agreed for each phase.",
    billing: "Fee agreed per phase.",
    link: "Discuss a phased build",
  },
];

/** How any engagement starts. No timelines promised: they depend on the scope. */
export const gettingStarted: { icon: IconName; title: string; body: string }[] = [
  {
    icon: "discovery",
    title: "Tell us what needs to work better.",
    body: "Share your goals, current setup, and constraints. We ask the questions that shape the scope.",
  },
  {
    icon: "planning",
    title: "Agree the scope and structure.",
    body: "We suggest the engagement that fits, then confirm deliverables, cost, and milestones in writing.",
  },
  {
    icon: "milestones",
    title: "Start with clear checkpoints.",
    body: "Regular updates show what’s complete, what’s next, and where your input is needed.",
  },
];

/**
 * Homepage AI automation accordion. Proposed service capabilities, not
 * completed projects or guaranteed outcomes.
 */
export const automationItems: { title: string; body: string }[] = [
  {
    title: "Business process automation",
    body: "Reduce repetitive handoffs between the tools your team already uses. We map the workflow, identify suitable tasks, and build connections for activities such as routing requests, updating records, and preparing follow-ups.",
  },
  {
    title: "AI-assisted inquiry handling",
    body: "Help your team organize incoming messages without checking every request manually. AI can assist with identifying the subject, extracting useful details, and suggesting where an inquiry should go.",
  },
  {
    title: "Knowledge assistants",
    body: "Make approved business information easier to find. An assistant can help staff or customers navigate FAQs, product information, and internal guidance through a conversational interface.",
  },
  {
    title: "Document and data processing",
    body: "Turn repetitive document handling into a more structured workflow. Extract relevant fields, categorize files, and prepare information for the systems your team uses.",
  },
  {
    title: "CRM and business-tool integrations",
    body: "Connect forms, inboxes, CRM records, and other business tools so your team spends less time moving information between them.",
  },
  {
    title: "AI features for existing software",
    body: "Add a focused AI capability to an existing website or application, such as document summarization, knowledge search, or assisted drafting.",
  },
  {
    title: "Customer-facing chat assistants",
    body: "Answer common questions on your website or in messaging channels using information you have approved, at any time of day.",
  },
  {
    title: "Reporting and insight summaries",
    body: "Turn regular reports from your CRM, store, or marketing tools into short written summaries your team can read quickly.",
  },
  {
    title: "Workflow review and AI readiness",
    body: "Not sure where to start? We review how work currently moves through your team and tools, and identify the tasks where automation or AI would be practical.",
  },
];

/** "Why us" for AI automation: working principles only, no team-size or seniority claims. */
export const automationWhy: { icon: IconName; title: string; body: string }[] = [
  {
    icon: "ai-oversight",
    title: "People stay in control",
    body: "Anything sensitive or customer-facing waits for a person to approve it.",
  },
  {
    icon: "ai-connected",
    title: "Built around your tools",
    body: "We connect the CRM, inbox, and tools you already use.",
  },
  {
    icon: "ai-secure",
    title: "Careful with your data",
    body: "Access is agreed upfront, and accounts stay in your name.",
  },
];

/** Homepage "How we work" timeline. Fuller inputs/outputs per stage live on the About page (Lifecycle). */
export const processStages: { title: string; body: string; outcome: string }[] = [
  {
    title: "Understand your goals",
    body: "We discuss what needs to improve, review what you already have, and agree the priorities.",
    outcome: "A clear brief and agreed direction.",
  },
  {
    title: "Plan the solution",
    body: "We shape the experience, define the deliverables, and review the proposed approach with you.",
    outcome: "An agreed scope and delivery plan.",
  },
  {
    title: "Build and launch",
    body: "We develop and test the work, share it for review, and prepare the agreed launch and handover.",
    outcome: "A tested release and practical handover.",
  },
  {
    title: "Review and improve",
    body: "After launch, we review feedback and performance to identify useful next steps. Ongoing work is scoped separately.",
    outcome: "Priorities for the next stage.",
  },
];

export const homeFaqs: Faq[] = [
  {
    q: "Which service should we start with?",
    a: "Tell us the problem, not the solution. We'll ask a few questions and suggest the smallest step that helps. Sometimes that's a quick audit, not a new build.",
  },
  {
    q: "Can you redesign our website instead of starting over?",
    a: "Often, yes. We look at what you have first. If the platform is sound, fixing the content, speed, and key pages usually costs less than a full rebuild.",
  },
  {
    q: "Should we use Shopify, WordPress, or a custom build?",
    a: "It depends on who will update the site, what it needs to connect to, and what it costs to run. Shopify suits most online stores, WordPress suits content-heavy sites, and a custom build suits unusual needs. We explain the options in writing before you decide.",
  },
  {
    q: "Do you offer SEO services for small businesses?",
    a: "Yes. We fix technical issues, improve your pages, and write content around what your customers actually search for. Local SEO is included when you serve a specific area, and we report on rankings, traffic, and inquiries in plain language.",
  },
  {
    q: "Can you manage our Google Ads and social media ads?",
    a: "Yes. We set up and run Google Ads and Meta ads on Facebook and Instagram, with tracking in place, so you can see which campaigns bring in leads and which ones to stop.",
  },
  {
    q: "What can AI automation do for a small business?",
    a: "It handles the repetitive work: answering common customer questions, sorting inquiries, updating your CRM, and drafting follow-ups. A person still approves anything important before it goes out.",
  },
  {
    q: "How much does a website cost?",
    a: "It depends on the size and features, so we don't use a fixed price list. After a short call we send a written quote that shows exactly what's included. If you have a set budget, tell us and we'll show you what fits.",
  },
  {
    q: "How long does a project take?",
    a: "It depends on the size of the project and how quickly content and feedback are ready. We agree a schedule with milestones before we start and tell you early if anything changes.",
  },
  {
    q: "Do you work with businesses in other countries?",
    a: "Yes. We work remotely with clients around the world and plan calls around your time zone. Multilingual and right-to-left websites can be part of the project.",
  },
  {
    q: "What happens after launch?",
    a: "You own the website, the code, and the accounts. We hand over simple guides and training, and offer optional support for updates, fixes, and ongoing improvements.",
  },
];
