import { Header } from "@/components/Header";
import { VideoBanner } from "@/components/VideoBanner";
import { AboutSection } from "@/components/sections/AboutSection";
import { OverviewSection } from "@/components/sections/OverviewSection";
import { WeddingHighlightSection } from "@/components/sections/WeddingHighlightSection";
import { TraditionalFilmSection } from "@/components/sections/TraditionalFilmSection";
import { WeddingReelsSection } from "@/components/sections/WeddingReelsSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { generateMetadata } from "./metadata";

export const metadata = generateMetadata({
  title: "Home",
  description:
    "JOW Film — A cinematic wedding film studio. Discover our portfolio of timeless love stories.",
  canonical: "/",
});

export default function Home() {
  return (
    <main>
      <Header />
      <VideoBanner />
      <AboutSection />
      <OverviewSection />
      <WeddingHighlightSection />
      <TraditionalFilmSection />
      <WeddingReelsSection />
      <ContactSection />
    </main>
  );
}
