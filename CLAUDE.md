# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Next dev server (Turbopack) on :3000
npm run build    # production build; also runs the TypeScript check
npm run lint     # ESLint flat config (bare `eslint`, lints the whole repo)
npm start        # serve the production build
```

There is no test framework in this project — no runner, no test files. `npm run build` is the type-check
(`tsconfig` is `noEmit`), so build + lint is the full verification loop. Don't invent a test command.

`/api/contact` needs SMTP credentials: copy `.env.example` to `.env.local` and fill it in. Next reads env
at boot, so restart the dev server after changing it. Without those vars the route returns 503 and the rest
of the site works fine.

## What this is

Marketing site for Valentisys (outsourcing / customer support / digital agency). Next.js 16 App Router,
React 19, TypeScript strict, `@/*` maps to the repo root. Every route is statically prerendered except
`app/api/contact/route.ts`.

## Content lives in `lib/`, not in pages

`lib/services.ts` is the single source of truth for the six service lines. One entry drives, at minimum:

- the `/services/[slug]` route (via `generateStaticParams`) and its metadata
- the home page service list (`components/Services.tsx`) and the "more services" list on every service page
- the header mega-menu and the mobile menu (`components/Header.tsx`)
- the service dropdown on `/contact` (`components/ContactForm.tsx`)
- the team dropdown on `/careers` (`components/ApplicationForm.tsx`, which excludes `outsourcing` and
  `ai-solutions` by slug and appends roles the site doesn't sell as services)

The optional `detail` field is what renders the dark accordion on a service page; services without it skip
that section. `lib/industries.ts` works the same way for the five sectors and their `#id` anchors.

So: adding or renaming a service means editing `lib/services.ts` — **and** `components/Footer.tsx`, which
hardcodes its Services column instead of mapping over `services`. Changing a slug means adding a redirect
in `next.config.ts` (see Gotchas below before you rely on that working).

## Page composition

Every route renders the same shell: `<PageEffects /> <Header /> <main>…</main> <Footer />`. Sub-pages open
with `<PageHero eyebrow lines lead>` (`lines` is an array of ReactNode, one per masked heading line); the
home page uses the bespoke `<Hero />`. `<Cta />` closes most pages. Section markup follows a fixed
vocabulary — `.section > .container > .sec-head` with `.sec-eyebrow` / `.sec-title` / `.sec-note` — mirror
an existing page rather than inventing structure.

## Styling: one hand-written stylesheet

All ~1050 lines of CSS live in `app/globals.css`, split by banner comments that mirror the page sections
(Header, Hero, Services, Industries, Stats, Process, Contact, Footer, Careers, About…). Add rules under the
matching banner.

Tailwind v4 is imported at the top of that file but **no utility classes are used anywhere** in the
components — every `className` is a semantic name defined in globals.css. Don't start mixing utilities in.

Design tokens are CSS custom properties on `:root` (`--primary`, `--magenta`, `--ink`, `--bg`, `--line`,
`--ease-out`, `--container`, `--header-h`, …). Fonts are wired in `app/layout.tsx` via `next/font/google`
and exposed as `--font-space-grotesk` (headings) / `--font-inter` (body).

## Animation is attribute-driven, centralized in `PageEffects.tsx`

`components/PageEffects.tsx` is one client component, rendered once per page, that queries the whole
document on mount and wires everything:

| Attribute | Effect |
| --- | --- |
| `data-reveal` (`""`, `"left"`, `"right"`, `"scale"`) | IntersectionObserver adds `.in-view`, staggered per parent |
| `data-hero-lines` on an `h1` with `.line-mask > .line` children | masked line-by-line heading reveal |
| `data-parallax="<px>"` | element follows the pointer inside `#hero` |
| `data-magnetic` | button pulls toward the cursor |

To animate new markup, add the attribute — there is nothing to register. But the wiring runs in a single
`useEffect([])`, so elements mounted later (conditional renders, list growth) are never observed.

Two constraints to preserve:

- **Progressive enhancement.** `app/layout.tsx` injects an inline script that adds `.js` to `<html>`, and all
  reveal CSS is scoped under `.js`. Never write a rule that hides content without that prefix, or it stays
  hidden when JS is off.
- **Motion/pointer gating.** Parallax and magnetic buttons are behind `(hover:hover) and (pointer:fine)`,
  and the whole stylesheet has a `prefers-reduced-motion` block at the bottom. Keep new effects gated.

## Client components and their patterns

Only these are `"use client"`: `Header`, `PageEffects`, `ContactForm`, `ApplicationForm`, `ServiceDetail`,
`Industries`, `Process`. Everything else is a server component.

Some non-obvious choices in them are deliberate and commented in place:

- `ServiceDetail` and `Header` **adjust state during render** (comparing a `prev*` state value) instead of
  syncing in an effect, so the panel/menu is correct on the same commit.
- `ServiceDetail` reads `location.hash` and `Process` reads IntersectionObserver support through
  `useSyncExternalStore`, with server snapshots of `""` and `true` respectively.
- Both accordions animate `max-height` from a measured `scrollHeight` and re-measure on resize.
- **Industry links are plain `<a>`, not `<Link>`** (in `Header.tsx` and via `plain: true` in `Footer.tsx`).
  `next/link` pushStates a same-page hash without firing `hashchange`, which would leave the accordion shut
  when you click an industry from `/industries` itself. Don't "fix" these to `<Link>`.

## The two forms work differently on purpose

**`/contact`** → `ContactForm` POSTs JSON to `app/api/contact/route.ts`, which sends mail over SMTP with
nodemailer (`runtime = "nodejs"` because SMTP needs a long-lived connection). The route has a `website`
honeypot that returns `{ok: true}` so bots don't learn to retry, per-field length caps, CRLF stripping to
block header injection, HTML escaping in the mail body, and a best-effort in-memory IP rate limit (5/min)
that intentionally doesn't survive across serverless instances. Errors are logged with a `[contact]` prefix.

**`/careers`** → `ApplicationForm` never touches the server. It builds a `wa.me` click-to-chat URL to a
number hardcoded in the component and opens it in a new tab; the selected CV file is *not* uploaded — the
applicant attaches it in WhatsApp. Don't wire this to the contact API without being asked.

## Gotchas

- **`next.config.ts` silently drops its redirects.** The file assigns `module.exports = { allowedDevOrigins }`
  after declaring `nextConfig`, which clobbers `export default nextConfig`. Verified against a fresh
  `npm run build`: `.next/routes-manifest.json` contains only Next's internal trailing-slash redirect, so the
  `/services/customer-support` and `/services/social-media-marketing` redirects are dead. Fold
  `allowedDevOrigins` into the `nextConfig` object to restore them.
- Commit messages in this repo are terse and untyped ("fixed", "content audited"). No convention to follow.
