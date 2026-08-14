import type { Metadata } from "next";
import Link from "next/link";
import Cta from "@/components/Cta";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import JsonLd from "@/components/JsonLd";
import PageEffects from "@/components/PageEffects";
import PageHero from "@/components/PageHero";
import { industries } from "@/lib/industries";
import { breadcrumbSchema, type Crumb, graph, webPageSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { services } from "@/lib/services";

const TITLE = "Sitemap | Browse Every Page on the Valentisys Site";
const DESCRIPTION =
  "Every page on the Valentisys site in one list — services, industries, company pages and policies — each with a one-line note on what it covers.";

export const metadata: Metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: "/sitemap",
});

type LinkGroup = {
  heading: string;
  note: string;
  /* native anchors for in-page targets — see the note in Header.tsx */
  plain?: boolean;
  links: { label: string; href: string; desc: string }[];
};

const groups: LinkGroup[] = [
  {
    heading: "Main pages",
    note: "The core of the site.",
    links: [
      { label: "Home", href: "/", desc: "What we do, how we work, and who we do it for." },
      { label: "Services", href: "/services", desc: "Every service line, and who each one is for." },
      { label: "Industries", href: "/industries", desc: "The five sectors we staff and support in depth." },
      { label: "About us", href: "/about", desc: "Our story, our values, and where we do our best work." },
      { label: "Careers", href: "/careers", desc: "Open teams and a single application form." },
      { label: "Contact", href: "/contact", desc: "Tell us what you need covered and get a scoped price." },
    ],
  },
  {
    heading: "Services",
    note: "One page per service line, all listed on /services.",
    links: services.map(({ slug, shortTitle, homeDesc }) => ({
      label: shortTitle,
      href: `/services/${slug}`,
      desc: homeDesc,
    })),
  },
  {
    heading: "Industries",
    note: "Sections of the industries page.",
    plain: true,
    links: industries.map(({ id, name, desc }) => ({
      label: name,
      href: `/industries#${id}`,
      desc: `${desc.split(".")[0]}.`,
    })),
  },
  {
    heading: "Policies",
    note: "How we handle data, and what we commit to.",
    links: [
      { label: "Privacy policy", href: "/privacy", desc: "What we collect, why, and your rights over it." },
      { label: "Terms & conditions", href: "/terms", desc: "The terms that govern use of this site." },
      { label: "Cookie policy", href: "/cookies", desc: "What we store on your device, and the controls to change it." },
      { label: "Accessibility statement", href: "/accessibility", desc: "Our WCAG 2.2 AA commitment and known gaps." },
    ],
  },
];

const trail: Crumb[] = [
  { name: "Home", path: "/" },
  { name: "Sitemap", path: "/sitemap" },
];

export default function SitemapPage() {
  return (
    <>
      <PageEffects />
      <Header />
      <main id="main">
        <PageHero
          eyebrow="Sitemap"
          lines={[
            "Every page,",
            <>
              in <span className="accent">one list.</span>
            </>,
          ]}
          lead="If you are looking for something specific, it is on this page. Search engines get the machine-readable version at /sitemap.xml."
        />

        <section className="section section-after-hero">
          <div className="container">
            <div className="sitemap-grid">
              {groups.map(({ heading, note, links, plain }) => (
                <section className="sitemap-group" data-reveal key={heading}>
                  <h2>{heading}</h2>
                  <p className="sitemap-note">{note}</p>
                  <ul>
                    {links.map(({ label, href, desc }) => (
                      <li key={href}>
                        {plain ? <a href={href}>{label}</a> : <Link href={href}>{label}</Link>}
                        <span>{desc}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              ))}
            </div>
          </div>
        </section>

        <Cta />
      </main>
      <Footer />
      <JsonLd
        data={graph(
          webPageSchema({ name: TITLE, description: DESCRIPTION, path: "/sitemap" }),
          breadcrumbSchema(trail)
        )}
      />
    </>
  );
}
