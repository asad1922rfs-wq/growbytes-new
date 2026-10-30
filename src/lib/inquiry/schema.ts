import { z } from "zod";
import { services } from "@/content/services";

export const serviceInterestOptions = [
  ...services.map((s) => ({ value: s.slug as string, label: s.name })),
  { value: "multiple", label: "Several of these" },
  { value: "not-sure", label: "Not sure yet" },
];

export const budgetOptions = [
  { value: "not-sure", label: "Not sure yet" },
  { value: "under-10k", label: "Under US$10,000" },
  { value: "10k-25k", label: "US$10,000 – 25,000" },
  { value: "25k-50k", label: "US$25,000 – 50,000" },
  { value: "50k-plus", label: "US$50,000 or more" },
  { value: "monthly", label: "Ongoing monthly budget" },
];

/** How the client wants to work. Separate from service interest. */
export const engagementOptions = [
  { value: "defined-project", label: "Defined project" },
  { value: "ongoing-improvement", label: "Ongoing improvement" },
  { value: "phased-delivery", label: "Phased delivery" },
];

const optionalText = (max: number) =>
  z
    .string()
    .trim()
    .max(max, `Please keep this under ${max} characters.`)
    .optional()
    .transform((v) => (v ? v : undefined));

export const inquirySchema = z.object({
  name: z.string().trim().min(2, "Please enter your name.").max(120, "Please keep your name under 120 characters."),
  email: z
    .string()
    .trim()
    .min(1, "Please enter your work email.")
    .max(254, "That email address is too long.")
    .pipe(z.email("Please enter a valid email address, like name@company.com.")),
  company: optionalText(160),
  website: optionalText(300).refine(
    (v) => !v || /^(https?:\/\/)?[\w-]+(\.[\w-]+)+([/?#].*)?$/i.test(v),
    "Please enter a website address, like company.com.",
  ),
  phone: z
    .string()
    .trim()
    .min(1, "Please enter your phone number.")
    .max(40, "Please keep the phone number under 40 characters.")
    .refine((v) => /^[+()\d\s.-]{6,40}$/.test(v), "Please enter a valid phone number, like +1 555 010 2030."),
  service: z.enum(serviceInterestOptions.map((o) => o.value) as [string, ...string[]], {
    error: "Please choose the service you're most interested in.",
  }),
  budget: z
    .enum(budgetOptions.map((o) => o.value) as [string, ...string[]])
    .optional()
    .or(z.literal("").transform(() => undefined)),
  engagement: z
    .enum(engagementOptions.map((o) => o.value) as [string, ...string[]])
    .optional()
    .or(z.literal("").transform(() => undefined)),
  message: z
    .string()
    .trim()
    .min(20, "Please add a little more detail (at least 20 characters) so we can respond usefully.")
    .max(5000, "Please keep the description under 5,000 characters."),
});

export type Inquiry = z.infer<typeof inquirySchema>;

export const inquiryFields = ["name", "email", "company", "website", "phone", "service", "budget", "engagement", "message"] as const;
export type InquiryField = (typeof inquiryFields)[number];
