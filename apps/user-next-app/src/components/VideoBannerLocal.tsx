"use client";

import Image from "next/image";
import { ChevronDown } from "lucide-react";

export function VideoBannerLocal() {
  return (
    <section
      id="home"
      data-header-theme="dark"
      className="relative w-full flex items-center justify-center overflow-hidden bg-[#0a0a0a]"
      style={{ height: "100dvh" }}
    >
      {/* Background decoration for desktop */}
      <div className="hidden md:block absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-neutral-800/20 via-[#0a0a0a] to-[#0a0a0a] pointer-events-none" />

      {/* Video Frame Container */}
      <div className="relative w-full h-full md:w-[90vw] md:max-w-[1400px] md:h-[85vh] md:max-h-[800px] md:rounded-xl md:border-[16px] md:border-black md:ring-1 md:ring-white/10 md:shadow-[0_30px_60px_rgba(0,0,0,0.8)] overflow-hidden transition-all duration-700 ease-in-out">
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
