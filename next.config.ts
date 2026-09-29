import type { NextConfig } from "next";
import { contentSecurityPolicy, securityHeaders } from "./lib/security-headers";

/**
 * Everything must live inside this one object. A previous revision assigned
 * `module.exports = { allowedDevOrigins }` below the declaration, which
 * clobbered `export default nextConfig` and silently dropped the redirects.
 * Both legacy service URLs were returning 404 in production.
 *
 * The legacy-slug redirects are not here any more. They live in proxy.ts,
 * because Next answers a config redirect before headers() runs, so those 308s
 * went out with no security headers at all.
 */
const nextConfig: NextConfig = {
  allowedDevOrigins: ["10.50.91.50"],

  /* no value in advertising the framework version to scanners */
  poweredByHeader: false,

  async headers() {
    /* CSP only on the production build. The dev server needs eval and its
       websocket, and violations there would be noise rather than signal. */
    const isProduction = process.env.NODE_ENV === "production";
    return [
      {
        source: "/:path*",
        headers: [
          ...securityHeaders,
          ...(isProduction
            ? [{ key: "Content-Security-Policy", value: contentSecurityPolicy }]
            : []),
        ],
      },
      /* No rule for /_next/static. Those files are content-hashed and Next
         already serves them immutable for a year. Overriding it makes the
         build warn that it can break dev behavior. */
      {
        /* logos and icons are stable but not hashed. A day of cache with a
           week of stale-while-revalidate keeps them fast without pinning a
           replaced logo for a year */
        source: "/:path(logo|icons)/:file*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=86400, stale-while-revalidate=604800" },
        ],
      },
    ];
  },
};

export default nextConfig;
