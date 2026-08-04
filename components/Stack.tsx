"use client";

import { useState } from "react";

/* What we actually build with day to day — not a list of everything that exists. */
const categories = [
  { id: "frontend", label: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Design systems"] },
  { id: "backend", label: "Backend", items: ["Node.js", "Python", "PostgreSQL", "Redis", "REST & GraphQL APIs"] },
  { id: "mobile", label: "Mobile", items: ["React Native", "Flutter", "App Store & Play releases"] },
  { id: "devops", label: "Cloud & DevOps", items: ["AWS", "Vercel", "Docker", "GitHub Actions", "Monitoring & logging"] },
  { id: "ai", label: "Data & AI", items: ["LLM integration", "RAG pipelines", "Vector databases", "Python data tooling"] },
];

export default function Stack() {
  const [activeId, setActiveId] = useState(categories[0].id);
  const active = categories.find((c) => c.id === activeId) ?? categories[0];

  return (
    <section id="stack" className="section">
      <div className="container">
        <div className="sec-head">
          <div>
            <p className="sec-eyebrow" data-reveal>Tools of the trade</p>
            <h2 className="sec-title" data-reveal>Our technology stack</h2>
          </div>
          <p className="sec-note" data-reveal>
            A deliberately short list — the tools we know well enough to be fast in.
          </p>
        </div>

        <div className="tabs" role="tablist" aria-label="Technology categories" data-reveal>
          {categories.map(({ id, label }) => (
            <button
              key={id}
              className="tab-btn"
              role="tab"
              aria-selected={id === activeId}
              aria-controls={`panel-${id}`}
              id={`tab-${id}`}
              onClick={() => setActiveId(id)}
            >
              {label}
            </button>
          ))}
        </div>

        {/* keyed by tab so switching remounts items and replays the stagger animation */}
        <div
          key={active.id}
          className="tab-panel show"
          id={`panel-${active.id}`}
          role="tabpanel"
          aria-labelledby={`tab-${active.id}`}
        >
          {active.items.map((item, i) => (
            <div className="tech" key={item} style={{ animationDelay: `${i * 55}ms` }}>
              <span className="dot" />
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
