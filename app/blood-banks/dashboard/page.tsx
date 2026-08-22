"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  collection,
  query,
  where,
  onSnapshot,
  orderBy,
  limit,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { AccidentDocument, BloodBankDocument } from "@/types";
import LiveAccidentCard from "@/components/LiveAccidentCard";
import { pushTestAccident } from "@/lib/firestore-helpers";
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
} from "lucide-react";

const DEMO_BLOOD_BANKS: Partial<BloodBankDocument>[] = [
  {
    id: "bank-delhi-01",
    name: "Apex Regional Trauma Blood Bank (New Delhi)",
    lat: 28.6139,
    lng: 77.209,
    phone: "+91 11 2658 8500",
  },
  {
    id: "bank-mumbai-02",
    name: "Metropolitan Red Cross Center (Mumbai)",
    lat: 19.076,
    lng: 72.8777,
    phone: "+91 22 2414 4455",
  },
  {
    id: "bank-bangalore-03",
    name: "Bangalore Trauma & Transfusion Institute",
    lat: 12.9716,
    lng: 77.5946,
    phone: "+91 80 2297 3400",
  },
];

export default function BloodBankDashboardPage() {
  const [accidents, setAccidents] = useState<AccidentDocument[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBank, setSelectedBank] = useState(DEMO_BLOOD_BANKS[0]);
  const [filterGroup, setFilterGroup] = useState<string>("ALL");
  const [isSimulating, setIsSimulating] = useState(false);
  const [simMessage, setSimMessage] = useState("");

  // Firestore onSnapshot real-time listener for ACTIVE accidents
  useEffect(() => {
    setLoading(true);
    let unsubscribe: () => void = () => {};

    try {
      const q = query(
        collection(db, "accidents"),
        where("status", "==", "ACTIVE")
      );

      unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          const docs: AccidentDocument[] = [];
          snapshot.forEach((docSnap) => {
            docs.push({
              id: docSnap.id,
              ...(docSnap.data() as AccidentDocument),
            });
          });

          // Sort by timestamp desc if available
          docs.sort((a, b) => {
            const timeA = a.createdAt?.seconds || 0;
            const timeB = b.createdAt?.seconds || 0;
            return timeB - timeA;
          });

          setAccidents(docs);
          setLoading(false);

          if (docs.length > 0) {
            playAlertSound("beep");
          }
        },
        (error) => {
          console.warn("Firestore onSnapshot error or permission limits:", error);
          // Fallback to initial sample live accidents if Firestore permissions are restricted
          setAccidents([
            {
              id: "ACC-2026-LIVE-01",
              userId: "demo-user-1",
              userName: "Rahul Sharma",
              bloodGroup: "O+",
              userPhone: "+91 98765 43210",
              speedKmh: 78.4,
              gForce: 5.8,
              location: {
                latitude: 28.6139,
                longitude: 77.209,
                address: "NH-48 Flyover, Near Mahipalpur Junction, New Delhi",
              },
              weatherCondition: "Heavy Rain / Thunderstorm",
              status: "ACTIVE",
              createdAt: new Date().toISOString(),
            },
            {
              id: "ACC-2026-LIVE-02",
              userId: "demo-user-3",
              userName: "Amitav Roy",
              bloodGroup: "AB-",
              userPhone: "+91 99887 76655",
              speedKmh: 94.0,
              gForce: 6.9,
              location: {
                latitude: 12.9716,
                longitude: 77.5946,
                address: "Outer Ring Road, Bellandur EcoSpace, Bengaluru",
              },
              weatherCondition: "Dense Fog / Low Visibility",
              status: "ACTIVE",
              createdAt: new Date(Date.now() - 900000).toISOString(),
            },
          ]);
          setLoading(false);
        }
      );
    } catch (e) {
      console.warn("Could not attach listener:", e);
      setLoading(false);
    }

    return () => unsubscribe();
  }, []);

  const handleSimulateCrash = async () => {
    setIsSimulating(true);
    setSimMessage("Pushing emergency incident packet to Firestore /accidents...");
    playAlertSound("siren");

    try {
      const res = await pushTestAccident();
      if (res.success) {
        setSimMessage(`Crash alert published live with ID: ${res.id}`);
        playAlertSound("success");
      } else {
        // Local simulation fallback
        const mockNew: AccidentDocument = {
          id: `ACC-${Math.floor(1000 + Math.random() * 9000)}`,
          userId: "sim-victim",
          userName: "Vikram Malhotra",
          bloodGroup: "O-",
          userPhone: "+91 98222 33445",
          speedKmh: 86.2,
          gForce: 6.1,
          location: {
            latitude: selectedBank.lat! + (Math.random() * 0.04 - 0.02),
            longitude: selectedBank.lng! + (Math.random() * 0.04 - 0.02),
            address: "Highway Cross Road, 3.8 km from Facility",
          },
          weatherCondition: "Overcast / Wet Road",
          status: "ACTIVE",
          createdAt: new Date().toISOString(),
        };
        setAccidents((prev) => [mockNew, ...prev]);
        setSimMessage("Simulated live crash broadcast into emergency feed!");
      }
    } catch (e: any) {
      setSimMessage(e.message || "Simulated locally");
    } finally {
      setIsSimulating(false);
      setTimeout(() => setSimMessage(""), 5000);
    }
  };

  const filteredAccidents = accidents.filter((acc) => {
    if (filterGroup === "ALL") return true;
    return acc.bloodGroup?.toUpperCase() === filterGroup;
  });

  return (
    <div className="min-h-screen bg-[#0B0F19] py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Top Control Bar & Live Status */}
        <div className="bg-[#111827] border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl glow-card">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2.5 mb-2">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                </span>
                <span className="text-xs font-mono font-bold tracking-widest text-red-400 uppercase">
                  FIRESTORE REAL-TIME DISPATCH FEED
                </span>
                <span className="text-[10px] bg-red-950 text-red-300 px-2 py-0.5 rounded border border-red-800 font-mono">
                  ACTIVE ON-SNAPSHOT
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-white">
                Live Accident Alerts & Blood Mobilization
              </h1>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Listening for active vehicle crashes and victim blood group matches within 15 km.
              </p>
            </div>

            {/* Simulation Trigger & Register CTA */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={handleSimulateCrash}
                disabled={isSimulating}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-bold text-white bg-red-600 hover:bg-red-500 border border-red-400/40 shadow-lg shadow-red-950/60 transition-transform active:scale-95 disabled:opacity-50"
              >
                <Flame className="w-4 h-4 text-white animate-pulse" />
                <span>{isSimulating ? "Publishing Alert..." : "Trigger Test Crash Alert"}</span>
              </button>

              <Link
                href="/blood-banks/register"
                className="inline-flex items-center gap-2 px-4 py-3 rounded-xl text-xs font-bold text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-colors"
              >
                <PlusCircle className="w-4 h-4 text-cyan-400" />
                <span>Register New Bank</span>
              </Link>
            </div>
          </div>

          {/* Feedback banner for test accident creation */}
          {simMessage && (
            <div className="mt-4 p-3 rounded-xl bg-red-950/80 border border-red-700 text-xs text-red-200 flex items-center gap-2 animate-in fade-in">
              <Zap className="w-4 h-4 text-amber-400 shrink-0" />
              <span>{simMessage}</span>
            </div>
          )}

          {/* Filter Bar & Facility Selector */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mt-6 pt-6 border-t border-slate-800">
            {/* Facility Location Selector */}
            <div className="md:col-span-6 space-y-1.5">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-cyan-400" />
                <span>Current Blood Bank Perspective</span>
              </label>
              <select
                value={selectedBank.id}
                onChange={(e) => {
                  const b = DEMO_BLOOD_BANKS.find((x) => x.id === e.target.value);
                  if (b) setSelectedBank(b);
                }}
                className="w-full bg-[#0B0F19] border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500"
              >
                {DEMO_BLOOD_BANKS.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.name}
                  </option>
                ))}
              </select>
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

          {loading ? (
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
                flagged. Click &quot;Trigger Test Crash Alert&quot; above to simulate an emergency.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredAccidents.map((acc, idx) => (
                <LiveAccidentCard
                  key={acc.id || idx}
                  accident={acc}
                  bankLocation={{ lat: selectedBank.lat || 28.6139, lng: selectedBank.lng || 77.209 }}
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
