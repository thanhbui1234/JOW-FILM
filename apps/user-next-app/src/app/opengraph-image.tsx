import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "JOW Film — Cinematic Wedding Films";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Open Graph image — hiện khi share link lên Facebook/Zalo/Twitter
// Kích thước chuẩn Facebook: 1200×630
export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: "#0c0c0c",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background decorative lines */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "0",
            opacity: 0.06,
          }}
        >
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              style={{
                height: "1px",
                background: "white",
                width: "100%",
              }}
            />
          ))}
        </div>

        {/* Left amber bar */}
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: "6px",
            background: "linear-gradient(to bottom, #d97706, #92400e)",
          }}
        />

        {/* Top label */}
        <div
          style={{
            position: "absolute",
            top: "52px",
            left: "80px",
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <div
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background: "#d97706",
            }}
          />
          <span
            style={{
              fontSize: "14px",
              color: "#d97706",
              letterSpacing: "6px",
              textTransform: "uppercase",
              fontWeight: 600,
            }}
          >
            Cinematic Wedding Films
          </span>
        </div>

        {/* Main content — centered */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "center",
            flex: 1,
            paddingLeft: "80px",
            paddingRight: "80px",
            paddingTop: "20px",
          }}
        >
          {/* Brand name */}
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: "20px",
              marginBottom: "28px",
            }}
          >
            <span
              style={{
                fontSize: "120px",
                fontWeight: 700,
                color: "white",
                fontFamily: "serif",
                lineHeight: 0.9,
                letterSpacing: "-4px",
              }}
            >
              JOW
            </span>
            <span
              style={{
                fontSize: "48px",
                fontWeight: 300,
                color: "#d97706",
                letterSpacing: "12px",
                textTransform: "uppercase",
                marginBottom: "8px",
              }}
            >
              FILM
            </span>
          </div>

          {/* Tagline */}
          <p
            style={{
              fontSize: "26px",
              color: "#a8a29e",
              margin: 0,
              fontWeight: 300,
              letterSpacing: "1px",
              lineHeight: 1.5,
              maxWidth: "700px",
            }}
          >
            We translate your love story into a{" "}
            <span style={{ color: "#d97706", fontStyle: "italic" }}>
              cinematic masterpiece.
            </span>
          </p>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "24px 80px",
            borderTop: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <span
            style={{
              fontSize: "14px",
              color: "#57534e",
              letterSpacing: "3px",
              textTransform: "uppercase",
            }}
          >
            jowfilm.vn
          </span>
          <div style={{ display: "flex", gap: "32px" }}>
            {["Wedding Highlight", "Traditional Film", "Wedding Reels"].map(
              (label) => (
                <span
                  key={label}
                  style={{
                    fontSize: "13px",
                    color: "#57534e",
                    letterSpacing: "2px",
                    textTransform: "uppercase",
                  }}
                >
                  {label}
                </span>
              )
            )}
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
