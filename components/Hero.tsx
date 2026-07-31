export default function Hero() {
  return (
    <section id="hero">
      <div className="hero-bg" aria-hidden="true">
        <div className="hero-blob b1" />
        <div className="hero-blob b2" />
        <div className="hero-grid-lines" />
      </div>

      <div className="hero-chip c1" data-parallax="26" aria-hidden="true">
        <b>700+</b>
        <span>engineers on board</span>
      </div>
      <div className="hero-chip c2" data-parallax="-18" aria-hidden="true">
        <b>97%</b>
        <span>client retention</span>
      </div>
      <div className="hero-chip c3" data-parallax="14" aria-hidden="true">
        <b>$18B</b>
        <span>raised by our clients</span>
      </div>

      <div className="container hero-inner">
        <p className="hero-eyebrow">Software development company</p>
        <h1 data-hero-lines aria-label="Software development services, engineered to ship.">
          <span className="line-mask"><span className="line">Software</span></span>
          <span className="line-mask"><span className="line">development</span></span>
          <span className="line-mask">
            <span className="line">
              <span className="accent">services,</span> <span className="outline">engineered</span>
            </span>
          </span>
          <span className="line-mask"><span className="line">to ship.</span></span>
        </h1>
        <p className="hero-sub" data-reveal>
          We design, build, and scale custom software for startups and enterprises — pairing senior
          engineering teams with battle-tested delivery, so your product reaches the market faster.
        </p>
        <div className="hero-ctas" data-reveal>
          <a className="btn btn-primary" href="#contact" data-magnetic>
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

      <div className="scroll-hint" aria-hidden="true">
        <div className="wheel" />
        <span>Scroll to explore</span>
      </div>
    </section>
  );
}
