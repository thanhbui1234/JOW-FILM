"use client";

import Link from "next/link";
import { Play } from "lucide-react";
import { cn } from "shared-ui";

type PlayButtonSize = "default" | "compact" | "compact-responsive" | "reel";

const PLAY_BUTTON_SIZES: Record<
  PlayButtonSize,
  { wrapper: string; outer: string; inner: string; icon: string }
> = {
  default: {
    wrapper: "scale-[0.9] group-hover:scale-100",
    outer: "size-28",
    inner: "size-20",
    icon: "size-8",
  },
  compact: {
    wrapper: "scale-75",
    outer: "size-16",
    inner: "size-10",
    icon: "size-5",
  },
  "compact-responsive": {
    wrapper: "scale-75 md:scale-100",
    outer: "size-16",
    inner: "size-10",
    icon: "size-5",
  },
  reel: {
    wrapper: "scale-75",
    outer: "size-14",
    inner: "size-9",
    icon: "size-5",
  },
};

interface VideoLinkThumbnailProps {
  /** Route to navigate to on click — the video detail page (e.g. `/video/{id}`) */
  href: string;
  thumbnailSrc: string;
  thumbnailAlt?: string;
  /** Applied to the outer <Link> element */
  className?: string;
  /** Applied to the <img> thumbnail */
  imgClassName?: string;
  playButtonSize?: PlayButtonSize;
}

/**
 * Clickable video thumbnail that navigates to the video detail page.
 * Visually mirrors `HeroVideoDialog` (thumbnail + play button overlay)
 * but links out instead of opening an inline video dialog.
 */
export function VideoLinkThumbnail({
  href,
  thumbnailSrc,
  thumbnailAlt = "Video thumbnail",
  className,
  imgClassName,
  playButtonSize = "default",
}: VideoLinkThumbnailProps) {
  const size = PLAY_BUTTON_SIZES[playButtonSize];

  return (
    <Link
      href={href}
      aria-label={thumbnailAlt}
      className={cn("group relative block cursor-pointer", className)}
    >
      <img
        src={thumbnailSrc}
        alt={thumbnailAlt}
        className={cn(
          "w-full transition-all duration-200 ease-out group-hover:brightness-[0.8]",
          imgClassName,
        )}
      />
      <div
        className={cn(
          "absolute inset-0 flex items-center justify-center rounded-2xl transition-all duration-200 ease-out",
          size.wrapper,
        )}
      >
        <div
          className={cn(
            "bg-primary/10 flex items-center justify-center rounded-full backdrop-blur-md",
            size.outer,
          )}
        >
          <div
            className={cn(
              "from-primary/30 to-primary relative flex scale-100 items-center justify-center rounded-full bg-linear-to-b shadow-md transition-all duration-200 ease-out group-hover:scale-[1.2]",
              size.inner,
            )}
          >
            <Play
              className={cn(
                "scale-100 fill-white text-white transition-transform duration-200 ease-out group-hover:scale-105",
                size.icon,
              )}
              style={{
                filter:
                  "drop-shadow(0 4px 3px rgb(0 0 0 / 0.07)) drop-shadow(0 2px 2px rgb(0 0 0 / 0.06))",
              }}
            />
          </div>
        </div>
      </div>
    </Link>
  );
}
