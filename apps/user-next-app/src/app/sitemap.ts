import type { MetadataRoute } from "next";
import { SEO_CONFIG } from "./metadata";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SEO_CONFIG.SITE_URL;
  const now = new Date();

  return [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
  ];
}
