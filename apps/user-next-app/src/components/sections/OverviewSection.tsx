"use client";

import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { BlurFade, Highlighter } from "shared-ui";
import Image from "next/image";

const OVERVIEW_ITEMS = [
  {
    index: "01",
    title: "Wedding Highlights",
    subtitle: "Your love story, condensed into a cinematic masterpiece.",
    description:
      "Thường là bản dựng từ 3–5 phút, chắt lọc những khoảnh khắc đặt giá và cảm xúc nhất của buổi lễ.",
    href: "#wedding-highlight",
    image: "/images/demo/a4.jpg",
  },
  {
    index: "02",
    title: "Traditional Films",
    subtitle: "Preserving every precious second of your big day.",
    description:
      "Bản dựng đầy đủ, trình bày chi tiết toàn bộ quá trình diễn ra lễ cưới theo trình tự thời gian.",
    href: "#traditional-film",
    image: "/images/demo/a5.jpg",
  },
  {
    index: "03",
    title: "Wedding Reels",
    subtitle: "Trendy moments for your social media.",
    description:
      "Các clip ngắn đình dạng dọc, được tối ưu hóa để chia sẻ trên TikTok, Facebook Reels hoặc Instagram.",
    href: "#wedding-reels",
    image: "/images/demo/a6.jpg",
  },
];

export function OverviewSection() {
  const [headerRef, headerVisible] = useScrollAnimation({ threshold: 0.1 });

  return (
    <section
      id="overview"
      data-header-theme="light"
      className="bg-stone-50 px-6 py-24 md:px-16 lg:px-24 dark:bg-stone-900"
    >
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div
          ref={headerRef as React.RefObject<HTMLDivElement>}
          className="mb-16 border-b border-stone-200 pb-10 dark:border-stone-700"
          style={{
            transform: headerVisible ? "translateY(0)" : "translateY(-30px)",
            opacity: headerVisible ? 1 : 0,
            transition:
              "transform 700ms cubic-bezier(0.25,0.46,0.45,0.94), opacity 700ms ease",
          }}
        >
          <BlurFade delay={0.05} inView>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-amber-400 dark:text-amber-400">
              Our Services
            </p>
          </BlurFade>
          <BlurFade delay={0.15} inView>
            <h2
              className="font-title text-5xl font-light tracking-wide text-stone-900 md:text-6xl dark:text-stone-100"
            >
              What we{" "}
              <Highlighter action="underline" color="#ffb900" strokeWidth={2} animationDuration={800} isView>
                <em className="not-italic font-normal italic">offer</em>
              </Highlighter>
            </h2>
          </BlurFade>
        </div>

        {/* Items */}
        <div className="divide-y divide-stone-200 dark:divide-stone-700">
          {OVERVIEW_ITEMS.map((item, index) => (
            <OverviewRow key={item.index} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

interface OverviewRowProps {
  item: (typeof OVERVIEW_ITEMS)[number];
  index: number;
}

function OverviewRow({ item, index }: OverviewRowProps) {
  const [ref, visible] = useScrollAnimation({ threshold: 0.15 });

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className="group grid cursor-pointer items-center gap-8 py-10 transition-colors duration-300 hover:bg-stone-100 md:grid-cols-[80px_1fr_auto_280px] md:gap-10 md:px-4 dark:hover:bg-stone-800"
      style={{
        transform: visible ? "translateX(0)" : "translateX(-40px)",
        opacity: visible ? 1 : 0,
        transition: `transform 700ms cubic-bezier(0.25,0.46,0.45,0.94) ${index * 120}ms, opacity 700ms ease ${index * 120}ms`,
      }}
      onClick={() => {
        const el = document.querySelector(item.href);
        el?.scrollIntoView({ behavior: "smooth" });
      }}
    >
      {/* Number */}
      <BlurFade delay={0.05 + index * 0.1} inView>
        <span className="hidden text-sm font-light tabular-nums text-stone-400 md:block dark:text-stone-500">
          {item.index}
        </span>
      </BlurFade>

      {/* Text */}
      <div>
        <BlurFade delay={0.1 + index * 0.1} inView>
          <h3 className="mb-1 text-2xl font-light tracking-wide text-stone-900 transition-colors duration-200 group-hover:text-amber-700 md:text-3xl dark:text-stone-100 dark:group-hover:text-amber-400">
            {item.title}
          </h3>
        </BlurFade>
        <BlurFade delay={0.18 + index * 0.1} inView>
          <p className="mb-2 text-sm font-medium italic text-stone-600 dark:text-stone-400">
            {item.subtitle}
          </p>
        </BlurFade>
        <BlurFade delay={0.24 + index * 0.1} inView>
          <p className="max-w-md text-sm leading-relaxed text-stone-500 dark:text-stone-400">
            {item.description}
          </p>
        </BlurFade>

        {/* View all link */}
        <div className="mt-4 flex items-center gap-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <span className="text-xs font-semibold uppercase tracking-widest text-amber-400 dark:text-amber-400">
            View all
          </span>
          <svg
            className="h-3.5 w-3.5 translate-x-0 text-amber-400 transition-transform duration-200 group-hover:translate-x-1 dark:text-amber-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      </div>

      {/* Divider line */}
      <div className="hidden h-px w-12 bg-stone-300 transition-colors duration-300 group-hover:bg-amber-400 md:block dark:bg-stone-600" />

      {/* Thumbnail */}
      <div className="relative h-44 overflow-hidden rounded-xl md:h-36">
        <Image
          src={item.image}
          alt={item.title}
          fill
          sizes="(max-width: 768px) 100vw, 280px"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/10 transition-colors duration-300 group-hover:bg-black/20" />

        {/* Hover play overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/80 shadow-md backdrop-blur-sm">
            <svg
              className="h-4 w-4 translate-x-0.5 text-stone-900"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
