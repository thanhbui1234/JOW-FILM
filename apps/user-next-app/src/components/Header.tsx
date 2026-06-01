"use client";

import { useState } from "react";
import { Facebook, Instagram, Mail, Menu } from "lucide-react";
import { SlideMenu } from "./SlideMenu";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-5 md:px-10">
        <button
          onClick={() => setMenuOpen(true)}
          className="flex items-center gap-2 text-white transition-opacity hover:opacity-70"
          aria-label="Open menu"
        >
          <Menu className="h-6 w-6" />
          <span className="text-sm font-medium tracking-widest uppercase">
            Menu
          </span>
        </button>

        <div className="flex items-center gap-4">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white transition-opacity hover:opacity-70"
            aria-label="Facebook"
          >
            <Facebook className="h-5 w-5" />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white transition-opacity hover:opacity-70"
            aria-label="Instagram"
          >
            <Instagram className="h-5 w-5" />
          </a>
          <a
            href="mailto:contact@holte-platform.com"
            className="text-white transition-opacity hover:opacity-70"
            aria-label="Email"
          >
            <Mail className="h-5 w-5" />
          </a>
        </div>
      </header>

      <SlideMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
