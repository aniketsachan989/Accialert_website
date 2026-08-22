"use client";

import Link from "next/link";
import {
  Droplet,
  Radio,
  Hospital,
  MapPin,
  CheckCircle2,
  ArrowRight,
  Shield,
  Heart,
  Clock,
  Zap,
  Activity,
  Users,
} from "lucide-react";

export default function BloodBankFeatureSection() {
  const bloodGroups = [
    { type: "O+", status: "High Demand", units: "Ready", color: "bg-red-950 text-red-400 border-red-800" },
    { type: "B+", status: "Matched (Demo)", units: "Reserved", color: "bg-emerald-950 text-emerald-400 border-emerald-800" },
    { type: "A+", status: "Available", units: "Ready", color: "bg-slate-900 text-slate-300 border-slate-700" },
    { type: "AB+", status: "Universal Recipient", units: "Ready", color: "bg-slate-900 text-slate-300 border-slate-700" },
    { type: "O-", status: "Universal Donor", units: "Critical", color: "bg-red-950 text-red-400 border-red-800" },
    { type: "B-", status: "Available", units: "Ready", color: "bg-slate-900 text-slate-300 border-slate-700" },
    { type: "A-", status: "Available", units: "Ready", color: "bg-slate-900 text-slate-300 border-slate-700" },
    { type: "AB-", status: "Available", units: "Ready", color: "bg-slate-900 text-slate-300 border-slate-700" },
  ];

  return (
    <section className="py-20 lg:py-28 bg-[#090d16] border-t border-slate-800/80 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-red-600/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-rose-600/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Pill & Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-950/70 border border-red-700/60 text-xs font-bold text-red-400 mb-4 shadow-lg shadow-red-950/50">
            <Droplet className="w-4 h-4 fill-red-400 animate-bounce" />
            <span>CRITICAL LIFELINE • 15 KM BLOOD BANK NETWORK</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Saving the Golden Hour with Instant Blood Mobilization
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
            Severe accidents often cause critical blood loss. AcciAlert instantly links crash coordinates
            to registered blood banks and trauma centers within 15 km, preparing matching blood units
            before the patient even reaches the emergency room.
          </p>
        </div>

        {/* 2-Column Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Left Column: Live Blood Network Capabilities */}
          <div className="lg:col-span-7 bg-[#111827] border-2 border-red-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-col justify-between glow-card">
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-red-600 to-rose-700 text-white flex items-center justify-center shadow-lg shadow-red-950/50">
                    <Droplet className="w-6 h-6 fill-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">How the Blood Bank Grid Works</h3>
                    <p className="text-xs text-slate-400">Zero-delay emergency trauma coordination</p>
                  </div>
                </div>
                <span className="text-[10px] font-mono font-bold uppercase text-red-400 bg-red-950 px-2.5 py-1 rounded-full border border-red-800">
                  v5.0 Active
                </span>
              </div>

              {/* 4 Feature Step Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-[#0B0F19] border border-slate-800 space-y-1.5">
                  <div className="flex items-center gap-2 text-red-400 font-bold text-xs">
                    <MapPin className="w-4 h-4 text-red-400 shrink-0" />
                    <span>1. GPS Geohash Radius</span>
                  </div>
                  <p className="text-[11px] text-slate-300 leading-relaxed">
                    Automatic 15 km distance calculation locates all verified blood banks nearest to the crash.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#0B0F19] border border-slate-800 space-y-1.5">
                  <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs">
                    <Heart className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>2. Exact Blood Match</span>
                  </div>
                  <p className="text-[11px] text-slate-300 leading-relaxed">
                    Instantly extracts the victim&apos;s verified blood group from their unblockable lock screen profile.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#0B0F19] border border-slate-800 space-y-1.5">
                  <div className="flex items-center gap-2 text-cyan-400 font-bold text-xs">
                    <Radio className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>3. Live Emergency Radar</span>
                  </div>
                  <p className="text-[11px] text-slate-300 leading-relaxed">
                    Real-time Firestore feeds ping blood bank dashboards with live coordinates and weather details.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#0B0F19] border border-slate-800 space-y-1.5">
                  <div className="flex items-center gap-2 text-purple-400 font-bold text-xs">
                    <Hospital className="w-4 h-4 text-purple-400 shrink-0" />
                    <span>4. Pre-Transfusion Ready</span>
                  </div>
                  <p className="text-[11px] text-slate-300 leading-relaxed">
                    Blood units are packed and reserved while the ambulance is still en route to the trauma center.
                  </p>
                </div>
              </div>

              {/* Blood Groups Live Status Strip */}
              <div className="space-y-2 pt-2">
                <div className="flex items-center justify-between text-xs font-bold text-slate-300">
                  <span>Supported Emergency Blood Groups</span>
                  <span className="text-[10px] text-emerald-400">All 8 ABO/Rh Types Supported</span>
                </div>
                <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                  {bloodGroups.map((bg) => (
                    <div
                      key={bg.type}
                      className={`p-2 rounded-xl border text-center font-mono ${bg.color}`}
                    >
                      <div className="text-xs font-black">{bg.type}</div>
                      <div className="text-[8px] font-sans truncate">{bg.units}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-6 border-t border-slate-800 mt-6">
              <Link
                href="/blood-banks/register"
                className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl text-sm font-extrabold text-white bg-gradient-to-r from-red-600 via-red-600 to-rose-700 hover:from-red-500 hover:to-rose-600 shadow-xl shadow-red-950/60 border border-red-400/40 transition-all hover:scale-105 active:scale-95 group"
              >
                <Droplet className="w-4 h-4 fill-white" />
                <span>Register Your Blood Bank</span>
                <ArrowRight className="w-4 h-4 text-red-200 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="/blood-banks/dashboard"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl text-sm font-bold text-slate-300 bg-slate-900 hover:bg-slate-800 hover:text-white border border-slate-700 transition-colors"
              >
                <Radio className="w-4 h-4 text-red-400 animate-pulse" />
                <span>Open Live Radar Feed</span>
              </Link>
            </div>
          </div>

          {/* Right Column: Blood Bank Benefits & Fast Registration Card */}
          <div className="lg:col-span-5 bg-gradient-to-br from-[#161f30] to-[#111827] border-2 border-slate-700/80 rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-col justify-between glow-card">
            <div className="space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/80 border border-red-800 text-xs font-bold text-red-400">
                <Shield className="w-3.5 h-3.5" />
                <span>HOSPITAL & BLOOD BANK REGISTRATION</span>
              </div>

              <h3 className="text-2xl font-black text-white leading-snug">
                Join the Nationwide Emergency Blood Response Grid
              </h3>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Hospitals, government blood banks, and verified private transfusion centers can register
                their GPS coordinates in less than 60 seconds to start receiving automated regional crash alerts.
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3 text-xs text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>1-Click GPS Auto-Tagging:</strong> Captures high-precision latitude & longitude instantly.</span>
                </div>
                <div className="flex items-start gap-3 text-xs text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>No Hardware Required:</strong> Runs seamlessly on any hospital computer, tablet, or smartphone.</span>
                </div>
                <div className="flex items-start gap-3 text-xs text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Instant Dispatch Confirmation:</strong> 1-click button to confirm blood units are mobilized.</span>
                </div>
                <div className="flex items-start gap-3 text-xs text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>100% Free & Open-Access:</strong> Certified for medical emergency interoperability.</span>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-800 mt-6">
              <Link
                href="/blood-banks/register"
                className="w-full flex items-center justify-center gap-2 py-4 rounded-xl text-sm font-black text-white bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 shadow-xl shadow-red-950/60 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Complete 60-Second Registration →</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
