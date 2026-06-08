import { Routes, Route } from "react-router-dom";
import { AdminLayout } from "./components/layout/AdminLayout";
import { DashboardPage } from "./pages/DashboardPage";
import { AboutPage } from "./pages/AboutPage";
import { WeddingHighlightsPage } from "./pages/WeddingHighlightsPage";
import { WeddingReelsPage } from "./pages/WeddingReelsPage";
import { TraditionalFilmsPage } from "./pages/TraditionalFilmsPage";
import { FooterConfigPage } from "./pages/FooterConfigPage";

export function App() {
  return (
    <Routes>
      <Route element={<AdminLayout />}>
        <Route index element={<DashboardPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="wedding-highlights" element={<WeddingHighlightsPage />} />
        <Route path="wedding-reels" element={<WeddingReelsPage />} />
        <Route path="traditional-films" element={<TraditionalFilmsPage />} />
        <Route path="footer" element={<FooterConfigPage />} />
      </Route>
    </Routes>
  );
}
