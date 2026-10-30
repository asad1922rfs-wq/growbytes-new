import { LegalPage } from "@/components/legal/LegalPage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Cookie Policy",
  description: "Which cookies the Growbytes website uses and why.",
  path: "/cookies/",
});

export default function CookiesPage() {
  return (
    <LegalPage
      title="Cookie policy"
      path="/cookies/"
      updated="October 31, 2026"
      intro="Cookies are small files a website stores in your browser. We keep their use to a minimum: this site uses no advertising or tracking cookies."
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
        {
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
