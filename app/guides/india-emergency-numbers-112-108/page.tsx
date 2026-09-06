import type { Metadata } from "next";
import Link from "next/link";
import { Phone, ArrowLeft, AlertTriangle, ShieldCheck, Ambulance, Radio } from "lucide-react";
import { PLAY_STORE_URL } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Emergency Numbers in India: 112 vs 108 Official Helpline Guide | AcciAlert",
  description:
    "Comprehensive guide explaining India's unified emergency helpline system: When to dial 112 for Police/Fire/Emergency vs 108 for Emergency Ambulance Services.",
  keywords: [
    "Emergency Numbers India",
    "112 Emergency India",
    "108 Ambulance Helpline",
    "Road Accident Emergency Numbers",
    "AcciAlert Indian Emergency Guide",
  ],
};

export default function EmergencyNumbersGuidePage() {
  return (
    <div className="min-h-screen bg-[#0B0F19] text-slate-100 py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Navigation & Header */}
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-white transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-emerald-500/30 text-xs font-semibold text-emerald-400 mb-4">
            <Phone className="w-3.5 h-3.5" />
            <span className="font-mono text-[11px] tracking-wider uppercase">NATIONAL HELPLINE DIRECTORY</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
            National Emergency Numbers in India: How to Use 112 &amp; 108 Correctly
          </h1>
          <p className="text-sm sm:text-base text-slate-400 mt-3 leading-relaxed">
            Understanding India&apos;s Emergency Response Support System (ERSS) and how autonomous accident detection coordinates with national first responders.
          </p>
        </div>

        {/* Content Card */}
        <div className="bg-[#111827] border border-slate-800 rounded-3xl p-6 sm:p-10 lg:p-12 shadow-2xl space-y-8 text-slate-300 text-sm sm:text-base leading-relaxed">
          {/* 112 vs 108 Breakdown Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-red-950/40 border border-red-800/60 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-3xl font-black text-white font-mono">112</span>
                <span className="text-[10px] uppercase font-bold tracking-widest bg-red-600 text-white px-2.5 py-0.5 rounded-full">
                  All-in-One Emergency
                </span>
              </div>
              <h2 className="text-lg font-bold text-white">National ERSS Unified Helpline</h2>
              <p className="text-xs text-slate-300 leading-relaxed">
                Replaces legacy 100 (Police), 101 (Fire), and 102 numbers under a single pan-India dispatch system. Works even without a SIM card or active cellular balance.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-emerald-950/40 border border-emerald-800/60 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-3xl font-black text-white font-mono text-emerald-400">108</span>
                <span className="text-[10px] uppercase font-bold tracking-widest bg-emerald-600 text-white px-2.5 py-0.5 rounded-full">
                  Ambulance Dispatch
                </span>
              </div>
              <h2 className="text-lg font-bold text-white">National Ambulance &amp; Trauma Service</h2>
              <p className="text-xs text-slate-300 leading-relaxed">
                Directly connects to state emergency medical dispatch centers for Advanced Life Support (ALS) and Basic Life Support (BLS) ambulances.
              </p>
            </div>
          </div>

          <section className="space-y-4 pt-4 border-t border-slate-800/80">
            <h2 className="text-2xl font-black text-white tracking-tight flex items-center gap-2.5">
              <Radio className="w-6 h-6 text-cyan-400" />
              <span>How AcciAlert Integrates with Indian Emergency Services</span>
            </h2>
            <p>
              When an accident occurs, victims are often incapacitated and unable to unlock their device to dial 112 or 108. AcciAlert automates this critical initial response:
            </p>
            <ul className="list-disc list-inside space-y-2 text-slate-300 pl-2">
              <li>Punches through device lock screen with emergency 100% volume audible beacon.</li>
              <li>Dispatches SMS with exact Google Maps coordinates to victim&apos;s designated emergency family circle.</li>
              <li>Mobilizes nearby blood banks within 15 km with matching blood group readiness.</li>
            </ul>
          </section>

          {/* CTA Box */}
          <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-slate-900 to-slate-900 border border-emerald-500/40 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold text-white">Equip Automatic Accident Protection</h3>
              <p className="text-xs text-slate-300 mt-1">Download AcciAlert v6.0 Pro for autonomous crash detection &amp; blood bank alerts.</p>
            </div>
            <a
              href={PLAY_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white font-bold text-xs shrink-0 shadow-lg shadow-emerald-950/50"
            >
              Get on Google Play ↗
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
