import { generateMetadata } from "@/app/metadata";
import { TraditionalFilmPage } from "./TraditionalFilmPage";

export const metadata = generateMetadata({
  title: "Traditional Films",
  description:
    "Full-length traditional wedding films capturing every moment — from morning preparations to the final farewell. JOW Film, Vietnam.",
  canonical: "/traditional-film",
  keywords: [
    "traditional wedding film",
    "phim cưới truyền thống",
    "full wedding film",
    "JOW Film traditional",
    "lễ gia tiên",
  ],
});

export default function Page() {
  return <TraditionalFilmPage />;
}
