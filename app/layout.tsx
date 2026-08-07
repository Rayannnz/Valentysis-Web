import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import CookieConsent from "@/components/CookieConsent";
import InlineScript from "@/components/InlineScript";
import JsonLd from "@/components/JsonLd";
import {
  graph,
  localBusinessSchema,
  organizationSchema,
  websiteSchema,
} from "@/lib/schema";
import { site } from "@/lib/site";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  /* makes every relative URL in metadata absolute — canonicals, OG, icons */
  metadataBase: new URL(site.url),
  title: {
    default: "Valentisys | Outsourcing & Customer Support Services",
    /* per-page titles already end in "| Valentisys", so the template only
       covers anything that sets a bare string */
    template: "%s | Valentisys",
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  publisher: site.name,
  category: "business",
  alternates: { canonical: site.url },
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: site.locale,
    url: site.url,
    title: "Valentisys | Outsourcing & Customer Support Services",
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: "Valentisys | Outsourcing & Customer Support Services",
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  /* No `icons` key on purpose. Setting one replaces file-convention detection
     wholesale, which is what previously stopped app/apple-icon.png emitting a
     rel="apple-touch-icon". app/favicon.ico, app/icon.png, and app/apple-icon.png
     are all picked up automatically. */
  manifest: "/manifest.webmanifest",
  appleWebApp: { capable: true, title: site.name, statusBarStyle: "default" },
  formatDetection: { telephone: false, address: false, email: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  colorScheme: "light",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#6D28D9" },
    { media: "(prefers-color-scheme: dark)", color: "#171429" },
  ],
};

/* One graph for the whole site. Pages add their own WebPage/Breadcrumb/Service
   nodes that reference these by @id instead of restating the company. */
const siteGraph = graph(organizationSchema(), websiteSchema(), localBusinessSchema());

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-US"
      className={`${spaceGrotesk.variable} ${inter.variable}`}
      /* globals.css sets scroll-behavior:smooth so in-page anchors glide.
         Without this attribute Next warns, because it also makes the
         scroll-to-top on a route change animate instead of jumping. Declaring
         it tells Next the smooth scrolling is deliberate. */
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <head>
        {/* Gates the scroll-reveal CSS so content stays visible without JS.
            Has to run during parse, before the first paint — see InlineScript. */}
        <InlineScript html="document.documentElement.classList.add('js')" />
      </head>
      <body>
        {/* first focusable element on every page — the nav is 20+ tab stops */}
        <a className="skip-link" href="#main">
          Skip to main content
        </a>
        {children}
        <CookieConsent />
        <JsonLd data={siteGraph} />
      </body>
    </html>
  );
}
