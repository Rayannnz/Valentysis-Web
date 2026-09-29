"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { type MouseEvent, useEffect, useRef, useState } from "react";

export type NavItem = { label: string; href: string };

/* Industry links are #anchors on /industries. From any other page a <Link> is
   right: client navigation, and the accordion reads the hash on mount. On
   /industries itself the same <Link> would pushState the hash without a
   hashchange event and the panel would stay shut, so there they are native
   anchors, which fire hashchange (see Industries.tsx). A component rather than
   a helper called in render, so the React Compiler lint can see the onClick
   handlers (which touch a ref) only ever run on click. */
function IndustryLink({
  plain,
  href,
  label,
  className,
  onClick,
  children,
}: NavItem & {
  plain: boolean;
  className?: string;
  onClick: (e: MouseEvent<HTMLAnchorElement>) => void;
  children?: React.ReactNode;
}) {
  return plain ? (
    <a href={href} className={className} onClick={onClick}>
      {children}
      {label}
    </a>
  ) : (
    <Link href={href} className={className} onClick={onClick} prefetch={false}>
      {children}
      {label}
    </Link>
  );
}

/*
 * The interactive header. The nav lists arrive from the server wrapper in
 * Header.tsx as plain label/href pairs, so neither lib/services.ts nor
 * lib/industries.ts is bundled for the client.
 */
