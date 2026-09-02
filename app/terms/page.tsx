import type { Metadata } from "next";
import Link from "next/link";
import { Scale, ArrowLeft, Mail, AlertTriangle } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms of Service | AcciAlert Emergency Response",
  description: "Terms of Service and User Agreement for AcciAlert Android App and Platform by Aniket DevStudio.",
};

export default function TermsPage() {
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
            <Scale className="w-3.5 h-3.5 text-cyan-400" />
            <span className="font-mono text-[11px] tracking-wider uppercase">USER AGREEMENT &amp; TERMS</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            AcciAlert Terms of Service
          </h1>
          <p className="text-sm text-slate-400 mt-2 font-mono">
            Last updated: September 2, 2026
          </p>
        </div>

        {/* Terms Body in Dark Card */}
        <div className="bg-[#111827] border border-slate-800 rounded-3xl p-6 sm:p-10 lg:p-12 shadow-2xl space-y-8 text-slate-300 text-sm sm:text-base leading-relaxed">
          <p className="font-medium text-white">
            By using AcciAlert (the Android mobile application and the accialert-website.vercel.app website),
            you agree to the following terms and conditions:
          </p>

          {/* Section 1: Nature of the Service */}
          <section className="space-y-3 pt-2 border-t border-slate-800/80">
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
              <span className="text-red-500">1.</span> Nature of the Service
            </h2>
            <div className="p-4 rounded-2xl bg-red-950/30 border border-red-900/50 space-y-2">
              <div className="flex items-center gap-2 text-red-300 font-bold text-sm">
                <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
                <span>NOT A REPLACEMENT FOR EMERGENCY SERVICES</span>
              </div>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                AcciAlert is a safety aid designed to detect potential accidents and notify your emergency contacts and,
                where applicable, nearby blood banks. It is <strong className="text-white">NOT a replacement for official emergency services</strong>.
                Always call <strong className="text-white font-mono">112 (National Emergency)</strong> or{" "}
                <strong className="text-white font-mono">108 (Ambulance)</strong> directly in a genuine emergency if you are able to.
              </p>
            </div>
          </section>

          {/* Section 2: No Guarantee of Detection */}
          <section className="space-y-3 pt-4 border-t border-slate-800/80">
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
              <span className="text-red-500">2.</span> No Guarantee of Detection
            </h2>
            <p>
              Accident detection relies on phone sensors, hardware polling rates, and on-device AI algorithms. It cannot
              guarantee detection of every incident, nor can it guarantee the absence of false alerts. Do not rely on
              AcciAlert as your sole safety or rescue measure.
            </p>
          </section>

          {/* Section 3: User Responsibilities */}
          <section className="space-y-3 pt-4 border-t border-slate-800/80">
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
              <span className="text-red-500">3.</span> User Responsibilities
            </h2>
            <ul className="list-disc list-inside space-y-2 text-slate-300 pl-2">
              <li>Keep your emergency contact information accurate, validated, and up to date.</li>
              <li>
                Ensure the app has the operating system permissions it needs (Location, SMS, Display over other apps,
                Battery optimization exemption) to function correctly in the background.
              </li>
              <li>
                Use Digital Blackbox report data responsibly — it is a record of sensor-derived data and telemetry,
                not a certified forensic legal or medical diagnosis document.
              </li>
            </ul>
          </section>

          {/* Section 4: Blood Bank & Institutional Accounts */}
          <section className="space-y-3 pt-4 border-t border-slate-800/80">
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
              <span className="text-red-500">4.</span> Blood Bank &amp; Institutional Accounts
            </h2>
            <ul className="list-disc list-inside space-y-2 text-slate-300 pl-2">
              <li>
                Registration requires accurate facility/organization details and valid state healthcare license numbers,
                and is subject to administrative verification before live dispatch feed activation.
              </li>
              <li>
                Misuse of live alert data, unauthorized viewing, or fraudulent report access will result in immediate
                account termination and may be reported to appropriate regulatory authorities.
              </li>
            </ul>
          </section>

          {/* Section 5: Limitation of Liability */}
          <section className="space-y-3 pt-4 border-t border-slate-800/80">
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
              <span className="text-red-500">5.</span> Limitation of Liability
            </h2>
            <p>
              AcciAlert, its developers, and <strong className="text-slate-100">Aniket DevStudio</strong> are not liable for
              any injury, harm, loss of life, property damage, or financial losses resulting from delayed, missed, or false
              crash detections, cellular network/SMS carrier delivery failures, battery depletion, or third-party (blood bank,
              hospital, or emergency responder) response times.
            </p>
          </section>

          {/* Section 6: Changes to Terms */}
          <section className="space-y-3 pt-4 border-t border-slate-800/80">
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
              <span className="text-red-500">6.</span> Changes
            </h2>
            <p>
              We may update these terms periodically. Continued use of the mobile application or website after any changes
              constitutes your acceptance of the revised Terms of Service.
            </p>
          </section>

          {/* Section 7: Contact */}
          <section className="space-y-3 pt-4 border-t border-slate-800/80">
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
              <span className="text-red-500">7.</span> Contact
            </h2>
            <p>For legal inquiries or questions regarding these terms:</p>
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center gap-3">
              <Mail className="w-5 h-5 text-cyan-400 shrink-0" />
              <div>
                <div className="text-xs text-slate-400 font-mono uppercase">Legal &amp; Support Inquiries</div>
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
