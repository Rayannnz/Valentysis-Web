import type { Metadata } from "next";
import LegalPage, { type LegalSection } from "@/components/LegalPage";
import { buildMetadata } from "@/lib/seo";
import { contactEmail, site } from "@/lib/site";

const TITLE = "Accessibility Statement | WCAG 2.2 AA at Valentisys";
const DESCRIPTION =
  "Our commitment to WCAG 2.2 AA on valentisys.com: what we have built in, the limitations we know about, and how to tell us when something blocks you.";

export const metadata: Metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: "/accessibility",
});

const sections: LegalSection[] = [
  {
    id: "commitment",
    heading: "1. Our commitment",
    body: (
      <p>
        We want everyone to be able to read this site and get in touch with us, whatever device,
        browser, or assistive technology they use. We treat accessibility as part of building the
        site properly, not as a pass at the end.
      </p>
    ),
  },
  {
    id: "conformance",
    heading: "2. Conformance status",
    body: (
      <>
        <p>
          This site is designed to meet{" "}
          <a
            href="https://www.w3.org/TR/WCAG22/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Web Content Accessibility Guidelines (WCAG) 2.2, Level AA
          </a>
          .
        </p>
        <p className="legal-callout">
          We assess the site as <strong>partially conformant</strong>. Partially conformant means
          most of the site meets the standard, and we know of the exceptions listed in section 4.
          We have not yet commissioned an independent third-party audit.
        </p>
      </>
    ),
  },
  {
    id: "measures",
    heading: "3. What we have built in",
    body: (
      <ul className="legal-list">
        <li>
          <strong>Keyboard access.</strong> Every link, button, form field, and accordion can be
          reached and operated with a keyboard alone, in a logical order. A visible focus outline
          follows you.
        </li>
        <li>
          <strong>Skip link.</strong> The first thing you reach with the Tab key is a link that
          jumps past the navigation to the page content.
        </li>
        <li>
          <strong>Semantic structure.</strong> Real landmarks, one <code>h1</code> per page, and
          headings that descend in order, so a screen reader can be used to navigate rather than
          only to read.
        </li>
        <li>
          <strong>Contrast.</strong> Text and interface colors are checked against the 4.5:1 AA
          threshold, and large text against 3:1.
        </li>
        <li>
          <strong>Reduced motion.</strong> If your system asks for reduced motion, the reveal
          animations, parallax, and smooth scrolling all switch off.
        </li>
        <li>
          <strong>Forms.</strong> Every field has a visible, permanently associated label. Errors
          are announced, described in words rather than by color alone, and never rely on a
          timeout.
        </li>
        <li>
          <strong>Works without JavaScript.</strong> Content is visible and readable if scripts
          fail or are blocked; the animation layer is an enhancement on top.
        </li>
        <li>
          <strong>Zoom and reflow.</strong> The layout reflows to 320px and stays usable at 200%
          text zoom without horizontal scrolling.
        </li>
      </ul>
    ),
  },
  {
    id: "limitations",
    heading: "4. Known limitations",
    body: (
      <>
        <p>We would rather list these than let you find them:</p>
        <ul className="legal-list">
          <li>
            <strong>Collapsed accordion panels.</strong> On the industries and service pages,
            collapsed panels are visually hidden but their text is still present in the page
            source. Some screen readers may read it before you expand the panel.
          </li>
          <li>
            <strong>File upload on the careers form.</strong> The resume field uses a custom
            control layered over the native one. It is keyboard operable, but the announcement is
            less clear than a plain file input. If it gets in your way, email your resume to us
            directly.
          </li>
          <li>
            <strong>No third-party audit.</strong> Our testing is internal, using keyboard
            navigation, automated checks, and screen reader spot checks, not a full manual audit
            by an accredited assessor.
          </li>
        </ul>
        <p>These are on our list. We will update this page as each one is closed out.</p>
      </>
    ),
  },
  {
    id: "assessment",
    heading: "5. How we test",
    body: (
      <p>
        We test with keyboard-only navigation, automated tooling in the browser, and manual checks
        against the WCAG 2.2 AA success criteria across current versions of Chrome, Firefox,
        Safari, and Edge on desktop and mobile. Accessibility is reviewed whenever we change the
        site, not only at release.
      </p>
    ),
  },
  {
    id: "feedback",
    heading: "6. Tell us if something blocks you",
    body: (
      <>
        <p>
          If any part of this site stops you doing what you came to do, we want to hear about it
          — including anything not listed above.
        </p>
        <p>
          Email <a href={`mailto:${contactEmail}`}>{contactEmail}</a> with the page address, what
          you were trying to do, and what happened. We aim to reply within five working days, and
          we will tell you what we intend to do and by when. If you need information from this
          site in a different format, ask and we will send it.
        </p>
        <p>
          If you are not satisfied with our response, say so in your reply and it will be escalated
          internally rather than closed.
        </p>
      </>
    ),
  },
  {
    id: "technical",
    heading: "7. Technical specification",
    body: (
      <p>
        Accessibility on this site relies on HTML, WAI-ARIA, CSS, and JavaScript, and on those
        technologies being supported by your browser and any assistive technology you use. This
        statement applies to all pages on {site.url.replace(/^https?:\/\//, "")}.
      </p>
    ),
  },
];

export default function AccessibilityPage() {
  return (
    <LegalPage
      eyebrow="Accessibility"
      headline="Usable by"
      accent="everyone."
      lead="What we have built into this site, the limitations we already know about, and how to tell us when something gets in your way."
      path="/accessibility"
      seoTitle={TITLE}
      seoDescription={DESCRIPTION}
      updated={site.legalUpdated.label}
      updatedIso={site.legalUpdated.iso}
      sections={sections}
    />
  );
}
