"use client";

import Link from "next/link";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import {
  ACCEPT_ALL,
  DENY_ALL,
  SERVER_SNAPSHOT,
  consentSnapshot,
  parseConsent,
  subscribeConsent,
  writeConsent,
} from "@/lib/consent";

/**
 * First-visit consent banner.
 *
 * The stored choice is external browser state, so it is read through
 * useSyncExternalStore rather than an effect. The server snapshot is "no
 * record", which means the bar IS in the prerendered HTML of every page. What
 * keeps a returning visitor from seeing it is the .75s entrance delay in
 * globals.css: the bar is held off-screen until hydration has read the real
 * value and unmounted it, so it never gets to move.
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
     the length of its exit animation. Without this it would vanish the same
     frame it was clicked, which reads as a glitch after a deliberate entrance. */
  const [exiting, setExiting] = useState(false);

  /* through the same parser the preference center uses. Comparing the raw
     string treated any damaged record as a decision and never asked again,
     while /cookies said no choice had been made */
  const decided = parseConsent(stored) !== null;
  const mounted = !decided || exiting;

  /* Publish the bar's height as --cookie-h so the footer can reserve room
     under it and the back-to-top button can clear it at every width. The bar
     is position:fixed, so nothing else in the layout can know its size. */
  const barRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const root = document.documentElement;
    const bar = barRef.current;
    if (!mounted || !bar) {
      root.style.removeProperty("--cookie-h");
      return;
    }
    const publish = () => {
      const offset = parseFloat(getComputedStyle(bar).bottom) || 0;
      root.style.setProperty("--cookie-h", `${bar.offsetHeight + offset}px`);
    };
    const ro = new ResizeObserver(publish);
    ro.observe(bar);
    publish();
    return () => {
      ro.disconnect();
      root.style.removeProperty("--cookie-h");
    };
  }, [mounted]);

  /* the preference center on /cookies writes through the same helpers, so
     withdrawing consent there brings this back without a reload */
  if (!mounted) return null;

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
      ref={barRef}
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
          {/* accurate, not boilerplate: the site sets no cookies at all today.
              The record of this choice is one localStorage item, and the
              optional categories are asked about ahead of any analytics. */}
          <p id="cookie-bar-desc">
            This site sets no tracking cookies. We keep one item on your device to remember the
            choice you make here, and we ask now for permission to use optional analytics, which we
            don&apos;t currently run. Nothing optional is stored until you choose.{" "}
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
