import type { Metadata } from "next";
import Breadcrumbs, { type Crumb } from "@/components/Breadcrumbs";
import Cta from "@/components/Cta";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import JsonLd from "@/components/JsonLd";
import PageEffects from "@/components/PageEffects";
import PageHero from "@/components/PageHero";
import Services from "@/components/Services";
import { breadcrumbSchema, graph, serviceSchema, webPageSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { services } from "@/lib/services";

const TITLE = "Services: Outsourcing, Support & Growth | Valentisys";
const DESCRIPTION =
  "The six service lines Valentisys delivers — outsourcing, customer support, digital marketing, app and web development, and AI — and who each one is for.";

export const metadata: Metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: "/services",
});

const trail: Crumb[] = [
  { name: "Home", path: "/" },
  { name: "Services", path: "/services" },
];

/* every service is linked from this page, so the whole catalogue belongs in its
   graph — it is the strongest entity signal the site can send, and it moved here
   with the listing when Services stopped being a home-page section */
const servicesGraph = graph(
  webPageSchema({
    name: TITLE,
    description: DESCRIPTION,
    path: "/services",
    type: "CollectionPage",
  }),
  breadcrumbSchema(trail),
  ...services.map(serviceSchema)
);

export default function ServicesPage() {
  return (
    <>
      <PageEffects />
      <Header />
      <main id="main">
        <PageHero
          eyebrow="Services"
          lines={[
            "Everything we",
            <>
              do, <span className="accent">in one place</span>.
            </>,
          ]}
          lead="Six service lines, staffed by the same trained teams and run under one contract. Start with the one you need most; add the rest when it earns its place."
        />

        <Breadcrumbs trail={trail} />

        <section className="section" style={{ paddingTop: 0 }}>
          <div className="container">
            <div className="about-story">
              <div className="story-copy">
                <p className="sec-eyebrow" data-reveal>Overview</p>
                <h2 className="sec-title" data-reveal style={{ marginBottom: 26 }}>
                  One partner instead of six vendors
                </h2>
                <p data-reveal>
                  Most of the work companies outsource is connected. The team answering your
                  customers hears the same complaints your site causes. The people running your
                  back office know which process is the one worth automating. Split that across
                  six suppliers and nobody sees the whole picture.
                </p>
                <p data-reveal>
                  We keep it under one roof: staffing and support that carry the day-to-day, and
                  the marketing, app, web and AI work that grows it. Each service below stands on
                  its own — pick one, or combine them and pay for one relationship rather than
                  six.
                </p>
              </div>
              <div className="story-panel" data-reveal="scale">
                <span className="big">Six services</span>
                <p>one contract, one account lead, and a price agreed before anything starts.</p>
              </div>
            </div>
          </div>
        </section>

        <Services />

        <Cta />
      </main>
      <Footer />
      <JsonLd data={servicesGraph} />
    </>
  );
}
