import { generateMetadata } from "@/app/metadata";
import { WeddingHighlightPage } from "./WeddingHighlightPage";

export const metadata = generateMetadata({
  title: "Wedding Highlights",
  description:
    "Watch our cinematic wedding highlight films — your love story distilled into a 3–5 minute masterpiece. JOW Film, Vietnam.",
  canonical: "/wedding-highlight",
  keywords: [
    "wedding highlight",
    "wedding highlight film",
    "phim cưới highlight",
    "JOW Film highlight",
    "cinematic wedding",
  ],
});

export default function Page() {
  return <WeddingHighlightPage />;
}
