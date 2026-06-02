"use client";

import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { BlurFade, BentoGrid, HeroVideoDialog } from "shared-ui";

interface HighlightVideo {
  id: string;
  title: string;
  subtitle: string;
  className: string;
}

const HIGHLIGHT_VIDEOS: HighlightVideo[] = [
  {
    id: "SlQR9iu09bQ",
    title: "Eternal Vows",
    subtitle: "Đà Lạt · Spring 2024",
    className: "col-span-1 md:row-span-2",
  },
  {
    id: "abPmZCZZrFA",
    title: "Golden Hour",
    subtitle: "Hội An · Summer 2024",
    className: "col-span-1 md:row-span-1",
  },
  {
    id: "zoEtcR5EW08",
    title: "Garden of Love",
    subtitle: "Hà Nội · Autumn 2023",
    className: "col-span-1 md:row-span-1",
  },
  {
    id: "LggaymnzDjc",
    title: "Into the Wild",
    subtitle: "Phú Quốc · Winter 2024",
    className: "col-span-1 md:row-span-1",
  },
  {
    id: "psZ1g9fMfeo",
    title: "Blossom",
    subtitle: "Đà Nẵng · Spring 2023",
    className: "col-span-1 md:row-span-2",
  },
  {
    id: "32sYGCOYJUM",
    title: "Midnight Blue",
    subtitle: "TP.HCM · Summer 2023",
    className: "col-span-1 md:row-span-1",
  },
  {
    id: "PdbsnGuduvo",
    title: "Sunset Promise",
    subtitle: "Nha Trang · Winter 2023",
    className: "col-span-1 md:row-span-1",
  },
];

function getYouTubeThumbnail(videoId: string): string {
  return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
}

function getYouTubeEmbedUrl(videoId: string): string {
  return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
}

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

        {/* Bento Grid — Instagram-style staggered layout */}
        <BentoGrid className="auto-rows-[14rem] grid-cols-1 gap-3 [grid-auto-flow:dense] md:grid-cols-3">
          {HIGHLIGHT_VIDEOS.map((video) => (
            <div
              key={video.id}
              className={`group relative overflow-hidden rounded-xl ${video.className}`}
            >
              <HeroVideoDialog
                videoSrc={getYouTubeEmbedUrl(video.id)}
                thumbnailSrc={getYouTubeThumbnail(video.id)}
                thumbnailAlt={video.title}
                animationStyle="from-center"
                className="h-full [&>button]:h-full [&>button]:w-full [&_img]:h-full [&_img]:object-cover [&_img]:rounded-xl [&_img]:border-0 [&_img]:shadow-none [&>button>div]:hidden"
              />
            </div>
          ))}
        </BentoGrid>
      </div>
    </section>
  );
}
