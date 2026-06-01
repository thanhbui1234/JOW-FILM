"use client";

import { useEffect } from "react";
import { X, Facebook, Instagram, Mail } from "lucide-react";

const NAV_ITEMS = [
  { index: "01", label: "About JOW Film", href: "#about" },
  { index: "02", label: "Wedding Highlight", href: "#wedding-highlight" },
  { index: "03", label: "Traditional Film", href: "#traditional-film" },
  { index: "04", label: "Wedding Reels", href: "#wedding-reels" },
  { index: "05", label: "Contact Us", href: "#contact" },
];

interface SlideMenuProps {
  open: boolean;
  onClose: () => void;
}

export function SlideMenu({ open, onClose }: SlideMenuProps) {
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const handleNavClick = (href: string) => {
    onClose();
    setTimeout(() => {
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    }, 350);
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm transition-opacity duration-500 ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <nav
        className={`fixed top-0 left-0 z-[70] flex h-full w-full flex-col bg-stone-950 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] sm:w-[380px]  ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
        aria-label="Main navigation"
      >
        {/* Top bar */}
        <div className="flex items-center justify-between border-b border-stone-800/60 px-8 py-6">
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-400">
            JOW Film
          </span>
          <button
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-stone-700 text-stone-400 transition-all duration-200 hover:border-stone-500 hover:text-white"
            aria-label="Close menu"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Nav links */}
        <ul className="flex flex-1 flex-col justify-center gap-1 px-8">
          {NAV_ITEMS.map((item, i) => (
            <li key={item.href}>
              <button
                onClick={() => handleNavClick(item.href)}
                className="group flex w-full items-center gap-4 rounded-lg px-2 py-4 text-left transition-all duration-200 hover:bg-stone-800/50"
                style={{
                  transitionDelay: open ? `${80 + i * 50}ms` : "0ms",
                  transform: open ? "translateX(0)" : "translateX(-16px)",
                  opacity: open ? 1 : 0,
                  transition: `transform 500ms cubic-bezier(0.25,0.46,0.45,0.94) ${80 + i * 50}ms, opacity 400ms ease ${80 + i * 50}ms, background-color 200ms ease`,
                }}
              >
                {/* Number */}
                <span className="w-7 shrink-0 text-xs tabular-nums text-stone-600 transition-colors duration-200 group-hover:text-amber-500">
                  {item.index}
                </span>

                {/* Label */}
                <span className="text-xl font-light tracking-wide text-stone-200 transition-colors duration-200 group-hover:text-white">
                  {item.label}
                </span>

                {/* Arrow */}
                <svg
                  className="ml-auto h-4 w-4 translate-x-0 text-stone-700 opacity-0 transition-all duration-200 group-hover:translate-x-1 group-hover:text-amber-400 group-hover:opacity-100"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </li>
          ))}
        </ul>

        {/* Bottom — socials + tagline */}
        <div
          className="border-t border-stone-800/60 px-8 py-6"
          style={{
            opacity: open ? 1 : 0,
            transform: open ? "translateY(0)" : "translateY(10px)",
            transition: "opacity 500ms ease 400ms, transform 500ms ease 400ms",
          }}
        >
          <p className="mb-5 text-xs leading-relaxed text-stone-600">
            Crafting timeless wedding films <br />
            across Vietnam.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="text-stone-500 transition-colors duration-200 hover:text-amber-400"
            >
              <Facebook className="h-4 w-4" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-stone-500 transition-colors duration-200 hover:text-amber-400"
            >
              <Instagram className="h-4 w-4" />
            </a>
            <a
              href="mailto:hello@jowfilm.vn"
              aria-label="Email"
              className="text-stone-500 transition-colors duration-200 hover:text-amber-400"
            >
              <Mail className="h-4 w-4" />
            </a>
          </div>
        </div>
      </nav>
    </>
  );
}
