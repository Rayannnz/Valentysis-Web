"use client";

import { FormEvent, useEffect, useRef, useState } from "react";

const roles = [
  {
    title: "Senior Frontend Engineer",
    meta: ["Engineering", "Remote", "Full-time"],
    blurb:
      "Own complex product surfaces end to end — architecture, performance budgets, and the design-system details that make interfaces feel effortless.",
    requirements: ["React / Next.js", "TypeScript", "Design systems", "Web performance", "5+ years"],
  },
  {
    title: "Backend Engineer",
    meta: ["Engineering", "Remote", "Full-time"],
    blurb:
      "Design and run the services behind high-traffic products: clean APIs, resilient data flows, and infrastructure that stays boring under load.",
    requirements: ["Node.js or Go", "PostgreSQL", "Distributed systems", "API design", "4+ years"],
  },
  {
    title: "Full-Stack Engineer",
    meta: ["Engineering", "Hybrid", "Full-time"],
    blurb:
      "Ship features across the whole stack for client squads — from schema to pixel — with the autonomy to make product calls along the way.",
    requirements: ["React", "Node.js", "SQL", "Testing culture", "4+ years"],
  },
  {
    title: "DevOps / Platform Engineer",
    meta: ["Engineering", "Remote", "Full-time"],
    blurb:
      "Build the paved road: CI/CD pipelines, Kubernetes platforms, and observability that lets thirty squads deploy on a Friday without fear.",
    requirements: ["Kubernetes", "Terraform", "AWS / GCP", "CI/CD", "Observability"],
  },
  {
    title: "Product Designer (UI/UX)",
    meta: ["Design", "Remote", "Full-time"],
    blurb:
      "Take products from fuzzy brief to polished design system — running discovery, prototyping fast, and sweating the micro-interactions.",
    requirements: ["Figma", "Design systems", "Prototyping", "User research", "3+ years"],
  },
  {
    title: "QA Automation Engineer",
    meta: ["Quality", "Hybrid", "Full-time"],
    blurb:
      "Make quality a feature: automated suites, performance and security gates, and the release confidence our clients pay for.",
    requirements: ["Playwright / Cypress", "API testing", "CI integration", "Performance testing"],
  },
];

export default function CareerRoles() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [sentRoles, setSentRoles] = useState<Set<number>>(() => new Set());
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);

  /* animate panel height; re-measure when a form flips to its success state */
  useEffect(() => {
    const applyHeights = () => {
      panelRefs.current.forEach((panel, i) => {
        if (!panel) return;
        panel.style.maxHeight = i === openIndex ? `${panel.scrollHeight}px` : "0px";
      });
    };
    applyHeights();
    window.addEventListener("resize", applyHeights);
    return () => window.removeEventListener("resize", applyHeights);
  }, [openIndex, sentRoles]);

  const onApply = (index: number) => (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSentRoles((prev) => new Set(prev).add(index));
  };

  return (
    <div className="roles">
      {roles.map(({ title, meta, blurb, requirements }, i) => (
        <div className={`role-item${openIndex === i ? " open" : ""}`} key={title}>
          <button
            className="role-btn"
            aria-expanded={openIndex === i}
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
          >
            <span>
              <h3>{title}</h3>
              <span className="role-meta">
                {meta.map((m) => (
                  <span key={m}>{m}</span>
                ))}
              </span>
            </span>
            <span className="role-apply-hint">{openIndex === i ? "Close" : "Apply now"}</span>
            <span className="role-icon" aria-hidden="true" />
          </button>

          <div
            className="role-panel"
            ref={(el) => {
              panelRefs.current[i] = el;
            }}
          >
            <div className="role-panel-inner">
              <div className="role-about">
                <p>{blurb}</p>
                <h4>What we&apos;re looking for</h4>
                <div className="step-tags">
                  {requirements.map((req) => (
                    <span key={req}>{req}</span>
                  ))}
                </div>
              </div>

              <div className="apply-card">
                {sentRoles.has(i) ? (
                  <p className="form-success" style={{ display: "block" }} role="status">
                    Application received — thank you! Our talent team will get back to you within
                    five business days.
                  </p>
                ) : (
                  <>
                    <h4>Apply for this role</h4>
                    <form className="form" onSubmit={onApply(i)}>
                      <div className="field">
                        <label htmlFor={`name-${i}`}>Full name</label>
                        <input id={`name-${i}`} name="name" type="text" autoComplete="name" required />
                        <span className="bar" />
                      </div>
                      <div className="field">
                        <label htmlFor={`email-${i}`}>Email</label>
                        <input id={`email-${i}`} name="email" type="email" autoComplete="email" required />
                        <span className="bar" />
                      </div>
                      <div className="field">
                        <label htmlFor={`link-${i}`}>LinkedIn or portfolio (optional)</label>
                        <input id={`link-${i}`} name="link" type="url" placeholder="https://" />
                        <span className="bar" />
                      </div>
                      <div className="field">
                        <label htmlFor={`resume-${i}`}>Resume (PDF, optional)</label>
                        <input id={`resume-${i}`} name="resume" type="file" accept=".pdf,.doc,.docx" />
                      </div>
                      <div className="field">
                        <label htmlFor={`msg-${i}`}>Why you?</label>
                        <textarea id={`msg-${i}`} name="message" rows={3} required />
                        <span className="bar" />
                      </div>
                      <button className="btn btn-primary" type="submit">
                        Submit application
                        <svg className="arr" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                          <path d="M7 17L17 7M9 7h8v8" />
                        </svg>
                      </button>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
