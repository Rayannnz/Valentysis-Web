import Image from "next/image";
import { ReactNode } from "react";

export default function PageHero({
  eyebrow,
  lines,
  lead,
  art,
}: {
  eyebrow: string;
  lines: ReactNode[];
  lead?: string;
  /** decorative drawing for the empty right half; a transparent PNG path */
  art?: string;
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
          <p className="lead">
            {lead}
          </p>
        )}
        {/* Decorative, so alt="" and aria-hidden. fill + object-fit: contain
            because the drawings are trimmed to different aspect ratios. Eager
            with high fetch priority: it is in the first viewport on desktop. */}
        {art && (
          <div className="page-hero-art" aria-hidden="true">
            <Image
              src={art}
              alt=""
              fill
              sizes="(max-width: 960px) 320px, 26vw"
              loading="eager"
              fetchPriority="high"
            />
          </div>
        )}
      </div>
    </section>
  );
}
