"use client";

import Image from "next/image";
import { ChevronDown } from "lucide-react";
import type { BannerConfig } from "@/types/content";

const DEFAULTS: BannerConfig = {
  videoSrc: "/images/demo/1301_REELS_JOW.mov",
  logoSrc: "/images/logo-white-slogan.png",
  scrollTargetId: "about",
};

export function VideoBanner(props: Partial<BannerConfig>) {
  const { videoSrc, logoSrc, scrollTargetId } = { ...DEFAULTS, ...props };

  return (
    <section
      id="home"
      data-header-theme="dark"
      className="relative w-full overflow-hidden"
      style={{ height: "100dvh" }}
    >
      <div className="absolute inset-0 z-20 flex items-center justify-center px-6">
        <Image
          src={logoSrc}
          alt="JOW Film"
          width={400}
          height={200}
          className="w-[80vw] max-w-[360px] object-contain sm:max-w-[420px] md:max-w-[500px] lg:max-w-[1000px]"
          priority
        />
      </div>

      <button
        onClick={() => document.querySelector(`#${scrollTargetId}`)?.scrollIntoView({ behavior: "smooth" })}
        className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2 animate-bounce"
        aria-label="Scroll to about section"
      >
        <ChevronDown className="h-7 w-7 text-white/60 sm:h-8 sm:w-8" />
      </button>

      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover"
      >
        <source src={videoSrc} type="video/mp4" />
      </video>
    </section>
  );
}
