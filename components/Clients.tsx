const logos: { name: string; variant?: "thin" | "mono" }[] = [
  { name: "NORDIQ" },
  { name: "helixlab", variant: "thin" },
  { name: "PAYCORE", variant: "mono" },
  { name: "Astrafin" },
  { name: "quantex", variant: "thin" },
  { name: "MERIDIAN" },
  { name: "ORBITPAY", variant: "mono" },
  { name: "Bluepeak" },
  { name: "cindra", variant: "thin" },
  { name: "VOXELY" },
];

export default function Clients() {
  return (
    <section id="clients" aria-label="Trusted by leading companies">
      <p className="clients-label" data-reveal>
        Trusted by the best
      </p>
      <div className="marquee">
        <div className="marquee-track">
          {[false, true].map((duplicate) =>
            logos.map(({ name, variant }) => (
              <span
                key={`${name}-${duplicate}`}
                className={`client-logo${variant ? ` ${variant}` : ""}`}
                aria-hidden={duplicate || undefined}
              >
                {name}
              </span>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
