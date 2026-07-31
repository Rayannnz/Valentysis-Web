"use client";

import { useEffect, useRef, useState } from "react";

const industries = [
  {
    name: "Fintech",
    desc: "Trading platforms, digital banking, payments infrastructure, and compliance-ready fintech products — built with the security posture regulators expect.",
    tags: ["Digital banking", "Payments", "Wealthtech", "Compliance"],
  },
  {
    name: "Healthtech",
    desc: "HIPAA-conscious patient platforms, telemedicine, EHR integrations, and clinical workflow tools that practitioners actually enjoy using.",
    tags: ["Telemedicine", "EHR / EMR", "Patient portals", "Medical devices"],
  },
  {
    name: "Edtech",
    desc: "Learning platforms, assessment engines, and classroom tools that scale from a pilot cohort to millions of learners.",
    tags: ["LMS", "Assessment", "Gamification", "Analytics"],
  },
  {
    name: "Ecommerce",
    desc: "Headless storefronts, marketplace platforms, and conversion-obsessed checkout experiences engineered for peak-season traffic.",
    tags: ["Headless commerce", "Marketplaces", "Checkout", "Logistics"],
  },
  {
    name: "Proptech",
    desc: "Property management suites, listing platforms, and IoT-connected building software for a smarter built world.",
    tags: ["Listings", "Property management", "Smart buildings", "Valuation"],
  },
  {
    name: "AI & Data",
    desc: "Generative AI products, ML pipelines, and data platforms — from proof of concept to governed, production-grade systems.",
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
            Deep domain knowledge in the sectors where software moves the fastest.
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
