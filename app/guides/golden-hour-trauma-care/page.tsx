import type { Metadata } from "next";
import Link from "next/link";
import { Clock, ArrowLeft, HeartPulse, Droplet, Shield, Activity, PhoneCall } from "lucide-react";
import { PLAY_STORE_URL } from "@/lib/utils";

export const metadata: Metadata = {
  title: "The Golden Hour in Trauma Emergencies: Why Fast Detection Saves Lives | AcciAlert",
  description:
    "Comprehensive guide on the clinical importance of the Golden Hour in road traffic collisions and how AI on-device crash detection bridges critical emergency dispatch delays.",
  keywords: [
    "Golden Hour Trauma Care",
    "Accident Detection India",
    "Emergency Medical ID",
    "Blood Bank Mobilization",
    "Crash Response Time",
  ],
};

export default function GoldenHourGuidePage() {
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

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-red-500/30 text-xs font-semibold text-red-400 mb-4">
            <Clock className="w-3.5 h-3.5" />
            <span className="font-mono text-[11px] tracking-wider uppercase">EMERGENCY MEDICINE GUIDE</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
            The Golden Hour in Trauma: How Zero-Delay Detection Prevents Fatalities
          </h1>
          <p className="text-sm sm:text-base text-slate-400 mt-3 leading-relaxed">
            In severe road collisions, the first 60 minutes determine patient survivability. Learn why autonomous edge detection and early blood mobilization are revolutionizing trauma response.
          </p>
        </div>

        {/* Content Card */}
        <div className="bg-[#111827] border border-slate-800 rounded-3xl p-6 sm:p-10 lg:p-12 shadow-2xl space-y-8 text-slate-300 text-sm sm:text-base leading-relaxed">
          <section className="space-y-4">
            <h2 className="text-2xl font-black text-white tracking-tight flex items-center gap-2.5">
              <HeartPulse className="w-6 h-6 text-red-500" />
              <span>What is the &ldquo;Golden Hour&rdquo; in Emergency Medicine?</span>
            </h2>
            <p>
              The &ldquo;Golden Hour&rdquo; refers to the period immediately following traumatic injury (such as high-speed vehicular impact or structural falls) during which prompt medical evaluation and surgical intervention can prevent irreversible shock and organ failure.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
                <div className="text-2xl font-black text-white font-mono text-red-400">0 - 10 Min</div>
                <div className="text-xs text-slate-400 mt-1 font-semibold">Impact to First Alarm</div>
                <p className="text-xs text-slate-400 mt-1">Manual bystander calls often take 15-20 minutes. AcciAlert reduces this to 20 seconds.</p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
                <div className="text-2xl font-black text-white font-mono text-amber-400">10 - 30 Min</div>
                <div className="text-xs text-slate-400 mt-1 font-semibold">Blood Bank Radar Ping</div>
                <p className="text-xs text-slate-400 mt-1">15km geohashed radar alerts blood centers to prepare matching units in advance.</p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
                <div className="text-2xl font-black text-white font-mono text-emerald-400">30 - 60 Min</div>
                <div className="text-xs text-slate-400 mt-1 font-semibold">Definitive Trauma Surgery</div>
                <p className="text-xs text-slate-400 mt-1">Victim reaches surgical theater with cross-matched blood already reserved.</p>
              </div>
            </div>
          </section>

          <section className="space-y-4 pt-6 border-t border-slate-800/80">
            <h2 className="text-2xl font-black text-white tracking-tight flex items-center gap-2.5">
              <Droplet className="w-6 h-6 text-red-400" />
              <span>The Fatal Risk of Hemorrhagic Shock</span>
            </h2>
            <p>
              Severe internal or external hemorrhage is the leading cause of preventable trauma deaths. When victims reach hospitals without prior blood matching, doctors must either spend precious minutes grouping blood or utilize limited universal uncrossmatched O-negative stock.
            </p>
            <p>
              By transmitting the victim&apos;s verified blood group immediately upon crash detection, AcciAlert enables regional facilities to prepare exact matches before the ambulance arrives.
            </p>
          </section>

          <section className="space-y-4 pt-6 border-t border-slate-800/80">
            <h2 className="text-2xl font-black text-white tracking-tight flex items-center gap-2.5">
              <Shield className="w-6 h-6 text-cyan-400" />
              <span>How On-Device AI Eliminates Dispatch Delays</span>
            </h2>
            <p>
              Unlike legacy systems requiring human operator intervention, AcciAlert runs a 50Hz TensorFlow Lite model directly on the smartphone. Sensor fusion between accelerometer G-forces, angular gyroscopes, and GPS speed drop detects high-severity collisions in under 150 milliseconds.
            </p>
          </section>

          {/* CTA Box */}
          <div className="p-6 rounded-2xl bg-gradient-to-r from-red-950/40 via-slate-900 to-slate-900 border border-red-500/40 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold text-white">Protect Yourself on Every Journey</h3>
              <p className="text-xs text-slate-300 mt-1">Download AcciAlert v5.0 Pro on Google Play Store for zero-delay crash defense.</p>
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
