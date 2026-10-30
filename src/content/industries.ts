import type { Faq, ServiceGroup, ServiceSlug } from "./types";

export type Industry = {
  slug: string;
  name: string;
  /** One line for menus and cards. */
  blurb: string;
  /** 20x20 stroke icon path. */
  icon: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  intro: string;
  challenges: { title: string; body: string }[];
  /** What we build for this industry, grouped like our services. */
  solutions: Record<ServiceGroup, string[]>;
  services: ServiceSlug[];
  /** Name of a live client project (see content/clients) that fits this industry. */
  clientWork?: string;
  faqs: Faq[];
};

export const industries: Industry[] = [
  {
    slug: "retail-ecommerce",
    name: "Retail & Ecommerce",
    blurb: "Online stores that sell, and the systems behind them.",
    icon: "M3 5h14l-1.5 8.5h-11ZM6 5 5 2.5H2.5M7 17a1 1 0 1 0 0-.01M14 17a1 1 0 1 0 0-.01",
    metaTitle: "Ecommerce Website & Marketing Services for Retail Brands",
    metaDescription:
      "Shopify stores, product pages, email flows, and ads for retail and ecommerce brands. One team for design, development, and growth.",
    h1: "Online stores that turn browsers into buyers",
    intro:
      "We build Shopify stores and product pages that make buying easy, then bring in shoppers with search, ads, and email. Everything is tracked, so you know what sells.",
    challenges: [
      { title: "Shoppers leave at checkout", body: "Slow pages, surprise costs, and unclear delivery info cost you sales right at the finish line." },
      { title: "Ads cost more every month", body: "Rising ad prices eat into margins when the store doesn't convert the traffic it pays for." },
      { title: "Too many apps, too little speed", body: "Each app adds weight and monthly fees, and together they slow the store down." },
      { title: "One-time buyers never come back", body: "Without good email flows, customers buy once and forget you." },
    ],
    solutions: {
      design: ["Shopify store design and build", "Product pages that answer every question", "Faster checkout and clearer delivery info", "Multilingual and multi-currency stores"],
      software: ["Custom Shopify apps and integrations", "Inventory and order syncing", "Loyalty and subscription features", "Reporting dashboards across channels"],
      marketing: ["Shopping and Meta ads tracked to sales", "Product and category SEO", "Welcome, abandoned cart, and win-back emails", "Conversion testing on key pages"],
    },
    services: ["shopify-development", "conversion-optimization", "email-marketing", "paid-advertising"],
    clientWork: "blinq",
    faqs: [
      { q: "Do you only work with Shopify?", a: "Shopify is our first choice for most stores, but we also work with WooCommerce and custom builds when they fit better." },
      { q: "Can you move our store from another platform?", a: "Yes. We migrate products, customers, orders, and URLs, with redirects in place so you keep your search traffic." },
      { q: "Can you help with ads and email too?", a: "Yes. We run Shopping, Meta, and email campaigns, all tracked back to real sales." },
      { q: "How do you speed up a slow store?", a: "We review apps, images, and theme code, remove what isn't needed, and fix what slows pages down." },
    ],
  },
  {
    slug: "healthcare",
    name: "Healthcare & Clinics",
    blurb: "Clear sites and easy booking for clinics and practices.",
    icon: "M8 3h4v5h5v4h-5v5H8v-5H3V8h5Z",
    metaTitle: "Websites & Booking Systems for Clinics and Healthcare",
    metaDescription:
      "Clinic websites, online booking, patient reminders, and local SEO for healthcare providers. Clear, accessible, and easy to manage.",
    h1: "Clinic websites patients trust, and booking that just works",
    intro:
      "We build clear, accessible websites for clinics and practices, connect online booking, and help local patients find you. Your team spends less time on the phone.",
    challenges: [
      { title: "Phones ring all day", body: "Staff spend hours on calls that online booking and reminders could handle." },
      { title: "Patients can't find what they need", body: "Services, prices, and opening times are buried or out of date." },
      { title: "No-shows cost money", body: "Missed appointments waste time slots that other patients wanted." },
      { title: "Hard to stand out locally", body: "Nearby clinics show up first on Google and Maps." },
    ],
    solutions: {
      design: ["Clear, accessible clinic websites", "Service and practitioner pages", "Mobile-first design for on-the-go patients", "Multilingual patient information"],
      software: ["Online booking connected to your calendar", "Automatic reminders by SMS and email", "Patient intake forms", "Simple admin dashboards"],
      marketing: ["Local SEO and Google Business Profile", "Review requests after visits", "Search ads for key treatments", "Newsletters for returning patients"],
    },
    services: ["web-design-development", "custom-software-development", "seo", "ai-automation"],
    faqs: [
      { q: "Can patients book online?", a: "Yes. We connect booking to your existing calendar or practice system, with reminders to cut no-shows." },
      { q: "Is the website accessible?", a: "Yes. We design and test for accessibility so every patient can use it, including on phones and screen readers." },
      { q: "How do you handle patient data?", a: "We agree upfront what data is collected and where it's stored, and keep forms to only what's needed." },
      { q: "Can you help us rank locally?", a: "Yes. Local SEO, Google Business Profile, and reviews help nearby patients find you first." },
    ],
  },
  {
    slug: "real-estate",
    name: "Real Estate & Property",
    blurb: "Listings, lead capture, and follow-up for agents and property firms.",
    icon: "M3 9.5 10 3l7 6.5V17H3ZM8 17v-4.5h4V17",
    metaTitle: "Real Estate Websites, Lead Generation & CRM Setup",
    metaDescription:
      "Property listing websites, lead capture, CRM follow-up, and local ads for real estate agents and property companies.",
    h1: "Property websites that capture leads and follow up fast",
    intro:
      "We build listing sites and landing pages that turn interest into enquiries, then connect them to your CRM so every lead gets a quick reply.",
    challenges: [
      { title: "Leads go cold", body: "Enquiries wait in an inbox while buyers contact the next agent." },
      { title: "Listings are hard to manage", body: "Updating properties across the site and portals takes too long." },
      { title: "Portals take the credit", body: "Most leads arrive through paid portals instead of your own site." },
      { title: "No view of the pipeline", body: "It's hard to see which campaigns bring buyers, sellers, and tenants." },
    ],
    solutions: {
      design: ["Listing websites with smart search", "Landing pages for new developments", "Valuation request flows", "Fast, mobile-friendly property pages"],
      software: ["Listing feeds and portal syncing", "CRM setup with lead routing", "Viewing booking tools", "Owner and tenant portals"],
      marketing: ["Local SEO for areas you cover", "Search and social ads for listings", "Automated follow-up emails", "Lead source tracking"],
    },
    services: ["web-design-development", "crm-integrations", "paid-advertising", "seo"],
    faqs: [
      { q: "Can listings update automatically?", a: "Yes. We can sync listings from your property system or feed so the site stays current." },
      { q: "Which CRM should we use?", a: "It depends on your team. We often set up HubSpot or Zoho, and work with the CRM you already have." },
      { q: "Can you reduce our reliance on portals?", a: "Yes. Strong local SEO and landing pages bring more leads to your own site." },
      { q: "How fast can leads get a reply?", a: "With automation, a lead can get a reply and be assigned to an agent within minutes." },
    ],
  },
  {
    slug: "professional-services",
    name: "Professional Services",
    blurb: "Websites and internal tools for firms that sell expertise.",
    icon: "M3 7h14v9H3ZM7.5 7V4.5h5V7M3 11h14",
    metaTitle: "Websites & Software for Professional Services Firms",
    metaDescription:
      "Websites, client portals, HR and workflow software, and lead generation for consultancies, agencies, and professional firms.",
    h1: "Win better clients, and spend less time on admin",
    intro:
      "We help firms explain their expertise clearly online, bring in qualified enquiries, and replace spreadsheets with simple internal tools.",
    challenges: [
      { title: "Your expertise is hard to see", body: "The website lists services but doesn't show why clients should choose you." },
      { title: "Too much manual admin", body: "Timesheets, onboarding, and reporting live in scattered spreadsheets." },
      { title: "Enquiries are hit and miss", body: "Some leads are a great fit, many are not, and there's no clear filter." },
      { title: "Clients want self-service", body: "Clients expect a portal for documents, updates, and invoices." },
    ],
    solutions: {
      design: ["Websites that show expertise clearly", "Case study and insight pages", "Lead qualification forms", "Brand refresh for growing firms"],
      software: ["HR, attendance, and payroll systems", "Client portals for documents and updates", "Workflow and approval tools", "Reporting dashboards"],
      marketing: ["SEO for the services you sell", "LinkedIn and search campaigns", "Email nurture for long sales cycles", "Clear lead source reporting"],
    },
    services: ["web-design-development", "custom-software-development", "ai-automation", "seo"],
    clientWork: "rfs-hcm",
    faqs: [
      { q: "Can you build an internal system for us?", a: "Yes. We build HR, workflow, and client portal software around how your team works." },
      { q: "Do you write the website content?", a: "We can. We interview your team and turn your expertise into clear, plain-English pages." },
      { q: "Can AI help with our admin?", a: "Often, yes. AI can sort enquiries, draft replies, and summarise documents, with a person approving the results." },
      { q: "How do we get better leads, not just more?", a: "Clear positioning, targeted content, and smart forms attract the right clients and filter out poor fits." },
    ],
  },
  {
    slug: "hospitality",
    name: "Hospitality & Travel",
    blurb: "Direct bookings and guest experiences for hotels and venues.",
    icon: "M3 15V6m0 5h14v4M3 11h5V8.5a1.5 1.5 0 0 1 3 0V11",
    metaTitle: "Hotel & Hospitality Websites with Direct Booking",
    metaDescription:
      "Hospitality websites, direct booking, guest messaging, and local marketing for hotels, restaurants, venues, and travel businesses.",
    h1: "More direct bookings, fewer commission fees",
    intro:
      "We design beautiful, fast websites for hotels, restaurants, and venues, make booking direct easy, and keep guests coming back.",
    challenges: [
      { title: "Commission eats profit", body: "Booking platforms take a big cut of every reservation." },
      { title: "The site doesn't sell the experience", body: "Photos, rooms, and menus don't make guests want to book." },
      { title: "Guest questions repeat", body: "Staff answer the same questions about parking, times, and menus every day." },
      { title: "Seasonal ups and downs", body: "Quiet periods need campaigns ready to fill rooms and tables." },
    ],
    solutions: {
      design: ["Visual websites that sell the experience", "Direct booking built into every page", "Menus, rooms, and events pages", "Multilingual sites for international guests"],
      software: ["Booking engine and channel integrations", "Guest messaging and FAQs with AI", "Event and table management tools", "Gift card and voucher systems"],
      marketing: ["Local and travel SEO", "Seasonal ad campaigns", "Guest email and offers", "Review generation"],
    },
    services: ["web-design-development", "ai-automation", "paid-advertising", "email-marketing"],
    faqs: [
      { q: "Can we take bookings on our own site?", a: "Yes. We connect your booking engine or table system so guests can book direct." },
      { q: "Can AI answer guest questions?", a: "Yes. An assistant can answer common questions from information you approve, at any time of day." },
      { q: "Will the site work in other languages?", a: "Yes. We build multilingual sites, including right-to-left languages when needed." },
      { q: "How do we fill quiet seasons?", a: "With planned campaigns: offers to past guests, targeted ads, and seasonal landing pages." },
    ],
  },
  {
    slug: "education",
    name: "Education & Training",
    blurb: "Course sites, enrolment, and learning tools.",
    icon: "M2 7.5 10 4l8 3.5L10 11ZM5 9v4.5c0 1 2.2 2.5 5 2.5s5-1.5 5-2.5V9",
    metaTitle: "Websites & Enrolment Systems for Education and Training",
    metaDescription:
      "Course websites, online enrolment, student portals, and marketing for schools, academies, and training providers.",
    h1: "Fill your courses with less paperwork",
    intro:
      "We build course websites and enrolment flows that make signing up simple, plus portals and automations that save your team hours each week.",
    challenges: [
      { title: "Enrolment is slow", body: "Forms, emails, and payments are handled by hand for every student." },
      { title: "Courses are hard to compare", body: "Students can't easily see dates, prices, and outcomes side by side." },
      { title: "Admin takes over", body: "Reminders, certificates, and attendance eat into teaching time." },
      { title: "Marketing is guesswork", body: "It's unclear which channels actually bring enrolments." },
    ],
    solutions: {
      design: ["Course catalogues with clear comparisons", "Simple online enrolment", "Student and parent information pages", "Accessible, mobile-first design"],
      software: ["Student portals and dashboards", "Payments and instalment plans", "Attendance and certificate automation", "LMS integrations"],
      marketing: ["SEO for courses and locations", "Search and social campaigns", "Enquiry follow-up emails", "Open day and intake campaigns"],
    },
    services: ["web-design-development", "custom-software-development", "seo", "email-marketing"],
    faqs: [
      { q: "Can students enrol and pay online?", a: "Yes. We build enrolment with secure payments, including instalments if you offer them." },
      { q: "Do you work with learning platforms?", a: "Yes. We can connect your site to common LMS tools or build a simple portal." },
      { q: "Can certificates be sent automatically?", a: "Yes. Certificates and reminders can be generated and sent without manual work." },
      { q: "How do we know what marketing works?", a: "We track every enquiry back to its source, so you can see which channels bring enrolments." },
    ],
  },
  {
    slug: "manufacturing",
    name: "Manufacturing & Distribution",
    blurb: "B2B sites, quoting tools, and connected operations.",
    icon: "M2.5 17V9l5 3V9l5 3V5h5v12Z",
    metaTitle: "B2B Websites & Software for Manufacturers and Distributors",
    metaDescription:
      "B2B websites, product catalogues, quote requests, dealer portals, and workflow automation for manufacturers and distributors.",
    h1: "B2B websites and tools that make ordering easy",
    intro:
      "We build product catalogues and quote flows that buyers can actually use, and connect your website to the systems that run your operations.",
    challenges: [
      { title: "Catalogues are hard to search", body: "Buyers can't find the right part, spec, or document quickly." },
      { title: "Quotes take days", body: "Requests arrive by email and are re-typed into other systems." },
      { title: "Systems don't talk", body: "Website, ERP, and CRM hold different versions of the same data." },
      { title: "Dealers need self-service", body: "Partners phone for prices, stock, and order status." },
    ],
    solutions: {
      design: ["Searchable product catalogues", "Spec sheets and document libraries", "Quote request flows", "Industry and application pages"],
      software: ["Dealer and customer portals", "ERP and CRM integrations", "Quote and order automation", "Stock and pricing dashboards"],
      marketing: ["B2B SEO for products and applications", "LinkedIn and search campaigns", "Trade show and launch campaigns", "Account-based email"],
    },
    services: ["web-design-development", "crm-integrations", "custom-software-development", "seo"],
    faqs: [
      { q: "Can the website connect to our ERP?", a: "Yes. We connect product, stock, and pricing data so the site stays accurate." },
      { q: "Can dealers order online?", a: "Yes. We build portals with their own prices, order history, and documents." },
      { q: "Can quote requests be automated?", a: "Yes. Requests can be captured, routed, and added to your CRM without re-typing." },
      { q: "Is B2B SEO worth it?", a: "Often. Buyers search for specific parts and applications, and good pages capture that demand." },
    ],
  },
  {
    slug: "media-publishing",
    name: "Media & Publishing",
    blurb: "Digital editions, subscriptions, and audience growth.",
    icon: "M4 3.5h10v13H4ZM14 7h2.5v8a1.5 1.5 0 0 1-3 0M7 7h4M7 10h4M7 13h2",
    metaTitle: "Digital Publishing Platforms & Subscription Websites",
    metaDescription:
      "E-paper platforms, subscription and paywall systems, newsletters, and audience growth for publishers and media companies.",
    h1: "Publish digitally, and grow paying readers",
    intro:
      "We build e-paper and publishing platforms, subscriptions and payments, and newsletters that keep readers coming back.",
    challenges: [
      { title: "Print is shrinking", body: "Readers move online, but the digital edition is hard to read and harder to pay for." },
      { title: "Subscriptions are messy", body: "Plans, payments, and access are managed across different tools." },
      { title: "Delivery problems go unseen", body: "Emails and editions fail to reach subscribers without anyone noticing." },
      { title: "Audience growth stalls", body: "Without newsletters and SEO, new readers are hard to win." },
    ],
    solutions: {
      design: ["Readable digital editions on every device", "Subscription and paywall pages", "Article and archive layouts", "Brand and masthead refreshes"],
      software: ["E-paper publishing dashboards", "Subscriptions, plans, and payments", "Email delivery with failure tracking", "Reader and revenue reporting"],
      marketing: ["Newsletters that convert readers", "SEO for articles and archives", "Subscription campaigns", "Retention and win-back emails"],
    },
    services: ["custom-software-development", "web-design-development", "email-marketing", "seo"],
    clientWork: "advocate-epaper",
    faqs: [
      { q: "Can you build an e-paper platform?", a: "Yes. We built one for The Advocate News, covering upload, delivery, subscriptions, and payments." },
      { q: "Can readers pay for subscriptions online?", a: "Yes. We set up plans, payments, and access control in one system." },
      { q: "How do we know editions were delivered?", a: "Delivery tracking shows sent, delivered, and failed emails, with failures listed for follow-up." },
      { q: "Can you help grow our audience?", a: "Yes. Newsletters, SEO, and targeted campaigns bring in and keep new readers." },
    ],
  },
  {
    slug: "automotive",
    name: "Automotive",
    blurb: "Dealers, garages, and parts sellers that need more bookings.",
    icon: "M3.5 12.5 5 8h10l1.5 4.5M3 12.5h14v3H3ZM5.5 15.5v1.5M14.5 15.5v1.5M6 13.8h.01M14 13.8h.01",
    metaTitle: "Websites & Marketing for Car Dealers, Garages and Parts Sellers",
    metaDescription:
      "Vehicle listing sites, service booking, parts stores, and local ads for car dealerships, garages, and automotive businesses.",
    h1: "More test drives, service bookings, and parts sales",
    intro:
      "We build vehicle listing sites, online service booking, and parts stores, then bring in local buyers with search and ads that track every lead.",
    challenges: [
      { title: "Stock goes out of date", body: "Vehicles sell, but the website still shows them, and buyers lose trust." },
      { title: "Service bookings by phone only", body: "Customers who want to book after hours go to a competitor." },
      { title: "Leads from many places", body: "Enquiries come from the site, portals, and social, with no single view." },
      { title: "Local competition is tough", body: "Other dealers and garages appear first in local search." },
    ],
    solutions: {
      design: ["Vehicle listing sites with filters", "Service and MOT booking pages", "Finance and trade-in enquiry flows", "Parts and accessories stores"],
      software: ["Stock feeds from your dealer system", "Online booking with reminders", "Lead routing to sales staff", "Workshop job tracking"],
      marketing: ["Local SEO for every location", "Search and social ads for stock", "Service reminder emails", "Review generation"],
    },
    services: ["web-design-development", "crm-integrations", "paid-advertising", "seo"],
    faqs: [
      { q: "Can stock update automatically?", a: "Yes. We connect your dealer or stock system so listings appear and disappear on their own." },
      { q: "Can customers book a service online?", a: "Yes. Online booking with automatic reminders reduces phone calls and no-shows." },
      { q: "Can you sell parts online?", a: "Yes. We build parts stores, often on Shopify, with search by vehicle where possible." },
      { q: "How do we track which ads bring buyers?", a: "Every enquiry is tagged with its source, so you can see which campaigns lead to sales." },
    ],
  },
  {
    slug: "financial-services",
    name: "Financial Services",
    blurb: "Trustworthy sites and secure tools for advisers and firms.",
    icon: "M3 8 10 4l7 4M4.5 8v7M8 8v7M12 8v7M15.5 8v7M3 16.5h14",
    metaTitle: "Websites & Software for Financial Advisers and Firms",
    metaDescription:
      "Clear, trustworthy websites, client portals, onboarding tools, and lead generation for financial advisers, accountants, and finance firms.",
    h1: "Build trust online, and onboard clients faster",
    intro:
      "We design clear, credible websites for financial firms, build secure portals and onboarding flows, and bring in enquiries from the right clients.",
    challenges: [
      { title: "Trust is hard to earn online", body: "A dated or vague website makes prospects doubt you before the first call." },
      { title: "Onboarding is paperwork heavy", body: "Forms, ID checks, and documents bounce back and forth by email." },
      { title: "Content must be careful", body: "Every page needs to be accurate and compliant, which slows updates." },
      { title: "Leads are expensive", body: "Finance keywords cost a lot, so every click has to count." },
    ],
    solutions: {
      design: ["Clear, credible firm websites", "Service and calculator pages", "Adviser and team profiles", "Accessible, plain-English content"],
      software: ["Secure client portals", "Digital onboarding and document upload", "CRM and workflow integrations", "Client reporting dashboards"],
      marketing: ["SEO for the advice you offer", "Careful, tracked search campaigns", "Educational email series", "Lead quality reporting"],
    },
    services: ["web-design-development", "custom-software-development", "crm-integrations", "seo"],
    faqs: [
      { q: "Can clients upload documents securely?", a: "Yes. We build portals with secure upload and access, so documents stop travelling by email." },
      { q: "Do you write financial content?", a: "We can draft clear, plain-English content. Your compliance team reviews and approves it before it goes live." },
      { q: "Can you add calculators to our site?", a: "Yes. Simple calculators help visitors and give you better-qualified enquiries." },
      { q: "Can you connect our CRM?", a: "Yes. Enquiries and onboarding data flow into your CRM without re-typing." },
    ],
  },
  {
    slug: "construction",
    name: "Construction & Trades",
    blurb: "Quotes, project galleries, and job management for builders.",
    icon: "M3 16.5h14M5 16.5V9l5-4 5 4v7.5M8.5 16.5v-4h3v4",
    metaTitle: "Websites & Lead Generation for Construction and Trades",
    metaDescription:
      "Project galleries, quote request flows, job management tools, and local SEO for builders, contractors, and trade businesses.",
    h1: "Win more jobs, and spend less time chasing quotes",
    intro:
      "We build websites that show off your best projects, make quote requests easy, and help local customers find you, plus simple tools to manage the jobs that follow.",
    challenges: [
      { title: "Great work, weak website", body: "Your projects are impressive, but the site doesn't show them well." },
      { title: "Quote requests lack detail", body: "You call back just to find out the size, location, and budget." },
      { title: "Busy then quiet", body: "Work comes in waves, so you need leads when the diary empties." },
      { title: "Jobs managed on paper", body: "Schedules, photos, and invoices are spread across texts and notebooks." },
    ],
    solutions: {
      design: ["Project galleries and case studies", "Detailed quote request forms", "Service and area pages", "Mobile-first sites for on-site browsing"],
      software: ["Job scheduling and tracking tools", "Photo and document capture from site", "Quote and invoice automation", "Customer update portals"],
      marketing: ["Local SEO for every area you cover", "Search ads for high-value jobs", "Review requests after each job", "Seasonal campaigns for quiet months"],
    },
    services: ["web-design-development", "seo", "paid-advertising", "custom-software-development"],
    faqs: [
      { q: "Can customers send photos with a quote request?", a: "Yes. Quote forms can include photos, measurements, and budget, so you can price faster." },
      { q: "Can you help us rank in several towns?", a: "Yes. Area pages and Google Business Profile work help you show up wherever you work." },
      { q: "Can you build a job management tool?", a: "Yes. We build simple tools for scheduling, site photos, and customer updates." },
      { q: "How do we get more reviews?", a: "Automatic review requests after each finished job make it easy for happy customers to leave one." },
    ],
  },
  {
    slug: "nonprofit",
    name: "Nonprofits & Charities",
    blurb: "Donations, volunteers, and stories that inspire support.",
    icon: "M10 16.5S3 12.5 3 7.8A3.3 3.3 0 0 1 10 6a3.3 3.3 0 0 1 7 1.8c0 4.7-7 8.7-7 8.7Z",
    metaTitle: "Websites & Donation Platforms for Nonprofits and Charities",
    metaDescription:
      "Charity websites, online donations, volunteer sign-up, and supporter email for nonprofits, NGOs, and community organisations.",
    h1: "Tell your story, and turn visitors into supporters",
    intro:
      "We build websites that share your impact, make giving and volunteering easy, and keep supporters connected with regular, useful updates.",
    challenges: [
      { title: "Donating takes too many steps", body: "Long forms and extra clicks make people give up before they give." },
      { title: "Impact is hard to see", body: "Supporters want to know what their money achieves, and the site doesn't show it." },
      { title: "Volunteers fall through the cracks", body: "Sign-ups arrive by email and are hard to follow up." },
      { title: "Small team, big workload", body: "A few people manage the website, email, events, and fundraising." },
    ],
    solutions: {
      design: ["Story-led charity websites", "Quick, mobile-friendly donation pages", "Impact and campaign pages", "Accessible design for every supporter"],
      software: ["Online donations and recurring giving", "Volunteer sign-up and management", "Event registration tools", "Supporter CRM integrations"],
      marketing: ["Supporter newsletters", "Campaign landing pages", "SEO for your cause", "Grant-friendly impact reporting"],
    },
    services: ["web-design-development", "email-marketing", "crm-integrations", "seo"],
    faqs: [
      { q: "Can supporters give monthly?", a: "Yes. We set up one-off and recurring donations with a quick, mobile-friendly flow." },
      { q: "Can you manage volunteer sign-ups?", a: "Yes. Sign-ups flow into a simple system so your team can follow up quickly." },
      { q: "Can our small team update the site?", a: "Yes. We build sites that are easy to edit, and train your team to manage them." },
      { q: "Can you help us show our impact?", a: "Yes. Impact pages and regular updates show supporters what their help achieves." },
    ],
  },
];

export function getIndustry(slug: string) {
  return industries.find((i) => i.slug === slug);
}
