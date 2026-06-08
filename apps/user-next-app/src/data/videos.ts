// Shared data arrays — single source of truth for video/film/reel content

export interface HighlightVideo {
  id: string;
  title: string;
  subtitle: string;
}

export interface FilmItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  image: string;
}

export interface ReelItem {
  title: string;
  duration: string;
  location: string;
}

export const HIGHLIGHT_VIDEOS: HighlightVideo[] = [
  {
    id: "SlQR9iu09bQ",
    title: "Eternal Vows",
    subtitle: "Đà Lạt · Spring 2024",
  },
  {
    id: "abPmZCZZrFA",
    title: "Golden Hour",
    subtitle: "Hội An · Summer 2024",
  },
  {
    id: "zoEtcR5EW08",
    title: "Garden of Love",
    subtitle: "Hà Nội · Autumn 2023",
  },
  {
    id: "LggaymnzDjc",
    title: "Into the Wild",
    subtitle: "Phú Quốc · Winter 2024",
  },
  {
    id: "psZ1g9fMfeo",
    title: "Blossom",
    subtitle: "Đà Nẵng · Spring 2023",
  },
  {
    id: "32sYGCOYJUM",
    title: "Midnight Blue",
    subtitle: "TP.HCM · Summer 2023",
  },
];

export const FILMS: FilmItem[] = [
  {
    id: "MoN9ql6Yymw",
    title: "Cưới Truyền Thống",
    subtitle: "Hà Nội · 2024",
    description:
      "Nghi thức gia lễ trang nghiêm, tà áo dài đỏ thắm và khoảnh khắc sum họp ấm áp.",
    tags: ["Áo dài", "Lễ gia tiên", "Family"],
    image: "/images/demo/a7.jpg",
  },
  {
    id: "MoN9ql6Yymw",
    title: "Hương Vị Quê Hương",
    subtitle: "Huế · 2023",
    description:
      "Hồn Huế cổ kính — khăn áo cung đình, sân vườn rêu phong và nét duyên dáng ngàn năm.",
    tags: ["Áo ngũ thân", "Huế cổ", "Heritage"],
    image: "/images/demo/a8.jpg",
  },
  {
    id: "MoN9ql6Yymw",
    title: "Nam Bộ Rực Rỡ",
    subtitle: "Cần Thơ · 2024",
    description:
      "Nét đẹp miền Tây — đám cưới trên sông, hoa súng nở rộ và sắc màu rực rỡ.",
    tags: ["Mekong", "Riverside", "Traditional"],
    image: "/images/demo/a9.jpg",
  },
];

export const REELS: ReelItem[] = [
  { title: "First Look", duration: "0:45", location: "Đà Lạt" },
  { title: "The Kiss", duration: "0:30", location: "Hội An" },
  { title: "Golden Hour Portraits", duration: "1:02", location: "Phú Quốc" },
  { title: "Reception Dance", duration: "0:58", location: "TP.HCM" },
  { title: "Flower Girl Moments", duration: "0:37", location: "Hà Nội" },
  { title: "Candid Tears", duration: "0:50", location: "Đà Nẵng" },
  { title: "Ring Exchange", duration: "0:28", location: "Huế" },
  { title: "Late Night Magic", duration: "1:15", location: "Nha Trang" },
];

// Helpers
export function getYouTubeThumbnail(videoId: string): string {
  return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
}

export function getYouTubeEmbedUrl(videoId: string): string {
  return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
}
