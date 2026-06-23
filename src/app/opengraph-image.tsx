import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "KSpace — 思考 · 构建 · 分享";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          background: "linear-gradient(135deg, #09090B 0%, #1E1B4B 100%)",
          fontFamily: "system-ui, sans-serif",
          padding: 80,
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.03,
            backgroundImage:
              "linear-gradient(rgba(99,102,241,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.5) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginBottom: 32,
          }}
        >
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: 12,
              background: "linear-gradient(135deg, #6366F1, #8B5CF6)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 24,
              fontWeight: 700,
              color: "white",
            }}
          >
            K
          </div>
          <span
            style={{
              fontSize: 36,
              fontWeight: 700,
              color: "#6366F1",
              letterSpacing: "-0.02em",
            }}
          >
            KSpace
          </span>
        </div>
        <h1
          style={{
            fontSize: 72,
            fontWeight: 800,
            letterSpacing: "-0.03em",
            color: "white",
            textAlign: "center",
            lineHeight: 1.1,
            marginBottom: 16,
          }}
        >
          思考 · 构建 · 分享
        </h1>
        <p
          style={{
            fontSize: 28,
            color: "rgba(255,255,255,0.5)",
            textAlign: "center",
            maxWidth: 700,
          }}
        >
          一个全栈开发者的个人技术空间
        </p>
      </div>
    ),
    { ...size }
  );
}
