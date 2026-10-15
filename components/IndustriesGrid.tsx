import Link from "next/link";
import SectionHeader from "@/components/SectionHeader";
import { industries } from "@/lib/industries";

/* The homepage tiles. One per entry in lib/industries.ts, linking to that
   sector's accordion panel on /industries. */
export default function IndustriesGrid() {
  return (
    <section className="section ind-section">
      <div className="container">
        <SectionHeader
          eyebrow="Across industries"
          heading="Expertise for every kind of business."
          subline="The sectors we staff and support, and what each one gets from us."
        />

        <ul className="ind-grid">
          {industries.map(({ id, name, tagline }) => (
            <li key={id} data-reveal>
              {/* <Link>, not a bare anchor: this grid is never rendered on
                  /industries itself, so the accordion there reads the hash on
                  mount. See the note in HeaderClient.tsx. */}
              <Link className="ind-tile" href={`/industries#${id}`}>
                <h3>{name}</h3>
                <p>{tagline}</p>
                <span className="ind-tile-arrow" aria-hidden="true">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                    <path d="M7 17L17 7M9 7h8v8" />
                  </svg>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
