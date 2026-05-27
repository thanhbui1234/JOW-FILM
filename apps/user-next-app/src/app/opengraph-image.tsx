import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Holte Platform";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)",
          padding: "60px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "80px",
            height: "80px",
            background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
            borderRadius: "16px",
            marginBottom: "32px",
          }}
        >
          <span style={{ fontSize: "48px", fontWeight: 700, color: "white" }}>
            H
          </span>
        </div>

        <h1
          style={{
            fontSize: "64px",
            fontWeight: 700,
            color: "white",
            margin: "0 0 16px 0",
            textAlign: "center",
          }}
        >
          Holte Platform
        </h1>

        <p
          style={{
            fontSize: "28px",
            color: "#a1a1aa",
            margin: 0,
            textAlign: "center",
            maxWidth: "800px",
          }}
        >
          A modern video platform for developers and businesses
        </p>
      </div>
    ),
    { ...size }
  );
}
