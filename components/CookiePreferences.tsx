"use client";

import { useMemo, useState, useSyncExternalStore } from "react";
import {
  ACCEPT_ALL,
  DENY_ALL,
  SERVER_SNAPSHOT,
  clearConsent,
  consentSnapshot,
  parseConsent,
  subscribeConsent,
  writeConsent,
} from "@/lib/consent";

const CATEGORIES = [
  {
    key: "necessary" as const,
    name: "Strictly necessary",
    desc: "Keeps the site working: page routing, form submission, and remembering this cookie choice. These cannot be switched off, and none of them track you.",
    locked: true,
  },
  {
    key: "analytics" as const,
    name: "Analytics",
    desc: "Anonymous statistics about which pages are read and how people arrive, so we know what to improve. Never used to identify you.",
    locked: false,
  },
  {
    key: "marketing" as const,
    name: "Marketing",
    desc: "Lets us measure whether an advert led to an enquiry, and avoid showing you the same one repeatedly.",
    locked: false,
  },
];

const formatDate = (iso: string) =>
  new Date(iso).toLocaleString("en-GB", { dateStyle: "long", timeStyle: "short" });

export default function CookiePreferences() {
  /* the raw string is the stable snapshot; parsing it here keeps the object
     identity tied to the value rather than to the render */
  const stored = useSyncExternalStore(subscribeConsent, consentSnapshot, () => SERVER_SNAPSHOT);
  const saved = useMemo(() => parseConsent(stored), [stored]);

  /* SERVER_SNAPSHOT during hydration too, so the toggles are only trustworthy
     once the client snapshot has arrived */
  const ready = useSyncExternalStore(
    subscribeConsent,
    () => true,
    () => false
  );

  const [draft, setDraft] = useState({ analytics: false, marketing: false });
  const [confirmation, setConfirmation] = useState("");

  /* adjust during render instead of syncing in an effect, so the toggles are
     correct on the same commit the stored value lands — the pattern used by
     ServiceDetail and Header */
  const [prevStored, setPrevStored] = useState(stored);
  if (stored !== prevStored) {
    setPrevStored(stored);
    setDraft({ analytics: saved?.analytics ?? false, marketing: saved?.marketing ?? false });
  }

  const apply = (choice: { analytics: boolean; marketing: boolean }, message: string) => {
    writeConsent({ ...DENY_ALL, ...choice });
    setDraft(choice);
    setConfirmation(message);
  };

  const withdraw = () => {
    clearConsent();
    setDraft({ analytics: false, marketing: false });
    setConfirmation("Your choice has been cleared. You'll be asked again on your next visit.");
  };

  return (
    <div className="prefs" id="preferences">
      <h2 className="prefs-title">Your cookie preferences</h2>

      <p className="prefs-status" role="status">
        {!ready
          ? "Loading your saved preferences…"
          : saved
            ? `Saved on ${formatDate(saved.decidedAt)}.`
            : "You haven't made a choice yet. Nothing optional is stored."}
      </p>

      <ul className="prefs-list">
        {CATEGORIES.map(({ key, name, desc, locked }) => {
          const checked = locked ? true : draft[key as "analytics" | "marketing"];
          return (
            <li className="prefs-row" key={key}>
              <div className="prefs-row-copy">
                <h3 id={`${key}-label`}>{name}</h3>
                <p id={`${key}-desc`}>{desc}</p>
              </div>
              {/* The label wrap makes the whole control clickable, but its only
                  non-hidden text is "On"/"Off" — which left both toggles
                  announcing as "Off, checkbox" with nothing to tell them apart.
                  aria-labelledby overrides that with the category heading; the
                  on/off state is already carried by the checked state. */}
              <label className={`prefs-toggle${locked ? " is-locked" : ""}`}>
                <input
                  type="checkbox"
                  checked={checked}
                  disabled={locked || !ready}
                  aria-labelledby={`${key}-label`}
                  aria-describedby={`${key}-desc`}
                  onChange={(e) => setDraft((prev) => ({ ...prev, [key]: e.target.checked }))}
                />
                <span className="prefs-switch" aria-hidden="true" />
                <span className="prefs-toggle-text">
                  {locked ? "Always on" : checked ? "On" : "Off"}
                </span>
              </label>
            </li>
          );
        })}
      </ul>

      <div className="prefs-actions">
        <button
          className="btn btn-primary"
          type="button"
          disabled={!ready}
          onClick={() => apply(draft, "Your preferences have been saved.")}
        >
          Save preferences
        </button>
        <button
          className="btn btn-ghost"
          type="button"
          disabled={!ready}
          onClick={() => apply(ACCEPT_ALL, "All cookies accepted.")}
        >
          Accept all
        </button>
        <button
          className="btn btn-ghost"
          type="button"
          disabled={!ready}
          onClick={() => apply({ analytics: false, marketing: false }, "Optional cookies rejected.")}
        >
          Reject optional
        </button>
        {saved && (
          <button className="prefs-withdraw" type="button" onClick={withdraw}>
            Withdraw my choice
          </button>
        )}
      </div>

      {/* polite so a save is announced without interrupting whatever is being read */}
      <p className="prefs-confirm" role="status" aria-live="polite">
        {confirmation}
      </p>
    </div>
  );
}
