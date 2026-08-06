import type { Metadata } from "next";
import ApplicationForm from "@/components/ApplicationForm";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import PageEffects from "@/components/PageEffects";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Careers — Valentisys",
  description:
    "Join Valentisys across real customer support, web development, digital marketing, SEO, paid ads, design, and video. Apply through one form and pick the team that fits.",
};

export default function CareersPage() {
  return (
    <>
      <PageEffects />
      <Header />
      <main>
        <PageHero
          eyebrow="Careers"
          lines={[
            "Do the best work",
            <>
              of your <span className="accent">career.</span>
            </>,
          ]}
          lead="We're building a team across real customer support, web development, digital marketing, SEO, paid ads, graphic design, and video editing. If you like clear ownership, short feedback loops, and small egos, you'll fit right in."
        />

        <section id="apply" className="section application-section">
          <div className="container">
            <div className="sec-head application-sec-head">
              <div>
                <p className="sec-eyebrow" data-reveal>
                  Apply now
                </p>
                <h2 className="sec-title" data-reveal>
                  One form. Every role.
                </h2>
              </div>
              <p className="sec-note" data-reveal>
                Pick the team you want to join — no separate posts to hunt through. Questions?{" "}
                <a href="mailto:careers@valentisys.dev" style={{ textDecoration: "underline" }}>
                  careers@valentisys.dev
                </a>
              </p>
            </div>

            <ApplicationForm />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
