import type { MetadataRoute } from "next";
import { absoluteUrl, site } from "@/lib/site";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        /* Post-submission confirmation only — it carries no content worth
           ranking and would otherwise compete with /contact. The page also
           sends its own noindex, which is what actually removes it if a
           crawler reaches it from a link. */
        disallow: ["/thank-you"],
      },
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
    host: site.url,
  };
}
