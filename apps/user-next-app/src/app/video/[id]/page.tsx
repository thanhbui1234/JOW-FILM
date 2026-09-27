import type { Metadata } from "next";
import { generateSEO } from "@/app/metadata";
import { VideoDetailPage } from "./VideoDetailPage";
import { getAppVideo, getAppSections, getAppVideoList } from "@/lib/video.api";
import {
  findSection,
  mapHighlightSectionToVideos,
  mapReelSectionToReels,
} from "@/lib/video.mapper";
import type {
  WeddingHighlightsSectionData,
  WeddingReelsSectionData,
} from "@/types/video.types";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  let video = await getAppVideo(id);

  if (!video) {
    const allVideos = await getAppVideoList().catch(() => []);
    const matched = allVideos.find(
      (v) => String(v.id) === id || v.youtubeVideoId === id,
    );
    if (matched) {
      video = (await getAppVideo(matched.id).catch(() => matched)) || matched;
    }
  }

  if (!video) {
    return generateSEO({
      title: "Wedding Film Detail",
      description:
        "Watch our cinematic wedding films and short reels. Preserving love stories into timeless art — JOW Film, Vietnam.",
      canonical: `/video/${id}`,
      keywords: [
        "wedding film",
        "wedding highlight",
        "wedding reel",
        "JOW Film",
        "cinematic wedding",
      ],
    });
  }

  const title = video.title || "Wedding Film";
  const description =
    video.description ||
    `Watch "${title}" — a cinematic wedding film crafted by JOW Film Vietnam.`;
  const ogImage =
    video.youtubeMaxResolutionThumbnailUrl ||
    video.youtubeStandardThumbnailUrl ||
    video.youtubeHighThumbnailUrl ||
    video.youtubeMediumThumbnailUrl ||
    video.youtubeThumbnailUrl ||
    (video.youtubeVideoId
      ? `https://img.youtube.com/vi/${video.youtubeVideoId}/maxresdefault.jpg`
      : undefined);

  return generateSEO({
    title,
    description,
    canonical: `/video/${id}`,
    openGraphImage: ogImage,
    keywords: [
      title,
      "wedding film",
      "wedding video detail",
      "wedding highlight",
      "wedding reel",
      "JOW Film",
      "cinematic wedding film",
      ...(video.tags ?? []),
    ],
  });
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;

  // Fetch target video details, sections, and video list in parallel
  const [video, sections, allVideos] = await Promise.all([
    getAppVideo(id),
    getAppSections().catch(() => []),
    getAppVideoList().catch(() => []),
  ]);

  let resolvedVideo = video;
  if (!resolvedVideo && allVideos.length > 0) {
    const matched = allVideos.find(
      (v) => String(v.id) === id || v.youtubeVideoId === id,
    );
    if (matched) {
      resolvedVideo = (await getAppVideo(matched.id).catch(() => matched)) || matched;
    }
  }

  const highlightData = findSection<WeddingHighlightsSectionData>(
    sections,
    "wedding-highlights",
  );
  const reelsData = findSection<WeddingReelsSectionData>(
    sections,
    "wedding-reels",
  );

  const highlights = highlightData
    ? mapHighlightSectionToVideos(highlightData)
    : undefined;
  const reels = reelsData ? mapReelSectionToReels(reelsData) : undefined;

  return (
    <VideoDetailPage
      video={resolvedVideo}
      videoId={id}
      highlights={highlights}
      reels={reels}
      allVideos={allVideos}
      config={highlightData?.config}
    />
  );
}
