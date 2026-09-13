"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Calendar,
  Check,
  ExternalLink,
  Film,
  MapPin,
  Share2,
  Smartphone,
  Sparkles,
  Tv,
} from "lucide-react";
import { format } from "date-fns";
import { BlurFade } from "shared-ui";
import type { VideoRecord, SectionConfig } from "@/types/video.types";
import type { HighlightVideo, ReelItem } from "@/types/content";

interface RelatedVideoItem {
  id: string | number;
  title: string;
  subtitle?: string;
  thumbnailUrl: string;
  type: "highlight" | "reel";
  duration?: string;
  location?: string;
  url: string;
}

interface VideoDetailPageProps {
  video: VideoRecord | null;
  videoId: string;
  highlights?: HighlightVideo[];
  reels?: ReelItem[];
  allVideos?: VideoRecord[];
  config?: SectionConfig;
}

/** Format timestamp */
function formatVideoDate(timestamp?: number): string {
  if (!timestamp) return "";
  try {
    return format(new Date(timestamp), "MMMM d, yyyy");
  } catch {
    return "";
  }
}

/** Build YouTube embed URL with autoplay */
function buildEmbedUrl(videoIdOrUrl: string): string {
  if (!videoIdOrUrl) return "";
  if (videoIdOrUrl.includes("youtube.com/embed/")) {
    return videoIdOrUrl.includes("autoplay")
      ? videoIdOrUrl
      : `${videoIdOrUrl}${videoIdOrUrl.includes("?") ? "&" : "?"}autoplay=1&rel=0`;
  }
  const watchMatch = videoIdOrUrl.match(/[?&]v=([^&]+)/);
  if (watchMatch) {
    return `https://www.youtube.com/embed/${watchMatch[1]}?autoplay=1&rel=0`;
  }
  const shortMatch = videoIdOrUrl.match(/youtu\.be\/([^?&/]+)/);
  if (shortMatch) {
    return `https://www.youtube.com/embed/${shortMatch[1]}?autoplay=1&rel=0`;
  }
  return `https://www.youtube.com/embed/${videoIdOrUrl}?autoplay=1&rel=0`;
}

