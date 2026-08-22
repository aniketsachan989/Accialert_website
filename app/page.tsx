import HeroSection from "@/components/HeroSection";
import CrashSimulator from "@/components/CrashSimulator";
import AppShowcase from "@/components/AppShowcase";
import BloodBankFeatureSection from "@/components/BloodBankFeatureSection";
import ArchitectureGrid from "@/components/ArchitectureGrid";
import PrivacyReliability from "@/components/PrivacyReliability";
import Link from "next/link";
import { Droplet, FileSpreadsheet, ShieldAlert, ArrowRight, Radio, HeartPulse, CheckCircle2 } from "lucide-react";

export default function HomePage() {
  return (
    <div className="space-y-0">
      {/* 1. Hero Section with Call to Actions and Badges */}
      <HeroSection />

      {/* 2. Interactive Emergency Simulation (Road Collision & Home Fall Scenarios) */}
      <CrashSimulator />

      {/* 3. Official Mobile App Interface Showcase */}
      <AppShowcase />

      {/* 4. HIGH WEIGHTAGE: 15 km Blood Bank Network & Rapid Registration Grid */}
      <BloodBankFeatureSection />

      {/* 5. Core Safety System Architecture (4 Pillars) */}
      <ArchitectureGrid />

      {/* 6. Privacy & Reliability Guide (Local Circle Privacy + Android 14+ Stay-Alive) */}
      <PrivacyReliability />

      {/* 7. Emergency Ecosystem Fast Action Hub */}
      <section className="py-20 bg-[#0B0F19] border-t border-slate-800/80 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-[#111827] to-[#161f30] rounded-3xl p-8 sm:p-12 border border-slate-700/80 shadow-2xl relative overflow-hidden">
            {/* Ambient Background Blur */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/60 border border-red-800/50 text-xs font-semibold text-red-400">
                  <Radio className="w-3.5 h-3.5 text-red-400 animate-pulse" />
                  <span>CONNECTED EMERGENCY NETWORK</span>
                </div>
                <h3 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                  Join the AcciAlert Rapid Response Grid
                </h3>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl">
                  Whether you are a verified blood bank ready to receive geohashed crash alerts, or
                  a law enforcement / insurance official retrieving tamper-evident blackbox telemetry,
                  the platform provides instantaneous access.
                </p>
                <div className="flex flex-wrap gap-4 pt-2">
                  <div className="flex items-center gap-2 text-xs text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Real-time Firestore Listeners</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                    <span>1-Page Printable PDF Certificates</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-purple-400" />
                    <span>Geohash Radius Matching</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-4 flex flex-col gap-3.5">
                <Link
                  href="/blood-banks/register"
                  className="w-full flex items-center justify-between p-4 rounded-2xl bg-gradient-to-r from-red-600/30 to-rose-600/20 hover:from-red-600/40 hover:to-rose-600/30 border border-red-500/50 text-white font-bold transition-all group shadow-lg"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-red-600 flex items-center justify-center shadow-md">
                      <Droplet className="w-5 h-5 text-white fill-white" />
                    </div>
                    <div className="text-left">
                      <div className="text-sm">Register Blood Bank</div>
                      <div className="text-[11px] text-red-300 font-normal">Add to emergency radar</div>
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-red-300 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  href="/blackbox-portal"
                  className="w-full flex items-center justify-between p-4 rounded-2xl bg-cyan-600/15 hover:bg-cyan-600/25 border border-cyan-500/40 text-white font-bold transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-cyan-600 flex items-center justify-center shadow-md">
                      <FileSpreadsheet className="w-5 h-5 text-white" />
                    </div>
                    <div className="text-left">
                      <div className="text-sm">Digital Blackbox Portal</div>
                      <div className="text-[11px] text-cyan-300 font-normal">Verify crash records</div>
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-cyan-300 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
