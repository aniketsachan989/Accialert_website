import type { Metadata } from "next";
import Link from "next/link";
import { Scale, ArrowLeft, Mail, AlertTriangle, Cpu } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms of Service & Intellectual Property Agreement | AcciAlert",
  description:
    "Comprehensive Terms of Service, Intellectual Property Protection, Non-Medical Auxiliary Safety Disclaimers, and User Agreement for the AcciAlert Mobile Application and Web Ecosystem.",
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
            <span className="font-mono text-[11px] tracking-wider uppercase">LEGAL CONTRACT &amp; IP PROTECTION</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            AcciAlert Terms of Service &amp; Legal Agreement
          </h1>
          <p className="text-sm text-slate-400 mt-2 font-mono">
            Effective Date: September 6, 2026 &bull; Version 6.2 Legal Specification
          </p>
        </div>

        {/* Highlight Alert Box */}
        <div className="p-5 rounded-2xl bg-amber-950/30 border border-amber-800/60 flex flex-col sm:flex-row items-start gap-4 shadow-xl">
          <AlertTriangle className="w-6 h-6 text-amber-400 shrink-0 mt-0.5" />
          <div className="space-y-1.5 text-xs sm:text-sm text-amber-200/90 leading-relaxed">
            <div className="font-bold text-white uppercase tracking-wider font-mono text-xs">
              CRITICAL NOTICE: AUXILIARY TOOL &bull; NOT A REPLACEMENT FOR 112 / 108 / 911
            </div>
            <p>
              AcciAlert is an electronic auxiliary notification aid. It is <strong className="text-white">NOT</strong> a certified medical device, government public safety answering point (PSAP), or official emergency dispatch authority. In any life-threatening situation where you or a bystander are conscious, always dial national emergency numbers (<strong className="text-white">112 / 108</strong> in India, or your local emergency dispatch) directly.
            </p>
          </div>
        </div>

        {/* Main Terms Document */}
        <div className="bg-[#111827] border border-slate-800 rounded-3xl p-6 sm:p-10 lg:p-12 shadow-2xl space-y-10 text-slate-300 text-sm sm:text-base leading-relaxed">
          <p className="font-medium text-white text-base">
            Please read these Terms of Service (&quot;Terms&quot;, &quot;Agreement&quot;) carefully before utilizing the AcciAlert mobile application (the &quot;App&quot;), the AcciAlert web portal at accialert-website.vercel.app (the &quot;Website&quot;), or any affiliated telemetry, blackbox, and blood bank coordination services (collectively, the &quot;Platform&quot;), operated by <strong className="text-white">Aniket DevStudio</strong> (&quot;AcciAlert&quot;, &quot;Company&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;).
          </p>
          <p className="text-xs text-slate-400 leading-relaxed">
            By downloading, installing, launching, accessing, or registering with the Platform, you acknowledge that you have read, understood, and agreed to be legally bound by these Terms and our Privacy Policy. If you do not agree to these terms in their entirety, you must immediately cease all usage and uninstall the application.
          </p>

          {/* Section 1: Proprietary Rights & Intellectual Property Protection */}
          <section className="space-y-4 pt-6 border-t border-slate-800">
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
              <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-cyan-950 border border-cyan-700 text-cyan-400 text-xs font-mono font-bold">1</span>
              Intellectual Property &amp; Trade Secret Protection
            </h2>
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3 text-xs sm:text-sm">
              <div className="flex items-center gap-2 text-cyan-300 font-bold">
                <Cpu className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>EXCLUSIVE PROPRIETARY OWNERSHIP</span>
              </div>
              <p>
                The Platform, including but not limited to its underlying software architecture, multi-stage edge sensor filtering frameworks, orientation-independent physics heuristics, on-device machine learning inference pipelines, floating emergency medical overlay system, cryptographic Digital Blackbox telemetry schema, regional blood bank mobilization protocol, source code, binary assets, graphical interfaces, documentation, trade names, and trademarks, are the exclusive intellectual property and proprietary trade secrets of <strong className="text-white">Aniket DevStudio</strong> and are protected under Indian and International Copyright, Trademark, Patent, and Trade Secret laws.
              </p>
              <div className="font-semibold text-white pt-1">Strict Prohibitions on Reverse Engineering &amp; Misappropriation:</div>
              <ul className="list-disc list-inside space-y-1.5 pl-2 text-slate-300">
                <li>You shall not decompile, reverse-engineer, disassemble, decode, or attempt to derive or extract the source code, internal mathematical algorithms, state-machine thresholds, or neural network model weights (`.tflite`) from the Platform.</li>
                <li>You shall not copy, clone, reproduce, license, sell, distribute, or commercially exploit the system workflow, digital blackbox schema, or emergency broadcast architecture.</li>
                <li>You shall not build, develop, or assist any third party in building a competing emergency crash detection application, product, or service that incorporates, mimics, or misappropriates AcciAlert&apos;s proprietary methodologies, multi-tier sensor gates, or emergency response workflows.</li>
                <li>You shall not scrape, crawl, reverse-engineer, or harvest data from our telemetry endpoints, blood bank repositories, or public dispatch feeds.</li>
              </ul>
              <p className="text-slate-400 text-[11px] italic">
                Any unauthorized extraction, commercial duplication, or infringement of these proprietary assets will be prosecuted to the maximum extent permitted by civil and criminal law, including injunctive relief and statutory damages.
              </p>
            </div>
          </section>

          {/* Section 2: Auxiliary Safety Aid & No Guarantee Disclaimer */}
          <section className="space-y-4 pt-6 border-t border-slate-800">
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
              <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-cyan-950 border border-cyan-700 text-cyan-400 text-xs font-mono font-bold">2</span>
              Auxiliary Nature &amp; No Guarantee of 100% Detection
            </h2>
            <p>
              AcciAlert is designed as a secondary safety convenience and assistive alert aid. Due to the wide diversity of smartphone hardware, accelerometer polling frequencies, environmental variables, and physical collision mechanics:
            </p>
            <ul className="list-disc list-inside space-y-2 text-slate-300 pl-2 text-xs sm:text-sm">
              <li>
                <strong className="text-white">No Infallibility Guarantee:</strong> We do <strong className="text-white">NOT</strong> guarantee, warrant, or represent that the Platform will detect every accident, vehicular collision, motorcycle fall, or pedestrian trauma, nor do we guarantee that the Platform will operate completely free of false alerts or sensor noise.
              </li>
              <li>
                <strong className="text-white">Physical &amp; Operating System Constraints:</strong> Detection efficacy is subject to variables outside our control, including but not limited to device placement (cradle, bag, pocket, glove box), vehicle chassis dampening, operating system power-saving policies (Android Doze Mode, OEM background task termination by Xiaomi, Samsung, Oppo, Vivo, etc.), hardware sensor damage, battery depletion, or extreme impact violence resulting in instant device destruction.
              </li>
              <li>
                <strong className="text-white">User Assumption of Risk:</strong> You expressly acknowledge and agree that your participation in vehicular transit, motorcycling, cycling, or outdoor activity carries inherent physical risk. You assume full personal responsibility for your safety and shall never rely on AcciAlert as a substitute for seatbelts, helmets, safe driving, or certified automotive safety hardware.
              </li>
            </ul>
          </section>

          {/* Section 3: Automated Communications & Telecommunications Disclaimer */}
          <section className="space-y-4 pt-6 border-t border-slate-800">
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
              <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-cyan-950 border border-cyan-700 text-cyan-400 text-xs font-mono font-bold">3</span>
              Automated Emergency SMS &amp; Synthetic Voice Bot Communications
            </h2>
            <p>
              Upon confirmation of a high-impact crash candidate following the completion of the mandatory visual and acoustic countdown window without user cancellation:
            </p>
            <div className="space-y-3 text-xs sm:text-sm">
              <p>
                <strong>Prior Express Consent:</strong> You hereby grant your prior express written consent for AcciAlert to automatically execute telecommunications actions on your behalf, including sending cellular SMS messages containing your live GPS location and medical profile to your designated emergency contacts, and initiating automated telephony calls via on-device synthesizers or cloud telephony bridges.
              </p>
              <p>
                <strong>Carrier &amp; Network Disclaimers:</strong> Delivery of automated emergency SMS and phone calls is entirely dependent on third-party cellular carriers (Airtel, Jio, Vi, BSNL, Verizon, AT&amp;T, etc.), satellite GPS reception, SIM card active validity, and telecom signal coverage. AcciAlert is not liable for delayed, queued, blocked, or dropped transmissions resulting from network congestion, carrier spam filters, roaming restrictions, or network dead zones.
              </p>
              <p>
                <strong>False Trigger Cancellation Duty:</strong> In the event of an unintended drop or minor event that initiates the countdown, you have a 15-second verification window to tap &quot;CANCEL&quot;. It is your sole responsibility to cancel false triggers. AcciAlert is not liable for emotional distress, emergency contact panic, or third-party responder mobilization caused by uncancelled false alarms.
              </p>
            </div>
          </section>

          {/* Section 4: Sensitive Medical Data & Emergency Telemetry */}
          <section className="space-y-4 pt-6 border-t border-slate-800">
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
              <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-cyan-950 border border-cyan-700 text-cyan-400 text-xs font-mono font-bold">4</span>
              Sensitive Health Data &amp; Emergency Telemetry Broadcast
            </h2>
            <p>
              AcciAlert operates on a local-first privacy model. Your profile data (Name, Blood Group, Medical Conditions, Allergies, Emergency Contacts) is stored locally on your device in secure encrypted storage.
            </p>
            <ul className="list-disc list-inside space-y-2 text-slate-300 pl-2 text-xs sm:text-sm">
              <li>
                <strong>Emergency Incident Disclosure:</strong> You expressly authorize AcciAlert, upon a verified crash event, to transmit a secure, cryptographically hashed Digital Blackbox Incident Record to our cloud portal, making your live GPS coordinates and emergency medical summary accessible to your designated contacts and verified regional trauma responders via unique link token.
              </li>
              <li>
                <strong>Blackbox Telemetry Disclaimer:</strong> Data recorded in the Digital Blackbox Portal (estimated deceleration magnitude, speed delta, approximate rollover orientation) represents mathematical sensor estimates for triage situational awareness. It is <strong className="text-white">NOT</strong> a certified forensic accident reconstruction report, and AcciAlert disclaims any legal, vehicular, or insurance liability regarding the evidentiary weight of these telemetry records.
              </li>
            </ul>
          </section>

          {/* Section 5: Blood Bank & Medical Directory Services */}
          <section className="space-y-4 pt-6 border-t border-slate-800">
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
              <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-cyan-950 border border-cyan-700 text-cyan-400 text-xs font-mono font-bold">5</span>
              Blood Bank Network &amp; Medical Coordination Disclaimer
            </h2>
            <p className="text-xs sm:text-sm">
              AcciAlert facilitates access to an institutional directory of licensed regional blood banks and emergency facilities. AcciAlert is <strong className="text-white">not a medical provider, diagnostic entity, hospital, or blood storage facility</strong>:
            </p>
            <ul className="list-disc list-inside space-y-1.5 pl-2 text-xs sm:text-sm text-slate-300">
              <li>We do not guarantee the real-time blood stock availability, cross-matching compatibility, operational hours, or response latency of any listed blood bank or healthcare facility.</li>
              <li>Blood banks registering on our platform represent and warrant that they possess valid state healthcare operational licenses and comply with national blood transfusion safety standards (such as Drugs and Cosmetics Act regulations in India).</li>
              <li>AcciAlert shall not be held liable for any medical complications, transfusion delays, inventory discrepancies, or clinical outcomes arising from communications between users, contacts, and third-party healthcare centers.</li>
            </ul>
          </section>

          {/* Section 6: Comprehensive Limitation of Liability */}
          <section className="space-y-4 pt-6 border-t border-slate-800">
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
              <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-cyan-950 border border-cyan-700 text-cyan-400 text-xs font-mono font-bold">6</span>
              Limitation of Liability &amp; Waiver of Claims
            </h2>
            <div className="p-4 rounded-2xl bg-red-950/20 border border-red-900/40 text-xs sm:text-sm text-slate-300 space-y-2">
              <p className="font-semibold text-red-200">TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE JURISDICTIONAL LAW:</p>
              <p>
                IN NO EVENT SHALL <strong className="text-white">ANIKET DEVSTUDIO</strong>, ACCIALERT, ITS FOUNDERS, DEVELOPERS, DIRECTORS, EMPLOYEES, AFFILIATES, OR LICENSORS BE LIABLE FOR ANY DIRECT, INDIRECT, PUNITIVE, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR EXEMPLARY DAMAGES, INCLUDING BUT NOT LIMITED TO:
              </p>
              <ul className="list-disc list-inside space-y-1 pl-2 text-slate-300">
                <li>BODILY INJURY, WRONGFUL DEATH, PHYSICAL SUFFERING, OR DELAYED MEDICAL RESCUE;</li>
                <li>FAILURE OF THE PLATFORM TO DETECT AN ACCIDENT OR IMPACT;</li>
                <li>EMERGENCY CONTACT FAILURE, FALSE ALARM DISPATCHES, OR DISPATCH DELAYS;</li>
                <li>HARDWARE CORRUPTION, BATTERY DRAIN, SENSOR INACCURACIES, OR TELECOM OUTAGES;</li>
                <li>ACTIONS, OMISSIONS, OR TREATMENT BY THIRD-PARTY FIRST RESPONDERS, HOSPITALS, OR BLOOD BANKS.</li>
              </ul>
              <p>
                THIS LIMITATION APPLIES REGARDLESS OF WHETHER THE ALLEGED LIABILITY IS BASED ON CONTRACT, TORT, NEGLIGENCE, STRICT LIABILITY, OR ANY OTHER LEGAL THEORY, EVEN IF ACCIALERT HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
              </p>
            </div>
          </section>

          {/* Section 7: User Indemnification */}
          <section className="space-y-4 pt-6 border-t border-slate-800">
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
              <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-cyan-950 border border-cyan-700 text-cyan-400 text-xs font-mono font-bold">7</span>
              Indemnification
            </h2>
            <p className="text-xs sm:text-sm">
              You agree to defend, indemnify, and hold harmless Aniket DevStudio, AcciAlert, and its officers, directors, and developers from and against any claims, liabilities, damages, losses, costs, or expenses (including reasonable legal fees) arising out of or in any way connected with: (i) your access to or use of the Platform; (ii) your violation of these Terms; (iii) any false emergency alert triggered and uncancelled by your device; or (iv) your violation of any third-party right, including any intellectual property, privacy, or telecommunications regulation.
            </p>
          </section>

          {/* Section 8: Governing Law & Dispute Resolution */}
          <section className="space-y-4 pt-6 border-t border-slate-800">
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
              <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-cyan-950 border border-cyan-700 text-cyan-400 text-xs font-mono font-bold">8</span>
              Governing Law &amp; Jurisdiction
            </h2>
            <p className="text-xs sm:text-sm">
              These Terms shall be governed by, interpreted, and construed in accordance with the substantive laws of the <strong className="text-white">Republic of India</strong>, without giving effect to any principles of conflict of law. Any legal proceeding, dispute, or claim arising out of or relating to these Terms or the Platform shall be subject to the exclusive jurisdiction of the competent courts situated in <strong className="text-white">Uttar Pradesh, India</strong>.
            </p>
          </section>

          {/* Section 9: Severability & Entire Agreement */}
          <section className="space-y-4 pt-6 border-t border-slate-800">
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
              <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-cyan-950 border border-cyan-700 text-cyan-400 text-xs font-mono font-bold">9</span>
              Severability &amp; Amendments
            </h2>
            <p className="text-xs sm:text-sm">
              If any provision of these Terms is deemed unlawful, void, or for any reason unenforceable by a court of competent jurisdiction, then that provision shall be deemed severable and shall not affect the validity and enforceability of any remaining provisions. We reserve the right to modify these Terms at any time; your continued use of the Platform following posted revisions constitutes acceptance of the updated terms.
            </p>
          </section>

          {/* Section 10: Legal & Support Contact */}
          <section className="space-y-4 pt-6 border-t border-slate-800">
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
              <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-cyan-950 border border-cyan-700 text-cyan-400 text-xs font-mono font-bold">10</span>
              Legal &amp; Intellectual Property Inquiries
            </h2>
            <p className="text-xs sm:text-sm">
              For any formal notices, intellectual property correspondence, licensing inquiries, or legal clarifications regarding these Terms, please contact our administrative legal desk:
            </p>
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-cyan-400 shrink-0" />
                <div>
                  <div className="text-xs text-slate-400 font-mono uppercase">Official Legal &amp; Compliance Channel</div>
                  <a
                    href="mailto:accialert.help@gmail.com"
                    className="text-white font-mono font-bold hover:text-cyan-400 transition-colors"
                  >
                    accialert.help@gmail.com
                  </a>
                </div>
              </div>
              <div className="text-xs text-slate-500 font-mono sm:text-right">
                Aniket DevStudio &bull; India
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
