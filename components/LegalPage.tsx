import type { ReactNode } from "react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import JsonLd from "@/components/JsonLd";
import PageEffects from "@/components/PageEffects";
import PageHero from "@/components/PageHero";
import { breadcrumbSchema, type Crumb, graph, webPageSchema } from "@/lib/schema";

export type LegalSection = {
  /** Anchor target — also the contents-list link, so keep it stable. */
  id: string;
  heading: string;
  body: ReactNode;
};

/**
 * Shared shell for the four policy pages. They differ only in copy, so the
 * page shell, contents list, and structured data are built once here rather
 * than repeated four times and allowed to drift apart.
 */
export default function LegalPage({
  eyebrow,
  headline,
  accent,
  lead,
  path,
  seoTitle,
  seoDescription,
  updated,
  updatedIso,
  sections,
  children,
}: {
  eyebrow: string;
  headline: string;
  accent: string;
  lead: string;
  path: string;
  seoTitle: string;
  seoDescription: string;
  updated: string;
  updatedIso: string;
  sections: LegalSection[];
  /** Rendered after the sections — used by /cookies for the preference center. */
  children?: ReactNode;
}) {
  const trail: Crumb[] = [
    { name: "Home", path: "/" },
    { name: eyebrow, path },
  ];

  return (
    <>
      <PageEffects />
      <Header />
      <main id="main">
        <PageHero
          eyebrow={eyebrow}
          lines={[
            headline,
            <>
              <span className="accent">{accent}</span>
            </>,
          ]}
          lead={lead}
        />

        <section className="section legal-section">
          <div className="container">
            <div className="legal-layout">
              {/* sticky on desktop; a policy is long and people arrive looking
                  for one clause */}
              <aside className="legal-toc" aria-labelledby="legal-toc-title">
                <p className="legal-toc-title" id="legal-toc-title">
                  On this page
                </p>
                <ol>
                  {sections.map(({ id, heading }) => (
                    <li key={id}>
                      <a href={`#${id}`}>{heading}</a>
                    </li>
                  ))}
                </ol>
              </aside>

              <article className="legal-body">
                <p className="legal-updated">
                  Last updated <time dateTime={updatedIso}>{updated}</time>
                </p>

                {sections.map(({ id, heading, body }) => (
                  <section className="legal-block" id={id} key={id}>
                    <h2>{heading}</h2>
                    {body}
                  </section>
                ))}

                {children}
              </article>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <JsonLd
        data={graph(
          webPageSchema({ name: seoTitle, description: seoDescription, path }),
          breadcrumbSchema(trail)
        )}
      />
    </>
  );
}
