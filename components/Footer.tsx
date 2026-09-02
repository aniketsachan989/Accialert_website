"use client";

import Link from "next/link";
import Image from "next/image";
import { ShieldAlert, Heart, Phone, ExternalLink, Activity, Droplet, FileSpreadsheet, Lock } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#080B12] border-t border-slate-800 text-slate-400 text-xs py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12 mb-12">
          {/* Col 1 & 2: Brand Description */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-black border border-slate-700 text-white shadow-md p-1">
                <Image
                  src="/logo.png"
                  alt="AcciAlert Logo"
                  width={32}
                  height={32}
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-lg font-black tracking-tight text-white font-mono">
                ACCI<span className="text-red-500">ALERT</span>
              </span>
            </Link>
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              Next-generation autonomous emergency response ecosystem. Leveraging on-device
              TensorFlow Lite machine learning to detect crashes instantly, override lock screens,
              and mobilize regional blood banks during the golden hour.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-[10px] text-slate-300 font-mono">
                <Lock className="w-3 h-3 text-emerald-400" /> AES-256 Encrypted
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-red-950/70 border border-red-800/60 text-[10px] text-red-300 font-mono font-bold">
                <Activity className="w-3 h-3 text-red-400" /> v5.0 Pro
              </span>
            </div>
          </div>

          {/* Col 3: Platform Navigation */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white font-mono">
              Platform Features
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/#simulator" className="hover:text-white transition-colors">
                  Interactive Emergency Simulator
                </Link>
              </li>
              <li>
                <Link href="/#app-screens" className="hover:text-white transition-colors">
                  Official Android App Screens
                </Link>
              </li>
              <li>
                <Link href="/#architecture" className="hover:text-white transition-colors">
                  Safety System Architecture
                </Link>
              </li>
              <li>
                <Link href="/#privacy" className="hover:text-white transition-colors">
                  Local-Only Circle Privacy
                </Link>
              </li>
              <li>
                <Link href="/guides/golden-hour-trauma-care" className="hover:text-white transition-colors">
                  Golden Hour Trauma Guide
                </Link>
              </li>
              <li>
                <Link href="/guides/india-emergency-numbers-112-108" className="hover:text-white transition-colors">
                  India 112 / 108 Emergency Guide
                </Link>
              </li>
              <li>
                <a
                  href="https://play.google.com/store/apps/details?id=com.aniket.accialertsos&pcampaignid=web_share"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 hover:text-emerald-300 transition-colors flex items-center gap-1 font-semibold"
                >
                  Get v5.0 on Google Play ↗
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Emergency Portals (Blood Bank Weightage) */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-red-400 font-mono flex items-center gap-1.5">
              <Droplet className="w-3.5 h-3.5 fill-red-400" /> Blood Bank Network
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/blood-banks/register"
                  className="text-red-300 hover:text-white font-bold transition-colors flex items-center gap-1.5 bg-red-950/40 px-2.5 py-1 rounded-lg border border-red-800/50"
                >
                  <Droplet className="w-3 h-3 fill-red-400" /> Register Verified Blood Bank
                </Link>
              </li>
              <li>
                <Link href="/blood-banks" className="hover:text-white transition-colors flex items-center gap-1.5">
                  Blood Bank Hub & Radar
                </Link>
              </li>
              <li>
                <Link href="/blood-banks/dashboard" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                  Live Dispatch Feed
                </Link>
              </li>
              <li>
                <Link href="/blackbox-portal" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <FileSpreadsheet className="w-3.5 h-3.5 text-cyan-400" /> Digital Blackbox Portal
                </Link>
              </li>
              <li>
                <Link href="/admin/blood-banks" className="hover:text-white transition-colors flex items-center gap-1.5 text-slate-500 hover:text-slate-400 text-[11px]">
                  <span>• License Admin Review</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 5: Emergency Helpline Notice */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-red-400 font-mono flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5" /> Emergency SOS
            </h4>
            <div className="p-3.5 rounded-xl bg-red-950/30 border border-red-900/50 space-y-1.5">
              <div className="text-[11px] text-red-200 font-bold">
                Immediate Danger?
              </div>
              <div className="text-[11px] text-slate-300">
                Dial National Emergency Numbers:
              </div>
              <div className="font-mono text-xs font-black text-white flex items-center gap-2 pt-0.5">
                <span className="bg-red-900/80 px-2 py-0.5 rounded border border-red-700">112 (Emergency)</span>
                <span className="bg-red-900/80 px-2 py-0.5 rounded border border-red-700">108 (Ambulance)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-400 text-[11px]">
          <div>
            © {new Date().getFullYear()} Aniket DevStudio. All rights reserved.
          </div>
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-[11px]">
            <Link href="/privacy-policy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <span>•</span>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
            <span>•</span>
            <Link href="/contact" className="hover:text-white transition-colors">
              Contact &amp; Support
            </Link>
            <span>•</span>
            <span className="text-slate-500">Built for first-responder workflows</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
