"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Smartphone,
  ShieldCheck,
  Heart,
  Radio,
  ExternalLink,
  Zap,
  Activity,
  CheckCircle2,
  Lock,
  PhoneCall,
  MapPin,
} from "lucide-react";
import { PLAY_STORE_URL } from "@/lib/utils";

// Google Play icon SVG
function GooglePlayIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 512 512" className={className} fill="currentColor">
      <path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z" />
    </svg>
  );
}

const SCREENS = [
  {
    id: "home",
    title: "AcciAlert Safety Dashboard",
    tagline: "Live Sensor Monitoring, 1-Tap SOS & Blood Radar",
    image: "/app-screens/screen-home.png",
    accent: "text-emerald-400 border-emerald-500/40 bg-emerald-950/30",
    badge: "PROTECTION ACTIVE • v5.0",
    badgeColor: "bg-emerald-500 text-black",
    features: [
      "Real-time on-device collision and impact sensor monitoring loop.",
      "Instant 'TRIGGER SOS ALARM' manual override with 100% emergency siren.",
      "Live 15 km GPS radius radar connecting to nearby verified blood banks.",
      "Accident Detection stay-alive service optimized for Android 14+.",
    ],
  },
  {
    id: "profile",
    title: "Paramedic Medical ID Profile",
    tagline: "Unblockable Lock Screen Emergency Record",
    image: "/app-screens/screen-profile.png",
    accent: "text-red-400 border-red-500/40 bg-red-950/30",
    badge: "VERIFIED BLOOD GROUP: B+",
    badgeColor: "bg-red-600 text-white",
    features: [
      "Displays verified Blood Group (B+), critical allergies, and medications.",
      "Instant paramedic responder instructions displayed immediately upon impact.",
      "Automated compatibility matching with regional blood bank reserves.",
      "Emergency contact priority link with one-tap calling.",
    ],
  },
];

export default function AppShowcase() {
  const [activeTab, setActiveTab] = useState<"home" | "profile">("home");

  const currentScreen = SCREENS.find((s) => s.id === activeTab) || SCREENS[0];

  return (
    <section id="app-screens" className="py-20 lg:py-28 bg-[#0a0e17] border-t border-slate-800/80 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-emerald-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-red-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-700 text-xs font-semibold text-slate-300 mb-4 shadow-sm">
            <div className="w-4 h-4 rounded-full overflow-hidden shrink-0">
              <Image src="/logo.png" alt="Logo" width={16} height={16} className="w-full h-full object-contain" />
            </div>
            <span>OFFICIAL ANDROID APP v5.0 INTERFACE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Designed for Instant Clarity When Seconds Count
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-400 leading-relaxed">
            Take a look inside the native AcciAlert Android application. Engineered with a dark,
            high-contrast interface designed for rapid emergency comprehension.
          </p>

          {/* Interactive Screen Switcher Tabs */}
          <div className="inline-flex p-1.5 rounded-2xl bg-[#111827] border border-slate-800 mt-8 gap-2">
            <button
              onClick={() => setActiveTab("home")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeTab === "home"
                  ? "bg-emerald-600 text-white shadow-lg shadow-emerald-950/60 scale-[1.02]"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Activity className="w-4 h-4" />
              <span>Safety Dashboard</span>
            </button>
            <button
              onClick={() => setActiveTab("profile")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeTab === "profile"
                  ? "bg-red-600 text-white shadow-lg shadow-red-950/60 scale-[1.02]"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Heart className="w-4 h-4" />
              <span>Medical ID & Profile</span>
            </button>
          </div>
        </div>

        {/* Dynamic Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Interactive Phone Device Showcase */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="relative w-full max-w-[310px] sm:max-w-[340px]">
              {/* Pulsing ambient backdrop glow */}
              <div
                className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[130%] h-[115%] rounded-full blur-[90px] opacity-60 transition-colors duration-500 pointer-events-none -z-10 ${
                  activeTab === "home" ? "bg-emerald-500/25" : "bg-red-500/25"
                }`}
              />

              {/* Smartphone Chassis Frame */}
              <div className="relative bg-[#161f30] border-4 border-slate-700/80 rounded-[44px] p-2.5 shadow-2xl">
                {/* Notch */}
                <div className="absolute top-5 left-1/2 -translate-x-1/2 w-24 h-4 bg-[#0B0F19] rounded-full flex items-center justify-center gap-2 z-30 border border-slate-800">
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-950 border border-slate-800"></div>
                  <div className="w-8 h-1 bg-slate-800 rounded-full"></div>
                </div>

                {/* Screenshot Frame */}
                <div className="relative bg-black rounded-[36px] overflow-hidden border border-slate-800 aspect-[9/19.5]">
                  <Image
                    src={currentScreen.image}
                    alt={currentScreen.title}
                    width={1080}
                    height={2340}
                    className="w-full h-full object-cover object-top transition-opacity duration-300"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Deep-Dive Feature Breakdown */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold tracking-wider uppercase border bg-[#111827] border-slate-700 text-slate-300">
                <span className={`w-2 h-2 rounded-full ${activeTab === "home" ? "bg-emerald-400 animate-pulse" : "bg-red-500 animate-pulse"}`} />
                <span>{currentScreen.badge}</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                {currentScreen.title}
              </h3>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                {currentScreen.tagline}
              </p>
            </div>

            {/* Feature Checklist */}
            <div className="bg-[#111827] border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xl glow-card">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider font-mono">
                Key System Capabilities
              </h4>
              <ul className="space-y-3.5">
                {currentScreen.features.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-200">
                    <CheckCircle2
                      className={`w-5 h-5 shrink-0 mt-0.5 ${
                        activeTab === "home" ? "text-emerald-400" : "text-red-400"
                      }`}
                    />
                    <span className="leading-relaxed">{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick Play Store CTA */}
            <div className="pt-2">
              <a
                href={PLAY_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-xl text-base font-bold text-white bg-gradient-to-r from-emerald-600 via-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-emerald-600 shadow-xl shadow-emerald-950/60 border border-emerald-500/40 transition-all hover:scale-105 active:scale-95 group"
              >
                <GooglePlayIcon className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
                <span>Install from Google Play</span>
                <ExternalLink className="w-4 h-4 text-emerald-200" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
