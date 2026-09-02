import type { Metadata } from "next";
import Link from "next/link";
import { Shield, ArrowLeft, Battery, Smartphone, Lock, CheckCircle2 } from "lucide-react";
import { PLAY_STORE_URL } from "@/lib/utils";

export const metadata: Metadata = {
  title: "How to Configure Medical ID and 24/7 Stay-Alive on Android 14+ | AcciAlert",
  description:
    "Step-by-step configuration guide for setting up unblockable Medical ID lock screen overlays and optimizing battery persistence on Samsung, Xiaomi, OnePlus, and Google Pixel devices.",
  keywords: [
    "Android Medical ID Setup",
    "Android 14 Stay Alive Emergency App",
    "Lock Screen Medical Profile",
    "OEM Battery Optimization Fix",
    "AcciAlert Android Guide",
  ],
};

export default function AndroidSetupGuidePage() {
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

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-cyan-500/30 text-xs font-semibold text-cyan-400 mb-4">
            <Smartphone className="w-3.5 h-3.5" />
            <span className="font-mono text-[11px] tracking-wider uppercase">ANDROID TECHNICAL GUIDE</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
            Configuring Medical ID &amp; 24/7 Crash Guard on Modern Android Devices
          </h1>
          <p className="text-sm sm:text-base text-slate-400 mt-3 leading-relaxed">
            Ensure your life-saving background safety services remain active 24/7 without aggressive OEM battery termination on Android 12, 13, 14, and 15.
          </p>
        </div>

        {/* Content Card */}
        <div className="bg-[#111827] border border-slate-800 rounded-3xl p-6 sm:p-10 lg:p-12 shadow-2xl space-y-8 text-slate-300 text-sm sm:text-base leading-relaxed">
          <section className="space-y-4">
            <h2 className="text-2xl font-black text-white tracking-tight flex items-center gap-2.5">
              <Lock className="w-6 h-6 text-amber-400" />
              <span>1. Why Unblockable Lock Screen Overlays Matter</span>
            </h2>
            <p>
              In high-speed collisions, victims are frequently knocked unconscious or unable to unlock their devices. Most smartphones keep vital emergency details hidden behind biometric or PIN authentication.
            </p>
            <p>
              AcciAlert utilizes the Android <code className="text-cyan-400 font-mono bg-slate-900 px-1.5 py-0.5 rounded">SYSTEM_ALERT_WINDOW</code> permission with emergency activity flags to project an unblockable Medical ID card over the lock screen immediately upon crash confirmation.
            </p>
          </section>

          <section className="space-y-4 pt-6 border-t border-slate-800/80">
            <h2 className="text-2xl font-black text-white tracking-tight flex items-center gap-2.5">
              <Battery className="w-6 h-6 text-cyan-400" />
              <span>2. Solving Aggressive OEM Battery Killers</span>
            </h2>
            <p>
              Manufacturers such as Xiaomi (MIUI/HyperOS), Samsung (One UI), OnePlus (OxygenOS), and Vivo implement aggressive task-killers that silence background sensor monitoring. Follow these 3 critical steps:
            </p>

            <div className="space-y-3 pt-2">
              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-white text-sm">Step 1: Set Battery Usage to &ldquo;Unrestricted&rdquo;</div>
                  <p className="text-xs text-slate-400 mt-1">Navigate to Settings &gt; Apps &gt; AcciAlert &gt; Battery &gt; Select &ldquo;Unrestricted&rdquo;.</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-white text-sm">Step 2: Enable Autostart &amp; Lock in Recents</div>
                  <p className="text-xs text-slate-400 mt-1">On Xiaomi and Realme, enable &ldquo;Autostart&rdquo; in App Info and lock AcciAlert in the Recent Apps view.</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-white text-sm">Step 3: Grant &ldquo;Display Over Other Apps&rdquo; Permission</div>
                  <p className="text-xs text-slate-400 mt-1">Allows the 20-second Medical ID countdown card to punch through lock screens during an active emergency.</p>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Box */}
          <div className="p-6 rounded-2xl bg-gradient-to-r from-cyan-950/40 via-slate-900 to-slate-900 border border-cyan-500/40 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold text-white">Equip Your Device Now</h3>
              <p className="text-xs text-slate-300 mt-1">Install AcciAlert v5.0 Pro to enable continuous edge safety protection.</p>
            </div>
            <a
              href={PLAY_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white font-bold text-xs shrink-0 shadow-lg shadow-emerald-950/50"
            >
              Install on Google Play ↗
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
