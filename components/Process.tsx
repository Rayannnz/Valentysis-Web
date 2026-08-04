"use client";

import { useEffect, useRef, useState } from "react";

const steps = [
  {
    title: "Discovery & scoping",
    desc: "We map your goals, users, and constraints into a concrete technical brief — with an estimate you can hold us to.",
    tags: ["Workshops", "Tech audit", "Roadmap"],
  },
  {
    title: "UX & UI design",
    desc: "Wireframes to polished design systems, validated with real users before a single line of code is written.",
    tags: ["Prototyping", "Design system", "User testing"],
  },
  {
    title: "Development",
    desc: "Two-week sprints with continuous integration, code review on every change, and a working demo every Friday.",
    tags: ["Agile sprints", "CI/CD", "Code review"],
  },
  {
    title: "QA & hardening",
    desc: "Automated test suites, performance budgets, and dependency scans gate every release candidate.",
    tags: ["Automation", "Security review", "Load testing"],
  },
  {
    title: "Launch",
    desc: "Staged rollouts, monitoring and alerting wired in before launch, and a rollback plan we hope never to use.",
    tags: ["Staged rollout", "Monitoring", "Runbooks"],
  },
  {
    title: "Scale & support",
    desc: "We stay on after launch — an agreed support window, an eye on the numbers, and a roadmap for whatever comes next.",
    tags: ["Support agreement", "Optimization", "Roadmap"],
  },
];

export default function Process() {
  const [active, setActive] = useState<Set<number>>(() => new Set([0]));
  const [current, setCurrent] = useState(0);
  const stepRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    if (!("IntersectionObserver" in window)) {
      setActive(new Set(steps.map((_, i) => i)));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const index = stepRefs.current.indexOf(e.target as HTMLElement);
          if (index === -1) return;
          setActive((prev) => (prev.has(index) ? prev : new Set(prev).add(index)));
          setCurrent(index);
        });
      },
      { threshold: 0, rootMargin: "-38% 0px -38% 0px" }
    );
    stepRefs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section id="process" className="section">
      <div className="container">
        <div className="process-layout">
          <div className="process-sticky">
            <p className="sec-eyebrow" data-reveal>The playbook</p>
            <h2 className="sec-title" data-reveal>How we work</h2>
            <div className="process-count" aria-hidden="true">
              <span>{String(current + 1).padStart(2, "0")}</span>
            </div>
          </div>

          <div className="steps">
            {steps.map(({ title, desc, tags }, i) => (
              <article
                className={`step${active.has(i) ? " active" : ""}`}
                key={title}
                ref={(el) => {
                  stepRefs.current[i] = el;
                }}
              >
                <span className="step-num">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{title}</h3>
                  <p>{desc}</p>
                  <div className="step-tags">
                    {tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
