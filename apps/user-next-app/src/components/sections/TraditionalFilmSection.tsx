"use client";

import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { BlurFade, Highlighter } from "shared-ui";
import Image from "next/image";

interface FilmItem {
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  image: string;
}

const FILMS: FilmItem[] = [
  {
    title: "Cưới Truyền Thống",
    subtitle: "Hà Nội · 2024",
    description:
      "Nghi thức gia lễ trang nghiêm, tà áo dài đỏ thắm và khoảnh khắc sum họp ấm áp.",
    tags: ["Áo dài", "Lễ gia tiên", "Family"],
    image: "/images/demo/a7.jpg",
  },
  {
    title: "Hương Vị Quê Hương",
    subtitle: "Huế · 2023",
    description:
      "Hồn Huế cổ kính — khăn áo cung đình, sân vườn rêu phong và nét duyên dáng ngàn năm.",
    tags: ["Áo ngũ thân", "Huế cổ", "Heritage"],
    image: "/images/demo/a8.jpg",
  },
  {
    title: "Nam Bộ Rực Rỡ",
    subtitle: "Cần Thơ · 2024",
    description:
      "Nét đẹp miền Tây — đám cưới trên sông, hoa súng nở rộ và sắc màu rực rỡ.",
    tags: ["Mekong", "Riverside", "Traditional"],
    image: "/images/demo/a9.jpg",
  },
];

export function TraditionalFilmSection() {
  const [headerRef, headerVisible] = useScrollAnimation({ threshold: 0.1 });

  return (
    <section
      id="traditional-film"
      data-header-theme="dark"
      className="bg-amber-950 px-6 py-20 md:px-16 md:py-24 lg:px-24"
    >
      <div className="mx-auto max-w-6xl">
        {/* Header — sans + serif combo */}
        <div
          ref={headerRef as React.RefObject<HTMLDivElement>}
          className="mb-14 text-center md:mb-16"
          style={{
            transform: headerVisible ? "translateY(0)" : "translateY(-40px)",
            opacity: headerVisible ? 1 : 0,
            transition:
              "transform 700ms cubic-bezier(0.25,0.46,0.45,0.94), opacity 700ms ease",
          }}
        >
          <BlurFade delay={0.05} inView>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-amber-400">
              Heritage &amp; Culture
            </p>
          </BlurFade>
          <BlurFade delay={0.15} inView>
            <h2
              className="text-5xl font-light tracking-wide text-amber-50 md:text-7xl"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Traditional{" "}
              <Highlighter
                action="underline"
                color="#fbbf24"
                strokeWidth={2}
                animationDuration={800}
                isView
              >
                <em className="not-italic font-normal italic">Film</em>
              </Highlighter>
            </h2>
          </BlurFade>
          <BlurFade delay={0.25} inView>
            <p className="mx-auto mt-5 max-w-lg text-sm leading-relaxed text-amber-200/60">
              Gìn giữ nét đẹp truyền thống qua từng thước phim — nơi văn hoá
              hoà quyện cùng cảm xúc.
            </p>
          </BlurFade>
        </div>

        {/* Compact 3-column card grid */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FILMS.map((film, index) => (
            <TraditionalFilmCard
              key={film.title}
              film={film}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

interface TraditionalFilmCardProps {
  film: FilmItem;
  delay: number;
}

function TraditionalFilmCard({ film, delay }: TraditionalFilmCardProps) {
  const [cardRef, cardVisible] = useScrollAnimation({ threshold: 0.15 });

  return (
    <div
      ref={cardRef as React.RefObject<HTMLDivElement>}
      className="group relative overflow-hidden rounded-2xl"
      style={{
        transform: cardVisible ? "translateY(0)" : "translateY(40px)",
        opacity: cardVisible ? 1 : 0,
        transition: `transform 800ms cubic-bezier(0.25,0.46,0.45,0.94) ${delay * 1000}ms, opacity 800ms ease ${delay * 1000}ms`,
      }}
    >
      {/* Image */}
      <div className="relative aspect-[3/4] overflow-hidden sm:aspect-[4/5]">
        <Image
          src={film.image}
          alt={film.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          loading="lazy"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      </div>

      {/* Content overlay */}
      <div className="absolute inset-x-0 bottom-0 flex flex-col p-5 sm:p-6">
        <BlurFade delay={delay + 0.05} inView>
          <p className="mb-1.5 text-[10px] uppercase tracking-[0.25em] text-amber-400/80">
            {film.subtitle}
          </p>
        </BlurFade>
        <BlurFade delay={delay + 0.1} inView>
          <h3
            className="mb-2 text-xl font-light text-amber-50 sm:text-2xl"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 500,
            }}
          >
            {film.title}
          </h3>
        </BlurFade>
        <BlurFade delay={delay + 0.15} inView>
          <p className="mb-3 text-xs leading-relaxed text-amber-100/50 line-clamp-2">
            {film.description}
          </p>
        </BlurFade>
        <BlurFade delay={delay + 0.2} inView>
          <div className="flex flex-wrap gap-1.5">
            {film.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-amber-600/30 bg-amber-900/30 px-2.5 py-0.5 text-[10px] uppercase tracking-wider text-amber-300/80 backdrop-blur-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </BlurFade>
      </div>
    </div>
  );
}
