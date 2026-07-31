const cards = [
  {
    title: "Senior talent only",
    desc: "Every squad is anchored by engineers with 8+ years of shipping production software — no bench, no juniors learning on your dime.",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2l2.9 6.26L21 9.27l-4.5 4.38L17.8 20 12 16.77 6.2 20l1.3-6.35L3 9.27l6.1-1.01L12 2z" />
      </svg>
    ),
  },
  {
    title: "Speed with discipline",
    desc: "Two-week sprints, demo every Friday, and delivery metrics you can audit. Fast never means sloppy.",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3.5 2" />
      </svg>
    ),
  },
  {
    title: "Security by default",
    desc: "SOC 2-aligned processes, least-privilege access, and security review gates on every release — from day one.",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="11" width="18" height="10" rx="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
  },
  {
    title: "Radical transparency",
    desc: "Your dashboards, our burn-down. You see velocity, budget, and risks in real time — never in a quarterly surprise.",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
];

export default function Approach() {
  return (
    <section id="approach" className="section">
      <div className="container">
        <div className="sec-head">
          <div>
            <p className="sec-eyebrow" data-reveal>Why Valentisys</p>
            <h2 className="sec-title" data-reveal>Our approach</h2>
          </div>
          <p className="sec-note" data-reveal>
            Four principles behind every engagement — no exceptions, no fine print.
          </p>
        </div>

        <div className="approach-grid">
          {cards.map(({ title, desc, icon }) => (
            <article className="ap-card" data-reveal key={title}>
              <div className="ap-icon">{icon}</div>
              <h3>{title}</h3>
              <p>{desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
