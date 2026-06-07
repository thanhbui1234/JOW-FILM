"use client";

import Link from "next/link";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { REELS } from "@/data/videos";
import { BlurFade, Highlighter, Skeleton } from "shared-ui";
import { ArrowRight } from "lucide-react";

/** Show first 4 reels as preview */
const PREVIEW_REELS = REELS.slice(0, 4);

export function WeddingReelsPreview() {
  const [headerRef, headerVisible] = useScrollAnimation({ threshold: 0.1 });

  return (
    <section
      id="wedding-reels"
      data-header-theme="dark"
      className="overflow-hidden bg-stone-950 px-6 py-24"
    >
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div
          ref={headerRef as React.RefObject<HTMLDivElement>}
          className="mb-12"
          style={{
            transform: headerVisible ? "translateY(0)" : "translateY(-40px)",
            opacity: headerVisible ? 1 : 0,
            transition:
              "transform 700ms cubic-bezier(0.25,0.46,0.45,0.94), opacity 700ms ease",
          }}
        >
          <BlurFade delay={0.05} inView>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-amber-400">
              Short Films
            </p>
          </BlurFade>
          <BlurFade delay={0.15} inView>
            <h2
              className="text-5xl font-light tracking-wide text-white md:text-7xl"
            >
              Wedding{" "}
              <Highlighter
                action="underline"
                color="#fbbf24"
                strokeWidth={2}
                animationDuration={800}
                isView
              >
                <em className="not-italic font-normal italic">Reels</em>
              </Highlighter>
            </h2>
          </BlurFade>
          <BlurFade delay={0.25} inView>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-stone-400">
              Short-form wedding content crafted for effortless sharing across
              social media
            </p>
          </BlurFade>
        </div>

        {/* Horizontal scroll — 4 reel cards */}
        <div
          className="flex gap-4 overflow-x-auto pb-4"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {PREVIEW_REELS.map((reel, index) => (
            <BlurFade key={reel.title} delay={0.1 + index * 0.06} inView>
              <div
                className="group relative flex-shrink-0 cursor-pointer overflow-hidden rounded-2xl text-stone-700"
                style={{ width: "220px", aspectRatio: "9/16" }}
              >
                {/* Skeleton background */}
                <Skeleton className="absolute inset-0 rounded-2xl" />

                {/* Placeholder icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg
                    className="h-10 w-10 text-stone-600/60"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={0.8}
                      d="M15 10l4.553-2.069A1 1 0 0121 8.87v6.26a1 1 0 01-1.447.894L15 14M4 8h11a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1V9a1 1 0 011-1z"
                    />
                  </svg>
                </div>

                {/* Bottom info */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 to-transparent p-4">
                  <p className="text-xs uppercase tracking-widest text-stone-400">
                    {reel.location}
                  </p>
                  <p className="mt-1 text-sm font-light text-white">
                    {reel.title}
                  </p>
                </div>

                {/* Duration badge */}
                <div className="absolute right-3 top-3 rounded-full bg-black/50 px-2 py-0.5 text-xs text-stone-300 backdrop-blur-sm">
                  {reel.duration}
                </div>

                {/* Play button on hover */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
                    <svg
                      className="h-6 w-6 translate-x-0.5 text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </div>
            </BlurFade>
          ))}
        </div>

        {/* View All link */}
        <BlurFade delay={0.5} inView>
          <div className="mt-10 flex justify-center">
            <Link
              href="/wedding-reels"
              className="group inline-flex items-center gap-2 rounded-full border border-stone-700 px-6 py-3 text-sm font-medium uppercase tracking-widest text-stone-300 transition-all duration-300 hover:border-amber-400 hover:bg-amber-400 hover:text-stone-900"
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
