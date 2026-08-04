const commitments = [
  {
    title: "Senior-led",
    desc: "The people you meet on the first call are the people who write the code. Nothing gets handed down to someone you never met.",
  },
  {
    title: "Small by design",
    desc: "A focused team means fewer handoffs and faster decisions — no account managers sitting between you and the build.",
  },
  {
    title: "Scoped up front",
    desc: "We agree what we're building and what it costs before the work starts, so the invoice never arrives as a surprise.",
  },
  {
    title: "Yours to keep",
    desc: "Your repo, your cloud accounts, your documentation. Everything is handed over in full — no lock-in, no ransom.",
  },
];

export default function Stats() {
  return (
    <section id="stats" aria-label="How we work with clients">
      <div className="stats-grid stats-text">
        {commitments.map(({ title, desc }) => (
          <div className="stat" data-reveal key={title}>
            <b>{title}</b>
            <span>{desc}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
