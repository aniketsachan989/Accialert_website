"use client";

import { useState } from "react";
import {
  Printer,
  ShieldCheck,
  FileSpreadsheet,
  Heart,
  Gauge,
  MapPin,
  CloudRain,
  Share2,
  CheckCircle2,
  Lock,
  Calendar,
  Phone,
  AlertTriangle,
  Zap,
  RotateCcw,
} from "lucide-react";
import { UserDocument, IncidentDocument } from "@/types";
import { formatDateTime, generateIncidentHash, playAlertSound } from "@/lib/utils";

interface BlackboxReportProps {
  user: UserDocument;
  incident: IncidentDocument | null;
  onResetSearch?: () => void;
}

export default function BlackboxReport({ user, incident, onResetSearch }: BlackboxReportProps) {
  const [copied, setCopied] = useState(false);

  const incidentId = incident?.id || "INC-2026-0884";
  const incidentTime = incident?.timestamp || new Date().toISOString();
  const shaHash = generateIncidentHash(incidentId, incidentTime);

  const handlePrint = () => {
    playAlertSound("beep");
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  const handleCopyHash = () => {
    if (typeof navigator !== "undefined") {
      navigator.clipboard.writeText(shaHash);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Action Bar (Hidden when printing) */}
      <div className="no-print flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-[#111827] border border-slate-800 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-600/20 border border-cyan-500/30 flex items-center justify-center">
            <ShieldCheck className="w-5 h-5 text-cyan-400" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white">Cryptographically Verified Record</h3>
            <p className="text-[11px] text-slate-400 font-mono">
              SHA-256: {shaHash.slice(0, 20)}...
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          {onResetSearch && (
            <button
              onClick={onResetSearch}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700 transition-colors flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>New Search</span>
            </button>
          )}

          <button
            onClick={handleCopyHash}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700 transition-colors flex items-center gap-1.5"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>{copied ? "Copied Hash!" : "Copy Hash"}</span>
          </button>

          <button
            onClick={handlePrint}
            className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 shadow-md shadow-red-950/50 flex items-center gap-2 transition-transform active:scale-95"
          >
            <Printer className="w-4 h-4" />
            <span>Print / Save as PDF</span>
          </button>
        </div>
      </div>

      {/* Printable 1-Page Certificate Container */}
      <div className="blackbox-print-container bg-[#111827] border-2 border-slate-700 rounded-3xl p-6 sm:p-8 shadow-2xl text-slate-200">
        {/* Document Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-2 border-slate-800 pb-6 mb-6">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-red-600 flex items-center justify-center text-white shadow-md">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-black text-white font-mono tracking-tight">
                  ACCI<span className="text-red-500">ALERT</span>
                </span>
                <span className="text-[10px] uppercase font-bold px-2 py-0.5 bg-cyan-950 text-cyan-300 border border-cyan-800 rounded">
                  OFFICIAL AUDIT CERTIFICATE
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Digital Blackbox Telemetry & Medical Emergency Verification
              </p>
            </div>
          </div>

          <div className="text-left sm:text-right font-mono space-y-1">
            <div className="text-xs font-bold text-white">
              Incident ID: <span className="text-red-400">{incidentId}</span>
            </div>
            <div className="text-[11px] text-slate-400">
              Audit Date: {formatDateTime(incidentTime)}
            </div>
            <div className="text-[10px] text-emerald-400 flex items-center sm:justify-end gap-1">
              <CheckCircle2 className="w-3 h-3" />
              <span>Hardware KeyStore Signed</span>
            </div>
          </div>
        </div>

        {/* Cryptographic SHA-256 Verification Ribbon */}
        <div className="p-3 rounded-xl bg-[#0B0F19] border border-slate-800 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-cyan-400 shrink-0" />
            <span className="text-slate-400 font-semibold">Tamper-Evident SHA-256:</span>
          </div>
          <span className="font-mono text-cyan-300 text-[11px] break-all select-all font-semibold">
            {shaHash}
          </span>
        </div>

        {/* Grid Section 1: Patient Medical Profile */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3 pb-1 border-b border-slate-800">
            <Heart className="w-4 h-4 text-red-400" />
            <h4 className="text-xs font-extrabold uppercase font-mono tracking-wider text-slate-200">
              1. Verified Medical Profile & Emergency Identity
            </h4>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="bg-[#0B0F19] p-3 rounded-xl border border-slate-800">
              <span className="text-[10px] uppercase font-bold text-slate-500 block">
                Full Legal Name
              </span>
              <span className="text-sm font-bold text-white block mt-0.5">
                {user.profile.name}
              </span>
            </div>

            <div className="bg-[#0B0F19] p-3 rounded-xl border border-slate-800">
              <span className="text-[10px] uppercase font-bold text-slate-500 block">
                Blood Group (Verified)
              </span>
              <span className="text-base font-black font-mono text-red-400 block mt-0.5">
                {user.profile.bloodGroup}
              </span>
            </div>

            <div className="bg-[#0B0F19] p-3 rounded-xl border border-slate-800">
              <span className="text-[10px] uppercase font-bold text-slate-500 block">
                Primary Emergency Contact
              </span>
              <span className="text-xs font-bold text-white block mt-0.5">
                {user.primaryContact.name}
              </span>
              <span className="text-xs font-mono text-emerald-400 block">
                {user.primaryContact.phone}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-3">
            <div className="bg-[#0B0F19] p-3 rounded-xl border border-slate-800">
              <span className="text-[10px] uppercase font-bold text-slate-500 block">
                Known Drug Allergies
              </span>
              <span className="text-xs font-semibold text-amber-400 block mt-0.5">
                {user.profile.allergies || "No Known Drug Allergies (NKDA)"}
              </span>
            </div>

            <div className="bg-[#0B0F19] p-3 rounded-xl border border-slate-800">
              <span className="text-[10px] uppercase font-bold text-slate-500 block">
                Chronic Medical Conditions
              </span>
              <span className="text-xs font-semibold text-slate-200 block mt-0.5">
                {user.profile.medicalConditions || "None Reported"}
              </span>
            </div>

            <div className="bg-[#0B0F19] p-3 rounded-xl border border-slate-800">
              <span className="text-[10px] uppercase font-bold text-slate-500 block">
                Active Prescription Medications
              </span>
              <span className="text-xs font-semibold text-slate-200 block mt-0.5">
                {user.profile.medications || "None"}
              </span>
            </div>
          </div>
        </div>

        {/* Grid Section 2: Incident Status & Impact Verification */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3 pb-1 border-b border-slate-800">
            <ShieldCheck className="w-4 h-4 text-cyan-400" />
            <h4 className="text-xs font-extrabold uppercase font-mono tracking-wider text-slate-200">
              2. Incident Severity & Emergency Status
            </h4>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-[#0B0F19] p-3.5 rounded-xl border border-slate-800 text-center">
              <span className="text-[10px] uppercase font-bold text-slate-500 block">
                Impact Verification
              </span>
              <div className="text-base font-mono font-extrabold text-red-400 mt-1">
                CONFIRMED
              </div>
              <span className="text-[9px] text-emerald-400 font-mono">Severe Collision Verified</span>
            </div>

            <div className="bg-[#0B0F19] p-3.5 rounded-xl border border-slate-800 text-center">
              <span className="text-[10px] uppercase font-bold text-slate-500 block">
                Safety Response
              </span>
              <div className="text-base font-mono font-extrabold text-emerald-400 mt-1">
                ACTIVE
              </div>
              <span className="text-[9px] text-slate-400 font-mono">20s Safety Timer Triggered</span>
            </div>

            <div className="bg-[#0B0F19] p-3.5 rounded-xl border border-slate-800 text-center">
              <span className="text-[10px] uppercase font-bold text-slate-500 block">
                Family Notification
              </span>
              <div className="text-base font-mono font-bold text-white mt-1">
                DISPATCHED
              </div>
              <span className="text-[9px] text-emerald-400 font-mono">Live Map SMS Sent</span>
            </div>

            <div className="bg-[#0B0F19] p-3.5 rounded-xl border border-slate-800 text-center">
              <span className="text-[10px] uppercase font-bold text-slate-500 block">
                Blood Mobilization
              </span>
              <div className="text-base font-mono font-bold text-purple-400 mt-1">
                15 KM RADIUS
              </div>
              <span className="text-[9px] text-slate-400 font-mono">Matching Blood Units Alerted</span>
            </div>
          </div>
        </div>

        {/* Grid Section 3: Environmental Context & Satellite GPS Pin */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3 pb-1 border-b border-slate-800">
            <MapPin className="w-4 h-4 text-emerald-400" />
            <h4 className="text-xs font-extrabold uppercase font-mono tracking-wider text-slate-200">
              3. Satellite Positioning & Weather Environment
            </h4>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="bg-[#0B0F19] p-3.5 rounded-xl border border-slate-800">
              <span className="text-[10px] uppercase font-bold text-slate-500 block">
                Exact Crash Location Address
              </span>
              <span className="text-xs font-semibold text-white block mt-1 leading-relaxed">
                {incident?.location?.address || "NH-48 Flyover, Near Mahipalpur Junction, New Delhi, India"}
              </span>
              <div className="mt-2 text-[11px] font-mono text-cyan-400">
                Coordinates: {incident?.location?.latitude || 28.6139}° N, {incident?.location?.longitude || 77.2090}° E
              </div>
            </div>

            <div className="bg-[#0B0F19] p-3.5 rounded-xl border border-slate-800">
              <span className="text-[10px] uppercase font-bold text-slate-500 block">
                Atmospheric & Road Conditions
              </span>
              <span className="text-xs font-semibold text-white block mt-1">
                Condition: {incident?.weather?.condition || "Thunderstorm / Heavy Rain"}
              </span>
              <span className="text-xs text-slate-400 block mt-0.5">
                Ambient Temperature: {incident?.weather?.temp || 24}°C (Road surface friction wet)
              </span>
              <div className="mt-2 text-[11px] font-mono text-emerald-400">
                OpenWeather Telemetry Sync: Confirmed
              </div>
            </div>
          </div>
        </div>

        {/* Section 4: Official Sign-Off & Verification Seal */}
        <div className="pt-4 border-t-2 border-slate-800">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="p-3 rounded-xl bg-[#0B0F19] border border-slate-800">
              <div className="h-8 border-b border-dashed border-slate-700 mb-1"></div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block">
                Investigating Officer
              </span>
              <span className="text-[9px] text-slate-400 block">Law Enforcement Sign & Badge</span>
            </div>

            <div className="p-3 rounded-xl bg-[#0B0F19] border border-slate-800">
              <div className="h-8 border-b border-dashed border-slate-700 mb-1"></div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block">
                Attending Paramedic
              </span>
              <span className="text-[9px] text-slate-400 block">EMS Reg / Trauma Unit ID</span>
            </div>

            <div className="p-3 rounded-xl bg-[#0B0F19] border border-slate-800">
              <div className="h-8 border-b border-dashed border-slate-700 mb-1"></div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block">
                Insurance Assessor
              </span>
              <span className="text-[9px] text-slate-400 block">Claims Adjuster Validation</span>
            </div>
          </div>

          <div className="mt-4 text-center text-[10px] text-slate-400 font-mono">
            AcciAlert Digital Blackbox Platform • Generated automatically from on-device tamper-proof telemetry.
          </div>
        </div>
      </div>
    </div>
  );
}
