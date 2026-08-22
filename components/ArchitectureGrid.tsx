"use client";

import {
  Cpu,
  Shield,
  FileSpreadsheet,
  HeartPulse,
  Zap,
  CheckCircle,
  PhoneCall,
  Lock,
  Clock,
  Heart,
  Droplet,
} from "lucide-react";

export default function ArchitectureGrid() {
  const architectures = [
    {
      id: "detection",
      icon: Cpu,
      tag: "AUTOMATIC PROTECTION",
      title: "Smart Accident Detection",
      color: "from-red-600 to-amber-600",
      accent: "text-red-400",
      bgGlow: "bg-red-500/10",
      borderColor: "border-red-500/30 hover:border-red-500/60",
      description:
        "Your phone continuously monitors for vehicle collisions while driving, responding in milliseconds when an emergency occurs.",
      features: [
        "Senses real vehicle collisions while you are driving.",
        "Smart filters prevent false alarms from phone drops or bumps.",
        "Works completely offline on your device without needing mobile data.",
        "Instant response with zero delay during the critical first seconds.",
      ],
    },
    {
      id: "overlay",
      icon: Shield,
      tag: "INSTANT MEDICAL ACCESS",
      title: "Emergency Lock Screen & Siren",
      color: "from-amber-500 to-orange-600",
      accent: "text-amber-400",
      bgGlow: "bg-amber-500/10",
      borderColor: "border-amber-500/30 hover:border-amber-500/60",
      description:
        "Displays vital medical information to first responders and sounds a loud alarm so bystanders can find and help you immediately.",
      features: [
        "Shows Blood Group (B+), allergies, and emergency numbers on the lock screen.",
        "Sounds a loud alarm at maximum volume to attract nearby helpers.",
        "20-second safety countdown allows you to cancel if you are safe.",
        "Helpers can call your family directly from the emergency screen.",
      ],
    },
    {
      id: "sos",
      icon: PhoneCall,
      tag: "FAMILY NOTIFICATION",
      title: "Family SOS & Live GPS Sharing",
      color: "from-emerald-500 to-teal-600",
      accent: "text-emerald-400",
      bgGlow: "bg-emerald-500/10",
      borderColor: "border-emerald-500/30 hover:border-emerald-500/60",
      description:
        "Automatically sends text messages to your trusted contacts with your live location on Google Maps so help arrives without confusion.",
      features: [
        "Sends emergency SMS directly to your selected family and friends.",
        "Includes a one-tap link to open your exact location on Google Maps.",
        "Works via regular mobile text messages even in weak internet areas.",
        "Keeps your family informed in the critical first minutes.",
      ],
    },
    {
      id: "blood",
      icon: Droplet,
      tag: "HOSPITAL MOBILIZATION",
      title: "Nearby Blood Bank Alerting",
      color: "from-purple-500 to-pink-600",
      accent: "text-purple-400",
      bgGlow: "bg-purple-500/10",
      borderColor: "border-purple-500/30 hover:border-purple-500/60",
      description:
        "Alerts nearby hospitals and blood banks within 15 km so matching blood units are organized before you arrive at the trauma center.",
      features: [
        "Scans for verified blood banks and trauma centers within 15 km.",
        "Matches your exact blood type so units are pre-reserved.",
        "Saves life-saving minutes during emergency blood transfusions.",
        "Directly connects hospital dispatch with incident coordinates.",
      ],
    },
  ];

  return (
    <section id="architecture" className="py-20 lg:py-28 bg-[#0B0F19] relative">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-cyan-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-red-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-800/50 text-xs font-semibold text-cyan-400 mb-4">
            <Zap className="w-3.5 h-3.5 text-cyan-400" />
            <span>FOUR PILLARS OF EMERGENCY SAFETY</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Complete Protection on Every Journey
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
            AcciAlert is built to safeguard you and your loved ones from the second an impact occurs
            until you receive medical attention.
          </p>
        </div>

        {/* 4 Pillars Architecture Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {architectures.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className={`group relative bg-[#111827] rounded-3xl p-8 border ${item.borderColor} transition-all duration-300 hover:scale-[1.01] hover:shadow-2xl flex flex-col justify-between overflow-hidden glow-card`}
              >
                {/* Decorative background glow */}
                <div
                  className={`absolute -top-24 -right-24 w-48 h-48 ${item.bgGlow} rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500 pointer-events-none`}
                />

                <div>
                  {/* Card Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div
                      className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.color} p-0.5 shadow-lg`}
                    >
                      <div className="w-full h-full bg-[#111827] rounded-[14px] flex items-center justify-center">
                        <Icon className={`w-7 h-7 ${item.accent}`} />
                      </div>
                    </div>
                    <span className="text-[10px] uppercase font-mono font-extrabold tracking-widest px-2.5 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-400">
                      {item.tag}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-2xl font-bold text-white mb-3">{item.title}</h3>
                  <p className="text-slate-300 text-sm leading-relaxed mb-6">
                    {item.description}
                  </p>

                  {/* Features List */}
                  <ul className="space-y-3 border-t border-slate-800/80 pt-6">
                    {item.features.map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2.5 text-xs text-slate-300">
                        <CheckCircle className={`w-4 h-4 ${item.accent} shrink-0 mt-0.5`} />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
