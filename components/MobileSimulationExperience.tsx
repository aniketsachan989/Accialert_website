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
  Car,
  Home,
  Siren,
  Send,
  Hospital,
  Activity,
  UserCheck,
} from "lucide-react";
import { playAlertSound, PLAY_STORE_URL } from "@/lib/utils";

// Mock contacts for mobile demo
const ROAD_CONTACTS = {
  primary: { name: "Mom", phone: "+1 (555) 019-2834" },
  dad: { name: "Dad", phone: "+1 (555) 014-9921" },
  sister: { name: "Sister", phone: "+1 (555) 018-4432" },
  friend: { name: "Friend", phone: "+1 (555) 012-7785" },
};

const HOME_CONTACTS = {
  primary: { name: "Sarah (Daughter)", phone: "+1 (555) 019-2834" },
  son: { name: "David (Son)", phone: "+1 (555) 014-9921" },
  neighbor: { name: "Mrs. Jenkins (Neighbor)", phone: "+1 (555) 018-4432" },
  doctor: { name: "Dr. Evans (Physician)", phone: "+1 (555) 012-7785" },
};

export default function MobileSimulationExperience({
  scenario = "road",
}: {
  scenario?: "road" | "home";
}) {
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const animFrameRef = useRef<number | null>(null);
  const lastTimestampRef = useRef<number | null>(null);
  const lastSecondRef = useRef<number>(-1);

  const TOTAL_DURATION = 22;

  // 60fps continuous animation timer
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

  // Story milestones
  const isInitial = currentTime < 2.5;
  const isImpact = currentTime >= 2.5;
  const isCountdownActive = currentTime >= 3.0 && currentTime < 10.0;
  const countdownNumber = Math.max(0, Math.ceil(10 - (currentTime - 3.0) * (10 / 7)));
  const isCallingPrimary = currentTime >= 10.0 && currentTime < 14.0;
  const isSmsSending = currentTime >= 13.5;
  const isHospitalDispatched = currentTime >= 16.5;

  // Car vertical driving position (T = 0s to 2.5s)
  const carProgress = Math.min(1, currentTime / 2.5);
  const carY = 50 + carProgress * 140; // Driving down vertical road to Y=190

  // Ambulance vertical response position (T = 16.5s to 21s)
  const ambProgress = Math.max(0, Math.min(1, (currentTime - 16.5) / 4.5));
  const ambY = 440 - ambProgress * 230; // Driving up from hospital to crash Y=210

  // Realistic SFX sound triggers
  useEffect(() => {
    if (!soundEnabled) return;

    // 1. Crash or Fall Impact (T = 2.5s)
    if (currentTime >= 2.45 && currentTime <= 2.6) {
      playAlertSound("crash");
    }

    // 2. Siren & Countdown Ticks (T = 3s to 10s)
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

    // 3. Dialing Ring (T = 10.0s)
    if (currentTime >= 9.95 && currentTime <= 10.15) {
      playAlertSound("dialing");
    }

    // 4. SMS Delivery Chime (T = 13.5s)
    if (currentTime >= 13.45 && currentTime <= 13.65) {
      playAlertSound("sms");
    }

    // 5. Ambulance Siren (T = 16.5s)
    if (currentTime >= 16.45 && currentTime <= 16.65) {
      playAlertSound("ambulance");
    }

    // 6. Resolution (T = 20.0s)
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
    <div className="w-full space-y-4">
      {/* 1. MOBILE STORY HEADER BANNER */}
      <div className="bg-[#111827] border border-slate-800 rounded-2xl p-4 shadow-xl">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <div
              className={`w-9 h-9 rounded-xl flex items-center justify-center text-white shrink-0 shadow-md ${
                isInitial
                  ? "bg-amber-600"
                  : isCountdownActive
                  ? "bg-red-600 animate-pulse"
                  : isCallingPrimary
                  ? "bg-emerald-600 animate-bounce"
                  : isSmsSending && !isHospitalDispatched
                  ? "bg-cyan-600"
                  : "bg-purple-600"
              }`}
            >
              {isInitial && (scenario === "road" ? <Car className="w-4 h-4" /> : <Home className="w-4 h-4" />)}
              {isCountdownActive && <Clock className="w-4 h-4" />}
              {isCallingPrimary && <PhoneCall className="w-4 h-4" />}
              {isSmsSending && !isHospitalDispatched && <MessageSquare className="w-4 h-4" />}
              {isHospitalDispatched && <Hospital className="w-4 h-4" />}
            </div>

            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-[9px] uppercase font-mono font-bold px-1.5 py-0.5 rounded bg-slate-900 border border-slate-700 text-slate-300">
                  {isInitial && "1. NORMAL ROUTE"}
                  {isCountdownActive && "2. 10s EMERGENCY SIREN"}
                  {isCallingPrimary && "3. CALLING FAMILY"}
                  {isSmsSending && !isHospitalDispatched && "4. 3x SMS BROADCAST"}
                  {isHospitalDispatched && "5. DISPATCH EN ROUTE"}
                </span>
                <span className="text-[10px] font-mono font-bold text-amber-400">
                  {currentTime.toFixed(0)}s/22s
                </span>
              </div>
              <p className="text-xs font-bold text-white mt-0.5 line-clamp-1">
                {isInitial && (scenario === "road" ? "Driving on Highway..." : "Resident at Home...")}
                {isCountdownActive && `Severe impact! Siren sounding (${countdownNumber}s)`}
                {isCallingPrimary && `Auto-calling Primary Contact...`}
                {isSmsSending && !isHospitalDispatched && "Sending SMS with GPS coordinates..."}
                {isHospitalDispatched && "Blood Bank & Paramedic Dispatched!"}
              </p>
            </div>
          </div>

          {/* Quick Controls */}
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={handleTogglePlay}
              className={`p-2 rounded-xl text-white font-bold text-xs flex items-center justify-center shadow-md ${
                isPlaying ? "bg-amber-600" : "bg-red-600"
              }`}
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
            </button>

            <button
              onClick={handleRestart}
              className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white"
              aria-label="Restart"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            <button
              onClick={() => {
                const nextSound = !soundEnabled;
                setSoundEnabled(nextSound);
                if (nextSound) playAlertSound("beep");
              }}
              className={`p-2 rounded-xl border text-xs font-bold ${
                soundEnabled
                  ? "bg-slate-800 border-cyan-500/50 text-cyan-400"
                  : "bg-slate-900 border-slate-800 text-slate-400"
              }`}
              aria-label="Toggle Sound"
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Scrubber */}
        <div className="mt-3 pt-2.5 border-t border-slate-800/80">
          <div
            className="relative w-full h-2 bg-slate-900 rounded-full overflow-hidden border border-slate-800 cursor-pointer"
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const clickX = e.clientX - rect.left;
              const ratio = Math.max(0, Math.min(1, clickX / rect.width));
              setCurrentTime(ratio * TOTAL_DURATION);
            }}
          >
            <div
              className="h-full bg-gradient-to-r from-red-600 via-amber-500 via-emerald-500 via-blue-500 to-purple-600"
              style={{ width: `${(currentTime / TOTAL_DURATION) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* 2. VERTICAL MOBILE-NATIVE SIMULATION CANVAS */}
      <div className="relative w-full aspect-[4/5] min-h-[420px] max-h-[500px] bg-[#070b14] rounded-2xl overflow-hidden border-2 border-slate-800 shadow-2xl">
        {/* Vector Vertical Canvas */}
        <svg
          className="w-full h-full"
          viewBox="0 0 400 500"
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern id="mobile-city-grid" width="25" height="25" patternUnits="userSpaceOnUse">
              <rect width="25" height="25" fill="#080d1a" />
              <rect x="1" y="1" width="23" height="23" fill="#0c1322" rx="2" />
            </pattern>
            <filter id="m-glow" x="-10%" y="-10%" width="120%" height="120%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Background */}
          <rect width="400" height="500" fill="url(#mobile-city-grid)" />

          {/* Vertical Main Highway / Avenue */}
          <line x1="200" y1="0" x2="200" y2="500" stroke="#1e293b" strokeWidth="48" />
          <line x1="200" y1="0" x2="200" y2="500" stroke="#0f172a" strokeWidth="40" />
          <line
            x1="200"
            y1="0"
            x2="200"
            y2="500"
            stroke="#f59e0b"
            strokeWidth="2"
            strokeDasharray="10 8"
          />

          {/* Horizontal Cross Street at Center (Y=190) */}
          <line x1="0" y1="190" x2="400" y2="190" stroke="#1e293b" strokeWidth="32" />
          <line x1="0" y1="190" x2="400" y2="190" stroke="#0f172a" strokeWidth="26" />

          {/* Curving Emergency Call Arc (Scene 3: Center to Top-Right Mom/Caregiver) */}
          {isCallingPrimary && (
            <path
              d="M 200 190 C 260 140, 310 90, 330 50"
              fill="none"
              stroke="#10b981"
              strokeWidth="4"
              strokeDasharray="8 6"
              className="animate-pulse"
              filter="url(#m-glow)"
            />
          )}

          {/* Curving 3x SMS Broadcast Waves (Scene 4) */}
          {isSmsSending && (
            <g strokeWidth="3" strokeDasharray="6 5" className="animate-pulse" filter="url(#m-glow)">
              {/* To Contact 2 (Top Left) */}
              <path d="M 200 190 C 140 130, 90 90, 70 50" fill="none" stroke="#06b6d4" />
              {/* To Contact 3 (Bottom Left) */}
              <path d="M 200 190 C 140 270, 80 340, 60 410" fill="none" stroke="#06b6d4" />
              {/* To Contact 4 (Bottom Right) */}
              <path d="M 200 190 C 260 270, 320 340, 340 410" fill="none" stroke="#06b6d4" />
            </g>
          )}

          {/* Curving Ambulance / Paramedic Dispatch Route (Scene 5: Hospital at Bottom-Center to Crash) */}
          {isHospitalDispatched && (
            <path
              d="M 200 440 L 200 190"
              fill="none"
              stroke="#a855f7"
              strokeWidth="5"
              strokeDasharray="10 6"
              className="animate-pulse"
              filter="url(#m-glow)"
            />
          )}
        </svg>

        {/* 3. DYNAMIC INTERACTIVE PINS */}

        {/* A. Vehicle / Resident Avatar */}
        <div
          className="absolute z-30 -translate-x-1/2 -translate-y-1/2 pointer-events-none transition-transform duration-100"
          style={{
            left: "50%",
            top: isInitial ? `${(carY / 500) * 100}%` : "38%",
          }}
        >
          {isInitial ? (
            <div className="w-10 h-10 rounded-xl bg-cyan-600 border-2 border-white text-white shadow-xl flex items-center justify-center">
              {scenario === "road" ? <Car className="w-5 h-5" /> : <UserCheck className="w-5 h-5" />}
            </div>
          ) : (
            <div className="relative flex flex-col items-center">
              <span className="absolute -inset-6 rounded-full bg-red-600/40 animate-ping" />
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-red-600 to-amber-600 text-white border-2 border-white shadow-2xl flex items-center justify-center animate-bounce">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div className="mt-1 px-2 py-0.5 rounded-full bg-red-950 border border-red-500 text-white text-[9px] font-black whitespace-nowrap shadow-lg">
                {scenario === "road" ? "Crash Detected" : "Fall Detected"}
              </div>
            </div>
          )}
        </div>

        {/* B. 10s Countdown Floating Card (Scene 2) */}
        <AnimatePresence>
          {isCountdownActive && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute top-3 left-3 right-3 z-40 bg-[#111827]/95 border-2 border-red-500 rounded-2xl p-3 shadow-2xl text-white text-center"
            >
              <div className="flex items-center justify-between text-[11px] font-bold text-red-400 pb-1 border-b border-slate-700">
                <div className="flex items-center gap-1">
                  <Siren className="w-3.5 h-3.5 animate-bounce" />
                  <span>SAFETY COUNTDOWN</span>
                </div>
                <span className="text-[10px] bg-red-600 text-white px-2 py-0.5 rounded">Blood: O+</span>
              </div>
              <div className="text-3xl font-black font-mono my-1 text-white">
                {countdownNumber}s
              </div>
              <p className="text-[10px] text-slate-300">
                Loud siren sounding • Auto-calling emergency contact in {countdownNumber} seconds.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* C. Primary Contact Calling Card (Scene 3 - Top Right) */}
        <div
          className={`absolute top-[10%] right-[6%] z-30 transition-all duration-300 ${
            isCallingPrimary ? "scale-105 opacity-100" : isSmsSending ? "opacity-100" : "opacity-40"
          }`}
        >
          {isCallingPrimary && <span className="absolute -inset-3 rounded-full bg-emerald-500/40 animate-ping" />}
          <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white border-2 border-emerald-300 flex items-center justify-center shadow-lg">
            <PhoneCall className={`w-5 h-5 ${isCallingPrimary ? "animate-bounce" : ""}`} />
          </div>
          <div className="mt-1 px-2 py-0.5 rounded-md bg-[#111827] border border-emerald-500 text-emerald-300 text-[9px] font-bold whitespace-nowrap text-center">
            {scenario === "road" ? ROAD_CONTACTS.primary.name : HOME_CONTACTS.primary.name}
          </div>
        </div>

        {/* D. Other Emergency Contacts (Scene 4) */}
        {/* Contact 2 (Top Left) */}
        <div
          className={`absolute top-[10%] left-[6%] z-20 transition-all duration-300 ${
            isSmsSending ? "opacity-100 scale-100" : "opacity-30 scale-90"
          }`}
        >
          {isSmsSending && <span className="absolute -inset-2 rounded-full bg-cyan-500/40 animate-ping" />}
          <div className="w-8 h-8 rounded-lg bg-cyan-600 text-white flex items-center justify-center shadow">
            <Users className="w-4 h-4" />
          </div>
          <div className="mt-0.5 px-1.5 py-0.5 rounded bg-[#111827] border border-cyan-500 text-cyan-300 text-[8px] font-bold whitespace-nowrap">
            {scenario === "road" ? ROAD_CONTACTS.dad.name : HOME_CONTACTS.son.name}
          </div>
        </div>

        {/* Contact 3 (Bottom Left) */}
        <div
          className={`absolute bottom-[16%] left-[6%] z-20 transition-all duration-300 ${
            isSmsSending ? "opacity-100 scale-100" : "opacity-30 scale-90"
          }`}
        >
          {isSmsSending && <span className="absolute -inset-2 rounded-full bg-cyan-500/40 animate-ping" />}
          <div className="w-8 h-8 rounded-lg bg-cyan-600 text-white flex items-center justify-center shadow">
            <Users className="w-4 h-4" />
          </div>
          <div className="mt-0.5 px-1.5 py-0.5 rounded bg-[#111827] border border-cyan-500 text-cyan-300 text-[8px] font-bold whitespace-nowrap">
            {scenario === "road" ? ROAD_CONTACTS.sister.name : HOME_CONTACTS.neighbor.name}
          </div>
        </div>

        {/* Contact 4 (Bottom Right) */}
        <div
          className={`absolute bottom-[16%] right-[6%] z-20 transition-all duration-300 ${
            isSmsSending ? "opacity-100 scale-100" : "opacity-30 scale-90"
          }`}
        >
          {isSmsSending && <span className="absolute -inset-2 rounded-full bg-cyan-500/40 animate-ping" />}
          <div className="w-8 h-8 rounded-lg bg-cyan-600 text-white flex items-center justify-center shadow">
            <Activity className="w-4 h-4" />
          </div>
          <div className="mt-0.5 px-1.5 py-0.5 rounded bg-[#111827] border border-cyan-500 text-cyan-300 text-[8px] font-bold whitespace-nowrap">
            {scenario === "road" ? ROAD_CONTACTS.friend.name : HOME_CONTACTS.doctor.name}
          </div>
        </div>

        {/* E. Hospital & Blood Bank Station (Bottom Center) */}
        <div
          className={`absolute bottom-[4%] left-1/2 -translate-x-1/2 z-20 transition-all duration-300 text-center ${
            isHospitalDispatched ? "opacity-100 scale-100" : "opacity-40 scale-90"
          }`}
        >
          <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-purple-600 text-white text-[10px] font-bold border border-purple-300 shadow-xl">
            <Hospital className="w-3.5 h-3.5" />
            <span>Trauma &amp; Blood Bank</span>
          </div>
        </div>

        {/* F. Animated Ambulance Moving Up */}
        {isHospitalDispatched && (
          <div
            className="absolute z-40 -translate-x-1/2 -translate-y-1/2 pointer-events-none transition-transform duration-75"
            style={{
              left: "50%",
              top: `${(ambY / 500) * 100}%`,
            }}
          >
            <div className="flex items-center gap-1 px-2 py-1 rounded-xl bg-white text-purple-950 border-2 border-purple-600 shadow-2xl font-black text-[10px]">
              <span className="text-xs animate-bounce">🚑</span>
              <span>Ambulance En Route</span>
            </div>
          </div>
        )}

        {/* G. Big Play Button Overlay when Paused at Start */}
        {!isPlaying && currentTime === 0 && (
          <div className="absolute inset-0 z-40 bg-black/60 backdrop-blur-[2px] flex flex-col items-center justify-center p-4 text-center">
            <button
              onClick={() => {
                setIsPlaying(true);
                if (soundEnabled) playAlertSound("beep");
              }}
              className="group relative flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-tr from-red-600 to-rose-600 text-white shadow-2xl shadow-red-900/80 border-4 border-white/90 hover:scale-110 active:scale-95 transition-all duration-300"
              aria-label="Start Mobile Simulation"
            >
              <Play className="w-7 h-7 fill-white ml-0.5 group-hover:scale-110 transition-transform" />
              <span className="absolute -inset-2 rounded-full border-2 border-red-500/50 animate-ping pointer-events-none" />
            </button>
            <h4 className="text-base font-black text-white mt-3 tracking-tight">
              {scenario === "road" ? "Road Accident Simulation" : "Home Fall Simulation"}
            </h4>
            <p className="text-[11px] text-slate-300 max-w-[240px] mt-0.5 leading-tight">
              Tap to watch the 1-flow real-time emergency response on mobile.
            </p>
          </div>
        )}
      </div>

      {/* 3. MOBILE ACTION FOOTER */}
      <div className="flex items-center justify-between p-3 rounded-xl bg-[#111827] border border-slate-800 text-xs">
        <div className="flex items-center gap-1.5 text-slate-300 font-medium text-[11px]">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span>Mobile-Optimized Real-Time Engine</span>
        </div>
        <a
          href={PLAY_STORE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="px-2.5 py-1 rounded-lg bg-emerald-600 text-white text-[10px] font-bold"
        >
          Play Store ↗
        </a>
      </div>
    </div>
  );
}
