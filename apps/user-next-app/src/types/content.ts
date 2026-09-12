export interface SiteConfig {
  name: string;
  logo: string;
  logoWhite: string;
  accentColor: string;
  fonts?: { heading?: string; body?: string };
}

export interface BannerConfig {
  videoSrc: string;
  mobileVideo?: string;
  logoSrc: string;
  scrollTargetId: string;
  loop?: boolean;
}

export interface StatItem {
  value: string;
  label: string;
}

export interface AboutImage {
  src: string;
  label: string;
}

export interface AboutConfig {
  subtitle: string;
  title: string;
  description: string;
  descriptionVi?: string;
  stats: StatItem[];
  heroImage: AboutImage;
  images: AboutImage[];
}

export interface HighlightVideo {
  id: string;
  /** Backend VideoRecord numeric id (resolved by matching YouTube id) — used to link to /video/[id] */
  videoId?: number;
  title: string;
  subtitle: string;
}

export interface ReelItem {
  title: string;
  duration: string;
  location: string;
  youtubeUrl?: string;
  /** Backend VideoRecord numeric id (resolved by matching YouTube id) — used to link to /video/[id] */
  videoId?: number;
}

export interface FilmItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  image: string;
  youtubeEmbedUrl?: string;
}

export interface ContactConfig {
  subtitle: string;
  heading: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  accentColor: string;
}
