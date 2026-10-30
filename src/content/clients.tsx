import type { ClientProjectData } from "@/components/sections/ClientProject";
import { EpaperArt } from "@/components/visuals/EpaperArt";
import { HrmsArt } from "@/components/visuals/HrmsArt";

/** Live client projects, shown with each client's permission (homepage and Work page). */
export const clientProjects: ClientProjectData[] = [
  {
    name: "blinq",
    services: ["Shopify development", "Web design", "Multilingual store"],
    built: ["Product pages with clear storytelling and colour options", "Fast, mobile-first storefront", "Dutch and English versions"],
    tag: "Shopify development",
    title: "blinq: an online store for premium oral care",
    body: "A Shopify storefront for blinq’s electric toothbrush and water flosser, with product-led storytelling, colour options, and a clear path from first look to checkout.",
    image: "/images/work/blinq-flosser.jpg",
    imageAlt:
      "The blinq water flosser page: product photo on a soft circle beside headline, price, colour options, and key specs.",
    width: 1440,
    height: 636,
    domain: "blinqcare.com",
    logo: { src: "/images/work/blinq-logo.png", width: 105, height: 45 },
    href: "https://blinqcare.com/",
  },
  {
    name: "advocate-epaper",
    services: ["Custom software", "Subscriptions & payments", "Email delivery"],
    built: ["Upload and publish a daily digital edition", "Subscriber, plan, and payment management", "Delivery tracking with failure reports"],
    tag: "Custom software development",
    title: "The Advocate News: an e-paper publishing dashboard",
    body: "A custom admin for publishing the daily digital edition: upload an edition, deliver it to subscribers by email, and track subscriptions, payments, and delivery failures in one place.",
    image: "/images/work/advocate-epaper-dashboard.png",
    imageAlt:
      "The Advocate News e-paper admin dashboard showing subscriber summary cards, the latest edition, and delivery status.",
    width: 1440,
    height: 587,
    art: <EpaperArt />,
    domain: "epaper.theadvocatenews.com",
  },
  {
    name: "rfs-hcm",
    services: ["Custom software", "HR & payroll", "Biometric integration"],
    built: ["Attendance synced from biometric devices", "Leave, payroll, and loans in one system", "Self-service dashboard for every employee"],
    tag: "Custom software development",
    title: "RFS HCM: a complete HR management system",
    body: "An HRMS covering employees, biometric attendance, leave, payroll, and loans, with a self-service dashboard for staff and a live overview for HR.",
    image: "/images/work/rfs-hcm-overview.png",
    imageAlt:
      "The RFS HCM HR overview: headcount, attendance today, pending leave approvals, and headcount by department.",
    width: 1440,
    height: 633,
    art: <HrmsArt />,
    dark: true,
    green: true,
    domain: "rfstech.online",
  },
];
