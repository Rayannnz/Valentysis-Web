import type { Metadata } from "next";
import Cta from "@/components/Cta";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import JsonLd from "@/components/JsonLd";
import PageEffects from "@/components/PageEffects";
import PageHero from "@/components/PageHero";
import { breadcrumbSchema, type Crumb, graph, webPageSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";

const TITLE = "About Us: Your Outsourcing & Support Partner | Valentisys";
const DESCRIPTION =
  "How Valentisys matches and trains remote staff before they touch live work, the four values we hold to, and the situations where we do our best work.";

export const metadata: Metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: "/about",
});

const trail: Crumb[] = [
  { name: "Home", path: "/" },
  { name: "About us", path: "/about" },
];

const values = [
  {
    title: "Craft over shortcuts",
    desc: "We'd rather place one person who handles your work properly than five who need checking. Quality is the strategy.",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
      </svg>
    ),
  },
  {
    title: "Own the outcome",
    desc: "Nobody here says “not my job.” Every team owns the result on its account, from the first ticket to the number you judge us on.",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="12" cy="12" r="0.5" fill="currentColor" />
      </svg>
    ),
  },
  {
    title: "Candor, kindly",
    desc: "Direct feedback, early and often, delivered with respect. Surprises belong in demos, never in retrospectives.",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
  {
    title: "Clients as partners",
    desc: "We'd rather tell you a role isn't worth filling than bill you for it. The goal is a client who stays, not a longer invoice.",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
];

const fits = [
  {
    label: "Practices & firms",
    title: "Growing faster than you can hire",
    desc: "The caseload is up, local hiring is slow and expensive, and qualified people are doing work that should never have reached their desk.",
  },
  {
    label: "Front offices",
    title: "Calls and inquiries going unanswered",
    desc: "The phone rings out at lunch, inquiries sit overnight, and you can hear the business you're losing. We cover the hours you can't.",
  },
  {
    label: "Back offices",
    title: "Paperwork stacking up behind the work",
    desc: "Files, filings, invoices, and reconciliations quietly fall behind until a deadline forces a scramble. We keep them current instead.",
  },
  {
    label: "Rescues",
    title: "An outsourcing arrangement that went wrong",
    desc: "A provider who overpromised, staff who churned every month, quality you ended up policing yourself. We'll take an honest look and tell you what's salvageable.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageEffects />
      <Header />
      <main id="main">
        <PageHero
          eyebrow="About us"
          lines={[
            "An extension of",
            <>
              your <span className="accent">own team.</span>
            </>,
          ]}
          lead="We place trained people inside the businesses that need them: answering the calls, clearing the paperwork, and keeping the back office current. Then we help those businesses grow with social, apps, and web."
        />

        <section className="section section-after-hero">
          <div className="container">
            <div className="about-story">
              <div className="story-copy">
                <p className="sec-eyebrow" data-reveal>Our story</p>
                <h2 className="sec-title" data-reveal style={{ marginBottom: 26 }}>
                  Built around the work, not the headcount
                </h2>
                <p data-reveal>
                  Valentisys started from a simple frustration: outsourcing is usually sold by the
                  seat. You get bodies on a contract, a rotating cast nobody introduced you to, and
                  a quality problem that becomes yours to manage.
                </p>
                <p data-reveal>
                  So we built the opposite. People are matched to your brief and trained on your
                  process before they touch live work. You meet them first. The scope and the price
                  are agreed before anyone starts, and if something is going wrong you hear it from
                  us, not from your customers.
                </p>
                <p data-reveal>
                  We stay deliberately small on accounts. That means fewer clients than we could
                  take, and the people who scope your work are the ones still on it a year later.
                </p>
              </div>
              <div className="story-panel" data-reveal="scale">
                <span className="big">One team</span>
                <p>from the first call onward. No handoffs, no account managers in between.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="section" style={{ paddingTop: 0 }}>
          <div className="container">
            <div className="sec-head">
              <div>
                <p className="sec-eyebrow" data-reveal>What we stand for</p>
                <h2 className="sec-title" data-reveal>Our values</h2>
              </div>
              <p className="sec-note" data-reveal>
                Four rules that survive every retro, reorg, and roadmap.
              </p>
            </div>
            <div className="approach-grid">
              {values.map(({ title, desc, icon }) => (
                <article className="ap-card" data-reveal key={title}>
                  <div className="ap-icon">{icon}</div>
                  <h3>{title}</h3>
                  <p>{desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section" style={{ paddingTop: 0 }}>
          <div className="container">
            <div className="sec-head">
              <div>
                <p className="sec-eyebrow" data-reveal>Good fits</p>
                <h2 className="sec-title" data-reveal>Where we do our best work</h2>
              </div>
              <p className="sec-note" data-reveal>
                If your situation isn&apos;t on this list, say so anyway. We&apos;ll tell you
                straight if we&apos;re the wrong partner for it.
              </p>
            </div>
            <div className="timeline">
              {fits.map(({ label, title, desc }) => (
                <div className="tl-item" data-reveal key={label}>
                  <span className="tl-year">{label}</span>
                  <h3>{title}</h3>
                  <p>{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Cta />
      </main>
      <Footer />
      <JsonLd
        data={graph(
          webPageSchema({
            name: TITLE,
            description: DESCRIPTION,
            path: "/about",
            type: "AboutPage",
          }),
          breadcrumbSchema(trail)
        )}
      />
    </>
  );
}
