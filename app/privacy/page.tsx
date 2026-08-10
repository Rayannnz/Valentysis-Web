import type { Metadata } from "next";
import Link from "next/link";
import LegalPage, { type LegalSection } from "@/components/LegalPage";
import { buildMetadata } from "@/lib/seo";
import { careersEmail, contactEmail, site } from "@/lib/site";

const TITLE = "Privacy Policy: How We Handle Your Data | Valentisys";
const DESCRIPTION =
  "How Valentisys collects, uses, stores, and protects the personal data you share through our contact and careers forms, and the rights you hold over it.";

export const metadata: Metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: "/privacy",
});

const sections: LegalSection[] = [
  {
    id: "who-we-are",
    heading: "1. Who we are",
    body: (
      <>
        <p>
          Valentisys provides outsourcing, customer support, digital marketing, application,
          web, and AI services.
        </p>
        <p>
          We are the data controller for the personal information described in this policy. For
          anything relating to your data, write to{" "}
          <a href={`mailto:${contactEmail}`}>{contactEmail}</a>.
        </p>
        <p>
          Where we deliver services on behalf of a client, we usually act as a data processor
          under that client&apos;s instructions. Those arrangements are governed by the signed
          agreement and data processing terms for that engagement, not by this policy.
        </p>
      </>
    ),
  },
  {
    id: "what-we-collect",
    heading: "2. What we collect",
    body: (
      <>
        <p>We only collect information you choose to give us, plus the technical records any website generates.</p>
        <h3>Enquiries</h3>
        <p>
          When you submit the form on our <Link href="/contact">contact page</Link> we collect
          your name, work email address, contact number, the industry and service you selected,
          your company name if you supply one, and whatever you write in the message field.
        </p>
        <h3>Job applications</h3>
        <p>
          When you apply through our <Link href="/careers">careers page</Link> we collect your
          name, email address, contact number, the team you applied to, and the CV file you
          attach. Your CV may contain further personal information; we only use what is relevant
          to assessing your application.
        </p>
        <h3>Technical records</h3>
        <p>
          Our host records standard server logs for every request: IP address, browser and
          device type, the page requested, and the time. These are generated automatically and
          used to keep the site available and secure.
        </p>
        <h3>What we do not collect</h3>
        <p>
          We do not ask for special category data, financial details, or government
          identification through this website, and we do not buy contact lists.
        </p>
      </>
    ),
  },
  {
    id: "why-we-use-it",
    heading: "3. Why we use it, and on what basis",
    body: (
      <>
        <ul className="legal-list">
          <li>
            <strong>To answer your enquiry and quote for work.</strong> Our lawful basis is the
            steps taken at your request before entering a contract, and our legitimate interest
            in responding to people who approach us.
          </li>
          <li>
            <strong>To assess your job application.</strong> Our lawful basis is the steps taken
            at your request before entering an employment contract, and our legitimate interest
            in recruiting.
          </li>
          <li>
            <strong>To keep the site available and secure.</strong> Our lawful basis is our
            legitimate interest in preventing abuse and diagnosing faults.
          </li>
          <li>
            <strong>To set optional cookies.</strong> Our lawful basis is your consent, which you
            can give, refuse, or withdraw at any time from our{" "}
            <Link href="/cookies#preferences">cookie preferences</Link>.
          </li>
        </ul>
        <p>
          We do not use your information for automated decision-making, and we do not profile you.
        </p>
      </>
    ),
  },
  {
    id: "cookies",
    heading: "4. Cookies and local storage",
    body: (
      <p>
        This site sets no advertising or tracking cookies by default. What we do store, and how
        to change it, is set out in full in our <Link href="/cookies">cookie policy</Link>, which
        also contains the preference controls.
      </p>
    ),
  },
  {
    id: "who-we-share-with",
    heading: "5. Who we share it with",
    body: (
      <>
        <p>
          We never sell your personal information, and we do not share it for anyone else&apos;s
          marketing. We share it only with the service providers we need in order to run the
          site, each of which is bound by contract to process it on our instructions alone:
        </p>
        <ul className="legal-list">
          {site.processors.map(({ name, role, region }) => (
            <li key={name}>
              <strong>{name}</strong> — {role}. Data processed in: {region}.
            </li>
          ))}
        </ul>
        <p>
          We may also disclose information where the law requires it, or to establish or defend
          a legal claim.
        </p>
      </>
    ),
  },
  {
    id: "international-transfers",
    heading: "6. International transfers",
    body: (
      <p>
        We operate from {site.address.countryName}, and our hosting provider stores data on
        infrastructure outside it. Where personal data leaves the UK or the European Economic
        Area, the transfer is covered by the provider&apos;s standard contractual clauses or an
        equivalent safeguard. You can ask us for details of the safeguard that applies to you.
      </p>
    ),
  },
  {
    id: "retention",
    heading: "7. How long we keep it",
    body: (
      <ul className="legal-list">
        <li>
          <strong>Enquiries that do not become work:</strong> up to 24 months, so we can pick up
          a conversation you return to, then deleted.
        </li>
        <li>
          <strong>Enquiries that become work:</strong> kept for the life of the engagement and
          for as long afterwards as tax and contract law requires.
        </li>
        <li>
          <strong>Unsuccessful applications:</strong> up to 12 months, so we can approach you
          about a later opening. Tell us and we will delete your CV sooner.
        </li>
        <li>
          <strong>Server logs:</strong> retained by our host on its own rolling schedule,
          typically under 30 days.
        </li>
      </ul>
    ),
  },
  {
    id: "security",
    heading: "8. How we protect it",
    body: (
      <p>
        The site is served only over HTTPS. Form submissions are encrypted in transit, and access
        to them is limited to the people who need it to reply to you. Our staff work under signed
        confidentiality terms and are given the least access their role requires. No system is
        perfectly secure, but if a breach affects your rights we will notify you and the relevant
        regulator as the law requires.
      </p>
    ),
  },
  {
    id: "your-rights",
    heading: "9. Your rights",
    body: (
      <>
        <p>
          Depending on where you live, you may have the right to ask us to: give you a copy of
          the data we hold about you; correct it if it is wrong; delete it; restrict or object to
          how we use it; send it to another provider in a portable format; or withdraw consent
          you previously gave.
        </p>
        <p>
          Email <a href={`mailto:${contactEmail}`}>{contactEmail}</a> and we will respond within
          30 days. Exercising these rights is free, and we will not treat you differently for it.
          If you are unhappy with our answer you may complain to your national data protection
          authority.
        </p>
      </>
    ),
  },
  {
    id: "children",
    heading: "10. Children",
    body: (
      <p>
        This site is aimed at businesses and job seekers, not children. We do not knowingly
        collect information from anyone under 16. If you believe a child has sent us personal
        information, contact us and we will delete it.
      </p>
    ),
  },
  {
    id: "changes",
    heading: "11. Changes to this policy",
    body: (
      <p>
        We update this policy when what we do with your data changes. The date at the top of this
        page always reflects the current version. Material changes will be highlighted on the site
        before they take effect.
      </p>
    ),
  },
  {
    id: "contact",
    heading: "12. Contact us",
    body: (
      <>
        <p>
          Privacy questions and rights requests:{" "}
          <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
          <br />
          Recruitment and CV questions:{" "}
          <a href={`mailto:${careersEmail}`}>{careersEmail}</a>
        </p>
        <p className="legal-address">{site.legalName}</p>
      </>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <LegalPage
      eyebrow="Privacy policy"
      headline="How we handle"
      accent="your data."
      lead="What we collect when you contact us or apply for a role, why we hold it, how long we keep it, and how to get it back or have it deleted."
      path="/privacy"
      seoTitle={TITLE}
      seoDescription={DESCRIPTION}
      updated={site.legalUpdated.label}
      updatedIso={site.legalUpdated.iso}
      sections={sections}
    />
  );
}
