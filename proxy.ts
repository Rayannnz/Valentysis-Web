import { NextResponse, type NextRequest } from "next/server";
import { securityHeaders } from "@/lib/security-headers";

/*
 * Legacy URLs, redirected here rather than in next.config.ts so the 308
 * carries the security headers. Next answers config redirects before its
 * headers() rule runs, so those responses went out with none of them, and
 * /privacy-policy and /terms-of-service are exactly the URLs crawlers and
 * typed links hit first. Permanent, so link equity transfers.
 *
 * `matcher` has to be a literal (Next reads it statically), so a new redirect
 * is added in both places. Only these paths invoke the proxy; every other
 * route stays fully static.
 */
const legacy: Record<string, string> = {
  "/services/customer-support": "/services/real-customer-support",
  "/services/social-media-marketing": "/services/digital-marketing",
  "/privacy-policy": "/privacy",
  "/terms-and-conditions": "/terms",
  "/terms-of-service": "/terms",
  "/cookie-policy": "/cookies",
};

export function proxy(request: NextRequest) {
  const to = legacy[request.nextUrl.pathname];
  if (!to) return NextResponse.next();
  const res = NextResponse.redirect(new URL(to, request.url), 308);
  for (const { key, value } of securityHeaders) res.headers.set(key, value);
  return res;
}

export const config = {
  matcher: [
    "/services/customer-support",
    "/services/social-media-marketing",
    "/privacy-policy",
    "/terms-and-conditions",
    "/terms-of-service",
    "/cookie-policy",
  ],
};
