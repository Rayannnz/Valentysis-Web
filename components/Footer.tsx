import Image from "next/image";
import Link from "next/link";
import { industries } from "@/lib/industries";
import { services } from "@/lib/services";
import { careersEmail, contactEmail, site } from "@/lib/site";

type FooterColumn = {
  heading: string;
  links: { label: string; href: string }[];
  /* native anchors instead of <Link> — see the note in Header.tsx */
  plain?: boolean;
};

const columns: FooterColumn[] = [
  {
    heading: "Services",
    /* mapped, not hardcoded — a service added to lib/services.ts used to need a
       second edit here, and the two lists drifted */
    links: services.map(({ slug, shortTitle }) => ({
      label: shortTitle,
      href: `/services/${slug}`,
    })),
  },
  {
    heading: "Industries",
    plain: true,
    links: industries.map(({ id, name }) => ({ label: name, href: `/industries#${id}` })),
  },
  {
    heading: "Company",
    links: [
      { label: "About us", href: "/about" },
      { label: "Careers", href: "/careers" },
      { label: "Our approach", href: "/#approach" },
      { label: "How we work", href: "/#process" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Privacy policy", href: "/privacy" },
      { label: "Terms & conditions", href: "/terms" },
      { label: "Cookie policy", href: "/cookies" },
      { label: "Accessibility", href: "/accessibility" },
      { label: "Sitemap", href: "/sitemap" },
    ],
  },
];

/* Only real profiles are rendered. Add a URL to `social` in lib/site.ts and the
   icon appears here and in the Organization `sameAs` at the same time — the
   previous four icons all pointed at "#". */
const SOCIAL_ICONS: Record<string, React.ReactNode> = {
  LinkedIn: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.2 8h4.6v14H.2V8zm7.6 0h4.4v1.9h.1c.6-1.1 2.1-2.3 4.3-2.3 4.6 0 5.4 3 5.4 6.9V22h-4.6v-6.6c0-1.6 0-3.6-2.2-3.6s-2.6 1.7-2.6 3.5V22H7.8V8z" />
    </svg>
  ),
  "X / Twitter": (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.9 2H22l-6.8 7.8L23.3 22h-6.3l-4.9-6.4L6.4 22H3.3l7.3-8.3L1 2h6.5l4.4 5.9L18.9 2zm-1.1 18h1.7L6.5 3.9H4.6L17.8 20z" />
    </svg>
  ),
  Instagram: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
    </svg>
  ),
  Facebook: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.4v7A10 10 0 0 0 22 12z" />
    </svg>
  ),
  GitHub: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 .5C5.7.5.5 5.7.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.3.8-.6v-2c-3.2.7-3.9-1.6-3.9-1.6-.5-1.3-1.3-1.7-1.3-1.7-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.7 1.3 3.4 1 .1-.8.4-1.3.7-1.6-2.6-.3-5.3-1.3-5.3-5.7 0-1.3.4-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.2 1.2a11 11 0 0 1 5.8 0C17.3 4.7 18.3 5 18.3 5c.6 1.6.2 2.8.1 3.1.7.8 1.2 1.8 1.2 3.1 0 4.4-2.7 5.4-5.3 5.7.4.4.8 1.1.8 2.2v3.2c0 .3.2.7.8.6a11.5 11.5 0 0 0 7.9-10.9C23.5 5.7 18.3.5 12 .5z" />
    </svg>
  ),
};

/* Frozen at build time. Every deploy refreshes it, and a stale year is better
   than a client component mounted purely to render four digits. */
const year = new Date().getFullYear();

export default function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <Link className="logo" href="/" style={{ color: "#fff" }}>
              <Image
                src="/logo/logo-mark.png"
                alt=""
                width={256}
                height={256}
                sizes="44px"
                style={{ height: 44, width: "auto" }}
              />
              Valentisys
            </Link>
            <p>
              Outsourcing, customer support, and digital growth, staffed by trained teams that
              work like your own.
            </p>

            {/* NAP block — the same name, address, and contact details we publish
                in the Organization schema and to directories */}
            <address className="footer-nap">
              <span className="footer-nap-line">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                {site.address.street}, {site.address.locality}, {site.address.countryName}
              </span>
              <a className="footer-nap-line" href={`mailto:${contactEmail}`}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="m2 7 10 6L22 7" />
                </svg>
                {contactEmail}
              </a>
              <a className="footer-nap-line" href={`mailto:${careersEmail}`}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                </svg>
                {careersEmail}
              </a>
            </address>

            {site.social.length > 0 && (
              <div className="socials">
                {site.social.map(({ label, href }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={`${site.name} on ${label}`}
                    target="_blank"
                    rel="noopener noreferrer me"
                  >
                    {SOCIAL_ICONS[label] ?? label}
                  </a>
                ))}
              </div>
            )}
          </div>

          {columns.map(({ heading, links, plain }) => (
            <nav className="footer-col" key={heading} aria-labelledby={`footer-${heading}`}>
              {/* h2, not h4 — the page above ends on h2/h3, and a jump to h4
                  breaks heading-order for anyone navigating by headings */}
              <h2 id={`footer-${heading}`}>{heading}</h2>
              {links.map(({ label, href }) =>
                plain ? (
                  <a href={href} key={label}>
                    {label}
                  </a>
                ) : (
                  <Link href={href} key={label}>
                    {label}
                  </Link>
                )
              )}
            </nav>
          ))}
        </div>

        <div className="footer-mark" aria-hidden="true">
          Valentisys
        </div>

        <div className="footer-bottom">
          <span>
            &copy; {year} {site.legalName}. All rights reserved.
          </span>
          <span className="footer-legal">
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
            <Link href="/cookies#preferences">Cookie preferences</Link>
          </span>
        </div>
      </div>
    </footer>
  );
}
