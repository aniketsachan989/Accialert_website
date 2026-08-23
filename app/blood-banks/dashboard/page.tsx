"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  collection,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User,
} from "firebase/auth";
import { db, auth } from "@/lib/firebase";
import { AccidentDocument, BloodBankDocument } from "@/types";
import LiveAccidentCard from "@/components/LiveAccidentCard";
import { pushTestAccident, getBloodBankProfile } from "@/lib/firestore-helpers";
import { playAlertSound } from "@/lib/utils";
import {
  Radio,
  PlusCircle,
  ShieldAlert,
  Droplet,
  Filter,
  RefreshCw,
  Zap,
  MapPin,
  Building2,
  AlertTriangle,
  Flame,
  CheckCircle2,
  Lock,
  Mail,
  KeyRound,
  LogOut,
  Clock,
  ShieldCheck,
  XCircle,
  Loader2,
  ArrowRight,
} from "lucide-react";

export default function BloodBankDashboardPage() {
  // Auth & Approval States
  const [authState, setAuthState] = useState<
    "loading" | "unauthenticated" | "pending_approval" | "rejected" | "approved"
  >("loading");
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [bankProfile, setBankProfile] = useState<BloodBankDocument | null>(null);

  // Login Form States
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState("");

  // Live Dashboard States
  const [accidents, setAccidents] = useState<AccidentDocument[]>([]);
  const [accidentsLoading, setAccidentsLoading] = useState(false);
  const [filterGroup, setFilterGroup] = useState<string>("ALL");
  const [isSimulating, setIsSimulating] = useState(false);
  const [simMessage, setSimMessage] = useState("");

  // 1. Monitor Firebase Auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setCurrentUser(null);
        setBankProfile(null);
        setAuthState("unauthenticated");
        return;
      }

      setCurrentUser(user);
      try {
        const profile = await getBloodBankProfile(user.uid);
        if (!profile) {
          // If no profile found in Firestore, default to pending verification
          setAuthState("pending_approval");
          return;
        }

        setBankProfile(profile);

        if (profile.status === "approved") {
          setAuthState("approved");
        } else if (profile.status === "rejected") {
          setAuthState("rejected");
        } else {
          setAuthState("pending_approval");
        }
      } catch (err) {
        console.error("Error resolving blood bank profile:", err);
        setAuthState("pending_approval");
      }
    });

    return () => unsubscribe();
  }, []);

  // 2. Attach Firestore onSnapshot listener ONLY when approved
  useEffect(() => {
    if (authState !== "approved") {
      setAccidents([]);
      return;
    }

    setAccidentsLoading(true);
    let unsubscribeSnap: () => void = () => {};

    try {
      const q = query(
        collection(db, "accidents"),
        where("status", "==", "ACTIVE")
      );

      unsubscribeSnap = onSnapshot(
        q,
        (snapshot) => {
          const docs: AccidentDocument[] = [];
          snapshot.forEach((docSnap) => {
            docs.push({
              id: docSnap.id,
              ...(docSnap.data() as AccidentDocument),
            });
          });

          // Sort by timestamp desc
          docs.sort((a, b) => {
            const timeA = a.createdAt?.seconds || 0;
            const timeB = b.createdAt?.seconds || 0;
            return timeB - timeA;
          });

          setAccidents(docs);
          setAccidentsLoading(false);

          if (docs.length > 0) {
            playAlertSound("beep");
          }
        },
        (error) => {
          console.warn("Firestore onSnapshot error:", error);
          setAccidentsLoading(false);
        }
      );
    } catch (e) {
      console.warn("Could not attach listener:", e);
      setAccidentsLoading(false);
    }

    return () => unsubscribeSnap();
  }, [authState]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    setLoginLoading(true);

    try {
      await signInWithEmailAndPassword(auth, loginEmail.trim(), loginPassword);
      playAlertSound("success");
    } catch (err: any) {
      console.error(err);
      if (
        err.code === "auth/invalid-credential" ||
        err.code === "auth/wrong-password" ||
        err.code === "auth/user-not-found"
      ) {
        setLoginError("Invalid email or password. Please verify your credentials.");
      } else {
        setLoginError(err.message || "Failed to sign in. Please try again.");
      }
      playAlertSound("beep");
    } finally {
      setLoginLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setAuthState("unauthenticated");
      setAccidents([]);
      playAlertSound("beep");
    } catch (err) {
      console.error("Sign out error:", err);
    }
  };

  const handleSimulateCrash = async () => {
    setIsSimulating(true);
    setSimMessage("Publishing emergency incident packet to Firestore /accidents...");
    playAlertSound("siren");

    try {
      const res = await pushTestAccident();
      if (res.success) {
        setSimMessage(`Crash alert published live with ID: ${res.id}`);
        playAlertSound("success");
      }
    } catch (e: any) {
      setSimMessage(e.message || "Simulation error");
    } finally {
      setIsSimulating(false);
      setTimeout(() => setSimMessage(""), 5000);
    }
  };

  const filteredAccidents = accidents.filter((acc) => {
    if (filterGroup === "ALL") return true;
    return acc.bloodGroup?.toUpperCase() === filterGroup;
  });

  // =========================================================================
  // VIEW 1: LOADING STATE (Zero accident UI rendered)
  // =========================================================================
  if (authState === "loading") {
    return (
      <div className="min-h-screen bg-[#0B0F19] flex items-center justify-center p-4">
        <div className="text-center space-y-4">
          <div className="relative flex items-center justify-center w-14 h-14 rounded-2xl bg-slate-900 border border-slate-800 mx-auto">
            <Loader2 className="w-6 h-6 text-cyan-400 animate-spin" />
          </div>
          <p className="text-xs font-mono font-bold tracking-widest text-slate-400 uppercase">
            Verifying Institutional Credentials...
          </p>
        </div>
      </div>
    );
  }

  // =========================================================================
  // VIEW 2: UNAUTHENTICATED STATE (Fix 1: Auth Guard Login Screen)
  // =========================================================================
  if (authState === "unauthenticated") {
    return (
      <div className="min-h-screen bg-[#0B0F19] py-12 sm:py-20 flex items-center justify-center p-4">
        <div className="w-full max-w-md space-y-6">
          {/* Header Banner */}
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-950/80 border border-red-800/60 text-xs font-bold text-red-400">
              <Lock className="w-3.5 h-3.5" />
              <span>AUTHENTICATED INSTITUTIONAL ACCESS ONLY</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white">
              Live Alerts &amp; Blood Radar
            </h1>
            <p className="text-xs text-slate-400">
              Sign in with your verified Blood Bank or Trauma Center account to access live crash feeds.
            </p>
          </div>

          {/* Login Card */}
          <div className="bg-[#111827] border-2 border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl glow-card space-y-6">
            <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
              <div className="w-10 h-10 rounded-xl bg-red-600/20 border border-red-500/30 flex items-center justify-center">
                <Droplet className="w-5 h-5 text-red-400 fill-red-400/30" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">Blood Bank Staff Login</h3>
                <p className="text-[11px] text-slate-400">Live 15 km emergency telemetry gateway</p>
              </div>
            </div>

            {loginError && (
              <div className="p-3.5 rounded-xl bg-red-950/80 border border-red-800 text-xs text-red-200 flex items-start gap-2 animate-in fade-in">
                <AlertTriangle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <span>{loginError}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Registered Email
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                  <input
                    type="email"
                    required
                    placeholder="dispatch@hospital.org"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    className="w-full bg-[#0B0F19] border border-slate-700 rounded-xl pl-10 pr-4 py-3 text-sm text-white focus:outline-none focus:border-red-500 transition-colors placeholder:text-slate-600"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Password
                </label>
                <div className="relative">
                  <KeyRound className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="w-full bg-[#0B0F19] border border-slate-700 rounded-xl pl-10 pr-4 py-3 text-sm text-white focus:outline-none focus:border-red-500 transition-colors placeholder:text-slate-600"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loginLoading}
                className="w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-500 hover:to-rose-600 shadow-xl shadow-red-950/60 border border-red-500/40 transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50"
              >
                {loginLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Verifying Credentials...</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    <span>Sign In to Emergency Radar</span>
                  </>
                )}
              </button>
            </form>

            <div className="pt-4 border-t border-slate-800 text-center space-y-3">
              <p className="text-xs text-slate-400">
                Not registered yet? Register your hospital or blood bank to receive live regional alerts.
              </p>
              <Link
                href="/blood-banks/register"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-400 hover:text-cyan-300"
              >
                <span>Register Facility for Verification</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // VIEW 3: PENDING APPROVAL STATE (Fix 1 & Fix 2: Manual License Gate)
  // =========================================================================
  if (authState === "pending_approval") {
    return (
      <div className="min-h-screen bg-[#0B0F19] py-12 sm:py-20 flex items-center justify-center p-4">
        <div className="w-full max-w-lg space-y-6">
          <div className="bg-[#111827] border-2 border-amber-500/40 rounded-3xl p-6 sm:p-10 shadow-2xl glow-card text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center mx-auto">
              <Clock className="w-8 h-8 text-amber-400 animate-pulse" />
            </div>

            <div className="space-y-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-950 border border-amber-700 text-xs font-mono font-bold text-amber-300 uppercase">
                Account Status: Pending License Verification
              </span>
              <h2 className="text-2xl font-black text-white">
                Medical License Verification in Progress
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Welcome, <strong>{bankProfile?.name || currentUser?.email}</strong>. Your registration is currently awaiting verification by our compliance administration.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#0B0F19] border border-slate-800 text-left space-y-2 text-xs">
              <div className="flex items-center justify-between text-slate-400">
                <span>Facility Name:</span>
                <span className="text-white font-semibold">{bankProfile?.name || "Registered Facility"}</span>
              </div>
              <div className="flex items-center justify-between text-slate-400">
                <span>License Number:</span>
                <span className="text-amber-300 font-mono font-bold">{bankProfile?.licenseNo || "Under Audit"}</span>
              </div>
              <div className="flex items-center justify-between text-slate-400">
                <span>Registered Email:</span>
                <span className="text-slate-300 font-mono">{currentUser?.email}</span>
              </div>
              <div className="flex items-center justify-between text-slate-400">
                <span>Live Feed Access:</span>
                <span className="text-red-400 font-bold uppercase">Locked (Pending Approval)</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-amber-950/40 border border-amber-700/50 text-xs text-amber-200 text-left space-y-1">
              <p className="font-semibold flex items-center gap-1.5">
                <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Why is this required?</span>
              </p>
              <p className="text-[11px] text-amber-300/80 leading-relaxed">
                To protect accident victims&apos; privacy and sensitive medical records, only verified blood banks with verified state healthcare licenses receive real-time accident telemetry.
              </p>
            </div>

            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => window.location.reload()}
                className="px-5 py-2.5 rounded-xl text-xs font-bold text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-colors flex items-center gap-2"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Refresh Status</span>
              </button>
              <button
                onClick={handleSignOut}
                className="px-5 py-2.5 rounded-xl text-xs font-bold text-red-300 bg-red-950/60 hover:bg-red-900 border border-red-800 transition-colors flex items-center gap-2"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // VIEW 4: REJECTED STATE
  // =========================================================================
  if (authState === "rejected") {
    return (
      <div className="min-h-screen bg-[#0B0F19] py-12 sm:py-20 flex items-center justify-center p-4">
        <div className="w-full max-w-md space-y-6">
          <div className="bg-[#111827] border-2 border-red-500/40 rounded-3xl p-6 sm:p-10 shadow-2xl glow-card text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-red-500/20 border border-red-500/40 flex items-center justify-center mx-auto">
              <XCircle className="w-8 h-8 text-red-400" />
            </div>

            <div className="space-y-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-950 border border-red-700 text-xs font-mono font-bold text-red-400 uppercase">
                Account Status: Verification Declined
              </span>
              <h2 className="text-2xl font-black text-white">
                License Verification Declined
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                The license details submitted for <strong>{bankProfile?.name}</strong> could not be validated against state healthcare registry records.
              </p>
              {bankProfile?.rejectionReason && (
                <p className="text-xs text-red-300 bg-red-950/60 p-2.5 rounded-xl border border-red-800">
                  Reason: {bankProfile.rejectionReason}
                </p>
              )}
            </div>

            <button
              onClick={handleSignOut}
              className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-bold text-white bg-slate-800 hover:bg-slate-700 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // VIEW 5: APPROVED LIVE RADAR DASHBOARD (Full Telemetry Access)
  // =========================================================================
  const bankLat = bankProfile?.lat || 28.6139;
  const bankLng = bankProfile?.lng || 77.209;

  return (
    <div className="min-h-screen bg-[#0B0F19] py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Top Control Bar & Live Status */}
        <div className="bg-[#111827] border-2 border-emerald-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl glow-card">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div>
              <div className="flex flex-wrap items-center gap-2.5 mb-2">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                </span>
                <span className="text-xs font-mono font-bold tracking-widest text-emerald-400 uppercase">
                  VERIFIED HEALTHCARE RADAR FEED
                </span>
                <span className="text-[10px] bg-emerald-950 text-emerald-300 px-2 py-0.5 rounded border border-emerald-800 font-mono">
                  LICENSE VERIFIED
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-white">
                {bankProfile?.name || "Verified Blood Bank Live Radar"}
              </h1>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Listening for active vehicle crashes and blood group matches within 15 km GPS radius.
              </p>
            </div>

            {/* Actions: Simulation + User Account */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={handleSimulateCrash}
                disabled={isSimulating}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-red-600 hover:bg-red-500 border border-red-400/40 shadow-lg shadow-red-950/60 transition-transform active:scale-95 disabled:opacity-50"
              >
                <Flame className="w-4 h-4 text-white animate-pulse" />
                <span>{isSimulating ? "Publishing Alert..." : "Trigger Test Crash"}</span>
              </button>

              <button
                onClick={handleSignOut}
                className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-bold text-slate-300 bg-slate-800 hover:bg-slate-700 hover:text-white border border-slate-700 transition-colors"
                title="Sign out of institutional account"
              >
                <LogOut className="w-3.5 h-3.5 text-red-400" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>

          {/* Feedback banner for test accident creation */}
          {simMessage && (
            <div className="mt-4 p-3 rounded-xl bg-red-950/80 border border-red-700 text-xs text-red-200 flex items-center gap-2 animate-in fade-in">
              <Zap className="w-4 h-4 text-amber-400 shrink-0" />
              <span>{simMessage}</span>
            </div>
          )}

          {/* Facility Info & Blood Group Filter */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mt-6 pt-6 border-t border-slate-800">
            {/* Facility Perspective */}
            <div className="md:col-span-6 space-y-1.5">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-cyan-400" />
                <span>Active Facility Coordinates</span>
              </label>
              <div className="p-3 rounded-xl bg-[#0B0F19] border border-slate-800 text-xs text-slate-300 flex items-center justify-between">
                <div>
                  <span className="font-bold text-white">{bankProfile?.name}</span>
                  <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                    Lat: {bankLat.toFixed(4)}, Lng: {bankLng.toFixed(4)} • License: {bankProfile?.licenseNo}
                  </div>
                </div>
                <span className="text-[10px] font-mono font-bold bg-emerald-950 text-emerald-400 px-2 py-0.5 rounded border border-emerald-800">
                  15 km Active Radius
                </span>
              </div>
            </div>

            {/* Blood Group Filter */}
            <div className="md:col-span-6 space-y-1.5">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Filter className="w-3.5 h-3.5 text-red-400" />
                <span>Filter by Required Blood Group</span>
              </label>
              <div className="flex flex-wrap gap-1.5">
                {["ALL", "O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-"].map((bg) => (
                  <button
                    key={bg}
                    onClick={() => setFilterGroup(bg)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                      filterGroup === bg
                        ? "bg-red-600 text-white shadow-sm"
                        : "bg-[#0B0F19] text-slate-400 hover:text-white border border-slate-800"
                    }`}
                  >
                    {bg}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Live Alerts Feed Grid */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-extrabold text-white">Active Crash Incidents</h2>
              <span className="px-2.5 py-0.5 rounded-full bg-red-950 text-red-400 font-mono text-xs font-bold border border-red-800">
                {filteredAccidents.length} LIVE
              </span>
            </div>
            <div className="text-xs text-slate-400 font-mono flex items-center gap-1">
              <RefreshCw className="w-3 h-3 animate-spin text-slate-500" />
              <span>Auto-updating via Firestore</span>
            </div>
          </div>

          {accidentsLoading ? (
            <div className="bg-[#111827] border border-slate-800 rounded-3xl p-12 text-center text-slate-400 space-y-3">
              <RefreshCw className="w-8 h-8 animate-spin text-red-500 mx-auto" />
              <p className="text-sm font-semibold">Connecting to Firestore /accidents collection...</p>
            </div>
          ) : filteredAccidents.length === 0 ? (
            <div className="bg-[#111827] border border-slate-800 rounded-3xl p-12 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-950/60 border border-emerald-500/40 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8 text-emerald-400" />
              </div>
              <h3 className="text-lg font-bold text-white">No Active Emergency Incidents</h3>
              <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto">
                No active crashes matching blood group <strong>{filterGroup}</strong> are currently
                flagged. Click &quot;Trigger Test Crash&quot; above to simulate an emergency.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredAccidents.map((acc, idx) => (
                <LiveAccidentCard
                  key={acc.id || idx}
                  accident={acc}
                  bankLocation={{ lat: bankLat, lng: bankLng }}
                  onAcknowledge={(id) => {
                    alert(`Alert acknowledged for Incident ${id}. Dispatch route recorded.`);
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
