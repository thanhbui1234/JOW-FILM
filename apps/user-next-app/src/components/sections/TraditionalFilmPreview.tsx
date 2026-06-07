"use client";

import Link from "next/link";
import Image from "next/image";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { FILMS } from "@/data/videos";
import { BlurFade, Highlighter } from "shared-ui";
import { ArrowRight } from "lucide-react";

/** Show first 2 films as a compact preview */
const PREVIEW_FILMS = FILMS.slice(0, 2);

export function TraditionalFilmPreview() {
  const [headerRef, headerVisible] = useScrollAnimation({ threshold: 0.1 });

  return (
    <section
      id="traditional-film"
      data-header-theme="dark"
      className="bg-[#293629] px-6 py-20 md:px-16 md:py-24 lg:px-24"
    >
      <div className="mx-auto max-w-6xl">
        {/* Header */}
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
            >
              <Highlighter
                action="underline"
                color="#fbbf24"
                strokeWidth={2}
                animationDuration={800}
                isView
              >
                Traditional{" "}
                <em className="not-italic font-normal italic">Film</em>
              </Highlighter>
            </h2>
          </BlurFade>
          <BlurFade delay={0.25} inView>
            <p className="mx-auto mt-5 max-w-lg text-sm leading-relaxed text-amber-200/60">
              A long-form wedding film that follows the complete timeline of
              your wedding day.
            </p>
          </BlurFade>
        </div>

        {/* 2-column preview grid */}
        <div className="grid gap-5 sm:grid-cols-2">
          {PREVIEW_FILMS.map((film, index) => (
            <BlurFade key={film.title} delay={0.1 + index * 0.12} inView>
              <div className="group relative overflow-hidden rounded-2xl">
                <div className="relative aspect-[3/4] overflow-hidden sm:aspect-[4/5]">
                  <Image
                    src={film.image}
                    alt={film.title}
                    fill
                    sizes="(max-width: 640px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                </div>
                <div className="absolute inset-x-0 bottom-0 flex flex-col p-5 sm:p-6">
                  <p className="mb-1.5 text-[10px] uppercase tracking-[0.25em] text-amber-400/80">
                    {film.subtitle}
                  </p>
                  <h3
                    className="mb-2 text-xl font-light text-amber-50 sm:text-2xl"
                    style={{
                      fontWeight: 500,
                    }}
                  >
                    {film.title}
                  </h3>
                  <p className="mb-3 text-xs leading-relaxed text-amber-100/50 line-clamp-2">
                    {film.description}
                  </p>
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
                </div>
              </div>
            </BlurFade>
          ))}
        </div>

        {/* View All link */}
        <BlurFade delay={0.4} inView>
          <div className="mt-10 flex justify-center">
            <Link
              href="/traditional-film"
              className="group inline-flex items-center gap-2 rounded-full border border-amber-600/40 px-6 py-3 text-sm font-medium uppercase tracking-widest text-amber-200 transition-all duration-300 hover:border-amber-400 hover:bg-amber-400 hover:text-stone-900"
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
