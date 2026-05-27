import type { MetadataRoute } from "next";
import { SEO_CONFIG } from "./metadata";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/admin/", "/_next/", "/private/"],
      },
      {
        userAgent: "GPTBot",
        disallow: ["/"],
      },
    ],
    sitemap: `${SEO_CONFIG.SITE_URL}/sitemap.xml`,
    host: SEO_CONFIG.SITE_URL,
  };
}
