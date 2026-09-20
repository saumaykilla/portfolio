import { ImageResponse } from "next/og";

export const alt = "Saumay Killa — Software Developer, AI Engineer, Frontend & Backend";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#F7F1E8",
          color: "#1C1612",
          padding: "64px 72px",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 22,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#C45A38",
            fontWeight: 600,
          }}
        >
          Software Developer · AI Engineer
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 84, fontWeight: 700, letterSpacing: "-0.04em", lineHeight: 1.05 }}>
            Saumay Killa
          </div>
          <div style={{ marginTop: 18, fontSize: 32, color: "#6F675F", maxWidth: 900, lineHeight: 1.35 }}>
            Frontend, backend, and full stack software engineering for AI products and production web apps.
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 24, color: "#C45A38" }}>New York, NY</div>
      </div>
    ),
    size,
  );
}
