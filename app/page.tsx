import Approach from "@/components/Approach";
import Contact from "@/components/Contact";
import Cta from "@/components/Cta";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Industries from "@/components/Industries";
import PageEffects from "@/components/PageEffects";
import Process from "@/components/Process";
import Services from "@/components/Services";
import Stack from "@/components/Stack";
import Stats from "@/components/Stats";

export default function Home() {
  return (
    <>
      <PageEffects />
      <Header />
      <main>
        <Hero />
        <Services />
        <Industries />
        <Stats />
        <Approach />
        <Process />
        <Stack />
        <Cta />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
