import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import JsonLd from "@/components/JsonLd";
import PageEffects from "@/components/PageEffects";
import PageHero from "@/components/PageHero";
import { breadcrumbSchema, type Crumb, faqSchema, graph, webPageSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";

const TITLE = "Contact Us: Scope, Timeline & Price Upfront | Valentisys";
const DESCRIPTION =
  "Tell us what you need covered. Share your industry, the service you want and your budget, and someone who runs the work replies within one business day.";

export const metadata: Metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: "/contact",
});

const trail: Crumb[] = [
  { name: "Home", path: "/" },
  { name: "Contact", path: "/contact" },
];

/* Answers are on the page, not only in the markup. Google drops an FAQ graph
   whose questions a visitor cannot actually read. */
const faqs = [
  {
    q: "How quickly can you have someone working?",
    a: "For roles we staff regularly (front desk, paralegal support, bookkeeping, customer support), a shortlist usually reaches you within a week, and a trained person is on live work inside two to three weeks. Specialist or unusual briefs take longer, and we will say so at the scoping call rather than after you have signed.",
  },
  {
    q: "How is the work priced?",
    a: "Scope, hours, and cost are agreed in writing before anyone starts, so the first invoice holds no surprises. Ongoing staffing is priced monthly per person or per agreed capacity; project work such as an app or a website is quoted as a fixed price against a defined scope.",
  },
  {
    q: "Do we have to sign a long contract?",
    a: "No. There is no minimum term and no lock-in. You can scale down or stop with clear notice. We would rather keep the account by doing the work well than by holding you to a contract you have outgrown.",
  },
  {
    q: "Where is your team based, and which hours do you cover?",
    a: "Our office is in Lahore, Pakistan, and our teams are scheduled around your time zone and your customers' hours rather than ours. Cover for UK, European, US, and Gulf business hours is routine; tell us the window you need and we will confirm it in the scope.",
  },
  {
    q: "How do you protect our data and our clients' records?",
    a: "Everyone signs an NDA before starting. Access is least-privilege: people are given only the systems their role requires, and access is revoked when they roll off. We are used to the handling standards that legal, medical, and financial records carry, and we will work inside your systems and policies rather than copying data into ours.",
  },
  {
    q: "Can we meet the people before they start?",
    a: "Yes, and we prefer it. We shortlist against your brief and you meet and approve candidates before anyone touches live work. You are not handed an anonymous pool of seats.",
  },
];

export default function ContactPage() {
  return (
    <>
      <PageEffects />
      <Header />
      <main id="main">
        <PageHero
          eyebrow="Contact us"
          lines={[
            "Tell us what you",
            <>
              need <span className="accent">covered.</span>
            </>,
          ]}
          lead="Share a few details and someone who actually runs the work, not a sales rep, will get back to you within one business day."
        />

        <section id="contact" className="section section-after-hero">
          <div className="container">
            <div className="contact-layout">
              <div className="contact-info">
                <p className="sec-eyebrow" data-reveal>
                  Talk to us
                </p>
                <h2 data-reveal>Start with the problem, not the paperwork.</h2>
                <p data-reveal>
                  Outsourcing, customer support, digital marketing, apps, web, or AI. Tell us
                  what&apos;s slowing you down and we&apos;ll come back with scope, timeline, and a
                  clear price before any work starts.
                </p>
                {/* no email or postal address here by design. Both are published
                    in the Organization schema only, never on the page */}
                <p className="contact-hours" data-reveal>
                  Teams are scheduled around your time zone, not ours.
                </p>
              </div>

              <ContactForm />
            </div>
          </div>
        </section>

        <section className="section faq-section" style={{ paddingTop: 0 }}>
          <div className="container">
            <div className="sec-head">
              <div>
                <p className="sec-eyebrow" data-reveal>
                  Before you write
                </p>
                <h2 className="sec-title" data-reveal>
                  Questions we get asked first
                </h2>
              </div>
              <p className="sec-note" data-reveal>
                The answers we would give you on a first call, written down so you can decide
                whether it is worth having one.
              </p>
            </div>

            <div className="faq-grid">
              {faqs.map(({ q, a }) => (
                <article className="faq-item" data-reveal key={q}>
                  <h3>{q}</h3>
                  <p>{a}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <JsonLd
        data={graph(
          webPageSchema({
            name: TITLE,
            description: DESCRIPTION,
            path: "/contact",
            type: "ContactPage",
          }),
          breadcrumbSchema(trail),
          faqSchema(faqs)
        )}
      />
    </>
  );
}
