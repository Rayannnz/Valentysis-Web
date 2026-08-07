"use client";

import { useRouter } from "next/navigation";
import { FormEvent, type ReactNode, useEffect, useRef, useState } from "react";
import { industries } from "@/lib/industries";
import { services } from "@/lib/services";

/** Unselected dropdowns are reported as this rather than arriving blank. */
const FALLBACK = "Others";

/** Must match the <form name> declared in public/__forms.html. */
const FORM_NAME = "contact";

/* Netlify parses static HTML at deploy time, so the form is declared in
   public/__forms.html and submissions are posted back to that same file. */
const FORM_ENDPOINT = "/__forms.html";

const industryOptions = [...industries.map(({ name }) => name), FALLBACK];
const serviceOptions = [...services.map(({ shortTitle }) => shortTitle), FALLBACK];

function FieldLabel({
  htmlFor,
  children,
  required,
  optional,
}: {
  htmlFor: string;
  children: ReactNode;
  required?: boolean;
  optional?: boolean;
}) {
  return (
    <label className="app-label" htmlFor={htmlFor}>
      <span className="app-label-main">
        {children}
        {required && (
          <span className="req" aria-hidden="true">
            *
          </span>
        )}
        {optional && <span className="app-opt">(optional)</span>}
      </span>
    </label>
  );
}

export default function ContactForm() {
  const router = useRouter();
  const [industry, setIndustry] = useState("");
  const [service, setService] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [error, setError] = useState("");
  const errorRef = useRef<HTMLParagraphElement>(null);

  /* move focus to the failure message: role="alert" announces it, but a
     keyboard user is otherwise left on a button whose state just changed back */
  useEffect(() => {
    if (error) errorRef.current?.focus();
  }, [error]);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.reportValidity()) return;

    const fd = new FormData(form);
    /* required in the UI, but keep the fallback so nothing reaches sales blank */
    if (!fd.get("industry")) fd.set("industry", FALLBACK);
    if (!fd.get("service")) fd.set("service", FALLBACK);

    setStatus("sending");
    setError("");

    try {
      /* Netlify Forms does not accept JSON — this must be url-encoded */
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(fd as unknown as Record<string, string>).toString(),
      });

      if (!res.ok) {
        /* surfaced in devtools so a failed deploy config is diagnosable —
           404/405 means Netlify isn't handling POSTs to the form endpoint,
           which usually means form detection is off or __forms.html isn't deployed */
        const detail = await res.text().catch(() => "");
        console.error(
          `[contact] ${FORM_ENDPOINT} returned ${res.status} ${res.statusText}`,
          detail.slice(0, 300)
        );
        setError("Something went wrong sending that. Please try again, or email us directly.");
        setStatus("idle");
        return;
      }

      form.reset();
      setIndustry("");
      setService("");
      setStatus("sent");
      /* a real destination, so the confirmation is linkable and can be set as a
         conversion goal — the inline state below only shows if navigation stalls */
      router.push("/thank-you");
    } catch {
      setError("We couldn't reach the server. Please check your connection and try again.");
      setStatus("idle");
    }
  };

  if (status === "sent") {
    return (
      <div className="contact-form-card" data-reveal>
        <p className="form-success" style={{ display: "block" }} role="status">
          Thanks, your enquiry is in. Someone who actually runs the work, not a sales rep, will
          get back to you within one business day.
        </p>
        <div style={{ marginTop: 28 }}>
          <button className="btn btn-magenta" type="button" onClick={() => setStatus("idle")}>
            Send another enquiry
          </button>
        </div>
      </div>
    );
  }

  const sending = status === "sending";

  return (
    <div className="contact-form-card" data-reveal>
      <form
        className="application-form"
        name={FORM_NAME}
        method="post"
        data-netlify="true"
        netlify-honeypot="bot-field"
        onSubmit={onSubmit}
        noValidate
      >
        <input type="hidden" name="form-name" value={FORM_NAME} />

        <div className="app-field">
          <FieldLabel htmlFor="c-name" required>
            Your name
          </FieldLabel>
          <input id="c-name" name="fullName" type="text" autoComplete="name" required />
        </div>

        <div className="app-field">
          <FieldLabel htmlFor="c-company" optional>
            Company name
          </FieldLabel>
          <input id="c-company" name="company" type="text" autoComplete="organization" />
        </div>

        <div className="app-field">
          <FieldLabel htmlFor="c-email" required>
            Work email
          </FieldLabel>
          <input id="c-email" name="email" type="email" autoComplete="email" required />
        </div>

        <div className="app-field">
          <FieldLabel htmlFor="c-phone" required>
            Phone number
          </FieldLabel>
          <input id="c-phone" name="phone" type="tel" autoComplete="tel" required />
        </div>

        <div className="app-field">
          <FieldLabel htmlFor="c-industry" required>
            Choose industry
          </FieldLabel>
          <div className="app-select-wrap">
            <select
              id="c-industry"
              name="industry"
              required
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
            >
              <option value="" disabled>
                Select an industry
              </option>
              {industryOptions.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="app-field">
          <FieldLabel htmlFor="c-service" required>
            Choose service
          </FieldLabel>
          <div className="app-select-wrap">
            <select
              id="c-service"
              name="service"
              required
              value={service}
              onChange={(e) => setService(e.target.value)}
            >
              <option value="" disabled>
                Select a service
              </option>
              {serviceOptions.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="app-field">
          <FieldLabel htmlFor="c-idea" optional>
            Tell us about your idea
          </FieldLabel>
          <textarea id="c-idea" name="idea" rows={5} />
        </div>

        {/* honeypot — hidden from people, named to match netlify-honeypot above */}
        <div className="app-honeypot" aria-hidden="true">
          <label htmlFor="c-bot">Leave this field empty</label>
          <input id="c-bot" name="bot-field" type="text" tabIndex={-1} autoComplete="off" />
        </div>

        {error && (
          <p className="form-error" role="alert" tabIndex={-1} ref={errorRef}>
            {error}
          </p>
        )}

        <button
          className="btn btn-primary app-submit"
          type="submit"
          data-magnetic
          disabled={sending}
          aria-busy={sending}
        >
          {sending ? "Sending…" : "Send enquiry"}
          <svg
            className="arr"
            width="17"
            height="17"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.4"
          >
            <path d="M7 17L17 7M9 7h8v8" />
          </svg>
        </button>
      </form>
    </div>
  );
}
