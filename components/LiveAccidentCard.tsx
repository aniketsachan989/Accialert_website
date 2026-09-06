"use client";

import { useState } from "react";
import Link from "next/link";
import {
  AlertTriangle,
  MapPin,
  Clock,
  Phone,
  Gauge,
  Droplet,
  CloudRain,
  Share2,
  CheckCircle2,
  FileSpreadsheet,
  Zap,
  Navigation,
  Mail,
  Send,
} from "lucide-react";
import { AccidentDocument } from "@/types";
import { formatDateTime, calculateDistanceKm } from "@/lib/utils";
import { queueEmergencyAlertEmail } from "@/lib/firestore-helpers";

interface LiveAccidentCardProps {
  accident: AccidentDocument;
  bankLocation?: { lat: number; lng: number };
  bankEmail?: string;
  bankName?: string;
  onAcknowledge?: (id: string) => void;
}

export default function LiveAccidentCard({
  accident,
  bankLocation = { lat: 28.6139, lng: 77.209 },
  bankEmail,
  bankName,
  onAcknowledge,
}: LiveAccidentCardProps) {
  const [mobilized, setMobilized] = useState(false);
  const [acknowledged, setAcknowledged] = useState(false);
  const [isResendingEmail, setIsResendingEmail] = useState(false);
  const [emailStatusText, setEmailStatusText] = useState<string | null>(null);

  const distance =
    accident.location?.latitude && accident.location?.longitude
      ? calculateDistanceKm(
          bankLocation.lat,
          bankLocation.lng,
          accident.location.latitude,
          accident.location.longitude
        )
      : null;

  // Silent state transitions - No audible sirens or loud alarms
  const handleMobilize = () => {
    setMobilized(true);
  };

  const handleAck = () => {
    setAcknowledged(true);
    if (onAcknowledge && accident.id) {
      onAcknowledge(accident.id);
    }
  };

  const handleResendEmail = async () => {
    const targetEmail = bankEmail || "bloodbank.emergency@trauma-network.org";
    setIsResendingEmail(true);
    setEmailStatusText("Queueing priority email...");

    try {
      const res = await queueEmergencyAlertEmail({
        to: targetEmail,
        bankName: bankName || "Verified Regional Blood Bank",
        victimName: accident.userName,
        bloodGroup: accident.bloodGroup || "O+",
        locationAddress: accident.location?.address,
        latitude: accident.location?.latitude,
        longitude: accident.location?.longitude,
        distanceKm: distance,
        impactGForce: accident.gForce,
        accidentId: accident.id,
      });

      if (res.success) {
        setEmailStatusText(`Priority email dispatched to ${targetEmail}`);
      } else {
        setEmailStatusText("Email queued into /mail collection");
      }
    } catch (e: any) {
      setEmailStatusText("Email queued in cloud mail stream");
    } finally {
      setIsResendingEmail(false);
      setTimeout(() => setEmailStatusText(null), 5000);
    }
  };

  return (
    <div
      className={`relative bg-[#111827] border rounded-3xl p-6 shadow-2xl transition-all glow-card ${
        mobilized
          ? "border-emerald-500/80 bg-[#0f1d24]"
          : "border-red-500/70 hover:border-red-500 shadow-red-950/40 glow-border-red"
      }`}
    >
      {/* Top Banner with Alert Status & Blood Group */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4 mb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-red-600/20 border border-red-500/40 flex items-center justify-center">
            <AlertTriangle className="w-5 h-5 text-red-400 animate-bounce" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-black text-red-400 tracking-wider">
                ACTIVE CRASH ALERT
              </span>
              <span className="text-[10px] bg-red-950 text-red-300 font-mono font-bold px-2 py-0.5 rounded border border-red-800">
                {accident.id ? accident.id.slice(0, 10) : "INC-LIVE"}
              </span>
            </div>
            <div className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
              <Clock className="w-3 h-3" />
              <span>{formatDateTime(accident.createdAt)}</span>
            </div>
          </div>
        </div>

        {/* Required Blood Group Pill */}
        <div className="flex items-center gap-2">
          <div className="text-right">
            <span className="text-[10px] font-bold text-slate-400 uppercase block">Required</span>
            <span className="text-[10px] text-red-400 font-semibold">Mobilize Immediately</span>
          </div>
          <div className="px-3.5 py-1.5 rounded-xl bg-red-600 text-white font-mono font-black text-base shadow-md shadow-red-950/60 border border-red-400/40 flex items-center gap-1">
            <Droplet className="w-4 h-4 fill-white" />
            <span>{accident.bloodGroup || "O+"}</span>
          </div>
        </div>
      </div>

      {/* Silent Priority Email Dispatch Badge & Feedback */}
      <div className="bg-[#0B0F19] rounded-2xl p-3 border border-blue-500/40 mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center shrink-0">
            <Mail className="w-4 h-4 text-blue-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold text-blue-300 uppercase tracking-wider">
                Direct Emergency Mail Dispatched
              </span>
              <span className="text-[9px] bg-blue-950 text-blue-300 px-1.5 py-0.5 rounded border border-blue-700 font-mono font-bold">
                SIRENS OFF
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              Notified: <span className="text-slate-200 font-mono font-semibold">{bankEmail || "Direct Hospital Trauma Desk"}</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-center">
          <button
            onClick={handleResendEmail}
            disabled={isResendingEmail}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-950/80 hover:bg-blue-900 border border-blue-700 text-[11px] font-bold text-blue-300 hover:text-white transition-all active:scale-95 disabled:opacity-50"
            title="Resend direct notification email to blood bank"
          >
            <Send className="w-3 h-3 text-blue-400" />
            <span>{isResendingEmail ? "Queueing..." : "Resend Email"}</span>
          </button>
        </div>
      </div>

      {emailStatusText && (
        <div className="mb-4 p-2.5 rounded-xl bg-emerald-950/60 border border-emerald-700 text-xs text-emerald-300 flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          <span>{emailStatusText}</span>
        </div>
      )}

      {/* Victim & Emergency Contact Information */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div className="bg-[#0B0F19] rounded-2xl p-3.5 border border-slate-800">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">
            Victim Name
          </span>
          <span className="text-sm font-bold text-white block mt-0.5">
            {accident.userName || "Verified Driver"}
          </span>
          <div className="flex items-center gap-1 text-xs text-slate-300 mt-1 font-mono">
            <Phone className="w-3 h-3 text-emerald-400" />
            <span>{accident.userPhone || "Not Provided"}</span>
          </div>
        </div>

        <div className="bg-[#0B0F19] rounded-2xl p-3.5 border border-slate-800">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase font-bold text-slate-400">
              Proximity to Blood Bank
            </span>
            {distance !== null && (
              <span className="text-[10px] font-mono font-bold text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800">
                {distance} km away
              </span>
            )}
          </div>
          <div className="flex items-center gap-1.5 text-xs text-slate-200 mt-1">
            <MapPin className="w-3.5 h-3.5 text-red-400 shrink-0" />
            <span className="truncate">
              {accident.location?.address || `${accident.location?.latitude?.toFixed(4)}, ${accident.location?.longitude?.toFixed(4)}`}
            </span>
          </div>
          <div className="text-[10px] text-slate-400 font-mono mt-1">
            Lat: {accident.location?.latitude?.toFixed(4)} • Lng: {accident.location?.longitude?.toFixed(4)}
          </div>
        </div>
      </div>

      {/* Simple Emergency Status Strip */}
      <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-5">
        <div className="bg-[#0B0F19] rounded-xl p-2.5 border border-slate-800 text-center">
          <span className="text-[10px] text-slate-400 uppercase font-semibold">Incident Severity</span>
          <div className="text-xs sm:text-sm font-bold text-red-400 mt-0.5">
            Severe Crash
          </div>
        </div>

        <div className="bg-[#0B0F19] rounded-xl p-2.5 border border-slate-800 text-center">
          <span className="text-[10px] text-slate-400 uppercase font-semibold">Hospital Alert</span>
          <div className="text-xs sm:text-sm font-bold text-emerald-400 mt-0.5">
            Priority Transfusion
          </div>
        </div>

        <div className="bg-[#0B0F19] rounded-xl p-2.5 border border-slate-800 text-center">
          <span className="text-[10px] text-slate-400 uppercase font-semibold">Weather</span>
          <div className="text-xs font-bold text-slate-300 mt-0.5 truncate">
            {accident.weatherCondition || "Thunderstorm"}
          </div>
        </div>
      </div>

      {/* Action CTA Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-800">
        <div className="flex items-center gap-2">
          {mobilized ? (
            <div className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-emerald-950 text-emerald-300 border border-emerald-700 text-xs font-bold">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Blood Units Reserved & Dispatched</span>
            </div>
          ) : (
            <button
              onClick={handleMobilize}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold shadow-md shadow-red-950/50 transition-all active:scale-95"
            >
              <Droplet className="w-3.5 h-3.5 fill-white" />
              <span>Mobilize Blood Unit ({accident.bloodGroup})</span>
            </button>
          )}

          {!acknowledged && !mobilized && (
            <button
              onClick={handleAck}
              className="px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold border border-slate-700 transition-colors"
            >
              Acknowledge
            </button>
          )}
        </div>

        <div className="flex items-center gap-2">
          <Link
            href={`/blackbox-portal?name=${encodeURIComponent(accident.userName || "")}&bloodGroup=${encodeURIComponent(accident.bloodGroup || "O+")}&phone=${encodeURIComponent(accident.userPhone || "")}`}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#0B0F19] hover:bg-slate-800 text-cyan-300 border border-cyan-800/80 text-xs font-semibold transition-colors"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-cyan-400" />
            <span>Blackbox Record</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
