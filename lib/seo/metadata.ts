import type { Metadata } from "next";
import { SITE_NAME } from "./site";

interface PageMetadata {
  title: string;
  description: string;
  path: string;
}

export function buildMetadata({
  title,
  description,
  path
}: PageMetadata): Metadata {
  return {
    title,
    description,
    alternates: {
      canonical: path
    },
    openGraph: {
      type: "website",
      locale: "es_PE",
      url: path,
      siteName: SITE_NAME,
      title: `${title} | ${SITE_NAME}`,
      description
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${SITE_NAME}`,
      description
    }
  };
}
