"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Mail,
  Send,
  ArrowLeft,
  User,
  Building2,
  Shield,
  CheckCircle2,
  ExternalLink,
} from "lucide-react";

type ContactCategory = "general" | "blood_bank" | "institutional";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [category, setCategory] = useState<ContactCategory>("general");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const categories = [
    {
      id: "general" as ContactCategory,
      title: "General User",
      desc: "App feedback, bug reports, feature requests",
      icon: User,
    },
    {
      id: "blood_bank" as ContactCategory,
      title: "Blood Bank / Hospital",
      desc: "Verification status, integration support, radar queries",
      icon: Building2,
    },
    {
      id: "institutional" as ContactCategory,
      title: "Police / Insurance",
      desc: "Blackbox audit access, law enforcement inquiry",
      icon: Shield,
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const categoryLabel =
      category === "general"
        ? "General User Inquiry"
        : category === "blood_bank"
        ? "Blood Bank / Hospital Onboarding"
        : "Police / Insurance Institutional Inquiry";

    const subject = encodeURIComponent(`[AcciAlert Support] ${categoryLabel} - from ${name || "User"}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nCategory: ${categoryLabel}\n\nMessage:\n${message}\n\n---\nSent via AcciAlert Web Contact Portal`
    );

    const mailtoUrl = `mailto:accialert.help@gmail.com?subject=${subject}&body=${body}`;
    window.location.href = mailtoUrl;
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] text-slate-100 py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Back navigation & Header */}
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-white transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-700 text-xs font-semibold text-slate-300 mb-4">
            <Mail className="w-3.5 h-3.5 text-cyan-400" />
            <span className="font-mono text-[11px] tracking-wider uppercase">SUPPORT &amp; INQUIRIES</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Get in Touch
          </h1>
          <p className="text-sm sm:text-base text-slate-400 mt-2 leading-relaxed">
            Have a question, feedback, or need assistance with blood bank verification or blackbox access?
            Send us a message and our engineering team will respond promptly.
          </p>
        </div>

        {/* Direct Email Banner */}
        <div className="bg-gradient-to-r from-[#161f30] to-[#111827] border border-slate-700/80 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-lg">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-cyan-600/20 border border-cyan-500/30 flex items-center justify-center shrink-0">
              <Mail className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <div className="text-xs text-slate-400 font-mono uppercase">Direct Support Inbox</div>
              <a
                href="mailto:accialert.help@gmail.com"
                className="text-sm sm:text-base font-mono font-bold text-white hover:text-cyan-400 transition-colors"
              >
                accialert.help@gmail.com
              </a>
            </div>
          </div>
          <a
            href="mailto:accialert.help@gmail.com"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-all shrink-0"
          >
            <span>Email Directly</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
          </a>
        </div>

        {/* Contact Form Card */}
        <div className="bg-[#111827] border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Category Selector */}
            <div className="space-y-3">
              <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
                1. Select Category *
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {categories.map((cat) => {
                  const Icon = cat.icon;
                  const isSelected = category === cat.id;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setCategory(cat.id)}
                      className={`p-3.5 rounded-2xl border text-left transition-all duration-200 flex flex-col justify-between ${
                        isSelected
                          ? "bg-slate-800/90 border-cyan-500 shadow-md shadow-cyan-950/30 scale-[1.02]"
                          : "bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900"
                      }`}
                    >
                      <div className="flex items-center justify-between w-full mb-2">
                        <Icon className={`w-4 h-4 ${isSelected ? "text-cyan-400" : "text-slate-400"}`} />
                        {isSelected && <CheckCircle2 className="w-4 h-4 text-cyan-400" />}
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white">{cat.title}</div>
                        <div className="text-[10px] text-slate-400 mt-0.5 leading-tight">{cat.desc}</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Name and Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
                  2. Your Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Dr. Rajesh Verma / Officer Sharma"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#0B0F19] border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all font-medium"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
                  3. Your Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="name@organization.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#0B0F19] border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all font-medium"
                />
              </div>
            </div>

            {/* Message */}
            <div className="space-y-1.5">
              <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
                4. Your Message / Query *
              </label>
              <textarea
                required
                rows={5}
                placeholder="Describe your inquiry, request, or issue in detail..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full bg-[#0B0F19] border border-slate-800 rounded-xl p-4 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all leading-relaxed font-medium"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-4 rounded-2xl font-bold text-sm sm:text-base text-white bg-gradient-to-r from-cyan-600 via-cyan-600 to-blue-700 hover:from-cyan-500 hover:to-blue-600 border border-cyan-400/50 shadow-xl shadow-cyan-950/50 transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>Send Message via Email Client</span>
            </button>

            {submitted && (
              <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-800 text-emerald-300 text-xs flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>
                  Your email client has been opened with your pre-filled inquiry. You can also write to us directly at{" "}
                  <strong className="text-white font-mono">accialert.help@gmail.com</strong>.
                </span>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
