import { ReactNode } from "react";

export default function PageHero({
  eyebrow,
  lines,
  lead,
}: {
  eyebrow: string;
  lines: ReactNode[];
  lead?: string;
}) {
  return (
    <section className="page-hero">
      <div className="hero-bg" aria-hidden="true">
        <div className="hero-blob b1" />
        <div className="hero-blob b2" />
        <div className="hero-grid-lines" />
      </div>
      <div className="container">
        <p className="hero-eyebrow">{eyebrow}</p>
        <h1 data-hero-lines>
          {lines.map((line, i) => (
            <span className="line-mask" key={i}>
              <span className="line">{line}</span>
            </span>
          ))}
        </h1>
        {lead && (
          <p className="lead" data-reveal>
            {lead}
          </p>
        )}
      </div>
    </section>
  );
}
