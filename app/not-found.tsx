import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import PageEffects from "@/components/PageEffects";
import { industries } from "@/lib/industries";
import { services } from "@/lib/services";
import { contactEmail } from "@/lib/site";

export const metadata: Metadata = {
  /* absolute — a bare string picks up the layout's "%s | Valentisys" template
     and renders the brand twice */
  title: { absolute: "Page Not Found (404) | Valentisys Outsourcing & Support" },
  description:
    "That page could not be found. Jump back to the Valentisys home page, browse our services and industries, or tell us what you were looking for.",
  /* follow so the crawler still walks the recovery links out of here */
  robots: { index: false, follow: true },
};

const elsewhere = [
  { label: "Industries we serve", href: "/industries", desc: "Health, legal, engineering, finance, hospitality." },
  { label: "About us", href: "/about", desc: "How we work and who we do our best work with." },
  { label: "Careers", href: "/careers", desc: "Open teams and one form to apply through." },
  { label: "Full site map", href: "/sitemap", desc: "Every page on this site, in one list." },
];

export default function NotFound() {
  return (
    <>
      <PageEffects />
      <Header />
      <main id="main">
        <section className="error-hero">
          <div className="hero-bg" aria-hidden="true">
            <div className="hero-blob b1" />
            <div className="hero-blob b2" />
            <div className="hero-grid-lines" />
          </div>
          <div className="container">
            <p className="error-code" aria-hidden="true">
              404
            </p>
            <p className="hero-eyebrow">Page not found</p>
            <h1>
              We couldn&apos;t find <span className="accent">that page.</span>
            </h1>
            <p className="lead">
              The link may be out of date, or the address may have a typo in it. Nothing is broken
              on your end. Here is the way back.
            </p>
            <div className="error-ctas">
              <Link className="btn btn-primary" href="/" data-magnetic>
                Back to home
                <svg
                  className="arr"
                  width="17"
                  height="17"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.4"
                >
                  <path d="M7 17L17 7M9 7h8v8" />
                </svg>
              </Link>
              <Link className="btn btn-ghost" href="/contact" data-magnetic>
                Tell us what you needed
              </Link>
            </div>
          </div>
        </section>

        <section className="section" style={{ paddingTop: 0 }}>
          <div className="container">
            <div className="sec-head">
              <div>
                <p className="sec-eyebrow">Popular destinations</p>
                <h2 className="sec-title">Our services</h2>
              </div>
              <p className="sec-note">
                Six capabilities under one roof. If you arrived from an old link, the page you
                wanted is most likely one of these.
              </p>
            </div>

            <div className="svc-list">
              {services.map(({ slug, shortTitle, homeDesc }, i) => (
                <Link className="svc-row" href={`/services/${slug}`} key={slug}>
                  <span className="svc-num">/{String(i + 1).padStart(2, "0")}</span>
                  <h3>{shortTitle}</h3>
                  <p>{homeDesc}</p>
                  <span className="svc-arrow">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                    >
                      <path d="M7 17L17 7M9 7h8v8" />
                    </svg>
                  </span>
                </Link>
              ))}
            </div>

            <div className="error-links">
              <div className="error-links-col">
                <h3>Elsewhere on the site</h3>
                <ul>
                  {elsewhere.map(({ label, href, desc }) => (
                    <li key={href}>
                      <Link href={href}>{label}</Link>
                      <span>{desc}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="error-links-col">
                <h3>Industries</h3>
                <ul>
                  {industries.map(({ id, name, desc }) => (
                    <li key={id}>
                      {/* plain anchor — see the note in Header.tsx */}
                      <a href={`/industries#${id}`}>{name}</a>
                      <span>{desc.split(".")[0]}.</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <p className="error-help">
              Still stuck? Email <a href={`mailto:${contactEmail}`}>{contactEmail}</a> with the
              address you were trying to reach and we will point you to the right page.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
