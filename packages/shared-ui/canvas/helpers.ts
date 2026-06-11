import type { CSSProperties } from "react";
import type { CanvasElement, CustomSection } from "./types";

function hexToRgba(hex: string, alpha: number): string {
  const h = hex.replace("#", "");
  const r = parseInt(h.slice(0, 2), 16) || 0;
  const g = parseInt(h.slice(2, 4), 16) || 0;
  const b = parseInt(h.slice(4, 6), 16) || 0;
  return `rgba(${r},${g},${b},${alpha})`;
}

export function buildBgStyle(s: CustomSection): CSSProperties {
  switch (s.backgroundType ?? "solid") {
    case "linear":
      return {
        background: `linear-gradient(${s.bgGradientAngle ?? 135}deg, ${s.bgGradientFrom ?? "#ffffff"}, ${s.bgGradientTo ?? "#cccccc"})`,
      };
    case "radial":
      return {
        background: `radial-gradient(circle at center, ${s.bgGradientFrom ?? "#ffffff"}, ${s.bgGradientTo ?? "#cccccc"})`,
      };
    case "image": {
      if (!s.bgImage) return { backgroundColor: s.backgroundColor };
      const overlay = hexToRgba(
        s.bgImageOverlay ?? "#000000",
        (s.bgImageOverlayOpacity ?? 30) / 100,
      );
      return {
        backgroundImage: `linear-gradient(${overlay},${overlay}),url(${JSON.stringify(s.bgImage)})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      };
    }
    default:
      return { backgroundColor: s.backgroundColor };
  }
}

export function buildElementStyle(el: CanvasElement): CSSProperties {
  return {
    opacity: (el.opacity ?? 100) / 100,
    borderRadius: el.borderRadius ?? 0,
    boxShadow: el.shadowEnabled
      ? `${el.shadowX ?? 0}px ${el.shadowY ?? 4}px ${el.shadowBlur ?? 12}px ${el.shadowColor ?? "rgba(0,0,0,0.2)"}`
      : undefined,
  };
}

export function extractYtId(url: string): string | null {
  const m = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|shorts\/|embed\/))([\w-]{11})/,
  );
  return m?.[1] ?? null;
}

export function buildGoogleFontsUrl(fontFamilies: string[]): string {
  const families = fontFamilies
    .filter((f) => f && f !== "inherit")
    .map((f) => `family=${encodeURIComponent(f)}:wght@400;500;600;700`)
    .join("&");
  return `https://fonts.googleapis.com/css2?${families}&display=swap`;
}
