import type { Metadata } from "next";
import Cta from "@/components/Cta";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import PageEffects from "@/components/PageEffects";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "About Us — Valentisys",
  description:
    "Meet Valentisys: a software development company of 700+ engineers, designers, and delivery leads building products that outlast trends.",
};

const values = [
  {
    title: "Craft over shortcuts",
    desc: "We'd rather ship one thing that lasts a decade than ten things that break by Friday. Quality is the strategy.",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
      </svg>
    ),
  },
  {
    title: "Own the outcome",
    desc: "Nobody here says 'not my job.' Every squad owns its product's success — from architecture to the metric that matters.",
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
    desc: "Direct feedback, early and often — delivered with respect. Surprises belong in demos, never in retrospectives.",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
  {
    title: "Clients as partners",
    desc: "We win when our clients win — which is why 97% of them stay, year after year, engagement after engagement.",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
];

const milestones = [
  {
    year: "2014",
    title: "Three engineers, one laptop each",
    desc: "Valentisys starts as a three-person consultancy fixing a fintech's failing trading platform — and shipping it in eleven weeks.",
  },
  {
    year: "2016",
    title: "First enterprise partnership",
    desc: "A Fortune 500 retailer trusts us with its checkout re-platform. Peak-season traffic triples; the platform doesn't blink.",
  },
  {
    year: "2019",
    title: "One hundred engineers",
    desc: "We cross 100 engineers and open our dedicated-teams practice, embedding senior squads inside client organizations.",
  },
  {
    year: "2022",
    title: "AI & Data practice launches",
    desc: "From ML pipelines to production LLM products, we formalize the practice that now powers a third of our engagements.",
  },
  {
    year: "2024",
    title: "Global by default",
    desc: "Delivery hubs across three continents put a senior Valentisys squad within four time zones of every client.",
  },
  {
    year: "2026",
    title: "700+ strong, still shipping",
    desc: "Five hundred products delivered, $18B raised by our clients, and a retention rate we guard like an SLA.",
  },
];

const team = [
  { name: "Rayan Malik", role: "Founder & CEO" },
  { name: "Sara Ahmed", role: "Chief Technology Officer" },
  { name: "Daniel Chen", role: "VP of Engineering" },
  { name: "Zara Iqbal", role: "Head of Design" },
  { name: "Omar Farooq", role: "Head of Delivery" },
  { name: "Emma Novak", role: "People & Culture" },
  { name: "Bilal Hussain", role: "Principal Engineer" },
  { name: "Lena Fischer", role: "Head of Quality" },
];

const initials = (name: string) =>
  name
    .split(" ")
    .map((part) => part[0])
    .join("");

export default function AboutPage() {
  return (
    <>
      <PageEffects />
      <Header />
      <main>
        <PageHero
          eyebrow="About us"
          lines={[
            "Software should",
            <>
              <span className="accent">outlast</span> trends.
            </>,
          ]}
          lead="Since 2014 we've been the engineering partner behind products that survive scale, audits, and time — for startups on their first release and enterprises on their fiftieth."
        />

        <section className="section" style={{ paddingTop: 0 }}>
          <div className="container">
            <div className="about-story">
              <div className="story-copy">
                <p className="sec-eyebrow" data-reveal>Our story</p>
                <h2 className="sec-title" data-reveal style={{ marginBottom: 26 }}>
                  Built by engineers, run by engineers
                </h2>
                <p data-reveal>
                  Valentisys began with a rescue mission: a trading platform bleeding users while its
                  vendor billed by the hour. Three engineers rewrote it in eleven weeks — and decided
                  a software company should never make its money from a client&apos;s problems
                  lasting longer.
                </p>
                <p data-reveal>
                  That principle still runs the place. Engineers lead our accounts, demos happen
                  every Friday, and every engagement is priced on outcomes we can be held to. It&apos;s
                  why the companies that hire us for one product stay for the next five.
                </p>
                <p data-reveal>
                  Today we&apos;re 700+ engineers, designers, and delivery leads across three
                  continents — small enough to care about every release, large enough to staff any
                  ambition.
                </p>
              </div>
              <div className="story-panel" data-reveal="scale">
                <span className="big">12 years</span>
                <p>of shipping software that our clients&apos; businesses stand on.</p>
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
                <p className="sec-eyebrow" data-reveal>The journey</p>
                <h2 className="sec-title" data-reveal>Twelve years in six chapters</h2>
              </div>
            </div>
            <div className="timeline">
              {milestones.map(({ year, title, desc }) => (
                <div className="tl-item" data-reveal key={year}>
                  <span className="tl-year">{year}</span>
                  <h3>{title}</h3>
                  <p>{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section" style={{ paddingTop: 0 }}>
          <div className="container">
            <div className="sec-head">
              <div>
                <p className="sec-eyebrow" data-reveal>Leadership</p>
                <h2 className="sec-title" data-reveal>The people steering the ship</h2>
              </div>
              <p className="sec-note" data-reveal>
                Backed by 700+ colleagues who do the real work.
              </p>
            </div>
            <div className="team-grid">
              {team.map(({ name, role }) => (
                <article className="team-card" data-reveal key={name}>
                  <div className="team-avatar" aria-hidden="true">{initials(name)}</div>
                  <b>{name}</b>
                  <span>{role}</span>
                </article>
              ))}
            </div>
          </div>
        </section>

        <Cta />
      </main>
      <Footer />
    </>
  );
}
