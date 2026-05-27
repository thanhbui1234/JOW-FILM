import type { Metadata } from "next";

export const SEO_CONFIG = {
  SITE_URL: "https://holte-platform.com",
  SITE_NAME: "Holte Platform",
  TWITTER_HANDLE: "@holteplatform",
  LOGO_URL: "https://holte-platform.com/logo.png",
  DEFAULT_OG_IMAGE: "/og-image.png",
  DEFAULT_DESCRIPTION:
    "A modern, scalable platform built for developers and businesses. Experience seamless integration, powerful features, and exceptional performance.",
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
    "developer platform",
    "cloud deployment",
    "scalable applications",
    "modern development",
    "enterprise solution",
  ],
  canonical = "/",
  openGraphImage = SEO_CONFIG.DEFAULT_OG_IMAGE,
  noIndex = false,
}: MetadataOptions = {}): Metadata {
  const canonicalUrl = `${SEO_CONFIG.SITE_URL}${canonical}`;

  return {
    metadataBase: new URL(SEO_CONFIG.SITE_URL),
    title: {
      default: title,
      template: `%s | ${SEO_CONFIG.SITE_NAME}`,
    },
    description,
    keywords,
    authors: [{ name: "Holte Team" }],
    creator: "Holte Team",
    publisher: "Holte",
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
      locale: "en_US",
      url: canonicalUrl,
      siteName: SEO_CONFIG.SITE_NAME,
      images: [
        {
          url: openGraphImage,
          width: 1200,
          height: 630,
          alt: SEO_CONFIG.SITE_NAME,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [openGraphImage],
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
      "https://github.com/holte-platform",
      "https://linkedin.com/company/holte-platform",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: "support@holte-platform.com",
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
