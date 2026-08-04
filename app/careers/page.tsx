import type { Metadata } from "next";
import ApplicationForm from "@/components/ApplicationForm";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import PageEffects from "@/components/PageEffects";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Careers — Valentisys",
  description:
    "Join Valentisys across web development, customer support, outsourcing, and social media marketing. Apply through one form and pick the role that fits.",
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
    title: "Time to learn",
    desc: "Dedicated hours every sprint for the reading, courses, and side experiments that make you better at this — not squeezed into your weekend.",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
      </svg>
    ),
  },
  {
    title: "Sane hours",
    desc: "No crunch culture. We plan for the time work actually takes, and we don't ship on a Friday night to hit a date someone invented.",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M19 14c1.5-1.5 3-3.2 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.8 0-3 .5-4.5 2-1.5-1.5-2.7-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4 3 5.5l7 7z" />
      </svg>
    ),
  },
  {
    title: "Work that ships",
    desc: "Small team, real ownership. What you build goes live in weeks and gets used — it doesn't die in a backlog someone forgot about.",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M3 3v18h18" />
        <path d="M7 15l4-4 3 3 6-6" />
      </svg>
    ),
  },
  {
    title: "The right setup",
    desc: "The machine, screen, and tools you need to do the work properly — sorted before your first day, not after three approvals.",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="4" width="20" height="13" rx="2" />
        <path d="M8 21h8M12 17v4" />
      </svg>
    ),
  },
  {
    title: "Straight talk",
    desc: "Demo Fridays, direct feedback, and a real say in how we build. You'll never have to guess where you stand.",
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
          lead="We're building a team across web development, customer support, outsourcing, and social media marketing. If you like clear ownership, short feedback loops, and small egos, you'll fit right in."
        />

        <section className="section" style={{ paddingTop: 0 }}>
          <div className="container">
            <div className="sec-head">
              <div>
                <p className="sec-eyebrow" data-reveal>
                  Why Valentisys
                </p>
                <h2 className="sec-title" data-reveal>
                  Perks that actually matter
                </h2>
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
                Pick your team and the role you want — no separate posts to hunt through. Questions?{" "}
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
