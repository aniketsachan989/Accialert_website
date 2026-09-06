"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ShieldAlert,
  Radio,
  FileSpreadsheet,
  Droplet,
  Menu,
  X,
  Zap,
  Activity,
  ExternalLink,
} from "lucide-react";
import Image from "next/image";
import { PLAY_STORE_URL } from "@/lib/utils";

// Google Play triangular icon
function GooglePlayIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 512 512" className={className} fill="currentColor">
      <path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z" />
    </svg>
  );
}

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: "Simulation", href: "/#simulator", icon: Activity },
    { name: "App Showcase", href: "/#app-screens", icon: ShieldAlert },
    { name: "Architecture", href: "/#architecture", icon: Zap },
    { name: "Blood Banks", href: "/blood-banks", icon: Droplet },
    { name: "Live Alerts", href: "/blood-banks/dashboard", icon: Radio, badge: "LIVE" },
    { name: "Blackbox Portal", href: "/blackbox-portal", icon: FileSpreadsheet },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0B0F19]/95 backdrop-blur-md border-b border-slate-800/80 w-full max-w-full">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between w-full">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2 sm:gap-3 group shrink-0">
          <div className="relative flex items-center justify-center w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-black border border-slate-700 shadow-lg shadow-red-950/40 p-1 sm:p-1.5 group-hover:scale-105 transition-transform duration-300 overflow-hidden shrink-0">
            <Image
              src="/logo.png"
              alt="AcciAlert Logo"
              width={40}
              height={40}
              className="w-full h-full object-contain"
              priority
            />
            <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5 sm:h-3 sm:w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 sm:h-3 sm:w-3 bg-red-500 border border-[#0B0F19]"></span>
            </span>
          </div>
          <div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="text-base sm:text-xl font-extrabold tracking-tight text-white font-mono">
                ACCI<span className="text-red-500">ALERT</span>
              </span>
              <span className="text-[9px] sm:text-[10px] uppercase font-bold tracking-widest bg-gradient-to-r from-red-600 to-rose-600 text-white px-1.5 sm:px-2 py-0.5 rounded shadow-sm shadow-red-950">
                v6.0 Pro
              </span>
            </div>
            <p className="text-[10px] sm:text-[11px] text-slate-400 -mt-0.5 hidden md:block">
              Emergency Response Ecosystem
            </p>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            const isBloodBank = link.name === "Blood Banks";
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "text-white bg-slate-800/90 border border-slate-700 shadow-inner"
                    : isBloodBank
                    ? "text-red-300 hover:text-white bg-red-950/40 hover:bg-red-900/50 border border-red-800/50 font-bold"
                    : "text-slate-300 hover:text-white hover:bg-slate-800/50"
                }`}
              >
                <Icon
                  className={`w-4 h-4 ${
                    link.name === "Live Alerts" || isBloodBank
                      ? "text-red-400 animate-pulse"
                      : "text-cyan-400"
                  }`}
                />
                <span>{link.name}</span>
                {link.badge && (
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Action CTAs Desktop */}
        <div className="hidden sm:flex items-center gap-2.5">
          {/* HIGH-WEIGHTAGE PROMINENT BLOOD BANK REGISTRATION BUTTON */}
          <Link
            href="/blood-banks/register"
            className="relative inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-extrabold uppercase tracking-wider text-white bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-500 hover:to-rose-600 border border-red-400/50 shadow-lg shadow-red-950/60 transition-all hover:scale-105 active:scale-95 shrink-0"
          >
            <Droplet className="w-3.5 h-3.5 fill-white animate-bounce" />
            <span>Register Blood Bank</span>
          </Link>

          <a
            href={PLAY_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 shadow-md shadow-emerald-950/50 border border-emerald-500/40 transition-all hover:scale-[1.02] active:scale-[0.98] group shrink-0"
          >
            <GooglePlayIcon className="w-3.5 h-3.5 text-white group-hover:scale-110 transition-transform" />
            <span>Play Store</span>
            <ExternalLink className="w-3 h-3 text-emerald-200" />
          </a>
        </div>

        {/* Mobile Hamburger & Play Button */}
        <div className="lg:hidden flex items-center gap-2 shrink-0">
          <a
            href={PLAY_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-xl bg-emerald-600 text-white shadow-md flex items-center justify-center"
            aria-label="Get on Google Play"
          >
            <GooglePlayIcon className="w-4 h-4" />
          </a>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl text-slate-300 hover:text-white bg-slate-900 border border-slate-800 transition-colors focus:outline-none flex items-center justify-center"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0B0F19] border-b border-slate-800 px-4 pt-2 pb-6 space-y-2">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "text-white bg-slate-800 border border-slate-700"
                    : "text-slate-300 hover:bg-slate-800/50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4 text-cyan-400" />
                  <span>{link.name}</span>
                </div>
                {link.badge && (
                  <span className="text-[10px] font-bold px-2 py-0.5 bg-red-950 text-red-400 border border-red-800 rounded">
                    {link.badge}
                  </span>
                )}
              </Link>
            );
          })}
          <div className="pt-3 flex flex-col gap-2">
            <Link
              href="/blood-banks/register"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-extrabold text-white bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-500 hover:to-rose-600 shadow-lg shadow-red-950/50 transition-colors"
            >
              <Droplet className="w-4 h-4 fill-white" />
              <span>Register Verified Blood Bank</span>
            </Link>
            <a
              href={PLAY_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2.5 py-3 rounded-xl text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-500 transition-colors"
            >
              <GooglePlayIcon className="w-4 h-4" />
              <span>Get it on Google Play</span>
              <ExternalLink className="w-3.5 h-3.5 text-emerald-200" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
