"use client";

import Image from "next/image";
import { PageTitleBar } from "@/components/PageTitleBar";
import { FILMS } from "@/data/videos";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { BlurFade } from "shared-ui";

export function TraditionalFilmPage() {
  return (
    <main>
      <PageTitleBar
        label="Heritage & Culture"
        title="Traditional"
        highlightWord="Film"
      />

      <section
        data-header-theme="dark"
        className="bg-[#293629] px-6 py-10 md:px-16 md:py-14 lg:px-24"
      >
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {FILMS.map((film, index) => (
              <TraditionalFilmCard
                key={film.title}
                film={film}
                delay={index * 0.1}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

interface TraditionalFilmCardProps {
  film: (typeof FILMS)[number];
  delay: number;
}

function TraditionalFilmCard({ film, delay }: TraditionalFilmCardProps) {
  const [cardRef, cardVisible] = useScrollAnimation({ threshold: 0.15 });

  return (
    <div
      ref={cardRef as React.RefObject<HTMLDivElement>}
      className="group relative overflow-hidden rounded-2xl"
      style={{
        transform: cardVisible ? "translateY(0)" : "translateY(40px)",
        opacity: cardVisible ? 1 : 0,
        transition: `transform 800ms cubic-bezier(0.25,0.46,0.45,0.94) ${delay * 1000}ms, opacity 800ms ease ${delay * 1000}ms`,
      }}
    >
      <div className="relative aspect-[3/4] overflow-hidden sm:aspect-[4/5]">
        <Image
          src={film.image}
          alt={film.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      </div>

      <div className="absolute inset-x-0 bottom-0 flex flex-col p-5 sm:p-6">
        <BlurFade delay={delay + 0.05} inView>
          <p className="mb-1.5 text-[10px] uppercase tracking-[0.25em] text-amber-400/80">
            {film.subtitle}
          </p>
        </BlurFade>
        <BlurFade delay={delay + 0.1} inView>
          <h3
            className="mb-2 text-xl font-light text-amber-50 sm:text-2xl"
            style={{
              fontWeight: 500,
            }}
          >
            {film.title}
          </h3>
        </BlurFade>
        <BlurFade delay={delay + 0.15} inView>
          <p className="mb-3 text-xs leading-relaxed text-amber-100/50 line-clamp-2">
            {film.description}
          </p>
        </BlurFade>
        <BlurFade delay={delay + 0.2} inView>
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
        </BlurFade>
      </div>
    </div>
  );
}
