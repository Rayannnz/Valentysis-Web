"use client";

import Link from "next/link";
import { useEffect } from "react";

/*
 * Route-level error boundary. Without one, a client render error falls through
 * to Next's unbranded default page. Deliberately free of the site shell: Header
 * would pull the nav data into this chunk, and the shell may be what just
 * failed. The layout still supplies the skip link and the consent bar.
 */
export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[error-boundary]", error);
  }, [error]);

  return (
    <main id="main" tabIndex={-1}>
      <section className="error-hero">
        <div className="hero-bg" aria-hidden="true">
          <div className="hero-blob b1" />
          <div className="hero-blob b2" />
          <div className="hero-grid-lines" />
        </div>
        <div className="container">
          <p className="hero-eyebrow">Something went wrong</p>
          <h1>
            This page hit <span className="accent">an error.</span>
          </h1>
          <p className="lead">
            Nothing you did caused it. Try the page again, and if it keeps happening, head back to
            the home page and reach us from there.
          </p>
          <div className="error-ctas">
            <button className="btn btn-primary" type="button" onClick={reset}>
              Try Again
            </button>
            <Link className="btn btn-ghost" href="/">
              Back to Home
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
