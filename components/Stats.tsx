const commitments = [
  {
    title: "Vetted, then trained",
    desc: "Everyone we place is screened for your industry and trained on your process before they touch a live file or a real customer.",
  },
  {
    title: "One point of contact",
    desc: "A named account lead who knows your business, not a ticket queue and a different name every week.",
  },
  {
    title: "Priced up front",
    desc: "Scope, hours, and cost agreed before the work starts, so the invoice never arrives as a surprise.",
  },
  {
    title: "No lock-in",
    desc: "Scale down or stop with clear notice. We keep the account by doing the work well, not by holding you to a contract.",
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
