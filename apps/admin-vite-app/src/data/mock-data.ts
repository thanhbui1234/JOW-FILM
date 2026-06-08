import type { AdminState } from "@/types";

export const INITIAL_STATE: AdminState = {
  banner: {
    videoSrc: "/images/demo/tôi_muốn_tạo_video_banner_we.mp4",
    logoSrc: "/images/logo-white-slogan.png",
    logoAlt: "JOW Film",
    scrollLabel: "Scroll to about section",
  },
  header: {
    facebookUrl: "https://www.facebook.com/profile.php?id=61556675978184",
    instagramUrl: "https://www.instagram.com/jow_film",
    emailHref: "mailto:hello@jowfilm.vn",
  },
  about: {
    eyebrow: "About JOW Film",
    titlePrefix: "At JOW Film, we go beyond",
    titleHighlight: "filming.",
    descriptionEn:
      "We translate your love story into a cinematic masterpiece. Driven by our three core pillars, we strive to preserve your most precious moments as a timeless legacy.",
    descriptionVi:
      "Chúng mình kể lại câu chuyện tình yêu của bạn bằng ngôn ngữ điện ảnh. Với ba giá trị cốt lõi Tận tâm, Sáng tạo và Chân thực, mỗi thước phim được tạo nên không chỉ để lưu giữ khoảnh khắc, mà còn để trở thành một Di sản tình yêu trường tồn theo năm tháng.",
    pillars: ["Dedication", "Creativity", "Authenticity"],
    legacyLabel: "Legacy of Love.",
    stats: [
      { value: "200+", label: "Wedding Films" },
      { value: "5+", label: "Years Experience" },
      { value: "98%", label: "Happy Couples" },
    ],
    images: [
      { src: "/images/demo/a1.jpg", description: "Behind the lens" },
      { src: "/images/demo/a2.jpg", description: "Studio life" },
      { src: "/images/demo/a3.jpg", description: "On location" },
    ],
    backgroundColor: "#0c0a09",
  },
  highlights: {
    config: {
      eyebrow: "Featured Works",
      titlePrefix: "Wedding",
      titleHighlight: "Highlights",
      description: "Your love story, distilled into a cinematic masterpiece.",
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
      eyebrow: "Short Films",
      titlePrefix: "Wedding",
      titleHighlight: "Reels",
      description: "Short-form wedding content crafted for effortless sharing across social media.",
      backgroundColor: "#0c0a09",
    },
    items: [
      { id: "reel-1", youtubeUrl: "https://www.youtube.com/shorts/SlQR9iu09bQ", title: "First Look", description: "The very first glance between bride and groom.", duration: "0:45", location: "Đà Lạt" },
      { id: "reel-2", youtubeUrl: "https://www.youtube.com/shorts/abPmZCZZrFA", title: "The Kiss", description: "A quiet, candid kiss caught in afternoon light.", duration: "0:30", location: "Hội An" },
      { id: "reel-3", youtubeUrl: "https://www.youtube.com/shorts/zoEtcR5EW08", title: "Golden Hour Portraits", description: "Slow portraits at the magic hour by the ocean.", duration: "1:02", location: "Phú Quốc" },
      { id: "reel-4", youtubeUrl: "https://www.youtube.com/shorts/LggaymnzDjc", title: "Reception Dance", description: "The first dance, framed in warm tungsten.", duration: "0:58", location: "TP.HCM" },
      { id: "reel-5", youtubeUrl: "https://www.youtube.com/shorts/psZ1g9fMfeo", title: "Flower Girl Moments", description: "Small details in the calm before the ceremony.", duration: "0:37", location: "Hà Nội" },
      { id: "reel-6", youtubeUrl: "https://www.youtube.com/shorts/32sYGCOYJUM", title: "Candid Tears", description: "Honest emotion as the vows are read.", duration: "0:50", location: "Đà Nẵng" },
      { id: "reel-7", youtubeUrl: "", title: "Ring Exchange", description: "An intimate frame at the moment of exchange.", duration: "0:28", location: "Huế" },
      { id: "reel-8", youtubeUrl: "", title: "Late Night Magic", description: "After-party energy in soft neon.", duration: "1:15", location: "Nha Trang" },
    ],
  },
  films: {
    config: {
      eyebrow: "Heritage & Culture",
      titlePrefix: "Traditional",
      titleHighlight: "Films",
      description: "A long-form wedding film that follows the complete timeline of your wedding day.",
      backgroundColor: "#293629",
    },
    items: [
      {
        id: "film-1",
        title: "Cưới Truyền Thống",
        subtitle: "Hà Nội · 2024",
        description:
          "Nghi thức gia lễ trang nghiêm, tà áo dài đỏ thắm và khoảnh khắc sum họp ấm áp.",
        tags: ["Áo dài", "Lễ gia tiên", "Family"],
        image: "/images/demo/a7.jpg",
        previewImages: [
          {
            src: "/images/demo/a7.jpg",
            title: "Lễ gia tiên",
            topic: "Ceremony",
            description: "Khoảnh khắc gia lễ trang nghiêm tại nhà gái.",
            attribute: "Hà Nội, 2024",
          },
        ],
      },
      {
        id: "film-2",
        title: "Hương Vị Quê Hương",
        subtitle: "Huế · 2023",
        description:
          "Hồn Huế cổ kính, khăn áo cung đình, sân vườn rêu phong và nét duyên dáng ngàn năm.",
        tags: ["Áo ngũ thân", "Huế cổ", "Heritage"],
        image: "/images/demo/a8.jpg",
        previewImages: [
          {
            src: "/images/demo/a8.jpg",
            title: "Sân vườn cố đô",
            topic: "Heritage",
            description: "Khu vườn rêu phong làm bối cảnh cho lễ rước dâu.",
            attribute: "Huế, 2023",
          },
        ],
      },
      {
        id: "film-3",
        title: "Nam Bộ Rực Rỡ",
        subtitle: "Cần Thơ · 2024",
        description:
          "Nét đẹp miền Tây, đám cưới trên sông, hoa súng nở rộ và sắc màu rực rỡ.",
        tags: ["Mekong", "Riverside", "Traditional"],
        image: "/images/demo/a9.jpg",
        previewImages: [
          {
            src: "/images/demo/a9.jpg",
            title: "Đám cưới trên sông",
            topic: "Riverside",
            description: "Đoàn ghe rước dâu giữa hoa súng nở rộ.",
            attribute: "Cần Thơ, 2024",
          },
        ],
      },
    ],
  },
  contactCta: {
    eyebrow: "Let's Create Together",
    titlePrefix: "Begin your legacy",
    titleHighlight: "with us",
    description:
      "Tell us about your special day and we'll craft a cinematic story that lasts forever.",
    ctaLabel: "Get in Touch",
    ctaHref: "/contact",
    backgroundColor: "#0c0a09",
  },
  footer: {
    tagline:
      "Cinematic wedding films that tell your love story with artistry and emotion.",
    contactHeading: "Get in Touch",
    phone: "0944 229 875",
    email: "jowfilm.vn@gmail.com",
    address: "Ha Noi, Viet Nam",
    socialHeading: "Follow Us",
    facebookUrl: "https://www.facebook.com/profile.php?id=61556675978184",
    instagramUrl: "https://www.instagram.com/jow_film",
    youtubeUrl: "https://youtube.com",
    copyright: "© {year} JOW Film. All rights reserved.",
    credit: "Crafted with love in Việt Nam",
  },
  layout: [
    { key: "about", visible: true },
    { key: "highlights", visible: true },
    { key: "reels", visible: true },
    { key: "films", visible: true },
  ],
};
