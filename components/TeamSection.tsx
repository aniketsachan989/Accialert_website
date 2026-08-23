import { Users } from "lucide-react";

export default function TeamSection() {
  return (
    <section className="py-20 bg-[#0B0F19] border-t border-slate-800/80 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-red-950/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-red-500/30 text-xs font-semibold text-red-400 mb-4 shadow-lg shadow-red-950/40">
            <Users className="w-3.5 h-3.5 text-red-400" />
            <span className="tracking-widest uppercase text-[11px] font-mono font-bold">BUILT BY</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            The Team Behind AcciAlert
          </h2>
        </div>

        {/* Two Team Member Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {/* Card 1: Aniket Sachan */}
          <div className="bg-[#111827] border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl hover:border-slate-700 transition-all duration-300 glow-card flex flex-col justify-between space-y-3">
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-xl font-bold text-white tracking-tight">
                Aniket Sachan
              </h3>
              <span className="bg-red-500/10 text-red-400 border border-red-500/20 px-2.5 py-0.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider">
                DEVELOPER
              </span>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed">
              Built the AI crash-detection engine and full-stack platform.
            </p>
          </div>

          {/* Card 2: Bhawna Jha */}
          <div className="bg-[#111827] border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl hover:border-slate-700 transition-all duration-300 glow-card flex flex-col justify-between space-y-3">
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-xl font-bold text-white tracking-tight">
                Bhawna Jha
              </h3>
              <span className="bg-blue-500/10 text-blue-400 border border-blue-500/20 px-2.5 py-0.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider">
                IDEATION &amp; TRAINING DATA
              </span>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed">
              Shaped the product vision and curated training data for the accident-detection model.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
