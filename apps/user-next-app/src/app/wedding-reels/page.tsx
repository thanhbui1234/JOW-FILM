import { generateMetadata } from "@/app/metadata";
import { WeddingReelsPage } from "./WeddingReelsPage";

export const metadata = generateMetadata({
  title: "Wedding Reels",
  description:
    "Short-form wedding reels crafted for social media sharing — TikTok, Instagram Reels & Facebook. JOW Film, Vietnam.",
  canonical: "/wedding-reels",
  keywords: [
    "wedding reels",
    "wedding short film",
    "TikTok wedding",
    "Instagram reels wedding",
    "JOW Film reels",
  ],
});

export default function Page() {
  return <WeddingReelsPage />;
}
