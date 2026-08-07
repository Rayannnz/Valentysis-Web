"use client";

import { useRouter } from "next/navigation";
import { FormEvent, type ReactNode, useEffect, useRef, useState } from "react";
import { services } from "@/lib/services";

/** Roles hired for outside the service lines listed on the site. */
const extraRoles = [
  "AI Expert",
  "SEO Expert",
  "Ads Expert (Meta Ads / Google Ads)",
  "Graphic Designer & Video Editor",
];

/* outsourcing staffs the other lines rather than being a team of its own;
   AI is hired for as "AI Expert" above, so it isn't listed twice */
const excludedFromHiring = ["outsourcing", "ai-solutions"];

const teams = [
  ...services.filter((s) => !excludedFromHiring.includes(s.slug)).map((s) => s.shortTitle),
  ...extraRoles,
];

const CV_ACCEPT = ".pdf,.png,.jpg,.jpeg,.webp,application/pdf,image/*";

/* Netlify caps a whole form request at 8 MiB (8,388,608 bytes) and rejects anything
   larger with a 400 read straight off Content-Length, before the body finishes
   uploading — which surfaced here as the generic "something went wrong". Verified
   against the live endpoint: 8,300,000 bytes posts fine, 8,388,608 returns 400.
   Cap the CV under that so the other fields and multipart boundaries still fit. */
const MAX_CV_BYTES = 8_000_000;

const formatSize = (bytes: number) => `${(bytes / 1_000_000).toFixed(1)} MB`;

const OVERSIZE_MESSAGE = (bytes: number) =>
  `That CV is ${formatSize(bytes)}. The limit is 8 MB — please attach a smaller file.`;

/** Must match the <form name> declared in public/__forms.html. */
const FORM_NAME = "careers";

/* Netlify parses static HTML at deploy time, so the form is declared in
   public/__forms.html and submissions are posted back to that same file. */
const FORM_ENDPOINT = "/__forms.html";

function FieldLabel({
  htmlFor,
  children,
  hint,
  hintId,
}: {
  htmlFor: string;
  children: ReactNode;
  hint?: string;
  /** Lets a custom control point at the hint with aria-describedby. */
  hintId?: string;
}) {
  return (
    <label className="app-label" htmlFor={htmlFor}>
      <span className="app-label-main">
        {children}
        {/* the asterisk is decoration; `required` on the control is what a
            screen reader actually announces */}
        <span className="req" aria-hidden="true">
          *
        </span>
      </span>
      {hint && (
        <span className="app-hint" id={hintId}>
          {hint}
        </span>
      )}
    </label>
  );
}

