export type FontCategory = "serif" | "sans" | "script" | "system";

export interface FontOption {
  label: string;
  value: string;
  category: FontCategory;
}

export const FONT_OPTIONS: FontOption[] = [
  { label: "System default",     value: "inherit",            category: "system" },
  { label: "Playfair Display",   value: "Playfair Display",   category: "serif"  },
  { label: "Cormorant Garamond", value: "Cormorant Garamond", category: "serif"  },
  { label: "Lora",               value: "Lora",               category: "serif"  },
  { label: "EB Garamond",        value: "EB Garamond",        category: "serif"  },
  { label: "Libre Baskerville",  value: "Libre Baskerville",  category: "serif"  },
  { label: "Montserrat",         value: "Montserrat",         category: "sans"   },
  { label: "Raleway",            value: "Raleway",            category: "sans"   },
  { label: "Inter",              value: "Inter",              category: "sans"   },
  { label: "DM Sans",            value: "DM Sans",            category: "sans"   },
  { label: "Nunito",             value: "Nunito",             category: "sans"   },
  { label: "Great Vibes",        value: "Great Vibes",        category: "script" },
  { label: "Dancing Script",     value: "Dancing Script",     category: "script" },
  { label: "Alex Brush",         value: "Alex Brush",         category: "script" },
  { label: "Pacifico",           value: "Pacifico",           category: "script" },
];

export const CATEGORY_LABELS: Record<string, string> = {
  system: "System",
  serif:  "Serif",
  sans:   "Sans-serif",
  script: "Script / Cursive",
};

const GOOGLE_FONTS_LINK_ID = "canvas-editor-google-fonts";

export function ensureGoogleFontsLoaded(): void {
  if (document.getElementById(GOOGLE_FONTS_LINK_ID)) return;
  const families = FONT_OPTIONS
    .filter((f) => f.value !== "inherit")
    .map((f) => `family=${encodeURIComponent(f.value)}:ital,wght@0,300;0,400;0,600;0,700;1,400`)
    .join("&");
  const link = document.createElement("link");
  link.id = GOOGLE_FONTS_LINK_ID;
  link.rel = "stylesheet";
  link.href = `https://fonts.googleapis.com/css2?${families}&display=swap`;
  document.head.appendChild(link);
}
