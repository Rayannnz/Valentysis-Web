"use client";

import { useEffect, useRef, useState } from "react";
import { industries } from "@/lib/industries";

export default function Industries() {
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

  /* open the industry named in the URL hash, e.g. /industries#health — also on
     hash-only changes, when nav links fire without remounting this component */
  useEffect(() => {
    const openFromHash = () => {
      const hash = window.location.hash.slice(1);
      if (!hash) return;
      const i = industries.findIndex((x) => x.id === hash);
      if (i >= 0) setOpenIndex(i);
    };
    openFromHash();
    window.addEventListener("hashchange", openFromHash);
    return () => window.removeEventListener("hashchange", openFromHash);
  }, []);

  return (
    <section id="industries" className="section">
      <div className="container">
        <div className="sec-head">
          <div>
            <p className="sec-eyebrow" data-reveal>Where we play</p>
            <h2 className="sec-title" data-reveal>Industries we serve</h2>
          </div>
          <p className="sec-note" data-reveal style={{ color: "rgba(255,255,255,.65)" }}>
            The sectors we staff and support, and what each one expects of the people doing it.
          </p>
        </div>

        <div className="acc">
          {industries.map(({ id, name, desc, tags }, i) => (
            <div className={`acc-item${openIndex === i ? " open" : ""}`} id={id} key={id}>
              <button
                className="acc-btn"
                aria-expanded={openIndex === i}
                aria-controls={`${id}-panel`}
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
              >
                <span className="acc-num">{String(i + 1).padStart(2, "0")}</span>
                <h3>{name}</h3>
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
                    <p>{desc}</p>
                    <div className="acc-tags">
                      {tags.map((tag) => (
                        <span key={tag}>{tag}</span>
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
