import type { Metadata } from "next";
import Cta from "@/components/Cta";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Industries from "@/components/Industries";
import PageEffects from "@/components/PageEffects";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Industries — Valentisys",
  description:
    "The sectors Valentisys builds for — fintech, healthtech, edtech, ecommerce, proptech, and AI & data — and what each one demands of the software.",
};

export default function IndustriesPage() {
  return (
    <>
      <PageEffects />
      <Header />
      <main>
        <PageHero
          eyebrow="Industries"
          lines={[
            "The sectors we",
            <>
              know <span className="accent">in depth</span>.
            </>,
          ]}
          lead="Every industry brings its own constraints — regulation, integrations, data sensitivity, the load pattern that only shows up on launch day. Here's what we've learned building in each of them."
        />

        <section className="section" style={{ paddingTop: 0 }}>
          <div className="container">
            <div className="about-story">
              <div className="story-copy">
                <p className="sec-eyebrow" data-reveal>Overview</p>
                <h2 className="sec-title" data-reveal style={{ marginBottom: 26 }}>
                  Sector knowledge that shortens the build
                </h2>
                <p data-reveal>
                  Most delivery risk isn&apos;t technical. It&apos;s not knowing what a sector
                  expects until you&apos;re halfway through — the compliance rule nobody mentioned,
                  the integration everyone assumes you&apos;ll support, the audit trail that turns
                  out to be mandatory.
                </p>
                <p data-reveal>
                  We build in these sectors regularly. That means the hard requirements are on the
                  table in week one, the architecture accounts for them from the start, and
                  you&apos;re not funding our education in your industry.
                </p>
              </div>
              <div className="story-panel" data-reveal="scale">
                <span className="big">Six sectors</span>
                <p>we work in repeatedly — so the constraints are known before the first sprint.</p>
              </div>
            </div>
          </div>
        </section>

        <Industries />

        <Cta />
      </main>
      <Footer />
    </>
  );
}
