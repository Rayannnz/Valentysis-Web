import type { Metadata } from "next";
import CareerRoles from "@/components/CareerRoles";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import PageEffects from "@/components/PageEffects";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Careers — Valentisys",
  description:
    "Join Valentisys and build software that outlasts trends. Explore open roles in engineering, design, and quality.",
};

const perks = [
  {
    title: "Remote-first, always",
    desc: "Work where you do your best thinking. We run async by default, with overlap hours instead of office hours.",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18" />
      </svg>
    ),
  },
  {
    title: "Learning budget",
    desc: "An annual stipend for courses, books, and conferences — plus dedicated time each sprint to actually use it.",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
      </svg>
    ),
  },
  {
    title: "Health & wellness",
    desc: "Full medical cover for you and your family, mental-health support, and a no-questions wellness allowance.",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M19 14c1.5-1.5 3-3.2 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.8 0-3 .5-4.5 2-1.5-1.5-2.7-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4 3 5.5l7 7z" />
      </svg>
    ),
  },
  {
    title: "Meaningful equity",
    desc: "Everyone shares in the upside. Transparent bands, annual refreshers, and no cliff surprises.",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M3 3v18h18" />
        <path d="M7 15l4-4 3 3 6-6" />
      </svg>
    ),
  },
  {
    title: "Top-tier hardware",
    desc: "The laptop, screen, and chair you want, refreshed on schedule — plus a home-office budget on day one.",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="4" width="20" height="13" rx="2" />
        <path d="M8 21h8M12 17v4" />
      </svg>
    ),
  },
  {
    title: "Ship-it culture",
    desc: "Quarterly hackathons, demo Fridays, and a promotion path that rewards impact — not tenure or politics.",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4.5 16.5c-1.5 1.3-2 5-2 5s3.7-.5 5-2c.7-.8.7-2 0-2.8-.8-.7-2.2-.7-3 .8z" />
        <path d="M12 15l-3-3a22 22 0 0 1 2-3.9A12.7 12.7 0 0 1 21.7 2.3 12.7 12.7 0 0 1 15.9 13a22 22 0 0 1-3.9 2z" />
        <path d="M9 12H4s.5-3.3 2-4.5c1.7-1.4 4 0 4 0M12 15v5s3.3-.5 4.5-2c1.4-1.7 0-4 0-4" />
      </svg>
    ),
  },
];

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
          lead="We're 700+ engineers, designers, and delivery leads building products used by millions. If you like hard problems and small egos, you'll fit right in."
        />

        <section className="section" style={{ paddingTop: 0 }}>
          <div className="container">
            <div className="sec-head">
              <div>
                <p className="sec-eyebrow" data-reveal>Why Valentisys</p>
                <h2 className="sec-title" data-reveal>Perks that actually matter</h2>
              </div>
              <p className="sec-note" data-reveal>
                No ping-pong-table theatre — just the conditions great work needs.
              </p>
            </div>

            <div className="perks-grid">
              {perks.map(({ title, desc, icon }) => (
                <article className="ap-card" data-reveal key={title}>
                  <div className="ap-icon">{icon}</div>
                  <h3>{title}</h3>
                  <p>{desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="roles" className="section" style={{ paddingTop: 0 }}>
          <div className="container">
            <div className="sec-head">
              <div>
                <p className="sec-eyebrow" data-reveal>Open roles</p>
                <h2 className="sec-title" data-reveal>Come build with us</h2>
              </div>
              <p className="sec-note" data-reveal>
                Don&apos;t see your role? Pitch us anyway at{" "}
                <a href="mailto:careers@valentisys.dev" style={{ textDecoration: "underline" }}>
                  careers@valentisys.dev
                </a>
                .
              </p>
            </div>

            <CareerRoles />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
