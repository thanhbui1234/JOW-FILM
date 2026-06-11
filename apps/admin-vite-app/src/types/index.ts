/**
 * Single source of truth for every field the user-facing site renders.
 * Each interface mirrors a concrete visible region of apps/user-next-app.
 */

export interface HighlightVideo {
  id: string;
  videoUrl: string;
  title: string;
  subtitle: string;
}

export interface ReelItem {
  id: string;
  youtubeUrl: string;
  videoUrl: string;
  title: string;
  description: string;
  duration: string;
  location: string;
}

export interface FilmPreviewImage {
  src: string;
  title: string;
  topic: string;
  description: string;
  attribute: string;
}

export interface FilmItem {
  id: string;
  youtubeUrl: string;
  videoUrl: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  image: string;
  previewImages: FilmPreviewImage[];
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
  eyebrow: string;
  titlePrefix: string;
  titleHighlight: string;
  descriptionEn: string;
  descriptionVi: string;
  pillars: string[];
  legacyLabel: string;
  stats: AboutStat[];
  images: AboutImage[];
  backgroundColor: string;
}

export interface BannerData {
  videoSrc: string;
  logoSrc: string;
  logoAlt: string;
  scrollLabel: string;
}

export interface HeaderData {
  facebookUrl: string;
  instagramUrl: string;
  emailHref: string;
}

export interface ThemedSection {
  eyebrow: string;
  titlePrefix: string;
  titleHighlight: string;
  description: string;
  backgroundColor: string;
}

export interface ContactCtaData {
  eyebrow: string;
  titlePrefix: string;
  titleHighlight: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
  backgroundColor: string;
}

export interface FooterData {
  tagline: string;
  contactHeading: string;
  phone: string;
  email: string;
  address: string;
  socialHeading: string;
  facebookUrl: string;
  instagramUrl: string;
  youtubeUrl: string;
  copyright: string;
  credit: string;
}

export interface Collection<TConfig, TItem> {
  config: TConfig;
  items: TItem[];
}

/**
 * Sections that can be reordered + toggled on the homepage.
 * Banner, header, footer and contactCta are fixed and intentionally NOT here.
 */
export type LayoutSectionKey = "about" | "highlights" | "reels" | "films";

export interface LayoutSection {
  key: LayoutSectionKey;
  visible: boolean;
}

export interface AdminState {
  banner: BannerData;
  header: HeaderData;
  about: AboutData;
  highlights: Collection<ThemedSection, HighlightVideo>;
  reels: Collection<ThemedSection, ReelItem>;
  films: Collection<ThemedSection, FilmItem>;
  contactCta: ContactCtaData;
  footer: FooterData;
  layout: LayoutSection[];
  customSections: CustomSection[];
}

export type CollectionKey = "highlights" | "reels" | "films";

export type CollectionItemMap = {
  highlights: HighlightVideo;
  reels: ReelItem;
  films: FilmItem;
};


export interface TextBlock {
  id: string;
  type: "text";
  eyebrow: string;
  heading: string;
  subheading: string;
  body: string;
  alignment: "left" | "center" | "right";
}

export interface ImageItem {
  id: string;
  src: string;
  caption: string;
  alt: string;
}

export interface ImageGalleryBlock {
  id: string;
  type: "image_gallery";
  images: ImageItem[];
  layout: "grid" | "masonry";
  columns: 2 | 3 | 4;
}

export interface VideoBlock {
  id: string;
  type: "video";
  url: string;
  poster: string;
  caption: string;
}

export interface CtaButtonBlock {
  id: string;
  type: "cta_button";
  label: string;
  href: string;
  variant: "primary" | "outline" | "ghost";
  alignment: "left" | "center" | "right";
}

export type ContentBlock =
  | TextBlock
  | ImageGalleryBlock
  | VideoBlock
  | CtaButtonBlock;

export type BlockType = ContentBlock["type"];

/* ─── Canvas element (free-form canvas mode) ─────────────────────────────── */

export interface CanvasElement {
  id: string;
  type: BlockType;
  x: number;
  y: number;
  w: number;
  h: number;
  zIndex: number;
  // Appearance
  opacity: number;        // 0-100
  borderRadius: number;   // px
  shadowEnabled: boolean;
  shadowX: number;
  shadowY: number;
  shadowBlur: number;
  shadowColor: string;
  // Text
  eyebrow?: string;
  heading?: string;
  subheading?: string;
  body?: string;
  textAlign?: "left" | "center" | "right";
  textColor?: string;
  fontSize?: number;
  fontWeight?: "normal" | "medium" | "semibold" | "bold";
  fontStyle?: "normal" | "italic";
  fontFamily?: string;
  // Image
  src?: string;
  imgAlt?: string;
  imgCaption?: string;
  imgFit?: "cover" | "contain" | "fill";
  // Video
  videoUrl?: string;
  videoPoster?: string;
  videoCaption?: string;
  // Button
  btnLabel?: string;
  btnHref?: string;
  btnVariant?: "primary" | "outline" | "ghost";
  btnAlign?: "left" | "center" | "right";
  btnBg?: string;
  btnFg?: string;
}

export type CanvasBgType = "solid" | "linear" | "radial" | "image";

export interface CustomSection {
  id: string;
  name: string;
  slug: string;
  visible: boolean;
  paddingY: "sm" | "md" | "lg" | "xl";
  blocks: ContentBlock[];
  layoutMode: "blocks" | "canvas";
  canvasElements: CanvasElement[];
  canvasHeight: number;
  // Background
  backgroundColor: string;
  backgroundType: CanvasBgType;
  bgGradientAngle: number;
  bgGradientFrom: string;
  bgGradientTo: string;
  bgImage: string;
  bgImageOverlay: string;
  bgImageOverlayOpacity: number;
  createdAt: number;
  updatedAt: number;
}