export default function ApplicationForm() {
  const router = useRouter();
  const [team, setTeam] = useState("");
  const [cvName, setCvName] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [error, setError] = useState("");
  const cvInputRef = useRef<HTMLInputElement>(null);
  const errorRef = useRef<HTMLParagraphElement>(null);

  /* see the note in ContactForm — an announced error still needs focus moved */
  useEffect(() => {
    if (error) errorRef.current?.focus();
  }, [error]);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.reportValidity()) return;

    const fd = new FormData(form);

    setStatus("sending");
    setError("");

    try {
      /* the CV is a real file, so this posts multipart — no Content-Type header,
         the browser has to set its own multipart boundary */
      const res = await fetch(FORM_ENDPOINT, { method: "POST", body: fd });

      if (!res.ok) {
        /* surfaced in devtools so a failed deploy config is diagnosable — see ContactForm */
        const detail = await res.text().catch(() => "");
        console.error(
          `[careers] ${FORM_ENDPOINT} returned ${res.status} ${res.statusText}`,
          detail.slice(0, 300)
        );
        setError("Something went wrong sending that. Please try again.");
        setStatus("idle");
        return;
      }

      form.reset();
      setTeam("");
      setCvName("");
      setStatus("sent");
      /* see ContactForm — a linkable confirmation, trackable as a conversion */
      router.push("/thank-you/application");
    } catch {
      setError("We couldn't reach the server. Please check your connection and try again.");
      setStatus("idle");
    }
  };

  if (status === "sent") {
    return (
      <div className="application-card" data-reveal>
        <h3 className="application-title">APPLICATION FORM</h3>
        <p className="form-success" style={{ display: "block" }} role="status">
          Thanks, your application is in. We review every CV that comes through and will be in
          touch if there&apos;s a fit.
        </p>
        <div style={{ marginTop: 28 }}>
          <button className="btn btn-magenta" type="button" onClick={() => setStatus("idle")}>
            Submit another application
          </button>
        </div>
      </div>
    );
  }

  const sending = status === "sending";

  return (
    <div className="application-card" data-reveal>
      <h3 className="application-title">APPLICATION FORM</h3>

      <form
        className="application-form"
        name={FORM_NAME}
        method="post"
        encType="multipart/form-data"
        data-netlify="true"
        netlify-honeypot="bot-field"
        onSubmit={onSubmit}
        noValidate
      >
        <input type="hidden" name="form-name" value={FORM_NAME} />

        {/* every .app-field holds exactly two children — label, then control — so the
            subgrid in globals.css can line the rows up across both columns */}
        <div className="app-grid">
          <div className="app-field">
            <FieldLabel htmlFor="app-name">Name</FieldLabel>
            <input id="app-name" name="fullName" type="text" autoComplete="name" required />
          </div>

          <div className="app-field">
            <FieldLabel htmlFor="app-email">Email</FieldLabel>
            <input id="app-email" name="email" type="email" autoComplete="email" required />
          </div>

          <div className="app-field">
            {/* "Contact" was ambiguous for a tel field, and collided with the
                header's Contact link when read out of context */}
            <FieldLabel htmlFor="app-phone">Phone number</FieldLabel>
            <input id="app-phone" name="phone" type="tel" autoComplete="tel" required />
          </div>

          <div className="app-field">
            <FieldLabel htmlFor="app-team">Team applying for</FieldLabel>
            <div className="app-select-wrap">
              <select
                id="app-team"
                name="team"
                required
                value={team}
                onChange={(e) => setTeam(e.target.value)}
              >
                <option value="" disabled>
                  Select a team
                </option>
                {teams.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="app-field app-field-wide">
            <FieldLabel htmlFor="app-cv" hint="PDF or image (PNG, JPG), max 8 MB." hintId="app-cv-hint">
              CV
            </FieldLabel>
            {/* the native control is layered invisibly over the zone so validation can
                still focus it, while the visible prompt reads "Choose CV" in every browser */}
            <div className="app-file-zone">
              <input
                ref={cvInputRef}
                id="app-cv"
                name="cv"
                className="app-file-input"
                type="file"
                accept={CV_ACCEPT}
                required
                tabIndex={-1}
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (!file) {
                    setCvName("");
                    return;
                  }
                  if (file.size > MAX_CV_BYTES) {
                    /* clear the input so the `required` check stays honest — a file
                       Netlify would reject must not look selected */
                    e.target.value = "";
                    setCvName("");
                    setError(OVERSIZE_MESSAGE(file.size));
                    return;
                  }
                  setError("");
                  setCvName(file.name);
                }}
              />
              {/* the native input is tabIndex -1, so this button is the only
                  keyboard route in — it has to carry the label, the format
                  hint, and the current selection itself */}
              <button
                className="app-file-btn"
                type="button"
                aria-label="Choose CV file"
                aria-describedby="app-cv-hint app-cv-name"
                onClick={() => cvInputRef.current?.click()}
              >
                Choose CV
              </button>
              <span className="app-file-name" id="app-cv-name" aria-live="polite">
                {cvName || "No CV selected"}
              </span>
            </div>
          </div>
        </div>

        {/* honeypot — hidden from people, named to match netlify-honeypot above */}
        <div className="app-honeypot" aria-hidden="true">
          <label htmlFor="app-bot">Leave this field empty</label>
          <input id="app-bot" name="bot-field" type="text" tabIndex={-1} autoComplete="off" />
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
          {sending ? "Sending…" : "Submit Application"}
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
