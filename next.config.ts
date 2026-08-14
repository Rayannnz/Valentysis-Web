import type { NextConfig } from "next";

/**
 * Everything must live inside this one object. A previous revision assigned
 * `module.exports = { allowedDevOrigins }` below the declaration, which
 * clobbered `export default nextConfig` and silently dropped the redirects —
 * both legacy service URLs were returning 404 in production.
 */
const nextConfig: NextConfig = {
  allowedDevOrigins: ["10.50.91.50"],

  /* no value in advertising the framework version to scanners */
  poweredByHeader: false,

  async redirects() {
    return [
      /* legacy service slugs — kept permanent so link equity transfers */
      {
        source: "/services/customer-support",
        destination: "/services/real-customer-support",
        permanent: true,
      },
      {
        source: "/services/social-media-marketing",
        destination: "/services/digital-marketing",
        permanent: true,
      },
      /* paths people and crawlers guess at; all three legal pages get hit
         under several conventional names */
      { source: "/privacy-policy", destination: "/privacy", permanent: true },
      { source: "/terms-and-conditions", destination: "/terms", permanent: true },
      { source: "/terms-of-service", destination: "/terms", permanent: true },
      { source: "/cookie-policy", destination: "/cookies", permanent: true },
    ];
  },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          /* the site uses no camera, mic, or geolocation — deny them outright */
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
          },
          { key: "X-DNS-Prefetch-Control", value: "on" },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
        ],
      },
      /* No rule for /_next/static — those files are content-hashed and Next
         already serves them immutable for a year. Overriding it makes the
         build warn that it can break dev behaviour. */
      {
        /* logos and icons are stable but not hashed — a day of cache with a
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