export function VideoDetailPage({
  video,
  videoId,
  highlights = [],
  reels = [],
  allVideos = [],
}: VideoDetailPageProps) {
  // Check if title or tags imply this is a Reel (9:16)
  const isInitiallyReel = useMemo(() => {
    if (!video) return false;
    const lowerTitle = (video.title || "").toLowerCase();
    const hasReelTag = video.tags?.some((t) => t.toLowerCase().includes("reel"));
    return lowerTitle.includes("reel") || Boolean(hasReelTag);
  }, [video]);

  // Player aspect ratio mode: "reel" (9:16) or "cinema" (16:9)
  const [aspectMode, setAspectMode] = useState<"reel" | "cinema">(
    isInitiallyReel ? "reel" : "cinema",
  );
  const [copied, setCopied] = useState(false);

  // Which related-works tab is active: "highlight" or "reel"
  const [relatedTab, setRelatedTab] = useState<"highlight" | "reel">(
    isInitiallyReel ? "reel" : "highlight",
  );

  // Extract couple / title and location from title if formatted like "A & B | Location"
  const { displayTitle, displayLocation } = useMemo(() => {
    if (!video?.title) return { displayTitle: "Wedding Film", displayLocation: "" };
    const parts = video.title.split("|").map((p) => p.trim());
    if (parts.length >= 2) {
      return {
        displayTitle: parts[0],
        displayLocation: parts.slice(1).join(" • "),
      };
    }
    return {
      displayTitle: video.title,
      displayLocation: "",
    };
  }, [video?.title]);

  const embedUrl = useMemo(() => {
    if (!video) return "";
    return buildEmbedUrl(video.youtubeEmbedUrl || video.youtubeVideoId);
  }, [video]);

  // Handle link sharing
  const handleCopyLink = async () => {
    try {
      if (typeof window !== "undefined") {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      }
    } catch (err) {
      console.error("Failed to copy link:", err);
    }
  };

  // Compile related videos — kept as two separate lists (highlights vs reels)
  // so the "Portfolio" section below can show them in independent tabs
  // instead of one mixed grid (reels are taller and threw off the layout).
  const { relatedHighlights, relatedReels } = useMemo(() => {
    const highlightItems: RelatedVideoItem[] = [];
    const reelItems: RelatedVideoItem[] = [];

    // From allVideos API (excluding current video)
    if (allVideos && allVideos.length > 0) {
      for (const v of allVideos) {
        if (String(v.id) === String(video?.id) || v.youtubeVideoId === video?.youtubeVideoId) {
          continue;
        }
        const isReel = (v.title || "").toLowerCase().includes("reel");
        const entry: RelatedVideoItem = {
          id: v.id,
          title: v.title,
          subtitle: v.description || (isReel ? "Wedding Reel" : "Wedding Highlight"),
          thumbnailUrl:
            v.youtubeMaxResolutionThumbnailUrl ||
            v.youtubeStandardThumbnailUrl ||
            `https://img.youtube.com/vi/${v.youtubeVideoId}/maxresdefault.jpg`,
          type: isReel ? "reel" : "highlight",
          url: `/video/${v.id}`,
        };
        (isReel ? reelItems : highlightItems).push(entry);
      }
    }

    // Fallback or addition from highlights
    if (highlightItems.length < 8 && highlights.length > 0) {
      for (const h of highlights) {
        if (h.id === video?.youtubeVideoId) continue;
        if (!highlightItems.some((it) => it.title === h.title)) {
          highlightItems.push({
            id: h.id,
            title: h.title,
            subtitle: h.subtitle || "Wedding Highlight",
            thumbnailUrl: `https://img.youtube.com/vi/${h.id}/maxresdefault.jpg`,
            type: "highlight",
            url: `/video/${h.videoId ?? h.id}`,
          });
        }
      }
    }

    // Fallback or addition from reels
    if (reelItems.length < 8 && reels.length > 0) {
      for (const r of reels) {
        if (!reelItems.some((it) => it.title === r.title)) {
          const ytId = r.youtubeUrl?.match(/embed\/([^?&/]+)/)?.[1] || "";
          reelItems.push({
            id: r.title,
            title: r.title,
            subtitle: r.location || "Wedding Reel",
            thumbnailUrl: ytId
              ? `https://img.youtube.com/vi/${ytId}/maxresdefault.jpg`
              : "",
            type: "reel",
            duration: r.duration,
            location: r.location,
            url: r.videoId ? `/video/${r.videoId}` : ytId ? `/video/${ytId}` : `/wedding-reels`,
          });
        }
      }
    }

    return {
      relatedHighlights: highlightItems.slice(0, 8),
      relatedReels: reelItems.slice(0, 8),
    };
  }, [allVideos, video, highlights, reels]);

  const hasRelatedHighlights = relatedHighlights.length > 0;
  const hasRelatedReels = relatedReels.length > 0;
  const showRelatedTabs = hasRelatedHighlights && hasRelatedReels;
  const activeRelatedTab = showRelatedTabs
    ? relatedTab
    : hasRelatedReels
      ? "reel"
      : "highlight";
  const activeRelatedVideos =
    activeRelatedTab === "reel" ? relatedReels : relatedHighlights;

  // ---------------------------------------------------------------------------
  // Empty / Not Found State
  // ---------------------------------------------------------------------------
  if (!video) {
    return (
      <main className="min-h-screen bg-stone-50 px-5 pt-32 pb-20 dark:bg-stone-900">
        <div className="mx-auto max-w-2xl text-center">
          <BlurFade delay={0.05} inView>
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.3em] text-amber-400 md:text-xs">
              Film Not Found
            </p>
          </BlurFade>
          <BlurFade delay={0.15} inView>
            <h1 className="font-title text-3xl font-light tracking-wide text-foreground md:text-5xl">
              Video <em className="italic font-normal">Unavailable</em>
            </h1>
          </BlurFade>
          <BlurFade delay={0.25} inView>
            <p className="mx-auto mt-4 max-w-md text-sm text-stone-500 dark:text-stone-400">
              The requested wedding film (ID: {videoId}) could not be retrieved from the library.
            </p>
          </BlurFade>

          <BlurFade delay={0.35} inView>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                href="/wedding-highlight"
                className="inline-flex items-center gap-2 rounded-full bg-stone-900 px-6 py-3 text-xs font-medium uppercase tracking-widest text-white transition-all hover:bg-stone-800 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-white"
              >
                <Film className="size-4" />
                Wedding Highlights
              </Link>
              <Link
                href="/wedding-reels"
                className="inline-flex items-center gap-2 rounded-full border border-stone-300 px-6 py-3 text-xs font-medium uppercase tracking-widest text-stone-700 transition-all hover:border-amber-400 hover:text-amber-500 dark:border-stone-700 dark:text-stone-300"
              >
                <Smartphone className="size-4" />
                Wedding Reels
              </Link>
            </div>
          </BlurFade>
        </div>
      </main>
    );
  }

  // ---------------------------------------------------------------------------
  // Main Detail View
  // ---------------------------------------------------------------------------
  return (
    <main className="min-h-screen bg-stone-50 dark:bg-stone-950">
      {/* Top Header & Breadcrumb Bar */}
      <section
        data-header-theme="light"
        className="px-5 pt-24 pb-6 md:px-12 md:pt-28 lg:px-24"
      >
        <div className="mx-auto max-w-6xl">
          {/* Back links & Breadcrumbs */}
          <BlurFade delay={0.05} inView>
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-stone-200 pb-4 text-xs dark:border-stone-800">
              <div className="flex items-center gap-2 text-stone-500 dark:text-stone-400">
                <Link
                  href="/"
                  className="transition-colors hover:text-amber-500"
                >
                  Home
                </Link>
                <span>/</span>
                <Link
                  href={isInitiallyReel ? "/wedding-reels" : "/wedding-highlight"}
                  className="transition-colors hover:text-amber-500"
                >
                  {isInitiallyReel ? "Wedding Reels" : "Wedding Highlights"}
                </Link>
                <span>/</span>
                <span className="max-w-[200px] truncate text-stone-900 md:max-w-xs dark:text-stone-100">
                  {displayTitle}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <Link
                  href="/wedding-highlight"
                  className="inline-flex items-center gap-1.5 rounded-full border border-stone-300 px-3 py-1 text-[11px] font-medium text-stone-600 transition-all hover:border-amber-400 hover:text-amber-500 dark:border-stone-700 dark:text-stone-300"
                >
                  <ArrowLeft className="size-3" />
                  Highlights
                </Link>
                <Link
                  href="/wedding-reels"
                  className="inline-flex items-center gap-1.5 rounded-full border border-stone-300 px-3 py-1 text-[11px] font-medium text-stone-600 transition-all hover:border-amber-400 hover:text-amber-500 dark:border-stone-700 dark:text-stone-300"
                >
                  <Smartphone className="size-3" />
                  Reels
                </Link>
              </div>
            </div>
          </BlurFade>

          {/* Title Header */}
          <div className="text-center md:text-left">
            <BlurFade delay={0.1} inView>
              <div className="flex flex-wrap items-center justify-center gap-2 md:justify-start">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-400/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-amber-500 dark:bg-amber-400/15 dark:text-amber-400">
                  <Sparkles className="size-3" />
                  {isInitiallyReel ? "Wedding Reel" : "Wedding Highlight"}
                </span>
              </div>
            </BlurFade>

            <BlurFade delay={0.15} inView>
              <h1 className="font-title mt-3 text-3xl font-light tracking-tight text-stone-900 sm:text-4xl md:text-5xl lg:text-6xl dark:text-stone-100">
                {displayTitle}
              </h1>
            </BlurFade>

            {/* Meta row */}
            <BlurFade delay={0.2} inView>
              <div className="mt-3 flex flex-wrap items-center justify-center gap-4 text-xs text-stone-500 md:justify-start dark:text-stone-400">
                {displayLocation && (
                  <div className="flex items-center gap-1.5">
                    <MapPin className="size-3.5 text-amber-500" />
                    <span className="font-medium text-stone-700 dark:text-stone-300">
                      {displayLocation}
                    </span>
                  </div>
                )}
                {video.createdTime && (
                  <div className="flex items-center gap-1.5">
                    <Calendar className="size-3.5 text-stone-400" />
                    <span>{formatVideoDate(video.createdTime)}</span>
                  </div>
                )}
              </div>
            </BlurFade>
          </div>
        </div>
      </section>

      {/* Main Video Cinema Stage */}
      <section
        data-header-theme="dark"
        className="bg-stone-950 px-4 py-8 text-white sm:px-8 md:px-12 md:py-14 lg:px-24"
      >
        <div className="mx-auto max-w-6xl">
          {/* Controls Bar Above Player */}
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            {/* Aspect Mode Switcher */}
            <div className="inline-flex rounded-full bg-stone-900/90 p-1 ring-1 ring-stone-800">
              <button
                type="button"
                onClick={() => setAspectMode("cinema")}
                className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-medium transition-all ${
                  aspectMode === "cinema"
                    ? "bg-amber-400 text-stone-950 shadow-sm"
                    : "text-stone-400 hover:text-white"
                }`}
              >
                <Tv className="size-3.5" />
                Cinema 16:9
              </button>
              <button
                type="button"
                onClick={() => setAspectMode("reel")}
                className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-medium transition-all ${
                  aspectMode === "reel"
                    ? "bg-amber-400 text-stone-950 shadow-sm"
                    : "text-stone-400 hover:text-white"
                }`}
              >
                <Smartphone className="size-3.5" />
                Reel 9:16
              </button>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleCopyLink}
                className="inline-flex items-center gap-1.5 rounded-full bg-stone-900 px-3.5 py-1.5 text-xs font-medium text-stone-300 ring-1 ring-stone-800 transition-all hover:bg-stone-800 hover:text-white"
              >
                {copied ? (
                  <>
                    <Check className="size-3.5 text-green-400" />
                    <span className="text-green-400">Copied!</span>
                  </>
                ) : (
                  <>
                    <Share2 className="size-3.5" />
                    <span>Share</span>
                  </>
                )}
              </button>

              {video.youtubeUrl && (
                <a
                  href={video.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full bg-stone-900 px-3.5 py-1.5 text-xs font-medium text-stone-300 ring-1 ring-stone-800 transition-all hover:bg-stone-800 hover:text-white"
                >
                  <ExternalLink className="size-3.5" />
                  <span>YouTube</span>
                </a>
              )}
            </div>
          </div>

          {/* Embedded Video Theater Container */}
          <div className="relative mx-auto overflow-hidden rounded-3xl border border-stone-800/80 bg-stone-900/60 p-3 shadow-2xl backdrop-blur-xl sm:p-6 md:p-8">
            {/* Ambient Backlight Glow */}
            <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-500/10 via-stone-900/20 to-transparent blur-2xl" />

            {aspectMode === "reel" ? (
              /* Reel View (9:16 Vertical Phone Showcase) */
              <div className="flex justify-center py-2">
                <div
                  className="relative w-full max-w-[340px] sm:max-w-[380px] overflow-hidden rounded-2xl border-2 border-stone-800 shadow-2xl ring-1 ring-white/10"
                  style={{ aspectRatio: "9/16" }}
                >
                  <iframe
                    src={embedUrl}
                    title={video.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="h-full w-full rounded-2xl object-cover"
                  />
                </div>
              </div>
            ) : (
              /* Cinema View (16:9 Widescreen Theater) */
              <div
                className="relative w-full overflow-hidden rounded-2xl border border-stone-800 shadow-2xl ring-1 ring-white/10"
                style={{ aspectRatio: "16/9" }}
              >
                <iframe
                  src={embedUrl}
                  title={video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="h-full w-full rounded-2xl"
                />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Video Information */}
      <section
        data-header-theme="light"
        className="px-5 py-12 md:px-12 md:py-16 lg:px-24"
      >
        <div className="mx-auto max-w-6xl">
          <div className="max-w-3xl">
            <BlurFade delay={0.05} inView>
              <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-amber-500">
                The Story
              </p>
              <h2 className="font-title text-2xl font-light text-stone-900 md:text-3xl dark:text-stone-100">
                About this <em className="italic font-normal">Film</em>
              </h2>

              <div className="mt-4 leading-relaxed text-stone-600 dark:text-stone-300">
                {video.description ? (
                  <p className="whitespace-pre-line text-sm md:text-base">
                    {video.description}
                  </p>
                ) : (
                  <p className="text-sm italic leading-relaxed text-stone-500 md:text-base dark:text-stone-400">
                    Crafted with dedication, artistry, and heart by JOW Film. Every gentle glance, sincere promise, and joyful tear is preserved into an everlasting visual memory for the couple and their loved ones.
                  </p>
                )}
              </div>

              {/* Tags */}
              {video.tags && video.tags.length > 0 && (
                <div className="mt-6 flex flex-wrap items-center gap-2">
                  {video.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="rounded-full bg-stone-200/80 px-3 py-1 text-xs font-medium text-stone-700 dark:bg-stone-800 dark:text-stone-300"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </BlurFade>
          </div>
        </div>
      </section>

      {/* Related Works Section (Highlights & Reels — shown as separate tabs) */}
      {(hasRelatedHighlights || hasRelatedReels) && (
        <section
          data-header-theme="light"
          className="border-t border-stone-200 bg-stone-100/60 px-5 py-14 md:px-12 md:py-20 lg:px-24 dark:border-stone-800 dark:bg-stone-900/60"
        >
          <div className="mx-auto max-w-6xl">
            <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
              <div>
                <BlurFade delay={0.05} inView>
                  <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-amber-500">
                    Portfolio
                  </p>
                  <h2 className="font-title text-3xl font-light text-stone-900 md:text-4xl dark:text-stone-100">
                    More <em className="italic font-normal">Highlights & Reels</em>
                  </h2>
                </BlurFade>
              </div>

              <div className="flex items-center gap-3">
                <Link
                  href="/wedding-highlight"
                  className="text-xs font-medium uppercase tracking-widest text-stone-600 transition-colors hover:text-amber-500 dark:text-stone-400"
                >
                  All Highlights →
                </Link>
                <Link
                  href="/wedding-reels"
                  className="text-xs font-medium uppercase tracking-widest text-stone-600 transition-colors hover:text-amber-500 dark:text-stone-400"
                >
                  All Reels →
                </Link>
              </div>
            </div>

            {/* Tabs */}
            {showRelatedTabs && (
              <div className="mb-8 inline-flex rounded-full bg-stone-200/70 p-1 dark:bg-stone-800/70">
                <button
                  type="button"
                  onClick={() => setRelatedTab("highlight")}
                  className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-medium transition-all ${
                    activeRelatedTab === "highlight"
                      ? "bg-white text-stone-900 shadow-sm dark:bg-stone-100"
                      : "text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-white"
                  }`}
                >
                  <Film className="size-3.5" />
                  Highlights
                </button>
                <button
                  type="button"
                  onClick={() => setRelatedTab("reel")}
                  className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-medium transition-all ${
                    activeRelatedTab === "reel"
                      ? "bg-white text-stone-900 shadow-sm dark:bg-stone-100"
                      : "text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-white"
                  }`}
                >
                  <Smartphone className="size-3.5" />
                  Reels
                </button>
              </div>
            )}

            {/* Related Grid */}
            <div
              className={
                activeRelatedTab === "reel"
                  ? "grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-5"
                  : "grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6"
              }
            >
              {activeRelatedVideos.map((item, idx) => (
                <BlurFade key={`${item.id}-${idx}`} delay={0.05 + idx * 0.05} inView>
                  <Link
                    href={item.url}
                    className="group relative block overflow-hidden rounded-xl bg-stone-900 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl md:rounded-2xl"
                  >
                    <div
                      className="relative w-full overflow-hidden"
                      style={{
                        aspectRatio: item.type === "reel" ? "9/14" : "16/10",
                      }}
                    >
                      <img
                        src={item.thumbnailUrl}
                        alt={item.title}
                        className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                      />
                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-4 flex flex-col justify-end">
                        <span className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-amber-400">
                          {item.type === "reel" ? "Reel" : "Highlight"}
                        </span>
                        <h4 className="line-clamp-2 text-xs font-medium text-white md:text-sm">
                          {item.title}
                        </h4>
                        {item.subtitle && (
                          <p className="mt-0.5 line-clamp-1 text-[11px] text-white/60">
                            {item.subtitle}
                          </p>
                        )}
                      </div>

                      {item.duration && (
                        <div className="absolute top-2.5 right-2.5 rounded-full bg-black/60 px-2 py-0.5 text-[10px] text-white/90 backdrop-blur-xs">
                          {item.duration}
                        </div>
                      )}
                    </div>
                  </Link>
                </BlurFade>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Booking / Closing CTA Block */}
      <section
        data-header-theme="light"
        className="bg-stone-50 px-5 py-16 text-center md:px-12 md:py-24 dark:bg-stone-950"
      >
        <div className="mx-auto max-w-3xl">
          <BlurFade delay={0.05} inView>
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.3em] text-amber-500 md:text-xs">
              Begin Your Journey
            </p>
            <h2 className="font-title text-3xl font-light tracking-wide text-stone-900 sm:text-4xl md:text-5xl dark:text-stone-100">
              Preserve your love story into a{" "}
              <em className="italic font-normal">cinematic heirloom</em>.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-stone-500 dark:text-stone-400">
              Connect with JOW Film to discuss your wedding schedule, cinematography visions, and bespoke film packages.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-amber-400 px-8 py-3.5 text-xs font-medium uppercase tracking-widest text-stone-950 shadow-md transition-all hover:bg-amber-300 hover:shadow-lg"
              >
                Get In Touch
              </Link>
            </div>
          </BlurFade>
        </div>
      </section>
    </main>
  );
}
