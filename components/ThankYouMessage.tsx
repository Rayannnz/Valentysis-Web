import Link from "next/link";
import { careersEmail, contactEmail } from "@/lib/site";

export type ThankYouVariant = "contact" | "careers";

/**
 * Confirmation copy for both forms.
 *
 * A server component taking the variant as a prop, deliberately. An earlier
 * revision read `?ref=` with useSearchParams behind a Suspense boundary, which
 * forces the whole route to BAILOUT_TO_CLIENT_SIDE_RENDERING — the prerendered
 * HTML was an empty div with no heading, so the page was blank until JS ran and
 * blank forever without it. Two static routes cost one extra file and render
 * real content on the server.
 */
const VARIANTS: Record<
  ThankYouVariant,
  {
    eyebrow: string;
    heading: string;
    accent: string;
    lead: string;
    steps: { title: string; desc: string }[];
    email: string;
    emailNote: string;
  }
> = {
  contact: {
    eyebrow: "Enquiry received",
    heading: "Thanks — that's",
    accent: "with us.",
    lead: "Someone who actually runs the work, not a sales rep, will read it and reply within one business day.",
    steps: [
      {
        title: "We read it properly",
        desc: "Your enquiry goes to the person who runs the service you asked about, not into a shared inbox.",
      },
      {
        title: "We come back with questions",
        desc: "Usually a short reply within one business day, asking whatever we need to scope the work honestly.",
      },
      {
        title: "You get scope, timeline, and price",
        desc: "Agreed in writing before anyone starts. If we are the wrong partner for it, we will say so instead.",
      },
    ],
    email: contactEmail,
    emailNote: "Need to add something, or forgot an attachment?",
  },
  careers: {
    eyebrow: "Application received",
    heading: "Thanks — your",
    accent: "CV is in.",
    lead: "We read every application that comes through. If there is a fit, you will hear from a person, not an autoresponder.",
    steps: [
      {
        title: "A person reviews it",
        desc: "Someone from the team you applied to reads your CV. No keyword filter decides this.",
      },
      {
        title: "We reply either way",
        desc: "If there is a fit we will be in touch to arrange a first conversation. If not, we will tell you rather than leave you waiting.",
      },
      {
        title: "We keep good CVs on file",
        desc: "With your consent, for up to 12 months, so we can come back to you when the right opening appears.",
      },
    ],
    email: careersEmail,
    emailNote: "Want to send a portfolio or add to your application?",
  },
};

export default function ThankYouMessage({ variant }: { variant: ThankYouVariant }) {
  const v = VARIANTS[variant];

  return (
    <>
      <section className="thanks-hero">
        <div className="hero-bg" aria-hidden="true">
          <div className="hero-blob b1" />
          <div className="hero-blob b2" />
          <div className="hero-grid-lines" />
        </div>
        <div className="container">
          <span className="thanks-tick" aria-hidden="true">
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6">
              <path d="M20 6L9 17l-5-5" />
            </svg>
          </span>
          <p className="hero-eyebrow">{v.eyebrow}</p>
          {/* the tick is decorative, so the confirmation has to be in the text */}
          <h1>
            {v.heading} <span className="accent">{v.accent}</span>
          </h1>
          <p className="lead">{v.lead}</p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="sec-head">
            <div>
              <p className="sec-eyebrow">What happens next</p>
              <h2 className="sec-title">No black box</h2>
            </div>
            <p className="sec-note">
              {v.emailNote} Email{" "}
              <a href={`mailto:${v.email}`} className="thanks-inline-link">
                {v.email}
              </a>{" "}
              and it will reach the same people.
            </p>
          </div>

          <div className="timeline">
            {v.steps.map(({ title, desc }, i) => (
              <div className="tl-item" key={title}>
                <span className="tl-year">Step {i + 1}</span>
                <h3>{title}</h3>
                <p>{desc}</p>
              </div>
            ))}
          </div>

          <div className="thanks-ctas">
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
            <Link className="btn btn-ghost" href="/services" data-magnetic>
              Explore our services
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
