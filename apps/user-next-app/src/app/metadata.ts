import type { Metadata } from "next";

// Resolve site URL: env var > Vercel auto URL > localhost fallback
function getSiteUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  }
  // Vercel automatically sets VERCEL_URL (without protocol)
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return "http://localhost:3000";
}

export const SEO_CONFIG = {
  get SITE_URL() {
    return getSiteUrl();
  },
  SITE_NAME: "JOW Film",
  TWITTER_HANDLE: "@jowfilm",
  LOGO_URL: "https://jowfilm.vn/logo.png",
  DEFAULT_OG_IMAGE: "/images/og-image.png",
  DEFAULT_DESCRIPTION:
    "JOW Film — A cinematic wedding film studio crafting timeless love stories. Discover our portfolio of wedding highlights, traditional films, and short reels.",
  SUPPORTED_LOCALES: {
    "en-US": "en",
    "vi-VN": "vi",
  } as Record<string, string>,
} as const;

interface MetadataOptions {
  title?: string;
  description?: string;
  keywords?: string[];
  canonical?: string;
  openGraphImage?: string;
  noIndex?: boolean;
}

export function generateMetadata({
  title = SEO_CONFIG.SITE_NAME,
  description = SEO_CONFIG.DEFAULT_DESCRIPTION,
  keywords = [
    "wedding film",
    "wedding cinematography",
    "phìm cưới",
    "quay phìm cưới",
    "wedding highlight",
    "traditional film",
    "wedding reels",
    "JOW Film",
    "JOW Film Vietnam",
    "studio quay phìm cưới Việt Nam",
    "cinematic wedding",
    "lễ cưới",
  ],
  canonical = "/",
  openGraphImage = SEO_CONFIG.DEFAULT_OG_IMAGE,
  noIndex = false,
}: MetadataOptions = {}): Metadata {
  const canonicalUrl = `${SEO_CONFIG.SITE_URL}${canonical}`;
  // Facebook requires an absolute URL to resolve og:image:width / og:image:height
  const absoluteOgImage = openGraphImage.startsWith("http")
    ? openGraphImage
    : `${SEO_CONFIG.SITE_URL}${openGraphImage}`;

  return {
    metadataBase: new URL(SEO_CONFIG.SITE_URL),
    title: {
      default: title,
      template: `%s | ${SEO_CONFIG.SITE_NAME}`,
    },
    description,
    keywords,
    authors: [{ name: "JOW Film" }],
    creator: "JOW Film",
    publisher: "JOW Film",
    formatDetection: { email: false, address: false, telephone: false },
    alternates: {
      canonical: canonicalUrl,
      languages: {
        "en-US": `${SEO_CONFIG.SITE_URL}/en${canonical}`,
        "vi-VN": `${SEO_CONFIG.SITE_URL}/vi${canonical}`,
      },
    },
    openGraph: {
      type: "website",
      locale: "vi_VN",
      alternateLocale: ["en_US"],
      url: canonicalUrl,
      siteName: SEO_CONFIG.SITE_NAME,
      title,
      description,
      images: [
        {
          url: absoluteOgImage,
          secureUrl: absoluteOgImage,
          width: 1200,
          height: 293,
          alt: `${SEO_CONFIG.SITE_NAME} — Cinematic Wedding Films`,
          type: "image/png",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [absoluteOgImage],
      creator: SEO_CONFIG.TWITTER_HANDLE,
    },
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
          },
        },
  };
}

// --- Structured Data (JSON-LD) ---

export function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SEO_CONFIG.SITE_NAME,
    url: SEO_CONFIG.SITE_URL,
    logo: SEO_CONFIG.LOGO_URL,
    description: SEO_CONFIG.DEFAULT_DESCRIPTION,
    sameAs: [
      `https://twitter.com/${SEO_CONFIG.TWITTER_HANDLE.replace("@", "")}`,
      "https://facebook.com/jowfilm",
      "https://instagram.com/jowfilm",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: "hello@jowfilm.vn",
    },
  };
}

export function getWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SEO_CONFIG.SITE_NAME,
    url: SEO_CONFIG.SITE_URL,
    potentialAction: {
      "@type": "SearchAction",
      target: `${SEO_CONFIG.SITE_URL}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

interface BreadcrumbItem {
  name: string;
  url: string;
}

export function getBreadcrumbSchema(items: BreadcrumbItem[] = []) {
  const allItems = [
    { name: "Home", url: SEO_CONFIG.SITE_URL },
    ...items.map((item) => ({
      ...item,
      url: item.url.startsWith("http")
        ? item.url
        : `${SEO_CONFIG.SITE_URL}${item.url}`,
    })),
  ];

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: allItems.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

interface FAQItem {
  question: string;
  answer: string;
}

export function getFAQSchema(faqs: FAQItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}
