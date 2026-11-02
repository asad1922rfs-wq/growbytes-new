import { LegalPage } from "@/components/legal/LegalPage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Cookie Policy",
  description: "Which cookies the Growbytes website uses, why we use them, and how you can control or block cookies in your browser.",
  path: "/cookies/",
});

export default function CookiesPage() {
  const analytics = Boolean(process.env.NEXT_PUBLIC_GA_ID);
  return (
    <LegalPage
      title="Cookie policy"
      path="/cookies/"
      updated="October 31, 2026"
      intro={
        analytics
          ? "Cookies are small files a website stores in your browser. We keep their use to a minimum: one functional cookie and Google Analytics, and no advertising cookies."
          : "Cookies are small files a website stores in your browser. We keep their use to a minimum: this site uses no advertising or tracking cookies."
      }
      sections={[
        {
          id: "what-we-use",
          heading: "Cookies we use",
          body: (
            <>
              <p>We use one functional cookie:</p>
              <ul>
                <li>
                  <strong>Inquiry confirmation:</strong> set for a few minutes after you send the project inquiry form, so we can
                  show you the thank-you page. It contains no personal information and expires on its own.
                </li>
              </ul>
              <p>
                Your browser may also store small preferences in local storage, such as whether you have opened a menu. These
                stay on your device and are never sent to us.
              </p>
            </>
          ),
        },
        analytics
          ? {
              id: "analytics",
              heading: "Analytics cookies",
              body: (
                <>
                  <p>
                    We use Google Analytics to understand which pages are useful and how visitors find us. It sets cookies
                    such as <code>_ga</code> and <code>_ga_*</code>, which last up to two years. IP addresses are anonymised,
                    and we don&rsquo;t use these cookies for advertising.
                  </p>
                  <p>You can block them in your browser settings, or opt out with Google&rsquo;s analytics opt-out add-on.</p>
                </>
              ),
            }
          : {
              id: "no-tracking",
              heading: "No tracking or advertising cookies",
              body: (
                <p>
                  We don&rsquo;t use cookies to track you across other websites or to show you ads. If we add analytics in the
                  future, we will update this policy first and ask for consent where the law requires it.
                </p>
              ),
            },
        {
          id: "third-parties",
          heading: "Third-party content",
          body: <p>Pages that link to other websites, such as client projects, may set their own cookies once you visit them. Those sites have their own policies.</p>,
        },
        {
          id: "control",
          heading: "How to control cookies",
          body: (
            <p>
              You can block or delete cookies in your browser settings. The site will still work, but the thank-you page after
              an inquiry may not appear. Your message will still be sent.
            </p>
          ),
        },
        {
          id: "changes",
          heading: "Changes to this policy",
          body: <p>We will update this page if the cookies we use change. The date at the top shows when it last changed.</p>,
        },
      ]}
    />
  );
}
