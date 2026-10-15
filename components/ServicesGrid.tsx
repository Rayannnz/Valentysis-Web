import Link from "next/link";
import SectionHeader from "@/components/SectionHeader";
import { services } from "@/lib/services";

/* proposed copy, pending design review */
const HEADING = (
  <>
    One partner.
    <br />
    More possibilities.
  </>
);

const Arrow = () => (
  <svg className="arr" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden="true">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

/* The homepage card grid. One card per entry in lib/services.ts, in that order,
   numbered from the index. The whole card is the link. */
export default function ServicesGrid() {
  return (
    <section className="section svc-section">
      <div className="container">
        <SectionHeader
          eyebrow="What we do"
          heading={HEADING}
          subline="Everything under one roof: staff your operation, support your customers, and grow with marketing, apps, web, and AI."
          action={
            <Link className="sec-action" href="/services" data-reveal>
              View all services
              <Arrow />
            </Link>
          }
        />

        <ul className="svc-grid">
          {services.map(({ slug, shortTitle, homeDesc }, i) => (
            <li key={slug} data-reveal>
              <Link className="svc-card" href={`/services/${slug}`}>
                <span className="svc-card-num">{String(i + 1).padStart(2, "0")}</span>
                <h3>{shortTitle}</h3>
                <p>{homeDesc}</p>
                <span className="svc-card-link">
                  Explore service
                  <Arrow />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
