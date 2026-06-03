"use client";

import Image from "next/image";
import { ChevronDown } from "lucide-react";

export function VideoBannerLocal() {
  return (
    <section
      id="home"
      data-header-theme="dark"
      className="relative w-full overflow-hidden"
      style={{ height: "100dvh" }}
    >
      {/* Dark Overlay + Logo */}
      <div className="absolute inset-0 z-20 flex items-center justify-center  px-6">
        <Image
          src="/images/logo-dark-slogan.png"
          alt="JOW Film"
          width={400}
          height={200}
          className="w-[80vw] max-w-[360px] object-contain sm:max-w-[420px] md:max-w-[500px] lg:max-w-[580px]"
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

      {/* Local Video Background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover"
      >
        <source src="/images/demo/tôi_muốn_tạo_video_banner_we.mp4" type="video/mp4" />
      </video>
    </section>
  );
}
