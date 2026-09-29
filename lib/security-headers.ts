/**
 * Response headers shared by next.config.ts (every route) and proxy.ts (the
 * legacy redirects). Next answers a config redirect before its headers() rule
 * runs, so a redirect defined there goes out bare; proxy.ts sets these itself.
 */
export const securityHeaders: { key: string; value: string }[] = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  /* the site uses none of these. interest-cohort was dropped: FLoC is gone and
     no browser parses the token any more */
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), browsing-topics=()",
  },
  { key: "X-DNS-Prefetch-Control", value: "on" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  { key: "X-Permitted-Cross-Domain-Policies", value: "none" },
  /* One year, this host only. `includeSubDomains` and `preload` are off on
     purpose until the subdomain plan is settled: includeSubDomains would break
     any future staging or mail host that is not HTTPS, and preload is a
     browser-list commitment that is slow to reverse. Add them in that order,
     after the domain has been live for a while. */
  { key: "Strict-Transport-Security", value: "max-age=31536000" },
];

/**
 * Production only (see next.config.ts). No nonces: that needs the proxy on
 * every request, which turns the static routes dynamic. 'unsafe-inline' for
 * scripts and styles is the cost of staying static; the clauses that carry the
 * weight here are frame-ancestors, base-uri, object-src, and form-action. The
 * site loads no third-party resource, so everything else is 'self'.
 */
export const contentSecurityPolicy = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data:",
  "font-src 'self'",
  "connect-src 'self'",
  "form-action 'self'",
  "frame-ancestors 'self'",
  "base-uri 'none'",
  "object-src 'none'",
].join("; ");
