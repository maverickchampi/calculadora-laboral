import type { MetadataRoute } from "next";
import { SITE_LAST_UPDATED, SITE_URL } from "@/lib/seo/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: new Date(SITE_LAST_UPDATED),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
