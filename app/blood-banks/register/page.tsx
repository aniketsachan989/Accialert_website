"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Droplet,
  MapPin,
  CheckCircle2,
  AlertTriangle,
  Building2,
  FileCheck,
  Phone,
  Mail,
  Lock,
  Navigation,
  ArrowLeft,
  Loader2,
  ShieldCheck,
  Clock,
  KeyRound,
  ShieldAlert,
} from "lucide-react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { registerBloodBankDoc } from "@/lib/firestore-helpers";
import { playAlertSound } from "@/lib/utils";

const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

export default function RegisterBloodBankPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    licenseNo: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    address: "",
    lat: 28.6139,
    lng: 77.209,
    supportedGroups: ["O+", "O-", "A+", "B+", "AB+"],
  });

  const [loadingGps, setLoadingGps] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleToggleGroup = (group: string) => {
    setFormData((prev) => {
      const exists = prev.supportedGroups.includes(group);
      if (exists) {
        return { ...prev, supportedGroups: prev.supportedGroups.filter((g) => g !== group) };
      } else {
        return { ...prev, supportedGroups: [...prev.supportedGroups, group] };
      }
    });
  };

  const handleSelectAllGroups = () => {
    setFormData((prev) => ({
      ...prev,
      supportedGroups: [...BLOOD_GROUPS],
    }));
  };

  const handleGetCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }
    setLoadingGps(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setFormData((prev) => ({
          ...prev,
          lat: Number(position.coords.latitude.toFixed(6)),
          lng: Number(position.coords.longitude.toFixed(6)),
        }));
        setLoadingGps(false);
        playAlertSound("beep");
      },
      (error) => {
        console.error("GPS Error:", error);
        alert(`Could not fetch location: ${error.message}. Please enter coordinates manually.`);
        setLoadingGps(false);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (
      !formData.name ||
      !formData.licenseNo ||
      !formData.email ||
      !formData.password ||
      !formData.phone ||
      !formData.address
    ) {
      setErrorMsg("Please complete all required fields.");
      return;
    }

    if (formData.password.length < 6) {
      setErrorMsg("Password must be at least 6 characters long for institutional security.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setErrorMsg("Passwords do not match. Please re-enter your password.");
      return;
    }

    if (formData.supportedGroups.length === 0) {
      setErrorMsg("Please select at least one supported blood group.");
      return;
    }

    setSubmitting(true);
    try {
      // 1. Create or sign into Firebase Auth user account
      let userUid = "";
      try {
        const userCred = await createUserWithEmailAndPassword(
          auth,
          formData.email.trim(),
          formData.password
        );
        userUid = userCred.user.uid;
      } catch (authErr: any) {
        // If email already exists (e.g. from previous attempt before firestore write)
        if (authErr.code === "auth/email-already-in-use") {
          try {
            const loginCred = await signInWithEmailAndPassword(
              auth,
              formData.email.trim(),
              formData.password
            );
            userUid = loginCred.user.uid;
          } catch (loginErr: any) {
            throw new Error("This email is already registered. If this is your account, please enter the correct password or log in directly.");
          }
        } else {
          throw new Error(authErr.message || "Failed to create institutional authentication user.");
        }
      }

      // 2. Write document to Firestore `bloodBanks/{uid}` with `status: "pending"`
      const res = await registerBloodBankDoc(userUid, {
        name: formData.name.trim(),
        licenseNo: formData.licenseNo.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim(),
        address: formData.address.trim(),
        lat: Number(formData.lat),
        lng: Number(formData.lng),
        supportedGroups: formData.supportedGroups,
      });

      if (res.success) {
        setRegisteredEmail(formData.email);
        setSuccess(true);
        playAlertSound("success");
      } else {
        setErrorMsg(res.error || "Failed to register blood bank in Firestore.");
      }
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || "An unexpected error occurred.");
      playAlertSound("beep");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] py-10 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back navigation */}
        <Link
          href="/blood-banks"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Blood Bank Hub</span>
        </Link>

        {/* Page Title Card */}
        <div className="bg-[#111827] border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl glow-card mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-red-600/20 border border-red-500/30 flex items-center justify-center">
              <Building2 className="w-6 h-6 text-red-400" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
                Blood Bank Network Registration
              </h1>
              <p className="text-xs sm:text-sm text-slate-400">
                Institutional registration with license verification gate for live 15 km GPS crash alerts.
              </p>
            </div>
          </div>

          {success ? (
            /* Confirmation Screen (Fix 2: No direct dashboard link yet) */
            <div className="bg-amber-950/30 border border-amber-500/40 rounded-2xl p-6 sm:p-8 text-center space-y-5 animate-in fade-in duration-300">
              <div className="w-16 h-16 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center mx-auto">
                <Clock className="w-8 h-8 text-amber-400" />
              </div>

              <div className="space-y-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-950 border border-amber-700 text-xs font-mono font-bold text-amber-300 uppercase">
                  Status: Pending Manual Verification
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white">
                  Registration Submitted Successfully!
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto leading-relaxed">
                  Your facility <strong>{formData.name}</strong> has been registered with license number{" "}
                  <strong className="font-mono text-amber-300">{formData.licenseNo}</strong>.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-left max-w-lg mx-auto space-y-2 text-xs text-slate-300">
                <div className="flex items-start gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>License Review in Progress:</strong> Our medical team will verify your state registration license before activating live crash telemetry.
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <Lock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>Privacy Guard:</strong> Live accident locations and victim medical profiles remain locked until approval is confirmed.
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
                <button
                  onClick={() => router.push("/blood-banks/dashboard")}
                  className="px-6 py-3.5 rounded-xl text-xs font-bold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-colors shadow-lg flex items-center gap-2"
                >
                  <Lock className="w-4 h-4 text-amber-400" />
                  <span>Check Approval Status on Dashboard</span>
                </button>

                <button
                  onClick={() => {
                    setSuccess(false);
                    setFormData({
                      name: "",
                      licenseNo: "",
                      email: "",
                      password: "",
                      confirmPassword: "",
                      phone: "",
                      address: "",
                      lat: 28.6139,
                      lng: 77.209,
                      supportedGroups: ["O+", "O-", "A+", "B+"],
                    });
                  }}
                  className="px-5 py-3.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-slate-200 transition-colors"
                >
                  Register Another Facility
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {errorMsg && (
                <div className="p-4 rounded-xl bg-red-950/60 border border-red-800/80 text-xs text-red-300 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Facility Basics */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                    Blood Bank / Hospital Name *
                  </label>
                  <div className="relative">
                    <Building2 className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Apex Regional Trauma Blood Centre"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-[#0B0F19] border border-slate-700 rounded-xl pl-10 pr-4 py-3 text-sm text-white focus:outline-none focus:border-red-500 transition-colors placeholder:text-slate-600"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                    State License / Registration No. *
                  </label>
                  <div className="relative">
                    <FileCheck className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. DL-BB-2024-9981"
                      value={formData.licenseNo}
                      onChange={(e) => setFormData({ ...formData, licenseNo: e.target.value })}
                      className="w-full bg-[#0B0F19] border border-slate-700 rounded-xl pl-10 pr-4 py-3 text-sm text-white font-mono focus:outline-none focus:border-red-500 transition-colors placeholder:text-slate-600"
                    />
                  </div>
                </div>
              </div>

              {/* Institutional Authentication Credentials */}
              <div className="p-5 rounded-2xl bg-[#0B0F19] border border-slate-800 space-y-4">
                <div className="flex items-center gap-2">
                  <KeyRound className="w-4 h-4 text-cyan-400" />
                  <span className="text-xs font-bold text-white uppercase tracking-wider">
                    Institutional Login Credentials
                  </span>
                </div>
                <p className="text-[11px] text-slate-400">
                  Used to securely access your facility&apos;s live accident radar dashboard.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-[11px] font-semibold text-slate-300">
                      Official Email *
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                      <input
                        type="email"
                        required
                        placeholder="dispatch@hospital.org"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-[#111827] border border-slate-700 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-[11px] font-semibold text-slate-300">
                      Password (min 6 chars) *
                    </label>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                      <input
                        type="password"
                        required
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        className="w-full bg-[#111827] border border-slate-700 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-[11px] font-semibold text-slate-300">
                      Confirm Password *
                    </label>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                      <input
                        type="password"
                        required
                        placeholder="••••••••"
                        value={formData.confirmPassword}
                        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                        className="w-full bg-[#111827] border border-slate-700 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Info & Physical Address */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                    Emergency Dispatch Hotline / Phone *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +91 11 2345 6789"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-[#0B0F19] border border-slate-700 rounded-xl pl-10 pr-4 py-3 text-sm text-white font-mono focus:outline-none focus:border-red-500 transition-colors placeholder:text-slate-600"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                    Physical Facility Address *
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ring Road Trauma Complex, Sector 4, New Delhi"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="w-full bg-[#0B0F19] border border-slate-700 rounded-xl pl-10 pr-4 py-3 text-sm text-white focus:outline-none focus:border-red-500 transition-colors placeholder:text-slate-600"
                    />
                  </div>
                </div>
              </div>

              {/* GPS Coordinates & Browser Geolocation Auto-Detection */}
              <div className="p-5 rounded-2xl bg-[#0B0F19] border border-slate-800 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <span className="text-xs font-bold text-white uppercase tracking-wider">
                      GPS Coordinates (Geohash Tagging)
                    </span>
                    <p className="text-[11px] text-slate-400">
                      Used for live distance calculations when accidents occur within 15 km.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleGetCurrentLocation}
                    disabled={loadingGps}
                    className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold text-cyan-300 bg-cyan-950/60 hover:bg-cyan-900/80 border border-cyan-800/80 transition-colors disabled:opacity-50"
                  >
                    {loadingGps ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Navigation className="w-3.5 h-3.5 text-cyan-400" />
                    )}
                    <span>{loadingGps ? "Acquiring GPS..." : "Get Current GPS Location"}</span>
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                      Latitude
                    </label>
                    <input
                      type="number"
                      step="any"
                      required
                      value={formData.lat}
                      onChange={(e) => setFormData({ ...formData, lat: parseFloat(e.target.value) || 0 })}
                      className="w-full bg-[#111827] border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white font-mono focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                      Longitude
                    </label>
                    <input
                      type="number"
                      step="any"
                      required
                      value={formData.lng}
                      onChange={(e) => setFormData({ ...formData, lng: parseFloat(e.target.value) || 0 })}
                      className="w-full bg-[#111827] border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white font-mono focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>
              </div>

              {/* Supported Blood Groups Multi-Select */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                    Available / Supported Blood Groups *
                  </label>
                  <button
                    type="button"
                    onClick={handleSelectAllGroups}
                    className="text-xs text-red-400 hover:text-red-300 font-semibold"
                  >
                    Select All Types
                  </button>
                </div>

                <div className="grid grid-cols-4 sm:grid-cols-8 gap-2.5">
                  {BLOOD_GROUPS.map((group) => {
                    const isSelected = formData.supportedGroups.includes(group);
                    return (
                      <button
                        key={group}
                        type="button"
                        onClick={() => handleToggleGroup(group)}
                        className={`py-3 rounded-xl text-sm font-black font-mono border transition-all ${
                          isSelected
                            ? "bg-red-600 text-white border-red-500 shadow-md shadow-red-950/50 scale-[1.02]"
                            : "bg-[#0B0F19] text-slate-400 border-slate-800 hover:border-slate-700 hover:text-slate-200"
                        }`}
                      >
                        {group}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full inline-flex items-center justify-center gap-2 py-4 rounded-xl text-base font-bold text-white bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 shadow-xl shadow-red-950/60 border border-red-500/40 transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Creating Account & Submitting for Verification...</span>
                    </>
                  ) : (
                    <>
                      <ShieldCheck className="w-5 h-5" />
                      <span>Submit Registration (Verification Required)</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
