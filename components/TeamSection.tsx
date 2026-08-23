import Image from "next/image";
import { Users, Cpu, Code2, Brain, Database, Sparkles, CheckCircle2, Shield } from "lucide-react";

export default function TeamSection() {
  return (
    <section className="py-20 lg:py-28 bg-[#0B0F19] border-t border-slate-800/80 relative overflow-hidden">
      {/* Dynamic Background Ambient Lighting */}
      <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-red-600/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-blue-600/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/90 border border-slate-700/80 text-xs font-bold text-slate-300 mb-4 shadow-lg shadow-black/40">
            <Users className="w-3.5 h-3.5 text-red-400" />
            <span className="tracking-widest uppercase text-[11px] font-mono font-bold text-slate-200">
              CORE BUILDERS
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            The Team Behind AcciAlert
          </h2>
          <p className="text-sm sm:text-base text-slate-400 mt-3 max-w-xl mx-auto leading-relaxed">
            Engineering real-time edge intelligence and life-saving trauma response.
          </p>
        </div>

        {/* 2-Card Portrait Showcase Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 max-w-5xl mx-auto items-stretch">
          {/* Card 1: Aniket Sachan (Developer) */}
          <div className="relative rounded-3xl bg-gradient-to-b from-[#161f30] to-[#0f172a] border border-red-500/30 hover:border-red-500/60 p-6 sm:p-7 shadow-2xl transition-all duration-500 hover:-translate-y-1 group flex flex-col justify-between overflow-hidden glow-card">
            {/* Top accent highlight bar */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-600 via-rose-500 to-amber-500 opacity-80 group-hover:opacity-100 transition-opacity" />

            <div className="space-y-6">
              {/* Photo Frame Container */}
              <div className="relative w-full aspect-[4/3] sm:aspect-[16/11] rounded-2xl overflow-hidden bg-slate-950 border border-slate-700/60 shadow-inner group-hover:border-red-500/40 transition-colors">
                <Image
                  src="/team/aniket.jpg"
                  alt="Aniket Sachan - Developer"
                  fill
                  sizes="(max-width: 768px) 100vw, 500px"
                  className="object-cover object-[center_20%] group-hover:scale-105 transition-transform duration-700 ease-out"
                  priority
                />
                {/* Image Bottom Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-transparent to-transparent opacity-80" />

                {/* Floating Role Badge */}
                <div className="absolute top-3.5 right-3.5 z-10">
                  <span className="bg-red-950/90 backdrop-blur-md text-red-300 border border-red-500/50 px-3 py-1 rounded-full text-[11px] font-mono font-extrabold uppercase tracking-wider shadow-lg shadow-black/60">
                    DEVELOPER
                  </span>
                </div>
              </div>

              {/* Title & Name */}
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight group-hover:text-red-400 transition-colors">
                    Aniket Sachan
                  </h3>
                </div>
                <p className="text-xs font-mono font-semibold text-red-400/90">
                  Architecture &amp; Core Systems
                </p>
              </div>

              {/* Description */}
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                Built the AI crash-detection engine and full-stack platform.
              </p>

              {/* Highlight Contribution Pills */}
              <div className="pt-2 flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#0B0F19] border border-slate-800 text-xs font-medium text-slate-300">
                  <Cpu className="w-3.5 h-3.5 text-red-400" />
                  Edge ML &amp; Sensor Fusion
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#0B0F19] border border-slate-800 text-xs font-medium text-slate-300">
                  <Code2 className="w-3.5 h-3.5 text-amber-400" />
                  Full-Stack Architecture
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#0B0F19] border border-slate-800 text-xs font-medium text-slate-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  Real-Time Dispatch Feed
                </span>
              </div>
            </div>
          </div>

          {/* Card 2: Bhawna Jha (Ideation & Training Data) */}
          <div className="relative rounded-3xl bg-gradient-to-b from-[#161f30] to-[#0f172a] border border-blue-500/30 hover:border-blue-500/60 p-6 sm:p-7 shadow-2xl transition-all duration-500 hover:-translate-y-1 group flex flex-col justify-between overflow-hidden glow-card">
            {/* Top accent highlight bar */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-cyan-500 to-teal-400 opacity-80 group-hover:opacity-100 transition-opacity" />

            <div className="space-y-6">
              {/* Photo Frame Container */}
              <div className="relative w-full aspect-[4/3] sm:aspect-[16/11] rounded-2xl overflow-hidden bg-slate-950 border border-slate-700/60 shadow-inner group-hover:border-blue-500/40 transition-colors">
                <Image
                  src="/team/bhawna.jpg"
                  alt="Bhawna Jha - Ideation & Training Data"
                  fill
                  sizes="(max-width: 768px) 100vw, 500px"
                  className="object-cover object-[center_15%] group-hover:scale-105 transition-transform duration-700 ease-out"
                  priority
                />
                {/* Image Bottom Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-transparent to-transparent opacity-80" />

                {/* Floating Role Badge */}
                <div className="absolute top-3.5 right-3.5 z-10">
                  <span className="bg-blue-950/90 backdrop-blur-md text-blue-300 border border-blue-500/50 px-3 py-1 rounded-full text-[11px] font-mono font-extrabold uppercase tracking-wider shadow-lg shadow-black/60">
                    IDEATION &amp; TRAINING DATA
                  </span>
                </div>
              </div>

              {/* Title & Name */}
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight group-hover:text-cyan-300 transition-colors">
                    Bhawna Jha
                  </h3>
                </div>
                <p className="text-xs font-mono font-semibold text-cyan-400/90">
                  Product Strategy &amp; Data
                </p>
              </div>

              {/* Description */}
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                Shaped the product vision and curated training data for the accident-detection model.
              </p>

              {/* Highlight Contribution Pills */}
              <div className="pt-2 flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#0B0F19] border border-slate-800 text-xs font-medium text-slate-300">
                  <Brain className="w-3.5 h-3.5 text-cyan-400" />
                  Product Vision &amp; Strategy
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#0B0F19] border border-slate-800 text-xs font-medium text-slate-300">
                  <Database className="w-3.5 h-3.5 text-blue-400" />
                  Crash Telemetry Dataset
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#0B0F19] border border-slate-800 text-xs font-medium text-slate-300">
                  <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                  Model Validation
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
