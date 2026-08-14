"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function PageEffects() {
  const [showTop, setShowTop] = useState(false);
  const progressRef = useRef<HTMLDivElement>(null);
  const reduceMotionRef = useRef(false);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    reduceMotionRef.current = reduceMotion;
    const cleanups: (() => void)[] = [];

    /* ---------- Loader + hero heading lines ----------
       These delays sit directly on the critical path: the h1 is the LCP element
       on every page and stays masked until revealHeroLines runs, so the total
       is window.load + this. Kept short deliberately — the earlier 350/500ms
       pair pushed LCP roughly half a second past load for no visual gain. */
    const markLoaded = () => document.body.classList.add("loaded");
    const revealHeroLines = () => {
      setTimeout(() => {
        document.querySelectorAll("[data-hero-lines] .line-mask").forEach((m, i) => {
          const line = m.querySelector<HTMLElement>(".line");
          if (line) line.style.transitionDelay = `${0.06 + i * 0.08}s`;
          m.classList.add("in-view");
        });
      }, reduceMotion ? 0 : 200);
    };
    const onLoad = () => {
      setTimeout(markLoaded, reduceMotion ? 0 : 140);
      revealHeroLines();
    };
    if (document.readyState === "complete") {
      onLoad();
    } else {
      window.addEventListener("load", onLoad);
      cleanups.push(() => window.removeEventListener("load", onLoad));
    }
    /* fallbacks if load never settles quickly */
    const tLoad = setTimeout(markLoaded, 2500);
    const tLines = setTimeout(() => {
      document.querySelectorAll("[data-hero-lines] .line-mask").forEach((m) => m.classList.add("in-view"));
    }, 2600);
    cleanups.push(() => {
      clearTimeout(tLoad);
      clearTimeout(tLines);
    });

    /* ---------- Scroll progress + back-to-top ---------- */
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const h = document.documentElement;
        const max = h.scrollHeight - h.clientHeight;
        if (progressRef.current) {
          progressRef.current.style.transform = `scaleX(${max > 0 ? h.scrollTop / max : 0})`;
        }
        setShowTop(window.scrollY > 900);
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    cleanups.push(() => window.removeEventListener("scroll", onScroll));

    /* ---------- Links to the page you are already on ----------
       A real navigation scrolls itself: Next takes you to the top of a new route,
       and to the anchor when the href carries one. A link pointing at the URL you
       are already on is the gap — nothing navigates, so clicking "Home" from
       halfway down the home page left you exactly where you were.

       Delegated on the document rather than wired per link, so the header, the
       mega-menus, the mobile menu, the footer, and every in-page CTA are covered
       at once. Nothing is prevented here — <Link> still pushes the URL, and the
       native industry anchors still fire their own hash handling; this only moves
       the viewport afterwards. */
    const scrollToHref = (hash: string) => {
      const behavior: ScrollBehavior = reduceMotion ? "auto" : "smooth";
      if (!hash) {
        window.scrollTo({ top: 0, behavior });
        return;
      }
      let target: Element | null = null;
      try {
        target = document.querySelector(hash);
      } catch {
        /* an id that isn't a valid selector — treat it as not found */
      }
      /* scroll-padding-top on <html> keeps the sticky header off the section */
      if (target) target.scrollIntoView({ behavior, block: "start" });
    };

    const onDocumentClick = (ev: MouseEvent) => {
      if (ev.button !== 0) return;
      /* modified clicks open a new tab — leave this one alone */
      if (ev.metaKey || ev.ctrlKey || ev.shiftKey || ev.altKey) return;

      const link = (ev.target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!link || link.hasAttribute("download")) return;
      if (link.target && link.target !== "_self") return;

      let url: URL;
      try {
        url = new URL(link.href, location.href);
      } catch {
        return;
      }
      /* mailto:, tel:, and offsite links all fail this */
      if (url.origin !== location.origin) return;
      /* a different page is a real navigation — let the router place it */
      if (url.pathname !== location.pathname || url.search !== location.search) return;

      /* a frame late on purpose: the mobile menu releases its scroll lock in an
         effect, and scrolling into that lock would be swallowed */
      requestAnimationFrame(() => scrollToHref(url.hash));
    };
    /* capture, not bubble: <Link> calls preventDefault to route on the client, so
       by the bubble phase every internal link looks cancelled — and capture also
       survives a handler that stops propagation on the way up */
    document.addEventListener("click", onDocumentClick, true);
    cleanups.push(() => document.removeEventListener("click", onDocumentClick, true));

    /* ---------- Reveal on scroll ---------- */
    const revealEls = document.querySelectorAll("[data-reveal]");
    if ("IntersectionObserver" in window) {
      const siblingCounts = new Map<Element, number>();
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (!e.isIntersecting) return;
            const el = e.target as HTMLElement;
            const parent = el.parentElement ?? document.body;
            const count = siblingCounts.get(parent) ?? 0;
            siblingCounts.set(parent, count + 1);
            el.style.transitionDelay = `${Math.min(count * 90, 450)}ms`;
            el.classList.add("in-view");
            io.unobserve(el);
            setTimeout(() => siblingCounts.set(parent, 0), 400);
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
      );
      revealEls.forEach((el) => io.observe(el));
      cleanups.push(() => io.disconnect());
    } else {
      revealEls.forEach((el) => el.classList.add("in-view"));
    }

    /* ---------- Hero parallax chips ---------- */
    if (finePointer && !reduceMotion) {
      const hero = document.getElementById("hero");
      const chips = document.querySelectorAll<HTMLElement>("[data-parallax]");
      const onMove = (ev: MouseEvent) => {
        const cx = ev.clientX / window.innerWidth - 0.5;
        const cy = ev.clientY / window.innerHeight - 0.5;
        chips.forEach((ch) => {
          const depth = parseFloat(ch.dataset.parallax ?? "0");
          ch.style.translate = `${cx * depth}px ${cy * depth}px`;
        });
      };
      hero?.addEventListener("mousemove", onMove);
      cleanups.push(() => hero?.removeEventListener("mousemove", onMove));
    }

    /* ---------- Magnetic buttons ---------- */
    if (finePointer && !reduceMotion) {
      document.querySelectorAll<HTMLElement>("[data-magnetic]").forEach((btn) => {
        const onMove = (ev: MouseEvent) => {
          const r = btn.getBoundingClientRect();
          const x = (ev.clientX - r.left - r.width / 2) * 0.25;
          const y = (ev.clientY - r.top - r.height / 2) * 0.35;
          btn.style.transform = `translate(${x}px,${y}px)`;
        };
        const onLeave = () => {
          btn.style.transition = "transform .5s cubic-bezier(.16,1,.3,1)";
          btn.style.transform = "";
          setTimeout(() => {
            btn.style.transition = "";
          }, 500);
        };
        btn.addEventListener("mousemove", onMove);
        btn.addEventListener("mouseleave", onLeave);
        cleanups.push(() => {
          btn.removeEventListener("mousemove", onMove);
          btn.removeEventListener("mouseleave", onLeave);
        });
      });
    }

    return () => cleanups.forEach((fn) => fn());
  }, []);

  return (
    <>
      <div id="loader" aria-hidden="true">
        <div className="loader-mark">
          <span>
            {/* rendered at most 96px square — see the sizes note in Header.tsx */}
            <Image
              src="/logo/logo-mark.png"
              alt="Valentisys"
              width={256}
              height={256}
              sizes="96px"
              priority
            />
          </span>
        </div>
      </div>

      <div id="progress" ref={progressRef} aria-hidden="true" />
      <div id="nav-veil" aria-hidden="true" />

      <button
        id="toTop"
        className={showTop ? "show" : ""}
        aria-label="Back to top"
        onClick={() =>
          window.scrollTo({ top: 0, behavior: reduceMotionRef.current ? "auto" : "smooth" })
        }
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
          <path d="M12 19V5M5 12l7-7 7 7" />
        </svg>
      </button>
    </>
  );
}
