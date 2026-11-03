import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { ArrowIcon, ButtonLink, Container } from "@/components/ui/primitives";
import { PerspectiveGrid } from "@/components/visuals/PerspectiveGrid";
import { MetaLead } from "@/components/layout/MetaPixel";
import { THANK_YOU_COOKIE } from "@/lib/inquiry/constants";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Thank you",
  description: "Your project inquiry was received.",
  path: "/thank-you/",
  noindex: true,
});

/** Only reachable after a delivered inquiry (cookie set by the server action). */
async function Gate({ children }: { children: React.ReactNode }) {
  const token = (await cookies()).get(THANK_YOU_COOKIE);
  if (!token) redirect("/contact/");
  return <>{children}</>;
}

const steps = [
  { title: "We read your message", body: "A real person reviews everything you sent." },
  { title: "We reply by email", body: "Expect a few quick questions or a suggested time for a call." },
  { title: "You get a clear quote", body: "Scope, timeline, and cost in writing. No obligation." },
];

const reading = [
  { title: "What to prepare before a website project", href: "/insights/prepare-before-redesigning-your-business-website/" },
  { title: "How to write a project brief", href: "/insights/how-to-write-a-project-brief-for-an-agency/" },
  { title: "See our client work", href: "/work/" },
];

export default function ThankYouPage() {
  return (
    <Suspense fallback={<div className="min-h-[70vh] bg-paper" />}>
      <Gate>
        <MetaLead />
        <section className="relative isolate overflow-hidden bg-paper">
          <PerspectiveGrid className="h-[60%]" />
          <Container className="py-20 lg:py-28">
            <div className="mx-auto max-w-3xl text-center">
              {/* Success mark: ring draws, tick pops */}
              <div aria-hidden="true" className="relative mx-auto grid size-24 place-items-center">
                <span className="ty-ring absolute inset-0 rounded-full border-4 border-accent/25" />
                <span className="ty-pop grid size-20 place-items-center rounded-full bg-accent text-white shadow-[0_24px_50px_-18px_rgb(242_107_58/0.7)]">
                  <svg viewBox="0 0 24 24" className="size-10 fill-none stroke-current" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
                    <path className="ty-tick" d="m5 12.5 4.5 4.5L19 7.5" pathLength={1} />
                  </svg>
                </span>
              </div>
              <p className="mt-8 text-eyebrow font-extrabold text-[#4a525a] uppercase">Message received</p>
              <h1 className="mt-4 text-h1 font-extrabold">
                Thank you. <span className="text-accent">We&rsquo;ll be in touch soon.</span>
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-lead text-muted">
                Your project details reached our team at info@growbytes.co. If you don&rsquo;t see a reply in your inbox, please
                check your spam folder.
              </p>
            </div>

            <ol className="mx-auto mt-14 grid max-w-5xl gap-4 md:grid-cols-3">
              {steps.map((s, i) => (
                <li key={s.title} className="rounded-3xl border border-line bg-white p-7">
                  <span className={`grid size-10 place-items-center rounded-full text-[0.9375rem] font-extrabold ${i === 0 ? "bg-accent text-white" : "bg-paper ring-1 ring-line"}`}>
                    {i + 1}
                  </span>
                  <h2 className="mt-5 text-[1.25rem] font-extrabold">{s.title}</h2>
                  <p className="mt-2 text-muted">{s.body}</p>
                </li>
              ))}
            </ol>

            <div className="mx-auto mt-14 max-w-5xl rounded-[2rem] bg-ink p-8 text-white sm:p-10">
              <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                <h2 className="text-h3 font-extrabold text-white">While you wait</h2>
                <ButtonLink href="/" variant="brand" arrow>
                  Back to home
                </ButtonLink>
              </div>
              <ul className="mt-6 grid gap-3 md:grid-cols-3">
                {reading.map((r) => (
                  <li key={r.href}>
                    <Link href={r.href} className="group flex h-full items-center justify-between gap-4 rounded-2xl bg-white/[0.06] p-5 ring-1 ring-white/10 transition-colors hover:bg-white/10">
                      <span className="font-semibold">{r.title}</span>
                      <ArrowIcon className="shrink-0 text-accent transition-transform group-hover:translate-x-1" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </Container>
        </section>
      </Gate>
    </Suspense>
  );
}
