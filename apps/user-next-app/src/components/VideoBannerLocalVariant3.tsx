"use client";

import Image from "next/image";
import { ChevronDown } from "lucide-react";

export function VideoBannerLocalVariant3() {
  return (
    <section
      id="home"
      data-header-theme="dark"
      className="relative w-full flex items-center justify-center overflow-hidden bg-[#111111]"
      style={{ height: "100dvh" }}
    >
      {/* Soft Edges Frame */}
      <div className="relative w-full h-full md:w-[80vw] md:max-w-[1100px] md:h-[85vh] md:max-h-[800px] md:rounded-[3rem] md:shadow-2xl overflow-hidden md:ring-[8px] md:ring-white/5 transition-all duration-700 ease-in-out">
        {/* Dark Overlay + Logo */}
        <div className="absolute inset-0 z-20 flex items-center justify-center px-6 bg-black/10">
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
          className="pointer-events-none absolute inset-0 h-full w-full object-cover md:scale-[1.02]"
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
