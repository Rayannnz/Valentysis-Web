"use client";

import { useEffect, useRef } from "react";

function Counter({ target }: { target: number }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const animate = () => {
      if (reduceMotion) {
        el.textContent = String(target);
        return;
      }
      const dur = 1600;
      let start: number | null = null;
      const tick = (ts: number) => {
        if (start === null) start = ts;
        const p = Math.min((ts - start) / dur, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = String(Math.round(target * eased));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };

    if (!("IntersectionObserver" in window)) {
      el.textContent = String(target);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            animate();
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.6 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [target]);

  return <span ref={ref}>0</span>;
}

export default function Stats() {
  return (
    <section id="stats" aria-label="Company statistics">
      <div className="stats-grid">
        <div className="stat" data-reveal>
          <b><Counter target={700} /><i>+</i></b>
          <span>Engineers &amp; designers on board</span>
        </div>
        <div className="stat" data-reveal>
          <b><Counter target={500} /><i>+</i></b>
          <span>Products shipped since 2014</span>
        </div>
        <div className="stat" data-reveal>
          <b><Counter target={97} /><i>%</i></b>
          <span>Client retention, year over year</span>
        </div>
        <div className="stat" data-reveal>
          <b><i>$</i><Counter target={18} /><i>B</i></b>
          <span>Raised by clients we&apos;ve built for</span>
        </div>
      </div>
    </section>
  );
}
