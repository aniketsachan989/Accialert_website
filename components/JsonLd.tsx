import { PLAY_STORE_URL } from "@/lib/utils";

export default function JsonLd() {
  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "@id": "https://accialert-website.vercel.app/#application",
        name: "AcciAlert - AI Crash Detection & Emergency SOS",
        operatingSystem: "Android 8.0 and up",
        applicationCategory: "HealthApplication, SafetyApplication",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "INR",
        },
        downloadUrl: PLAY_STORE_URL,
        featureList: [
          "50Hz On-Device Sensor Fusion Crash Detection",
          "Unblockable 20-Second Lock Screen Medical ID Overlay",
          "Automated Emergency SMS & Call Broadcast with Live GPS Location",
          "15km Geohashed Regional Blood Bank & Trauma Center Mobilization",
          "Digital Blackbox Incident Forensic Logging (G-Force, Speed, Rollover)",
        ],
        author: {
          "@type": "Organization",
          name: "Aniket DevStudio",
          url: "https://accialert-website.vercel.app",
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.9",
          ratingCount: "250",
          bestRating: "5",
          worstRating: "1",
        },
      },
      {
        "@type": "WebSite",
        "@id": "https://accialert-website.vercel.app/#website",
        url: "https://accialert-website.vercel.app",
        name: "AcciAlert Safety Systems",
        description:
          "Official website of AcciAlert: Zero-Delay AI Emergency Crash Detection, Medical ID Lock Screen Overlay, and Regional Blood Bank Response Network.",
        publisher: {
          "@type": "Organization",
          name: "Aniket DevStudio",
          url: "https://accialert-website.vercel.app",
        },
      },
      {
        "@type": "FAQPage",
        "@id": "https://accialert-website.vercel.app/#faq",
        mainEntity: [
          {
            "@type": "Question",
            name: "How does AcciAlert detect vehicle accidents and falls in real-time?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "AcciAlert processes device accelerometer, gyroscope, and GPS sensors continuously at 50Hz using an on-device TensorFlow Lite machine learning model. It identifies acute deceleration, rotational shocks, and rollover indicators within milliseconds without needing any cloud roundtrip.",
            },
          },
          {
            "@type": "Question",
            name: "Does AcciAlert emergency SOS work without an active internet connection?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. In the absence of mobile data or WiFi, AcciAlert routes emergency SOS alerts directly through the phone's physical SIM card and telecom towers, delivering cellular SMS messages containing your live GPS coordinates directly to your emergency contacts.",
            },
          },
          {
            "@type": "Question",
            name: "How does the unblockable 20-second Medical ID lock screen overlay work?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "When an accident is detected, AcciAlert punches through Android's lock screen (PIN, Pattern, or Biometric lock) using system window overlays, sounding a maximum-volume alarm and showing the victim's Blood Group, Allergies, Chronic Conditions, and Mother/Family Emergency numbers for immediate bystander assistance.",
            },
          },
          {
            "@type": "Question",
            name: "How do blood banks and hospitals receive alerts within a 15km radius?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "When a crash is confirmed, AcciAlert's secure cloud infrastructure calculates a 15km geohash radius around the incident and sends immediate telemetry notifications to verified, licensed regional blood banks so matching blood units can be mobilized before the ambulance arrives.",
            },
          },
          {
            "@type": "Question",
            name: "What is the Digital Blackbox report and who can access it?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "The Digital Blackbox generates a tamper-evident crash telemetry certificate containing pre-impact speed profiles, peak G-forces, rollover states, and weather conditions. Access requires an unguessable Report ID and is strictly restricted to verified traffic police, insurance assessors, and trauma doctors.",
            },
          },
          {
            "@type": "Question",
            name: "Is my GPS location continuously tracked in the background?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No. AcciAlert adheres strictly to India's DPDP Act 2023. User data is stored locally in an AES-256 encrypted on-device database, and GPS telemetry is transmitted to cloud networks only upon an authentic crash event.",
            },
          },
        ],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  );
}
