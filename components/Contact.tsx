"use client";

import { FormEvent, useState } from "react";

export default function Contact() {
  const [sent, setSent] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fields = form.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>("input, textarea");
    for (const field of fields) {
      if (!field.value.trim()) {
        field.focus();
        return;
      }
    }
    setSent(true);
    form.reset();
  };

  return (
    <section id="contact" className="section">
      <div className="container">
        <div className="contact-layout">
          <div className="contact-info">
            <p className="sec-eyebrow" data-reveal>Contact us</p>
            <h2 data-reveal>Tell us what you need covered.</h2>
            <p data-reveal>
              Share a few details and someone who actually runs the work, not a sales rep, will
              get back to you within one business day.
            </p>
            <div className="contact-rows" data-reveal>
              <a href="mailto:hello@valentisys.dev">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="m2 7 10 6L22 7" />
                </svg>
                hello@valentisys.dev
              </a>
              <a href="mailto:careers@valentisys.dev">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
                careers@valentisys.dev
              </a>
            </div>
          </div>

          <form className={`form${sent ? " sent" : ""}`} onSubmit={onSubmit} noValidate data-reveal>
            <div className="field">
              <label htmlFor="f-name">Your name</label>
              <input id="f-name" name="name" type="text" autoComplete="name" required />
              <span className="bar" />
            </div>
            <div className="field">
              <label htmlFor="f-email">Work email</label>
              <input id="f-email" name="email" type="email" autoComplete="email" required />
              <span className="bar" />
            </div>
            <div className="field">
              <label htmlFor="f-msg">What do you need covered?</label>
              <textarea id="f-msg" name="message" rows={4} required />
              <span className="bar" />
            </div>
            <button className="btn btn-primary" type="submit" data-magnetic>
              Send message
              <svg className="arr" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                <path d="M7 17L17 7M9 7h8v8" />
              </svg>
            </button>
            <p className="form-success" role="status">
              Thanks, your message is in. We&apos;ll reply within one business day.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
