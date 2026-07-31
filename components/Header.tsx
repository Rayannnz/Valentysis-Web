"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const industriesLeft = ["Fintech", "Proptech", "Automotive", "Foodtech", "Ecommerce"];
const industriesRight = ["Healthtech", "Edtech", "Game dev", "Adtech", "AI"];

export default function Header() {
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

  const veilOn = () => document.body.classList.add("nav-blur");
  const veilOff = () => document.body.classList.remove("nav-blur");
  const closeMenu = () => setMenuOpen(false);

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
              <Link className="nav-link" href="/#industries">
                Industries
                <svg className="chev" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </Link>
              <div className="mega">
                <div className="mega-grid">
                  <div className="mega-col">
                    {industriesLeft.map((name) => (
                      <Link key={name} href="/#industries">{name}</Link>
                    ))}
                  </div>
                  <div className="mega-col">
                    {industriesRight.map((name) => (
                      <Link key={name} href="/#industries">{name}</Link>
                    ))}
                  </div>
                  <div className="mega-promo">
                    <h4>Project cost calculator</h4>
                    <p>Assess your costs in 60 seconds.</p>
                    <Link className="btn btn-magenta" href="/#contact" style={{ marginTop: 10 }}>
                      Get my free estimate
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
        <Link href="/" onClick={closeMenu}><small>01</small>Home</Link>
        <Link href="/#industries" onClick={closeMenu}><small>02</small>Industries</Link>
        <Link href="/careers" onClick={closeMenu}><small>03</small>Careers</Link>
        <Link href="/about" onClick={closeMenu}><small>04</small>About Us</Link>
        <Link href="/#contact" onClick={closeMenu} style={{ color: "var(--primary)" }}><small>05</small>Contact</Link>
      </nav>
    </>
  );
}