export default function HeaderClient({
  serviceNav,
  industryNav,
}: {
  serviceNav: NavItem[];
  industryNav: NavItem[];
}) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const burgerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  /* set when the menu closes from its own controls (close button, Escape, a
     link), so focus goes back to the burger. A route change closes it too,
     and there the new page owns focus instead */
  const restoreFocus = useRef(false);

  const servicesSplit = Math.ceil(serviceNav.length / 2);
  const servicesLeft = serviceNav.slice(0, servicesSplit);
  const servicesRight = serviceNav.slice(servicesSplit);
  const industriesLeft = industryNav.slice(0, 3);
  const industriesRight = industryNav.slice(3);

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

  /* body state for the mobile menu (burger color, clip reveal, scroll lock),
     plus focus: it moves onto the close button when the panel opens, because
     the burger that had it is hidden the same instant, and everything behind
     the panel goes inert so Tab cannot wander onto content the overlay covers */
  useEffect(() => {
    document.body.classList.toggle("menu-open", menuOpen);
    document.body.style.overflow = menuOpen ? "hidden" : "";
    const behind = document.querySelectorAll<HTMLElement>("#header, #main, footer, .cookie-bar, #toTop, .skip-link");
    behind.forEach((el) => {
      el.inert = menuOpen;
    });
    if (menuOpen) {
      closeRef.current?.focus();
    } else if (restoreFocus.current) {
      restoreFocus.current = false;
      burgerRef.current?.focus();
    }
    return () => {
      document.body.classList.remove("menu-open");
      document.body.style.overflow = "";
      behind.forEach((el) => {
        el.inert = false;
      });
    };
  }, [menuOpen]);

  /* Escape closes whichever menu is open. The mega panel is CSS-only
     (:hover / :focus-within), so dropping focus is what closes it; that is the
     dismissal WCAG 1.4.13 asks for without moving the pointer */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (menuOpen) {
        restoreFocus.current = true;
        setMenuOpen(false);
        return;
      }
      const active = document.activeElement;
      if (active instanceof HTMLElement && active.closest(".nav-item")) {
        active.blur();
        document.body.classList.remove("nav-blur");
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  /* close the mobile menu on route change. Adjusted during render so React
     re-renders before committing, instead of flashing the open menu for a frame */
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setMenuOpen(false);
  }

  /* clear mega-menu blur + focus after route changes (mouseleave can miss on nav) */
  useEffect(() => {
    document.body.classList.remove("nav-blur");
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
  const closeMenu = () => {
    restoreFocus.current = true;
    setMenuOpen(false);
  };
  const go = (e: MouseEvent<HTMLAnchorElement>) => {
    veilOff();
    closeMenu();
    /* A mouse click leaves focus sitting on the link, and the mega panel is held
       open by .nav-item:focus-within as well as :hover, so once the pointer left,
       the panel stayed up until something else took focus. The pathname effect
       above blurs it on a route change; clicking a link to the page you are
       already on never changes pathname, which is the case that got stuck.
       detail === 0 means the click came from the keyboard: that focus is real
       navigation state and has to stay where it is. */
    if (e.detail > 0) e.currentTarget.blur();
  };

  /* the one orientation cue a nav needs: aria-current="page" on the link for
     the route you are on. The underline keys off the same attribute in CSS */
  const current = (href: string) => (pathname === href ? "page" : undefined);

  /* see IndustryLink above */
  const onIndustries = pathname === "/industries";

  return (
    <>
      <header id="header" className={`${scrolled ? "scrolled" : ""} ${hidden ? "hidden" : ""}`.trim()}>
        <div className="header-inner">
          <Link className="logo" href="/" aria-label="Valentisys home">
            {/* sizes matters here: the source is 900px wide but .logo img renders
                it 40px tall (150px wide), and without this the browser assumes
                100vw and downloads the largest variant on every page */}
            <Image
              src="/logo/logo-valentisys.png"
              alt="Valentisys"
              width={900}
              height={240}
              sizes="(max-width: 640px) 120px, 150px"
              priority
            />
          </Link>

          <nav className="nav" aria-label="Main navigation">
            {/* onClick={go} on the panel-less items too: :focus-within also drives
                the nav underline, so a click on the page you are already on left
                that lit as well */}
            <div className="nav-item">
              <Link className="nav-link" href="/" onClick={go} aria-current={current("/")}>Home</Link>
            </div>

            <div
              className="nav-item"
              onMouseEnter={veilOn}
              onMouseLeave={veilOff}
              onFocus={veilOn}
              onBlur={veilOff}
            >
              <Link className="nav-link" href="/services" onClick={go} aria-current={current("/services")}>
                Services
                <svg className="chev" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </Link>
              {/* prefetch={false} on the panel links: they sit in the DOM on every
                  page, and Next was prefetching all of them at load, on the
                  critical path, for a menu most visitors never open */}
              <div className="mega">
                <div className="mega-grid">
                  <div className="mega-col">
                    {servicesLeft.map(({ label, href }) => (
                      <Link key={href} href={href} onClick={go} prefetch={false} aria-current={current(href)}>{label}</Link>
                    ))}
                  </div>
                  <div className="mega-col">
                    {servicesRight.map(({ label, href }) => (
                      <Link key={href} href={href} onClick={go} prefetch={false} aria-current={current(href)}>{label}</Link>
                    ))}
                  </div>
                  <div className="mega-promo">
                    {/* not a heading. The header renders before the page's h1,
                        so an h4 here breaks heading order on every page */}
                    <p className="mega-promo-title">Need the right fit?</p>
                    <p>Tell us the problem. We&apos;ll recommend a service mix, timeline, and a clear price.</p>
                    <Link className="btn btn-magenta" href="/contact" style={{ marginTop: 10 }} onClick={go}>
                      Request a Quote
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
              <Link className="nav-link" href="/industries" onClick={go} aria-current={current("/industries")}>
                Industries
                <svg className="chev" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </Link>
              <div className="mega">
                <div className="mega-grid">
                  <div className="mega-col">
                    {industriesLeft.map((item) => (
                      <IndustryLink key={item.href} plain={onIndustries} onClick={go} {...item} />
                    ))}
                  </div>
                  <div className="mega-col">
                    {industriesRight.map((item) => (
                      <IndustryLink key={item.href} plain={onIndustries} onClick={go} {...item} />
                    ))}
                  </div>
                  <div className="mega-promo">
                    <p className="mega-promo-title">Not sure where to start?</p>
                    <p>Send us the problem. We&apos;ll come back with scope, timeline, and a price.</p>
                    <Link className="btn btn-magenta" href="/contact" style={{ marginTop: 10 }} onClick={go}>
                      Request a Quote
                      <svg className="arr" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                        <path d="M7 17L17 7M9 7h8v8" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="nav-item">
              <Link className="nav-link" href="/careers" onClick={go} aria-current={current("/careers")}>Careers</Link>
            </div>
            <div className="nav-item">
              <Link className="nav-link" href="/about" onClick={go} aria-current={current("/about")}>About Us</Link>
            </div>
          </nav>

          <Link className="btn-contact" href="/contact" aria-current={current("/contact")}>
            <span>Contact</span>
          </Link>

          <button
            id="burger"
            ref={burgerRef}
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
        <button ref={closeRef} className="menu-close" type="button" aria-label="Close menu" onClick={closeMenu}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
        <Link href="/" onClick={closeMenu} aria-current={current("/")}><small>01</small>Home</Link>
        <Link href="/services" onClick={closeMenu} aria-current={current("/services")}><small>02</small>Services</Link>
        {serviceNav.map(({ label, href }, i) => (
          <Link key={href} className="mobile-sub" href={href} onClick={closeMenu} prefetch={false} aria-current={current(href)}>
            <small>02.{i + 1}</small>
            {label}
          </Link>
        ))}
        <Link href="/industries" onClick={closeMenu} aria-current={current("/industries")}><small>03</small>Industries</Link>
        {industryNav.map((item, i) => (
          <IndustryLink key={item.href} plain={onIndustries} className="mobile-sub" onClick={closeMenu} {...item}>
            <small>03.{i + 1}</small>
          </IndustryLink>
        ))}
        <Link href="/careers" onClick={closeMenu} aria-current={current("/careers")}><small>04</small>Careers</Link>
        <Link href="/about" onClick={closeMenu} aria-current={current("/about")}><small>05</small>About Us</Link>
        <Link href="/contact" onClick={closeMenu} style={{ color: "var(--primary)" }} aria-current={current("/contact")}><small>06</small>Contact</Link>
      </nav>
    </>
  );
}
