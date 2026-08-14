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

There is no API route and no SMTP config. Both forms post to Netlify Forms (see below), so locally they
will fail against the dev server — that is expected, and the failure is logged with a `[contact]` or
`[careers]` prefix. Test form submission on a Netlify deploy preview, not on localhost.

`scripts/generate-icons.cjs` regenerates the whole icon set (favicon, apple-icon, PWA icons) from
`public/logo/logo-mark.png`. Run `node scripts/generate-icons.cjs` after changing the logo. Its `.ico`
frames must stay RGBA — Next decodes `app/favicon.ico` at build time and a paletted PNG frame fails
every route with "The PNG is not in RGBA format".

## Dev server: there is exactly one, on port 3000 — reuse it

**The user keeps a `next dev` server running on `http://localhost:3000` across sessions. Never kill it and
never start a second one.** Do not `taskkill`, `Stop-Process`, or `kill` a node process to free the port,
and do not restart the server "to pick up changes" — see below, it already picks them up.

**Always probe before doing anything with the server.** Prints `200` when it's up:

```bash
curl -s -o /dev/null -w "%{http_code}\n" --max-time 3 http://localhost:3000
```

PowerShell equivalent (`-ErrorAction SilentlyContinue` alone makes this tool report exit 1, so keep the `if`):

```powershell
$c = Get-NetTCPConnection -LocalPort 3000 -State Listen -ErrorAction SilentlyContinue
if ($c) { "up, pid=$($c[0].OwningProcess)" } else { "port 3000 free" }
```

Then:

- **Responds (`200`, or any HTTP status)** → that's the server. Use `http://localhost:3000` directly for
  curl, Playwright, and browser tools. Run nothing.
- **Nothing listening** → start one, and only then:
  `npm run dev` with `run_in_background: true`.
- **Port held but no HTTP response** → say so and ask; don't assume it's dead and kill it.

The probe is the whole mechanism. A background shell from an earlier session isn't visible in a new one, so
without checking you'd start a duplicate — and because `npm run dev` silently falls back to the next free
port (3001, 3002, …) when 3000 is taken, the duplicate *appears* to work while you and the user are looking
at two different servers.

**Editing files does not require a restart.** Fast Refresh covers everything in `app/`, `components/`,
`lib/`, and `app/globals.css`. Only these need one, and they are the *only* reasons to propose it:

- `next.config.ts`
- `.env.local` / any env var
- installing or removing a dependency

When a restart is genuinely required, tell the user what changed and let them decide — they own that
process. If they hand it to you, stop and restart on 3000, not on a new port.

### Never hard-kill a process while Turbopack is compiling

**No SIGKILL, no force-kill, no force-cancel of a running terminal command while Next/Turbopack is
compiling.** Specifically: no `kill -9`, no `taskkill /F`, no `Stop-Process -Force`, and no aborting an
in-flight `npm run dev` / `npm run build` command. This holds even when something looks hung.

This is not a style preference — it corrupts the project. Turbopack keeps a persistent on-disk cache under
`.next/dev/cache/turbopack/` that behaves like an LSM store: `.meta` files reference `.sst` segment files.
Killing the process mid-persist leaves `.meta` pointing at segments that were never flushed, and the dev
server then panics on every task lookup:

```
Persisting failed: Unable to write SST file 00004280.sst
Compaction failed: Another write batch or compaction is already active
thread 'tokio-runtime-worker' panicked at turbo-tasks-backend ... Failed to restore task data
  (corrupted database or bug) ... Unable to open static sorted file 00004258.sst
⨯ Error: ENOENT ... .next\dev\server\app\page\build-manifest.json
```

**Restarting does not fix this** — the inconsistent files are on disk and get re-read on boot. Recovery
requires deleting the cache (below). If a process genuinely must stop, use a graceful stop only, after
compilation has settled, and ask the user first.

### Let compilation settle before reading or editing files

Turbopack rebuilds on every write. Editing files while a compile is in flight stacks overlapping rebuilds
onto the same cache writer, which is how you reach `Another write batch or compaction is already active`.

- **Batch related edits into one message**, then stop and let it compile. One rebuild, not one per file.
- **Never write a file during a `○ Compiling …` window.** Wait for the run to close out — `✓ Compiled in …`
  or a `GET … 200` line.
