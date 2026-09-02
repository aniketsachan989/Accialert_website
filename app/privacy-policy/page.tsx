import type { Metadata } from "next";
import Link from "next/link";
import { Lock, ArrowLeft, Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy | AcciAlert Emergency Response",
  description: "Privacy policy for AcciAlert Android App and AcciAlert Emergency Response Platform by Aniket DevStudio.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-[#0B0F19] text-slate-100 py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Back Link & Header */}
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-white transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-700 text-xs font-semibold text-slate-300 mb-4">
            <Lock className="w-3.5 h-3.5 text-emerald-400" />
            <span className="font-mono text-[11px] tracking-wider uppercase">LEGAL &amp; PRIVACY</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            AcciAlert Privacy Policy
          </h1>
          <p className="text-sm text-slate-400 mt-2 font-mono">
            Last updated: September 2, 2026
          </p>
        </div>

        {/* Policy Body in Dark Card */}
        <div className="bg-[#111827] border border-slate-800 rounded-3xl p-6 sm:p-10 lg:p-12 shadow-2xl space-y-8 text-slate-300 text-sm sm:text-base leading-relaxed">
          <p>
            AcciAlert (&ldquo;we&rdquo;, &ldquo;our&rdquo;, &ldquo;the App&rdquo;) is developed by{" "}
            <strong className="text-white">Aniket DevStudio</strong>. This policy explains what data we collect through
            the AcciAlert Android app and the{" "}
            <span className="text-cyan-400 font-mono text-xs sm:text-sm">accialert-website.vercel.app</span> website,
            why we collect it, and how it is protected.
          </p>

          {/* Section 1: Data We Collect */}
          <section className="space-y-3 pt-2 border-t border-slate-800/80">
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
              <span className="text-red-500">1.</span> Data We Collect
            </h2>
            <ul className="list-disc list-inside space-y-2 text-slate-300 pl-2">
              <li>
                <strong className="text-slate-100">Profile:</strong> name, phone number, blood group
              </li>
              <li>
                <strong className="text-slate-100">Medical info (optional):</strong> allergies, existing conditions
              </li>
              <li>
                <strong className="text-slate-100">Emergency contacts:</strong> names and phone numbers of people you designate
              </li>
              <li>
                <strong className="text-slate-100">Location:</strong> GPS coordinates, collected{" "}
                <em className="text-amber-400 not-italic font-semibold">only when a potential crash is detected</em> — not continuous background tracking
              </li>
              <li>
                <strong className="text-slate-100">Sensor data:</strong> accelerometer and gyroscope readings, used on-device for crash detection
              </li>
              <li>
                <strong className="text-slate-100">Crash/incident data (Digital Blackbox):</strong> pre-impact speed, G-force, rollover status, weather at the incident location, timestamp
              </li>
              <li>
                <strong className="text-slate-100">Blood bank accounts:</strong> facility name, license number, contact details, GPS coordinates
              </li>
              <li>
                <strong className="text-slate-100">Institutional accounts (police/insurance):</strong> organization name, registration/license number, verified email
              </li>
            </ul>
          </section>

          {/* Section 2: How We Use It */}
          <section className="space-y-3 pt-4 border-t border-slate-800/80">
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
              <span className="text-red-500">2.</span> How We Use It
            </h2>
            <ul className="list-disc list-inside space-y-2 text-slate-300 pl-2">
              <li>To detect accidents and trigger SOS calls/SMS to your emergency contacts</li>
              <li>To generate Digital Blackbox crash reports for your own records, and for sharing at your choice with police or insurance</li>
              <li>To notify nearby verified blood banks of a potential blood requirement after a confirmed accident</li>
              <li>To operate blood bank and institutional accounts on the platform</li>
            </ul>
          </section>

          {/* Section 3: Who We Share Data With */}
          <section className="space-y-3 pt-4 border-t border-slate-800/80">
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
              <span className="text-red-500">3.</span> Who We Share Data With
            </h2>
            <ul className="list-disc list-inside space-y-2 text-slate-300 pl-2">
              <li>
                <strong className="text-slate-100">Your designated emergency contacts:</strong> automated call/SMS with your live location during emergency triggers.
              </li>
              <li>
                <strong className="text-slate-100">Nearby verified, admin-approved blood banks:</strong> blood group and incident location only, sent automatically after a confirmed accident within a 15 km radius.
              </li>
              <li>
                <strong className="text-slate-100">Police/insurance institutions:</strong> only if you or your emergency contact chooses to share your unique Report ID with them, and only after their account has been independently verified.
              </li>
              <li>
                <strong className="text-emerald-400">Zero Commercial Sale:</strong> We do not sell your data to third parties, and we do not use your data for advertising.
              </li>
            </ul>
          </section>

          {/* Section 4: Where Data Is Stored */}
          <section className="space-y-3 pt-4 border-t border-slate-800/80">
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
              <span className="text-red-500">4.</span> Where Data Is Stored
            </h2>
            <ul className="list-disc list-inside space-y-2 text-slate-300 pl-2">
              <li>
                <strong className="text-slate-100">Local Encrypted Storage:</strong> Core safety data (medical profile, emergency contacts) is stored locally on your device in an encrypted database, using Android&apos;s Hardware-Backed KeyStore (AES-256).
              </li>
              <li>
                <strong className="text-slate-100">Cloud Infrastructure:</strong> Crash reports, blood bank data, and institutional access logs are stored on Firebase/Firestore, protected by Firestore Security Rules that restrict access strictly to authenticated, authorized accounts.
              </li>
            </ul>
          </section>

          {/* Section 5: Your Rights */}
          <section className="space-y-3 pt-4 border-t border-slate-800/80">
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
              <span className="text-red-500">5.</span> Your Rights
            </h2>
            <ul className="list-disc list-inside space-y-2 text-slate-300 pl-2">
              <li>You can request deletion of your account and associated data at any time by contacting us.</li>
              <li>You can review which emergency contacts and blood banks were notified for any past incident.</li>
              <li>You can leave optional fields (like medical profile details) blank; core SOS/detection continues to work offline regardless.</li>
            </ul>
          </section>

          {/* Section 6: Consent */}
          <section className="space-y-3 pt-4 border-t border-slate-800/80">
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
              <span className="text-red-500">6.</span> Consent
            </h2>
            <p>
              By creating an account, you consent to this policy. Sharing data with blood banks upon a confirmed accident,
              and generating a Digital Blackbox report, are core parts of the emergency-response feature and are explained
              during onboarding.
            </p>
          </section>

          {/* Section 7: Compliance */}
          <section className="space-y-3 pt-4 border-t border-slate-800/80">
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
              <span className="text-red-500">7.</span> Compliance
            </h2>
            <p>
              We aim to handle personal data in line with India&apos;s{" "}
              <strong className="text-slate-100">Digital Personal Data Protection Act, 2023 (DPDP Act)</strong>.
            </p>
          </section>

          {/* Section 8: Contact */}
          <section className="space-y-3 pt-4 border-t border-slate-800/80">
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
              <span className="text-red-500">8.</span> Contact &amp; Grievance
            </h2>
            <p>For privacy questions, data deletion requests, or grievances:</p>
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center gap-3">
              <Mail className="w-5 h-5 text-cyan-400 shrink-0" />
              <div>
                <div className="text-xs text-slate-400 font-mono uppercase">Privacy &amp; Data Support</div>
                <a
                  href="mailto:accialert.help@gmail.com"
                  className="text-white font-mono font-bold hover:text-cyan-400 transition-colors"
                >
                  accialert.help@gmail.com
                </a>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
