"use client";

import Image from "next/image";
import { ChevronDown } from "lucide-react";

export function VideoBannerLocalVariant2() {
  return (
    <section
      id="home"
      data-header-theme="dark"
      className="relative w-full flex items-center justify-center overflow-hidden bg-black"
      style={{ height: "100dvh" }}
    >
      {/* Background glow behind the video */}
      <div className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[50vh] bg-white/10 blur-[120px] rounded-full pointer-events-none" />

      {/* Floating Glowing Frame */}
      <div className="relative w-full h-full md:w-[95vw] md:max-w-[1600px] md:h-[75vh] md:max-h-[700px] md:rounded-3xl md:border md:border-white/20 md:shadow-[0_0_80px_rgba(255,255,255,0.05)] overflow-hidden transition-all duration-700 ease-in-out md:hover:scale-[1.02] md:hover:border-white/40">
        {/* Dark Overlay + Logo */}
        <div className="absolute inset-0 z-20 flex items-center justify-center px-6 bg-black/20">
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
