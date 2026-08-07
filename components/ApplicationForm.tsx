"use client";

import { FormEvent, type ReactNode, useRef, useState } from "react";
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

/** Leads are sent to this WhatsApp number via a click-to-chat link. */
const WHATSAPP_NUMBER = "923240151555";

function buildWhatsAppUrl(fd: FormData) {
  const cv = fd.get("cv");
  const cvName = cv instanceof File && cv.name ? cv.name : "Not attached";
  const message = [
    "*New Career Application: Valentisys*",
    "",
    `*Name:* ${fd.get("fullName")}`,
    `*Email:* ${fd.get("email")}`,
    `*Contact:* ${fd.get("phone")}`,
    `*Team applying for:* ${fd.get("team")}`,
    `*CV:* ${cvName}`,
    "",
    "_I will attach my CV right after this message._",
  ].join("\n");
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

function FieldLabel({
  htmlFor,
  children,
  hint,
}: {
  htmlFor: string;
  children: ReactNode;
  hint?: string;
}) {
  return (
    <label className="app-label" htmlFor={htmlFor}>
      <span className="app-label-main">
        {children}
        <span className="req" aria-hidden="true">
          *
        </span>
      </span>
      {hint && <span className="app-hint">{hint}</span>}
    </label>
  );
}

export default function ApplicationForm() {
  const [waUrl, setWaUrl] = useState("");
  const [team, setTeam] = useState("");
  const [cvName, setCvName] = useState("");
  const cvInputRef = useRef<HTMLInputElement>(null);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.reportValidity()) return;

    const url = buildWhatsAppUrl(new FormData(form));
    setWaUrl(url);
    window.open(url, "_blank", "noopener,noreferrer");

    form.reset();
    setTeam("");
    setCvName("");
  };

  if (waUrl) {
    return (
      <div className="application-card" data-reveal>
        <h3 className="application-title">Application</h3>
        <p className="form-success" style={{ display: "block" }} role="status">
          Almost done! WhatsApp should have opened with your application details. Press{" "}
          <strong>Send</strong> there, then attach your CV (PDF or image) in the same chat. If
          WhatsApp didn&apos;t open, use the button below.
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 14, marginTop: 28 }}>
          <a
            className="btn btn-primary"
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Open WhatsApp
          </a>
          <button className="btn btn-magenta" type="button" onClick={() => setWaUrl("")}>
            Submit another application
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="application-card" data-reveal>
      <h3 className="application-title">APPLICATION FORM</h3>

      <form className="application-form" onSubmit={onSubmit} noValidate>
        {/* every .app-field holds exactly two children — label, then control — so the
            subgrid in globals.css can line the rows up across both columns */}
        <div className="app-grid">
          <div className="app-field">
            <FieldLabel htmlFor="app-name">Name</FieldLabel>
            <input id="app-name" name="fullName" type="text" autoComplete="name" required />
          </div>

          <div className="app-field">
            <FieldLabel
              htmlFor="app-email"
            >
              Email
            </FieldLabel>
            <input id="app-email" name="email" type="email" autoComplete="email" required />
          </div>

          <div className="app-field">
            <FieldLabel
              htmlFor="app-phone"
            >
              Contact
            </FieldLabel>
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
            <FieldLabel
              htmlFor="app-cv"
              hint="PDF or image (PNG, JPG), max 10 MB."
            >
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
                onChange={(e) => setCvName(e.target.files?.[0]?.name ?? "")}
              />
              <button
                className="app-file-btn"
                type="button"
                onClick={() => cvInputRef.current?.click()}
              >
                Choose CV
              </button>
              <span className="app-file-name" aria-live="polite">
                {cvName || "No CV selected"}
              </span>
            </div>
          </div>
        </div>

        <button className="btn btn-primary app-submit" type="submit" data-magnetic>
          Submit via WhatsApp
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
