import type { Metadata } from "next";
import Link from "next/link";
import CookiePreferences from "@/components/CookiePreferences";
import LegalPage, { type LegalSection } from "@/components/LegalPage";
import { buildMetadata } from "@/lib/seo";
import { CONSENT_KEY } from "@/lib/consent";
import { contactEmail, site } from "@/lib/site";

const TITLE = "Cookie Policy: What We Store on Your Device | Valentisys";
const DESCRIPTION =
  "Exactly what Valentisys stores on your device, why, and how long for, with controls to accept or reject optional cookies and withdraw consent at any time.";

export const metadata: Metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: "/cookies",
});

const sections: LegalSection[] = [
  {
    id: "what-cookies-are",
    heading: "1. What this covers",
    body: (
      <>
        <p>
          Cookies are small files a site saves on your device. This policy also covers local
          storage, which works the same way from your point of view: it keeps a small amount of
          data in your browser between visits.
        </p>
        <p>
          We keep this deliberately short because we store very little. Everything currently in
          use is listed below.
        </p>
      </>
    ),
  },
  {
    id: "what-we-store",
    heading: "2. What we store today",
    body: (
      <>
        <div className="legal-table-wrap">
          <table className="legal-table">
            <caption className="legal-table-caption">
              Everything this site stores on your device
            </caption>
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Type</th>
                <th scope="col">Purpose</th>
                <th scope="col">Expires</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">
                  <code>{CONSENT_KEY}</code>
                </th>
                <td>Local storage</td>
                <td>
                  Remembers the cookie choice you made here, so we stop asking. Strictly
                  necessary.
                </td>
                <td>Until you clear it or clear your browser data</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          That is the entire list. We currently set <strong>no</strong> analytics cookies, no
          advertising cookies, and no third-party tracking pixels, and we do not embed content
          that sets them on our behalf.
        </p>
      </>
    ),
  },
  {
    id: "categories",
    heading: "3. The categories we ask about",
    body: (
      <>
        <p>
          The banner asks about two optional categories so that consent is already in place if we
          introduce them. Until then, choosing &quot;Accept all&quot; records your permission but
          loads nothing extra.
        </p>
        <ul className="legal-list">
          <li>
            <strong>Strictly necessary:</strong> makes the site work and remembers this choice.
            Always on; no consent needed under the applicable rules.
          </li>
          <li>
            <strong>Analytics:</strong> anonymous statistics on which pages get read and how
            people arrive. Off unless you turn it on.
          </li>
          <li>
            <strong>Marketing:</strong> measuring whether an ad led to an inquiry. Off unless
            you turn it on.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "managing",
    heading: "4. Managing your choice",
    body: (
      <>
        <p>
          Use the controls at the bottom of this page to change your preferences or withdraw
          consent entirely. Withdrawing is exactly as easy as giving it, and takes effect
          immediately.
        </p>
        <p>
          You can also clear site data through your browser settings, in Chrome, Firefox, Safari,
          and Edge alike. Doing so removes the record of your choice, so the banner will appear
          again on your next visit.
        </p>
      </>
    ),
  },
  {
    id: "changes",
    heading: "5. If this changes",
    body: (
      <p>
        If we add analytics or advertising technology, we will list it in the table above and ask
        for consent before it loads. Your existing choice will be respected. See our{" "}
        <Link href="/privacy">privacy policy</Link> for how we handle personal data more broadly,
        and email <a href={`mailto:${contactEmail}`}>{contactEmail}</a> with any questions.
      </p>
    ),
  },
];

export default function CookiesPage() {
  return (
    <LegalPage
      eyebrow="Cookie policy"
      headline="What we store,"
      accent="and what we don't."
      lead="A short policy, because we store almost nothing. Here is the complete list, and the controls to change it whenever you want."
      path="/cookies"
      seoTitle={TITLE}
      seoDescription={DESCRIPTION}
      updated={site.legalUpdated.label}
      updatedIso={site.legalUpdated.iso}
      sections={sections}
    >
      <CookiePreferences />
    </LegalPage>
  );
}
