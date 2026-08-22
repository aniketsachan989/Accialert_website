import type { Metadata, Viewport } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0B0F19",
};

export const metadata: Metadata = {
  title: "AcciAlert | AI Zero-Delay Crash Detection & Emergency Response Network",
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
  ],
  authors: [{ name: "AcciAlert Safety Systems" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth overflow-x-hidden w-full max-w-full">
      <body className="min-h-screen w-full max-w-full bg-[#0B0F19] text-slate-100 antialiased selection:bg-red-500 selection:text-white flex flex-col justify-between overflow-x-hidden relative">
        <Navbar />
        <main className="flex-grow pt-20 w-full max-w-full overflow-x-hidden">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
