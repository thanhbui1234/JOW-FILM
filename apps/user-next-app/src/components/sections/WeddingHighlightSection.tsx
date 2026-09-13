"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { BlurFade, Highlighter } from "shared-ui";
import { VideoLinkThumbnail } from "@/components/ui/VideoLinkThumbnail";
import type { HighlightVideo } from "@/types/content";
import { getThemeFromBgColor } from "@/lib/theme";

const DEFAULT_VIDEOS: HighlightVideo[] = [
  { id: "SlQR9iu09bQ", title: "Eternal Vows", subtitle: "Đà Lạt · Spring 2024" },
  { id: "abPmZCZZrFA", title: "Golden Hour", subtitle: "Hội An · Summer 2024" },
  { id: "zoEtcR5EW08", title: "Garden of Love", subtitle: "Hà Nội · Autumn 2023" },
  { id: "LggaymnzDjc", title: "Into the Wild", subtitle: "Phú Quốc · Winter 2024" },
  { id: "psZ1g9fMfeo", title: "Blossom", subtitle: "Đà Nẵng · Spring 2023" },
  { id: "32sYGCOYJUM", title: "Midnight Blue", subtitle: "TP.HCM · Summer 2023" },
];

function getYouTubeThumbnail(videoId: string): string {
  return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
}

interface WeddingHighlightSectionProps {
  videos?: HighlightVideo[];
  backgroundColor?: string;
  eyebrow?: string;
  eyebrowColor?: string;
  titlePrefix?: string;
  titlePrefixColor?: string;
  titleHighlight?: string;
  titleHighlightColor?: string;
  description?: string;
  descriptionColor?: string;
}

