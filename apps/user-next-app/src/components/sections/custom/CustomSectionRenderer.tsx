import type { CustomSection } from "shared-ui/canvas";
import { CanvasSection } from "./CanvasSection";
import { BlockListSection } from "./BlockListSection";

export function CustomSectionRenderer({ section }: { section: CustomSection }) {
  if (!section.visible) return null;

  if (section.layoutMode === "canvas") {
    return <CanvasSection section={section} />;
  }

  return <BlockListSection section={section} />;
}
