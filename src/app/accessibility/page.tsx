import { LegalPage } from "@/components/legal/LegalPage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Accessibility Statement",
  description: "How Growbytes works to make this website usable for everyone, and how to report a problem.",
  path: "/accessibility/",
});

export default function AccessibilityPage() {
  return (
    <LegalPage
      title="Accessibility statement"
      path="/accessibility/"
      updated="October 31, 2026"
      intro="We want everyone to be able to use this website, whatever device, browser, or assistive technology they rely on."
      sections={[
        {
          id: "our-goal",
          heading: "Our goal",
          body: (
            <p>
              We aim to meet the Web Content Accessibility Guidelines (WCAG) 2.2 at level AA. We design and build with
              accessibility in mind from the start, and we apply the same standard to the websites we build for clients.
            </p>
          ),
        },
        {
          id: "what-we-do",
          heading: "What we do",
          body: (
            <ul>
              <li>Clear headings, labels, and plain-English content.</li>
              <li>Full keyboard navigation, with visible focus states and a &ldquo;skip to content&rdquo; link.</li>
              <li>Text alternatives for meaningful images and hidden labels for decorative artwork.</li>
              <li>Colour contrast checked against WCAG guidance.</li>
              <li>Animations that stop for visitors who turn on &ldquo;reduce motion&rdquo; in their device settings.</li>
              <li>Layouts that work on phones, tablets, and when zoomed in.</li>
            </ul>
          ),
        },
        {
          id: "known-issues",
          heading: "Known limitations",
          body: (
            <p>
              Some screenshots of client projects are images of software interfaces, so their small text can&rsquo;t be read by
              screen readers. We describe each one in its text alternative and the surrounding copy. If anything else gets in
              your way, please tell us.
            </p>
          ),
        },
        {
          id: "feedback",
          heading: "Feedback and help",
          body: (
            <p>
              If you have trouble using any part of this site, or need information in a different format, email{" "}
              <a href="mailto:info@growbytes.co">info@growbytes.co</a>. Tell us the page and the problem, and we&rsquo;ll reply as
              soon as we can and work on a fix.
            </p>
          ),
        },
        {
          id: "review",
          heading: "Ongoing review",
          body: <p>We review the site when we add new pages or features, and update this statement when anything changes.</p>,
        },
      ]}
    />
  );
}
