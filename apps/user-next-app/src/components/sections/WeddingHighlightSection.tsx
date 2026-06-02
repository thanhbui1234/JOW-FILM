"use client";

import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { BlurFade, Skeleton } from "shared-ui";

const HIGHLIGHT_ITEMS = [
  {
    title: "Eternal Vows",
    subtitle: "Đà Lạt · Spring 2024",
    aspect: "aspect-[4/5]",
  },
  {
    title: "Golden Hour",
    subtitle: "Hội An · Summer 2024",
    aspect: "aspect-[4/5]",
  },
  {
    title: "Garden of Love",
    subtitle: "Hà Nội · Autumn 2023",
    aspect: "aspect-[4/3]",
  },
  {
    title: "Into the Wild",
    subtitle: "Phú Quốc · Winter 2024",
    aspect: "aspect-[4/3]",
  },
  {
    title: "Blossom",
    subtitle: "Đà Nẵng · Spring 2023",
    aspect: "aspect-[4/5]",
  },
  {
    title: "Midnight Blue",
    subtitle: "TP.HCM · Summer 2023",
    aspect: "aspect-[4/5]",
  },
];

export function WeddingHighlightSection() {
  const [headerRef, headerVisible] = useScrollAnimation({ threshold: 0.1 });

  return (
    <section
      id="wedding-highlight"
      data-header-theme="light"
      className="min-h-screen bg-stone-100 px-6 py-24 md:px-16 lg:px-24 dark:bg-stone-900"
    >
      <div className="mx-auto max-w-6xl">
        {/* Section header */}
        <div
          ref={headerRef as React.RefObject<HTMLDivElement>}
          className="mb-16 flex items-end justify-between"
          style={{
            transform: headerVisible ? "translateY(0)" : "translateY(-40px)",
            opacity: headerVisible ? 1 : 0,
            transition:
              "transform 700ms cubic-bezier(0.25,0.46,0.45,0.94), opacity 700ms ease",
          }}
        >
          <div>
            <BlurFade delay={0.05} inView>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-amber-600 dark:text-amber-400">
                Featured Works
              </p>
            </BlurFade>
            <BlurFade delay={0.15} inView>
              <h2 className="text-5xl font-light tracking-wide text-stone-900 md:text-6xl dark:text-stone-100">
                Wedding <br />
                <em className="font-extralight italic">Highlight</em>
              </h2>
            </BlurFade>
          </div>
          <BlurFade delay={0.25} inView>
            <p className="hidden max-w-xs text-right text-sm leading-relaxed text-stone-500 md:block dark:text-stone-400">
              Each film is a chapter of a love story — crafted with care, told
              with emotion.
            </p>
          </BlurFade>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          {HIGHLIGHT_ITEMS.map((item, index) => {
            const fromLeft = index % 2 === 0;
            return (
              <HighlightCard
                key={item.title}
                item={item}
                fromLeft={fromLeft}
                delay={index * 80}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}

interface HighlightCardProps {
  item: (typeof HIGHLIGHT_ITEMS)[number];
  fromLeft: boolean;
  delay: number;
}

function HighlightCard({ item, fromLeft, delay }: HighlightCardProps) {
  const [ref, visible] = useScrollAnimation({ threshold: 0.1 });

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className="group relative overflow-hidden rounded-xl text-stone-300"
      style={{
        aspectRatio: item.aspect.includes("4/5") ? "4/5" : "4/3",
        transform: visible
          ? "translate(0, 0)"
          : `translate(${fromLeft ? "-50px" : "50px"}, 20px)`,
        opacity: visible ? 1 : 0,
        transition: `transform 700ms cubic-bezier(0.25,0.46,0.45,0.94) ${delay}ms, opacity 700ms ease ${delay}ms`,
      }}
    >
      {/* Skeleton background */}
      <Skeleton className="absolute inset-0 rounded-none" variant="rectangular" />

      {/* Placeholder icon */}
      <div className="absolute inset-0 flex items-center justify-center">
        <svg
          className="h-12 w-12 text-stone-400/60"
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
      </div>

      {/* Hover overlay */}
      <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/70 via-transparent to-transparent p-5 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <h3 className="text-lg font-light text-white">{item.title}</h3>
        <p className="mt-1 text-xs uppercase tracking-widest text-stone-300">
          {item.subtitle}
        </p>
        {/* Play icon */}
        <div className="mt-3 flex h-10 w-10 items-center justify-center rounded-full border border-white/50 backdrop-blur-sm">
          <svg className="h-4 w-4 translate-x-0.5 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </div>
    </div>
  );
}
