"use client";

import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";

export function VideoBannerOriginalAnimated() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Kích hoạt hiệu ứng sau khi component render ở client
    const timer = setTimeout(() => {
      setMounted(true);
    }, 100); // delay một chút xíu để chắc chắn hiệu ứng transition được bắt đầu mượt
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      id="home"
      data-header-theme="dark"
      className="relative w-full overflow-hidden bg-black"
      style={{ height: "100dvh" }}
    >
      {/* Dark Overlay + Logo */}
      <div className="absolute inset-0 z-20 flex items-center justify-center px-6">
        <Image
          src="/images/logo-white-slogan.png"
          alt="JOW Film"
          width={400}
          height={200}
          className={`w-[80vw] max-w-[360px] object-contain sm:max-w-[420px] md:max-w-[500px] lg:max-w-[1000px] transition-all duration-[2000ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
          priority
        />
      </div>

      {/* Scroll Indicator */}
      <button
        onClick={() => document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" })}
        className={`absolute bottom-8 left-1/2 z-20 -translate-x-1/2 transition-all duration-1000 delay-1000 ${
          mounted ? "opacity-100 animate-bounce" : "opacity-0"
        }`}
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
        className={`pointer-events-none absolute inset-0 h-full w-full object-cover transition-all duration-[3000ms] ease-out ${
          mounted ? "opacity-50 blur-0 scale-100 md:opacity-100" : "opacity-0 blur-xl scale-110"
        }`}
      >
        <source src="/images/demo/1301_REELS_JOW.mov" type="video/mp4" />
      </video>

      {/* Thêm overlay mờ xíu để video không quá gắt lúc mới lên */}
      <div 
        className={`absolute inset-0 bg-black pointer-events-none transition-opacity duration-[2000ms] ease-out ${
          mounted ? "opacity-20" : "opacity-100"
        }`} 
      />
    </section>
  );
}
