"use client";

import Link from "next/link";
import { useState, useSyncExternalStore } from "react";
import {
  ACCEPT_ALL,
  DENY_ALL,
  SERVER_SNAPSHOT,
  consentSnapshot,
  subscribeConsent,
  writeConsent,
} from "@/lib/consent";

/**
 * First-visit consent banner.
 *
 * The stored choice is external browser state, so it is read through
 * useSyncExternalStore rather than an effect. The server snapshot is "no
 * record", which means the banner is absent from the static HTML and appears
 * on hydration only for visitors who have not answered — nobody who already
 * chose sees it flash.
 *
 * Accept and Reject carry equal visual weight. A prominent "Accept all" beside
 * a grayed-out refusal is the dark pattern regulators single out, and it is the
 * one thing that makes a consent banner worse than none at all.
 */
export default function CookieConsent() {
  const stored = useSyncExternalStore(
    subscribeConsent,
    consentSnapshot,
    () => SERVER_SNAPSHOT
  );

  /* The choice is saved the instant it is made, but the bar stays mounted for
     the length of its exit animation — without this it would vanish the same
     frame it was clicked, which reads as a glitch after a deliberate entrance. */
  const [exiting, setExiting] = useState(false);
  const decided = stored !== SERVER_SNAPSHOT;

  /* the preference center on /cookies writes through the same helpers, so
     withdrawing consent there brings this back without a reload */
  if (decided && !exiting) return null;

  const choose = (choice: typeof ACCEPT_ALL) => {
    setExiting(true);
    writeConsent(choice);
    /* matches the .34s cookieOut animation; reduced motion skips the wait
       rather than leaving a frozen bar on screen */
    const instant = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.setTimeout(() => setExiting(false), instant ? 0 : 360);
  };

  return (
    <div
      className={`cookie-bar${exiting ? " is-leaving" : ""}`}
      /* nothing here should be reachable once it is on its way out */
      inert={exiting || undefined}
      role="dialog"
      aria-modal="false"
      aria-labelledby="cookie-bar-title"
      aria-describedby="cookie-bar-desc"
    >
      <div className="cookie-bar-inner">
        <div className="cookie-bar-copy">
          <h2 id="cookie-bar-title">Cookies on this site</h2>
          <p id="cookie-bar-desc">
            We use cookies that are needed to make the site work. We&apos;d also like to set
            optional analytics cookies to understand how the site is used. Nothing optional is
            stored until you choose.{" "}
            <Link href="/cookies">Read our cookie policy</Link>.
          </p>
        </div>
        <div className="cookie-bar-actions">
          <button
            className="btn btn-primary cookie-btn"
            type="button"
            onClick={() => choose(ACCEPT_ALL)}
          >
            Accept all
          </button>
          <button
            className="btn btn-ghost cookie-btn"
            type="button"
            onClick={() => choose(DENY_ALL)}
          >
            Reject optional
          </button>
          <Link className="cookie-link" href="/cookies#preferences">
            Manage preferences
          </Link>
        </div>
      </div>
    </div>
  );
}
