/**
 * Single source of truth for everything the site asserts about the business.
 *
 * Metadata, JSON-LD, the footer, and both forms all read from here, so a fact
 * is corrected in one place. Fields left as empty strings are deliberate: the
 * schema builders in lib/schema.ts omit blank values rather than emit a
 * placeholder, so an unverified detail never ships as structured data.
 */

/* Netlify injects URL at build time; local and preview builds fall back to prod
   so canonicals are never relative or pointed at localhost. */
const CANONICAL_ORIGIN = "https://www.valentisys.com";

export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || CANONICAL_ORIGIN).replace(/\/+$/, "");

export const site = {
  name: "Valentisys",
  legalName: "Valentisys",
  url: siteUrl,
  locale: "en_US",
  lang: "en",

  /** Reused as the OG/Twitter fallback and the Organization description. */
  description:
    "Valentisys places trained remote teams inside health, legal, engineering, finance, and hospitality businesses, and runs the marketing, app, and web work that grows them.",

  email: {
    sales: "sales@valentisys.com",
    careers: "careers@valentisys.com",
  },

  /** Blank until confirmed — see the note at the top of this file. */
  telephone: "",

  address: {
    street: "271K Johar Town",
    locality: "Lahore",
    region: "Punjab",
    postalCode: "",
    countryCode: "PK",
    countryName: "Pakistan",
  },

  /** Populate to emit `geo` on the LocalBusiness node and enable map placement. */
  geo: null as { lat: number; lng: number } | null,

  /** Delivery is remote, so the service area is wider than the office address. */
  areaServed: ["Pakistan", "United States", "United Kingdom", "Canada", "Australia", "United Arab Emirates"],

  /** Office hours, Pakistan Standard Time. Empty entries are dropped from schema. */
  openingHours: [{ days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "09:00", closes: "18:00" }],

  /**
   * Real profile URLs only. The footer renders an icon per entry and the
   * Organization `sameAs` array is built from the same list, so an unlaunched
   * profile is removed here rather than linked to "#".
   */
  social: [] as { label: string; href: string }[],

  /** Shown on all four policy pages, so they can only be revised together. */
  legalUpdated: { iso: "2026-08-08", label: "8 August 2026" },

  /** Named in the policies as the processor for hosting and form delivery. */
  processors: [
    { name: "Netlify", role: "Website hosting and form delivery", region: "United States / global CDN" },
  ],
} as const;

export const contactEmail = site.email.sales;
export const careersEmail = site.email.careers;

/** Absolute URL for a site-relative path — canonicals, sitemap, and JSON-LD. */
export const absoluteUrl = (path: string) => `${site.url}${path.startsWith("/") ? path : `/${path}`}`;

/** Single-line postal address for display in the footer and contact page. */
export const formattedAddress = [
  site.address.street,
  site.address.locality,
  site.address.countryName,
]
  .filter(Boolean)
  .join(", ");
