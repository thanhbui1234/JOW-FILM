export interface HighlightVideo {
  id: string;
  title: string;
  subtitle: string;
}

export interface ReelItem {
  id: string;
  title: string;
  duration: string;
  location: string;
}

export interface FilmItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  image: string;
  imageTitle?: string;
  imageTopic?: string;
  imageDescription?: string;
  imageAttributes?: string;
}

export interface AboutImage {
  src: string;
  description: string;
}

export interface AboutStat {
  value: string;
  label: string;
}

export interface AboutData {
  title: string;
  description: string;
  images: AboutImage[];
  stats: AboutStat[];
}

export interface SectionConfig {
  title: string;
  description: string;
  backgroundColor: string;
}

export interface FooterData {
  phone: string;
  email: string;
  address: string;
  facebook: string;
  instagram: string;
  youtube: string;
}

export interface AdminState {
  about: AboutData;
  highlights: { config: SectionConfig; items: HighlightVideo[] };
  reels: { config: SectionConfig; items: ReelItem[] };
  films: { config: SectionConfig; items: FilmItem[] };
  footer: FooterData;
}
