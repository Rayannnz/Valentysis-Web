const cards = [
  {
    title: "Trained for your sector",
    desc: "People who already know the paperwork, deadlines, and tone your industry runs on, not a generic pool learning it on your account.",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2l2.9 6.26L21 9.27l-4.5 4.38L17.8 20 12 16.77 6.2 20l1.3-6.35L3 9.27l6.1-1.01L12 2z" />
      </svg>
    ),
  },
  {
    title: "Cover on your hours",
    desc: "Teams scheduled around your time zone and your customers' hours, so calls get answered and work lands when you need it, not ours.",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3.5 2" />
      </svg>
    ),
  },
  {
    title: "Confidential by default",
    desc: "Signed NDAs, least-privilege access to your systems, and handling built for the records health, legal, and finance work depends on.",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="11" width="18" height="10" rx="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
  },
  {
    title: "Measured, not assumed",
    desc: "Agreed SLAs, weekly numbers, and a named contact who answers. You see the output instead of taking our word for it.",
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
            Four principles behind every engagement. No exceptions, no fine print.
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
