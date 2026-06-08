"use client";

import Image from "next/image";
import { ChevronDown } from "lucide-react";

export function VideoBannerLocalVariant1() {
  return (
    <section
      id="home"
      data-header-theme="dark"
      className="relative w-full flex items-center justify-center overflow-hidden bg-zinc-950"
      style={{ height: "100dvh" }}
    >
      {/* Subtle warm background glow */}
      <div className="hidden md:block absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-zinc-800/30 via-zinc-950 to-zinc-950 pointer-events-none" />

      {/* Gallery White Frame */}
      <div className="relative w-full h-full md:w-[85vw] md:max-w-[1200px] md:h-[80vh] md:max-h-[750px] md:rounded-sm md:border-[20px] md:border-white md:shadow-[0_40px_80px_rgba(0,0,0,0.6)] overflow-hidden transition-all duration-700 ease-in-out">
        {/* Dark Overlay + Logo */}
        <div className="absolute inset-0 z-20 flex items-center justify-center px-6 bg-black/15">
          <Image
            src="/images/logo-white-slogan.png"
            alt="JOW Film"
            width={400}
            height={200}
            className="w-[80vw] max-w-[360px] object-contain sm:max-w-[420px] md:max-w-[500px] lg:max-w-[800px]"
            priority
          />
        </div>

        {/* Local Video Background */}
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="pointer-events-none absolute inset-0 h-full w-full object-cover"
        >
          <source src="/images/demo/1301_REELS_JOW.mov" type="video/mp4" />
        </video>
      </div>

      {/* Scroll Indicator */}
      <button
        onClick={() => document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" })}
        className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2 animate-bounce"
        aria-label="Scroll to about section"
      >
        <ChevronDown className="h-7 w-7 text-white/60 sm:h-8 sm:w-8" />
      </button>
    </section>
  );
}
