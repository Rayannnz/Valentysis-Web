import Approach from "@/components/Approach";
import Cta from "@/components/Cta";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import PageEffects from "@/components/PageEffects";
import Process from "@/components/Process";
import Services from "@/components/Services";
import Stats from "@/components/Stats";

export default function Home() {
  return (
    <>
      <PageEffects />
      <Header />
      <main>
        <Hero />
        <Services />
        <Stats />
        <Approach />
        <Process />
        <Cta />
      </main>
      <Footer />
    </>
  );
}
