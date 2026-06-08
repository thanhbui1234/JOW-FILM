import type { AdminState } from "@/types";

export const INITIAL_STATE: AdminState = {
  about: {
    title: "About JOW Film",
    description:
      "At JOW Film, we go beyond filming — we craft cinematic experiences that immortalize your most precious moments with artistry and emotion.",
    images: [
      { src: "/images/demo/a1.jpg", description: "Behind the lens" },
      { src: "/images/demo/a2.jpg", description: "Studio life" },
      { src: "/images/demo/a3.jpg", description: "On location" },
    ],
    stats: [
      { value: "200+", label: "Wedding Films" },
      { value: "5+", label: "Years Experience" },
      { value: "98%", label: "Happy Couples" },
    ],
  },
  highlights: {
    config: {
      title: "Wedding Highlights",
      description:
        "Your love story, captured in a cinematic highlight reel that you'll treasure forever.",
      backgroundColor: "#fafaf9",
    },
    items: [
      { id: "SlQR9iu09bQ", title: "Eternal Vows", subtitle: "Đà Lạt · Spring 2024" },
      { id: "abPmZCZZrFA", title: "Golden Hour", subtitle: "Hội An · Summer 2024" },
      { id: "zoEtcR5EW08", title: "Garden of Love", subtitle: "Hà Nội · Autumn 2023" },
      { id: "LggaymnzDjc", title: "Into the Wild", subtitle: "Phú Quốc · Winter 2024" },
      { id: "psZ1g9fMfeo", title: "Blossom", subtitle: "Đà Nẵng · Spring 2023" },
      { id: "32sYGCOYJUM", title: "Midnight Blue", subtitle: "TP.HCM · Summer 2023" },
    ],
  },
  reels: {
    config: {
      title: "Wedding Reels",
      description: "Short-form wedding content that captures the magic in seconds.",
      backgroundColor: "#0c0a09",
    },
    items: [
      { id: "reel-1", title: "First Look", duration: "0:45", location: "Đà Lạt" },
      { id: "reel-2", title: "The Kiss", duration: "0:30", location: "Hội An" },
      { id: "reel-3", title: "Golden Hour Portraits", duration: "1:02", location: "Phú Quốc" },
      { id: "reel-4", title: "Reception Dance", duration: "0:58", location: "TP.HCM" },
      { id: "reel-5", title: "Flower Girl Moments", duration: "0:37", location: "Hà Nội" },
      { id: "reel-6", title: "Candid Tears", duration: "0:50", location: "Đà Nẵng" },
      { id: "reel-7", title: "Ring Exchange", duration: "0:28", location: "Huế" },
      { id: "reel-8", title: "Late Night Magic", duration: "1:15", location: "Nha Trang" },
    ],
  },
  films: {
    config: {
      title: "Traditional Films",
      description:
        "A long-form wedding film preserving every beautiful tradition and emotion.",
      backgroundColor: "#293629",
    },
    items: [
      {
        id: "MoN9ql6Yymw",
        title: "Cưới Truyền Thống",
        subtitle: "Hà Nội · 2024",
        description:
          "Nghi thức gia lễ trang nghiêm, tà áo dài đỏ thắm và khoảnh khắc sum họp ấm áp.",
        tags: ["Áo dài", "Lễ gia tiên", "Family"],
        image: "/images/demo/a7.jpg",
        imageTitle: "Cưới Truyền Thống",
        imageTopic: "Traditional Wedding",
        imageDescription: "Nghi thức gia lễ trang nghiêm",
        imageAttributes: "Hà Nội, 2024",
      },
      {
        id: "MoN9ql6Yymw",
        title: "Hương Vị Quê Hương",
        subtitle: "Huế · 2023",
        description:
          "Hồn Huế cổ kính — khăn áo cung đình, sân vườn rêu phong và nét duyên dáng ngàn năm.",
        tags: ["Áo ngũ thân", "Huế cổ", "Heritage"],
        image: "/images/demo/a8.jpg",
        imageTitle: "Hương Vị Quê Hương",
        imageTopic: "Heritage Wedding",
        imageDescription: "Hồn Huế cổ kính",
        imageAttributes: "Huế, 2023",
      },
      {
        id: "MoN9ql6Yymw",
        title: "Nam Bộ Rực Rỡ",
        subtitle: "Cần Thơ · 2024",
        description:
          "Nét đẹp miền Tây — đám cưới trên sông, hoa súng nở rộ và sắc màu rực rỡ.",
        tags: ["Mekong", "Riverside", "Traditional"],
        image: "/images/demo/a9.jpg",
        imageTitle: "Nam Bộ Rực Rỡ",
        imageTopic: "Southern Wedding",
        imageDescription: "Nét đẹp miền Tây",
        imageAttributes: "Cần Thơ, 2024",
      },
    ],
  },
  footer: {
    phone: "0944 229 875",
    email: "jowfilm.vn@gmail.com",
    address: "Ha Noi, Viet Nam",
    facebook: "https://www.facebook.com/profile.php?id=61556675978184",
    instagram: "https://www.instagram.com/jow_film",
    youtube: "https://youtube.com",
  },
};
