"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Clock,
  Building2,
  FileCheck,
  Phone,
  Mail,
  MapPin,
  RefreshCw,
  Search,
  Lock,
  ArrowLeft,
  AlertTriangle,
  Radio,
  Filter,
} from "lucide-react";
import { BloodBankDocument, BloodBankStatus } from "@/types";
import { getAllBloodBanks, updateBloodBankStatus } from "@/lib/firestore-helpers";
import { playAlertSound } from "@/lib/utils";

// Verified sample registrations for demonstration if Firestore is empty
const SAMPLE_ADMIN_BANKS: BloodBankDocument[] = [
  {
    id: "bank-demo-01",
    uid: "bank-demo-01",
    name: "Apex Regional Trauma Blood Bank (New Delhi)",
    licenseNo: "DL-BB-2024-9981",
    email: "dispatch@apextrauma.org",
    phone: "+91 11 2658 8500",
    address: "Ring Road Trauma Complex, Sector 4, New Delhi",
    lat: 28.6139,
    lng: 77.209,
    supportedGroups: ["O+", "O-", "A+", "B+", "AB+"],
    status: "approved",
    createdAt: new Date().toISOString(),
  },
  {
    id: "bank-demo-02",
    uid: "bank-demo-02",
    name: "Metropolitan Red Cross Transfusion Center (Mumbai)",
    licenseNo: "MH-BB-2023-4102",
    email: "emergency@mumbairedcross.org",
    phone: "+91 22 2414 4455",
    address: "Dr. E Moses Road, Mahalaxmi, Mumbai",
    lat: 19.076,
    lng: 72.8777,
    supportedGroups: ["O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-"],
    status: "pending",
    createdAt: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: "bank-demo-03",
    uid: "bank-demo-03",
    name: "Bengaluru District Blood & Trauma Bank",
    licenseNo: "KA-BB-2025-1109",
    email: "contact@bangaloretrauma.gov.in",
    phone: "+91 80 2297 3400",
    address: "Victoria Hospital Campus, Fort Road, Bengaluru",
    lat: 12.9716,
    lng: 77.5946,
    supportedGroups: ["O+", "A+", "B+", "AB+"],
    status: "pending",
    createdAt: new Date(Date.now() - 7200000).toISOString(),
  },
];

