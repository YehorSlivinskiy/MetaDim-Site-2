import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "MetaDim — преміальне будівництво";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: "#0a0a0b",
          backgroundImage:
            "radial-gradient(circle at 20% 20%, rgba(201,168,76,0.18), transparent 55%), radial-gradient(circle at 80% 80%, rgba(201,168,76,0.10), transparent 50%)",
          display: "flex",
          flexDirection: "column",
          padding: "80px",
          color: "#f4f4f5",
          fontFamily: "system-ui, sans-serif",
          position: "relative",
        }}
      >
        {/* Logo mark */}
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <div style={{ width: 56, height: 14, background: "#c9a84c" }} />
            <div
              style={{ width: 56, height: 14, background: "rgba(201,168,76,0.55)" }}
            />
            <div
              style={{ width: 56, height: 14, background: "rgba(201,168,76,0.25)" }}
            />
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 44,
              fontWeight: 600,
              letterSpacing: 8,
              color: "#f4f4f5",
            }}
          >
            <span>META</span>
            <span style={{ color: "#c9a84c", fontWeight: 300 }}>DIM</span>
          </div>
        </div>

        {/* Title */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: "auto",
            gap: 24,
          }}
        >
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "0 24px",
              fontSize: 92,
              fontWeight: 600,
              lineHeight: 1.0,
              letterSpacing: "-2px",
            }}
          >
            <span>Будуємо</span>
            <span style={{ color: "#c9a84c" }}>на десятиліття</span>
          </div>
          <div
            style={{
              fontSize: 28,
              color: "#a1a1aa",
              maxWidth: 880,
              lineHeight: 1.35,
            }}
          >
            Преміальне будівництво · 27 років досвіду · 340+ об&apos;єктів
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            position: "absolute",
            bottom: 32,
            left: 80,
            right: 80,
            display: "flex",
            justifyContent: "space-between",
            color: "#71717a",
            fontSize: 18,
            letterSpacing: 4,
            textTransform: "uppercase",
          }}
        >
          <div>Преміальне будівництво</div>
          <div>metadim.ua</div>
        </div>
      </div>
    ),
    size,
  );
}
