import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0B0F19",
        card: {
          DEFAULT: "#111827",
          hover: "#1F2937",
          border: "#1E293B",
          subtle: "#161F30",
        },
        emergency: {
          red: "#EF4444",
          "red-dark": "#B91C1C",
          "red-glow": "rgba(239, 68, 68, 0.4)",
          cyan: "#06B6D4",
          "cyan-dark": "#0891B2",
          "cyan-glow": "rgba(6, 182, 212, 0.35)",
          green: "#10B981",
          "green-dark": "#059669",
          "green-glow": "rgba(16, 185, 129, 0.35)",
          amber: "#F59E0B",
          purple: "#8B5CF6",
        },
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "pulse-fast": "pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "radar-ping": "radar 2s cubic-bezier(0, 0, 0.2, 1) infinite",
        "siren-glow": "siren 1.5s ease-in-out infinite alternate",
        "float-slow": "float 6s ease-in-out infinite",
      },
      keyframes: {
        radar: {
          "0%": { transform: "scale(0.8)", opacity: "0.9" },
          "100%": { transform: "scale(2.4)", opacity: "0" },
        },
        siren: {
          "0%": { boxShadow: "0 0 15px rgba(239, 68, 68, 0.3)" },
          "100%": { boxShadow: "0 0 35px rgba(239, 68, 68, 0.85), 0 0 70px rgba(239, 68, 68, 0.4)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "grid-pattern": "linear-gradient(to right, #1e293b 1px, transparent 1px), linear-gradient(to bottom, #1e293b 1px, transparent 1px)",
      },
    },
  },
  plugins: [],
};

export default config;
