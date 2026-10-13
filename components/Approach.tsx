import Image from "next/image";

/* The icons are VTracer traces on a 1080px canvas (with a viewBox, so they
   scale). Each carries its own white canvas rect, which is invisible on the
   white card and is why .ap-icon has no tinted box of its own. */
const cards = [
  {
    title: "Trained for your sector",
    desc: "People who already know the paperwork, deadlines, and tone your industry runs on, not a generic pool learning it on your account.",
    icon: "/icons/approach-sector.svg",
  },
  {
    title: "Cover on your hours",
    desc: "Teams scheduled around your time zone and your customers' hours, so calls get answered and work lands when you need it, not ours.",
    icon: "/icons/approach-hours.svg",
  },
  {
    title: "Confidential by default",
    desc: "Signed NDAs, least-privilege access to your systems, and handling built for the records health, legal, and finance work depends on.",
    icon: "/icons/approach-confidential.svg",
  },
  {
    title: "Measured, not assumed",
    desc: "Agreed SLAs, weekly numbers, and a named contact who answers. You see the output instead of taking our word for it.",
    icon: "/icons/approach-measured.svg",
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
              <div className="ap-icon">
                <Image src={icon} alt="" width={56} height={56} />
              </div>
              <h3>{title}</h3>
              <p>{desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
