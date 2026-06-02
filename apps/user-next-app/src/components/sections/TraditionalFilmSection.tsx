"use client";

import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { BlurFade, Skeleton } from "shared-ui";

const FILMS = [
  {
    title: "Cưới Truyền Thống",
    subtitle: "Hà Nội · 2024",
    description:
      "Lễ cưới truyền thống với nghi thức gia lễ trang nghiêm, tà áo dài đỏ thắm và những khoảnh khắc gia đình sum họp ấm áp.",
    tags: ["Áo dài", "Lễ gia tiên", "Family"],
    imageLabel: "Traditional ceremony",
  },
  {
    title: "Hương Vị Quê Hương",
    subtitle: "Huế · 2023",
    description:
      "Đám cưới cố đô mang đậm hồn Huế — từ bộ khăn áo cung đình đến không gian sân vườn cổ kính rêu phong.",
    tags: ["Áo ngũ thân", "Huế cổ", "Heritage"],
    imageLabel: "Royal Hue style",
  },
  {
    title: "Nam Bộ Rực Rỡ",
    subtitle: "Cần Thơ · 2024",
    description:
      "Nét đẹp miền Tây với đám cưới trên sông, hoa súng nở rộ và những chiếc xuồng trang trí rực rỡ sắc màu.",
    tags: ["Mekong", "Riverside", "Traditional"],
    imageLabel: "Mekong Delta wedding",
  },
];

export function TraditionalFilmSection() {
  const [headerRef, headerVisible] = useScrollAnimation({ threshold: 0.1 });

  return (
    <section
      id="traditional-film"
      data-header-theme="dark"
      className="min-h-screen bg-amber-950 px-6 py-24 md:px-16 lg:px-24"
    >
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div
          ref={headerRef as React.RefObject<HTMLDivElement>}
          className="mb-20 text-center"
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
            <h2 className="text-5xl font-light tracking-wide text-amber-50 md:text-6xl">
              Traditional <em className="font-extralight italic">Film</em>
            </h2>
          </BlurFade>
        </div>

        {/* Alternating rows */}
        <div className="flex flex-col gap-20">
          {FILMS.map((film, index) => {
            const isEven = index % 2 === 0;
            return (
              <TraditionalFilmRow
                key={film.title}
                film={film}
                imageLeft={!isEven}
                delay={0}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}

interface TraditionalFilmRowProps {
  film: (typeof FILMS)[number];
  imageLeft: boolean;
  delay: number;
}

function TraditionalFilmRow({ film, imageLeft }: TraditionalFilmRowProps) {
  const [textRef, textVisible] = useScrollAnimation({ threshold: 0.15 });
  const [imgRef, imgVisible] = useScrollAnimation({ threshold: 0.15 });

  const textContent = (
    <div
      ref={textRef as React.RefObject<HTMLDivElement>}
      className="flex flex-col justify-center"
      style={{
        transform: textVisible
          ? "translateX(0)"
          : `translateX(${imageLeft ? "60px" : "-60px"})`,
        opacity: textVisible ? 1 : 0,
        transition:
          "transform 800ms cubic-bezier(0.25,0.46,0.45,0.94), opacity 800ms ease",
      }}
    >
      <BlurFade delay={0.05} inView>
        <p className="mb-3 text-xs uppercase tracking-[0.3em] text-amber-500">
          {film.subtitle}
        </p>
      </BlurFade>
      <BlurFade delay={0.15} inView>
        <h3 className="mb-5 text-3xl font-light text-amber-50 md:text-4xl">
          {film.title}
        </h3>
      </BlurFade>
      <BlurFade delay={0.25} inView>
        <p className="mb-7 text-sm leading-relaxed text-amber-200/70">
          {film.description}
        </p>
      </BlurFade>
      <BlurFade delay={0.35} inView>
        <div className="flex flex-wrap gap-2">
          {film.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-amber-700/50 px-3 py-1 text-xs uppercase tracking-wider text-amber-400"
            >
              {tag}
            </span>
          ))}
        </div>
      </BlurFade>
    </div>
  );

  const imageContent = (
    <div
      ref={imgRef as React.RefObject<HTMLDivElement>}
      className="relative h-72 overflow-hidden rounded-2xl text-amber-800 md:h-96"
      style={{
        transform: imgVisible
          ? "translateX(0)"
          : `translateX(${imageLeft ? "-60px" : "60px"})`,
        opacity: imgVisible ? 1 : 0,
        transition:
          "transform 800ms cubic-bezier(0.25,0.46,0.45,0.94) 150ms, opacity 800ms ease 150ms",
      }}
    >
      <Skeleton className="absolute inset-0 rounded-2xl" />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-amber-800/60">
        <svg
          className="h-14 w-14"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={0.8}
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
        <span className="text-xs uppercase tracking-widest">{film.imageLabel}</span>
      </div>
    </div>
  );

  return (
    <div className="grid items-center gap-10 md:grid-cols-2">
      {imageLeft ? imageContent : textContent}
      {imageLeft ? textContent : imageContent}
    </div>
  );
}
