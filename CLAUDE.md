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