export default function SecretSystemConsolePage() {
  const [passcode, setPasscode] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcodeError, setPasscodeError] = useState("");

  const [banks, setBanks] = useState<BloodBankDocument[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [actionMessage, setActionMessage] = useState("");

  const handleAdminAuth = (e: React.FormEvent) => {
    e.preventDefault();
    // Private Master Clearance
    const validCodes = ["aniket989", "accialert@master", "aniket-master-2026", "989"];
    if (validCodes.includes(passcode.trim())) {
      setIsAuthenticated(true);
      setPasscodeError("");
      loadBloodBanks();
      playAlertSound("success");
    } else {
      setPasscodeError("Access Denied: Invalid Security Clearance.");
      playAlertSound("beep");
    }
  };

  const loadBloodBanks = async () => {
    setLoading(true);
    try {
      const liveList = await getAllBloodBanks();
      if (liveList.length > 0) {
        setBanks(liveList);
      } else {
        setBanks(SAMPLE_ADMIN_BANKS);
      }
    } catch (err) {
      console.warn("Could not load from Firestore, using demo list:", err);
      setBanks(SAMPLE_ADMIN_BANKS);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (bankId: string, newStatus: BloodBankStatus) => {
    let reason: string | undefined = undefined;
    if (newStatus === "rejected") {
      const input = prompt("Enter reason for rejection (optional):", "Invalid or unverified state license registration number");
      if (input === null) return;
      reason = input;
    }

    try {
      const res = await updateBloodBankStatus(bankId, newStatus, reason);
      if (res.success) {
        setBanks((prev) =>
          prev.map((b) => (b.id === bankId || b.uid === bankId ? { ...b, status: newStatus, rejectionReason: reason } : b))
        );
        setActionMessage(`Facility ${bankId} successfully updated to: ${newStatus.toUpperCase()}`);
        playAlertSound(newStatus === "approved" ? "success" : "beep");
        setTimeout(() => setActionMessage(""), 4000);
      }
    } catch (err: any) {
      alert(`Error updating status: ${err.message}`);
    }
  };

  const filteredBanks = banks.filter((b) => {
    const matchesStatus = statusFilter === "ALL" || b.status === statusFilter;
    const matchesSearch =
      !searchQuery ||
      b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.licenseNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.address.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const pendingCount = banks.filter((b) => b.status === "pending").length;

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0B0F19] py-16 flex items-center justify-center p-4">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-700 text-xs font-bold text-slate-300">
              <Lock className="w-3.5 h-3.5 text-cyan-400" />
              <span>ACCI-ALERT SYSTEM CONSOLE</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white">
              Institutional Clearance
            </h1>
            <p className="text-xs text-slate-400">
              Authorized infrastructure access required.
            </p>
          </div>

          <div className="bg-[#111827] border-2 border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-5">
            {passcodeError && (
              <div className="p-3.5 rounded-xl bg-red-950/80 border border-red-800 text-xs text-red-200 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
                <span>{passcodeError}</span>
              </div>
            )}

            <form onSubmit={handleAdminAuth} className="space-y-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Master Security Token
                </label>
                <input
                  type="password"
                  required
                  autoFocus
                  placeholder="••••••••••••"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  className="w-full bg-[#0B0F19] border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-cyan-500 font-mono"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 shadow-xl shadow-cyan-950/40 transition-colors"
              >
                Authenticate Terminal
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B0F19] py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-black text-white">
                  Healthcare Compliance Terminal
                </h1>
                {pendingCount > 0 && (
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-950 border border-amber-800 text-amber-400 text-xs font-bold font-mono animate-pulse">
                    {pendingCount} PENDING
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400">
                Audit healthcare facilities and manage live telemetry authorization.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={loadBloodBanks}
              disabled={loading}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
              <span>Refresh Records</span>
            </button>
          </div>
        </div>

        {/* Action Message Banner */}
        {actionMessage && (
          <div className="p-3.5 rounded-xl bg-emerald-950/80 border border-emerald-700 text-xs text-emerald-200 flex items-center gap-2 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{actionMessage}</span>
          </div>
        )}

        {/* Filter & Search Bar */}
        <div className="bg-[#111827] border border-slate-800 rounded-2xl p-4 sm:p-6 shadow-xl space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
              <input
                type="text"
                placeholder="Search by facility name, license number, or address..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#0B0F19] border border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500"
              />
            </div>

            {/* Status Filter Tabs */}
            <div className="flex flex-wrap items-center gap-2">
              {[
                { id: "ALL", label: "All Facilities" },
                { id: "pending", label: "Pending Review" },
                { id: "approved", label: "Approved" },
                { id: "rejected", label: "Rejected" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setStatusFilter(tab.id)}
                  className={`px-3 py-2 rounded-xl text-xs font-bold transition-colors ${
                    statusFilter === tab.id
                      ? "bg-cyan-600 text-white"
                      : "bg-[#0B0F19] text-slate-400 hover:text-white border border-slate-800"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Facilities Table / Card Grid */}
        <div className="space-y-4">
          {filteredBanks.length === 0 ? (
            <div className="bg-[#111827] border border-slate-800 rounded-3xl p-12 text-center text-slate-400">
              <FileCheck className="w-8 h-8 text-slate-600 mx-auto mb-2" />
              <p className="text-sm font-semibold">No blood bank records matched your filter criteria.</p>
            </div>
          ) : (
            filteredBanks.map((bank) => {
              const isPending = bank.status === "pending";
              const isApproved = bank.status === "approved";
              const isRejected = bank.status === "rejected";

              return (
                <div
                  key={bank.id || bank.uid}
                  className={`bg-[#111827] border-2 rounded-3xl p-6 shadow-xl transition-all ${
                    isPending
                      ? "border-amber-500/40 bg-amber-950/10"
                      : isApproved
                      ? "border-emerald-500/30"
                      : "border-slate-800 opacity-75"
                  }`}
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                    {/* Facility Info */}
                    <div className="space-y-3 flex-1">
                      <div className="flex flex-wrap items-center gap-2.5">
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase border ${
                            isPending
                              ? "bg-amber-950 text-amber-400 border-amber-800"
                              : isApproved
                              ? "bg-emerald-950 text-emerald-400 border-emerald-800"
                              : "bg-red-950 text-red-400 border-red-800"
                          }`}
                        >
                          {bank.status.toUpperCase()}
                        </span>
                        <h3 className="text-lg font-black text-white">{bank.name}</h3>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs text-slate-300">
                        <div className="flex items-center gap-2">
                          <FileCheck className="w-4 h-4 text-cyan-400 shrink-0" />
                          <span>
                            License: <strong className="font-mono text-amber-300">{bank.licenseNo}</strong>
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                          <span className="font-mono">{bank.phone}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4 text-purple-400 shrink-0" />
                          <span>{bank.email}</span>
                        </div>
                        <div className="flex items-center gap-2 sm:col-span-2 lg:col-span-3">
                          <MapPin className="w-4 h-4 text-red-400 shrink-0" />
                          <span className="text-slate-400">
                            {bank.address} (GPS: {bank.lat?.toFixed(4)}, {bank.lng?.toFixed(4)})
                          </span>
                        </div>
                      </div>

                      {/* Supported Blood Groups Strip */}
                      <div className="flex items-center gap-1.5 pt-1">
                        <span className="text-[10px] uppercase font-bold text-slate-500">Groups:</span>
                        <div className="flex flex-wrap gap-1">
                          {bank.supportedGroups?.map((bg) => (
                            <span
                              key={bg}
                              className="px-1.5 py-0.5 rounded bg-slate-900 text-slate-300 text-[9px] font-mono font-bold border border-slate-800"
                            >
                              {bg}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Action Controls */}
                    <div className="flex items-center gap-2.5 shrink-0 border-t lg:border-t-0 pt-4 lg:pt-0 border-slate-800">
                      {isPending && (
                        <>
                          <button
                            onClick={() => handleUpdateStatus(bank.id || bank.uid!, "approved")}
                            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 shadow-md transition-colors"
                          >
                            <CheckCircle2 className="w-4 h-4" />
                            <span>Approve License</span>
                          </button>
                          <button
                            onClick={() => handleUpdateStatus(bank.id || bank.uid!, "rejected")}
                            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold text-red-300 bg-red-950/80 hover:bg-red-900 border border-red-800 transition-colors"
                          >
                            <XCircle className="w-4 h-4" />
                            <span>Reject</span>
                          </button>
                        </>
                      )}

                      {isApproved && (
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                            <ShieldCheck className="w-4 h-4" />
                            <span>Telemetry Active</span>
                          </span>
                          <button
                            onClick={() => handleUpdateStatus(bank.id || bank.uid!, "rejected")}
                            className="px-3 py-1.5 rounded-lg text-[11px] text-slate-400 hover:text-red-400 bg-slate-900 border border-slate-800"
                          >
                            Revoke Access
                          </button>
                        </div>
                      )}

                      {isRejected && (
                        <button
                          onClick={() => handleUpdateStatus(bank.id || bank.uid!, "approved")}
                          className="px-3.5 py-2 rounded-xl text-xs font-bold text-slate-300 bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-colors"
                        >
                          Re-Approve
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
