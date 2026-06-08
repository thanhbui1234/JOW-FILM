"use client";

import { useEffect } from "react";
import { PageTitleBar } from "@/components/PageTitleBar";
import { FILMS, getYouTubeEmbedUrl } from "@/data/videos";
import { BlurFade } from "shared-ui";
import { ChevronDown } from "lucide-react";

export function TraditionalFilmPage() {
  // Scroll to anchor on mount (e.g. /traditional-film#film-1)
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      // Small delay to let the page render
      setTimeout(() => {
        const el = document.querySelector(hash);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 300);
    }
  }, []);

  const handleScrollDown = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };

  return (
    <main>
      {/* First viewport — title + description + first video + scroll chevron */}
      <div className="relative flex min-h-screen flex-col">
        <PageTitleBar
          label="Heritage & Culture"
          title="Traditional"
          highlightWord="Films"
        />


        {/* First video */}
        <section
          data-header-theme="light"
          className="flex-1 bg-white px-5 pt-5 md:px-12 md:pt-6 lg:px-20 dark:bg-stone-950"
        >
          <div className="mx-auto max-w-5xl">
            <BlurFade delay={0.05} inView>
              <FilmCard film={FILMS[0]} index={0} />
            </BlurFade>
          </div>
        </section>

        {/* Scroll chevron at bottom of 100vh */}
        <div className="bg-white pb-5 dark:bg-stone-950">
          <button
            onClick={handleScrollDown}
            className="mx-auto flex items-center justify-center text-stone-300 transition-colors hover:text-amber-600 dark:text-stone-700 dark:hover:text-amber-400"
            aria-label="Scroll to more films"
          >
            <ChevronDown className="h-6 w-6 animate-bounce" />
          </button>
        </div>
      </div>

      {/* Remaining videos */}
      {FILMS.length > 1 && (
        <section
          data-header-theme="light"
          className="bg-white px-5 pb-16 md:px-12 md:pb-20 lg:px-20 dark:bg-stone-950"
        >
          <div className="mx-auto max-w-5xl">
            <div className="flex flex-col">
              {FILMS.slice(1).map((film, index) => (
                <div key={film.id + (index + 1)}>
                  {/* Divider */}
                  <div className="my-12 flex items-center gap-4 md:my-16">
                    <span className="h-px flex-1 bg-stone-200 dark:bg-stone-800" />
                    <span className="text-[10px] uppercase tracking-widest text-stone-300 dark:text-stone-700">
                      {String(index + 2).padStart(2, "0")} /{" "}
                      {String(FILMS.length).padStart(2, "0")}
                    </span>
                    <span className="h-px flex-1 bg-stone-200 dark:bg-stone-800" />
                  </div>

                  <BlurFade delay={0.05} inView>
                    <FilmCard film={film} index={index + 1} />
                  </BlurFade>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}

interface FilmCardProps {
  film: (typeof FILMS)[number];
  index: number;
}

function FilmCard({ film, index }: FilmCardProps) {
  return (
    <article id={`film-${index}`} className="scroll-mt-24">
      <div className="relative w-full overflow-hidden rounded-xl shadow-lg md:rounded-2xl">
        <div className="relative aspect-video">
          <iframe
            src={getYouTubeEmbedUrl(film.id).replace("?autoplay=1", "")}
            title={film.title}
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            loading="lazy"
            className="absolute inset-0 h-full w-full border-0"
          />
        </div>
      </div>

      <div className="mt-4 md:mt-5">
        <p className="text-[10px] uppercase tracking-[0.25em] text-amber-600 dark:text-amber-400">
          {film.subtitle}
        </p>
        <h3
          className="mt-1.5 text-xl font-medium tracking-wide text-stone-900 md:text-2xl dark:text-stone-100"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          {film.title}
        </h3>
        <p className="mt-2 max-w-xl text-sm leading-relaxed text-stone-500 dark:text-stone-400">
          {film.description}
        </p>
        <div className="mt-2.5 flex flex-wrap gap-1.5">
          {film.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-stone-200 px-3 py-1 text-[10px] uppercase tracking-wider text-stone-500 dark:border-stone-700 dark:text-stone-400"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}
