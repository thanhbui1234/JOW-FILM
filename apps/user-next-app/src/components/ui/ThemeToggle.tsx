"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch — only render after mount
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <div className="flex items-center gap-4">
        <div className="h-8 w-14 animate-pulse rounded-full bg-stone-700" />
        <span className="text-sm uppercase tracking-widest text-stone-500">
          Theme
        </span>
      </div>
    );
  }

  const isDark = theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="group flex items-center gap-4 rounded-lg px-2 py-2.5 transition-all duration-200 hover:bg-stone-800/50"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {/* Toggle track */}
      <div className="relative flex h-8 w-14 items-center rounded-full bg-stone-800 transition-colors duration-300 group-hover:bg-stone-700">
        {/* Track icons */}
        <Sun className="absolute left-1.5 h-3.5 w-3.5 text-amber-400/40" />
        <Moon className="absolute right-1.5 h-3.5 w-3.5 text-blue-300/40" />

        {/* Thumb */}
        <div
          className={`absolute h-6 w-6 rounded-full shadow-md transition-all duration-300 ${
            isDark
              ? "left-[1.625rem] bg-blue-400"
              : "left-1 bg-amber-400"
          }`}
        >
          {isDark ? (
            <Moon className="absolute inset-0 m-auto h-3.5 w-3.5 text-stone-900" />
          ) : (
            <Sun className="absolute inset-0 m-auto h-3.5 w-3.5 text-stone-900" />
          )}
        </div>
      </div>

      {/* Label */}
      <span className="text-sm font-medium uppercase tracking-widest text-stone-500 transition-colors duration-200 group-hover:text-stone-300">
        {isDark ? "Dark" : "Light"}
      </span>
    </button>
  );
}
