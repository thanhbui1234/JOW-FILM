"use client";

import Image from "next/image";
import { ChevronDown } from "lucide-react";

export function VideoBanner() {
  return (
    <section
      id="home"
      data-header-theme="dark"
      className="relative w-full overflow-hidden"
      style={{ height: "100dvh" }}
    >
      {/* YouTube Background Video */}
      <div className="absolute inset-0">
        <iframe
          src="https://www.youtube.com/embed/9kzE8isXlQY?autoplay=1&mute=1&loop=1&playlist=9kzE8isXlQY&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1"
          title="Background video"
          allow="autoplay; encrypted-media"
          style={{
            border: 0,
            position: "absolute",
            /*
             * Cover trick for iframes (no object-fit support):
             * On landscape (wide): make width = 100%, height auto from aspect ratio → too short, so override height to 100% and let width overflow.
             * On portrait (tall): 16:9 means width = height * (16/9).
             * We set both dimensions to cover using the "padding-box" technique via inline calc.
             * Simpler reliable approach: always use a size that overflows in both axes.
             */
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            /* Ensure video covers regardless of orientation:
               - minWidth covers landscape: video height ≥ 100vh → width ≥ 100vw automatically
               - minHeight covers portrait: video width ≥ 100vw → height ≥ 56.25vw, but we need ≥ 100vh
               We use the larger of the two: max(100vw, 177.78vh) × max(100vh, 56.25vw) */
            width: "max(100vw, 177.78dvh)",
            height: "max(100dvh, 56.25vw)",
            pointerEvents: "none",
          }}
        />
      </div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Logo */}
      <div className="absolute inset-0 flex items-center justify-center px-6">
        <Image
          src="/images/Logo_Logo_trắng_có slogan.png"
          alt="JOW Film"
          width={400}
          height={200}
          className="w-[70vw] max-w-[300px] object-contain sm:max-w-[320px] md:max-w-[380px] lg:max-w-[440px]"
          priority
        />
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ChevronDown className="h-7 w-7 text-white/60 sm:h-8 sm:w-8" />
      </div>
    </section>
  );
}
