"use client";

import {
  ShieldAlert,
  ArrowRight,
  Play,
  Activity,
  Heart,
  PhoneCall,
  Radio,
  Zap,
  MapPin,
  AlertTriangle,
  Clock,
  Sparkles,
  ExternalLink,
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

export default function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden py-12 sm:py-16 lg:py-24 w-full max-w-full">
      {/* Dynamic Background Gradients and Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 sm:w-[650px] h-80 sm:h-[650px] bg-red-600/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-60 sm:w-[450px] h-60 sm:h-[450px] bg-cyan-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-20 right-10 w-60 sm:w-[400px] h-60 sm:h-[400px] bg-emerald-600/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-grid-pattern bg-[size:32px_32px] opacity-15 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center w-full">
          {/* Left Column: Hero Text & Value Proposition */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-center lg:text-left w-full">
            {/* Live Safety Pill Badge */}
            <div className="inline-flex items-center gap-2 sm:gap-2.5 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full bg-slate-900/90 border border-red-500/30 text-xs font-semibold text-red-400 shadow-lg shadow-red-950/40 max-w-full flex-wrap sm:flex-nowrap justify-center sm:justify-start">
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
              </span>
              <span className="tracking-wide uppercase text-[10px] sm:text-[11px] text-slate-200">
                AcciAlert Emergency Safety System
              </span>
              <span className="bg-gradient-to-r from-red-600 to-rose-600 text-white font-bold text-[9px] sm:text-[10px] px-2 py-0.5 rounded-full shadow-sm shrink-0">
                v5.0 Active
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl xl:text-6xl font-black text-white tracking-tight leading-[1.15]">
              Zero-Delay Emergency Detection.{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-500 via-red-400 to-amber-400">
                Instant Life-Saving Response.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-lg xl:text-xl text-slate-300 font-normal leading-relaxed max-w-2xl mx-auto lg:mx-0">
              AI-powered emergency detection bridging the critical golden-hour gap between impact,
              instant family notification, unblockable Medical ID lock screen punch-through,
              and <strong>15 km blood bank & trauma center mobilization</strong>.
            </p>

            {/* Call to Actions with Blood Bank Registration Highlight */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-2 w-full max-w-md mx-auto lg:mx-0">
              <a
                href={PLAY_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl text-sm sm:text-base font-bold text-white bg-gradient-to-r from-emerald-600 via-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-emerald-600 shadow-xl shadow-emerald-950/60 border border-emerald-500/40 transition-all hover:scale-105 active:scale-95 group shrink-0"
              >
                <GooglePlayIcon className="w-4 h-4 sm:w-5 sm:h-5 text-white group-hover:scale-110 transition-transform" />
                <span>Get it on Google Play</span>
                <ExternalLink className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-200" />
              </a>

              <a
                href="/blood-banks/register"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 sm:px-7 py-3.5 sm:py-4 rounded-xl text-sm sm:text-base font-bold text-white bg-gradient-to-r from-red-600 via-red-600 to-rose-700 hover:from-red-500 hover:to-rose-600 border border-red-400/50 shadow-xl shadow-red-950/60 transition-all hover:scale-105 active:scale-95 group shrink-0"
              >
                <span className="text-base sm:text-lg">🩸</span>
                <span>Register Blood Bank</span>
                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-red-200 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="#simulator"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-3 sm:py-4 rounded-xl text-xs sm:text-sm font-semibold text-slate-300 bg-slate-900/80 hover:bg-slate-800 hover:text-white border border-slate-800 hover:border-slate-700 transition-all shrink-0"
              >
                <Play className="w-3.5 h-3.5 text-cyan-400 fill-cyan-400/20" />
                <span>Simulate Flow</span>
              </a>
            </div>

            {/* Simple User-Friendly Benefits Counters Banner */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-4 pt-6 border-t border-slate-800/80 max-w-2xl mx-auto lg:mx-0 w-full">
              <div className="bg-slate-900/60 rounded-xl p-3 sm:p-3.5 border border-slate-800">
                <div className="text-lg sm:text-2xl font-extrabold text-white font-mono">Instant</div>
                <div className="text-[11px] sm:text-xs text-slate-400 mt-0.5 flex items-center gap-1">
                  <Zap className="w-3 h-3 text-amber-400 shrink-0" />
                  <span>Crash Detection</span>
                </div>
              </div>

              <div className="bg-slate-900/60 rounded-xl p-3 sm:p-3.5 border border-slate-800">
                <div className="text-lg sm:text-2xl font-extrabold text-amber-400 font-mono">20 Sec</div>
                <div className="text-[11px] sm:text-xs text-slate-400 mt-0.5 flex items-center gap-1">
                  <Clock className="w-3 h-3 text-amber-400 shrink-0" />
                  <span>Safety Timer</span>
                </div>
              </div>

              <div className="bg-slate-900/60 rounded-xl p-3 sm:p-3.5 border border-slate-800">
                <div className="text-lg sm:text-2xl font-extrabold text-emerald-400 font-mono">Auto SMS</div>
                <div className="text-[11px] sm:text-xs text-slate-400 mt-0.5 flex items-center gap-1">
                  <PhoneCall className="w-3 h-3 text-emerald-400 shrink-0" />
                  <span>Family Alert</span>
                </div>
              </div>

              <div className="bg-slate-900/60 rounded-xl p-3 sm:p-3.5 border border-slate-800">
                <div className="text-lg sm:text-2xl font-extrabold text-cyan-400 font-mono">15 km</div>
                <div className="text-[11px] sm:text-xs text-slate-400 mt-0.5 flex items-center gap-1">
                  <Radio className="w-3 h-3 text-cyan-400 shrink-0" />
                  <span>Blood Search</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Smartphone Mockup with 20-Sec Lock Screen Medical ID Overlay */}
          <div className="lg:col-span-5 flex items-center justify-center w-full max-w-full">
            <div className="relative w-full max-w-[320px] sm:max-w-[380px]">
              {/* Soft, Seamless Radial Emergency Aura behind Phone */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[130%] h-[120%] bg-red-600/20 rounded-full blur-[100px] pointer-events-none -z-10 animate-pulse-slow" />
              <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-rose-500/15 rounded-full blur-[80px] pointer-events-none -z-10" />

              {/* Phone Outer Chassis */}
              <div className="relative bg-[#161f30] border-4 border-slate-700/80 rounded-[44px] p-3 shadow-2xl">
                {/* Speaker ear piece & camera notch */}
                <div className="absolute top-6 left-1/2 -translate-x-1/2 w-28 h-5 bg-[#0B0F19] rounded-full flex items-center justify-center gap-2 z-30 border border-slate-800">
                  <div className="w-3 h-3 rounded-full bg-slate-950 border border-slate-800 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-900/60"></div>
                  </div>
                  <div className="w-10 h-1 bg-slate-800 rounded-full"></div>
                </div>

                {/* Phone Screen Display */}
                <div className="relative bg-[#0a0e17] rounded-[34px] overflow-hidden border border-slate-800 min-h-[580px] flex flex-col justify-between p-5 pt-10 text-white">
                  {/* Top Emergency Siren Banner */}
                  <div className="relative z-10 bg-gradient-to-r from-red-600 to-red-700 rounded-2xl p-3.5 shadow-lg shadow-red-950/60 border border-red-400/40 text-center animate-pulse">
                    <div className="flex items-center justify-center gap-2 text-white font-extrabold text-sm tracking-wider uppercase">
                      <AlertTriangle className="w-5 h-5 animate-bounce" />
                      <span>CRASH DETECTED</span>
                      <AlertTriangle className="w-5 h-5 animate-bounce" />
                    </div>
                    <p className="text-[11px] text-red-100 mt-0.5 font-medium">
                      Lock Screen Override Active • 100% Speaker Volume
                    </p>
                  </div>

                  {/* 20-Second Countdown Dial */}
                  <div className="relative my-4 flex flex-col items-center justify-center">
                    <div className="relative w-36 h-36 flex items-center justify-center">
                      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                        <circle
                          cx="50"
                          cy="50"
                          r="42"
                          stroke="#1f293d"
                          strokeWidth="8"
                          fill="transparent"
                        />
                        <circle
                          cx="50"
                          cy="50"
                          r="42"
                          stroke="#ef4444"
                          strokeWidth="8"
                          strokeDasharray="264"
                          strokeDashoffset="66"
                          strokeLinecap="round"
                          fill="transparent"
                          className="transition-all duration-1000"
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                        <span className="text-4xl font-black text-white font-mono tracking-tighter">
                          14<span className="text-sm font-bold text-red-400">s</span>
                        </span>
                        <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                          Auto-Dispatch
                        </span>
                      </div>
                    </div>
                    <p className="text-[11px] text-slate-400 text-center mt-2 max-w-[240px]">
                      Emergency SOS SMS & Blood Bank Ping will dispatch when timer expires.
                    </p>
                  </div>

                  {/* Unblockable Medical ID Card */}
                  <div className="bg-slate-900/90 border border-slate-700/80 rounded-2xl p-3.5 space-y-2.5 shadow-lg">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-red-600/20 border border-red-500/40 flex items-center justify-center">
                          <Heart className="w-4 h-4 text-red-400" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-white">Rahul Sharma</div>
                          <div className="text-[10px] text-slate-400">Victim Medical Profile</div>
                        </div>
                      </div>
                      <div className="px-2.5 py-1 rounded-md bg-red-600 text-white font-black text-xs font-mono shadow-sm">
                        O+ POS
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-[11px]">
                      <div className="bg-[#0B0F19] p-2 rounded-lg border border-slate-800">
                        <span className="text-slate-500 block text-[9px] uppercase font-semibold">
                          Allergies
                        </span>
                        <span className="text-slate-200 font-medium truncate block">
                          Penicillin, Sulfa
                        </span>
                      </div>
                      <div className="bg-[#0B0F19] p-2 rounded-lg border border-slate-800">
                        <span className="text-slate-500 block text-[9px] uppercase font-semibold">
                          Conditions
                        </span>
                        <span className="text-slate-200 font-medium truncate block">
                          Asthma (Mild)
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between bg-slate-950/80 px-2.5 py-1.5 rounded-lg border border-slate-800 text-[11px]">
                      <span className="text-slate-400 flex items-center gap-1">
                        <PhoneCall className="w-3 h-3 text-emerald-400" />
                        Sunita (Mother)
                      </span>
                      <span className="font-mono text-emerald-400 font-semibold">
                        +91 98765 43210
                      </span>
                    </div>
                  </div>

                  {/* Cancel / Abort Button (Hold to cancel simulation) */}
                  <div className="pt-3">
                    <button
                      onClick={() => alert("Simulation: Cancel button requires 2-second touch hold to prevent accidental victim abort during crash disorientation.")}
                      className="w-full py-2.5 rounded-xl text-xs font-bold text-slate-300 bg-slate-800 hover:bg-slate-700 border border-slate-600 transition-colors flex items-center justify-center gap-1.5"
                    >
                      <span>I AM OKAY — HOLD TO CANCEL (2s)</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
