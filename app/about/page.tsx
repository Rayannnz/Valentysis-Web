import type { Metadata } from "next";
import Cta from "@/components/Cta";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import PageEffects from "@/components/PageEffects";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "About Us — Valentisys",
  description:
    "Meet Valentisys: a small, senior software team building custom web, mobile, and cloud products that outlast trends.",
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
    desc: "We'd rather tell you not to build something than bill you for it. The goal is a client who comes back, not a longer invoice.",
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
    label: "Founders",
    title: "Getting a first version in front of users",
    desc: "You have a clear problem and need a small team that can go from empty repo to something real people can use — without burning a year of runway to get there.",
  },
  {
    label: "Scale-ups",
    title: "Adding senior capacity, fast",
    desc: "Your roadmap is longer than your team. We work inside your repo and your rituals as an extra squad, and leave when you no longer need us.",
  },
  {
    label: "Operators",
    title: "Replacing the spreadsheet",
    desc: "The manual process quietly holding the business together deserves real software. We build the internal tools nobody else wants to take on.",
  },
  {
    label: "Rescues",
    title: "Taking over someone else's codebase",
    desc: "A half-finished build, a contractor who vanished, a system nobody dares deploy. We audit it, tell you honestly whether to fix or rebuild, then do it.",
  },
];

const team = [
  { name: "Fareed Tanveer", role: "Chief Executive Officer" },
  { name: "Hasnat Khan", role: "Chief Operating Officer" },
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
          lead="We're a small, senior engineering team building software meant to still be running — and still be maintainable — long after the launch post goes out."
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
                  Valentisys started from a simple frustration: too much software gets sold by
                  people who will never have to maintain it. Scope inflates, timelines slip, and the
                  client is left holding a codebase nobody wants to open.
                </p>
                <p data-reveal>
                  So we built the opposite. Engineers run our projects, work is scoped and priced
                  before it starts, and there&apos;s a working demo every Friday — not a status
                  report describing one. If something is going wrong, you hear it from us first.
                </p>
                <p data-reveal>
                  We&apos;re deliberately small. That means we take on fewer projects than we could,
                  and the people you meet on the first call are the ones writing the code on the
                  last day.
                </p>
              </div>
              <div className="story-panel" data-reveal="scale">
                <span className="big">One team</span>
                <p>from the first call to the last deploy — no handoffs, no account managers.</p>
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
                If your situation isn&apos;t on this list, say so anyway — we&apos;ll tell you
                straight if we&apos;re the wrong team for it.
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

        <section className="section" style={{ paddingTop: 0 }}>
          <div className="container">
            <div className="sec-head">
              <div>
                <p className="sec-eyebrow" data-reveal>Leadership</p>
                <h2 className="sec-title" data-reveal>The people steering the ship</h2>
              </div>
              <p className="sec-note" data-reveal>
                The two people you&apos;ll actually be dealing with.
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
