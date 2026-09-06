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
  Database,
  Users,
  Activity,
  Droplet,
  FileSpreadsheet,
  Trash2,
  ExternalLink,
  Flame,
  Cpu,
  Eye,
  Check,
  Sparkles,
  Inbox,
  AlertOctagon,
} from "lucide-react";
import {
  BloodBankDocument,
  BloodBankStatus,
  UserDocument,
  AccidentDocument,
  ReportDocument,
} from "@/types";
import {
  getAllBloodBanks,
  updateBloodBankStatus,
  deleteBloodBankDoc,
  getAllUsers,
  deleteUserDoc,
  getAllAccidents,
  resolveAccident,
  deleteAccident,
  getAllReports,
  deleteReportDoc,
  purgeTestAccidents,
  getDatabaseOverviewStats,
  pushTestAccident,
} from "@/lib/firestore-helpers";
import { playAlertSound } from "@/lib/utils";

type AdminTab = "overview" | "blood-banks" | "accidents" | "users" | "reports" | "utilities";

export default function SecretSystemConsolePage() {
  const [passcode, setPasscode] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcodeError, setPasscodeError] = useState("");

  const [activeTab, setActiveTab] = useState<AdminTab>("overview");
  const [loading, setLoading] = useState(false);
  const [actionMessage, setActionMessage] = useState("");

  // Data State
  const [stats, setStats] = useState({
    usersCount: 0,
    banksCount: 0,
    pendingBanks: 0,
    approvedBanks: 0,
    accidentsCount: 0,
    activeAccidents: 0,
    reportsCount: 0,
    mailCount: 0,
  });

  const [banks, setBanks] = useState<BloodBankDocument[]>([]);
  const [accidents, setAccidents] = useState<AccidentDocument[]>([]);
  const [users, setUsers] = useState<UserDocument[]>([]);
  const [reports, setReports] = useState<ReportDocument[]>([]);

  // Search & Filter
  const [searchQuery, setSearchQuery] = useState("");
  const [bankStatusFilter, setBankStatusFilter] = useState<string>("ALL");
  const [accidentStatusFilter, setAccidentStatusFilter] = useState<string>("ALL");

  // Raw Document Inspector Modal
  const [inspectDoc, setInspectDoc] = useState<any | null>(null);

  const handleAdminAuth = (e: React.FormEvent) => {
    e.preventDefault();
    const validCodes = ["aniket989", "accialert@master", "aniket-master-2026", "989"];
    if (validCodes.includes(passcode.trim())) {
      setIsAuthenticated(true);
      setPasscodeError("");
      fetchAllData();
      playAlertSound("success");
    } else {
      setPasscodeError("Access Denied: Invalid Master Clearance.");
      playAlertSound("beep");
    }
  };

  const fetchAllData = async () => {
    setLoading(true);
    try {
      const [statsRes, banksRes, accidentsRes, usersRes, reportsRes] = await Promise.allSettled([
        getDatabaseOverviewStats(),
        getAllBloodBanks(),
        getAllAccidents(),
        getAllUsers(),
        getAllReports(),
      ]);

      if (statsRes.status === "fulfilled") setStats(statsRes.value);
      if (banksRes.status === "fulfilled") setBanks(banksRes.value);
      if (accidentsRes.status === "fulfilled") setAccidents(accidentsRes.value);
      if (usersRes.status === "fulfilled") setUsers(usersRes.value);
      if (reportsRes.status === "fulfilled") setReports(reportsRes.value);
    } catch (err) {
      console.warn("Error fetching admin data:", err);
    } finally {
      setLoading(false);
    }
  };

  const showNotification = (msg: string) => {
    setActionMessage(msg);
    setTimeout(() => setActionMessage(""), 4500);
  };

  // Actions for Blood Banks
  const handleUpdateBankStatus = async (bankId: string, newStatus: BloodBankStatus) => {
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
        showNotification(`Facility updated to: ${newStatus.toUpperCase()}`);
        playAlertSound(newStatus === "approved" ? "success" : "beep");
      }
    } catch (err: any) {
      alert(`Error updating status: ${err.message}`);
    }
  };

  const handleDeleteBank = async (bankId: string) => {
    if (!confirm(`Are you sure you want to permanently delete blood bank [${bankId}]?`)) return;
    try {
      const res = await deleteBloodBankDoc(bankId);
      if (res.success) {
        setBanks((prev) => prev.filter((b) => b.id !== bankId && b.uid !== bankId));
        showNotification(`Blood bank [${bankId}] permanently removed.`);
        playAlertSound("beep");
      }
    } catch (err: any) {
      alert(`Error deleting bank: ${err.message}`);
    }
  };

  // Actions for Accidents
  const handleResolveAccident = async (accidentId: string) => {
    try {
      const res = await resolveAccident(accidentId);
      if (res.success) {
        setAccidents((prev) =>
          prev.map((a) => (a.id === accidentId ? { ...a, status: "RESOLVED" } : a))
        );
        showNotification(`Accident [${accidentId}] marked as RESOLVED.`);
        playAlertSound("success");
      }
    } catch (err: any) {
      alert(`Error resolving accident: ${err.message}`);
    }
  };

  const handleDeleteAccident = async (accidentId: string) => {
    if (!confirm(`Permanently remove crash dispatch [${accidentId}] from database?`)) return;
    try {
      const res = await deleteAccident(accidentId);
      if (res.success) {
        setAccidents((prev) => prev.filter((a) => a.id !== accidentId));
        showNotification(`Incident [${accidentId}] deleted from database.`);
        playAlertSound("beep");
      }
    } catch (err: any) {
      alert(`Error deleting accident: ${err.message}`);
    }
  };

  // Actions for Users
  const handleDeleteUser = async (userId: string) => {
    if (!confirm(`Permanently delete user profile [${userId}]? This cannot be undone.`)) return;
    try {
      const res = await deleteUserDoc(userId);
      if (res.success) {
        setUsers((prev) => prev.filter((u) => u.id !== userId));
        showNotification(`User profile [${userId}] deleted.`);
        playAlertSound("beep");
      }
    } catch (err: any) {
      alert(`Error deleting user: ${err.message}`);
    }
  };

  // Actions for Reports
  const handleDeleteReport = async (reportId: string) => {
    if (!confirm(`Delete cryptographic report [${reportId}]?`)) return;
    try {
      const res = await deleteReportDoc(reportId);
      if (res.success) {
        setReports((prev) => prev.filter((r) => r.id !== reportId && r.reportId !== reportId));
        showNotification(`Report [${reportId}] deleted.`);
        playAlertSound("beep");
      }
    } catch (err: any) {
      alert(`Error deleting report: ${err.message}`);
    }
  };

  // Quick Utility Actions
  const handlePurgeTestAccidents = async () => {
    if (!confirm("Purge all demo / simulation accidents from database? Real incidents will be preserved.")) return;
    setLoading(true);
    try {
      const res = await purgeTestAccidents();
      if (res.success) {
        showNotification(`Purged ${res.count} test incidents from database.`);
        fetchAllData();
        playAlertSound("success");
      }
    } catch (err: any) {
      alert(`Error purging test accidents: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTestEmergency = async () => {
    setLoading(true);
    try {
      const res = await pushTestAccident();
      if (res.success) {
        showNotification(`Test emergency dispatch generated [ID: ${res.id}].`);
        fetchAllData();
        playAlertSound("beep");
      }
    } catch (err: any) {
      alert(`Error pushing test accident: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Filters
  const filteredBanks = banks.filter((b) => {
    const matchesStatus = bankStatusFilter === "ALL" || b.status === bankStatusFilter;
    const matchesSearch =
      !searchQuery ||
      b.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.licenseNo?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.address?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const filteredAccidents = accidents.filter((a) => {
    const matchesStatus = accidentStatusFilter === "ALL" || a.status === accidentStatusFilter;
    const matchesSearch =
      !searchQuery ||
      a.userName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.userPhone?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.bloodGroup?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.id?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.location?.address?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const filteredUsers = users.filter((u) => {
    return (
      !searchQuery ||
      u.profile?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.primaryContact?.phone?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.profile?.bloodGroup?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.id?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const filteredReports = reports.filter((r) => {
    return (
      !searchQuery ||
      r.reportId?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.user?.profile?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.incident?.location?.address?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#080B12] py-16 flex items-center justify-center p-4">
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
              Authorized infrastructure and database management terminal.
            </p>
          </div>

          <div className="bg-[#0F1422] border-2 border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-5">
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
                  className="w-full bg-[#080B12] border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-cyan-500 font-mono"
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
    <div className="min-h-screen bg-[#080B12] text-slate-200 py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-colors"
              title="Return to Main Website"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
                  <Database className="w-6 h-6 text-cyan-400" />
                  <span>AcciAlert Infrastructure Console</span>
                </h1>
                <span className="px-2.5 py-0.5 rounded-full bg-cyan-950 border border-cyan-800 text-cyan-300 text-[10px] font-mono font-bold">
                  MASTER v6.0
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Firestore Database Management &amp; Institutional Oversight Portal.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={fetchAllData}
              disabled={loading}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold text-slate-200 bg-slate-900 hover:bg-slate-800 border border-slate-700 transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
              <span>Refresh All</span>
            </button>
            <button
              onClick={() => setIsAuthenticated(false)}
              className="px-3.5 py-2 rounded-xl text-xs font-bold text-red-400 hover:text-white bg-red-950/40 hover:bg-red-950 border border-red-900/60 transition-colors"
            >
              Lock Console
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

        {/* Global Tab Navigation */}
        <div className="flex flex-wrap items-center gap-2 border-b border-slate-800/80 pb-3">
          {[
            { id: "overview", label: "Overview & Health", icon: Activity, count: null },
            { id: "blood-banks", label: "Blood Banks", icon: Droplet, count: stats.pendingBanks ? `${stats.pendingBanks} Pnd` : stats.banksCount },
            { id: "accidents", label: "Emergency Crashes", icon: Flame, count: stats.activeAccidents ? `${stats.activeAccidents} Act` : stats.accidentsCount },
            { id: "users", label: "User Profiles", icon: Users, count: stats.usersCount },
            { id: "reports", label: "Blackbox Reports", icon: FileSpreadsheet, count: stats.reportsCount },
            { id: "utilities", label: "Database Utilities", icon: Cpu, count: null },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id as AdminTab);
                  setSearchQuery("");
                }}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  isActive
                    ? "bg-cyan-600 text-white shadow-lg shadow-cyan-950/50"
                    : "bg-[#0F1422] text-slate-400 hover:text-white hover:bg-slate-900 border border-slate-800"
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{tab.label}</span>
                {tab.count !== null && (
                  <span
                    className={`px-1.5 py-0.2 rounded text-[10px] font-mono font-bold ${
                      isActive ? "bg-cyan-800 text-cyan-100" : "bg-slate-800 text-slate-300"
                    }`}
                  >
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* -------------------- TAB 1: OVERVIEW & HEALTH -------------------- */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            {/* Real-time Metric Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-5 rounded-2xl bg-[#0F1422] border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-slate-400 text-xs">
                  <span>Emergency Dispatches</span>
                  <Flame className="w-4 h-4 text-red-400" />
                </div>
                <div className="text-2xl sm:text-3xl font-black text-white font-mono">
                  {stats.accidentsCount}
                </div>
                <div className="text-[11px] text-red-400 font-semibold flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                  <span>{stats.activeAccidents} Active Telemetry</span>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-[#0F1422] border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-slate-400 text-xs">
                  <span>Blood Banks</span>
                  <Droplet className="w-4 h-4 text-red-400" />
                </div>
                <div className="text-2xl sm:text-3xl font-black text-white font-mono">
                  {stats.banksCount}
                </div>
                <div className="text-[11px] text-amber-400 font-semibold">
                  {stats.pendingBanks} Pending Verification
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-[#0F1422] border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-slate-400 text-xs">
                  <span>Registered Users</span>
                  <Users className="w-4 h-4 text-cyan-400" />
                </div>
                <div className="text-2xl sm:text-3xl font-black text-white font-mono">
                  {stats.usersCount}
                </div>
                <div className="text-[11px] text-slate-400">Emergency Medical IDs</div>
              </div>

              <div className="p-5 rounded-2xl bg-[#0F1422] border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-slate-400 text-xs">
                  <span>Blackbox Certificates</span>
                  <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="text-2xl sm:text-3xl font-black text-white font-mono">
                  {stats.reportsCount}
                </div>
                <div className="text-[11px] text-emerald-400">SHA-256 Tamper-Proof</div>
              </div>
            </div>

            {/* Quick Actions & Connection Status */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="p-6 rounded-3xl bg-[#0F1422] border border-slate-800 space-y-4">
                <div className="flex items-center gap-2">
                  <Cpu className="w-5 h-5 text-cyan-400" />
                  <h3 className="text-sm font-bold uppercase tracking-wider text-white">
                    Quick Operational Tools
                  </h3>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Trigger simulation events or run database maintenance commands directly on Firestore.
                </p>
                <div className="flex flex-wrap gap-2.5 pt-2">
                  <button
                    onClick={handleCreateTestEmergency}
                    disabled={loading}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-red-600 hover:bg-red-500 shadow-md transition-colors"
                  >
                    <Flame className="w-4 h-4" />
                    <span>Trigger Test Accident</span>
                  </button>

                  <button
                    onClick={handlePurgeTestAccidents}
                    disabled={loading}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-slate-300 bg-slate-900 hover:bg-slate-800 border border-slate-700 transition-colors"
                  >
                    <Trash2 className="w-4 h-4 text-red-400" />
                    <span>Purge Demo Crashes</span>
                  </button>
                </div>
              </div>

              <div className="p-6 rounded-3xl bg-[#0F1422] border border-slate-800 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Database className="w-5 h-5 text-emerald-400" />
                    <h3 className="text-sm font-bold uppercase tracking-wider text-white">
                      Firestore Ecosystem Status
                    </h3>
                  </div>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-950 border border-emerald-800 text-emerald-400 text-[10px] font-mono font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                    ONLINE
                  </span>
                </div>

                <div className="space-y-2 text-xs text-slate-300">
                  <div className="flex justify-between py-1 border-b border-slate-800/80">
                    <span className="text-slate-500">Firebase Project ID:</span>
                    <span className="font-mono text-cyan-300">accialertapp-9f6c9</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-800/80">
                    <span className="text-slate-500">Queued Notification Emails (/mail):</span>
                    <span className="font-mono text-slate-200">{stats.mailCount} Records</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-800/80">
                    <span className="text-slate-500">Public Production Endpoint:</span>
                    <span className="font-mono text-emerald-400">accialert-website.vercel.app</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-slate-500">Client Engine:</span>
                    <span className="font-mono text-slate-300">Next.js 14 App Router + Node.js</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* -------------------- TAB 2: BLOOD BANKS -------------------- */}
        {activeTab === "blood-banks" && (
          <div className="space-y-5">
            {/* Search & Filter */}
            <div className="bg-[#0F1422] border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                <input
                  type="text"
                  placeholder="Search blood banks by facility name, license, address..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#080B12] border border-slate-700 rounded-xl pl-10 pr-4 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {["ALL", "pending", "approved", "rejected"].map((st) => (
                  <button
                    key={st}
                    onClick={() => setBankStatusFilter(st)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize transition-colors ${
                      bankStatusFilter === st
                        ? "bg-red-600 text-white"
                        : "bg-[#080B12] text-slate-400 hover:text-white border border-slate-800"
                    }`}
                  >
                    {st === "ALL" ? "All Statuses" : st}
                  </button>
                ))}
              </div>
            </div>

            {/* List of Blood Banks */}
            <div className="space-y-4">
              {filteredBanks.length === 0 ? (
                <div className="bg-[#0F1422] border border-slate-800 rounded-3xl p-12 text-center text-slate-400">
                  <Droplet className="w-8 h-8 text-slate-600 mx-auto mb-2" />
                  <p className="text-sm font-semibold">No blood banks matched your search.</p>
                </div>
              ) : (
                filteredBanks.map((bank) => (
                  <div
                    key={bank.id || bank.uid}
                    className={`bg-[#0F1422] border-2 rounded-2xl p-5 shadow-xl transition-all ${
                      bank.status === "pending"
                        ? "border-amber-500/40 bg-amber-950/10"
                        : bank.status === "approved"
                        ? "border-emerald-500/30"
                        : "border-slate-800 opacity-70"
                    }`}
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
                      <div className="space-y-2 flex-1">
                        <div className="flex flex-wrap items-center gap-2.5">
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase border ${
                              bank.status === "pending"
                                ? "bg-amber-950 text-amber-400 border-amber-800"
                                : bank.status === "approved"
                                ? "bg-emerald-950 text-emerald-400 border-emerald-800"
                                : "bg-red-950 text-red-400 border-red-800"
                            }`}
                          >
                            {bank.status.toUpperCase()}
                          </span>
                          <h3 className="text-base sm:text-lg font-black text-white">{bank.name}</h3>
                          <span className="text-[11px] font-mono text-slate-500">ID: {bank.id || bank.uid}</span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 text-xs text-slate-300">
                          <div className="flex items-center gap-1.5">
                            <FileCheck className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                            <span>License: <strong className="font-mono text-amber-300">{bank.licenseNo}</strong></span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                            <span className="font-mono">{bank.phone}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Mail className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                            <span>{bank.email}</span>
                          </div>
                          <div className="flex items-center gap-1.5 sm:col-span-2 lg:col-span-3 text-slate-400">
                            <MapPin className="w-3.5 h-3.5 text-red-400 shrink-0" />
                            <span>{bank.address} (GPS: {bank.lat?.toFixed(4)}, {bank.lng?.toFixed(4)})</span>
                          </div>
                        </div>

                        {/* Supported Groups */}
                        <div className="flex flex-wrap items-center gap-1 pt-1">
                          <span className="text-[10px] uppercase font-bold text-slate-500 mr-1">Groups:</span>
                          {bank.supportedGroups?.map((g) => (
                            <span key={g} className="px-1.5 py-0.5 rounded bg-slate-900 text-slate-300 text-[9px] font-mono font-bold border border-slate-800">
                              {g}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Controls */}
                      <div className="flex items-center gap-2 shrink-0 border-t lg:border-t-0 pt-3 lg:pt-0 border-slate-800">
                        {bank.status === "pending" && (
                          <>
                            <button
                              onClick={() => handleUpdateBankStatus(bank.id || bank.uid!, "approved")}
                              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 transition-colors"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              <span>Approve</span>
                            </button>
                            <button
                              onClick={() => handleUpdateBankStatus(bank.id || bank.uid!, "rejected")}
                              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-red-300 bg-red-950/80 hover:bg-red-900 border border-red-800 transition-colors"
                            >
                              <XCircle className="w-3.5 h-3.5" />
                              <span>Reject</span>
                            </button>
                          </>
                        )}

                        {bank.status === "approved" && (
                          <button
                            onClick={() => handleUpdateBankStatus(bank.id || bank.uid!, "rejected")}
                            className="px-3 py-1.5 rounded-lg text-[11px] text-slate-400 hover:text-red-400 bg-slate-900 border border-slate-800"
                          >
                            Revoke
                          </button>
                        )}

                        {bank.status === "rejected" && (
                          <button
                            onClick={() => handleUpdateBankStatus(bank.id || bank.uid!, "approved")}
                            className="px-3 py-1.5 rounded-lg text-[11px] text-slate-300 bg-slate-800 hover:bg-slate-700"
                          >
                            Re-Approve
                          </button>
                        )}

                        <button
                          onClick={() => setInspectDoc(bank)}
                          className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800"
                          title="Inspect Raw JSON"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => handleDeleteBank(bank.id || bank.uid!)}
                          className="p-2 rounded-lg bg-slate-900 hover:bg-red-950/80 text-slate-400 hover:text-red-400 border border-slate-800"
                          title="Delete from Database"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* -------------------- TAB 3: EMERGENCY CRASHES -------------------- */}
        {activeTab === "accidents" && (
          <div className="space-y-5">
            <div className="bg-[#0F1422] border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                <input
                  type="text"
                  placeholder="Search by victim name, phone, blood group, address, ID..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#080B12] border border-slate-700 rounded-xl pl-10 pr-4 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {["ALL", "ACTIVE", "MOBILIZED", "RESOLVED"].map((st) => (
                  <button
                    key={st}
                    onClick={() => setAccidentStatusFilter(st)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                      accidentStatusFilter === st
                        ? "bg-red-600 text-white"
                        : "bg-[#080B12] text-slate-400 hover:text-white border border-slate-800"
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              {filteredAccidents.length === 0 ? (
                <div className="bg-[#0F1422] border border-slate-800 rounded-3xl p-12 text-center text-slate-400">
                  <Flame className="w-8 h-8 text-slate-600 mx-auto mb-2" />
                  <p className="text-sm font-semibold">No emergency crash records found.</p>
                </div>
              ) : (
                filteredAccidents.map((acc) => {
                  const isActive = acc.status === "ACTIVE";
                  const isMobilized = acc.status === "MOBILIZED";
                  return (
                    <div
                      key={acc.id}
                      className={`bg-[#0F1422] border-2 rounded-2xl p-5 shadow-xl transition-all ${
                        isActive
                          ? "border-red-600/50 bg-red-950/10"
                          : isMobilized
                          ? "border-cyan-500/40 bg-cyan-950/10"
                          : "border-slate-800 opacity-75"
                      }`}
                    >
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
                        <div className="space-y-2 flex-1">
                          <div className="flex flex-wrap items-center gap-2.5">
                            <span
                              className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase border ${
                                isActive
                                  ? "bg-red-950 text-red-400 border-red-800 animate-pulse"
                                  : isMobilized
                                  ? "bg-cyan-950 text-cyan-400 border-cyan-800"
                                  : "bg-slate-900 text-slate-400 border-slate-800"
                              }`}
                            >
                              {acc.status || "ACTIVE"}
                            </span>
                            <h3 className="text-base font-black text-white">{acc.userName || "Unknown Victim"}</h3>
                            <span className="px-2 py-0.5 rounded bg-red-950 border border-red-800 text-red-400 font-mono text-xs font-bold">
                              {acc.bloodGroup}
                            </span>
                            <span className="text-[11px] font-mono text-slate-500">ID: {acc.id}</span>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-slate-300">
                            <div>Phone: <strong className="font-mono text-white">{acc.userPhone}</strong></div>
                            <div>Impact: <strong className="font-mono text-red-400">{acc.gForce || 0} G</strong></div>
                            <div>Speed: <strong className="font-mono text-amber-300">{acc.speedKmh || 0} km/h</strong></div>
                            <div className="sm:col-span-3 text-slate-400 flex items-center gap-1">
                              <MapPin className="w-3.5 h-3.5 text-red-400 shrink-0" />
                              <span>{acc.location?.address || "GPS Lock Latched"}</span>
                            </div>
                          </div>

                          {acc.mobilizedBankName && (
                            <div className="text-[11px] text-cyan-300 font-mono flex items-center gap-1 pt-1">
                              <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                              <span>Blood Unit Mobilized by: {acc.mobilizedBankName}</span>
                            </div>
                          )}
                        </div>

                        {/* Controls */}
                        <div className="flex items-center gap-2 shrink-0 border-t lg:border-t-0 pt-3 lg:pt-0 border-slate-800">
                          {acc.location && (
                            <a
                              href={`https://maps.google.com/?q=${acc.location.latitude},${acc.location.longitude}`}
                              target="_blank"
                              rel="noreferrer"
                              className="px-3 py-1.5 rounded-lg text-xs font-bold text-slate-300 bg-slate-900 hover:bg-slate-800 border border-slate-800 flex items-center gap-1"
                            >
                              <ExternalLink className="w-3 h-3" />
                              <span>GPS Map</span>
                            </a>
                          )}

                          {acc.status !== "RESOLVED" && (
                            <button
                              onClick={() => handleResolveAccident(acc.id!)}
                              className="px-3 py-1.5 rounded-lg text-xs font-bold text-emerald-300 bg-emerald-950/60 hover:bg-emerald-900 border border-emerald-800"
                            >
                              Resolve
                            </button>
                          )}

                          <button
                            onClick={() => setInspectDoc(acc)}
                            className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800"
                            title="Inspect Raw JSON"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>

                          <button
                            onClick={() => handleDeleteAccident(acc.id!)}
                            className="p-2 rounded-lg bg-slate-900 hover:bg-red-950/80 text-slate-400 hover:text-red-400 border border-slate-800"
                            title="Delete Accident"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}

        {/* -------------------- TAB 4: REGISTERED USERS -------------------- */}
        {activeTab === "users" && (
          <div className="space-y-5">
            <div className="bg-[#0F1422] border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-xl flex items-center justify-between gap-4">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                <input
                  type="text"
                  placeholder="Search users by name, phone, blood group, UID..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#080B12] border border-slate-700 rounded-xl pl-10 pr-4 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>

            <div className="space-y-4">
              {filteredUsers.length === 0 ? (
                <div className="bg-[#0F1422] border border-slate-800 rounded-3xl p-12 text-center text-slate-400">
                  <Users className="w-8 h-8 text-slate-600 mx-auto mb-2" />
                  <p className="text-sm font-semibold">No registered users found.</p>
                </div>
              ) : (
                filteredUsers.map((u) => (
                  <div
                    key={u.id}
                    className="bg-[#0F1422] border border-slate-800 rounded-2xl p-5 shadow-xl space-y-3"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-cyan-950 border border-cyan-800 flex items-center justify-center font-bold text-cyan-400">
                          {u.profile?.bloodGroup || "O+"}
                        </div>
                        <div>
                          <h3 className="text-sm font-bold text-white">{u.profile?.name || "User Profile"}</h3>
                          <span className="text-[11px] font-mono text-slate-500">UID: {u.id}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setInspectDoc(u)}
                          className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 text-xs flex items-center gap-1"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Inspect</span>
                        </button>
                        <button
                          onClick={() => handleDeleteUser(u.id!)}
                          className="p-2 rounded-lg bg-slate-900 hover:bg-red-950 text-slate-400 hover:text-red-400 border border-slate-800"
                          title="Delete User"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 text-xs text-slate-300 pt-2 border-t border-slate-800/80">
                      <div>
                        <span className="text-slate-500 block">Primary Contact:</span>
                        <strong>{u.primaryContact?.name} ({u.primaryContact?.phone})</strong>
                      </div>
                      <div>
                        <span className="text-slate-500 block">Allergies:</span>
                        <span>{u.profile?.allergies || "None"}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block">Conditions &amp; Meds:</span>
                        <span>{u.profile?.medicalConditions || "None"} • {u.profile?.medications || "None"}</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* -------------------- TAB 5: BLACKBOX REPORTS -------------------- */}
        {activeTab === "reports" && (
          <div className="space-y-5">
            <div className="bg-[#0F1422] border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-xl flex items-center justify-between gap-4">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                <input
                  type="text"
                  placeholder="Search blackbox certificates by Report ID, user, address..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#080B12] border border-slate-700 rounded-xl pl-10 pr-4 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>

            <div className="space-y-4">
              {filteredReports.length === 0 ? (
                <div className="bg-[#0F1422] border border-slate-800 rounded-3xl p-12 text-center text-slate-400">
                  <FileSpreadsheet className="w-8 h-8 text-slate-600 mx-auto mb-2" />
                  <p className="text-sm font-semibold">No Blackbox certificates found.</p>
                </div>
              ) : (
                filteredReports.map((r) => (
                  <div
                    key={r.id || r.reportId}
                    className="bg-[#0F1422] border border-slate-800 rounded-2xl p-5 shadow-xl space-y-3"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="px-2.5 py-0.5 rounded-full bg-emerald-950 border border-emerald-800 text-emerald-400 text-[10px] font-mono font-bold">
                            VERIFIED CERTIFICATE
                          </span>
                          <h3 className="text-sm font-mono font-bold text-white">
                            {r.reportId || r.id}
                          </h3>
                        </div>
                        <p className="text-xs text-slate-400 mt-1">
                          Victim: <strong>{r.user?.profile?.name || "Unspecified"}</strong> • Blood: <strong>{r.user?.profile?.bloodGroup || "Unknown"}</strong>
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <Link
                          href={`/blackbox-portal?id=${r.reportId || r.id}`}
                          target="_blank"
                          className="px-3 py-1.5 rounded-lg text-xs font-bold text-cyan-300 bg-cyan-950/60 hover:bg-cyan-900 border border-cyan-800 flex items-center gap-1"
                        >
                          <ExternalLink className="w-3 h-3" />
                          <span>View Public Portal</span>
                        </Link>

                        <button
                          onClick={() => setInspectDoc(r)}
                          className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 text-xs"
                          title="Inspect Document"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => handleDeleteReport(r.id || r.reportId)}
                          className="p-2 rounded-lg bg-slate-900 hover:bg-red-950 text-slate-400 hover:text-red-400 border border-slate-800"
                          title="Delete Certificate"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs text-slate-300 pt-2 border-t border-slate-800/80">
                      <div>Impact: <strong className="font-mono text-red-400">{r.incident?.gForce || 0} G</strong></div>
                      <div>Pre-Crash Speed: <strong className="font-mono text-amber-300">{r.incident?.speedKmh || 0} km/h</strong></div>
                      <div>Rollover: <strong className="font-mono text-slate-300">{r.incident?.rolloverDetected ? "Yes" : "No"}</strong></div>
                      <div>Contact: <span className="font-mono text-slate-400">{r.user?.primaryContact?.phone || "None"}</span></div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* -------------------- TAB 6: DATABASE UTILITIES -------------------- */}
        {activeTab === "utilities" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="p-6 rounded-3xl bg-[#0F1422] border border-slate-800 space-y-4">
                <div className="flex items-center gap-2">
                  <Trash2 className="w-5 h-5 text-red-400" />
                  <h3 className="text-sm font-bold uppercase tracking-wider text-white">
                    Purge Simulation Data
                  </h3>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Safely clears test records generated during system verification (e.g. simulated crashes, demo accounts), while preserving real production records.
                </p>
                <button
                  onClick={handlePurgeTestAccidents}
                  disabled={loading}
                  className="px-4 py-2.5 rounded-xl text-xs font-bold text-red-200 bg-red-950 hover:bg-red-900 border border-red-800 flex items-center gap-2 transition-colors"
                >
                  <AlertOctagon className="w-4 h-4 text-red-400" />
                  <span>Execute Purge Test Crashes</span>
                </button>
              </div>

              <div className="p-6 rounded-3xl bg-[#0F1422] border border-slate-800 space-y-4">
                <div className="flex items-center gap-2">
                  <Flame className="w-5 h-5 text-amber-400" />
                  <h3 className="text-sm font-bold uppercase tracking-wider text-white">
                    Emergency Dispatch Simulator
                  </h3>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Triggers an automated emergency telemetry signal directly into Cloud Firestore to test live radar synchronization and blood bank email routing.
                </p>
                <button
                  onClick={handleCreateTestEmergency}
                  disabled={loading}
                  className="px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 flex items-center gap-2 transition-colors shadow-lg shadow-red-950/40"
                >
                  <Flame className="w-4 h-4" />
                  <span>Fire Live Test Incident</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* RAW JSON INSPECTOR MODAL */}
        {inspectDoc && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-[#0F1422] border-2 border-slate-700 rounded-3xl max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl animate-in zoom-in-95">
              <div className="p-5 border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Database className="w-4 h-4 text-cyan-400" />
                  <h3 className="text-sm font-bold text-white font-mono">
                    Document Inspector ({inspectDoc.id || inspectDoc.reportId || "Document"})
                  </h3>
                </div>
                <button
                  onClick={() => setInspectDoc(null)}
                  className="p-1 rounded-lg text-slate-400 hover:text-white bg-slate-900 border border-slate-800 text-xs"
                >
                  ✕ Close
                </button>
              </div>

              <div className="p-5 overflow-auto flex-1 font-mono text-[11px] text-cyan-300 bg-[#080B12]">
                <pre className="whitespace-pre-wrap leading-relaxed">
                  {JSON.stringify(inspectDoc, null, 2)}
                </pre>
              </div>

              <div className="p-4 border-t border-slate-800 flex justify-end gap-2 bg-[#0F1422]">
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(JSON.stringify(inspectDoc, null, 2));
                    alert("JSON copied to clipboard!");
                  }}
                  className="px-3.5 py-1.5 rounded-xl text-xs font-bold text-white bg-slate-800 hover:bg-slate-700 transition-colors"
                >
                  Copy JSON
                </button>
                <button
                  onClick={() => setInspectDoc(null)}
                  className="px-3.5 py-1.5 rounded-xl text-xs font-bold text-slate-400 hover:text-white"
                >
                  Dismiss
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
