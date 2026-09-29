import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import JsonLd from "@/components/JsonLd";
import PageEffects from "@/components/PageEffects";
import PageHero from "@/components/PageHero";
import { breadcrumbSchema, type Crumb, graph, webPageSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { careersEmail } from "@/lib/site";

/* below the fold and only on this route, so it loads in its own chunk */
const ApplicationForm = dynamic(() => import("@/components/ApplicationForm"));

/* no count in the title: the team list is computed in ApplicationForm and the
   number went stale the moment it changed */
const TITLE = "Careers: Remote Roles Across Every Team | Valentisys";
const DESCRIPTION =
  "Join Valentisys in customer support, marketing, app and web development, AI, SEO, paid ads, or design and video. One form, every team, and a reply either way.";

export const metadata: Metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: "/careers",
});

const trail: Crumb[] = [
  { name: "Home", path: "/" },
  { name: "Careers", path: "/careers" },
];

export default function CareersPage() {
  return (
    <>
      <PageEffects />
      <Header />
      <main id="main" tabIndex={-1}>
        <PageHero
          eyebrow="Careers"
          lines={[
            "Do the best work",
            <>
              of your <span className="accent">career.</span>
            </>,
          ]}
          lead="We're building teams across real customer support, digital marketing, app and web development, AI, SEO, paid ads, and graphic design and video editing. If you like clear ownership, short feedback loops, and small egos, you'll fit right in."
        />

        <section id="apply" className="section application-section">
          <div className="container">
            <div className="sec-head application-sec-head">
              <div>
                <p className="sec-eyebrow" data-reveal>
                  Apply now
                </p>
                <h2 className="sec-title" data-reveal>
                  One form. Every role.
                </h2>
              </div>
              <p className="sec-note" data-reveal>
                Pick the team you want to join. No separate posts to hunt through. Questions first?
                Email <a href={`mailto:${careersEmail}`}>{careersEmail}</a>.
              </p>
            </div>

            <ApplicationForm />
          </div>
        </section>
      </main>
      <Footer />
      <JsonLd
        data={graph(
          webPageSchema({ name: TITLE, description: DESCRIPTION, path: "/careers" }),
          breadcrumbSchema(trail)
        )}
      />
    </>
  );
}
