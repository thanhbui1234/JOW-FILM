import Image from "next/image";
import type { CanvasElement } from "shared-ui/canvas";
import { extractYtId } from "shared-ui/canvas";

export function CanvasElementRenderer({ element }: { element: CanvasElement }) {
  const fw =
    element.fontWeight === "medium"
      ? "500"
      : element.fontWeight === "semibold"
        ? "600"
        : element.fontWeight === "bold"
          ? "700"
          : "400";

  switch (element.type) {
    case "text":
      return (
        <div
          className="flex h-full flex-col justify-center gap-1 overflow-hidden px-4 py-3"
          style={{
            textAlign: element.textAlign ?? "left",
            color: element.textColor ?? "inherit",
            fontStyle: element.fontStyle ?? "normal",
            fontFamily:
              element.fontFamily && element.fontFamily !== "inherit"
                ? element.fontFamily
                : undefined,
          }}
        >
          {element.eyebrow && (
            <p className="font-semibold uppercase tracking-widest opacity-60" style={{ fontSize: "0.6em" }}>
              {element.eyebrow}
            </p>
          )}
          {element.heading && (
            <p style={{ fontSize: element.fontSize ?? 32, fontWeight: fw, lineHeight: 1.2 }}>
              {element.heading}
            </p>
          )}
          {element.subheading && (
            <p style={{ fontSize: (element.fontSize ?? 32) * 0.45, fontWeight: "500", opacity: 0.7 }}>
              {element.subheading}
            </p>
          )}
          {element.body && (
            <p style={{ fontSize: (element.fontSize ?? 32) * 0.35, opacity: 0.6, lineHeight: 1.6 }}>
              {element.body}
            </p>
          )}
        </div>
      );

    case "image_gallery":
      return element.src ? (
        <Image
          src={element.src}
          alt={element.imgAlt ?? ""}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          style={{ objectFit: element.imgFit ?? "cover" }}
          draggable={false}
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-muted/40">
          <span className="text-xs text-muted-foreground/50">No image</span>
        </div>
      );

    case "video": {
      const ytId = extractYtId(element.videoUrl ?? "");
      if (ytId) {
        return (
          <a
            href={`https://www.youtube.com/watch?v=${ytId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="relative block h-full w-full overflow-hidden bg-black"
          >
            <Image
              src={`https://img.youtube.com/vi/${ytId}/hqdefault.jpg`}
              alt={element.videoCaption ?? "video thumbnail"}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              style={{ objectFit: "cover", opacity: 0.8 }}
              draggable={false}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex h-12 w-16 items-center justify-center rounded-xl bg-red-600/90 shadow-lg transition-transform hover:scale-110">
                <svg className="h-5 w-5 translate-x-0.5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          </a>
        );
      }
      if (element.videoUrl) {
        return (
          <video
            src={element.videoUrl}
            poster={element.videoPoster}
            controls
            className="h-full w-full object-cover"
          />
        );
      }
      return (
        <div className="flex h-full w-full items-center justify-center bg-muted/40">
          <span className="text-xs text-muted-foreground/50">No video</span>
        </div>
      );
    }

    case "cta_button":
      return (
        <div
          className="flex h-full w-full items-center overflow-hidden px-4"
          style={{
            justifyContent:
              element.btnAlign === "center"
                ? "center"
                : element.btnAlign === "right"
                  ? "flex-end"
                  : "flex-start",
          }}
        >
          <a
            href={element.btnHref ?? "#"}
            className="truncate rounded-lg px-6 py-3 text-sm font-semibold shadow transition-opacity hover:opacity-90"
            style={{
              backgroundColor:
                element.btnVariant === "primary" ? (element.btnBg ?? "#f59e0b") : "transparent",
              color:
                element.btnVariant === "primary"
                  ? (element.btnFg ?? "#0c0a09")
                  : (element.btnBg ?? "#f59e0b"),
              border:
                element.btnVariant === "outline"
                  ? `2px solid ${element.btnBg ?? "#f59e0b"}`
                  : undefined,
            }}
          >
            {element.btnLabel || "Button"}
          </a>
        </div>
      );
  }
}
