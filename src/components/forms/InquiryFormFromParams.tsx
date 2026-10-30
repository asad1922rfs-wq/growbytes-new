"use client";

import { useSearchParams } from "next/navigation";
import { InquiryForm } from "./InquiryForm";

/** Reads ?service= and ?engagement= (option slugs, never personal data) to preselect those fields. */
export function InquiryFormFromParams() {
  const params = useSearchParams();
  return <InquiryForm defaultService={params.get("service") ?? undefined} defaultEngagement={params.get("engagement") ?? undefined} />;
}
