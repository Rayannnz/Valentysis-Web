export default function Hero() {
  return (
    <section id="hero">
      <div className="hero-bg" aria-hidden="true">
        <div className="hero-blob b1" />
        <div className="hero-blob b2" />
        <div className="hero-grid-lines" />
      </div>

      <div className="hero-chip c1" data-parallax="26" aria-hidden="true">
        <b>Staff</b>
        <span>teams that plug straight in</span>
      </div>
      <div className="hero-chip c2" data-parallax="-18" aria-hidden="true">
        <b>Support</b>
        <span>customers feel heard</span>
      </div>
      <div className="hero-chip c3" data-parallax="14" aria-hidden="true">
        <b>Growth</b>
        <span>social that builds reach</span>
      </div>

      <div className="container hero-inner">
        <p className="hero-eyebrow">Outsourcing, support & growth</p>
        <h1 data-hero-lines aria-label="Staff, support, and grow your business.">
          <span className="line-mask">
            <span className="line">
              <span className="accent">Staff,</span> <span className="outline">support,</span>
            </span>
          </span>
          <span className="line-mask"><span className="line">& grow your</span></span>
          <span className="line-mask"><span className="line">business.</span></span>
        </h1>
        <p className="hero-sub" data-reveal>
          Dedicated remote staff and customer support for health, legal, engineering, finance,
          and hospitality, plus the social, app, and web work that grows what you&apos;ve built.
        </p>
        <div className="hero-ctas" data-reveal>
          <a className="btn btn-primary" href="/contact" data-magnetic>
            Get in touch
            <svg className="arr" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
              <path d="M7 17L17 7M9 7h8v8" />
            </svg>
          </a>
          <a className="btn btn-ghost" href="#services" data-magnetic>
            Explore services
          </a>
        </div>
      </div>
    </section>
  );
}
