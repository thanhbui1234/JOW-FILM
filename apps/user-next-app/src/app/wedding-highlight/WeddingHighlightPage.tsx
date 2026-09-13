"use client";

import { PageTitleBar } from "@/components/ui/PageTitleBar";
import { HIGHLIGHT_VIDEOS } from "@/data/videos";
import { BlurFade } from "shared-ui";
import { VideoLinkThumbnail } from "@/components/ui/VideoLinkThumbnail";
import type { HighlightVideo } from "@/types/content";
import type { SectionConfig } from "@/types/video.types";

function toThumbnailUrl(idOrUrl: string): string {
  if (!idOrUrl) return "";
  const embedMatch = idOrUrl.match(/youtube\.com\/embed\/([^?&/]+)/);
  if (embedMatch) return `https://img.youtube.com/vi/${embedMatch[1]}/maxresdefault.jpg`;
  const watchMatch = idOrUrl.match(/[?&]v=([^&]+)/);
  if (watchMatch) return `https://img.youtube.com/vi/${watchMatch[1]}/maxresdefault.jpg`;
  // Bare ID
  return `https://img.youtube.com/vi/${idOrUrl}/maxresdefault.jpg`;
}

interface WeddingHighlightPageProps {
  videos?: HighlightVideo[];
  config?: SectionConfig;
}

export function WeddingHighlightPage({ videos, config }: WeddingHighlightPageProps) {
  const displayVideos = videos ?? HIGHLIGHT_VIDEOS;
  return (
    <main>
      <PageTitleBar
        label={config?.eyebrow ?? "Featured Works"}
        title={config?.titlePrefix ?? "Wedding"}
        highlightWord={config?.titleHighlight ?? "Highlights"}
      />

      <section
        data-header-theme="light"
        className="bg-stone-50 px-5 py-10 md:px-12 md:py-14 lg:px-24 dark:bg-stone-900"
      >
        <div className="mx-auto max-w-7xl">
          {/* Grid — 1 col mobile, 2 cols tablet, 3 cols desktop */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 md:gap-6">
            {displayVideos.map((video, index) => (
              <BlurFade key={video.id} delay={0.05 + index * 0.06} inView>
                <div className="group relative overflow-hidden rounded-xl md:rounded-2xl">
                  <VideoLinkThumbnail
                    href={`/video/${video.videoId ?? video.id}`}
                    thumbnailSrc={toThumbnailUrl(video.id)}
                    thumbnailAlt={video.title}
                    imgClassName="aspect-[16/10] rounded-xl md:rounded-2xl"
                    playButtonSize="compact-responsive"
                  />
                  <div className="pointer-events-none absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent p-4 md:p-6">
                    <h3 className="text-base font-medium text-white md:text-lg lg:text-xl">
                      {video.title}
                    </h3>
                    <p className="text-xs text-white/60 md:text-sm">
                      {video.subtitle}
                    </p>
                  </div>
                </div>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
