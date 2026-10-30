import Link from "next/link";
import { LegalPage } from "@/components/legal/LegalPage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Terms of Use",
  description: "The terms that apply when you use the Growbytes website.",
  path: "/terms/",
});

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of use"
      path="/terms/"
      updated="October 31, 2026"
      intro="These terms apply when you use this website. Project work is covered separately by the written proposal and agreement we sign with each client."
      sections={[
        {
          id: "using-this-site",
          heading: "Using this website",
          body: (
            <p>
              By using this website you agree to these terms. If you don&rsquo;t agree, please don&rsquo;t use the site. You may
              browse, read, and share our pages for personal and business purposes, as long as you don&rsquo;t misuse the site.
            </p>
          ),
        },
        {
          id: "acceptable-use",
          heading: "Acceptable use",
          body: (
            <>
              <p>Please don&rsquo;t:</p>
              <ul>
                <li>Try to break, overload, or gain unauthorised access to the site.</li>
                <li>Send spam, harmful code, or false information through our forms.</li>
                <li>Copy large parts of the site or present our content as your own.</li>
              </ul>
            </>
          ),
        },
        {
          id: "content",
          heading: "Our content",
          body: (
            <p>
              The text, designs, illustrations, and code on this site belong to Growbytes or are used with permission. Client
              projects are shown with each client&rsquo;s permission and remain theirs. Concept projects are illustrative work
              for fictional businesses and are clearly labelled.
            </p>
          ),
        },
        {
          id: "information",
          heading: "Information on this site",
          body: (
            <p>
              Our guides and pages are general information, not professional advice for your specific situation. We work to keep
              them accurate and up to date, but we can&rsquo;t promise they are complete or error-free. Results described for one
              business are not a guarantee of results for another.
            </p>
          ),
        },
        {
          id: "projects",
          heading: "Projects and proposals",
          body: (
            <p>
              Sending an inquiry doesn&rsquo;t create a contract. Any project work is agreed in a written proposal that sets out
              the scope, timeline, cost, and terms. If anything in that agreement differs from these terms, the agreement wins.
            </p>
          ),
        },
        {
          id: "links",
          heading: "Links to other sites",
          body: <p>We sometimes link to other websites, including client sites. We aren&rsquo;t responsible for their content or how they handle your data.</p>,
        },
        {
          id: "liability",
          heading: "Limitation of liability",
          body: (
            <p>
              The website is provided &ldquo;as is&rdquo;. To the extent the law allows, we aren&rsquo;t liable for any loss
              arising from your use of the site or reliance on its content. Nothing in these terms limits liability that cannot be
              limited by law.
            </p>
          ),
        },
        {
          id: "privacy",
          heading: "Privacy",
          body: (
            <p>
              How we handle personal information is explained in our <Link href="/privacy/">privacy policy</Link> and{" "}
              <Link href="/cookies/">cookie policy</Link>.
            </p>
          ),
        },
        {
          id: "changes",
          heading: "Changes to these terms",
          body: <p>We may update these terms from time to time. The date at the top shows when they last changed.</p>,
        },
      ]}
    />
  );
}