- If you started the server backgrounded, read its output and wait for that line before the next batch.
- If the server is in the user's own terminal and you can't see its logs, don't fire
  edit → read → edit → read in tight succession. Re-probe with curl and confirm it still answers 200 before
  continuing, and ask the user to paste the log if anything looks off.

### Recovering a corrupted Turbopack cache

Symptoms, roughly in the order they show up:

- repeated `Fast Refresh had to perform a full reload when ./node_modules/next/dist/... changed`
- `Persisting failed:` / `Compaction failed:` spam
- `panicked at turbo-tasks-backend` with `Unable to open static sorted file NNNN.sst`
- `ENOENT ... .next\dev\server\app\page\build-manifest.json`

Confirm it's real corruption rather than noise — take a filename from the panic and check whether it exists:

```bash
ls .next/dev/cache/turbopack/*/00004258.sst
```

If it's missing while the `.meta` still references it, the cache is corrupt. Fix, **with the user's
go-ahead**, since it means stopping their server:

1. Stop the dev server gracefully (Ctrl-C in the terminal that owns it — the user's job, not a force-kill).
2. Delete the cache: `rm -rf .next/dev/cache` (or all of `.next` — it's gitignored and fully regenerated).
3. Start the dev server again on 3000. The first compile is slow; that's the cache rebuilding.

Never delete `.next` while the server is still running — that reintroduces the same mid-write corruption.

## What this is

Marketing site for Valentisys (outsourcing / customer support / digital agency). Next.js 16 App Router,
React 19, TypeScript strict, `@/*` maps to the repo root. Every route is statically prerendered except
`app/api/contact/route.ts`.

## Copy is US English, everywhere

**This project is US English only.** That covers page copy, headings, form labels, button text, error and
`aria-label` strings, `alt` text, JSON-LD values, code comments, and this file. British or other-variant
spelling is a defect here, not a style preference — fix it rather than leaving it as written.

The swaps that actually come up in this repo:

| Not this | This | Where it turned up |
| --- | --- | --- |
| enquiry / enquiries | inquiry / inquiries | contact form, thank-you page, privacy, terms, cookies |
| organisation, recognises, cannibalise, quantisation | organization, recognizes, cannibalize, quantization | schema + script comments |
| colour, behaviour | color, behavior | CSS comments, accessibility page |
| centre | center | cookie "preference center", icon script |
| catalogue | catalog | the service catalog in `lib/schema.ts` |
| cancelled, greyed-out, de-emphasised | canceled, grayed-out, de-emphasized | effect and consent comments |
| advert | ad | cookie category descriptions |
| unauthorised | unauthorized | terms |
| CV | resume | careers form, privacy, accessibility |
| afterwards | afterward | privacy, `PageEffects` |
| 8 August 2026 | August 8, 2026 | `site.legalUpdated.label` |

Date format is part of this: US order is `August 8, 2026`. `legalUpdated.iso` stays ISO-8601 because it
feeds a `<time datetime>` attribute, which is locale-independent by spec.

Three things are **not** copy and keep their spelling:

- **`name="cv"`** on the careers upload and the `cv*` identifiers around it — a wire contract with Netlify,
  see the forms section below.
- **DOM and HTML API names**, above all `aria-labelledby`. Spec spelling, not prose.
- **Third-party package names and API strings** — `@img/colour` in the lockfile is a package, and anything
  a library only accepts in the British form stays as the library wants it. Check before assuming: `sharp`
  defines `gravity.center` and `gravity.centre` as the same constant, so that one is spelled US here.

To re-audit after a copy change, sweep the source for the usual forms — the `-ise`/`-isation`, `-our`,
`-re`, and doubled-`l` families — and read the hits rather than replacing blind: `specialist`, `flat`, and
`aria-labelledby` are all correct and all match a naive pattern.

## Content lives in `lib/`, not in pages

`lib/services.ts` is the single source of truth for the service lines. One entry drives, at minimum:

- the `/services/[slug]` route (via `generateStaticParams`) and its metadata
- the `/services` index listing (`components/Services.tsx`) and the "more services" list on every service page
- the header mega-menu and the mobile menu (`components/Header.tsx`)
- the team dropdown on `/careers` (`components/ApplicationForm.tsx`, which excludes `outsourcing` and
  `ai-solutions` by slug and appends roles the site doesn't sell as services)

The optional `detail` field is what renders the dark accordion on a service page; services without it skip
that section. `lib/industries.ts` works the same way for the five sectors and their `#id` anchors.

Each service also carries `seoTitle` / `seoDescription`, kept separate from `title` and `lead` because
those are written for the page and these are written for the SERP.

Adding a service means editing `lib/services.ts` and nothing else — the footer now maps over `services`
rather than hardcoding its column. Changing a slug means adding a redirect in `next.config.ts`.

**Never state how many services there are.** No "six capabilities", no "six service lines", no "one
relationship rather than six" — not in page copy, headings, meta descriptions, or the stat panel. It reads
as a cap on what the business will take on, and it goes stale the moment a service is added or dropped.
Write open-ended instead: "Everything under one roof", "Every service line", "One partner". The same goes
for comments and docs: describe the list, don't count it. Anything that genuinely needs the number should
derive it from `services.length` rather than spelling it out.

## The two hub pages: `/services` and `/industries`

Both are index routes with the same shape, and they are the pattern to copy for any future hub:

```
PageHero → Breadcrumbs → an `.about-story` overview section (`paddingTop: 0`) → the listing
component (<Services /> / <Industries />) → <Cta />
```

`components/Services.tsx` and `components/Industries.tsx` are *listing sections*, not pages — each renders
its own `.sec-head` and keeps its `id` (`#services`, `#industries`) because `app/globals.css` styles the
section by that id (the light-purple block and the dark accordion). Render either one on a page and it
brings its own heading and background with it.

Neither listing is on the home page. Home is `Hero → Stats → Approach → Process → Cta`; the service list
used to live there at `/#services` and moved out, which is why nothing links to that anchor any more.

## Page composition

Every route renders the same shell: `<PageEffects /> <Header /> <main id="main">…</main> <Footer />`
followed by a `<JsonLd>` graph. **`id="main"` is not optional** — it is the target of the skip link in
`app/layout.tsx`. Sub-pages open with `<PageHero eyebrow lines lead>` (`lines` is an array of ReactNode,
one per masked heading line) and then `<Breadcrumbs trail={trail} />`, where the same `trail` array also
feeds `breadcrumbSchema()`; the two must come from one source or Google discards the graph. The home page
uses the bespoke `<Hero />`. `<Cta />` closes most pages. Section markup follows a fixed
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

The same effect also owns **scroll-on-click for links pointing at the current URL**, delegated on the
document so every link is covered without an `onClick`. Next already scrolls a real navigation, but a link
to the page you are on doesn't navigate at all — clicking "Home" from halfway down `/` used to leave you
there. The listener is on the **capture** phase deliberately: `<Link>` calls `preventDefault()` to route on
the client, so by the bubble phase every internal link looks canceled. It never prevents anything itself,
which is what keeps the native industry anchors and their `hashchange` working.

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
- **Industry links are plain `<a>`, not `<Link>`** (in `Header.tsx` and via `plain: true` on the individual
  link in `Footer.tsx`). `next/link` pushStates a same-page hash without firing `hashchange`, which would
  leave the accordion shut when you click an industry from `/industries` itself. Don't "fix" these to
  `<Link>`. `plain` is per link, not per column: the "All industries" entry above them points at a real
  route and has to stay a `<Link>`.

## Both forms post to Netlify Forms

Netlify detects forms by parsing static HTML at deploy time, and these forms are React client components.
So both are *declared* in `public/__forms.html` and both POST back to that same path. **Every field name in
a React form must exist in `__forms.html`** or Netlify silently drops it from the submission.

**`/contact`** → `ContactForm` posts url-encoded (Netlify rejects JSON). Five fields, in this order:
`fullName`, `company` (the only optional one), `email`, `phone`, `message`.

**`/careers`** → `ApplicationForm` posts multipart, because the resume is a real file upload — it sets no
`Content-Type` header so the browser can supply its own boundary. It is capped at 8 MB client-side:
Netlify rejects a request over 8 MiB with a 400 read straight off `Content-Length`. **The field is
`name="cv"` on the wire** and must stay that way — `public/__forms.html` declares it and Netlify matches on
it, so renaming it to `resume` silently drops the upload. Only the visible copy says "Resume"; the `cv*`
identifiers in the component are deliberately aligned with the wire name, not the label.

Both redirect to `/thank-you?ref=contact|careers` on success, which is the conversion destination. Failures
are logged with a `[contact]` / `[careers]` prefix so a broken deploy config is diagnosable from devtools.

## Gotchas

- **Keep everything inside the single `nextConfig` object in `next.config.ts`.** A previous revision assigned
  `module.exports = { allowedDevOrigins }` below the declaration, which clobbered `export default nextConfig`
  and silently dropped every redirect. Fixed, and verifiable: `routes-manifest.json` should list six
  redirects, not one.
- **Never set an `icons` key in the root layout's `metadata`.** Doing so replaces Next's file-convention
  icon detection wholesale, and `app/apple-icon.png` stops emitting a `rel="apple-touch-icon"` link.
  `app/favicon.ico`, `app/icon.png`, and `app/apple-icon.png` are picked up automatically.
- **A page that exports its own `openGraph` block loses the inherited `opengraph-image`.** That is why
  `lib/seo.ts` names `/opengraph-image` and `/twitter-image` explicitly instead of relying on the file
  convention to cascade — without it, `og:image` appears on `/` and nowhere else.
- **Page titles go through `buildMetadata`, which sets `title.absolute`.** A bare `title` string picks up
  the layout's `"%s | Valentisys"` template and renders the brand twice.
- **`/services` is a real route, not an anchor.** It was `/#services` (a home-page section plus a temporary
  `/services → /#services` redirect) until the listing got its own page. Both are gone. Link to `/services`;
  don't reintroduce the redirect, and don't point a nav item, CTA, or breadcrumb at `/#services`. The
  section keeps `id="services"` purely because `globals.css` styles `#services`. Anything that renders a
  route link needs `<Link>` — `no-html-link-for-pages` fails the lint on a bare `<a href="/services">`,
  which is exactly how the old Hero anchor was caught.
- Commit messages in this repo are terse and untyped ("fixed", "content audited"). No convention to follow.

## SEO, structured data, and legal pages

Four `lib/` modules carry everything a page asserts about the business:

- **`lib/site.ts`** — the single source of truth for name, canonical URL, emails, postal address, service
  area, and opening hours. Blank fields are deliberate: `lib/schema.ts` drops empty values rather than
  emitting a placeholder, so an unverified detail never ships as structured data. `site.social` is empty,
  which is why the footer renders no social icons — add a real URL and the icon and the Organization
  `sameAs` entry both appear.
- **`lib/seo.ts`** — `buildMetadata({title, description, path})` builds canonical + Open Graph + Twitter from
  one pair. Titles are held to 50–60 characters and descriptions to 140–160.
- **`lib/schema.ts`** — JSON-LD builders. The root layout emits Organization + WebSite + ProfessionalService
  once, with stable `@id`s; each page adds WebPage/Breadcrumb/Service/FAQ nodes that reference those by
  `@id` instead of restating the company.
- **`lib/consent.ts`** — cookie consent, stored in localStorage and read through `useSyncExternalStore`.

The **service catalog** — a `serviceSchema` node per service — is emitted by `app/services/page.tsx`
alongside its `CollectionPage` node, because that is the page that links them all. It sat on the home page
until the listing moved, and moved with it; home now carries only its `WebPage` node. Each
`/services/[slug]` page still emits its own copy under the same stable `@id`, so they read as one entity
described consistently rather than several competing ones.

`robots.txt`, `sitemap.xml`, and the web manifest are generated by `app/robots.ts`, `app/sitemap.ts`, and
`app/manifest.ts`. Adding a route means adding it in **three** places: `app/sitemap.ts`, the grouped list in
`app/sitemap/page.tsx` (the human-readable sitemap), and — for anything meant to rank — a real internal link
from the footer or nav, since a URL that only appears in `sitemap.xml` gets crawled but reads as
unimportant. In `app/sitemap.ts` the order is deliberate: home, `/services`, the service pages, then
everything else. The four policy pages share `components/LegalPage.tsx` and all read their "last updated"
date from `site.legalUpdated`.

Verifying the SEO surface is a loop worth rerunning after any metadata change — fetch each route off the
dev server and check `<title>` (50–60), `meta description` (140–160), the canonical, and that there is
exactly one `<h1>`. Decode HTML entities first: `&amp;` is four characters in the markup and one in the
title, which is enough to make a compliant title look over-length.
