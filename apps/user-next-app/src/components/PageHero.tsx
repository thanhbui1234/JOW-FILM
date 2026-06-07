"use client";

import Image from "next/image";
import { BlurFade, Highlighter } from "shared-ui";

interface PageHeroProps {
  /** The small label above the title (e.g., "Featured Works") */
  label: string;
  /** The main title — rendered before the highlighted word */
  title: string;
  /** Italic highlighted word(s) appended after the title */
  highlightWord: string;
  /** Short description below the title */
  description: string;
  /** Background image path */
  backgroundImage?: string;
  /** Visual theme: 'dark' for dark bg, 'light' for light bg */
  theme?: "dark" | "light" | "green";
}

export function PageHero({
  label,
  title,
  highlightWord,
  description,
  backgroundImage,
  theme = "dark",
}: PageHeroProps) {
  const highlightColor = theme === "green" ? "#fbbf24" : "#d97706";

  return (
    <section
      data-header-theme="dark"
      className="relative flex items-end overflow-hidden pb-10 pt-28 md:pb-14 md:pt-36"
    >
      {/* Background image */}
      {backgroundImage && (
        <Image
          src={backgroundImage}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      )}

      {/* Fallback gradient when no image */}
      {!backgroundImage && (
        <div
          className={`absolute inset-0 ${
            theme === "green"
              ? "bg-gradient-to-b from-[#1a231a] via-[#293629] to-[#293629]"
              : theme === "light"
                ? "bg-gradient-to-b from-stone-800 to-stone-900"
                : "bg-gradient-to-b from-stone-900 to-stone-950"
          }`}
        />
      )}

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/55" />

      {/* Grain texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 md:px-16 lg:px-24">
        <BlurFade delay={0.05} inView>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-amber-400">
            {label}
          </p>
        </BlurFade>

        <BlurFade delay={0.15} inView>
          <h1
            className="text-4xl font-light tracking-wide text-white md:text-6xl lg:text-7xl"
          >
            {title}{" "}
            <Highlighter
              action="underline"
              color={highlightColor}
              strokeWidth={2}
              animationDuration={800}
              isView
            >
              <em className="not-italic font-normal italic">
                {highlightWord}
              </em>
            </Highlighter>
          </h1>
        </BlurFade>

        <BlurFade delay={0.25} inView>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-white/60">
            {description}
          </p>
        </BlurFade>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/30 to-transparent" />
    </section>
  );
}
