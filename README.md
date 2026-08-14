# Valentisys

Marketing site for Valentisys — outsourcing, customer support, digital marketing, app and web
development, and AI services.

Next.js 16 (App Router) · React 19 · TypeScript strict · one hand-written stylesheet · deployed on Netlify.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
```

There is one dev server, on port 3000, and it is shared across sessions. Probe before starting another:

```bash
curl -s -o /dev/null -w "%{http_code}\n" --max-time 3 http://localhost:3000
```

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Dev server with Turbopack on :3000 |
| `npm run build` | Production build — also the TypeScript check (`tsconfig` is `noEmit`) |
| `npm run lint` | ESLint across the repo |
| `npm start` | Serve the production build |
| `node scripts/generate-icons.cjs` | Regenerate favicon, apple-icon, and PWA icons from the logo mark |

There is no test framework. `npm run build && npm run lint` is the full verification loop.

## Where things live

```
app/            routes; also robots.ts, sitemap.ts, manifest.ts, opengraph-image.tsx, not-found.tsx
  globals.css   the entire stylesheet, sectioned by banner comments
components/     shared UI; only Header, PageEffects, the two forms, ServiceDetail,
                Industries, Process, and the cookie components are client components
lib/
  services.ts   the service lines — drives routes, nav, footer, and both form dropdowns
  industries.ts the five sectors and their #id anchors
  site.ts       business facts: URL, emails, address, service area (single source of truth)
  seo.ts        buildMetadata() — canonical, Open Graph, Twitter from one title/description
  schema.ts     JSON-LD builders
  consent.ts    cookie consent state
public/         logo, PWA icons, and __forms.html (the Netlify form declarations)
scripts/        build-time tooling, run by hand
```

## Forms

Both forms post to Netlify Forms, declared in `public/__forms.html`. They only work on a Netlify
deployment — submitting from localhost fails by design. A field added to a React form must be added to
`__forms.html` too, or Netlify drops it.

## Before deploying

- Set the primary domain in Netlify so the apex redirects to `www`; canonicals point at
  `https://www.valentisys.com`.
- Set `NEXT_PUBLIC_SITE_URL` if the canonical host ever changes.
- Submit `https://www.valentisys.com/sitemap.xml` to Google Search Console and Bing Webmaster Tools.

Deeper conventions, and the traps worth knowing about, are in [CLAUDE.md](./CLAUDE.md).
