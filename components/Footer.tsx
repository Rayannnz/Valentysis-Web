import Image from "next/image";
import Link from "next/link";

const columns = [
  {
    heading: "Services",
    links: [
      { label: "Consulting", href: "/#services" },
      { label: "Custom development", href: "/#services" },
      { label: "Modernization", href: "/#services" },
      { label: "Dedicated teams", href: "/#services" },
      { label: "QA & automation", href: "/#services" },
    ],
  },
  {
    heading: "Industries",
    links: [
      { label: "Fintech", href: "/#industries" },
      { label: "Healthtech", href: "/#industries" },
      { label: "Edtech", href: "/#industries" },
      { label: "Ecommerce", href: "/#industries" },
      { label: "AI & Data", href: "/#industries" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About us", href: "/about" },
      { label: "Careers", href: "/careers" },
      { label: "Our approach", href: "/#approach" },
      { label: "How we work", href: "/#process" },
      { label: "Contact", href: "/#contact" },
    ],
  },
];

export default function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <Link className="logo" href="/" style={{ color: "#fff" }}>
              <Image src="/logo/logo-mark.png" alt="" width={256} height={256} style={{ height: 44, width: "auto" }} />
              Valentisys
            </Link>
            <p>A software development company engineering products that outlast trends.</p>
            <div className="socials">
              <a href="#" aria-label="LinkedIn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.2 8h4.6v14H.2V8zm7.6 0h4.4v1.9h.1c.6-1.1 2.1-2.3 4.3-2.3 4.6 0 5.4 3 5.4 6.9V22h-4.6v-6.6c0-1.6 0-3.6-2.2-3.6s-2.6 1.7-2.6 3.5V22H7.8V8z" />
                </svg>
              </a>
              <a href="#" aria-label="X / Twitter">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.9 2H22l-6.8 7.8L23.3 22h-6.3l-4.9-6.4L6.4 22H3.3l7.3-8.3L1 2h6.5l4.4 5.9L18.9 2zm-1.1 18h1.7L6.5 3.9H4.6L17.8 20z" />
                </svg>
              </a>
              <a href="#" aria-label="GitHub">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 .5C5.7.5.5 5.7.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.3.8-.6v-2c-3.2.7-3.9-1.6-3.9-1.6-.5-1.3-1.3-1.7-1.3-1.7-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.7 1.3 3.4 1 .1-.8.4-1.3.7-1.6-2.6-.3-5.3-1.3-5.3-5.7 0-1.3.4-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.2 1.2a11 11 0 0 1 5.8 0C17.3 4.7 18.3 5 18.3 5c.6 1.6.2 2.8.1 3.1.7.8 1.2 1.8 1.2 3.1 0 4.4-2.7 5.4-5.3 5.7.4.4.8 1.1.8 2.2v3.2c0 .3.2.7.8.6a11.5 11.5 0 0 0 7.9-10.9C23.5 5.7 18.3.5 12 .5z" />
                </svg>
              </a>
              <a href="#" aria-label="Dribbble">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M8.6 2.7C12 7 14 12 15.2 21M2.4 9.2c5.5 1.5 11.3.8 18.4-3.1M21.8 13.6c-6.2-1.9-11.4-.9-16.7 3.4" />
                </svg>
              </a>
            </div>
          </div>

          {columns.map(({ heading, links }) => (
            <div className="footer-col" key={heading}>
              <h4>{heading}</h4>
              {links.map(({ label, href }) => (
                <Link href={href} key={label}>{label}</Link>
              ))}
            </div>
          ))}
        </div>

        <div className="footer-mark" aria-hidden="true">Valentisys</div>

        <div className="footer-bottom">
          <span>&copy; 2026 Valentisys. All rights reserved.</span>
          <span style={{ display: "flex", gap: 22 }}>
            <a href="#">Privacy policy</a>
            <a href="#">Terms of service</a>
            <a href="#">Cookies</a>
          </span>
        </div>
      </div>
    </footer>
  );
}
