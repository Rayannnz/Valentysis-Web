import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import PageEffects from "@/components/PageEffects";
import ThankYouMessage from "@/components/ThankYouMessage";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Thank You: Your Message Has Reached Us | Valentisys",
  description:
    "Your message has reached us. Here is what happens next, how quickly you will hear back, and who to email if you need to add something to it.",
  path: "/thank-you",
  /* a confirmation page has nothing to rank for and would only cannibalize
     /contact; it exists as a conversion destination, not a landing page */
  noIndex: true,
});

export default function ThankYouPage() {
  return (
    <>
      <PageEffects />
      <Header />
      <main id="main">
        <ThankYouMessage variant="contact" />
      </main>
      <Footer />
    </>
  );
}
