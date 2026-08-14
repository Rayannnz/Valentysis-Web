/**
 * Cookie consent state.
 *
 * Nothing optional is loaded until a choice is recorded, so the default for a
 * first-time visitor is "everything off" rather than "on until they object".
 * The record itself lives in localStorage, not a cookie. It is a device
 * preference, it never travels to the server, and storing it this way keeps
 * the site from setting a cookie in order to ask about cookies.
 *
 * localStorage is external browser state, so components read it through
 * useSyncExternalStore rather than an effect, matching ServiceDetail and
 * Process. The snapshot is the raw string: it is referentially stable between
 * writes, which a freshly parsed object would not be.
 */

export const CONSENT_KEY = "valentisys.consent.v1";
export const CONSENT_EVENT = "valentisys:consent";

export type Consent = {
  /** Always true. Listed so the preference center can show it as locked. */
  necessary: true;
  analytics: boolean;
  marketing: boolean;
  /** ISO timestamp of the choice. What an audit request actually asks for. */
  decidedAt: string;
};

export const DENY_ALL: Omit<Consent, "decidedAt"> = {
  necessary: true,
  analytics: false,
  marketing: false,
};

export const ACCEPT_ALL: Omit<Consent, "decidedAt"> = {
  necessary: true,
  analytics: true,
  marketing: true,
};

/** No record on the server, so the banner never renders in the static HTML. */
export const SERVER_SNAPSHOT = "";

export function subscribeConsent(onChange: () => void) {
  /* CONSENT_EVENT covers this tab; "storage" fires only in other tabs, which is
     exactly what keeps a second tab in sync after a choice is made here */
  window.addEventListener(CONSENT_EVENT, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(CONSENT_EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

export function consentSnapshot(): string {
  try {
    return window.localStorage.getItem(CONSENT_KEY) ?? SERVER_SNAPSHOT;
  } catch {
    /* private mode or blocked storage. Treat as undecided */
    return SERVER_SNAPSHOT;
  }
}

export function parseConsent(raw: string): Consent | null {
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as Partial<Consent>;
    if (typeof parsed?.decidedAt !== "string") return null;
    return {
      necessary: true,
      analytics: parsed.analytics === true,
      marketing: parsed.marketing === true,
      decidedAt: parsed.decidedAt,
    };
  } catch {
    /* hand-edited or truncated value. Treat as undecided */
    return null;
  }
}

export function readConsent(): Consent | null {
  if (typeof window === "undefined") return null;
  return parseConsent(consentSnapshot());
}

export function writeConsent(choice: Omit<Consent, "decidedAt">): Consent {
  const record: Consent = { ...choice, necessary: true, decidedAt: new Date().toISOString() };
  try {
    window.localStorage.setItem(CONSENT_KEY, JSON.stringify(record));
  } catch {
    /* storage unavailable. The choice still applies for this page view */
  }
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT));
  return record;
}

export function clearConsent() {
  try {
    window.localStorage.removeItem(CONSENT_KEY);
  } catch {
    /* nothing to clear */
  }
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT));
}