export function WeddingHighlightSection({
  videos = DEFAULT_VIDEOS,
  backgroundColor,
  eyebrow = "Featured Works",
  eyebrowColor,
  titlePrefix = "Wedding",
  titlePrefixColor,
  titleHighlight = "Highlights",
  titleHighlightColor,
  description = "Your love story, distilled into a cinematic masterpiece",
  descriptionColor,
}: WeddingHighlightSectionProps) {
  const [headerRef, headerVisible] = useScrollAnimation({ threshold: 0.1 });
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const isPausedRef = useRef(false);
  const totalSlides = videos.length;

  useEffect(() => {
    isPausedRef.current = isPaused;
  }, [isPaused]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isPausedRef.current) {
        setActiveIndex((prev) => (prev + 1) % totalSlides);
      }
    }, 1500);
    return () => clearInterval(interval);
  }, [totalSlides]);

  const goTo = (index: number) => {
    setActiveIndex(((index % totalSlides) + totalSlides) % totalSlides);
  };

  const getDiff = (index: number) => {
    let diff = index - activeIndex;
    if (diff > totalSlides / 2) diff -= totalSlides;
    if (diff < -totalSlides / 2) diff += totalSlides;
    return diff;
  };

  const touchStartXRef = useRef<number | null>(null);
  const touchStartYRef = useRef<number | null>(null);
  const isSwipingRef = useRef(false);

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsPaused(true);
    touchStartXRef.current = e.touches[0].clientX;
    touchStartYRef.current = e.touches[0].clientY;
    isSwipingRef.current = false;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null || touchStartYRef.current === null) return;
    const deltaX = e.touches[0].clientX - touchStartXRef.current;
    const deltaY = e.touches[0].clientY - touchStartYRef.current;
    if (Math.abs(deltaX) > 10 && Math.abs(deltaX) > Math.abs(deltaY)) {
      isSwipingRef.current = true;
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    setIsPaused(false);
    if (touchStartXRef.current === null || touchStartYRef.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartXRef.current;
    const deltaY = e.changedTouches[0].clientY - touchStartYRef.current;

    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 40) {
      if (deltaX < 0) {
        goTo(activeIndex + 1);
      } else {
        goTo(activeIndex - 1);
      }
    }
    touchStartXRef.current = null;
    touchStartYRef.current = null;
    setTimeout(() => {
      isSwipingRef.current = false;
    }, 100);
  };

  const handleTouchCancel = () => {
    setIsPaused(false);
    touchStartXRef.current = null;
    touchStartYRef.current = null;
    isSwipingRef.current = false;
  };

  return (
    <section
      id="wedding-highlight"
      data-header-theme={getThemeFromBgColor(backgroundColor, "light")}
      className="overflow-x-clip bg-stone-50 px-5 pt-12 pb-10 md:pt-16 md:pb-14 lg:pt-20 lg:pb-16 dark:bg-stone-900"
      style={{ backgroundColor: backgroundColor || undefined }}
    >
      <div className="mx-auto max-w-7xl">
        <div
          ref={headerRef as React.RefObject<HTMLDivElement>}
          className="mb-12 px-5 md:mb-16 md:px-12 lg:px-24"
          style={{
            transform: headerVisible ? "translateY(0)" : "translateY(-30px)",
            opacity: headerVisible ? 1 : 0,
            transition: "transform 700ms cubic-bezier(0.25,0.46,0.45,0.94), opacity 700ms ease",
          }}
        >
          <BlurFade delay={0.05} inView>
            <p
              className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-amber-400 dark:text-amber-400"
              style={eyebrowColor ? { color: eyebrowColor } : undefined}
            >
              {eyebrow}
            </p>
          </BlurFade>
          <BlurFade delay={0.15} inView>
            <Link href="/wedding-highlight">
              <h2 className="font-title text-5xl font-light tracking-wide text-stone-900 md:text-7xl dark:text-stone-100">
                <span style={titlePrefixColor ? { color: titlePrefixColor } : undefined}>{titlePrefix}</span>{" "}
                <Highlighter action="underline" color="#ffb900" strokeWidth={2} animationDuration={800} isView>
                  <em
                    className="not-italic font-normal italic"
                    style={titleHighlightColor ? { color: titleHighlightColor } : undefined}
                  >{titleHighlight}</em>
                </Highlighter>
              </h2>
            </Link>
          </BlurFade>
          <BlurFade delay={0.25} inView>
            <div
              className="mt-4 max-w-md text-sm leading-relaxed text-stone-500 dark:text-stone-400 [&_p]:mb-2 last:[&_p]:mb-0"
              style={descriptionColor ? { color: descriptionColor } : undefined}
              dangerouslySetInnerHTML={{ __html: description }}
            />
          </BlurFade>
        </div>

        {/* 1 column responsive slider running across all screens */}
        <div
          className="relative mx-auto w-full max-w-[900px]"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onTouchCancel={handleTouchCancel}
        >
          <div
            className="relative mx-auto w-full aspect-[16/10] max-h-[560px] [--slide-offset:20px] sm:[--slide-offset:70px] md:[--slide-offset:140px]"
          >
            {videos.map((video, index) => {
              const diff = getDiff(index);
              const absDiff = Math.abs(diff);
              const scale = 1 - absDiff * 0.05;
              const zIndex = 20 - Math.round(absDiff * 5);
              const rotate = diff * -1.5;

              return (
                <div
                  key={video.id}
                  className="absolute inset-0 flex items-center justify-center"
                  style={{ zIndex, pointerEvents: absDiff < 0.5 ? "auto" : "none" }}
                >
                  <div
                    className="group relative w-full overflow-hidden rounded-xl sm:rounded-2xl shadow-xl sm:shadow-2xl"
                    style={{
                      transform: `translateX(calc(${diff} * var(--slide-offset, 140px))) scale(${scale}) rotate(${rotate}deg)`,
                      opacity: absDiff > 2.5 ? 0 : 1,
                      transition: "transform 0.6s cubic-bezier(0.25,0.46,0.45,0.94), opacity 0.4s ease",
                    }}
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                    onClickCapture={(e) => {
                      if (isSwipingRef.current) {
                        e.preventDefault();
                        e.stopPropagation();
                      }
                    }}
                  >
                    <VideoLinkThumbnail
                      href="/wedding-highlight"
                      thumbnailSrc={getYouTubeThumbnail(video.id)}
                      thumbnailAlt={video.title}
                      imgClassName="aspect-[16/10] rounded-xl sm:rounded-2xl"
                      playButtonSize="compact-responsive"
                    />
                    <div
                      className="pointer-events-none absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent p-4 sm:p-6 md:p-8"
                      style={{ opacity: absDiff < 0.5 ? 1 : 0, transition: "opacity 0.4s ease" }}
                    >
                      <h3 className="text-base font-medium text-white sm:text-lg lg:text-2xl">{video.title}</h3>
                      <p className="text-xs text-white/70 sm:text-sm">{video.subtitle}</p>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Navigation buttons */}
            <button
              onClick={() => goTo(activeIndex - 1)}
              className="absolute left-2 md:left-4 top-1/2 z-30 -translate-y-1/2 flex h-8 w-8 md:h-10 md:w-10 items-center justify-center rounded-full bg-white/80 shadow-lg backdrop-blur-sm transition-transform hover:scale-110 active:scale-95 dark:bg-stone-800/80"
              aria-label="Previous slide"
            >
              <svg className="h-4 w-4 md:h-5 md:w-5 text-stone-700 dark:text-stone-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => goTo(activeIndex + 1)}
              className="absolute right-2 md:right-4 top-1/2 z-30 -translate-y-1/2 flex h-8 w-8 md:h-10 md:w-10 items-center justify-center rounded-full bg-white/80 shadow-lg backdrop-blur-sm transition-transform hover:scale-110 active:scale-95 dark:bg-stone-800/80"
              aria-label="Next slide"
            >
              <svg className="h-4 w-4 md:h-5 md:w-5 text-stone-700 dark:text-stone-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Dots pagination */}
          <div className="mt-6 md:mt-8 flex justify-center gap-2">
            {videos.map((_, index) => (
              <button
                key={index}
                aria-label={`Go to slide ${index + 1}`}
                onClick={() => goTo(index)}
                className={`h-1.5 rounded-full transition-all duration-500 ${index === activeIndex ? "w-6 md:w-8 bg-amber-500" : "w-1.5 bg-stone-300 dark:bg-stone-600"}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
