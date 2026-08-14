import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import PageEffects from "@/components/PageEffects";
import ThankYouMessage from "@/components/ThankYouMessage";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Thank You: Your Application Is With Us | Valentisys",
  description:
    "Your application has reached us. Here is what happens next, how soon we reply, and who to email if you want to add a portfolio or anything else to it.",
  path: "/thank-you/application",
  /* same reasoning as /thank-you. A conversion destination, not a landing page.
     robots.txt disallows /thank-you, which prefix-matches this too. */
  noIndex: true,
});

export default function ApplicationThankYouPage() {
  return (
    <>
      <PageEffects />
      <Header />
      <main id="main">
        <ThankYouMessage variant="careers" />
      </main>
      <Footer />
    </>
  );
}
