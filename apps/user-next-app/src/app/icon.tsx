import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

// Favicon 32×32 — chữ "J" trên nền đen với điểm nhấn amber
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0c0c0c",
          borderRadius: "6px",
          position: "relative",
        }}
      >
        {/* Amber dot accent */}
        <div
          style={{
            position: "absolute",
            top: "4px",
            right: "4px",
            width: "6px",
            height: "6px",
            borderRadius: "50%",
            background: "#d97706",
          }}
        />
        <span
          style={{
            fontSize: "18px",
            fontWeight: 700,
            color: "white",
            fontFamily: "serif",
            letterSpacing: "-0.5px",
          }}
        >
          J
        </span>
      </div>
    ),
    { ...size }
  );
}
