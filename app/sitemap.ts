import type { MetadataRoute } from "next";
import { services } from "@/lib/services";
import { absoluteUrl } from "@/lib/site";

export const dynamic = "force-static";

/* Stamped once per build. Faking per-page dates would be worse than one honest
   one — a lastModified that never matches the content is ignored by crawlers. */
const lastModified = new Date();

type Entry = {
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
};

const pages: Entry[] = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/industries", changeFrequency: "monthly", priority: 0.8 },
  { path: "/about", changeFrequency: "monthly", priority: 0.7 },
  { path: "/contact", changeFrequency: "monthly", priority: 0.9 },
  { path: "/careers", changeFrequency: "weekly", priority: 0.7 },
  { path: "/sitemap", changeFrequency: "monthly", priority: 0.3 },
  { path: "/privacy", changeFrequency: "yearly", priority: 0.2 },
  { path: "/terms", changeFrequency: "yearly", priority: 0.2 },
  { path: "/cookies", changeFrequency: "yearly", priority: 0.2 },
  { path: "/accessibility", changeFrequency: "yearly", priority: 0.2 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const servicePages: Entry[] = services.map(({ slug }) => ({
    path: `/services/${slug}`,
    changeFrequency: "monthly",
    priority: 0.9,
  }));

  /* service pages sit directly after the home page: they are the commercial
     entry points, and the order is the crawl hint */
  return [pages[0], ...servicePages, ...pages.slice(1)].map(
    ({ path, changeFrequency, priority }) => ({
      url: absoluteUrl(path),
      lastModified,
      changeFrequency,
      priority,
    })
  );
}
