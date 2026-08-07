import type { Metadata } from "next";
import Approach from "@/components/Approach";
import Cta from "@/components/Cta";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import JsonLd from "@/components/JsonLd";
import PageEffects from "@/components/PageEffects";
import Process from "@/components/Process";
import Services from "@/components/Services";
import Stats from "@/components/Stats";
import { graph, serviceSchema, webPageSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { services } from "@/lib/services";

const TITLE = "Outsourcing & Customer Support Services | Valentisys";
const DESCRIPTION =
  "Valentisys staffs trained remote teams for health, legal, engineering, finance and hospitality, plus the marketing, app and web work that grows them.";

export const metadata: Metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: "/",
});

/* every service is linked from this page, so the whole catalogue belongs in
   the home graph — it is the strongest entity signal the site can send */
const homeGraph = graph(
  webPageSchema({ name: TITLE, description: DESCRIPTION, path: "/" }),
  ...services.map(serviceSchema)
);

export default function Home() {
  return (
    <>
      <PageEffects />
      <Header />
      <main id="main">
        <Hero />
        <Services />
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
