import type { Metadata } from "next";
import Cta from "@/components/Cta";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Industries from "@/components/Industries";
import JsonLd from "@/components/JsonLd";
import PageEffects from "@/components/PageEffects";
import PageHero from "@/components/PageHero";
import { industries } from "@/lib/industries";
import { breadcrumbSchema, type Crumb, graph, webPageSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";

const TITLE = "Industries: Health, Legal, Finance & More | Valentisys";
const DESCRIPTION =
  "The five sectors Valentisys staffs in depth: health, legal, engineering, finance and hospitality, and what each expects of the people doing the work.";

export const metadata: Metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: "/industries",
});

const trail: Crumb[] = [
  { name: "Home", path: "/" },
  { name: "Industries", path: "/industries" },
];

/* the five sectors are accordion panels on one page, so they are an ItemList of
   in-page anchors rather than five crawlable URLs */
const industryList = {
  "@type": "ItemList",
  name: "Industries served by Valentisys",
  itemListElement: industries.map(({ id, name, desc }, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name,
    description: desc,
    url: absoluteUrl(`/industries#${id}`),
  })),
};

export default function IndustriesPage() {
  return (
    <>
      <PageEffects />
      <Header />
      <main id="main">
        <PageHero
          eyebrow="Industries"
          lines={[
            "The sectors we",
            <>
              know <span className="accent">in depth</span>.
            </>,
          ]}
          lead="Every industry brings its own paperwork, deadlines, and rules about who may touch what. Here's what we've learned staffing and supporting each of them."
        />

        <section className="section section-after-hero">
          <div className="container">
            <div className="about-story">
              <div className="story-copy">
                <p className="sec-eyebrow" data-reveal>Overview</p>
                <h2 className="sec-title" data-reveal style={{ marginBottom: 26 }}>
                  Sector knowledge that shortens the ramp-up
                </h2>
                <p data-reveal>
                  The risk in outsourcing isn&apos;t finding people. It&apos;s the weeks lost while
                  they learn what your sector takes for granted: the form that must be filed a
                  certain way, the caller who has to be escalated, the record nobody outside the
                  practice may open.
                </p>
                <p data-reveal>
                  We staff these five sectors regularly. That means the rules are understood before
                  anyone touches a live file, the process is written down on day one, and
                  you&apos;re not paying for our education in your industry.
                </p>
              </div>
              <div className="story-panel" data-reveal="scale">
                <span className="big">Five sectors</span>
                <p>we staff repeatedly, so the rules are known before anyone starts.</p>
              </div>
            </div>
          </div>
        </section>

        <Industries />

        <Cta />
      </main>
      <Footer />
      <JsonLd
        data={graph(
          webPageSchema({
            name: TITLE,
            description: DESCRIPTION,
            path: "/industries",
            type: "CollectionPage",
          }),
          breadcrumbSchema(trail),
          industryList
        )}
      />
    </>
  );
}
