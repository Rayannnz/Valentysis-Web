"use client";

import { FormEvent, type ReactNode, useMemo, useState } from "react";

const teams = [
  "Web Development",
  "Customer Support",
  "Outsourcing",
  "Social Media Marketing",
] as const;

const rolesByTeam: Record<(typeof teams)[number], string[]> = {
  "Web Development": [
    "Frontend Developer",
    "Backend Developer",
    "Full-Stack Developer",
    "UI/UX Designer",
    "QA Engineer",
  ],
  "Customer Support": [
    "Customer Support Agent",
    "Support Team Lead",
    "Live Chat Specialist",
    "Customer Success Associate",
  ],
  Outsourcing: [
    "Operations Coordinator",
    "Project Coordinator",
    "Virtual Assistant",
    "Process Specialist",
  ],
  "Social Media Marketing": [
    "Social Media Manager",
    "Content Creator",
    "Community Manager",
    "Paid Social Specialist",
  ],
};

const visaOptions = [
  "Citizen",
  "Permanent resident",
  "Work visa / permit",
  "Student visa",
  "Requires sponsorship",
  "Other",
];

const nationalities = [
  "Afghan",
  "American",
  "Australian",
  "Bangladeshi",
  "British",
  "Canadian",
  "Chinese",
  "Egyptian",
  "Emirati",
  "Filipino",
  "French",
  "German",
  "Indian",
  "Indonesian",
  "Irish",
  "Italian",
  "Japanese",
  "Kenyan",
  "Malaysian",
  "Mexican",
  "Nigerian",
  "Pakistani",
  "Saudi",
  "Singaporean",
  "South African",
  "Spanish",
  "Sri Lankan",
  "Turkish",
  "Other",
];

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
  const [sent, setSent] = useState(false);
  const [team, setTeam] = useState("");
  const [role, setRole] = useState("");

  const roles = useMemo(() => {
    if (!team || !(team in rolesByTeam)) return [];
    return rolesByTeam[team as (typeof teams)[number]];
  }, [team]);

  const onTeamChange = (value: string) => {
    setTeam(value);
    setRole("");
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(true);
    e.currentTarget.reset();
    setTeam("");
    setRole("");
  };

  if (sent) {
    return (
      <div className="application-card" data-reveal>
        <h3 className="application-title">Application</h3>
        <p className="form-success" style={{ display: "block" }} role="status">
          Application received — thank you! Our talent team will get back to you within five
          business days. Keep an eye on your inbox.
        </p>
        <button
          className="btn btn-primary"
          type="button"
          style={{ marginTop: 28 }}
          onClick={() => setSent(false)}
        >
          Submit another application
        </button>
      </div>
    );
  }

  return (
    <div className="application-card" data-reveal>
      <h3 className="application-title">Application</h3>

      <form className="application-form" onSubmit={onSubmit} noValidate>
        <div className="app-grid">
          <div className="app-field">
            <FieldLabel htmlFor="app-name">Full Name</FieldLabel>
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
            <FieldLabel htmlFor="app-age">How old are you?</FieldLabel>
            <input id="app-age" name="age" type="number" min={16} max={99} required />
          </div>

          <div className="app-field">
            <FieldLabel
              htmlFor="app-phone"
              hint="Please make sure to include your country code in the phone number."
            >
              Contact Number
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
            <FieldLabel htmlFor="app-visa">Visa Status</FieldLabel>
            <div className="app-select-wrap">
              <select id="app-visa" name="visaStatus" required defaultValue="">
                <option value="" disabled>
                  Select visa status
                </option>
                {visaOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="app-field">
            <FieldLabel htmlFor="app-team">Which team are you applying to?</FieldLabel>
            <div className="app-select-wrap">
              <select
                id="app-team"
                name="team"
                required
                value={team}
                onChange={(e) => onTeamChange(e.target.value)}
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

          <div className="app-field">
            <FieldLabel htmlFor="app-nationality">Nationality</FieldLabel>
            <div className="app-select-wrap">
              <select id="app-nationality" name="nationality" required defaultValue="">
                <option value="" disabled>
                  Select nationality
                </option>
                {nationalities.map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="app-field">
            <FieldLabel htmlFor="app-role">Which role are you interested in?</FieldLabel>
            <div className="app-select-wrap">
              <select
                id="app-role"
                name="role"
                required
                value={role}
                onChange={(e) => setRole(e.target.value)}
                disabled={!team}
              >
                <option value="" disabled>
                  {team ? "Select a role" : "Select a team first"}
                </option>
                {roles.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="app-field">
            <FieldLabel htmlFor="app-resume" hint="Show us what you've got">
              Resume{" "}
              <span className="app-label-soft">
                Attach your resume and/or portfolio here (Link Only)
              </span>
            </FieldLabel>
            <input
              id="app-resume"
              name="resume"
              type="url"
              placeholder="https://"
              required
            />
          </div>

          <div className="app-field">
            <FieldLabel
              htmlFor="app-video"
              hint="Show us who you are in 60 Seconds or less. Keep it short, sweet, and totally you"
            >
              Intro Video <span className="app-label-soft">(Link Only)</span>
            </FieldLabel>
            <input
              id="app-video"
              name="introVideo"
              type="url"
              placeholder="https://"
              required
            />
          </div>

          <div className="app-field">
            <FieldLabel
              htmlFor="app-salary"
              hint="Please precise the currency"
            >
              What is your monthly salary expectation?
            </FieldLabel>
            <input
              id="app-salary"
              name="salary"
              type="text"
              placeholder="e.g. USD 2,500"
              required
            />
          </div>
        </div>

        <button className="btn btn-primary app-submit" type="submit" data-magnetic>
          Submit application
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
