import type { MetadataRoute } from "next";
import { absoluteUrl, isPreviewDeploy, site } from "@/lib/site";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  /* A preview host is never indexed. No sitemap either: its URLs would point at
     the preview host too. The root layout sends the matching noindex tag. */
  if (isPreviewDeploy) {
    return { rules: [{ userAgent: "*", disallow: "/" }] };
  }

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
