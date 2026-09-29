import type { MetadataRoute } from "next";
import { absoluteUrl, site } from "@/lib/site";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      /* No Disallow for /thank-you. Both confirmation pages send their own
         noindex (buildMetadata noIndex), and a Disallow would stop the crawler
         from ever fetching the page and reading that tag, so a linked-to
         /thank-you could still surface as a URL-only result. */
      { userAgent: "*", allow: "/" },
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
    host: site.url,
  };
}
