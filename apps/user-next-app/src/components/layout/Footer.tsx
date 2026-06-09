import Image from "next/image";
import Link from "next/link";
import { Facebook, Instagram, Youtube, Phone, Mail, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-stone-200 bg-stone-50 px-5 py-12 md:px-12 md:py-16 lg:px-24 dark:border-stone-800 dark:bg-stone-950">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 md:grid-cols-3 md:gap-8">
          {/* Logo + tagline */}
          <div className="flex flex-col items-center md:items-start">
            <Link href="/" aria-label="JOW Film Home">
              <Image
                src="/images/logo-dark.png"
                alt="JOW Film"
                width={120}
                height={40}
                className="mb-4 h-10 w-auto dark:hidden"
              />
              <Image
                src="/images/logo-white.png"
                alt="JOW Film"
                width={120}
                height={40}
                className="mb-4 hidden h-10 w-auto dark:block"
              />
            </Link>
            <p className="text-center text-sm leading-relaxed text-stone-500 md:text-left dark:text-stone-400">
              Cinematic wedding films that tell your love story with artistry
              and emotion.
            </p>
          </div>

          {/* Contact info */}
          <div className="flex flex-col items-center gap-3 md:items-start">
            <h4 className="mb-1 text-xs font-semibold uppercase tracking-[0.2em] text-stone-700 dark:text-stone-300">
              Get in Touch
            </h4>
            <a
              href="tel:+84944229875"
              className="font-title flex items-center gap-2.5 text-sm text-stone-500 transition-colors hover:text-amber-600 dark:text-stone-400 dark:hover:text-amber-400"
            >
              <Phone className="h-4 w-4" />
              0944 229 875
            </a>
            <a
              href="mailto:jowfilm.vn@gmail.com"
              className="font-title flex items-center gap-2.5 text-sm text-stone-500 transition-colors hover:text-amber-600 dark:text-stone-400 dark:hover:text-amber-400"
            >
              <Mail className="h-4 w-4" />
              jowfilm.vn@gmail.com
            </a>
            <div className="font-title flex items-center gap-2.5 text-sm text-stone-500 dark:text-stone-400">
              <MapPin className="h-4 w-4 flex-shrink-0" />
              Ha Noi, Viet Nam
            </div>
          </div>

          {/* Social */}
          <div className="flex flex-col items-center md:items-end">
            <h4 className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-stone-700 dark:text-stone-300">
              Follow Us
            </h4>
            <div className="flex items-center gap-3">
              <a
                href="https://www.facebook.com/profile.php?id=61556675978184"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-stone-300 text-stone-500 transition-all hover:border-amber-500 hover:text-amber-600 dark:border-stone-700 dark:text-stone-400 dark:hover:border-amber-500 dark:hover:text-amber-400"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href="https://www.instagram.com/jow_film"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-stone-300 text-stone-500 transition-all hover:border-amber-500 hover:text-amber-600 dark:border-stone-700 dark:text-stone-400 dark:hover:border-amber-500 dark:hover:text-amber-400"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-stone-300 text-stone-500 transition-all hover:border-amber-500 hover:text-amber-600 dark:border-stone-700 dark:text-stone-400 dark:hover:border-amber-500 dark:hover:text-amber-400"
              >
                <Youtube className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col items-center gap-3 border-t border-stone-200 pt-8 md:flex-row md:justify-between dark:border-stone-800">
          <p className="text-xs text-stone-400 dark:text-stone-500">
            &copy; {new Date().getFullYear()} JOW Film. All rights reserved.
          </p>
          <p className="text-xs text-stone-400 dark:text-stone-500">
            Crafted with love in Việt Nam
          </p>
        </div>
      </div>
    </footer>
  );
}
