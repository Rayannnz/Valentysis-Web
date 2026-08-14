import type { Metadata } from "next";
import Approach from "@/components/Approach";
import Cta from "@/components/Cta";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import JsonLd from "@/components/JsonLd";
import PageEffects from "@/components/PageEffects";
import Process from "@/components/Process";
import Stats from "@/components/Stats";
import { graph, webPageSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";

const TITLE = "Outsourcing & Customer Support Services | Valentisys";
const DESCRIPTION =
  "Valentisys staffs trained remote teams for health, legal, engineering, finance and hospitality, plus the marketing, app and web work that grows them.";

export const metadata: Metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: "/",
});

/* the service catalog moved to /services with the listing — the Service nodes
   belong on the page that actually links them, not here */
const homeGraph = graph(webPageSchema({ name: TITLE, description: DESCRIPTION, path: "/" }));

export default function Home() {
  return (
    <>
      <PageEffects />
      <Header />
      <main id="main">
        <Hero />
        <Stats />
        <Approach />
        <Process />
        <Cta />
      </main>
      <Footer />
      <JsonLd data={homeGraph} />
    </>
  );
}
