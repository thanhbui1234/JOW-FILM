import dynamic from "next/dynamic";
import { Header } from "@/components/Header";
import { VideoBannerLocal } from "@/components/VideoBannerLocal";
import { AboutSection } from "@/components/sections/AboutSection";
import { generateMetadata } from "./metadata";

const OverviewSection = dynamic(
  () => import("@/components/sections/OverviewSection").then((m) => m.OverviewSection),
  { ssr: true }
);
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
const ContactSection = dynamic(
  () => import("@/components/sections/ContactSection").then((m) => m.ContactSection),
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
      <Header />
      <VideoBannerLocal />
      <AboutSection />
      {/* <OverviewSection /> */}
      <WeddingHighlightSection />
      <WeddingReelsSection />
      <TraditionalFilmSection />
      <ContactSection />
    </main>
  );
}
