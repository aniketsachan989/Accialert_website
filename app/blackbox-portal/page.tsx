"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
  FileSpreadsheet,
  Search,
  ShieldCheck,
  AlertTriangle,
  Lock,
  Sparkles,
  ArrowRight,
  Building2,
  BadgeAlert,
  Loader2,
  FileCheck2,
  History,
} from "lucide-react";
import { UserDocument, IncidentDocument } from "@/types";
import { getBlackboxReportById, SAMPLE_REPORTS } from "@/lib/firestore-helpers";
import BlackboxReport from "@/components/BlackboxReport";
import { playAlertSound } from "@/lib/utils";

function BlackboxPortalContent() {
  const searchParams = useSearchParams();
  const initialReportId = searchParams.get("reportId") || searchParams.get("id") || "";

  const [reportId, setReportId] = useState(initialReportId);
  const [institutionType, setInstitutionType] = useState<string>("police");
  const [badgeNumber, setBadgeNumber] = useState<string>("DL-POL-8841");

  const [searching, setSearching] = useState(false);
  const [matchedUser, setMatchedUser] = useState<UserDocument | null>(null);
  const [matchedIncident, setMatchedIncident] = useState<IncidentDocument | null>(null);
  const [activeReportId, setActiveReportId] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState("");
  const [accessLogged, setAccessLogged] = useState(false);

  useEffect(() => {
    if (initialReportId) {
      executeSearch(initialReportId);
    }
  }, []);

  const executeSearch = async (targetId: string) => {
    const cleanId = targetId.trim().toUpperCase();
    if (!cleanId) {
      setErrorMessage("Please enter a valid Digital Blackbox Report ID.");
      return;
    }

    setSearching(true);
    setErrorMessage("");
    setAccessLogged(false);

    try {
      const instName =
        institutionType === "police"
          ? `Traffic Police Authority (Badge #${badgeNumber || "ACTIVE"})`
          : institutionType === "insurance"
          ? `Insurance Claims Assessor (${badgeNumber || "IRDAI-AUTH"})`
          : `Hospital Trauma Registrar (${badgeNumber || "TRAUMA-REG"})`;

      const result = await getBlackboxReportById(cleanId, `INST-${institutionType.toUpperCase()}`, instName);

      if (result.user) {
        setMatchedUser(result.user);
        setMatchedIncident(result.incident);
        setActiveReportId(result.reportId);
        setAccessLogged(true);
        playAlertSound("success");
      } else {
        setMatchedUser(null);
        setMatchedIncident(null);
        setErrorMessage(
          `No crash certificate found with Report ID: "${cleanId}". Report IDs are generated at accident time and sent via SMS to verified emergency contacts.`
        );
        playAlertSound("beep");
      }
    } catch (err: any) {
      setErrorMessage(err.message || "An error occurred while querying the records.");
    } finally {
      setSearching(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    executeSearch(reportId);
  };

  const handleQuickLoadSample = (sampleId: string) => {
    setReportId(sampleId);
    executeSearch(sampleId);
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] py-10 sm:py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header Title Banner */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-800/50 text-xs font-semibold text-cyan-400">
            <FileSpreadsheet className="w-3.5 h-3.5 text-cyan-400" />
            <span>INSTITUTIONAL CRASH AUDIT GATEWAY</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Digital Blackbox Crash Verification
          </h1>
          <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
            Secure verification portal for Police, Hospital Trauma Registrars, and Insurance Claims
            Assessors to retrieve cryptographic 1-page Blackbox Incident Certificates using unguessable Report IDs.
          </p>
        </div>

        {matchedUser ? (
          /* Rendered 1-Page Printable Report */
          <div className="space-y-4 animate-in fade-in duration-300">
            {/* Audit Log Confirmation Banner */}
            {accessLogged && (
              <div className="p-3.5 rounded-2xl bg-emerald-950/80 border border-emerald-700 text-xs text-emerald-200 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>
                    <strong>Audit Trail Logged:</strong> Access to Report ID <strong className="font-mono text-white">{activeReportId}</strong> recorded in <code className="font-mono bg-emerald-900 px-1.5 py-0.5 rounded">/accessLogs</code>.
                  </span>
                </div>
                <span className="text-[10px] font-mono text-emerald-300 uppercase font-bold">
                  Immutable Logged
                </span>
              </div>
            )}

            <BlackboxReport
              user={matchedUser}
              incident={matchedIncident}
              onResetSearch={() => {
                setMatchedUser(null);
                setMatchedIncident(null);
                setAccessLogged(false);
              }}
            />
          </div>
        ) : (
          /* Single-Field Report ID Lookup Form (Fix 3) */
          <div className="bg-[#111827] border-2 border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl glow-card space-y-8">
            <div className="flex items-center gap-3 border-b border-slate-800 pb-5">
              <div className="w-12 h-12 rounded-2xl bg-cyan-600/20 border border-cyan-500/30 flex items-center justify-center">
                <Lock className="w-6 h-6 text-cyan-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Report ID Verification Lookup</h3>
                <p className="text-xs text-slate-400">
                  Enter the unique Report ID delivered via SMS to verified emergency contacts at crash time.
                </p>
              </div>
            </div>

            {/* Error banner */}
            {errorMessage && (
              <div className="p-4 rounded-2xl bg-red-950/80 border border-red-800 text-xs text-red-200 flex items-start gap-2.5 animate-in fade-in">
                <AlertTriangle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <div className="font-bold">Lookup Failed</div>
                  <div>{errorMessage}</div>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Institutional Authority Context */}
              <div className="p-4 rounded-2xl bg-[#0B0F19] border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-[11px] font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Auditing Institutional Body</span>
                  </label>
                  <span className="text-[10px] text-slate-500 font-mono">Logged for Audit Trail</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { id: "police", label: "Traffic Police Dept", badge: "DL-POL-8841" },
                    { id: "insurance", label: "Insurance Claims Assessor", badge: "IRDAI-CLM-9021" },
                    { id: "hospital", label: "Hospital Trauma Registrar", badge: "TR-REG-4410" },
                  ].map((inst) => (
                    <button
                      key={inst.id}
                      type="button"
                      onClick={() => {
                        setInstitutionType(inst.id);
                        setBadgeNumber(inst.badge);
                      }}
                      className={`p-3 rounded-xl text-left border text-xs font-semibold transition-all ${
                        institutionType === inst.id
                          ? "bg-cyan-950/70 border-cyan-500 text-cyan-300 shadow-md"
                          : "bg-[#111827] border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200"
                      }`}
                    >
                      <div className="font-bold">{inst.label}</div>
                      <div className="text-[10px] font-mono text-slate-500 mt-0.5">ID: {inst.badge}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Single Secure Input Field: Enter Report ID */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Enter Report ID *
                </label>
                <div className="relative">
                  <FileCheck2 className="w-5 h-5 text-cyan-400 absolute left-4 top-4" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. REP-2026-0884 or REP-2026-0992"
                    value={reportId}
                    onChange={(e) => setReportId(e.target.value.toUpperCase())}
                    className="w-full bg-[#0B0F19] border-2 border-slate-700 focus:border-cyan-500 rounded-2xl pl-12 pr-4 py-3.5 text-base font-mono text-white tracking-wider focus:outline-none transition-colors placeholder:text-slate-600 uppercase"
                  />
                </div>
                <p className="text-[11px] text-slate-400">
                  Format: <code className="text-cyan-300 font-mono">REP-YYYY-XXXX</code> • Found in the accident notification SMS sent to primary emergency contacts.
                </p>
              </div>

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  disabled={searching}
                  className="w-full inline-flex items-center justify-center gap-2 py-4 rounded-xl text-base font-bold text-white bg-gradient-to-r from-cyan-600 via-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-cyan-600 shadow-xl shadow-cyan-950/60 border border-cyan-500/40 transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50"
                >
                  {searching ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Verifying Report ID in Secure Vault...</span>
                    </>
                  ) : (
                    <>
                      <Search className="w-5 h-5" />
                      <span>Verify &amp; Retrieve Blackbox Certificate</span>
                    </>
                  )}
                </button>
              </div>
            </form>

            {/* Quick Test Demo Presets */}
            <div className="pt-6 border-t border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>Demonstration Report IDs (Click to Auto-Query):</span>
                </div>
                <span className="text-[10px] text-slate-500 font-mono">Verified Test Vault</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {Object.keys(SAMPLE_REPORTS).map((sId) => {
                  const item = SAMPLE_REPORTS[sId];
                  return (
                    <button
                      key={sId}
                      onClick={() => handleQuickLoadSample(sId)}
                      className="flex flex-col items-start p-3.5 rounded-2xl bg-[#0B0F19] hover:bg-slate-800/80 border border-slate-800 hover:border-cyan-500/50 text-left transition-all group"
                    >
                      <div className="flex items-center justify-between w-full">
                        <span className="text-xs font-mono font-black text-cyan-400 group-hover:text-cyan-300">
                          {sId}
                        </span>
                        <span className="text-[9px] font-mono font-bold bg-red-950 text-red-400 px-1.5 py-0.5 rounded border border-red-800">
                          {item.user.profile.bloodGroup}
                        </span>
                      </div>
                      <span className="text-xs text-slate-300 font-semibold mt-1 truncate w-full">
                        {item.user.profile.name}
                      </span>
                      <span className="text-[10px] text-slate-500 font-mono mt-0.5 truncate w-full">
                        Speed: {item.incident.speedKmh} km/h • {item.incident.gForce}G
                      </span>
                      <span className="text-[10px] text-cyan-400 mt-2 flex items-center gap-1 font-semibold">
                        Fetch Report <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function BlackboxPortalPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#0B0F19] flex items-center justify-center text-slate-400">
          <Loader2 className="w-8 h-8 animate-spin text-cyan-400" />
        </div>
      }
    >
      <BlackboxPortalContent />
    </Suspense>
  );
}
