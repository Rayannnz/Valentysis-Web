import Link from "next/link";
import Cta from "@/components/Cta";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import PageEffects from "@/components/PageEffects";
import PageHero from "@/components/PageHero";
import ServiceDetail from "@/components/ServiceDetail";
import type { Service } from "@/lib/services";
import { services } from "@/lib/services";

function accentize(line: string, accentWord: string) {
  if (!line.includes(accentWord)) return line;
  const [before, after] = line.split(accentWord);
  return (
    <>
      {before}
      <span className="accent">{accentWord}</span>
      {after}
    </>
  );
}

export default function ServicePage({ service }: { service: Service }) {
  const others = services.filter((s) => s.slug !== service.slug);

  return (
    <>
      <PageEffects />
      <Header />
      <main>
        <PageHero
          eyebrow={service.eyebrow}
          lines={service.headline.map((line) => accentize(line, service.accentWord))}
          lead={service.lead}
        />

        <section className="section" style={{ paddingTop: 0 }}>
          <div className="container">
            <div className="about-story">
              <div className="story-copy">
                <p className="sec-eyebrow" data-reveal>
                  Overview
                </p>
                <h2 className="sec-title" data-reveal style={{ marginBottom: 26 }}>
                  {service.title}
                </h2>
                <p data-reveal>{service.summary}</p>
                <p data-reveal>
                  Tell us what you need covered. We&apos;ll come back with scope, timeline, and a
                  clear price before any work starts.
                </p>
                <div data-reveal style={{ marginTop: 28 }}>
                  <a className="btn btn-primary" href="/contact" data-magnetic>
                    Talk to us
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
                  </a>
                </div>
              </div>
              <div className="story-panel" data-reveal="scale">
                <span className="big">{service.panelLabel}</span>
                <p>{service.panelCopy}</p>
              </div>
            </div>
          </div>
        </section>

        {/* key resets the accordion's open state when moving between service pages,
            rather than adjusting it from a prop change */}
        {service.detail && <ServiceDetail detail={service.detail} key={service.slug} />}

        <section className="section" style={service.detail ? undefined : { paddingTop: 0 }}>
          <div className="container">
            <div className="sec-head">
              <div>
                <p className="sec-eyebrow" data-reveal>
                  What&apos;s included
                </p>
                <h2 className="sec-title" data-reveal>
                  How we deliver
                </h2>
              </div>
              <p className="sec-note" data-reveal>
                Practical capabilities you can put to work, scoped to what you actually need.
              </p>
            </div>
            <div className="approach-grid">
              {service.offerings.map(({ title, desc }) => (
                <article className="ap-card" data-reveal key={title}>
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
                <p className="sec-eyebrow" data-reveal>
                  Good fits
                </p>
                <h2 className="sec-title" data-reveal>
                  Who this is for
                </h2>
              </div>
              <p className="sec-note" data-reveal>
                If your situation isn&apos;t listed, ask anyway. We&apos;ll tell you straight if
                we&apos;re the right partner.
              </p>
            </div>
            <div className="timeline">
              {service.fits.map(({ label, title, desc }) => (
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
                <p className="sec-eyebrow" data-reveal>
                  More services
                </p>
                <h2 className="sec-title" data-reveal>
                  Explore what else we offer
                </h2>
              </div>
            </div>
            <div className="svc-list">
              {others.map(({ slug, shortTitle, homeDesc }, i) => (
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

        <Cta />
      </main>
      <Footer />
    </>
  );
}
