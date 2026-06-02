"use client";

import { useEffect, useState, useCallback } from "react";
import { Facebook, Instagram, Mail, Menu } from "lucide-react";
import { SlideMenu } from "./SlideMenu";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isDarkSection, setIsDarkSection] = useState(true);

  const updateTheme = useCallback(() => {
    const headerBottom = 70;
    const sections = document.querySelectorAll("[data-header-theme]");

    for (let i = sections.length - 1; i >= 0; i--) {
      const rect = sections[i].getBoundingClientRect();
      if (rect.top <= headerBottom) {
        const theme = sections[i].getAttribute("data-header-theme");
        setIsDarkSection(theme === "dark");
        break;
      }
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
      updateTheme();
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [updateTheme]);

  const textColor = isDarkSection
    ? "text-white"
    : "text-stone-900 dark:text-white";

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-5 md:px-10">
        {/* Left: Menu button */}
        <button
          onClick={() => setMenuOpen(true)}
          className={`flex items-center gap-2 transition-colors duration-500 hover:opacity-70 ${textColor}`}
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
          <span className="text-xs font-medium tracking-[0.2em] uppercase">
            Menu
          </span>
        </button>

        {/* Center: Logo — appears on scroll */}
        <div
          className={`absolute left-1/2 -translate-x-1/2 transition-all duration-700 ease-out ${
            scrolled
              ? "translate-y-0 opacity-100"
              : "-translate-y-2 opacity-0 pointer-events-none"
          }`}
        >
          <span
            className={`text-sm font-light tracking-[0.35em] uppercase transition-colors duration-500 ${textColor}`}
          >
            JOW Film
          </span>
        </div>

        {/* Right: Social icons */}
        <div className="flex items-center gap-4">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className={`transition-colors duration-500 hover:opacity-70 ${textColor}`}
            aria-label="Facebook"
          >
            <Facebook className="h-4 w-4" />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className={`transition-colors duration-500 hover:opacity-70 ${textColor}`}
            aria-label="Instagram"
          >
            <Instagram className="h-4 w-4" />
          </a>
          <a
            href="mailto:hello@jowfilm.vn"
            className={`transition-colors duration-500 hover:opacity-70 ${textColor}`}
            aria-label="Email"
          >
            <Mail className="h-4 w-4" />
          </a>
        </div>
      </header>

      <SlideMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
