const services = [
  {
    title: "Software development consulting",
    desc: "Audit, roadmap, and architecture guidance from principal-level engineers who have shipped at scale.",
  },
  {
    title: "Custom software development",
    desc: "Web, mobile, and cloud products built from scratch — designed around your business, not a template.",
  },
  {
    title: "Digital transformation",
    desc: "Modern platforms, automated workflows, and data pipelines that turn legacy operations into leverage.",
  },
  {
    title: "Legacy software modernization",
    desc: "Incremental re-architecture that retires technical debt without pausing your business.",
  },
  {
    title: "Dedicated development teams",
    desc: "Senior squads that plug into your roadmap in weeks — vetted engineers, zero hiring overhead.",
  },
  {
    title: "QA & test automation",
    desc: "Quality engineering baked into every sprint — automated suites, performance, and security testing.",
  },
];

export default function Services() {
  return (
    <section id="services" className="section">
      <div className="container">
        <div className="sec-head">
          <div>
            <p className="sec-eyebrow" data-reveal>What we do</p>
            <h2 className="sec-title" data-reveal>Services we provide</h2>
          </div>
          <p className="sec-note" data-reveal>
            End-to-end engineering — from the first whiteboard sketch to production at scale.
          </p>
        </div>

        <div className="svc-list">
          {services.map(({ title, desc }, i) => (
            <article className="svc-row" data-reveal key={title}>
              <span className="svc-num">/{String(i + 1).padStart(2, "0")}</span>
              <h3>{title}</h3>
              <p>{desc}</p>
              <span className="svc-arrow">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <path d="M7 17L17 7M9 7h8v8" />
                </svg>
              </span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
