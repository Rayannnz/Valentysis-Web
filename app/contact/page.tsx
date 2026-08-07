import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import PageEffects from "@/components/PageEffects";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Contact Us | Valentisys",
  description:
    "Tell us what you need covered. Share your industry, the service you're after, and your idea, and someone who actually runs the work will reply within one business day.",
};

export default function ContactPage() {
  return (
    <>
      <PageEffects />
      <Header />
      <main>
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

        <section id="contact" className="section" style={{ paddingTop: 0 }}>
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
                <div className="contact-rows" data-reveal>
                  <a href="mailto:hello@valentisys.dev">
                    <svg
                      width="22"
                      height="22"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <rect x="2" y="4" width="20" height="16" rx="2" />
                      <path d="m2 7 10 6L22 7" />
                    </svg>
                    hello@valentisys.dev
                  </a>
                  <a href="mailto:careers@valentisys.dev">
                    <svg
                      width="22"
                      height="22"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                    careers@valentisys.dev
                  </a>
                </div>
              </div>

              <ContactForm />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
