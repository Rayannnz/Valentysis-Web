import type { Metadata } from "next";
import Link from "next/link";
import LegalPage, { type LegalSection } from "@/components/LegalPage";
import { buildMetadata } from "@/lib/seo";
import { contactEmail, site } from "@/lib/site";

const TITLE = "Terms & Conditions: Using This Website | Valentisys";
const DESCRIPTION =
  "The terms that govern your use of the Valentisys website: acceptable use, intellectual property, liability, and how these terms relate to a signed engagement.";

export const metadata: Metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: "/terms",
});

const sections: LegalSection[] = [
  {
    id: "about-these-terms",
    heading: "1. About these terms",
    body: (
      <>
        <p>
          These terms govern your use of this website, operated by {site.legalName}. By browsing
          the site or submitting a form, you accept them. If you do not, please stop using the
          site.
        </p>
        <p className="legal-callout">
          These are website terms, not a services contract. Any work we do for you is governed by
          the separate proposal, statement of work, and master services agreement signed for that
          engagement. Where those documents and these terms conflict, those documents win.
        </p>
      </>
    ),
  },
  {
    id: "using-the-site",
    heading: "2. Using the site",
    body: (
      <>
        <p>You may read, print, and share our pages for your own business purposes. You may not:</p>
        <ul className="legal-list">
          <li>use the site for anything unlawful, fraudulent, or harmful;</li>
          <li>
            attempt to gain unauthorised access to the site, its hosting, or any connected
            system;
          </li>
          <li>
            scrape, harvest, or bulk-download content, or use automated tools in a way that
            degrades the service for others;
          </li>
          <li>
            submit false information, someone else&apos;s personal data without their
            permission, or malicious files through our forms;
          </li>
          <li>
            reproduce substantial parts of the site commercially, or present our content as your
            own.
          </li>
        </ul>
        <p>
          We may withdraw access to the site from anyone who breaks these rules, without notice.
        </p>
      </>
    ),
  },
  {
    id: "intellectual-property",
    heading: "3. Intellectual property",
    body: (
      <p>
        The Valentisys name, logo, page copy, layout, and design are owned by us or licensed to
        us, and are protected by copyright and trade mark law. Nothing on this site transfers any
        of those rights to you. You may quote short extracts with clear attribution and a link
        back to the page.
      </p>
    ),
  },
  {
    id: "enquiries-and-applications",
    heading: "4. Enquiries and job applications",
    body: (
      <>
        <p>
          Submitting an enquiry does not create a contract and does not oblige either of us to
          proceed. Nothing on this site is an offer capable of acceptance; scope, timeline, and
          price become binding only once set out in a signed document.
        </p>
        <p>
          Submitting a job application does not create an offer of employment or a guarantee of
          an interview. Please do not send confidential or privileged material through our forms.
          How we handle what you do send is set out in our{" "}
          <Link href="/privacy">privacy policy</Link>.
        </p>
      </>
    ),
  },
  {
    id: "accuracy",
    heading: "5. Accuracy of content",
    body: (
      <p>
        We keep the site accurate and current, but it is published for general information. Service
        descriptions, capabilities, and timeframes are indicative and may change. Nothing here is
        legal, financial, medical, or professional advice, and you should not act on it without
        taking advice suited to your circumstances.
      </p>
    ),
  },
  {
    id: "availability",
    heading: "6. Availability",
    body: (
      <p>
        We aim to keep the site available at all times, but we do not guarantee it. Access may be
        suspended, withdrawn, or restricted for maintenance or for reasons outside our control. We
        are not liable if the site is unavailable for any period.
      </p>
    ),
  },
  {
    id: "third-party-links",
    heading: "7. Third-party links",
    body: (
      <p>
        Where we link to another organisation&apos;s site, it is for information only. We do not
        control those sites, we do not endorse their content, and we are not responsible for what
        happens when you visit them. Their terms and privacy policies apply, not ours.
      </p>
    ),
  },
  {
    id: "liability",
    heading: "8. Liability",
    body: (
      <>
        <p>
          Nothing in these terms excludes or limits our liability for death or personal injury
          caused by our negligence, for fraud or fraudulent misrepresentation, or for anything
          else that cannot lawfully be limited.
        </p>
        <p>
          Subject to that, we are not liable for any loss of profit, revenue, business,
          anticipated savings, goodwill, or data, or for any indirect or consequential loss,
          arising from your use of this site. Our total liability in connection with the site is
          limited to PKR 10,000.
        </p>
        <p>
          If you use the site in the course of business, these limits are reasonable given that
          the site is provided free of charge.
        </p>
      </>
    ),
  },
  {
    id: "privacy",
    heading: "9. Privacy and cookies",
    body: (
      <p>
        Our <Link href="/privacy">privacy policy</Link> explains what we do with personal
        information, and our <Link href="/cookies">cookie policy</Link> explains what we store on
        your device and how to change it. Both form part of these terms.
      </p>
    ),
  },
  {
    id: "changes",
    heading: "10. Changes to these terms",
    body: (
      <p>
        We may revise these terms. The version published here, with the date shown at the top of
        the page, is the one that applies. Continuing to use the site after a change means you
        accept the revised terms.
      </p>
    ),
  },
  {
    id: "governing-law",
    heading: "11. Governing law",
    body: (
      <p>
        These terms and any dispute arising from them are governed by the laws of{" "}
        {site.address.countryName}, and the courts of {site.address.locality} have exclusive
        jurisdiction. If you are a consumer resident elsewhere, this does not remove any
        protection you have under the mandatory law of your own country.
      </p>
    ),
  },
  {
    id: "contact",
    heading: "12. Contact",
    body: (
      <>
        <p>
          Questions about these terms: <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
        </p>
        <p className="legal-address">{site.legalName}</p>
      </>
    ),
  },
];

export default function TermsPage() {
  return (
    <LegalPage
      eyebrow="Terms & conditions"
      headline="The terms of"
      accent="using this site."
      lead="What you may do with this site, what we stand behind, and where our website terms end and a signed engagement begins."
      path="/terms"
      seoTitle={TITLE}
      seoDescription={DESCRIPTION}
      updated={site.legalUpdated.label}
      updatedIso={site.legalUpdated.iso}
      sections={sections}
    />
  );
}
