"use client";

import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const ABOUT_STATS = [
  { value: "200+", label: "Wedding Films" },
  { value: "5+", label: "Years Experience" },
  { value: "98%", label: "Happy Couples" },
];

export function AboutSection() {
  const [titleRef, titleVisible] = useScrollAnimation({ threshold: 0.1 });
  const [imageRef, imageVisible] = useScrollAnimation({ threshold: 0.1 });

  return (
    <section
      id="about"
      className="relative min-h-screen overflow-hidden bg-stone-950 px-6 py-24 md:px-16 lg:px-24"
    >
      {/* Decorative grain overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-16 lg:grid-cols-2">
        {/* Left — Text */}
        <div
          ref={titleRef as React.RefObject<HTMLDivElement>}
          style={{
            transform: titleVisible ? "translateX(0)" : "translateX(-60px)",
            opacity: titleVisible ? 1 : 0,
            transition: "transform 800ms cubic-bezier(0.25,0.46,0.45,0.94), opacity 800ms ease",
          }}
        >
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-amber-400">
            Giới thiệu team
          </p>
          <h2 className="mb-8 text-4xl font-light leading-snug tracking-wide text-white md:text-5xl">
            At JOW Film, we go beyond{" "}
            <em className="font-extralight italic text-amber-300">filming.</em>
          </h2>
          <p className="mb-6 text-base leading-relaxed text-stone-400">
            We translate your love story into a cinematic masterpiece. Driven by
            our three core pillars:{" "}
            <span className="font-medium text-stone-200">Dedication</span>,{" "}
            <span className="font-medium text-stone-200">Creativity</span>, and{" "}
            <span className="font-medium text-stone-200">Authenticity</span>, we
            strive to preserve your most precious moments as a timeless{" "}
            <span className="italic text-amber-300">&ldquo;Legacy of Love.&rdquo;</span>
          </p>
          <p className="mb-10 text-base leading-relaxed text-stone-400">
            By harmonizing cutting-edge technology with sophisticated artistry,
            we create unique works of art that truly reflect your personality and
            the profound essence of your journey together.
          </p>

          {/* Author */}
          <div className="mb-10 flex items-center gap-3">
            <div className="h-px w-8 bg-amber-400" />
            <span className="text-sm font-light italic tracking-wider text-amber-300">
              Hồng Mai — Founder, JOW Film
            </span>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 border-t border-stone-800 pt-10">
            {ABOUT_STATS.map((stat, i) => (
              <div
                key={stat.label}
                style={{
                  transform: titleVisible
                    ? "translateY(0)"
                    : "translateY(30px)",
                  opacity: titleVisible ? 1 : 0,
                  transition: `transform 700ms cubic-bezier(0.25,0.46,0.45,0.94) ${200 + i * 100}ms, opacity 700ms ease ${200 + i * 100}ms`,
                }}
              >
                <p className="text-3xl font-light text-amber-300">{stat.value}</p>
                <p className="mt-1 text-xs uppercase tracking-widest text-stone-500">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Right — Image placeholder grid */}
        <div
          ref={imageRef as React.RefObject<HTMLDivElement>}
          className="grid grid-cols-2 gap-3"
          style={{
            transform: imageVisible ? "translateX(0)" : "translateX(60px)",
            opacity: imageVisible ? 1 : 0,
            transition: "transform 800ms cubic-bezier(0.25,0.46,0.45,0.94) 150ms, opacity 800ms ease 150ms",
          }}
        >
          {/* Large placeholder */}
          <div className="relative col-span-2 h-64 overflow-hidden rounded-xl bg-stone-800">
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-stone-600">
              <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 10l4.553-2.069A1 1 0 0121 8.87v6.26a1 1 0 01-1.447.894L15 14M4 8h11a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1V9a1 1 0 011-1z" />
              </svg>
              <span className="text-xs tracking-widest uppercase">Behind the lens</span>
            </div>
          </div>
          {/* Two small placeholders */}
          {["Studio life", "On location"].map((label) => (
            <div
              key={label}
              className="relative h-36 overflow-hidden rounded-xl bg-stone-800"
            >
              <div className="absolute inset-0 flex items-end p-3">
                <span className="text-xs uppercase tracking-wider text-stone-600">
                  {label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
