import { LegalPage } from "@/components/legal/LegalPage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Privacy Policy",
  description: "How Growbytes collects, uses, and protects personal information when you use our website or contact us.",
  path: "/privacy/",
});

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy policy"
      path="/privacy/"
      updated="October 31, 2026"
      intro="This policy explains what personal information we collect when you use this website or contact us, why we collect it, and the choices you have. We keep it short and plain on purpose."
      sections={[
        {
          id: "who-we-are",
          heading: "Who we are",
          body: (
            <p>
              Growbytes (&ldquo;we&rdquo;, &ldquo;us&rdquo;) designs and builds websites, software, and marketing systems. We are
              responsible for the personal information described in this policy. You can reach us at{" "}
              <a href="mailto:info@growbytes.co">info@growbytes.co</a>.
            </p>
          ),
        },
        {
          id: "what-we-collect",
          heading: "What we collect",
          body: (
            <>
              <p>We only collect what you choose to send us, plus basic technical data needed to run the site:</p>
              <ul>
                <li>
                  <strong>Project inquiry form:</strong> your name, work email, phone number, company, website, the service
                  you&rsquo;re interested in, how you&rsquo;d like to work, budget range, and your message.
                </li>
                <li>
                  <strong>Newsletter sign-up:</strong> your email address.
                </li>
                <li>
                  <strong>Emails you send us:</strong> whatever you include in your message.
                </li>
                <li>
                  <strong>Technical data:</strong> standard server logs such as IP address, browser type, and pages requested,
                  kept by our hosting provider for security and to keep the site running.
                </li>
              </ul>
              {process.env.NEXT_PUBLIC_GA_ID && (
                <p>
                  <strong>Analytics:</strong> we use Google Analytics to see which pages are visited and how people find us.
                  IP addresses are anonymised. See our <a href="/cookies/">cookie policy</a>.
                </p>
              )}
              {process.env.NEXT_PUBLIC_META_PIXEL_ID ? (
                <p>
                  <strong>Meta Pixel:</strong> only if you turn on Marketing cookies, we use the Meta Pixel to measure visits
                  and enquiries from Facebook and Instagram and to show our ads to past visitors. We do not sell personal
                  information.
                </p>
              ) : (
                <p>We do not use advertising trackers or sell personal information.</p>
              )}
            </>
          ),
        },
        {
          id: "how-we-use-it",
          heading: "How we use it",
          body: (
            <ul>
              <li>To reply to your inquiry and discuss your project.</li>
              <li>To prepare proposals and, if we work together, to deliver and support the work.</li>
              <li>To send newsletter emails if you signed up. Every email has an unsubscribe option.</li>
              <li>To protect the site from spam and abuse.</li>
            </ul>
          ),
        },
        {
          id: "legal-basis",
          heading: "Our legal basis",
          body: (
            <p>
              Where data protection law requires a legal basis, we rely on your consent (for the newsletter), on steps you ask
              us to take before entering a contract (for inquiries and proposals), and on our legitimate interest in running a
              secure website and replying to messages.
            </p>
          ),
        },
        {
          id: "sharing",
          heading: "Who we share it with",
          body: (
            <>
              <p>We share personal information only with service providers that help us run the business, such as:</p>
              <ul>
                <li>Our website hosting provider.</li>
                <li>Our email delivery provider, which sends form submissions to our inbox.</li>
                <li>Email and productivity tools we use to manage conversations and projects.</li>
              </ul>
              <p>
                These providers may store data in other countries. When they do, we use providers that offer appropriate
                safeguards. We may also disclose information if the law requires it.
              </p>
            </>
          ),
        },
        {
          id: "retention",
          heading: "How long we keep it",
          body: (
            <p>
              We keep inquiries only as long as we need them to respond and to manage our relationship with you. If we work
              together, we keep project records for as long as needed for the work and for legal and accounting purposes.
              Newsletter emails are kept until you unsubscribe.
            </p>
          ),
        },
        {
          id: "your-rights",
          heading: "Your rights",
          body: (
            <>
              <p>Depending on where you live, you may have the right to:</p>
              <ul>
                <li>Ask what personal information we hold about you and get a copy.</li>
                <li>Ask us to correct or delete it.</li>
                <li>Object to or limit how we use it, or withdraw consent at any time.</li>
                <li>Complain to your local data protection authority.</li>
              </ul>
              <p>
                To make a request, email <a href="mailto:info@growbytes.co">info@growbytes.co</a>. We&rsquo;ll reply as soon as
                we can and within the time the law allows.
              </p>
            </>
          ),
        },
        {
          id: "security",
          heading: "Security",
          body: (
            <p>
              We use encrypted connections (HTTPS), limit who can access personal information, and choose providers with strong
              security practices. No system is perfectly secure, but we take reasonable steps to protect your data.
            </p>
          ),
        },
        {
          id: "children",
          heading: "Children",
          body: <p>This website is for businesses. It is not aimed at children, and we do not knowingly collect their information.</p>,
        },
        {
          id: "changes",
          heading: "Changes to this policy",
          body: <p>We may update this policy from time to time. The date at the top shows when it last changed.</p>,
        },
      ]}
    />
  );
}
