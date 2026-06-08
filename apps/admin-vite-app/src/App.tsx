import { Routes, Route } from "react-router-dom";
import { AdminLayout } from "./components/layout/AdminLayout";
import { DashboardPage } from "./pages/DashboardPage";
import { LayoutPage } from "./pages/LayoutPage";
import { BannerPage } from "./pages/BannerPage";
import { AboutPage } from "./pages/AboutPage";
import { WeddingHighlightsPage } from "./pages/WeddingHighlightsPage";
import { WeddingReelsPage } from "./pages/WeddingReelsPage";
import { TraditionalFilmsPage } from "./pages/TraditionalFilmsPage";
import { ContactCtaPage } from "./pages/ContactCtaPage";
import { HeaderPage } from "./pages/HeaderPage";
import { FooterConfigPage } from "./pages/FooterConfigPage";

export function App() {
  return (
    <Routes>
      <Route element={<AdminLayout />}>
        <Route index element={<DashboardPage />} />
        <Route path="layout" element={<LayoutPage />} />
        <Route path="banner" element={<BannerPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="wedding-highlights" element={<WeddingHighlightsPage />} />
        <Route path="wedding-reels" element={<WeddingReelsPage />} />
        <Route path="traditional-films" element={<TraditionalFilmsPage />} />
        <Route path="contact-cta" element={<ContactCtaPage />} />
        <Route path="header" element={<HeaderPage />} />
        <Route path="footer" element={<FooterConfigPage />} />
      </Route>
    </Routes>
  );
}
