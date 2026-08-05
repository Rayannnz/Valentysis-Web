"use client";

import { FormEvent, type ReactNode, useState } from "react";
import { services } from "@/lib/services";

const teams = services.map((s) => s.shortTitle);

const RESUME_ACCEPT = ".pdf,.png,.jpg,.jpeg,.webp,application/pdf,image/*";

/** Leads are sent to this WhatsApp number via a click-to-chat link. */
const WHATSAPP_NUMBER = "923240151555";

function buildWhatsAppUrl(fd: FormData) {
  const resume = fd.get("resume");
  const resumeName = resume instanceof File && resume.name ? resume.name : "—";
  const message = [
    "*New Career Application — Valentisys*",
    "",
    `*Name:* ${fd.get("fullName")}`,
    `*Email:* ${fd.get("email")}`,
    `*Contact:* ${fd.get("phone")}`,
    `*Team applying for:* ${fd.get("team")}`,
    `*Resume:* ${resumeName}`,
    "",
    "_I will attach my resume right after this message._",
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
  const [resumeName, setResumeName] = useState("");

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.reportValidity()) return;

    const url = buildWhatsAppUrl(new FormData(form));
    setWaUrl(url);
    window.open(url, "_blank", "noopener,noreferrer");

    form.reset();
    setTeam("");
    setResumeName("");
  };

  if (waUrl) {
    return (
      <div className="application-card" data-reveal>
        <h3 className="application-title">Application</h3>
        <p className="form-success" style={{ display: "block" }} role="status">
          Almost done! WhatsApp should have opened with your application details — press{" "}
          <strong>Send</strong> there, then attach your resume (PDF or image) in the same chat.
          If WhatsApp didn&apos;t open, use the button below.
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
      <h3 className="application-title">Application</h3>

      <form className="application-form" onSubmit={onSubmit} noValidate>
        <div className="app-grid">
          <div className="app-field">
            <FieldLabel htmlFor="app-name">Name</FieldLabel>
            <input id="app-name" name="fullName" type="text" autoComplete="name" required />
          </div>

          <div className="app-field">
            <FieldLabel
              htmlFor="app-email"
              hint="Keep an eye on your inbox for updates about your application."
            >
              Email
            </FieldLabel>
            <input id="app-email" name="email" type="email" autoComplete="email" required />
          </div>

          <div className="app-field">
            <FieldLabel
              htmlFor="app-phone"
              hint="Please make sure to include your country code in the phone number."
            >
              Contact
            </FieldLabel>
            <input
              id="app-phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              placeholder="+1 555 000 0000"
              required
            />
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
              htmlFor="app-resume"
              hint="PDF or image (PNG, JPG, WEBP) — max 10 MB. Your application opens in WhatsApp; attach this file there to complete it."
            >
              Resume
            </FieldLabel>
            <input
              id="app-resume"
              name="resume"
              className="app-file"
              type="file"
              accept={RESUME_ACCEPT}
              required
              onChange={(e) => setResumeName(e.target.files?.[0]?.name ?? "")}
            />
            {resumeName && (
              <span className="app-file-name" aria-live="polite">
                {resumeName}
              </span>
            )}
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
