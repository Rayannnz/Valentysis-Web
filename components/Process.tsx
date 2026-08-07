"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";

/* Feature support never changes for the life of the page, so there's nothing to
   subscribe to. The server assumes support, matching the progressive-enhancement
   default of revealing steps on scroll. */
const neverChanges = () => () => {};

function useSupportsIntersectionObserver() {
  return useSyncExternalStore(
    neverChanges,
    () => "IntersectionObserver" in window,
    () => true
  );
}

const steps = [
  {
    title: "Scoping call",
    desc: "We map the work, the volume, and the hours you need covered, then come back with a scope and a price you can hold us to.",
    tags: ["Discovery", "Volume review", "Fixed quote"],
  },
  {
    title: "Team match",
    desc: "We shortlist people against your brief: sector experience, language, and the tools you already run on. You meet them before anything starts.",
    tags: ["Vetting", "Shortlist", "Your sign-off"],
  },
  {
    title: "Onboarding",
    desc: "Access, tools, and your process written into a runbook, so the team works your way from day one instead of guessing at it.",
    tags: ["Runbook", "Systems access", "Training"],
  },
  {
    title: "Supervised start",
    desc: "Live work begins under close supervision, with early output reviewed daily until the quality is where you want it.",
    tags: ["Daily review", "QA sampling", "Feedback loop"],
  },
  {
    title: "Reporting",
    desc: "Agreed SLAs, weekly numbers, and a named account lead who picks up when something needs escalating.",
    tags: ["SLAs", "Weekly reports", "Escalation path"],
  },
  {
    title: "Scale or adjust",
    desc: "Add hours, add people, or wind down as demand shifts. Reviewed every quarter so you never pay for capacity you stopped needing.",
    tags: ["Flex capacity", "Quarterly review", "No lock-in"],
  },
];

export default function Process() {
  const [active, setActive] = useState<Set<number>>(() => new Set([0]));
  const [current, setCurrent] = useState(0);
  const stepRefs = useRef<(HTMLElement | null)[]>([]);

  /* without IntersectionObserver there's no way to track scroll position, so every
     step is shown active rather than left permanently dimmed */
  const revealAll = !useSupportsIntersectionObserver();

  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
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
                className={`step${revealAll || active.has(i) ? " active" : ""}`}
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
