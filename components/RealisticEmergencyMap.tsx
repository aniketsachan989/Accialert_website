"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  AlertTriangle,
  Heart,
  MapPin,
  Smartphone,
  PhoneCall,
  Droplet,
  Users,
  Shield,
  Clock,
  CheckCircle2,
  Navigation,
  Sparkles,
  Radio,
  Hospital,
  Car,
  Layers,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Send,
  Siren,
} from "lucide-react";

interface RealisticEmergencyMapProps {
  currentStageIndex: number;
  timerSeconds: number;
  onSelectStage?: (index: number) => void;
}

export default function RealisticEmergencyMap({
  currentStageIndex,
  timerSeconds,
  onSelectStage,
}: RealisticEmergencyMapProps) {
  const [mapMode, setMapMode] = useState<"dark" | "radar" | "satellite">("dark");
  const [zoomLevel, setZoomLevel] = useState(1);
  const [selectedPin, setSelectedPin] = useState<string | null>(null);

  // Auto-select relevant pin based on current stage
  useEffect(() => {
    if (currentStageIndex === 0) setSelectedPin("crash");
    else if (currentStageIndex === 1) setSelectedPin("screen");
    else if (currentStageIndex === 2) setSelectedPin("gps");
    else if (currentStageIndex === 3) setSelectedPin("family");
    else if (currentStageIndex === 4) setSelectedPin("hospital");
  }, [currentStageIndex]);

  return (
    <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] min-h-[380px] bg-[#070b14] rounded-2xl overflow-hidden border border-slate-800 shadow-2xl flex flex-col justify-between">
      {/* 1. REALISTIC VECTOR MAP LAYERS */}
      <div
        className="absolute inset-0 transition-transform duration-700 ease-out"
        style={{ transform: `scale(${zoomLevel})` }}
      >
        {/* Dark Map Canvas with Roads, Waterway, and City Blocks */}
        <svg
          className="w-full h-full"
          viewBox="0 0 1000 600"
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* City Grid Texture */}
            <pattern id="city-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <rect width="40" height="40" fill="#090e1a" />
              <rect x="2" y="2" width="36" height="36" fill="#0d1424" rx="2" />
            </pattern>

            {/* Radar Sweep Gradient */}
            <linearGradient id="radar-sweep" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(239, 68, 68, 0.3)" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>

            {/* Waterway Gradient */}
            <linearGradient id="river-grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#082f49" />
              <stop offset="50%" stopColor="#0369a1" />
              <stop offset="100%" stopColor="#082f49" />
            </linearGradient>

            {/* Glow filters */}
            <filter id="glow-red" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="8" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="glow-cyan" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Base City Blocks Pattern */}
          <rect width="1000" height="600" fill="url(#city-grid)" />

          {/* Curving Natural River / Coastline */}
          <path
            d="M 0 480 C 250 460, 450 560, 700 520 C 850 500, 950 540, 1000 580 L 1000 600 L 0 600 Z"
            fill="url(#river-grad)"
            opacity="0.6"
          />

          {/* City Parks / Green Spaces */}
          <rect x="80" y="80" width="140" height="100" rx="16" fill="#064e3b" opacity="0.4" />
          <text x="100" y="135" fill="#34d399" opacity="0.5" fontSize="12" fontWeight="bold" fontFamily="sans-serif">
            CENTRAL PARK
          </text>

          <rect x="680" y="70" width="160" height="90" rx="16" fill="#064e3b" opacity="0.35" />
          <text x="700" y="120" fill="#34d399" opacity="0.45" fontSize="12" fontWeight="bold" fontFamily="sans-serif">
            NORTH HEIGHTS
          </text>

          {/* Secondary City Streets */}
          <g stroke="#1e293b" strokeWidth="6" strokeLinecap="round">
            <line x1="80" y1="240" x2="920" y2="240" />
            <line x1="80" y1="360" x2="920" y2="360" />
            <line x1="180" y1="40" x2="180" y2="520" />
            <line x1="380" y1="40" x2="380" y2="520" />
            <line x1="620" y1="40" x2="620" y2="520" />
            <line x1="820" y1="40" x2="820" y2="520" />
          </g>

          {/* Street Labels */}
          <g fill="#475569" fontSize="10" fontWeight="600" fontFamily="sans-serif" letterSpacing="1">
            <text x="200" y="234">GRAND AVENUE</text>
            <text x="640" y="354">PARKWAY BLVD</text>
            <text x="390" y="100" transform="rotate(90 390 100)">CENTRAL WAY</text>
            <text x="830" y="100" transform="rotate(90 830 100)">EAST EXPRESSWAY</text>
          </g>

          {/* MAIN EXPRESS HIGHWAY (Curved & Multi-lane with divider) */}
          <g>
            {/* Road Bed */}
            <path
              id="main-highway"
              d="M 0 320 C 220 300, 360 220, 500 240 C 660 260, 820 180, 1000 120"
              fill="none"
              stroke="#334155"
              strokeWidth="24"
              strokeLinecap="round"
            />
            {/* Lane Surface */}
            <path
              d="M 0 320 C 220 300, 360 220, 500 240 C 660 260, 820 180, 1000 120"
              fill="none"
              stroke="#1e293b"
              strokeWidth="20"
              strokeLinecap="round"
            />
            {/* Highway Center Dashed Divider */}
            <path
              d="M 0 320 C 220 300, 360 220, 500 240 C 660 260, 820 180, 1000 120"
              fill="none"
              stroke="#f59e0b"
              strokeWidth="2"
              strokeDasharray="14 10"
            />
          </g>

          {/* SATELLITE RADAR BEAM (Active in Stage 3) */}
          {currentStageIndex >= 2 && (
            <g>
              <circle cx="500" cy="240" r="160" fill="url(#radar-sweep)" opacity="0.3" className="animate-spin origin-[500px_240px]" />
              <line x1="500" y1="0" x2="500" y2="240" stroke="#06b6d4" strokeWidth="2" strokeDasharray="4 4" className="animate-pulse" filter="url(#glow-cyan)" />
              <circle cx="500" cy="240" r="45" fill="none" stroke="#06b6d4" strokeWidth="1.5" strokeDasharray="6 6" className="animate-ping" opacity="0.6" />
            </g>
          )}

          {/* DISPATCH ROUTES (Stages 4 & 5: Active lines traveling along roads) */}
          {currentStageIndex >= 3 && (
            /* Route to Family (Top Right) */
            <path
              d="M 500 240 L 620 240 L 620 120 L 780 120"
              fill="none"
              stroke="#10b981"
              strokeWidth="3.5"
              strokeDasharray="8 6"
              className="animate-pulse"
            />
          )}

          {currentStageIndex === 4 && (
            /* Routes to Blood Banks / Trauma Centers */
            <g>
              {/* Route to City Blood Bank (West) */}
              <path
                d="M 500 240 L 380 240 L 380 360 L 220 360"
                fill="none"
                stroke="#a855f7"
                strokeWidth="4"
                strokeDasharray="10 6"
                className="animate-pulse"
              />
              {/* Route to Regional Trauma Hospital (South-East) */}
              <path
                d="M 500 240 L 620 240 L 620 420 L 760 420"
                fill="none"
                stroke="#a855f7"
                strokeWidth="4"
                strokeDasharray="10 6"
                className="animate-pulse"
              />
            </g>
          )}

          {/* AMBULANCE DISPATCH VEHICLE (Stage 5 Animated Movement) */}
          {currentStageIndex === 4 && (
            <g className="animate-bounce">
              <circle cx="340" cy="300" r="14" fill="#a855f7" opacity="0.3" className="animate-ping" />
              <rect x="330" y="292" width="20" height="14" rx="4" fill="#ffffff" stroke="#a855f7" strokeWidth="2" />
              <text x="334" y="303" fill="#a855f7" fontSize="9" fontWeight="black" fontFamily="sans-serif">
                🚑
              </text>
            </g>
          )}
        </svg>

        {/* 2. REALISTIC INTERACTIVE PINS ON MAP */}

        {/* A. CRASH SITE LOCATION (Coordinates: center 50%, 40%) */}
        <div
          onClick={() => setSelectedPin("crash")}
          className="absolute top-[40%] left-[50%] -translate-x-1/2 -translate-y-1/2 z-30 cursor-pointer group"
        >
          {/* Multi-layered pulsating shockwaves */}
          <span className="absolute -inset-8 rounded-full bg-red-600/30 animate-ping pointer-events-none" />
          <span className="absolute -inset-4 rounded-full bg-red-500/50 animate-pulse pointer-events-none" />

          {/* Crash Pin Badge */}
          <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-red-600 via-red-600 to-amber-600 text-white shadow-2xl border-2 border-white flex items-center justify-center group-hover:scale-110 transition-transform">
            <Car className="w-7 h-7" />
            <span className="absolute -top-2 -right-2 bg-red-600 text-white font-black text-[9px] px-2 py-0.5 rounded-full border border-white uppercase tracking-wider animate-bounce">
              SOS
            </span>
          </div>

          {/* Pin Label */}
          <div className="absolute top-16 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-[#111827]/95 border border-red-500 text-white text-[11px] font-extrabold shadow-xl flex items-center gap-1.5 whitespace-nowrap">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
            <span>Crash Site (Grand Ave)</span>
          </div>
        </div>

        {/* B. FAMILY & TRUSTED CIRCLE HOME PIN (Top Right: 78%, 20%) */}
        <div
          onClick={() => setSelectedPin("family")}
          className={`absolute top-[20%] left-[78%] -translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer transition-all duration-500 ${
            currentStageIndex >= 3 ? "opacity-100 scale-100" : "opacity-45 scale-90"
          }`}
        >
          {currentStageIndex >= 3 && (
            <span className="absolute -inset-3 rounded-full bg-emerald-500/40 animate-ping pointer-events-none" />
          )}
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-700 text-white shadow-xl border-2 border-emerald-300 flex items-center justify-center hover:scale-105 transition-transform">
            <Users className="w-6 h-6" />
          </div>
          <div className="mt-1 px-2.5 py-0.5 rounded-full bg-[#111827]/95 border border-emerald-500 text-emerald-300 text-[10px] font-bold shadow-md whitespace-nowrap flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
            <span>Family Contact (Mom)</span>
          </div>
        </div>

        {/* C. CITY BLOOD BANK FACILITY PIN (West: 22%, 60%) */}
        <div
          onClick={() => setSelectedPin("hospital")}
          className={`absolute top-[60%] left-[22%] -translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer transition-all duration-500 ${
            currentStageIndex === 4 ? "opacity-100 scale-100" : "opacity-45 scale-90"
          }`}
        >
          {currentStageIndex === 4 && (
            <span className="absolute -inset-3 rounded-full bg-purple-500/40 animate-ping pointer-events-none" />
          )}
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-700 text-white shadow-xl border-2 border-purple-300 flex items-center justify-center hover:scale-105 transition-transform">
            <Hospital className="w-6 h-6" />
          </div>
          <div className="mt-1 px-2.5 py-0.5 rounded-full bg-[#111827]/95 border border-purple-500 text-purple-300 text-[10px] font-bold shadow-md whitespace-nowrap flex items-center gap-1">
            <Droplet className="w-3 h-3 fill-purple-400" />
            <span>City Blood Bank (3.2 km)</span>
          </div>
        </div>

        {/* D. REGIONAL TRAUMA HOSPITAL PIN (East: 76%, 70%) */}
        <div
          onClick={() => setSelectedPin("hospital")}
          className={`absolute top-[70%] left-[76%] -translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer transition-all duration-500 ${
            currentStageIndex === 4 ? "opacity-100 scale-100" : "opacity-45 scale-90"
          }`}
        >
          {currentStageIndex === 4 && (
            <span className="absolute -inset-3 rounded-full bg-purple-500/40 animate-ping pointer-events-none" />
          )}
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-600 to-pink-700 text-white shadow-xl border-2 border-purple-300 flex items-center justify-center hover:scale-105 transition-transform">
            <Droplet className="w-6 h-6 fill-white" />
          </div>
          <div className="mt-1 px-2.5 py-0.5 rounded-full bg-[#111827]/95 border border-purple-500 text-purple-300 text-[10px] font-bold shadow-md whitespace-nowrap flex items-center gap-1">
            <Shield className="w-3 h-3 text-purple-400" />
            <span>Trauma Center (4.8 km)</span>
          </div>
        </div>

        {/* 3. DYNAMIC INTERACTIVE STAGE OVERLAYS */}

        {/* STAGE 2: Real Floating Lock Screen Countdown Overlay */}
        <AnimatePresence>
          {currentStageIndex === 1 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.85, x: -20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.85 }}
              className="absolute top-4 left-4 z-40 bg-[#111827]/95 backdrop-blur-md border-2 border-amber-500 rounded-2xl p-4 shadow-2xl max-w-[240px] text-white"
            >
              <div className="flex items-center justify-between border-b border-slate-700 pb-2 mb-2">
                <div className="flex items-center gap-1.5 text-xs font-bold text-amber-400">
                  <Siren className="w-4 h-4 animate-bounce" />
                  <span>EMERGENCY SCREEN</span>
                </div>
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
              </div>
              <div className="text-center py-1">
                <div className="text-3xl font-black font-mono text-white tracking-tight">
                  {timerSeconds}s
                </div>
                <div className="text-[11px] text-slate-300">Safety Countdown Active</div>
              </div>
              <div className="mt-2 pt-2 border-t border-slate-800 space-y-1 text-[11px]">
                <div className="flex items-center justify-between text-amber-300 font-bold">
                  <span>Medical ID:</span>
                  <span className="px-2 py-0.5 rounded bg-red-600 text-white text-[10px] font-mono">
                    Blood O+ (Example)
                  </span>
                </div>
                <div className="text-slate-400 text-[10px]">
                  Loud siren sounding at 100% volume
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* STAGE 4: Real SMS Notification Card Popup */}
        <AnimatePresence>
          {currentStageIndex === 3 && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-4 right-4 z-40 bg-[#111827]/95 backdrop-blur-md border-2 border-emerald-500 rounded-2xl p-3.5 shadow-2xl max-w-[270px] text-left"
            >
              <div className="flex items-center justify-between border-b border-slate-700 pb-1.5 mb-2">
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-400">
                  <Send className="w-3.5 h-3.5" />
                  <span>SOS SMS DELIVERED</span>
                </div>
                <span className="text-[9px] font-mono bg-emerald-950 text-emerald-300 px-1.5 py-0.5 rounded border border-emerald-800">
                  TO: +1 (555) 019-2834
                </span>
              </div>
              <p className="text-[11px] text-slate-200 leading-relaxed font-sans">
                &quot;EMERGENCY: Vehicle crash detected at Grand Ave. Live Map: <strong>maps.google.com/pin</strong>. Blood: O+&quot;
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* STAGE 5: Real Hospital Blood Reservation Card */}
        <AnimatePresence>
          {currentStageIndex === 4 && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20 }}
              className="absolute bottom-4 left-4 z-40 bg-[#111827]/95 backdrop-blur-md border-2 border-purple-500 rounded-2xl p-3.5 shadow-2xl max-w-[280px] text-left"
            >
              <div className="flex items-center justify-between border-b border-slate-700 pb-1.5 mb-2">
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-purple-300">
                  <Hospital className="w-3.5 h-3.5 text-purple-400" />
                  <span>BLOOD DISPATCH ACTIVE</span>
                </div>
                <span className="text-[9px] font-mono bg-purple-950 text-purple-300 px-1.5 py-0.5 rounded border border-purple-800">
                  ETA 4 MINS
                </span>
              </div>
              <p className="text-[11px] text-slate-200 leading-relaxed">
                City Blood Bank confirmed <strong>2 Units of Blood Group O+</strong> reserved and dispatched to crash coordinates.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 4. MAP CONTROL BAR (Top Right) */}
      <div className="absolute top-3 right-3 z-30 flex items-center gap-1.5 bg-[#0B0F19]/90 backdrop-blur-md border border-slate-800 p-1 rounded-xl shadow-lg">
        <button
          onClick={() => setZoomLevel((z) => Math.min(z + 0.15, 1.4))}
          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          title="Zoom In"
          aria-label="Zoom In"
        >
          <ZoomIn className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={() => setZoomLevel((z) => Math.max(z - 0.15, 0.9))}
          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          title="Zoom Out"
          aria-label="Zoom Out"
        >
          <ZoomOut className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={() => setZoomLevel(1)}
          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          title="Reset Zoom"
          aria-label="Reset Zoom"
        >
          <Maximize2 className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* 5. BOTTOM MAP STATUS STRIP */}
      <div className="relative z-20 bg-[#0B0F19]/90 backdrop-blur-md border-t border-slate-800/80 px-4 py-2.5 flex flex-wrap items-center justify-between text-xs text-slate-300">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 font-bold text-white">
            <Radio className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span>High-Precision GPS Map Link</span>
          </div>
          <span className="text-slate-600 hidden sm:inline">•</span>
          <span className="text-slate-400 hidden sm:inline">Grand Ave • 37.7749° N, 122.4194° W</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 rounded-full bg-slate-900 border border-slate-700 text-[10px] font-mono text-emerald-400">
            SIGNAL: LOCKED
          </span>
        </div>
      </div>
    </div>
  );
}
