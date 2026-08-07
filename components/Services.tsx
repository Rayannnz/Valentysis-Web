import Link from "next/link";
import { services } from "@/lib/services";

export default function Services() {
  return (
    <section id="services" className="section">
      <div className="container">
        <div className="sec-head">
          <div>
            <p className="sec-eyebrow" data-reveal>
              What we do
            </p>
            <h2 className="sec-title" data-reveal>
              Services we provide
            </h2>
          </div>
          <p className="sec-note" data-reveal>
            Six capabilities under one roof: staff your operation, support your customers, and
            grow with social, apps, web, and AI.
          </p>
        </div>

        <div className="svc-list">
          {services.map(({ slug, shortTitle, homeDesc }, i) => (
            <Link className="svc-row" data-reveal href={`/services/${slug}`} key={slug}>
              <span className="svc-num">/{String(i + 1).padStart(2, "0")}</span>
              <h3>{shortTitle}</h3>
              <p>{homeDesc}</p>
              <span className="svc-arrow">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                >
                  <path d="M7 17L17 7M9 7h8v8" />
                </svg>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
