"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { BlurFade, HeroVideoDialog } from "shared-ui";

interface HighlightVideo {
  id: string;
  title: string;
  subtitle: string;
}

const HIGHLIGHT_VIDEOS: HighlightVideo[] = [
  {
    id: "SlQR9iu09bQ",
    title: "Eternal Vows",
    subtitle: "Đà Lạt · Spring 2024",
  },
  {
    id: "abPmZCZZrFA",
    title: "Golden Hour",
    subtitle: "Hội An · Summer 2024",
  },
  {
    id: "zoEtcR5EW08",
    title: "Garden of Love",
    subtitle: "Hà Nội · Autumn 2023",
  },
  {
    id: "LggaymnzDjc",
    title: "Into the Wild",
    subtitle: "Phú Quốc · Winter 2024",
  },
  {
    id: "psZ1g9fMfeo",
    title: "Blossom",
    subtitle: "Đà Nẵng · Spring 2023",
  },
  {
    id: "32sYGCOYJUM",
    title: "Midnight Blue",
    subtitle: "TP.HCM · Summer 2023",
  },
];

function getYouTubeThumbnail(videoId: string): string {
  return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
}

function getYouTubeEmbedUrl(videoId: string): string {
  return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
}

export function WeddingHighlightSection() {
  const [headerRef, headerVisible] = useScrollAnimation({ threshold: 0.1 });

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
      slidesToScroll: 1,
    },
    [Autoplay({ delay: 1500, stopOnInteraction: false, stopOnMouseEnter: true })]
  );

  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleVideoOpenChange = useCallback((open: boolean) => {
    if (!emblaApi) return;
    const autoplay = emblaApi.plugins().autoplay;
    if (!autoplay) return;
    if (open) {
      autoplay.stop();
    } else {
      autoplay.play();
    }
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    return () => { emblaApi.off("select", onSelect); };
  }, [emblaApi, onSelect]);

  return (
    <section
      id="wedding-highlight"
      data-header-theme="light"
      className="min-h-screen bg-stone-50 px-5 py-20 md:px-12 lg:px-24 dark:bg-stone-900"
    >
      <div className="mx-auto max-w-7xl">
        <div
          ref={headerRef as React.RefObject<HTMLDivElement>}
          className="mb-12 md:mb-16"
          style={{
            transform: headerVisible ? "translateY(0)" : "translateY(-30px)",
            opacity: headerVisible ? 1 : 0,
            transition:
              "transform 700ms cubic-bezier(0.25,0.46,0.45,0.94), opacity 700ms ease",
          }}
        >
          <BlurFade delay={0.05} inView>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-amber-600 dark:text-amber-400">
              Featured Works
            </p>
          </BlurFade>
          <BlurFade delay={0.15} inView>
            <h2 className="text-4xl font-light tracking-wide text-stone-900 md:text-6xl dark:text-stone-100">
              Wedding{" "}
              <em className="font-extralight italic">Highlight</em>
            </h2>
          </BlurFade>
          <BlurFade delay={0.25} inView>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-stone-500 dark:text-stone-400">
              Each film is a chapter of a love story — crafted with care, told
              with emotion.
            </p>
          </BlurFade>
        </div>

        {/* Desktop: Embla Carousel */}
        <div className="hidden md:block">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-4">
              {HIGHLIGHT_VIDEOS.map((video) => (
                <div
                  key={video.id}
                  className="relative min-w-0 flex-[0_0_42%] lg:flex-[0_0_38%]"
                >
                  <div className="group relative overflow-hidden rounded-2xl">
                    <HeroVideoDialog
                      videoSrc={getYouTubeEmbedUrl(video.id)}
                      thumbnailSrc={getYouTubeThumbnail(video.id)}
                      thumbnailAlt={video.title}
                      animationStyle="from-center"
                      onOpenChange={handleVideoOpenChange}
                      className="[&>button]:w-full [&_img]:aspect-video [&_img]:w-full [&_img]:object-cover [&_img]:rounded-2xl [&_img]:border-0 [&_img]:shadow-none"
                    />
                    <div className="pointer-events-none absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-5">
                      <h3 className="text-base font-medium text-white lg:text-lg">
                        {video.title}
                      </h3>
                      <p className="text-sm text-white/70">{video.subtitle}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots */}
          <div className="mt-6 flex justify-center gap-2">
            {HIGHLIGHT_VIDEOS.map((_, index) => (
              <button
                key={index}
                aria-label={`Go to slide ${index + 1}`}
                onClick={() => emblaApi?.scrollTo(index)}
                className={`h-1.5 rounded-full transition-all duration-300 ${index === selectedIndex
                  ? "w-6 bg-amber-500"
                  : "w-1.5 bg-stone-300 dark:bg-stone-600"
                  }`}
              />
            ))}
          </div>
        </div>

        {/* Mobile: Grid fallback */}
        <div className="grid grid-cols-2 gap-3 md:hidden">
          {HIGHLIGHT_VIDEOS.map((video, index) => (
            <BlurFade key={video.id} delay={0.3 + index * 0.08} inView>
              <div className="group relative overflow-hidden rounded-xl">
                <HeroVideoDialog
                  videoSrc={getYouTubeEmbedUrl(video.id)}
                  thumbnailSrc={getYouTubeThumbnail(video.id)}
                  thumbnailAlt={video.title}
                  animationStyle="from-center"
                  className="[&>button]:w-full [&_img]:aspect-[4/5] [&_img]:w-full [&_img]:object-cover [&_img]:rounded-xl [&_img]:border-0 [&_img]:shadow-none [&>button>div]:scale-75 [&>button>div_div:first-child]:size-16 [&>button>div_div:first-child_div]:size-10 [&>button>div_div:first-child_div_svg]:size-5"
                />
                <div className="pointer-events-none absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                  <h3 className="text-sm font-medium text-white">
                    {video.title}
                  </h3>
                  <p className="text-xs text-white/60">{video.subtitle}</p>
                </div>
              </div>
            </BlurFade>
          ))}
        </div>
      </div>
    </section>
  );
}
