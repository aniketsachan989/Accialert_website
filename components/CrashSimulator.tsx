"use client";

import { useState } from "react";
import CinematicCrashStory from "./CinematicCrashStory";
import CinematicHomeStory from "./CinematicHomeStory";
import { Radio, Car, Home, Sparkles } from "lucide-react";

export default function CrashSimulator() {
  const [activeScenario, setActiveScenario] = useState<"road" | "home">("road");

  return (
    <section id="simulator" className="py-20 lg:py-28 bg-[#0B0F19] border-t border-slate-800/80 relative">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-red-950/20 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-950/60 border border-red-800/50 text-xs font-semibold text-red-400 mb-4">
            <Radio className="w-3.5 h-3.5 text-red-400 animate-pulse" />
            <span>REAL-TIME SIMULATION • ALL IN 1 SEAMLESS FLOW</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Watch How AcciAlert Responds in Real Life
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
            Choose a scenario below to watch how AcciAlert handles highway vehicle collisions
            or in-home slip & fall emergencies automatically in real time.
          </p>

          {/* Interactive Scenario Switcher Tabs */}
          <div className="inline-flex p-1.5 rounded-2xl bg-[#111827] border-2 border-slate-800 mt-8 gap-2 shadow-2xl">
            <button
              onClick={() => setActiveScenario("road")}
              className={`flex items-center gap-2.5 px-6 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeScenario === "road"
                  ? "bg-red-600 text-white shadow-xl shadow-red-950/60 scale-[1.02]"
                  : "text-slate-400 hover:text-white hover:bg-slate-800/50"
              }`}
            >
              <Car className="w-4 h-4" />
              <span>1. Road Accident Scenario</span>
            </button>

            <button
              onClick={() => setActiveScenario("home")}
              className={`flex items-center gap-2.5 px-6 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeScenario === "home"
                  ? "bg-amber-600 text-white shadow-xl shadow-amber-950/60 scale-[1.02]"
                  : "text-slate-400 hover:text-white hover:bg-slate-800/50"
              }`}
            >
              <Home className="w-4 h-4" />
              <span>2. Home Safety & Fall Scenario</span>
            </button>
          </div>
        </div>

        {/* Dynamic Story Animation Container */}
        <div className="transition-all duration-300">
          {activeScenario === "road" ? (
            <CinematicCrashStory key="road-scenario" />
          ) : (
            <CinematicHomeStory key="home-scenario" />
          )}
        </div>
      </div>
    </section>
  );
}
