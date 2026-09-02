import type { Metadata, Viewport } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0B0F19",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://accialert-website.vercel.app"),
  title: {
    default: "AcciAlert | AI Zero-Delay Crash Detection & Emergency Response Network",
    template: "%s | AcciAlert",
  },
  description:
    "AI-powered on-device edge crash detection, unblockable 20s lock screen medical ID overlay, real-time cloud telemetry, automated emergency SMS broadcast, and 15km geohashed blood bank mobilization.",
  keywords: [
    "Crash Detection",
    "Emergency Response",
    "Accident Alert",
    "Blood Bank Network",
    "Medical ID",
    "Digital Blackbox",
    "TensorFlow Lite Safety",
    "First Responder Dispatch",
    "Accident Detection App India",
    "Emergency Medical ID Android",
    "Golden Hour Trauma App",
  ],
  authors: [{ name: "Aniket DevStudio" }],
  creator: "Aniket DevStudio",
  publisher: "Aniket DevStudio",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://accialert-website.vercel.app",
    siteName: "AcciAlert Safety Systems",
    title: "AcciAlert | AI Zero-Delay Crash Detection & Emergency Response Network",
    description:
      "AI-powered on-device edge crash detection, unblockable 20s lock screen medical ID overlay, real-time cloud telemetry, and 15km geohashed blood bank mobilization.",
  },
  twitter: {
    card: "summary_large_image",
    title: "AcciAlert | AI Zero-Delay Crash Detection & Emergency Response Network",
    description:
      "AI-powered on-device edge crash detection, unblockable 20s lock screen medical ID overlay, and 15km geohashed blood bank mobilization.",
    creator: "@aniketsachan989",
  },
  manifest: "/manifest.json",
  verification: {
    google: "google7a78c84f7086c22f.html",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth overflow-x-hidden w-full max-w-full">
      <head>
        <JsonLd />
      </head>
      <body className="min-h-screen w-full max-w-full bg-[#0B0F19] text-slate-100 antialiased selection:bg-red-500 selection:text-white flex flex-col justify-between overflow-x-hidden relative">
        <Navbar />
        <main className="flex-grow pt-20 w-full max-w-full overflow-x-hidden">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
