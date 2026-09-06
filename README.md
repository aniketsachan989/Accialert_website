# AcciAlert Web Platform & Emergency Medical Grid (v6.0)

AcciAlert is an autonomous road safety and post-crash trauma mitigation platform. The web platform provides real-time emergency telemetry for verified blood banks, trauma response centers, and emergency investigators.

---

## Key Capabilities

### 1. Hema-Link Blood Bank Live Radar (`/blood-banks/dashboard`)
- **Silent Priority Dispatch**: Audible sirens and buzzers are suppressed to maintain calm in clinical triage rooms.
- **Direct SMTP Email Alerts**: High-impact collisions within a 15 km GPS radius automatically dispatch formatted medical notifications directly to the registered blood bank's inbox.
- **Two-Way Mobilization**: Hospital staff can acknowledge and mobilize blood units, persisting status updates back to Firestore in real time.
- **Turn-by-Turn GPS Navigation**: Integrated driving direction links for emergency blood courier drivers and paramedic ambulances.

### 2. Digital Blackbox Report Portal (`/blackbox-portal`)
- Institutional portal for Traffic Police, Insurance Assessors, and Trauma Surgeons.
- Unguessable cryptographically indexed Report IDs (e.g. `REP-2026-XXXX`).
- Full sensor telemetry: impact G-force, pre-crash speed, rollover status, and weather conditions.
- Strict audit logging via `/accessLogs` collection.

---

## Environment Configuration

To enable physical email delivery over Gmail SMTP, configure the following variables in your Vercel Project Settings or local `.env.local`:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-16-character-app-password
EMAIL_FROM="AcciAlert Hema-Link Emergency" <your-email@gmail.com>
```

---

## Tech Stack
- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS + Lucide Icons
- **Database & Auth**: Firebase Firestore & Firebase Authentication
- **Mailing Engine**: Nodemailer (Serverless SMTP API)
- **Deployment**: Vercel Serverless Platform
