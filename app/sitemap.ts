import type { MetadataRoute } from "next";
import { SITE_LAST_UPDATED, SITE_URL } from "@/lib/seo/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date(SITE_LAST_UPDATED);

  return [
    {
      url: `${SITE_URL}/`,
      lastModified,
      changeFrequency: "monthly",
      priority: 1
    },
    {
      url: `${SITE_URL}/calculadora-cts`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8
    },
    {
      url: `${SITE_URL}/calculadora-gratificacion`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8
    }
  ];
}
