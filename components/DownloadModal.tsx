"use client";

import { useState } from "react";
import { X, QrCode, Smartphone, CheckCircle, ShieldCheck, Cpu, ExternalLink } from "lucide-react";
import { PLAY_STORE_URL } from "@/lib/utils";

interface DownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Google Play icon SVG
function GooglePlayIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 512 512" className={className} fill="currentColor">
      <path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z" />
    </svg>
  );
}

export default function DownloadModal({ isOpen, onClose }: DownloadModalProps) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopyLink = () => {
    if (typeof navigator !== "undefined") {
      navigator.clipboard.writeText(PLAY_STORE_URL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-[#111827] border border-slate-700 rounded-2xl p-6 sm:p-8 shadow-2xl overflow-hidden">
        {/* Decorative background glow */}
        <div className="absolute -top-24 -right-24 w-60 h-60 bg-emerald-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-60 h-60 bg-cyan-600/20 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          aria-label="Close Modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-5">
          <div className="w-12 h-12 rounded-xl bg-emerald-600/20 border border-emerald-500/30 flex items-center justify-center">
            <Smartphone className="w-6 h-6 text-emerald-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-bold text-white">Get AcciAlert on Google Play</h3>
              <span className="bg-gradient-to-r from-red-600 to-rose-600 text-white font-bold text-[10px] px-2 py-0.5 rounded-full">
                v5.0 Active
              </span>
            </div>
            <p className="text-xs text-slate-400">Official Android Release • Verified by Google Play Protect</p>
          </div>
        </div>

        {/* QR Code and Direct Download Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
          {/* QR Code Container */}
          <div className="flex flex-col items-center justify-center p-5 bg-[#0B0F19] rounded-xl border border-slate-800 text-center">
            <div className="relative p-3 bg-white rounded-lg shadow-inner mb-3">
              {/* SVG QR Code Simulation */}
              <svg
                viewBox="0 0 100 100"
                className="w-28 h-28 text-slate-900"
                fill="currentColor"
              >
                {/* Corner Finder Patterns */}
                <rect x="0" y="0" width="30" height="30" rx="4" />
                <rect x="5" y="5" width="20" height="20" fill="white" />
                <rect x="10" y="10" width="10" height="10" />

                <rect x="70" y="0" width="30" height="30" rx="4" />
                <rect x="75" y="5" width="20" height="20" fill="white" />
                <rect x="80" y="10" width="10" height="10" />

                <rect x="0" y="70" width="30" height="30" rx="4" />
                <rect x="5" y="75" width="20" height="20" fill="white" />
                <rect x="10" y="80" width="10" height="10" />

                {/* Data Matrix Bits */}
                <rect x="36" y="10" width="8" height="8" />
                <rect x="48" y="6" width="6" height="6" />
                <rect x="58" y="14" width="6" height="6" />
                <rect x="36" y="24" width="6" height="6" />
                <rect x="48" y="20" width="12" height="8" />

                <rect x="10" y="36" width="8" height="6" />
                <rect x="22" y="44" width="8" height="8" />
                <rect x="34" y="36" width="8" height="8" />
                <rect x="46" y="40" width="16" height="6" />
                <rect x="66" y="36" width="10" height="8" />
                <rect x="80" y="44" width="12" height="6" />

                <rect x="38" y="56" width="12" height="8" />
                <rect x="54" y="52" width="8" height="12" />
                <rect x="68" y="58" width="12" height="6" />
                <rect x="84" y="54" width="8" height="10" />

                <rect x="36" y="72" width="8" height="8" />
                <rect x="48" y="76" width="8" height="12" />
                <rect x="60" y="70" width="12" height="8" />
                <rect x="76" y="74" width="14" height="8" />
                <rect x="70" y="86" width="8" height="8" />
                <rect x="84" y="86" width="8" height="8" />
              </svg>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-slate-300 font-medium">
              <QrCode className="w-3.5 h-3.5 text-emerald-400" />
              <span>Scan to Open on Play Store</span>
            </div>
          </div>

          {/* Quick Specs & Direct Play Store Button */}
          <div className="flex flex-col justify-between space-y-3">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Google Play Protect Verified</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <Cpu className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Edge TensorFlow Lite 2.14 Engine</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Automatic Background Updates</span>
              </div>
            </div>

            <div className="pt-2">
              <a
                href={PLAY_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-emerald-600 shadow-lg shadow-emerald-950/50 transition-transform active:scale-95 group"
              >
                <GooglePlayIcon className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span>Open in Google Play</span>
                <ExternalLink className="w-4 h-4 text-emerald-200" />
              </a>
              <button
                onClick={handleCopyLink}
                className="w-full mt-2 text-center text-xs text-slate-400 hover:text-slate-200 transition-colors"
              >
                {copied ? "✓ Play Store link copied to clipboard!" : "Copy Play Store URL"}
              </button>
            </div>
          </div>
        </div>

        {/* Onboarding Checklist Guide */}
        <div className="bg-[#0B0F19]/80 rounded-xl p-4 border border-slate-800 text-xs text-slate-300 space-y-2">
          <div className="font-semibold text-slate-200 flex items-center gap-1.5">
            <span>Essential Post-Install Setup:</span>
          </div>
          <ol className="list-decimal list-inside space-y-1 text-slate-400 text-[11px] leading-relaxed">
            <li>Allow <strong>"Display over other apps"</strong> (Required for 20s lock screen overlay).</li>
            <li>Grant <strong>"Physical Activity &amp; Precise Location"</strong> permission.</li>
            <li>Set Battery to <strong>"Unrestricted"</strong> under Settings &gt; Apps &gt; AcciAlert.</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
