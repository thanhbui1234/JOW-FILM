import dynamic from "next/dynamic";
import { VideoBannerLocal } from "@/components/VideoBannerLocal";
import { VideoBannerLocalVariant1 } from "@/components/VideoBannerLocalVariant1";
import { VideoBannerLocalVariant2 } from "@/components/VideoBannerLocalVariant2";
import { VideoBannerLocalVariant3 } from "@/components/VideoBannerLocalVariant3";
import { AboutSection } from "@/components/sections/AboutSection";
import { generateMetadata } from "./metadata";
import { VideoBannerOriginal } from "@/components/VideoBannerOriginal";
import { VideoBannerOriginalAnimated } from "@/components/VideoBannerOriginalAnimated";
const WeddingHighlightSection = dynamic(
  () => import("@/components/sections/WeddingHighlightSection").then((m) => m.WeddingHighlightSection),
  { ssr: true }
);
const TraditionalFilmSection = dynamic(
  () => import("@/components/sections/TraditionalFilmSection").then((m) => m.TraditionalFilmSection),
  { ssr: true }
);
const WeddingReelsSection = dynamic(
  () => import("@/components/sections/WeddingReelsSection").then((m) => m.WeddingReelsSection),
  { ssr: true }
);
const ContactPreview = dynamic(
  () => import("@/components/sections/ContactPreview").then((m) => m.ContactPreview),
  { ssr: true }
);

export const metadata = generateMetadata({
  title: "JOW Film",
  description:
    "JOW Film — A cinematic wedding film studio. Discover our portfolio of timeless love stories.",
  canonical: "/",
});

export default function Home() {
  return (
    <main>
      <VideoBannerLocal />
      <VideoBannerLocalVariant1 />
      <VideoBannerLocalVariant2 />
      <VideoBannerLocalVariant3 />
      {/* <VideoBannerOriginal /> */}
      <VideoBannerOriginalAnimated />

      <AboutSection />
      <WeddingHighlightSection />
      <WeddingReelsSection />
      <TraditionalFilmSection />
      <ContactPreview />
    </main>
  );
}
