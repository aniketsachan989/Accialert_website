import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "AcciAlert | AI Zero-Delay Crash Detection & Emergency Response Network";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#0B0F19",
          padding: "60px 80px",
          fontFamily: "system-ui, -apple-system, sans-serif",
          position: "relative",
        }}
      >
        {/* Background glow accents */}
        <div
          style={{
            position: "absolute",
            top: "-100px",
            right: "-100px",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            backgroundColor: "rgba(239, 68, 68, 0.15)",
            filter: "blur(100px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-100px",
            left: "-100px",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            backgroundColor: "rgba(6, 182, 212, 0.12)",
            filter: "blur(100px)",
          }}
        />

        {/* Top Bar: Brand + Version Badge */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", zIndex: 10 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div
              style={{
                width: "56px",
                height: "56px",
                borderRadius: "16px",
                backgroundColor: "#000",
                border: "2px solid #334155",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "28px",
                fontWeight: "900",
                color: "#EF4444",
              }}
            >
              🚨
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: "32px", fontWeight: "900", color: "#FFF", letterSpacing: "-0.5px" }}>
                ACCI<span style={{ color: "#EF4444" }}>ALERT</span>
              </span>
              <span style={{ fontSize: "14px", color: "#94A3B8", letterSpacing: "1px" }}>
                EMERGENCY RESPONSE ECOSYSTEM
              </span>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              backgroundColor: "rgba(239, 68, 68, 0.15)",
              border: "1px solid rgba(239, 68, 68, 0.4)",
              padding: "8px 18px",
              borderRadius: "999px",
              color: "#FCA5A5",
              fontSize: "15px",
              fontWeight: "700",
            }}
          >
            <div
              style={{
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                backgroundColor: "#EF4444",
              }}
            />
            <span>v5.0 Pro Active</span>
          </div>
        </div>

        {/* Main Headline */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px", zIndex: 10, maxWidth: "1000px" }}>
          <h1
            style={{
              fontSize: "52px",
              fontWeight: "900",
              color: "#FFFFFF",
              lineHeight: 1.15,
              margin: 0,
              letterSpacing: "-1px",
            }}
          >
            Zero-Delay Crash Detection &amp; 15km Blood Mobilization
          </h1>
          <p style={{ fontSize: "22px", color: "#CBD5E1", lineHeight: 1.4, margin: 0 }}>
            AI-powered on-device edge crash detection, unblockable 20s lock screen medical ID overlay, and automated
            golden-hour emergency dispatch.
          </p>
        </div>

        {/* Bottom Feature Badges */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px", zIndex: 10 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              backgroundColor: "#111827",
              border: "1px solid #1E293B",
              padding: "12px 20px",
              borderRadius: "14px",
              color: "#F8FAFC",
              fontSize: "16px",
              fontWeight: "600",
            }}
          >
            <span>⚡ 50Hz Sensor Fusion</span>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              backgroundColor: "#111827",
              border: "1px solid #1E293B",
              padding: "12px 20px",
              borderRadius: "14px",
              color: "#F8FAFC",
              fontSize: "16px",
              fontWeight: "600",
            }}
          >
            <span>🛡️ Medical ID Lock Screen</span>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              backgroundColor: "#111827",
              border: "1px solid #1E293B",
              padding: "12px 20px",
              borderRadius: "14px",
              color: "#F8FAFC",
              fontSize: "16px",
              fontWeight: "600",
            }}
          >
            <span>🩸 15km Blood Radar</span>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              backgroundColor: "#111827",
              border: "1px solid #1E293B",
              padding: "12px 20px",
              borderRadius: "14px",
              color: "#34D399",
              fontSize: "16px",
              fontWeight: "700",
            }}
          >
            <span>▶ Google Play Available</span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
