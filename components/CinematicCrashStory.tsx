"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  AlertTriangle,
  Heart,
  Phone,
  PhoneCall,
  MessageSquare,
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
  Siren,
  Send,
  ArrowRight,
  ZoomIn,
  ZoomOut,
  Maximize2,
} from "lucide-react";
import { playAlertSound, PLAY_STORE_URL } from "@/lib/utils";

// Clearly fake demonstration phone numbers
const FAKE_CONTACTS = {
  primary: { name: "Mom (Primary Contact)", phone: "+1 (555) 019-2834" },
  dad: { name: "Dad", phone: "+1 (555) 014-9921" },
  sister: { name: "Sister", phone: "+1 (555) 018-4432" },
  friend: { name: "Family Friend", phone: "+1 (555) 012-7785" },
};

export default function CinematicCrashStory() {
  // Story playback state (paused by default until user clicks play)
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const animFrameRef = useRef<number | null>(null);
  const lastTimestampRef = useRef<number | null>(null);
  const lastSecondRef = useRef<number>(-1);

  const TOTAL_DURATION = 22; // total seconds for the full story

  // Smooth continuous story animation timer loop (60 FPS)
  useEffect(() => {
    if (!isPlaying) {
      lastTimestampRef.current = null;
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      return;
    }

    const step = (timestamp: number) => {
      if (lastTimestampRef.current === null) {
        lastTimestampRef.current = timestamp;
      }
      const delta = (timestamp - lastTimestampRef.current) / 1000;
      lastTimestampRef.current = timestamp;

      setCurrentTime((prev) => {
        const next = prev + delta;
        if (next >= TOTAL_DURATION) {
          return TOTAL_DURATION;
        }
        return next;
      });

      animFrameRef.current = requestAnimationFrame(step);
    };

    animFrameRef.current = requestAnimationFrame(step);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isPlaying]);

  // Derived story milestones
  const isCarDriving = currentTime < 2.5;
  const isCrashed = currentTime >= 2.5;
  const isCountdownActive = currentTime >= 3.0 && currentTime < 10.0;
  const countdownNumber = Math.max(0, Math.ceil(10 - (currentTime - 3.0) * (10 / 7)));
  const isCallingPrimary = currentTime >= 10.0 && currentTime < 14.0;
  const isSmsSending = currentTime >= 13.5;
  const isBloodMobilized = currentTime >= 16.5;

  // Car position & rotation interpolation along highway path
  const carProgress = Math.min(1, currentTime / 2.5);
  const carX = 80 + carProgress * 400;
  const carY = 320 - carProgress * 80;
  const carAngle = isCarDriving ? -11 : 0; // slight angle while turning on highway

  // Smooth Curved Bezier trajectory for Ambulance (T = 16.5s to 21s)
  // P0(880, 440) -> P1(760, 460) -> P2(620, 300) -> P3(480, 240)
  const ambProgress = Math.max(0, Math.min(1, (currentTime - 16.5) / 4.5));
  const t = ambProgress;
  const ambX =
    Math.pow(1 - t, 3) * 880 +
    3 * Math.pow(1 - t, 2) * t * 760 +
    3 * (1 - t) * Math.pow(t, 2) * 620 +
    Math.pow(t, 3) * 480;
  const ambY =
    Math.pow(1 - t, 3) * 440 +
    3 * Math.pow(1 - t, 2) * t * 460 +
    3 * (1 - t) * Math.pow(t, 2) * 300 +
    Math.pow(t, 3) * 240;
  const dx =
    -3 * Math.pow(1 - t, 2) * 880 +
    3 * (Math.pow(1 - t, 2) - 2 * t * (1 - t)) * 760 +
    3 * (2 * t * (1 - t) - Math.pow(t, 2)) * 620 +
    3 * Math.pow(t, 2) * 480;
  const dy =
    -3 * Math.pow(1 - t, 2) * 440 +
    3 * (Math.pow(1 - t, 2) - 2 * t * (1 - t)) * 460 +
    3 * (2 * t * (1 - t) - Math.pow(t, 2)) * 300 +
    3 * Math.pow(t, 2) * 240;
  const ambAngle = (Math.atan2(dy, dx) * 180) / Math.PI;

  // Realistic SFX sound triggers synced with narrative timeline
  useEffect(() => {
    if (!soundEnabled) return;

    // 1. Crash Impact Sound (T = 2.5s)
    if (currentTime >= 2.45 && currentTime <= 2.6) {
      playAlertSound("crash");
    }

    // 2. Siren & Countdown Ticks during 10s countdown (T = 3s to 10s)
    if (currentTime >= 3.0 && currentTime < 10.0) {
      const currentSec = Math.floor(currentTime);
      if (currentSec !== lastSecondRef.current) {
        lastSecondRef.current = currentSec;
        playAlertSound("tick");
      }
      if (Math.abs(currentTime - 3.2) < 0.1 || Math.abs(currentTime - 6.5) < 0.1) {
        playAlertSound("siren");
      }
    }

    // 3. Phone Dialing Ring Sound (T = 10.0s)
    if (currentTime >= 9.95 && currentTime <= 10.15) {
      playAlertSound("dialing");
    }

    // 4. SMS Sent Chime (T = 13.5s)
    if (currentTime >= 13.45 && currentTime <= 13.65) {
      playAlertSound("sms");
    }

    // 5. Ambulance Siren & Hospital Confirm (T = 16.5s)
    if (currentTime >= 16.45 && currentTime <= 16.65) {
      playAlertSound("ambulance");
    }

    // 6. Success Resolution Chime (T = 20.0s)
    if (currentTime >= 19.95 && currentTime <= 20.15) {
      playAlertSound("success");
    }
  }, [currentTime, soundEnabled]);

  const handleRestart = () => {
    setCurrentTime(0);
    setIsPlaying(true);
    if (soundEnabled) playAlertSound("beep");
  };

  const handleTogglePlay = () => {
    if (currentTime >= TOTAL_DURATION) {
      setCurrentTime(0);
      setIsPlaying(true);
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="space-y-6">
      {/* 1. CINEMATIC NARRATIVE BANNER */}
      <div className="bg-[#111827] border-2 border-slate-800 rounded-3xl p-5 sm:p-6 shadow-2xl glow-card">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div
              className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg transition-colors duration-500 shrink-0 ${
                isCarDriving
                  ? "bg-cyan-600 shadow-cyan-950/60"
                  : isCountdownActive
                  ? "bg-amber-600 shadow-amber-950/60 animate-pulse"
                  : isCallingPrimary
                  ? "bg-emerald-600 shadow-emerald-950/60"
                  : isSmsSending && !isBloodMobilized
                  ? "bg-blue-600 shadow-blue-950/60"
                  : isBloodMobilized
                  ? "bg-purple-600 shadow-purple-950/60 animate-bounce"
                  : "bg-red-600"
              }`}
            >
              {isCarDriving && <Car className="w-6 h-6 animate-pulse" />}
              {isCountdownActive && <Clock className="w-6 h-6" />}
              {isCallingPrimary && <PhoneCall className="w-6 h-6 animate-bounce" />}
              {isSmsSending && !isBloodMobilized && <MessageSquare className="w-6 h-6" />}
              {isBloodMobilized && <Hospital className="w-6 h-6" />}
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase font-mono font-black tracking-widest px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-slate-300">
                  {isCarDriving && "SCENE 1: VEHICLE ON ROAD"}
                  {isCountdownActive && "SCENE 2: SAFETY COUNTDOWN (10s)"}
                  {isCallingPrimary && "SCENE 3: EMERGENCY PHONE CALL"}
                  {isSmsSending && !isBloodMobilized && "SCENE 4: 3x SMS DISPATCH"}
                  {isBloodMobilized && "SCENE 5: BLOOD BANK & AMBULANCE"}
                </span>
                <span className="text-xs font-mono font-bold text-red-400">
                  {currentTime.toFixed(1)}s / {TOTAL_DURATION}s
                </span>
              </div>

              <h3 className="text-lg sm:text-xl font-black text-white mt-1">
                {isCarDriving && "Vehicle cruising on highway before sudden collision..."}
                {isCountdownActive && (
                  <span className="text-amber-300">
                    Impact detected! 10-second safety countdown & siren started ({countdownNumber}s)
                  </span>
                )}
                {isCallingPrimary && (
                  <span className="text-emerald-300">
                    Timer ended: Calling Primary Contact ({FAKE_CONTACTS.primary.name})...
                  </span>
                )}
                {isSmsSending && !isBloodMobilized && (
                  <span className="text-cyan-300">
                    Broadcasting SOS SMS with live map pin to 3 other emergency contacts...
                  </span>
                )}
                {isBloodMobilized && (
                  <span className="text-purple-300">
                    Nearby blood banks alerted • 2 Units of Blood (O+) reserved • Ambulance rushing!
                  </span>
                )}
              </h3>
            </div>
          </div>

          {/* Player controls */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleTogglePlay}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold text-white transition-all shadow-md flex items-center gap-1.5 ${
                isPlaying ? "bg-amber-600 hover:bg-amber-500" : "bg-red-600 hover:bg-red-500"
              }`}
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
              <span>{isPlaying ? "Pause Story" : "Resume Story"}</span>
            </button>

            <button
              onClick={handleRestart}
              className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
              title="Replay from Beginning"
              aria-label="Replay from Beginning"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            <button
              onClick={() => {
                const nextSound = !soundEnabled;
                setSoundEnabled(nextSound);
                if (nextSound) playAlertSound("beep");
              }}
              className={`p-2.5 rounded-xl border transition-colors flex items-center gap-1.5 text-xs font-bold ${
                soundEnabled
                  ? "bg-slate-800 border-cyan-500/50 text-cyan-400"
                  : "bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200"
              }`}
              title={soundEnabled ? "Mute realistic sound effects" : "Enable realistic sound effects"}
              aria-label="Toggle Sound"
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              <span className="hidden sm:inline">{soundEnabled ? "SFX On" : "SFX Off"}</span>
            </button>
          </div>
        </div>

        {/* Story Scrubber Progress Bar */}
        <div className="mt-4 pt-3 border-t border-slate-800">
          <div
            className="relative w-full h-2.5 bg-slate-900 rounded-full overflow-hidden border border-slate-800 cursor-pointer"
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const clickX = e.clientX - rect.left;
              const ratio = Math.max(0, Math.min(1, clickX / rect.width));
              setCurrentTime(ratio * TOTAL_DURATION);
            }}
          >
            <div
              className="h-full bg-gradient-to-r from-red-600 via-amber-500 via-emerald-500 via-blue-500 to-purple-600 transition-all duration-75"
              style={{ width: `${(currentTime / TOTAL_DURATION) * 100}%` }}
            />
          </div>
          {/* Milestone timeline labels */}
          <div className="flex justify-between text-[8px] sm:text-[10px] font-mono text-slate-400 mt-1.5 px-0.5">
            <span>0s: Impact</span>
            <span>3s: Timer</span>
            <span>10s: Call</span>
            <span>14s: SMS</span>
            <span className="hidden xs:inline">17s: Blood</span>
            <span>22s: Done</span>
          </div>
        </div>
      </div>

      {/* 2. REALISTIC SMOOTH MAP CANVAS */}
      <div className="relative w-full aspect-[16/11] sm:aspect-[16/9] min-h-[340px] sm:min-h-[460px] bg-[#070b14] rounded-2xl sm:rounded-3xl overflow-hidden border-2 border-slate-800 shadow-2xl">
        {/* Dynamic Zoom Container */}
        <div
          className="absolute inset-0 transition-transform duration-700 ease-out"
          style={{ transform: `scale(${zoomLevel})` }}
        >
          {/* Rich Vector Map Cartography */}
          <svg
            className="w-full h-full"
            viewBox="0 0 1000 600"
            preserveAspectRatio="xMidYMid slice"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* City Grid Texture */}
              <pattern id="story-city-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <rect width="40" height="40" fill="#080d1a" />
                <rect x="2" y="2" width="36" height="36" fill="#0c1322" rx="3" />
              </pattern>

              {/* Waterway Gradient */}
              <linearGradient id="story-river" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#082f49" />
                <stop offset="50%" stopColor="#0284c7" />
                <stop offset="100%" stopColor="#082f49" />
              </linearGradient>

              {/* Road Glow filter */}
              <filter id="road-glow" x="-10%" y="-10%" width="120%" height="120%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* City Blocks Background */}
            <rect width="1000" height="600" fill="url(#story-city-grid)" />

            {/* Curving Natural River */}
            <path
              d="M 0 500 C 260 480, 480 580, 720 540 C 860 520, 950 550, 1000 580 L 1000 600 L 0 600 Z"
              fill="url(#story-river)"
              opacity="0.55"
            />

            {/* Parks / Green Zones */}
            <rect x="80" y="60" width="160" height="110" rx="20" fill="#064e3b" opacity="0.4" />
            <text x="100" y="120" fill="#34d399" opacity="0.6" fontSize="12" fontWeight="bold">
              CENTRAL PARK
            </text>

            <rect x="740" y="60" width="180" height="90" rx="20" fill="#064e3b" opacity="0.4" />
            <text x="760" y="110" fill="#34d399" opacity="0.6" fontSize="12" fontWeight="bold">
              NORTH RESIDENTIAL
            </text>

            {/* Street Network */}
            <g stroke="#1e293b" strokeWidth="8" strokeLinecap="round">
              <line x1="80" y1="240" x2="920" y2="240" />
              <line x1="80" y1="380" x2="920" y2="380" />
              <line x1="220" y1="40" x2="220" y2="520" />
              <line x1="480" y1="40" x2="480" y2="520" />
              <line x1="720" y1="40" x2="720" y2="520" />
            </g>

            {/* Street Names */}
            <g fill="#475569" fontSize="11" fontWeight="bold" letterSpacing="1">
              <text x="240" y="232">GRAND AVENUE</text>
              <text x="500" y="372">METRO PARKWAY</text>
            </g>

            {/* Curving Highway (Smooth multi-lane expressway) */}
            <path
              d="M 0 340 C 220 320, 360 220, 480 240 C 660 260, 820 180, 1000 120"
              fill="none"
              stroke="#334155"
              strokeWidth="28"
              strokeLinecap="round"
            />
            <path
              d="M 0 340 C 220 320, 360 220, 480 240 C 660 260, 820 180, 1000 120"
              fill="none"
              stroke="#182234"
              strokeWidth="22"
              strokeLinecap="round"
            />
            <path
              d="M 0 340 C 220 320, 360 220, 480 240 C 660 260, 820 180, 1000 120"
              fill="none"
              stroke="#f59e0b"
              strokeWidth="2.5"
              strokeDasharray="16 12"
            />

            {/* Animated Cellular Call Wave to Primary Contact (Scene 3 - Smooth Curving Arc) */}
            {isCallingPrimary && (
              <path
                d="M 480 240 C 580 150, 720 70, 840 100"
                fill="none"
                stroke="#10b981"
                strokeWidth="4.5"
                strokeDasharray="12 8"
                className="animate-pulse"
                filter="url(#road-glow)"
              />
            )}

            {/* Animated 3x SMS Broadcast Waves (Scene 4 - Curving Arcs) */}
            {isSmsSending && (
              <g strokeWidth="3.5" strokeDasharray="10 6" className="animate-pulse" filter="url(#road-glow)">
                {/* To Dad (North West Curving Arc) */}
                <path d="M 480 240 C 360 140, 240 80, 140 120" fill="none" stroke="#06b6d4" />
                {/* To Sister (South West Curving Arc) */}
                <path d="M 480 240 C 440 360, 380 460, 280 460" fill="none" stroke="#06b6d4" />
                {/* To Friend (South East Curving Arc) */}
                <path d="M 480 240 C 620 300, 760 420, 860 380" fill="none" stroke="#06b6d4" />
              </g>
            )}

            {/* Blood Bank & Ambulance Dispatch Routes (Scene 5 - Curving Road Dispatch Paths) */}
            {isBloodMobilized && (
              <g strokeWidth="5" strokeDasharray="14 8" className="animate-pulse" filter="url(#road-glow)">
                {/* City Blood Bank (West Curving Route) */}
                <path d="M 160 380 C 260 420, 380 340, 480 240" fill="none" stroke="#a855f7" />
                {/* Trauma Hospital to Crash (East Curving Route matching Ambulance trajectory) */}
                <path d="M 880 440 C 760 460, 620 300, 480 240" fill="none" stroke="#a855f7" />
              </g>
            )}
          </svg>

          {/* 3. DYNAMIC INTERACTIVE PINS & VEHICLES */}

          {/* A. CAR (Cruising or Crashed) */}
          <div
            className="absolute z-30 -translate-x-1/2 -translate-y-1/2 transition-transform duration-100 ease-linear pointer-events-none"
            style={{
              left: `${(carX / 1000) * 100}%`,
              top: `${(carY / 600) * 100}%`,
              transform: `translate(-50%, -50%) rotate(${carAngle}deg)`,
            }}
          >
            {isCarDriving ? (
              /* Moving Car with Headlights */
              <div className="relative flex items-center">
                {/* Headlight beam */}
                <div className="absolute left-10 w-32 h-16 bg-gradient-to-r from-amber-300/40 to-transparent rounded-full blur-md transform -translate-y-1/2 rotate-[-8deg]" />
                <div className="w-12 h-12 rounded-2xl bg-cyan-600 border-2 border-white text-white shadow-2xl flex items-center justify-center">
                  <Car className="w-6 h-6" />
                </div>
              </div>
            ) : (
              /* Crash Site Beacon with Red Waves */
              <div className="relative flex flex-col items-center">
                <span className="absolute -inset-10 rounded-full bg-red-600/35 animate-ping" />
                <span className="absolute -inset-5 rounded-full bg-red-500/60 animate-pulse" />
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-red-600 to-amber-600 text-white border-2 border-white shadow-2xl flex items-center justify-center animate-bounce">
                  <AlertTriangle className="w-7 h-7" />
                </div>
                <div className="mt-2 px-3 py-1 rounded-full bg-red-950/95 border border-red-500 text-white font-extrabold text-[11px] shadow-2xl flex items-center gap-1.5 whitespace-nowrap">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                  <span>Crash Location (Grand Ave)</span>
                </div>
              </div>
            )}
          </div>

          {/* B. SCENE 2: FLOATING LOCK SCREEN 10s COUNTDOWN OVERLAY */}
          <AnimatePresence>
            {isCountdownActive && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="absolute top-[8%] left-[30%] z-40 bg-[#111827]/95 backdrop-blur-md border-2 border-amber-500 rounded-3xl p-4 shadow-2xl max-w-[260px] text-white"
              >
                <div className="flex items-center justify-between border-b border-slate-700 pb-2 mb-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-amber-400">
                    <Siren className="w-4 h-4 animate-bounce" />
                    <span>EMERGENCY OVERLAY</span>
                  </div>
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
                </div>
                <div className="text-center py-1">
                  <div className="text-4xl font-black font-mono text-white tracking-tight">
                    {countdownNumber}
                    <span className="text-base text-amber-400">s</span>
                  </div>
                  <div className="text-[11px] text-slate-300">Safety Timer Active</div>
                </div>
                <div className="mt-2 pt-2 border-t border-slate-800 space-y-1.5 text-[11px]">
                  <div className="flex items-center justify-between font-bold text-amber-300">
                    <span>Medical Profile:</span>
                    <span className="px-2 py-0.5 rounded bg-red-600 text-white text-[10px] font-mono">
                      Blood: O+ (Example)
                    </span>
                  </div>
                  <div className="text-[10px] text-slate-400">
                    Auto-calling primary contact when timer reaches 0s.
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* C. SCENE 3: PRIMARY CONTACT (Mom) CALLING PIN & DIALOG */}
          <div
            className={`absolute top-[16%] left-[84%] -translate-x-1/2 -translate-y-1/2 z-30 transition-all duration-500 ${
              isCallingPrimary ? "scale-110 opacity-100" : isSmsSending ? "opacity-100" : "opacity-40"
            }`}
          >
            {isCallingPrimary && (
              <span className="absolute -inset-4 rounded-full bg-emerald-500/40 animate-ping" />
            )}
            <div className="w-13 h-13 rounded-2xl bg-emerald-600 text-white border-2 border-emerald-300 shadow-xl flex items-center justify-center p-2.5">
              <PhoneCall className={`w-7 h-7 ${isCallingPrimary ? "animate-bounce" : ""}`} />
            </div>
            <div className="mt-1 px-2.5 py-1 rounded-full bg-[#111827] border border-emerald-500 text-emerald-300 text-[10px] font-bold shadow-md whitespace-nowrap">
              {FAKE_CONTACTS.primary.name}
            </div>
          </div>

          {/* Active Calling Popup */}
          <AnimatePresence>
            {isCallingPrimary && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9, x: 20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="absolute top-[28%] right-4 z-40 bg-[#111827]/95 border-2 border-emerald-500 rounded-2xl p-3.5 shadow-2xl max-w-[270px] text-white"
              >
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs mb-1">
                  <Phone className="w-4 h-4 animate-bounce" />
                  <span>EMERGENCY CALL IN PROGRESS</span>
                </div>
                <div className="text-sm font-black text-white">
                  Calling: {FAKE_CONTACTS.primary.name}
                </div>
                <div className="text-[11px] font-mono text-emerald-300 mt-0.5">
                  {FAKE_CONTACTS.primary.phone}
                </div>
                <div className="text-[10px] text-slate-400 mt-1">
                  Direct cellular call initiated automatically upon 10s timer completion.
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* D. SCENE 4: 3 OTHER EMERGENCY CONTACTS (Dad, Sister, Friend) */}
          {/* Contact 2: Dad */}
          <div
            className={`absolute top-[20%] left-[14%] -translate-x-1/2 -translate-y-1/2 z-20 transition-all duration-500 ${
              isSmsSending ? "opacity-100 scale-100" : "opacity-30 scale-90"
            }`}
          >
            {isSmsSending && <span className="absolute -inset-2 rounded-full bg-cyan-500/40 animate-ping" />}
            <div className="w-10 h-10 rounded-xl bg-cyan-600 text-white border border-cyan-300 flex items-center justify-center shadow-lg">
              <Users className="w-5 h-5" />
            </div>
            <div className="mt-1 px-2 py-0.5 rounded-full bg-[#111827] border border-cyan-500 text-cyan-300 text-[9px] font-bold whitespace-nowrap">
              {FAKE_CONTACTS.dad.name} ({FAKE_CONTACTS.dad.phone})
            </div>
          </div>

          {/* Contact 3: Sister */}
          <div
            className={`absolute top-[75%] left-[28%] -translate-x-1/2 -translate-y-1/2 z-20 transition-all duration-500 ${
              isSmsSending ? "opacity-100 scale-100" : "opacity-30 scale-90"
            }`}
          >
            {isSmsSending && <span className="absolute -inset-2 rounded-full bg-cyan-500/40 animate-ping" />}
            <div className="w-10 h-10 rounded-xl bg-cyan-600 text-white border border-cyan-300 flex items-center justify-center shadow-lg">
              <Users className="w-5 h-5" />
            </div>
            <div className="mt-1 px-2 py-0.5 rounded-full bg-[#111827] border border-cyan-500 text-cyan-300 text-[9px] font-bold whitespace-nowrap">
              {FAKE_CONTACTS.sister.name} ({FAKE_CONTACTS.sister.phone})
            </div>
          </div>

          {/* Contact 4: Friend */}
          <div
            className={`absolute top-[65%] left-[86%] -translate-x-1/2 -translate-y-1/2 z-20 transition-all duration-500 ${
              isSmsSending ? "opacity-100 scale-100" : "opacity-30 scale-90"
            }`}
          >
            {isSmsSending && <span className="absolute -inset-2 rounded-full bg-cyan-500/40 animate-ping" />}
            <div className="w-10 h-10 rounded-xl bg-cyan-600 text-white border border-cyan-300 flex items-center justify-center shadow-lg">
              <Users className="w-5 h-5" />
            </div>
            <div className="mt-1 px-2 py-0.5 rounded-full bg-[#111827] border border-cyan-500 text-cyan-300 text-[9px] font-bold whitespace-nowrap">
              {FAKE_CONTACTS.friend.name} ({FAKE_CONTACTS.friend.phone})
            </div>
          </div>

          {/* SMS Broadcast Notification Card */}
          <AnimatePresence>
            {isSmsSending && !isBloodMobilized && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="absolute top-4 left-4 z-40 bg-[#111827]/95 border-2 border-cyan-500 rounded-2xl p-3.5 shadow-2xl max-w-[290px] text-white text-left"
              >
                <div className="flex items-center gap-1.5 text-cyan-400 font-bold text-xs mb-1">
                  <Send className="w-4 h-4" />
                  <span>3x EMERGENCY SMS DELIVERED</span>
                </div>
                <p className="text-[11px] text-slate-200 leading-relaxed font-sans">
                  &quot;SOS! Vehicle crash detected at Grand Ave. Live Map: <strong>maps.google.com/pin</strong>. Blood Group: O+&quot;
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* E. SCENE 5: NEARBY BLOOD BANKS & MOVING AMBULANCE */}
          {/* City Blood Bank (West: 16%, 62%) */}
          <div
            className={`absolute top-[62%] left-[16%] -translate-x-1/2 -translate-y-1/2 z-30 transition-all duration-500 ${
              isBloodMobilized ? "opacity-100 scale-105" : "opacity-35 scale-90"
            }`}
          >
            {isBloodMobilized && (
              <span className="absolute -inset-3 rounded-full bg-purple-500/40 animate-ping" />
            )}
            <div className="w-12 h-12 rounded-2xl bg-purple-600 text-white border-2 border-purple-300 shadow-xl flex items-center justify-center">
              <Hospital className="w-6 h-6" />
            </div>
            <div className="mt-1 px-2.5 py-0.5 rounded-full bg-[#111827] border border-purple-500 text-purple-300 text-[10px] font-bold whitespace-nowrap flex items-center gap-1">
              <Droplet className="w-3 h-3 fill-purple-400" />
              <span>City Blood Bank (Blood O+ Ready)</span>
            </div>
          </div>

          {/* Regional Trauma Center (East: 88%, 72%) */}
          <div
            className={`absolute top-[72%] left-[88%] -translate-x-1/2 -translate-y-1/2 z-30 transition-all duration-500 ${
              isBloodMobilized ? "opacity-100 scale-105" : "opacity-35 scale-90"
            }`}
          >
            {isBloodMobilized && (
              <span className="absolute -inset-3 rounded-full bg-purple-500/40 animate-ping" />
            )}
            <div className="w-12 h-12 rounded-2xl bg-purple-600 text-white border-2 border-purple-300 shadow-xl flex items-center justify-center">
              <Droplet className="w-6 h-6 fill-white" />
            </div>
            <div className="mt-1 px-2.5 py-0.5 rounded-full bg-[#111827] border border-purple-500 text-purple-300 text-[10px] font-bold whitespace-nowrap flex items-center gap-1">
              <Shield className="w-3 h-3 text-purple-400" />
              <span>Trauma Center (Ambulance Dispatched)</span>
            </div>
          </div>

          {/* Smooth Animated Ambulance Rushing Along Road to Crash Site */}
          {isBloodMobilized && (
            <div
              className="absolute z-40 -translate-x-1/2 -translate-y-1/2 transition-transform duration-75 ease-linear pointer-events-none"
              style={{
                left: `${(ambX / 1000) * 100}%`,
                top: `${(ambY / 600) * 100}%`,
                transform: `translate(-50%, -50%) rotate(${Math.max(-25, Math.min(25, ambAngle + 180))}deg)`,
              }}
            >
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-white text-purple-950 border-2 border-purple-600 shadow-2xl font-black text-xs">
                <span className="text-base animate-bounce">🚑</span>
                <div className="text-left">
                  <div className="text-[10px] font-extrabold uppercase leading-tight text-purple-900">
                    Ambulance En Route
                  </div>
                  <div className="text-[9px] text-purple-600 font-mono">ETA 3m 40s</div>
                </div>
              </div>
            </div>
          )}

          {/* Blood Reservation Final Card */}
          <AnimatePresence>
            {isBloodMobilized && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="absolute bottom-4 left-4 z-40 bg-[#111827]/95 border-2 border-purple-500 rounded-2xl p-4 shadow-2xl max-w-[310px] text-white text-left"
              >
                <div className="flex items-center gap-1.5 text-purple-300 font-bold text-xs mb-1">
                  <Hospital className="w-4 h-4 text-purple-400" />
                  <span>BLOOD BANK MOBILIZATION CONFIRMED</span>
                </div>
                <p className="text-[11px] text-slate-200 leading-relaxed">
                  2 Units of <strong>Blood Group O+</strong> reserved at City Blood Bank. Paramedics equipped and ready on site.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Initial Paused State Big Play Button Overlay */}
        {!isPlaying && currentTime === 0 && (
          <div className="absolute inset-0 z-40 bg-black/60 backdrop-blur-[2px] flex flex-col items-center justify-center p-6 text-center">
            <button
              onClick={() => {
                setIsPlaying(true);
                if (soundEnabled) playAlertSound("beep");
              }}
              className="group relative flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-tr from-red-600 to-rose-600 text-white shadow-2xl shadow-red-900/80 border-4 border-white/90 hover:scale-110 active:scale-95 transition-all duration-300"
              aria-label="Start Highway Crash Simulation"
            >
              <Play className="w-9 h-9 fill-white ml-1 group-hover:scale-110 transition-transform" />
              <span className="absolute -inset-3 rounded-full border-2 border-red-500/50 animate-ping pointer-events-none" />
            </button>
            <h4 className="text-xl font-black text-white mt-4 tracking-tight">
              Road Accident Emergency Scenario
            </h4>
            <p className="text-xs text-slate-300 max-w-sm mt-1 leading-relaxed">
              Click to start the 1-flow real-time emergency response simulation with live audio and vehicle physics.
            </p>
          </div>
        )}

        {/* Zoom Controls */}
        <div className="absolute top-3 right-3 z-30 flex items-center gap-1 bg-[#0B0F19]/90 backdrop-blur-md border border-slate-800 p-1 rounded-xl shadow-lg">
          <button
            onClick={() => setZoomLevel((z) => Math.min(z + 0.15, 1.35))}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
            title="Zoom In"
            aria-label="Zoom In"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setZoomLevel((z) => Math.max(z - 0.15, 0.9))}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
            title="Zoom Out"
            aria-label="Zoom Out"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setZoomLevel(1)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
            title="Reset Zoom"
            aria-label="Reset Zoom"
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Bottom Story Status Bar */}
        <div className="relative z-20 bg-[#0B0F19]/95 backdrop-blur-md border-t border-slate-800 px-5 py-3 flex flex-wrap items-center justify-between text-xs text-slate-300">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 font-bold text-white">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
              <span>Full Emergency Sequence (1 Seamless Flow)</span>
            </div>
            <span className="text-slate-600 hidden sm:inline">•</span>
            <span className="text-slate-400 hidden sm:inline">
              Detection → 10s Timer → Call Primary → SMS 3 Contacts → Blood Reserve
            </span>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={PLAY_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[11px] transition-colors shadow-md"
            >
              Get Free on Play Store ↗
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
