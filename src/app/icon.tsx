import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#0a0a0b",
          display: "flex",
          flexDirection: "column",
          gap: 2,
          padding: 5,
          alignItems: "stretch",
          justifyContent: "center",
        }}
      >
        <div style={{ height: 6, background: "#c9a84c" }} />
        <div style={{ height: 6, background: "rgba(201,168,76,0.55)" }} />
        <div style={{ height: 6, background: "rgba(201,168,76,0.25)" }} />
      </div>
    ),
    size,
  );
}
