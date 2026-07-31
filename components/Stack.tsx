"use client";

import { useState } from "react";

const categories = [
  { id: "frontend", label: "Frontend", items: ["React", "Next.js", "TypeScript", "Vue / Nuxt", "Angular", "Svelte", "Tailwind CSS", "GraphQL clients"] },
  { id: "backend", label: "Backend", items: ["Node.js", "Python", "Go", "Java / Kotlin", ".NET", "PostgreSQL", "Redis", "gRPC & GraphQL"] },
  { id: "mobile", label: "Mobile", items: ["Swift / iOS", "Kotlin / Android", "React Native", "Flutter"] },
  { id: "devops", label: "Cloud & DevOps", items: ["AWS", "Azure", "Google Cloud", "Kubernetes", "Docker", "Terraform", "GitHub Actions", "Observability"] },
  { id: "ai", label: "Data & AI", items: ["LLM integration", "PyTorch", "TensorFlow", "LangChain", "Vector databases", "Spark & dbt", "MLOps", "RAG pipelines"] },
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
            Boring where it should be, cutting-edge where it counts.
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
