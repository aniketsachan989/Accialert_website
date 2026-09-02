"use client";

import { useState } from "react";
import { HelpCircle, ChevronDown, Sparkles, Shield, Cpu, PhoneCall, Droplet, Lock } from "lucide-react";

interface FaqItem {
  question: string;
  answer: string;
  icon: any;
  category: string;
}

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FaqItem[] = [
    {
      question: "How does AcciAlert detect vehicle collisions & home falls with zero latency?",
      answer:
        "AcciAlert utilizes an on-device TensorFlow Lite neural network running continuously at 50Hz sensor polling (accelerometer, gyroscope, orientation, and GPS velocity). It analyzes sudden deceleration spikes, rotational torque, and impact shockwaves locally on your phone hardware in milliseconds without relying on cloud processing.",
      icon: Cpu,
      category: "DETECTION & AI",
    },
    {
      question: "Does emergency SOS SMS & Calling work without an active internet connection?",
      answer:
        "Yes! Core SOS functions operate completely offline. When an accident or fall occurs, the app directly interfaces with your phone's cellular GSM hardware to dispatch automated SMS alerts containing your live GPS coordinates directly to your designated emergency contacts.",
      icon: PhoneCall,
      category: "OFFLINE RELIABILITY",
    },
    {
      question: "How does the 20-second unblockable Medical ID lock screen overlay work?",
      answer:
        "Upon detecting an impact, AcciAlert sounds a siren at 100% volume and displays a high-visibility emergency card over the phone's lock screen (even if locked with a fingerprint, face ID, or PIN). Bystanders and first responders can immediately see your Blood Group, Allergies, Chronic Conditions, and tap to call your family.",
      icon: Shield,
      category: "LOCK SCREEN OVERLAY",
    },
    {
      question: "How do blood banks and trauma centers receive 15km geohashed alerts?",
      answer:
        "When an incident is confirmed, AcciAlert's cloud network calculates a 15 km geohashed radius around the crash site. Nearby state-licensed blood centers and trauma hospitals receive real-time alerts with the required blood group so life-saving units are reserved before the ambulance arrives.",
      icon: Droplet,
      category: "BLOOD NETWORK",
    },
    {
      question: "What is the Digital Blackbox report and how is it used by police & insurance?",
      answer:
        "The Digital Blackbox acts like an aircraft flight recorder for road safety. It compiles tamper-evident pre-impact speed profiles, G-force shock curves, rollover flags, and local weather telemetry into a verifiable 1-page report accessible only via an unguessable Report ID.",
      icon: Sparkles,
      category: "DIGITAL BLACKBOX",
    },
    {
      question: "Is my location tracked continuously in the background?",
      answer:
        "No. AcciAlert adheres strictly to India's DPDP Act 2023. Your personal medical profile and emergency contacts are encrypted locally on your device with AES-256 hardware encryption. Location is only accessed and shared during an authentic emergency impact.",
      icon: Lock,
      category: "PRIVACY FIRST",
    },
  ];

  return (
    <section id="faq" className="py-20 lg:py-28 bg-[#0B0F19] border-t border-slate-800/80 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-cyan-600/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-700/80 text-xs font-bold text-cyan-400 mb-4 shadow-lg shadow-black/40">
            <HelpCircle className="w-3.5 h-3.5" />
            <span className="tracking-widest uppercase text-[11px] font-mono font-bold">FREQUENTLY ASKED QUESTIONS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Everything You Need to Know About AcciAlert
          </h2>
          <p className="text-sm sm:text-base text-slate-400 mt-3 max-w-xl mx-auto leading-relaxed">
            Common questions regarding edge crash detection, lock screen medical ID, blood mobilization, and privacy guarantees.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            const Icon = faq.icon;
            return (
              <div
                key={index}
                className={`bg-[#111827] border rounded-2xl sm:rounded-3xl transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? "border-cyan-500/60 shadow-xl shadow-cyan-950/20"
                    : "border-slate-800 hover:border-slate-700"
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-3.5 sm:gap-4">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                        isOpen
                          ? "bg-cyan-600/20 border border-cyan-500/40 text-cyan-400"
                          : "bg-slate-900 border border-slate-800 text-slate-400"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono font-bold text-cyan-400 tracking-wider uppercase block mb-0.5">
                        {faq.category}
                      </span>
                      <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                        {faq.question}
                      </h3>
                    </div>
                  </div>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border transition-transform duration-300 ${
                      isOpen
                        ? "transform rotate-180 bg-cyan-600/20 border-cyan-500 text-cyan-300"
                        : "bg-slate-900 border-slate-800 text-slate-400"
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-6 sm:px-6 sm:pb-6 text-sm sm:text-base text-slate-300 leading-relaxed border-t border-slate-800/80 pt-4">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
