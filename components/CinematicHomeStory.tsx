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
  Home,
  Siren,
  Send,
  ArrowRight,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Activity,
  UserCheck,
} from "lucide-react";
import { playAlertSound, PLAY_STORE_URL } from "@/lib/utils";

// Clearly fake demonstration contacts for home scenario
const HOME_CONTACTS = {
  primary: { name: "Sarah (Daughter & Caregiver)", phone: "+1 (555) 019-2834" },
  son: { name: "David (Son)", phone: "+1 (555) 014-9921" },
  neighbor: { name: "Mrs. Jenkins (Trusted Neighbor)", phone: "+1 (555) 018-4432" },
  doctor: { name: "Dr. Evans (Family Physician)", phone: "+1 (555) 012-7785" },
};

export default function CinematicHomeStory() {
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
  const isWalking = currentTime < 2.5;
  const isFallen = currentTime >= 2.5;
  const isCountdownActive = currentTime >= 3.0 && currentTime < 10.0;
  const countdownNumber = Math.max(0, Math.ceil(10 - (currentTime - 3.0) * (10 / 7)));
  const isCallingPrimary = currentTime >= 10.0 && currentTime < 14.0;
  const isSmsSending = currentTime >= 13.5;
  const isParamedicDispatched = currentTime >= 16.5;

  // Person walking position inside living room (T = 0s to 2.5s)
  const walkProgress = Math.min(1, currentTime / 2.5);
  const personX = 380 + walkProgress * 100;
  const personY = 240 + walkProgress * 20;

  // Smooth Curved Bezier trajectory for Paramedic First Responder (T = 16.5s to 21s)
  // P0(860, 440) -> P1(740, 460) -> P2(600, 320) -> P3(480, 260)
  const respProgress = Math.max(0, Math.min(1, (currentTime - 16.5) / 4.5));
  const t = respProgress;
  const respX =
    Math.pow(1 - t, 3) * 860 +
    3 * Math.pow(1 - t, 2) * t * 740 +
    3 * (1 - t) * Math.pow(t, 2) * 600 +
    Math.pow(t, 3) * 480;
  const respY =
    Math.pow(1 - t, 3) * 440 +
    3 * Math.pow(1 - t, 2) * t * 460 +
    3 * (1 - t) * Math.pow(t, 2) * 320 +
    Math.pow(t, 3) * 260;
  const dx =
    -3 * Math.pow(1 - t, 2) * 860 +
    3 * (Math.pow(1 - t, 2) - 2 * t * (1 - t)) * 740 +
    3 * (2 * t * (1 - t) - Math.pow(t, 2)) * 600 +
    3 * Math.pow(t, 2) * 480;
  const dy =
    -3 * Math.pow(1 - t, 2) * 440 +
    3 * (Math.pow(1 - t, 2) - 2 * t * (1 - t)) * 460 +
    3 * (2 * t * (1 - t) - Math.pow(t, 2)) * 320 +
    3 * Math.pow(t, 2) * 260;
  const respAngle = (Math.atan2(dy, dx) * 180) / Math.PI;

  // Realistic SFX sound triggers synced with narrative timeline
  useEffect(() => {
    if (!soundEnabled) return;

    // 1. Sudden Fall Impact (T = 2.5s)
    if (currentTime >= 2.45 && currentTime <= 2.6) {
      playAlertSound("crash");
    }

    // 2. Loud In-Home Siren & Countdown Ticks (T = 3s to 10s)
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

    // 3. Phone Dialing to Caregiver (T = 10.0s)
    if (currentTime >= 9.95 && currentTime <= 10.15) {
      playAlertSound("dialing");
    }

    // 4. SMS Broadcast to Family & Neighbors (T = 13.5s)
    if (currentTime >= 13.45 && currentTime <= 13.65) {
      playAlertSound("sms");
    }

    // 5. Paramedic Dispatch Siren (T = 16.5s)
    if (currentTime >= 16.45 && currentTime <= 16.65) {
      playAlertSound("ambulance");
    }

    // 6. Resolution Chime (T = 20.0s)
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
                isWalking
                  ? "bg-amber-600 shadow-amber-950/60"
                  : isCountdownActive
                  ? "bg-red-600 shadow-red-950/60 animate-pulse"
                  : isCallingPrimary
                  ? "bg-emerald-600 shadow-emerald-950/60"
                  : isSmsSending && !isParamedicDispatched
                  ? "bg-blue-600 shadow-blue-950/60"
                  : isParamedicDispatched
                  ? "bg-purple-600 shadow-purple-950/60 animate-bounce"
                  : "bg-red-600"
              }`}
            >
              {isWalking && <Home className="w-6 h-6 animate-pulse" />}
              {isCountdownActive && <Clock className="w-6 h-6" />}
              {isCallingPrimary && <PhoneCall className="w-6 h-6 animate-bounce" />}
              {isSmsSending && !isParamedicDispatched && <MessageSquare className="w-6 h-6" />}
              {isParamedicDispatched && <Hospital className="w-6 h-6" />}
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase font-mono font-black tracking-widest px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-slate-300">
                  {isWalking && "SCENE 1: SOLO RESIDENT AT HOME"}
                  {isCountdownActive && "SCENE 2: FALL DETECTED & 10s SIREN"}
                  {isCallingPrimary && "SCENE 3: AUTO-CALLING CAREGIVER"}
                  {isSmsSending && !isParamedicDispatched && "SCENE 4: APARTMENT ACCESS SMS"}
                  {isParamedicDispatched && "SCENE 5: PARAMEDIC & BLOOD DISPATCH"}
                </span>
                <span className="text-xs font-mono font-bold text-amber-400">
                  {currentTime.toFixed(1)}s / {TOTAL_DURATION}s
                </span>
              </div>

              <h3 className="text-lg sm:text-xl font-black text-white mt-1">
                {isWalking && "Resident moving around living room before sudden slip & fall..."}
                {isCountdownActive && (
                  <span className="text-red-400">
                    Severe fall impact detected! Loud in-home siren sounding ({countdownNumber}s countdown)
                  </span>
                )}
                {isCallingPrimary && (
                  <span className="text-emerald-300">
                    Timer ended: Placing direct emergency call to Caregiver ({HOME_CONTACTS.primary.name})...
                  </span>
                )}
                {isSmsSending && !isParamedicDispatched && (
                  <span className="text-cyan-300">
                    Sending emergency SMS with apartment door code to family & neighbor...
                  </span>
                )}
                {isParamedicDispatched && (
                  <span className="text-purple-300">
                    Local Emergency Medical Services en route • Hospital Blood Bank pre-alerted!
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
                  ? "bg-slate-800 border-amber-500/50 text-amber-400"
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
              className="h-full bg-gradient-to-r from-amber-500 via-red-500 via-emerald-500 via-blue-500 to-purple-600 transition-all duration-75"
              style={{ width: `${(currentTime / TOTAL_DURATION) * 100}%` }}
            />
          </div>
          {/* Milestone timeline labels */}
          <div className="flex justify-between text-[8px] sm:text-[10px] font-mono text-slate-400 mt-1.5 px-0.5">
            <span>0s: Fall</span>
            <span>3s: Siren</span>
            <span>10s: Call</span>
            <span>14s: SMS</span>
            <span className="hidden xs:inline">17s: Paramedic</span>
            <span>22s: Done</span>
          </div>
        </div>
      </div>

      {/* 2. REALISTIC RESIDENTIAL MAP & HOME FLOORPLAN CANVAS */}
      <div className="relative w-full aspect-[16/11] sm:aspect-[16/9] min-h-[340px] sm:min-h-[460px] bg-[#070b14] rounded-2xl sm:rounded-3xl overflow-hidden border-2 border-slate-800 shadow-2xl">
        {/* Dynamic Zoom Container */}
        <div
          className="absolute inset-0 transition-transform duration-700 ease-out"
          style={{ transform: `scale(${zoomLevel})` }}
        >
          {/* Map Vector Graphic (Residential Neighborhood & Detailed Floorplan) */}
          <svg
            className="w-full h-full"
            viewBox="0 0 1000 600"
            preserveAspectRatio="xMidYMid slice"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* Floorplan Blueprint Grid */}
              <pattern id="home-blueprint-grid" width="30" height="30" patternUnits="userSpaceOnUse">
                <rect width="30" height="30" fill="#090e1a" />
                <rect x="1" y="1" width="28" height="28" fill="#0d1527" rx="2" />
              </pattern>

              {/* Glowing Road Filter */}
              <filter id="home-glow" x="-10%" y="-10%" width="120%" height="120%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Neighborhood Blocks Background */}
            <rect width="1000" height="600" fill="url(#home-blueprint-grid)" />

            {/* Residential Streets Network */}
            <g stroke="#1e293b" strokeWidth="8" strokeLinecap="round">
              <line x1="80" y1="200" x2="920" y2="200" />
              <line x1="80" y1="400" x2="920" y2="400" />
              <line x1="200" y1="40" x2="200" y2="540" />
              <line x1="720" y1="40" x2="720" y2="540" />
            </g>

            {/* Street Names */}
            <g fill="#475569" fontSize="11" fontWeight="bold" letterSpacing="1">
              <text x="220" y="192">MAPLE RESIDENTIAL WAY</text>
              <text x="540" y="392">SUNSET BOULEVARD</text>
            </g>

            {/* RESIDENTIAL APARTMENT BUILDING FLOORPLAN (Center) */}
            <g>
              {/* Outer Building Walls */}
              <rect
                x="320"
                y="140"
                width="320"
                height="220"
                rx="16"
                fill="#111827"
                stroke="#3b82f6"
                strokeWidth="3"
                opacity="0.9"
              />

              {/* Floorplan Internal Rooms */}
              {/* Living Room (Center-Right) */}
              <rect x="440" y="155" width="185" height="190" rx="8" fill="#1e293b" opacity="0.6" />
              <text x="490" y="180" fill="#94a3b8" fontSize="10" fontWeight="bold">
                LIVING ROOM (Apt 4B)
              </text>

              {/* Bedroom (Left) */}
              <rect x="335" y="155" width="95" height="110" rx="8" fill="#1e293b" opacity="0.4" />
              <text x="350" y="180" fill="#64748b" fontSize="9" fontWeight="bold">
                BEDROOM
              </text>

              {/* Kitchen / Hallway (Bottom-Left) */}
              <rect x="335" y="275" width="95" height="70" rx="8" fill="#1e293b" opacity="0.4" />
              <text x="355" y="315" fill="#64748b" fontSize="9" fontWeight="bold">
                KITCHEN
              </text>
            </g>

            {/* Curving Cellular Radio Arcs to Caregiver (Scene 3) */}
            {isCallingPrimary && (
              <path
                d="M 480 260 C 580 160, 720 80, 840 100"
                fill="none"
                stroke="#10b981"
                strokeWidth="4.5"
                strokeDasharray="12 8"
                className="animate-pulse"
                filter="url(#home-glow)"
              />
            )}

            {/* Curving 3x SMS Broadcast Waves (Scene 4) */}
            {isSmsSending && (
              <g strokeWidth="3.5" strokeDasharray="10 6" className="animate-pulse" filter="url(#home-glow)">
                {/* To Son (North West Curving Arc) */}
                <path d="M 480 260 C 340 160, 220 90, 140 110" fill="none" stroke="#06b6d4" />
                {/* To Trusted Neighbor (South West Curving Arc) */}
                <path d="M 480 260 C 420 380, 360 480, 260 480" fill="none" stroke="#06b6d4" />
                {/* To Family Doctor (South East Curving Arc) */}
                <path d="M 480 260 C 620 320, 760 440, 860 400" fill="none" stroke="#06b6d4" />
              </g>
            )}

            {/* Paramedic & Emergency Dispatch Route (Scene 5) */}
            {isParamedicDispatched && (
              <path
                d="M 860 440 C 740 460, 600 320, 480 260"
                fill="none"
                stroke="#a855f7"
                strokeWidth="5"
                strokeDasharray="14 8"
                className="animate-pulse"
                filter="url(#home-glow)"
              />
            )}
          </svg>

          {/* 3. DYNAMIC INTERACTIVE PINS & RESIDENTS */}

          {/* A. RESIDENT PERSON (Walking or Fallen in Living Room) */}
          <div
            className="absolute z-30 -translate-x-1/2 -translate-y-1/2 transition-transform duration-100 ease-linear pointer-events-none"
            style={{
              left: `${(personX / 1000) * 100}%`,
              top: `${(personY / 600) * 100}%`,
            }}
          >
            {isWalking ? (
              /* Moving Resident Avatar */
              <div className="relative flex items-center">
                <div className="w-11 h-11 rounded-2xl bg-amber-600 border-2 border-white text-white shadow-2xl flex items-center justify-center">
                  <UserCheck className="w-6 h-6" />
                </div>
              </div>
            ) : (
              /* Fall Impact Site Beacon with Shockwaves */
              <div className="relative flex flex-col items-center">
                <span className="absolute -inset-10 rounded-full bg-red-600/35 animate-ping" />
                <span className="absolute -inset-5 rounded-full bg-red-500/60 animate-pulse" />
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-red-600 to-amber-600 text-white border-2 border-white shadow-2xl flex items-center justify-center animate-bounce">
                  <AlertTriangle className="w-7 h-7" />
                </div>
                <div className="mt-2 px-3 py-1 rounded-full bg-red-950/95 border border-red-500 text-white font-extrabold text-[11px] shadow-2xl flex items-center gap-1.5 whitespace-nowrap">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                  <span>Fall Detected • Apt 4B</span>
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
                className="absolute top-[8%] left-[28%] z-40 bg-[#111827]/95 backdrop-blur-md border-2 border-red-500 rounded-3xl p-4 shadow-2xl max-w-[260px] text-white"
              >
                <div className="flex items-center justify-between border-b border-slate-700 pb-2 mb-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-red-400">
                    <Siren className="w-4 h-4 animate-bounce" />
                    <span>IN-HOME SIREN ACTIVE</span>
                  </div>
                  <span className="w-2.5 h-2.5 rounded-full bg-red-400 animate-ping" />
                </div>
                <div className="text-center py-1">
                  <div className="text-4xl font-black font-mono text-white tracking-tight">
                    {countdownNumber}
                    <span className="text-base text-red-400">s</span>
                  </div>
                  <div className="text-[11px] text-slate-300">Safety Timer Running</div>
                </div>
                <div className="mt-2 pt-2 border-t border-slate-800 space-y-1.5 text-[11px]">
                  <div className="flex items-center justify-between font-bold text-amber-300">
                    <span>Medical Profile:</span>
                    <span className="px-2 py-0.5 rounded bg-red-600 text-white text-[10px] font-mono">
                      Blood: O+ (Example)
                    </span>
                  </div>
                  <div className="text-[10px] text-slate-400">
                    Loud high-decibel alarm sounding to alert housemates.
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* C. SCENE 3: PRIMARY CAREGIVER (Sarah - Daughter) CALLING PIN & DIALOG */}
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
              {HOME_CONTACTS.primary.name}
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
                  Calling: {HOME_CONTACTS.primary.name}
                </div>
                <div className="text-[11px] font-mono text-emerald-300 mt-0.5">
                  {HOME_CONTACTS.primary.phone}
                </div>
                <div className="text-[10px] text-slate-400 mt-1">
                  Auto-connecting primary caregiver following 10s uncancelled fall alert.
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* D. SCENE 4: 3 OTHER CONTACTS (Son, Trusted Neighbor, Doctor) */}
          {/* Contact 2: Son */}
          <div
            className={`absolute top-[18%] left-[14%] -translate-x-1/2 -translate-y-1/2 z-20 transition-all duration-500 ${
              isSmsSending ? "opacity-100 scale-100" : "opacity-30 scale-90"
            }`}
          >
            {isSmsSending && <span className="absolute -inset-2 rounded-full bg-cyan-500/40 animate-ping" />}
            <div className="w-10 h-10 rounded-xl bg-cyan-600 text-white border border-cyan-300 flex items-center justify-center shadow-lg">
              <Users className="w-5 h-5" />
            </div>
            <div className="mt-1 px-2 py-0.5 rounded-full bg-[#111827] border border-cyan-500 text-cyan-300 text-[9px] font-bold whitespace-nowrap">
              {HOME_CONTACTS.son.name}
            </div>
          </div>

          {/* Contact 3: Trusted Neighbor */}
          <div
            className={`absolute top-[80%] left-[26%] -translate-x-1/2 -translate-y-1/2 z-20 transition-all duration-500 ${
              isSmsSending ? "opacity-100 scale-100" : "opacity-30 scale-90"
            }`}
          >
            {isSmsSending && <span className="absolute -inset-2 rounded-full bg-cyan-500/40 animate-ping" />}
            <div className="w-10 h-10 rounded-xl bg-cyan-600 text-white border border-cyan-300 flex items-center justify-center shadow-lg">
              <Home className="w-5 h-5" />
            </div>
            <div className="mt-1 px-2 py-0.5 rounded-full bg-[#111827] border border-cyan-500 text-cyan-300 text-[9px] font-bold whitespace-nowrap">
              {HOME_CONTACTS.neighbor.name}
            </div>
          </div>

          {/* Contact 4: Family Physician */}
          <div
            className={`absolute top-[68%] left-[86%] -translate-x-1/2 -translate-y-1/2 z-20 transition-all duration-500 ${
              isSmsSending ? "opacity-100 scale-100" : "opacity-30 scale-90"
            }`}
          >
            {isSmsSending && <span className="absolute -inset-2 rounded-full bg-cyan-500/40 animate-ping" />}
            <div className="w-10 h-10 rounded-xl bg-cyan-600 text-white border border-cyan-300 flex items-center justify-center shadow-lg">
              <Activity className="w-5 h-5" />
            </div>
            <div className="mt-1 px-2 py-0.5 rounded-full bg-[#111827] border border-cyan-500 text-cyan-300 text-[9px] font-bold whitespace-nowrap">
              {HOME_CONTACTS.doctor.name}
            </div>
          </div>

          {/* SMS Broadcast Notification Card (With Door Code) */}
          <AnimatePresence>
            {isSmsSending && !isParamedicDispatched && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="absolute top-4 left-4 z-40 bg-[#111827]/95 border-2 border-cyan-500 rounded-2xl p-3.5 shadow-2xl max-w-[300px] text-white text-left"
              >
                <div className="flex items-center gap-1.5 text-cyan-400 font-bold text-xs mb-1">
                  <Send className="w-4 h-4" />
                  <span>HOME SOS & DOOR CODE SMS SENT</span>
                </div>
                <p className="text-[11px] text-slate-200 leading-relaxed font-sans">
                  &quot;HOME SOS! Fall detected at Apt 4B, Maple Residency. Front door code: <strong>#4092</strong>. Medical ID: Blood O+&quot;
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* E. SCENE 5: PARAMEDIC FIRST RESPONDER DISPATCH */}
          <div
            className={`absolute top-[72%] left-[86%] -translate-x-1/2 -translate-y-1/2 z-30 transition-all duration-500 ${
              isParamedicDispatched ? "opacity-100 scale-105" : "opacity-35 scale-90"
            }`}
          >
            {isParamedicDispatched && (
              <span className="absolute -inset-3 rounded-full bg-purple-500/40 animate-ping" />
            )}
            <div className="w-12 h-12 rounded-2xl bg-purple-600 text-white border-2 border-purple-300 shadow-xl flex items-center justify-center">
              <Hospital className="w-6 h-6" />
            </div>
            <div className="mt-1 px-2.5 py-0.5 rounded-full bg-[#111827] border border-purple-500 text-purple-300 text-[10px] font-bold whitespace-nowrap flex items-center gap-1">
              <Shield className="w-3 h-3 text-purple-400" />
              <span>Community Paramedic Station</span>
            </div>
          </div>

          {/* Smooth Animated Paramedic Unit Rushing Along Neighborhood Road */}
          {isParamedicDispatched && (
            <div
              className="absolute z-40 -translate-x-1/2 -translate-y-1/2 transition-transform duration-75 ease-linear pointer-events-none"
              style={{
                left: `${(respX / 1000) * 100}%`,
                top: `${(respY / 600) * 100}%`,
                transform: `translate(-50%, -50%) rotate(${Math.max(-25, Math.min(25, respAngle + 180))}deg)`,
              }}
            >
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-white text-purple-950 border-2 border-purple-600 shadow-2xl font-black text-xs">
                <span className="text-base animate-bounce">🚑</span>
                <div className="text-left">
                  <div className="text-[10px] font-extrabold uppercase leading-tight text-purple-900">
                    Paramedic First Responder
                  </div>
                  <div className="text-[9px] text-purple-600 font-mono">En Route • ETA 2m 15s</div>
                </div>
              </div>
            </div>
          )}

          {/* Paramedic Arrival Confirmation Card */}
          <AnimatePresence>
            {isParamedicDispatched && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="absolute bottom-4 left-4 z-40 bg-[#111827]/95 border-2 border-purple-500 rounded-2xl p-4 shadow-2xl max-w-[310px] text-white text-left"
              >
                <div className="flex items-center gap-1.5 text-purple-300 font-bold text-xs mb-1">
                  <Hospital className="w-4 h-4 text-purple-400" />
                  <span>FIRST RESPONDERS DISPATCHED</span>
                </div>
                <p className="text-[11px] text-slate-200 leading-relaxed">
                  Community Paramedic Unit dispatched to <strong>Apt 4B</strong> with stretcher and fracture stabilization kit.
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
              className="group relative flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-tr from-amber-600 to-red-600 text-white shadow-2xl shadow-amber-900/80 border-4 border-white/90 hover:scale-110 active:scale-95 transition-all duration-300"
              aria-label="Start Home Safety & Fall Simulation"
            >
              <Play className="w-9 h-9 fill-white ml-1 group-hover:scale-110 transition-transform" />
              <span className="absolute -inset-3 rounded-full border-2 border-amber-500/50 animate-ping pointer-events-none" />
            </button>
            <h4 className="text-xl font-black text-white mt-4 tracking-tight">
              Home Safety & Fall Emergency Scenario
            </h4>
            <p className="text-xs text-slate-300 max-w-sm mt-1 leading-relaxed">
              Click to start the in-home fall detection and rapid paramedic response simulation.
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
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-ping" />
              <span>In-Home Fall Emergency Sequence (1 Seamless Flow)</span>
            </div>
            <span className="text-slate-600 hidden sm:inline">•</span>
            <span className="text-slate-400 hidden sm:inline">
              Fall Detected → 10s Siren → Call Caregiver → SMS with Door Code → Paramedic Dispatch
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
