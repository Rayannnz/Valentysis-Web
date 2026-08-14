/**
 * JSON-LD builders. Every graph node is given a stable `@id` so pages can
 * reference the organization and site instead of restating them, which is what
 * keeps a crawler from reading the service pages as different companies.
 *
 * Blank fields in lib/site.ts are dropped rather than emitted empty — an
 * `address` missing its postal code validates; one containing "" does not.
 */
import { absoluteUrl, site } from "./site";
import type { Service } from "./services";

export const ORG_ID = `${site.url}/#organization`;
export const SITE_ID = `${site.url}/#website`;
export const BUSINESS_ID = `${site.url}/#localbusiness`;

type Json = Record<string, unknown>;

/** Strips keys whose value is empty, so no node carries a placeholder. */
function compact(obj: Json): Json {
  return Object.fromEntries(
    Object.entries(obj).filter(([, v]) => {
      if (v === null || v === undefined || v === "") return false;
      if (Array.isArray(v) && v.length === 0) return false;
      return true;
    })
  );
}

function postalAddress(): Json {
  return compact({
    "@type": "PostalAddress",
    streetAddress: site.address.street,
    addressLocality: site.address.locality,
    addressRegion: site.address.region,
    postalCode: site.address.postalCode,
    addressCountry: site.address.countryCode,
  });
}

function contactPoints(): Json[] {
  return [
    compact({
      "@type": "ContactPoint",
      contactType: "sales",
      email: site.email.sales,
      telephone: site.telephone,
      areaServed: [...site.areaServed],
      availableLanguage: ["English", "Urdu"],
    }),
    compact({
      "@type": "ContactPoint",
      contactType: "human resources",
      email: site.email.careers,
      availableLanguage: ["English", "Urdu"],
    }),
  ];
}

export function organizationSchema(): Json {
  return compact({
    "@type": "Organization",
    "@id": ORG_ID,
    name: site.name,
    legalName: site.legalName,
    url: site.url,
    description: site.description,
    email: site.email.sales,
    telephone: site.telephone,
    logo: compact({
      "@type": "ImageObject",
      url: absoluteUrl("/logo/logo-valentisys.png"),
      width: 900,
      height: 240,
    }),
    image: absoluteUrl("/icons/icon-512.png"),
    address: postalAddress(),
    contactPoint: contactPoints(),
    areaServed: [...site.areaServed],
    sameAs: site.social.map((s) => s.href),
  });
}

export function websiteSchema(): Json {
  return compact({
    "@type": "WebSite",
    "@id": SITE_ID,
    url: site.url,
    name: site.name,
    description: site.description,
    inLanguage: site.lang,
    publisher: { "@id": ORG_ID },
  });
}

/**
 * ProfessionalService rather than plain LocalBusiness: it is the narrower type
 * Google recognizes for a services firm, and it inherits every LocalBusiness
 * property, so nothing is lost by being specific.
 */
export function localBusinessSchema(): Json {
  return compact({
    "@type": "ProfessionalService",
    "@id": BUSINESS_ID,
    name: site.name,
    url: site.url,
    description: site.description,
    email: site.email.sales,
    telephone: site.telephone,
    image: absoluteUrl("/icons/icon-512.png"),
    logo: absoluteUrl("/logo/logo-valentisys.png"),
    address: postalAddress(),
    geo: site.geo
      ? { "@type": "GeoCoordinates", latitude: site.geo.lat, longitude: site.geo.lng }
      : undefined,
    areaServed: site.areaServed.map((name) => ({ "@type": "Country", name })),
    openingHoursSpecification: site.openingHours.map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [...h.days],
      opens: h.opens,
      closes: h.closes,
    })),
    parentOrganization: { "@id": ORG_ID },
    priceRange: "$$",
  });
}

/**
 * One step in a page's trail. There is no visible breadcrumb nav on the site —
 * the trail exists only to build the BreadcrumbList below, so a page's `trail`
 * array is now purely a description of where the URL sits in the hierarchy.
 */
export type Crumb = { name: string; path: string };

export function breadcrumbSchema(trail: Crumb[]): Json {
  return {
    "@type": "BreadcrumbList",
    itemListElement: trail.map((crumb, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.path),
    })),
  };
}

export function serviceSchema(service: Service): Json {
  const url = absoluteUrl(`/services/${service.slug}`);

  /* the accordion groups are the real catalog where a service has one;
     otherwise the "How we deliver" cards are the closest equivalent */
  const catalogItems = service.detail
    ? service.detail.groups.flatMap((group) =>
        group.items.map((item) => ({ name: item.title, description: item.desc, group: group.name }))
      )
    : service.offerings.map((o) => ({ name: o.title, description: o.desc, group: undefined }));

  return compact({
    "@type": "Service",
    "@id": `${url}#service`,
    name: service.title,
    serviceType: service.shortTitle,
    description: service.lead,
    url,
    provider: { "@id": ORG_ID },
    areaServed: site.areaServed.map((name) => ({ "@type": "Country", name })),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `${service.shortTitle} services`,
      itemListElement: catalogItems.map((item) => ({
        "@type": "Offer",
        itemOffered: compact({
          "@type": "Service",
          name: item.name,
          description: item.description,
          category: item.group,
        }),
      })),
    },
  });
}

export function faqSchema(faqs: { q: string; a: string }[]): Json {
  return {
    "@type": "FAQPage",
    mainEntity: faqs.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };
}

export function webPageSchema({
  name,
  description,
  path,
  type = "WebPage",
}: {
  name: string;
  description: string;
  path: string;
  /** A narrower subtype where one fits — AboutPage, ContactPage, CollectionPage. */
  type?: "WebPage" | "AboutPage" | "ContactPage" | "CollectionPage";
}): Json {
  return {
    "@type": type,
    "@id": `${absoluteUrl(path)}#webpage`,
    url: absoluteUrl(path),
    name,
    description,
    inLanguage: site.lang,
    isPartOf: { "@id": SITE_ID },
    about: { "@id": ORG_ID },
  };
}

/** Wraps nodes in a single @graph so one script tag carries the whole page. */
export function graph(...nodes: Json[]) {
  return { "@context": "https://schema.org", "@graph": nodes };
}
