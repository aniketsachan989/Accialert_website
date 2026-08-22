import Link from "next/link";
import {
  Droplet,
  Radio,
  PlusCircle,
  MapPin,
  ShieldCheck,
  Zap,
  Activity,
  Heart,
  Clock,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

export default function BloodBankHubPage() {
  const stats = [
    { label: "Registered Blood Banks", value: "1,240+", sub: "Verified Facilities" },
    { label: "Avg Mobilization Time", value: "4.2 Min", sub: "Golden Hour Target" },
    { label: "Active Geohash Radius", value: "15.0 km", sub: "Proximity Precision" },
    { label: "Emergency Reserve Ready", value: "99.8%", sub: "Live Stock Sync" },
  ];

  const steps = [
    {
      step: "01",
      title: "GPS & Stock Registration",
      desc: "Licensed blood banks register facility coordinates and declare active blood group supply capacities (O-, A+, B+, etc.).",
      icon: MapPin,
    },
    {
      step: "02",
      title: "Real-Time Accident Ingestion",
      desc: "When a vehicle crash is verified by edge ML, Firestore pushes victim blood group and coordinates instantaneously to the grid.",
      icon: Radio,
    },
    {
      step: "03",
      title: "15km Proximity Dispatch",
      desc: "Facilities within a 15 km radius receive prioritized audio-visual alert feeds with calculated transit distances and contact numbers.",
      icon: Droplet,
    },
  ];

  return (
    <div className="min-h-screen bg-[#0B0F19] py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Top Header Banner */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-950/60 border border-red-800/50 text-xs font-semibold text-red-400">
            <Droplet className="w-3.5 h-3.5 text-red-500 fill-red-500" />
            <span>ACCIALERT BLOOD MOBILIZATION NETWORK</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
            Rapid Blood Mobilization for Golden-Hour Trauma
          </h1>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            Severe trauma victims lose up to 40% of blood volume before reaching trauma bays.
            AcciAlert links accident locations directly to regional blood banks before the ambulance arrives.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Link
              href="/blood-banks/register"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold text-white bg-red-600 hover:bg-red-500 shadow-lg shadow-red-950/50 transition-transform active:scale-95"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Register Blood Bank</span>
            </Link>
            <Link
              href="/blood-banks/dashboard"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-red-500/50 transition-transform active:scale-95"
            >
              <Radio className="w-4 h-4 text-red-400 animate-pulse" />
              <span>Open Live Dispatch Dashboard</span>
            </Link>
          </div>
        </div>

        {/* Network Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="bg-[#111827] rounded-2xl p-6 border border-slate-800 shadow-lg glow-card text-center sm:text-left"
            >
              <div className="text-3xl sm:text-4xl font-extrabold text-white font-mono">
                {stat.value}
              </div>
              <div className="text-xs font-bold text-red-400 mt-1 uppercase tracking-wider">
                {stat.label}
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5">{stat.sub}</div>
            </div>
          ))}
        </div>

        {/* How It Works 3-Step Process */}
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              How the Geohash Mobilization Protocol Operates
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-2">
              Autonomous trauma dispatch engineered to eliminate dispatch coordination lag.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {steps.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="bg-[#111827] rounded-3xl p-8 border border-slate-800 flex flex-col justify-between shadow-xl glow-card relative overflow-hidden group hover:border-red-500/40 transition-colors"
                >
                  <div className="text-4xl font-black text-slate-800 group-hover:text-red-950/80 transition-colors font-mono mb-4">
                    {item.step}
                  </div>
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-red-600/15 border border-red-500/30 flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-red-400" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                    <p className="text-xs text-slate-300 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quick Launch Card */}
        <div className="bg-gradient-to-r from-red-950/40 via-slate-900 to-cyan-950/40 rounded-3xl p-8 sm:p-10 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-2 text-center sm:text-left">
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              Ready to connect your facility to the live emergency feed?
            </h3>
            <p className="text-xs sm:text-sm text-slate-400">
              Registration is verified and free for licensed regional and hospital blood banks.
            </p>
          </div>
          <Link
            href="/blood-banks/register"
            className="shrink-0 inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold text-white bg-red-600 hover:bg-red-500 shadow-md shadow-red-950/50 transition-all"
          >
            <span>Register Facility</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
