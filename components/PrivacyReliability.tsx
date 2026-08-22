"use client";

import {
  ShieldCheck,
  Battery,
  Lock,
  HardDrive,
  Cpu,
  Smartphone,
  CheckCircle2,
  AlertCircle,
  EyeOff,
  ServerOff,
  Radio,
  FileCheck,
} from "lucide-react";

export default function PrivacyReliability() {
  return (
    <section id="privacy" className="py-20 lg:py-28 bg-[#0a0e17] border-t border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/60 border border-emerald-800/50 text-xs font-semibold text-emerald-400 mb-4">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>PRIVACY FIRST & BULLETPROOF RELIABILITY</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Local-First Architecture & Android 14+ Stay-Alive
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-400 leading-relaxed">
            Your daily GPS tracks never leave your device. We engineered an uncompromising
            privacy model that activates cloud telemetry strictly when an authentic crash occurs.
          </p>
        </div>

        {/* Dual Column: Privacy Storage Model & Battery Optimization Guide */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
          {/* Left: Local-Only Circle Storage & Privacy Guarantee */}
          <div className="bg-[#111827] rounded-3xl p-8 border border-slate-800 flex flex-col justify-between shadow-2xl glow-card">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
                  <Lock className="w-6 h-6 text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Local-Only Circle Storage</h3>
                  <p className="text-xs text-emerald-400 font-mono">Zero Background Tracking</p>
                </div>
              </div>

              <p className="text-sm text-slate-300 leading-relaxed mb-6">
                Most safety applications continuously stream user location data to centralized
                cloud servers. AcciAlert utilizes an encrypted on-device SQLite database for your
                emergency circle and routine routes.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#0B0F19] border border-slate-800">
                  <EyeOff className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-white">No Route Tracking or History</h4>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      GPS coordinates are only polled when the Accelerometer + Gyroscope IMU flags a
                      potential violent impact event.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#0B0F19] border border-slate-800">
                  <ServerOff className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-white">Local KeyStore Encryption</h4>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      Medical allergy profiles and personal emergency contacts are encrypted using
                      Android Hardware-Backed KeyStore (AES-256 GCM).
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#0B0F19] border border-slate-800">
                  <Radio className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-white">Direct GSM Emergency Fallback</h4>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      SOS SMS messages route directly through the phone&apos;s physical SIM card and
                      telecom tower, completely independent of internet uptime.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <span>Encrypted on Device</span>
              <span className="font-mono text-emerald-400 font-semibold">ISO 27001 & HIPAA Compliant</span>
            </div>
          </div>

          {/* Right: Android 14+ "Stay-Alive" Protocol & Optimization Guide */}
          <div className="bg-[#111827] rounded-3xl p-8 border border-slate-800 flex flex-col justify-between shadow-2xl glow-card">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center">
                  <Battery className="w-6 h-6 text-cyan-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">&quot;Stay Alive&quot; Android 14+ Guide</h3>
                  <p className="text-xs text-cyan-400 font-mono">24/7 Crash Guard Without Battery Drain</p>
                </div>
              </div>

              <p className="text-sm text-slate-300 leading-relaxed mb-6">
                Modern Android OEM battery managers (Samsung OneUI, Xiaomi MIUI, Google Pixel)
                frequently kill background services. AcciAlert uses a 3-tier persistence strategy:
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#0B0F19] border border-slate-800">
                  <div className="w-6 h-6 rounded-full bg-cyan-950 text-cyan-400 font-mono text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                    1
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">Foreground Service with Sensor WakeLock</h4>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      Low-power sticky foreground notification prevents Android OS Low Memory Killer (LMK) from termination.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#0B0F19] border border-slate-800">
                  <div className="w-6 h-6 rounded-full bg-cyan-950 text-cyan-400 font-mono text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                    2
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">Battery Optimization Whitelisting</h4>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      Requests `REQUEST_IGNORE_BATTERY_OPTIMIZATIONS` so sensor loops run in deep doze mode without dropping frames.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#0B0F19] border border-slate-800">
                  <div className="w-6 h-6 rounded-full bg-cyan-950 text-cyan-400 font-mono text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                    3
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">Power-Rip Auto-Arming on 12V Charger</h4>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      Automatically shifts sensor sampling rate from 20Hz to 100Hz ultra-fidelity whenever connected to car USB/12V.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <span>Average Daily Battery Use</span>
              <span className="font-mono text-cyan-400 font-semibold">&lt; 1.4% Battery Consumption / 24h</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
