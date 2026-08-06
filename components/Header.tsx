"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { industries } from "@/lib/industries";
import { services } from "@/lib/services";

const serviceNav = services.map(({ slug, navLabel }) => ({
  label: navLabel,
  href: `/services/${slug}`,
}));
const servicesLeft = serviceNav.slice(0, 2);
const servicesRight = serviceNav.slice(2);

/* rendered as native anchors, not <Link> — Link pushState's same-page hash links
   without firing hashchange, so the accordion wouldn't open from /industries itself */
const industryNav = industries.map(({ id, name }) => ({
  label: name,
  href: `/industries#${id}`,
}));
const industriesLeft = industryNav.slice(0, 3);
const industriesRight = industryNav.slice(3);

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);

  /* hide-on-scroll-down, reveal-on-scroll-up */
  useEffect(() => {
    let lastY = 0;
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        setScrolled(y > 10);
        setHidden(y > 500 && y > lastY && !document.body.classList.contains("menu-open"));
        lastY = y;
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* body state for the mobile menu (burger color, clip reveal, scroll lock) */
  useEffect(() => {
    document.body.classList.toggle("menu-open", menuOpen);
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.classList.remove("menu-open");
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  /* clear mega-menu blur + mobile menu after route changes (mouseleave can miss on nav) */
  useEffect(() => {
    document.body.classList.remove("nav-blur");
    setMenuOpen(false);
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  }, [pathname]);

  useEffect(() => {
    return () => {
      document.body.classList.remove("nav-blur");
    };
  }, []);

  const veilOn = () => document.body.classList.add("nav-blur");
  const veilOff = () => document.body.classList.remove("nav-blur");
  const closeMenu = () => setMenuOpen(false);
  const go = () => {
    veilOff();
    closeMenu();
  };

  return (
    <>
      <header id="header" className={`${scrolled ? "scrolled" : ""} ${hidden ? "hidden" : ""}`.trim()}>
        <div className="header-inner">
          <Link className="logo" href="/" aria-label="Valentisys home">
            <Image src="/logo/logo-valentisys.png" alt="Valentisys" width={900} height={240} priority />
          </Link>

          <nav className="nav" aria-label="Main navigation">
            <div className="nav-item">
              <Link className="nav-link" href="/">Home</Link>
            </div>

            <div
              className="nav-item"
              onMouseEnter={veilOn}
              onMouseLeave={veilOff}
              onFocus={veilOn}
              onBlur={veilOff}
            >
              <Link className="nav-link" href="/#services" onClick={go}>
                Services
                <svg className="chev" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </Link>
              <div className="mega">
                <div className="mega-grid">
                  <div className="mega-col">
                    {servicesLeft.map(({ label, href }) => (
                      <Link key={href} href={href} onClick={go}>{label}</Link>
                    ))}
                  </div>
                  <div className="mega-col">
                    {servicesRight.map(({ label, href }) => (
                      <Link key={href} href={href} onClick={go}>{label}</Link>
                    ))}
                  </div>
                  <div className="mega-promo">
                    <h4>Need the right fit?</h4>
                    <p>Tell us the problem. We&apos;ll recommend a service mix, timeline, and a clear price.</p>
                    <Link className="btn btn-magenta" href="/#contact" style={{ marginTop: 10 }} onClick={go}>
                      Get an estimate
                      <svg className="arr" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                        <path d="M7 17L17 7M9 7h8v8" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="nav-item"
              onMouseEnter={veilOn}
              onMouseLeave={veilOff}
              onFocus={veilOn}
              onBlur={veilOff}
            >
              <Link className="nav-link" href="/industries" onClick={go}>
                Industries
                <svg className="chev" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </Link>
              <div className="mega">
                <div className="mega-grid">
                  <div className="mega-col">
                    {industriesLeft.map(({ label, href }) => (
                      <a key={href} href={href} onClick={go}>{label}</a>
                    ))}
                  </div>
                  <div className="mega-col">
                    {industriesRight.map(({ label, href }) => (
                      <a key={href} href={href} onClick={go}>{label}</a>
                    ))}
                  </div>
                  <div className="mega-promo">
                    <h4>Not sure where to start?</h4>
                    <p>Send us the problem. We&apos;ll come back with scope, timeline, and a price.</p>
                    <Link className="btn btn-magenta" href="/#contact" style={{ marginTop: 10 }} onClick={go}>
                      Get an estimate
                      <svg className="arr" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                        <path d="M7 17L17 7M9 7h8v8" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="nav-item">
              <Link className="nav-link" href="/careers">Careers</Link>
            </div>
            <div className="nav-item">
              <Link className="nav-link" href="/about">About Us</Link>
            </div>
          </nav>

          <Link className="btn-contact" href="/#contact">
            <span>Contact</span>
          </Link>

          <button
            id="burger"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <i /><i /><i />
          </button>
        </div>
      </header>

      <nav id="mobile-menu" aria-label="Mobile navigation">
        <button className="menu-close" type="button" aria-label="Close menu" onClick={closeMenu}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
        <Link href="/" onClick={closeMenu}><small>01</small>Home</Link>
        <Link href="/#services" onClick={closeMenu}><small>02</small>Services</Link>
        {serviceNav.map(({ label, href }, i) => (
          <Link key={href} className="mobile-sub" href={href} onClick={closeMenu}>
            <small>02.{i + 1}</small>
            {label}
          </Link>
        ))}
        <Link href="/industries" onClick={closeMenu}><small>03</small>Industries</Link>
        {industryNav.map(({ label, href }, i) => (
          <a key={href} className="mobile-sub" href={href} onClick={closeMenu}>
            <small>03.{i + 1}</small>
            {label}
          </a>
        ))}
        <Link href="/careers" onClick={closeMenu}><small>04</small>Careers</Link>
        <Link href="/about" onClick={closeMenu}><small>05</small>About Us</Link>
        <Link href="/#contact" onClick={closeMenu} style={{ color: "var(--primary)" }}><small>06</small>Contact</Link>
      </nav>
    </>
  );
}
