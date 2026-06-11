export type BlockType = "text" | "image_gallery" | "video" | "cta_button";

export type CanvasBgType = "solid" | "linear" | "radial" | "image";

export interface CanvasElement {
  id: string;
  type: BlockType;
  x: number;
  y: number;
  w: number;
  h: number;
  zIndex: number;
  // Appearance
  opacity: number;
  borderRadius: number;
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

export type ContentBlock = TextBlock | ImageGalleryBlock | VideoBlock | CtaButtonBlock;

export interface CustomSection {
  id: string;
  name: string;
  slug: string;
  visible: boolean;
  paddingY: "sm" | "md" | "lg" | "xl";
  layoutMode: "blocks" | "canvas";
  canvasHeight: number;
  canvasElements: CanvasElement[];
  blocks: ContentBlock[];
  backgroundColor: string;
  backgroundType: CanvasBgType;
  bgGradientFrom: string;
  bgGradientTo: string;
  bgGradientAngle: number;
  bgImage: string;
  bgImageOverlay: string;
  bgImageOverlayOpacity: number;
  createdAt: number;
  updatedAt: number;
}
