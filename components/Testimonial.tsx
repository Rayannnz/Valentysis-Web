export default function Testimonial() {
  return (
    <section id="testimonial" className="section">
      <div className="container">
        <div className="quote-wrap" data-reveal>
          <span className="quote-mark" aria-hidden="true">&ldquo;</span>
          <blockquote>
            <p>
              Valentisys didn&apos;t act like a vendor — they acted like the founding engineering
              team we never had. Eight months in, our platform handles 40&times; the traffic on half
              the infrastructure cost.
            </p>
          </blockquote>
          <div className="quote-author">
            <div className="quote-avatar" aria-hidden="true">AC</div>
            <b>Amara Chen</b>
            <span>CTO, Nordiq — Series B fintech</span>
          </div>
        </div>
      </div>
    </section>
  );
}
