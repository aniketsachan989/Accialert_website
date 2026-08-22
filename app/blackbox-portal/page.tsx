"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
  FileSpreadsheet,
  Search,
  ShieldCheck,
  AlertTriangle,
  UserCheck,
  Phone,
  Droplet,
  Loader2,
  Lock,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { UserDocument, IncidentDocument, BloodGroup } from "@/types";
import { searchBlackboxUser, SAMPLE_USERS } from "@/lib/firestore-helpers";
import BlackboxReport from "@/components/BlackboxReport";
import { playAlertSound } from "@/lib/utils";

const BLOOD_GROUPS: BloodGroup[] = [
  "A+",
  "A-",
  "B+",
  "B-",
  "AB+",
  "AB-",
  "O+",
  "O-",
];

function BlackboxPortalContent() {
  const searchParams = useSearchParams();
  const initialName = searchParams.get("name") || "";
  const initialBg = (searchParams.get("bloodGroup") as BloodGroup) || "O+";
  const initialPhone = searchParams.get("phone") || "";

  const [name, setName] = useState(initialName);
  const [bloodGroup, setBloodGroup] = useState<BloodGroup>(initialBg);
  const [phone, setPhone] = useState(initialPhone);

  const [searching, setSearching] = useState(false);
  const [matchedUser, setMatchedUser] = useState<UserDocument | null>(null);
  const [matchedIncident, setMatchedIncident] = useState<IncidentDocument | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [searchSource, setSearchSource] = useState<string>("");

  // If query params are provided on page load, automatically execute search
  useEffect(() => {
    if (initialName && initialPhone) {
      executeSearch(initialName, initialBg, initialPhone);
    }
  }, []);

  const executeSearch = async (sName: string, sBg: string, sPhone: string) => {
    if (!sName.trim() || !sPhone.trim()) {
      setErrorMessage("Please enter both the Victim Name and Registered Contact Phone.");
      return;
    }

    setSearching(true);
    setErrorMessage("");

    try {
      const result = await searchBlackboxUser(sName, sBg, sPhone);

      if (result.user) {
        setMatchedUser(result.user);
        setMatchedIncident(result.incident);
        setSearchSource(result.source);
        playAlertSound("success");
      } else {
        setMatchedUser(null);
        setMatchedIncident(null);
        setErrorMessage(
          "No verified medical ID and crash record matched those exact credentials. Please verify spelling, blood group, and phone number."
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
    executeSearch(name, bloodGroup, phone);
  };

  const handleQuickLoadSample = (sample: UserDocument) => {
    setName(sample.profile.name);
    setBloodGroup(sample.profile.bloodGroup);
    setPhone(sample.primaryContact.phone);
    executeSearch(sample.profile.name, sample.profile.bloodGroup, sample.primaryContact.phone);
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] py-10 sm:py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header Title Banner */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-800/50 text-xs font-semibold text-cyan-400">
            <FileSpreadsheet className="w-3.5 h-3.5 text-cyan-400" />
            <span>AUTHORITY VERIFICATION PORTAL</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Digital Blackbox Crash Verification
          </h1>
          <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
            Secure verification portal for Police, Hospital Trauma Registrars, and Insurance Claims
            Assessors to access tamper-evident 1-page Blackbox Incident Certificates.
          </p>
        </div>

        {matchedUser ? (
          /* Rendered 1-Page Printable Report */
          <div className="animate-in fade-in duration-300">
            <BlackboxReport
              user={matchedUser}
              incident={matchedIncident}
              onResetSearch={() => {
                setMatchedUser(null);
                setMatchedIncident(null);
              }}
            />
          </div>
        ) : (
          /* Multi-Tier Verification Search Gate Form */
          <div className="bg-[#111827] border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl glow-card space-y-8">
            <div className="flex items-center gap-3 border-b border-slate-800 pb-5">
              <div className="w-12 h-12 rounded-2xl bg-cyan-600/20 border border-cyan-500/30 flex items-center justify-center">
                <Lock className="w-6 h-6 text-cyan-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">3-Field Identity Verification Gate</h3>
                <p className="text-xs text-slate-400">
                  Step 1: Multi-field query on /users • Step 2: Auto-link to telemetry /incidents
                </p>
              </div>
            </div>

            {/* Error banner */}
            {errorMessage && (
              <div className="p-4 rounded-2xl bg-red-950/80 border border-red-800 text-xs text-red-200 flex items-start gap-2.5 animate-in fade-in">
                <AlertTriangle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <div className="font-bold">Verification Failed</div>
                  <div>{errorMessage}</div>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {/* Field 1: Full Name */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                    Full Legal Name *
                  </label>
                  <div className="relative">
                    <UserCheck className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-[#0B0F19] border border-slate-700 rounded-xl pl-10 pr-4 py-3 text-sm text-white focus:outline-none focus:border-cyan-500 transition-colors placeholder:text-slate-600"
                    />
                  </div>
                </div>

                {/* Field 2: Blood Group Dropdown */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                    Blood Group *
                  </label>
                  <div className="relative">
                    <Droplet className="w-4 h-4 text-red-400 absolute left-3.5 top-3.5" />
                    <select
                      value={bloodGroup}
                      onChange={(e) => setBloodGroup(e.target.value as BloodGroup)}
                      className="w-full bg-[#0B0F19] border border-slate-700 rounded-xl pl-10 pr-4 py-3 text-sm text-white font-mono focus:outline-none focus:border-cyan-500 transition-colors"
                    >
                      {BLOOD_GROUPS.map((bg) => (
                        <option key={bg} value={bg}>
                          {bg}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Field 3: Contact Phone */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                    Primary Contact Number *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. +91 98765 43210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-[#0B0F19] border border-slate-700 rounded-xl pl-10 pr-4 py-3 text-sm text-white font-mono focus:outline-none focus:border-cyan-500 transition-colors placeholder:text-slate-600"
                    />
                  </div>
                </div>
              </div>

              {/* Submit Search Button */}
              <div>
                <button
                  type="submit"
                  disabled={searching}
                  className="w-full inline-flex items-center justify-center gap-2 py-4 rounded-xl text-base font-bold text-white bg-gradient-to-r from-cyan-600 via-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-cyan-600 shadow-xl shadow-cyan-950/60 border border-cyan-500/40 transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50"
                >
                  {searching ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Authenticating & Querying Firestore /users...</span>
                    </>
                  ) : (
                    <>
                      <Search className="w-5 h-5" />
                      <span>Verify & Retrieve Digital Blackbox Report</span>
                    </>
                  )}
                </button>
              </div>
            </form>

            {/* Quick Test Data Presets */}
            <div className="pt-6 border-t border-slate-800 space-y-3">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Instant Test Presets (Click to Auto-Fill & Test):</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {SAMPLE_USERS.map((sample) => (
                  <button
                    key={sample.id}
                    onClick={() => handleQuickLoadSample(sample)}
                    className="flex flex-col items-start p-3.5 rounded-2xl bg-[#0B0F19] hover:bg-slate-800/80 border border-slate-800 hover:border-cyan-500/50 text-left transition-all group"
                  >
                    <div className="flex items-center justify-between w-full">
                      <span className="text-xs font-bold text-white group-hover:text-cyan-300">
                        {sample.profile.name}
                      </span>
                      <span className="text-[10px] font-mono font-bold bg-red-950 text-red-400 px-1.5 py-0.5 rounded border border-red-800">
                        {sample.profile.bloodGroup}
                      </span>
                    </div>
                    <span className="text-[11px] text-slate-400 font-mono mt-1">
                      {sample.primaryContact.phone}
                    </span>
                    <span className="text-[10px] text-cyan-400 mt-1 flex items-center gap-1 font-semibold">
                      Load & Audit <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </button>
                ))}
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
