"use client";

import { useEffect, useRef, useState } from "react";
import type { ServiceDetail as Detail } from "@/lib/services";

export default function ServiceDetail({ detail }: { detail: Detail }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);

  /* animate panel height to its measured content size */
  useEffect(() => {
    const applyHeights = () => {
      panelRefs.current.forEach((panel, i) => {
        if (!panel) return;
        panel.style.maxHeight = i === openIndex ? `${panel.scrollHeight}px` : "0px";
      });
    };
    applyHeights();
    window.addEventListener("resize", applyHeights);
    return () => window.removeEventListener("resize", applyHeights);
  }, [openIndex]);

  /* open the group named in the URL hash, e.g. /services/...#medical */
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (!hash) return;
    const i = detail.groups.findIndex((g) => g.id === hash);
    if (i >= 0) setOpenIndex(i);
  }, [detail]);

  return (
    <section id="service-detail" className="section">
      <div className="container">
        <div className="sec-head">
          <div>
            <p className="sec-eyebrow" data-reveal>
              {detail.eyebrow}
            </p>
            <h2 className="sec-title" data-reveal>
              {detail.title}
            </h2>
          </div>
          <p className="sec-note" data-reveal>
            {detail.note}
          </p>
        </div>

        <div className="acc acc-compact">
          {detail.groups.map(({ id, name, tagline, blurb, items }, i) => (
            <div className={`acc-item${openIndex === i ? " open" : ""}`} id={id} key={id}>
              <button
                className="acc-btn"
                aria-expanded={openIndex === i}
                aria-controls={`${id}-panel`}
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
              >
                <span className="acc-num">{String(i + 1).padStart(2, "0")}</span>
                <span className="acc-head">
                  <h3>{name}</h3>
                  <em>{tagline}</em>
                </span>
                <span className="acc-icon" aria-hidden="true" />
              </button>
              <div
                className="acc-panel"
                id={`${id}-panel`}
                role="region"
                aria-label={name}
                ref={(el) => {
                  panelRefs.current[i] = el;
                }}
              >
                <div className="acc-panel-inner">
                  <div>
                    <p>{blurb}</p>
                    <div className="acc-cards">
                      {items.map(({ title, desc }) => (
                        <article className="acc-card" key={title}>
                          <h4>{title}</h4>
                          <p>{desc}</p>
                        </article>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
