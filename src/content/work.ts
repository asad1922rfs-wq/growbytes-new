import type { Project } from "./types";

export const CONCEPT_LABEL = "Concept project — illustrative work, not a client engagement.";

export const projects: Project[] = [
  {
    slug: "hearthline-homeware",
    seoTitle: "Shopify Storefront Concept for Homeware",
    title: "A calmer Shopify storefront for a homeware brand",
    client: "Hearthline (fictional homeware brand)",
    sector: "Ecommerce · Homeware",
    services: ["shopify-development", "branding", "seo"],
    summary:
      "A Shopify concept that organizes a large homeware catalog by room and material, answers care and delivery questions on the product page, and keeps the cart transparent.",
    metaDescription:
      "Concept Shopify storefront for a fictional homeware brand: room-based discovery, metafield filtering, detailed product pages, and a transparent cart drawer.",
    visual: "homeware",
    features: [
      "Room- and material-based collection navigation",
      "Metafield-driven filters for size, finish, and care",
      "Product pages with dimensions, care, and delivery details above the fold",
      "Cart drawer with delivery estimate messaging and editable quantities",
    ],
    screens: [
      {
        visual: "shopify",
        title: "From collection to cart",
        caption: "Filters narrow the living room collection by material and size. The product page puts dimensions, care, and delivery details above the fold, and the cart drawer explains when shipping is calculated.",
      },
      {
        visual: "branding",
        title: "A calm, accessible palette",
        caption: "The fictional brand system pairs warm neutrals with a deep green and a clay accent. Each text color is checked against WCAG contrast before it is used in the theme.",
      },
    ],
    tone: "warm",
  },
  {
    slug: "northgate-property-care",
    seoTitle: "Lead-Gen Website Concept for Property Care",
    title: "A lead-generation website for a property services company",
    client: "Northgate Property Care (fictional business)",
    sector: "Service business · Property maintenance",
    services: ["web-design-development", "seo", "paid-advertising"],
    summary:
      "A website concept that separates residential and commercial buyers, explains each service clearly, and collects the details needed to quote on the first call.",
    metaDescription:
      "Concept lead-generation website for a fictional property services business: audience-specific journeys, service pages, and a structured quote request.",
    visual: "property",
    features: [
      "Separate journeys for homeowners and facilities managers",
      "Service pages structured around scope, process, and coverage",
      "A step-by-step quote request that captures property type and urgency",
      "Campaign landing page template for paid search",
    ],
    screens: [
      {
        visual: "web",
        title: "Audience-specific pages",
        caption: "The commercial path leads to pages written for facilities managers, with a clear survey request and the trades covered, rather than a generic list of services.",
      },
      {
        visual: "ads",
        title: "Search ad to tracked inquiry",
        caption: "A paid search ad for a specific service leads to a matching landing page with a short form, and the inquiry reaches the CRM with its campaign source attached.",
      },
    ],
    tone: "light",
  },
  {
    slug: "relay-freight-operations",
    seoTitle: "Logistics Operations Dashboard Concept",
    title: "An operations dashboard for a logistics business",
    client: "Relay Freight (fictional logistics company)",
    sector: "Logistics · Internal software",
    services: ["custom-software-development", "ai-automation"],
    summary:
      "An internal tool concept that replaces shared spreadsheets with a shipment pipeline, exception queue, and document intake assisted by AI with human review.",
    metaDescription:
      "Concept operations dashboard for a fictional logistics business: shipment pipeline, exception handling, and AI-assisted document intake with human review.",
    visual: "logistics",
    features: [
      "Shipment pipeline by status with filters by lane and customer",
      "Exception queue that highlights delays and missing documents",
      "AI-assisted extraction from delivery documents, with review before saving",
      "Integration points for accounting and carrier systems",
    ],
    screens: [
      {
        visual: "automation",
        title: "Document intake with human review",
        caption: "Uploaded delivery notes are processed by an AI extraction step. Low-confidence fields go to a person for review, and failures trigger retries, an alert, and a manual queue.",
      },
      {
        visual: "software",
        title: "Pipeline and connected systems",
        caption: "Shipments move through booked, in transit, and exception columns. Approved records sync to accounting and inventory, with carrier updates arriving through APIs. All data shown is fictional sample data.",
      },
    ],
    tone: "dark",
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
