export default function Cta() {
  return (
    <section id="cta" className="section">
      <div className="cta-shapes" aria-hidden="true">
        <span>+</span>
        <span>×</span>
        <span>÷</span>
      </div>
      <div className="container cta-inner">
        <h2 data-reveal>
          <span className="line-mask"><span className="line">Looking for a software</span></span>
          <span className="line-mask"><span className="line">development partner?</span></span>
        </h2>
        <p data-reveal>
          Tell us where you&apos;re headed. We&apos;ll scope it, price it, and staff it — in days,
          not months.
        </p>
        <a className="btn btn-magenta" href="/#contact" data-magnetic data-reveal>
          Get my free estimate
          <svg className="arr" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
            <path d="M7 17L17 7M9 7h8v8" />
          </svg>
        </a>
      </div>
    </section>
  );
}
