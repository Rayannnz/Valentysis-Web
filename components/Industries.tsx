"use client";

import { useEffect, useRef, useState } from "react";

const industries = [
  {
    name: "Fintech",
    desc: "Payments, dashboards, and financial tooling built with the audit trails, access controls, and careful data handling that money work demands.",
    tags: ["Digital banking", "Payments", "Wealthtech", "Compliance"],
  },
  {
    name: "Healthtech",
    desc: "Patient platforms, telemedicine, and clinical workflow tools — designed around strict privacy requirements and the integrations healthcare systems demand.",
    tags: ["Telemedicine", "EHR / EMR", "Patient portals", "Medical devices"],
  },
  {
    name: "Edtech",
    desc: "Learning platforms, assessment engines, and classroom tools built to grow from a pilot cohort to a full institution without a rewrite.",
    tags: ["LMS", "Assessment", "Gamification", "Analytics"],
  },
  {
    name: "Ecommerce",
    desc: "Headless storefronts, marketplace platforms, and checkout flows tuned for conversion — and for the traffic spike that arrives with a sale.",
    tags: ["Headless commerce", "Marketplaces", "Checkout", "Logistics"],
  },
  {
    name: "Proptech",
    desc: "Property management suites, listing platforms, and IoT-connected building software for a smarter built world.",
    tags: ["Listings", "Property management", "Smart buildings", "Valuation"],
  },
  {
    name: "AI & Data",
    desc: "LLM-powered features, retrieval pipelines, and the data plumbing behind them — taken from prototype to something you can safely put in front of users.",
    tags: ["Generative AI", "ML engineering", "Data platforms", "MLOps"],
  },
];

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

  return (
    <section id="industries" className="section">
      <div className="container">
        <div className="sec-head">
          <div>
            <p className="sec-eyebrow" data-reveal>Where we play</p>
            <h2 className="sec-title" data-reveal>Industries we serve</h2>
          </div>
          <p className="sec-note" data-reveal style={{ color: "rgba(255,255,255,.65)" }}>
            The sectors we build for — and what each one demands of the software.
          </p>
        </div>

        <div className="acc">
          {industries.map(({ name, desc, tags }, i) => (
            <div className={`acc-item${openIndex === i ? " open" : ""}`} key={name}>
              <button
                className="acc-btn"
                aria-expanded={openIndex === i}
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
              >
                <span className="acc-num">{String(i + 1).padStart(2, "0")}</span>
                <h3>{name}</h3>
                <span className="acc-icon" aria-hidden="true" />
              </button>
              <div
                className="acc-panel"
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
