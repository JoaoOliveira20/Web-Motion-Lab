import { ImageResponse } from "next/og";

export const alt = "Web Motion Lab";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0b0b0c",
          padding: "72px",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 22,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "#918f88",
          }}
        >
          Laboratório experimental de front-end
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: 128,
            fontWeight: 700,
            lineHeight: 1,
            letterSpacing: -2,
            color: "#f4f3ef",
          }}
        >
          <span>WEB MOTION</span>
          <span style={{ color: "#ff4d1c" }}>LAB</span>
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 22,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "#918f88",
          }}
        >
          16 bibliotecas · 7 composições · 1 showcase
        </div>
      </div>
    ),
    size,
  );
}
