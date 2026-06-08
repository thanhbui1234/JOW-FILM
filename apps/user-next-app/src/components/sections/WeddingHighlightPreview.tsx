"use client";

import Link from "next/link";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import {
  HIGHLIGHT_VIDEOS,
  getYouTubeThumbnail,
  getYouTubeEmbedUrl,
} from "@/data/videos";
import { BlurFade, HeroVideoDialog, Highlighter } from "shared-ui";
import { ArrowRight } from "lucide-react";

/** Show first 4 videos as a compact preview on the home page */
const PREVIEW_VIDEOS = HIGHLIGHT_VIDEOS.slice(0, 4);

export function WeddingHighlightPreview() {
  const [headerRef, headerVisible] = useScrollAnimation({ threshold: 0.1 });

  return (
    <section
      id="wedding-highlight"
      data-header-theme="light"
      className="bg-stone-50 px-5 py-20 dark:bg-stone-900"
    >
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div
          ref={headerRef as React.RefObject<HTMLDivElement>}
          className="mb-12 px-5 md:mb-16 md:px-12 lg:px-24"
          style={{
            transform: headerVisible ? "translateY(0)" : "translateY(-30px)",
            opacity: headerVisible ? 1 : 0,
            transition:
              "transform 700ms cubic-bezier(0.25,0.46,0.45,0.94), opacity 700ms ease",
          }}
        >
          <BlurFade delay={0.05} inView>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-amber-400 dark:text-amber-400">
              Featured Works
            </p>
          </BlurFade>
          <BlurFade delay={0.15} inView>
            <h2
              className="font-title text-5xl font-light tracking-wide text-stone-900 md:text-7xl dark:text-stone-100"
            >
              Wedding{" "}
              <Highlighter
                action="underline"
                color="#d97706"
                strokeWidth={2}
                animationDuration={800}
                isView
              >
                <em className="not-italic font-normal italic">Highlights</em>
              </Highlighter>
            </h2>
          </BlurFade>
          <BlurFade delay={0.25} inView>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-stone-500 dark:text-stone-400">
              Your love story, distilled into a cinematic masterpiece
            </p>
          </BlurFade>
        </div>

        {/* Grid — 2 cols on mobile, 4 cols on desktop */}
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          {PREVIEW_VIDEOS.map((video, index) => (
            <BlurFade key={video.id} delay={0.1 + index * 0.08} inView>
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

        {/* View All link */}
        <BlurFade delay={0.5} inView>
          <div className="mt-10 flex justify-center">
            <Link
              href="/wedding-highlight"
              className="group inline-flex items-center gap-2 rounded-full border border-stone-300 px-6 py-3 text-sm font-medium uppercase tracking-widest text-stone-700 transition-all duration-300 hover:border-amber-500 hover:bg-amber-500 hover:text-stone-900 dark:border-stone-600 dark:text-stone-300 dark:hover:border-amber-500 dark:hover:bg-amber-500 dark:hover:text-stone-900"
            >
              View All
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
