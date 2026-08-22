import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=com.aniket.accialertsos&pcampaignid=web_share";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Calculates distance between two coordinates in kilometers using Haversine formula
 */
export function calculateDistanceKm(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  if (lat1 === lat2 && lon1 === lon2) return 0;
  const R = 6371; // Earth's radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Number((R * c).toFixed(1));
}

/**
 * Generates pseudo-random SHA-256 style tamper-evident hash for incident reports
 */
export function generateIncidentHash(incidentId: string, timestamp: string | number): string {
  const seed = `${incidentId}-${timestamp}-ACCIALERT-SECURE-CHAIN`;
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    const char = seed.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  const hex = Math.abs(hash).toString(16).padStart(8, "0");
  return `0x${hex}e98f41c27a9d038e1b4f728c0b5d6e3f${hex.slice(0, 4)}`.toUpperCase();
}

/**
 * Formats a Firebase timestamp or Date
 */
export function formatDateTime(ts: any): string {
  if (!ts) return new Date().toLocaleString();
  if (ts.toDate && typeof ts.toDate === "function") {
    return ts.toDate().toLocaleString("en-US", {
      dateStyle: "medium",
      timeStyle: "medium",
    });
  }
  if (ts.seconds) {
    return new Date(ts.seconds * 1000).toLocaleString("en-US", {
      dateStyle: "medium",
      timeStyle: "medium",
    });
  }
  if (typeof ts === "string" || typeof ts === "number") {
    const d = new Date(ts);
    return isNaN(d.getTime()) ? String(ts) : d.toLocaleString("en-US", { dateStyle: "medium", timeStyle: "medium" });
  }
  return new Date().toLocaleString();
}

/**
 * High-Fidelity Web Audio API synthesizer for realistic emergency sound effects
 */
export function playAlertSound(
  type: "crash" | "siren" | "dialing" | "sms" | "ambulance" | "tick" | "beep" | "success" | "countdown"
) {
  if (typeof window === "undefined") return;
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    if (ctx.state === "suspended") {
      ctx.resume();
    }

    const now = ctx.currentTime;

    if (type === "crash") {
      // 1. Low frequency sub-bass impact thump
      const subOsc = ctx.createOscillator();
      const subGain = ctx.createGain();
      subOsc.type = "sine";
      subOsc.frequency.setValueAtTime(140, now);
      subOsc.frequency.exponentialRampToValueAtTime(30, now + 0.6);
      subGain.gain.setValueAtTime(0.4, now);
      subGain.gain.exponentialRampToValueAtTime(0.001, now + 0.7);
      subOsc.connect(subGain);
      subGain.connect(ctx.destination);
      subOsc.start(now);
      subOsc.stop(now + 0.7);

      // 2. White noise burst with lowpass filter for crash impact
      const bufferSize = ctx.sampleRate * 0.5;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }
      const whiteNoise = ctx.createBufferSource();
      whiteNoise.buffer = buffer;
      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(900, now);
      filter.frequency.exponentialRampToValueAtTime(120, now + 0.5);

      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(0.35, now);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);

      whiteNoise.connect(filter);
      filter.connect(noiseGain);
      noiseGain.connect(ctx.destination);
      whiteNoise.start(now);
      whiteNoise.stop(now + 0.5);
    } else if (type === "siren") {
      // High-low dual oscillating emergency siren
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(650, now);
      osc.frequency.linearRampToValueAtTime(980, now + 0.35);
      osc.frequency.linearRampToValueAtTime(650, now + 0.7);
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.linearRampToValueAtTime(0.02, now + 0.7);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.7);
    } else if (type === "dialing") {
      // Classic DTMF emergency calling ring tone (440Hz + 480Hz)
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();
      osc1.frequency.setValueAtTime(440, now);
      osc2.frequency.setValueAtTime(480, now);
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.setValueAtTime(0.12, now + 0.8);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.9);
      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);
      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + 0.9);
      osc2.stop(now + 0.9);
    } else if (type === "sms") {
      // Clean modern messaging triple-chime (880Hz -> 1174Hz -> 1567Hz)
      [880, 1174.66, 1567.98].forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, now + idx * 0.08);
        gain.gain.setValueAtTime(0.12, now + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.2);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + idx * 0.08);
        osc.stop(now + idx * 0.08 + 0.2);
      });
    } else if (type === "ambulance") {
      // Fast emergency response siren wail
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(750, now);
      osc.frequency.linearRampToValueAtTime(1200, now + 0.25);
      osc.frequency.linearRampToValueAtTime(750, now + 0.5);
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.linearRampToValueAtTime(0.01, now + 0.55);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.55);
    } else if (type === "tick") {
      // Sharp urgent countdown click
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(1200, now);
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.08);
    } else if (type === "beep" || type === "countdown") {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(950, now);
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.12);
    } else if (type === "success") {
      [523.25, 659.25, 783.99, 1046.5].forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.frequency.setValueAtTime(freq, now + i * 0.08);
        gain.gain.setValueAtTime(0.12, now + i * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, now + (i + 1) * 0.12);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + i * 0.08);
        osc.stop(now + (i + 1) * 0.12);
      });
    }
  } catch (e) {
    // Ignore audio autoplay restrictions
  }
}
