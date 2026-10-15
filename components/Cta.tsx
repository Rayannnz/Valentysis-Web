import Link from "next/link";

/* proposed copy, pending design review */
const HEADING = "Let's make your next hire easy.";
const LEAD = "Tell us what you need and we'll scope it, price it, and staff it in days, not months.";

export default function Cta() {
  return (
    <section id="cta" className="section">
      <div className="container cta-inner">
        <h2 data-reveal>{HEADING}</h2>
        <p data-reveal>{LEAD}</p>
        <Link className="btn btn-primary" href="/contact" data-magnetic data-reveal>
          Get Started
          <svg className="arr" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden="true">
            <path d="M7 17L17 7M9 7h8v8" />
          </svg>
        </Link>
      </div>
    </section>
  );
}
