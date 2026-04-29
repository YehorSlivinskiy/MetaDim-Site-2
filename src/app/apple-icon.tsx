import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#0a0a0b",
          display: "flex",
          flexDirection: "column",
          gap: 10,
          padding: 30,
          alignItems: "stretch",
          justifyContent: "center",
        }}
      >
        <div style={{ height: 36, background: "#c9a84c", borderRadius: 4 }} />
        <div
          style={{
            height: 36,
            background: "rgba(201,168,76,0.55)",
            borderRadius: 4,
          }}
        />
        <div
          style={{
            height: 36,
            background: "rgba(201,168,76,0.25)",
            borderRadius: 4,
          }}
        />
      </div>
    ),
    size,
  );
}
