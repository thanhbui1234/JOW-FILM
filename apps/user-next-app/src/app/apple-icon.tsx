import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// Apple touch icon 180×180 — dùng cho iOS home screen
export default function AppleIcon() {
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
          borderRadius: "40px",
          position: "relative",
        }}
      >
        {/* Amber accent dot */}
        <div
          style={{
            position: "absolute",
            top: "22px",
            right: "24px",
            width: "18px",
            height: "18px",
            borderRadius: "50%",
            background: "#d97706",
          }}
        />
        {/* JOW text */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "4px",
          }}
        >
          <span
            style={{
              fontSize: "80px",
              fontWeight: 700,
              color: "white",
              fontFamily: "serif",
              lineHeight: 1,
              letterSpacing: "-2px",
            }}
          >
            JOW
          </span>
          <span
            style={{
              fontSize: "18px",
              fontWeight: 300,
              color: "#d97706",
              letterSpacing: "8px",
              textTransform: "uppercase",
            }}
          >
            FILM
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
