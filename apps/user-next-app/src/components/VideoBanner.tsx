"use client";

import Image from "next/image";
import { ChevronDown } from "lucide-react";

export function VideoBanner() {
  const videoId = "9kzE8isXlQY";

  const playerVars = [
    "autoplay=1",
    "mute=1",
    "controls=0",
    "showinfo=0",
    "rel=0",
    "loop=1",
    `playlist=${videoId}`,
    "modestbranding=1",
    "iv_load_policy=3",
    "disablekb=1",
    "playsinline=1",
  ].join("&");

  return (
    <section
      id="home"
      data-header-theme="dark"
      className="relative w-full overflow-hidden"
      style={{ height: "100dvh" }}
    >
      {/* Interaction blocker — prevents hover/click from triggering YT controls */}
      <div className="pointer-events-auto absolute inset-0 z-10 bg-transparent" />

      {/* Dark Overlay + Logo */}
      <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/40 px-6">
        <Image
          src="/images/logo-dark-slogan.png"
          alt="JOW Film"
          width={800}
          height={200}
          className="w-[92vw] max-w-[600px] object-contain sm:max-w-[700px] md:max-w-[850px] lg:max-w-[1000px]"
          priority
        />
      </div>

      {/* Scroll Indicator */}
      <button
        onClick={() => document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" })}
        className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2 animate-bounce"
        aria-label="Scroll to about section"
      >
        <ChevronDown className="h-7 w-7 text-white/60 sm:h-8 sm:w-8" />
      </button>

      {/* YouTube Background */}
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?${playerVars}`}
        title="Background video"
        allow="autoplay; encrypted-media"
        className="pointer-events-none absolute top-1/2 left-1/2 h-[56.25vw] min-h-[100dvh] w-[100vw] min-w-[177.78dvh] -translate-x-1/2 -translate-y-1/2 scale-105"
        style={{ border: 0 }}
      />
    </section>
  );
}
