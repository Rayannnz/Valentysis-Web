import SectionHeader from "@/components/SectionHeader";

/* proposed copy, pending design review */
const STATEMENT = "Outsourcing should feel like adding to your team, not managing a vendor.";

/* icon: an animated GIF from design under public/icons/why, with a first-frame
   PNG beside it that reduced-motion users get instead (the <picture> below) */
const principles = [
  {
    title: "Trained for your sector",
    icon: "sector",
    desc: "People who already know the paperwork, deadlines, and tone your industry runs on, not a generic pool learning it on your account.",
  },
  {
    title: "Cover on your hours",
    icon: "hours",
    desc: "Teams scheduled around your time zone and your customers' hours, so calls get answered and work lands when you need it, not ours.",
  },
  {
    title: "Confidential by default",
    icon: "confidential",
    desc: "Signed NDAs, least-privilege access to your systems, and handling built for the records health, legal, and finance work depends on.",
  },
  {
    title: "Measured, not assumed",
    icon: "measured",
    desc: "Agreed SLAs, weekly numbers, and a named contact who answers. You see the output instead of taking our word for it.",
  },
];

/* "Why Valentisys": one statement on the left, the four principles on the right.
   Replaces the old trust band plus principles grid. The id stays: the footer
   links to /#approach. */
export default function Approach() {
  return (
    <section id="approach" className="section">
      <div className="container why-layout">
        <div className="why-statement">
          <SectionHeader
            eyebrow="Why Valentisys"
            heading={STATEMENT}
            subline="The principles behind every engagement. No exceptions, no fine print."
          />
        </div>

        <ul className="why-grid">
          {principles.map(({ title, desc, icon }) => (
            <li className="ap-card" data-reveal key={title}>
              <div className="ap-icon ap-icon-img">
                {/* decorative: the heading beside it carries the meaning, so alt is
                    empty. A plain <img> inside <picture> is what the Next lint
                    rule allows; next/image has no reduced-motion source. */}
                <picture>
                  <source srcSet={"/icons/why/" + icon + ".png"} media="(prefers-reduced-motion: reduce)" />
                  <img src={"/icons/why/" + icon + ".gif"} width={256} height={256} alt="" loading="lazy" decoding="async" />
                </picture>
              </div>
              <h3>{title}</h3>
              <p>{desc}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
