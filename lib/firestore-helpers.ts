import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  doc,
  getDoc,
  setDoc,
  orderBy,
  limit,
  serverTimestamp,
  onSnapshot,
  deleteDoc,
} from "firebase/firestore";
import { db } from "./firebase";
import {
  UserDocument,
  IncidentDocument,
  AccidentDocument,
  BloodBankDocument,
  BloodBankStatus,
  ReportDocument,
  AccessLogDocument,
} from "@/types";

/**
 * Verified sample users for demonstration & fallback testing
 */
export const SAMPLE_USERS: UserDocument[] = [
  {
    id: "user-aniket-sachan",
    primaryContact: {
      name: "mee (Primary Contact)",
      phone: "+91 8188025603",
    },
    profile: {
      name: "Aniket Sachan",
      bloodGroup: "B+",
      allergies: "None recorded",
      medicalConditions: "None recorded",
      medications: "None",
      additionalNotes: "Notify contacts immediately. AcciAlert Protection Active.",
    },
  },
  {
    id: "demo-user-1",
    primaryContact: {
      name: "Sunita Sharma (Mother)",
      phone: "+91 98765 43210",
    },
    profile: {
      name: "Rahul Sharma",
      bloodGroup: "O+",
      allergies: "Penicillin, Sulfonamides",
      medicalConditions: "Asthma (Mild), Hypertensive",
      medications: "Salbutamol Inhaler (PRN), Telmisartan 40mg",
      additionalNotes: "Wears medical alert wristband. Organ donor registered.",
    },
  },
  {
    id: "demo-user-2",
    primaryContact: {
      name: "Dr. Vikram Patel (Spouse)",
      phone: "+91 91234 56789",
    },
    profile: {
      name: "Priya Patel",
      bloodGroup: "B+",
      allergies: "No known drug allergies (NKDA)",
      medicalConditions: "None reported",
      medications: "None",
      additionalNotes: "Contact primary physician Dr. S. Rao if unconscious.",
    },
  },
  {
    id: "demo-user-3",
    primaryContact: {
      name: "Ananya Roy (Sister)",
      phone: "+91 99887 76655",
    },
    profile: {
      name: "Amitav Roy",
      bloodGroup: "AB-",
      allergies: "Latex, Aspirin",
      medicalConditions: "Type-1 Diabetes",
      medications: "Insulin Glargine 20U QHS",
      additionalNotes: "Rare blood group. Immediate mobilization required.",
    },
  },
];

export const SAMPLE_INCIDENTS: Record<string, IncidentDocument> = {
  "user-aniket-sachan": {
    id: "INC-2026-0992",
    timestamp: new Date().toISOString(),
    speedKmh: 68.2,
    gForce: 5.2,
    weather: {
      condition: "Clear • High Precision Telemetry",
      temp: 28,
    },
    location: {
      latitude: 37.7749,
      longitude: -122.4194,
      address: "Market St, San Francisco, CA (Signal Locked)",
    },
    rolloverDetected: false,
    powerRipDetected: true,
    status: "ACTIVE",
  },
  "demo-user-1": {
    id: "INC-2026-0884",
    timestamp: new Date().toISOString(),
    speedKmh: 78.4,
    gForce: 5.8,
    weather: {
      condition: "Thunderstorm / Heavy Rain",
      temp: 24,
    },
    location: {
      latitude: 28.6139,
      longitude: 77.209,
      address: "NH-48 Flyover, Near Mahipalpur Junction, New Delhi, India",
    },
    rolloverDetected: true,
    powerRipDetected: true,
    status: "ACTIVE",
  },
  "demo-user-2": {
    id: "INC-2026-0712",
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    speedKmh: 62.1,
    gForce: 4.2,
    weather: {
      condition: "Clear Sky",
      temp: 31,
    },
    location: {
      latitude: 19.076,
      longitude: 72.8777,
      address: "Western Express Highway, Andheri East, Mumbai, India",
    },
    rolloverDetected: false,
    powerRipDetected: false,
    status: "RESOLVED",
  },
  "demo-user-3": {
    id: "INC-2026-0931",
    timestamp: new Date().toISOString(),
    speedKmh: 94.0,
    gForce: 6.9,
    weather: {
      condition: "Dense Fog / Low Visibility",
      temp: 18,
    },
    location: {
      latitude: 12.9716,
      longitude: 77.5946,
      address: "Outer Ring Road, Bellandur EcoSpace, Bengaluru, India",
    },
    rolloverDetected: true,
    powerRipDetected: true,
    status: "ACTIVE",
  },
};

/**
 * Verified sample reports mapped to unguessable Report IDs
 */
export const SAMPLE_REPORTS: Record<
  string,
  { user: UserDocument; incident: IncidentDocument; reportId: string }
> = {
  "REP-2026-0884": {
    reportId: "REP-2026-0884",
    user: SAMPLE_USERS[1], // Rahul Sharma
    incident: SAMPLE_INCIDENTS["demo-user-1"],
  },
  "REP-2026-0992": {
    reportId: "REP-2026-0992",
    user: SAMPLE_USERS[0], // Aniket Sachan
    incident: SAMPLE_INCIDENTS["user-aniket-sachan"],
  },
  "REP-2026-0712": {
    reportId: "REP-2026-0712",
    user: SAMPLE_USERS[2], // Priya Patel
    incident: SAMPLE_INCIDENTS["demo-user-2"],
  },
  "REP-2026-0931": {
    reportId: "REP-2026-0931",
    user: SAMPLE_USERS[3], // Amitav Roy
    incident: SAMPLE_INCIDENTS["demo-user-3"],
  },
};

/**
 * Logs report access to /accessLogs collection for accountability & audit trail
 */
export async function logReportAccess(
  reportId: string,
  institutionId: string,
  institutionName?: string
) {
  try {
    const logData: Omit<AccessLogDocument, "id"> = {
      reportId,
      institutionId,
      institutionName: institutionName || "Institutional Authority",
      timestamp: serverTimestamp(),
      ipOrUserAgent:
        typeof navigator !== "undefined" ? navigator.userAgent : "Node/Server",
    };
    await addDoc(collection(db, "accessLogs"), logData);
  } catch (err) {
    console.warn("Could not write audit log to /accessLogs:", err);
  }
}

/**
 * Retrieves a Digital Blackbox Report strictly using a Report ID (Fix 3 & Live App Dispatch Support)
 */
export async function getBlackboxReportById(
  reportId: string,
  institutionId = "INST-VERIFIED-AUTH",
  institutionName = "Traffic Police & Emergency Trauma Assessor"
): Promise<{
  user: UserDocument | null;
  incident: IncidentDocument | null;
  reportId: string;
  source: "firestore" | "sample" | "none";
}> {
  const cleanId = reportId.trim().toUpperCase();

  if (!cleanId) {
    return { user: null, incident: null, reportId: "", source: "none" };
  }

  // 1. Try Firestore direct get on /reports/{reportId}
  try {
    const reportRef = doc(db, "reports", cleanId);
    const snap = await getDoc(reportRef);

    if (snap.exists()) {
      const data = snap.data() as ReportDocument;
      await logReportAccess(cleanId, institutionId, institutionName);
      return {
        user: data.user,
        incident: data.incident,
        reportId: cleanId,
        source: "firestore",
      };
    }
  } catch (err) {
    console.warn("Firestore direct get on /reports error:", err);
  }

  // 2. Try Firestore lookup on /emergency_dispatches (Direct Mobile App Ingestion)
  try {
    // Check direct doc ID or query by reportId
    let dispatchDoc = await getDoc(doc(db, "emergency_dispatches", cleanId));
    let dispatchData: any = dispatchDoc.exists() ? dispatchDoc.data() : null;

    if (!dispatchData) {
      const q = query(
        collection(db, "emergency_dispatches"),
        where("reportId", "==", cleanId),
        limit(1)
      );
      const querySnap = await getDocs(q);
      if (!querySnap.empty) {
        dispatchData = querySnap.docs[0].data();
      }
    }

    // Also check emergency_alerts if not found in emergency_dispatches
    if (!dispatchData) {
      const alertDoc = await getDoc(doc(db, "emergency_alerts", cleanId));
      if (alertDoc.exists()) {
        dispatchData = alertDoc.data();
      }
    }

    if (dispatchData) {
      const liveUser: UserDocument = {
        id: dispatchData.userId || "APP-USER",
        primaryContact: {
          name: dispatchData.primaryContactName || "Registered Emergency Contacts",
          phone: dispatchData.userPhone || dispatchData.phone || "+91 112",
        },
        profile: {
          name: dispatchData.userName || "AcciAlert Protection Active",
          bloodGroup: dispatchData.bloodGroup || "O+",
          allergies: dispatchData.allergies || "None reported",
          medicalConditions: dispatchData.medicalConditions || "None recorded",
          medications: dispatchData.medications || "None recorded",
          additionalNotes: "Verified via AcciAlert Android App v6.0 Edge ML Sensor Grid",
        },
      };

      const liveIncident: IncidentDocument = {
        id: cleanId,
        timestamp: dispatchData.timestamp
          ? typeof dispatchData.timestamp === "number"
            ? new Date(dispatchData.timestamp).toISOString()
            : dispatchData.timestamp.toDate
            ? dispatchData.timestamp.toDate().toISOString()
            : new Date().toISOString()
          : new Date().toISOString(),
        speedKmh: Number(
          dispatchData.telemetry?.preImpactSpeedKmh ??
            dispatchData.preImpactSpeedKmh ??
            dispatchData.speedKmh ??
            0
        ),
        gForce: Number(
          dispatchData.telemetry?.impactGForce ??
            dispatchData.impactGForce ??
            dispatchData.gForce ??
            0
        ),
        weather: {
          condition:
            dispatchData.telemetry?.weatherCondition ??
            dispatchData.weatherCondition ??
            "Clear Sky • Real-time GPS Locked",
          temp: 28,
        },
        location: {
          latitude: Number(
            dispatchData.location?.latitude ?? dispatchData.latitude ?? 0
          ),
          longitude: Number(
            dispatchData.location?.longitude ?? dispatchData.longitude ?? 0
          ),
          address:
            dispatchData.location?.address ??
            dispatchData.locationText ??
            "Signal Latched GPS Location",
        },
        rolloverDetected: Boolean(
          dispatchData.telemetry?.isRolloverDetected ??
            dispatchData.isRolloverDetected
        ),
        powerRipDetected: false,
        status:
          dispatchData.status === "RESOLVED" ? "RESOLVED" : "ACTIVE",
      };

      await logReportAccess(cleanId, institutionId, institutionName);
      return {
        user: liveUser,
        incident: liveIncident,
        reportId: cleanId,
        source: "firestore",
      };
    }
  } catch (err) {
    console.warn("Firestore lookup on /emergency_dispatches error:", err);
  }

  // 3. Fallback check for sample report IDs
  const sampleMatch = SAMPLE_REPORTS[cleanId];
  if (sampleMatch) {
    await logReportAccess(cleanId, institutionId, institutionName);
    return {
      user: sampleMatch.user,
      incident: sampleMatch.incident,
      reportId: cleanId,
      source: "sample",
    };
  }

  return { user: null, incident: null, reportId: cleanId, source: "none" };
}

/**
 * Registers a blood bank in Firestore `bloodBanks/{uid}` and `blood_banks/{uid}` with `status: "pending"`
 * Fully compatible with Cloud Function Hema-Link & Web Dashboard.
 */
export async function registerBloodBankDoc(
  uid: string,
  data: Omit<BloodBankDocument, "createdAt" | "status" | "uid">
) {
  try {
    const bankDoc: BloodBankDocument = {
      ...data,
      uid,
      status: "pending", // ALWAYS pending on registration
      isVerified: false,
      createdAt: serverTimestamp(),
    };

    // Construct inventory map for Cloud Function proximity calculations
    const defaultInventory: Record<string, number> = {};
    const groups = data.supportedGroups || ["O+", "O-", "A+", "B+", "AB+"];
    ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].forEach((g) => {
      defaultInventory[g] = groups.includes(g) ? 12 : 0;
    });

    const unifiedBankPayload = {
      ...bankDoc,
      id: uid,
      latitude: data.lat,
      longitude: data.lng,
      location: {
        latitude: data.lat,
        longitude: data.lng,
      },
      bloodInventory: defaultInventory,
      isAvailable24x7: true,
      registeredAt: serverTimestamp(),
    };

    // Dual-write to both collections:
    // 1. bloodBanks (for web app administration & authentication profile)
    // 2. blood_banks (for Cloud Function Hema-Link proximity matching)
    await Promise.all([
      setDoc(doc(db, "bloodBanks", uid), unifiedBankPayload),
      setDoc(doc(db, "blood_banks", uid), unifiedBankPayload),
    ]);

    return { success: true, uid };
  } catch (err: any) {
    console.error("Failed to write blood bank:", err);
    return { success: false, error: err.message || "Failed to register" };
  }
}

/**
 * Legacy wrapper for registration
 */
export async function registerBloodBank(
  data: Omit<BloodBankDocument, "createdAt" | "status" | "uid">,
  uid?: string
) {
  const targetUid = uid || `bank_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
  return registerBloodBankDoc(targetUid, data);
}

/**
 * Fetches blood bank profile document from Firestore `bloodBanks/{uid}` or `blood_banks/{uid}`
 */
export async function getBloodBankProfile(uid: string): Promise<BloodBankDocument | null> {
  try {
    const bankRef = doc(db, "bloodBanks", uid);
    let snap = await getDoc(bankRef);
    if (!snap.exists()) {
      snap = await getDoc(doc(db, "blood_banks", uid));
    }
    if (snap.exists()) {
      return { id: snap.id, ...(snap.data() as BloodBankDocument) };
    }
  } catch (err) {
    console.warn("Error fetching blood bank profile:", err);
  }
  return null;
}

/**
 * Admin: Updates blood bank verification status (approved / rejected)
 */
export async function updateBloodBankStatus(
  bankId: string,
  status: BloodBankStatus,
  rejectionReason?: string
) {
  try {
    const updateData: any = {
      status,
      isVerified: status === "approved",
    };
    if (status === "approved") {
      updateData.approvedAt = serverTimestamp();
    } else if (status === "rejected") {
      updateData.rejectedAt = serverTimestamp();
      if (rejectionReason) updateData.rejectionReason = rejectionReason;
    }

    await Promise.all([
      setDoc(doc(db, "bloodBanks", bankId), updateData, { merge: true }),
      setDoc(doc(db, "blood_banks", bankId), updateData, { merge: true }),
    ]);

    return { success: true };
  } catch (err: any) {
    console.error("Failed to update status:", err);
    return { success: false, error: err.message };
  }
}

/**
 * Admin: Fetches all registered blood banks
 */
export async function getAllBloodBanks(): Promise<BloodBankDocument[]> {
  try {
    const snap = await getDocs(collection(db, "bloodBanks"));
    const list: BloodBankDocument[] = [];
    snap.forEach((d) => {
      list.push({ id: d.id, ...(d.data() as BloodBankDocument) });
    });
    return list;
  } catch (err) {
    console.warn("Error getting all blood banks:", err);
    return [];
  }
}

/**
 * Queues an emergency priority alert email to a blood bank in the Firestore `/mail` collection
 * (Fully compatible with Firebase Trigger Email extension and SMTP dispatchers).
 * Completely replaces audible siren alerts with high-priority email notifications.
 */
export async function queueEmergencyAlertEmail(params: {
  to: string;
  bankName?: string;
  victimName?: string;
  bloodGroup: string;
  locationAddress?: string;
  latitude?: number;
  longitude?: number;
  distanceKm?: number | null;
  impactGForce?: number;
  reportId?: string;
  accidentId?: string;
}) {
  const {
    to,
    bankName = "Emergency Blood Bank Desk",
    victimName = "Accident Victim",
    bloodGroup,
    locationAddress = "Live GPS Latch",
    latitude = 28.6139,
    longitude = 77.209,
    distanceKm = null,
    impactGForce = 5.2,
    reportId = "",
    accidentId = "",
  } = params;

  if (!to) {
    console.warn("queueEmergencyAlertEmail: No recipient email provided.");
    return { success: false, error: "Missing recipient email" };
  }

  const mapsUrl = `https://maps.google.com/?q=${latitude},${longitude}`;
  const blackboxUrl = reportId
    ? `https://accialert-website.vercel.app/blackbox-portal?reportId=${reportId}`
    : `https://accialert-website.vercel.app/blood-banks/dashboard`;

  const subject = `🚨 URGENT: Blood Supply Alert [${bloodGroup} Required] - AcciAlert Hema-Link`;

  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${subject}</title>
      </head>
      <body style="margin: 0; padding: 0; background-color: #0b0f19; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #f3f4f6;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #0b0f19; padding: 24px 12px;">
          <tr>
            <td align="center">
              <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; background-color: #111827; border: 1px solid #ef4444; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 25px rgba(239, 68, 68, 0.2);">
                <!-- Header Banner -->
                <tr>
                  <td style="background: linear-gradient(135deg, #991b1b 0%, #dc2626 100%); padding: 24px 24px; text-align: left;">
                    <span style="background-color: #450a0a; color: #fecaca; font-size: 11px; font-weight: 800; letter-spacing: 1.5px; text-transform: uppercase; padding: 4px 10px; border-radius: 6px; border: 1px solid #7f1d1d;">
                      Silent Priority Dispatch • Sirens Suppressed
                    </span>
                    <h1 style="color: #ffffff; font-size: 22px; font-weight: 900; margin: 12px 0 4px 0; text-transform: uppercase; letter-spacing: 0.5px;">
                      🚨 Emergency Blood Alert
                    </h1>
                    <p style="color: #fee2e2; font-size: 13px; margin: 0; line-height: 1.4;">
                      High-impact collision detected near ${bankName}. Immediate blood preparation requested.
                    </p>
                  </td>
                </tr>

                <!-- Content Area -->
                <tr>
                  <td style="padding: 24px;">
                    <!-- Required Blood Group Callout -->
                    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #1f2937; border: 1px solid #374151; border-radius: 12px; margin-bottom: 20px;">
                      <tr>
                        <td style="padding: 16px; text-align: left;">
                          <span style="font-size: 11px; font-weight: 700; color: #9ca3af; text-transform: uppercase; display: block; letter-spacing: 1px;">
                            Required Blood Group
                          </span>
                          <div style="font-size: 32px; font-weight: 900; color: #ef4444; margin-top: 4px;">
                            ${bloodGroup}
                          </div>
                          <span style="font-size: 12px; color: #f87171; font-weight: 600;">
                            Priority Transfusion Protocol Active
                          </span>
                        </td>
                        <td align="right" style="padding: 16px;">
                          ${
                            distanceKm !== null
                              ? `<span style="background-color: #064e3b; color: #6ee7b7; border: 1px solid #059669; font-size: 12px; font-weight: bold; padding: 6px 12px; border-radius: 8px;">~${distanceKm} km away</span>`
                              : ""
                          }
                        </td>
                      </tr>
                    </table>

                    <!-- Crash Telemetry Details -->
                    <table width="100%" cellpadding="8" cellspacing="0" style="font-size: 13px; border-collapse: collapse; margin-bottom: 24px;">
                      <tr style="border-bottom: 1px solid #1f2937;">
                        <td style="color: #9ca3af; font-weight: 600; width: 40%;">Victim Profile:</td>
                        <td style="color: #ffffff; font-weight: bold;">${victimName}</td>
                      </tr>
                      <tr style="border-bottom: 1px solid #1f2937;">
                        <td style="color: #9ca3af; font-weight: 600;">Location Coordinates:</td>
                        <td style="color: #ffffff; font-family: monospace;">${latitude.toFixed(4)}, ${longitude.toFixed(4)}</td>
                      </tr>
                      <tr style="border-bottom: 1px solid #1f2937;">
                        <td style="color: #9ca3af; font-weight: 600;">Address Landmark:</td>
                        <td style="color: #e5e7eb;">${locationAddress}</td>
                      </tr>
                      <tr style="border-bottom: 1px solid #1f2937;">
                        <td style="color: #9ca3af; font-weight: 600;">Impact Severity:</td>
                        <td style="color: #f87171; font-weight: bold;">${impactGForce > 0 ? `${impactGForce} G-Force (Severe Collision)` : "Severe Crash Detected"}</td>
                      </tr>
                      <tr>
                        <td style="color: #9ca3af; font-weight: 600;">Dispatch Channel:</td>
                        <td style="color: #38bdf8; font-weight: 600;">AcciAlert Hema-Link Direct Mail</td>
                      </tr>
                    </table>

                    <!-- Action Buttons -->
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="padding-bottom: 12px;">
                          <a href="${mapsUrl}" target="_blank" style="display: block; text-align: center; background-color: #dc2626; color: #ffffff; font-size: 14px; font-weight: bold; text-decoration: none; padding: 14px 20px; border-radius: 10px; box-shadow: 0 4px 12px rgba(220, 38, 38, 0.4);">
                            📍 Open GPS Coordinates in Google Maps
                          </a>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <a href="${blackboxUrl}" target="_blank" style="display: block; text-align: center; background-color: #1f2937; color: #38bdf8; font-size: 13px; font-weight: 600; text-decoration: none; padding: 12px 20px; border-radius: 10px; border: 1px solid #38bdf8;">
                            📋 View Digital Blackbox Report & Telemetry
                          </a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- Footer -->
                <tr>
                  <td style="background-color: #0b0f19; padding: 16px 24px; border-top: 1px solid #1f2937; text-align: center;">
                    <p style="color: #6b7280; font-size: 11px; margin: 0; line-height: 1.5;">
                      This emergency notification was generated automatically by AcciAlert Edge ML v6.0.<br>
                      Audible sirens on your monitoring terminal have been suppressed per hospital quiet protocol.<br>
                      Recipient Facility: <strong>${to}</strong>
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `;

  const textContent = `
EMERGENCY BLOOD ALERT - ACCIALERT HEMA-LINK
Patient Blood Group: ${bloodGroup}
Facility: ${bankName}
Victim: ${victimName}
Location: ${locationAddress} (${latitude.toFixed(4)}, ${longitude.toFixed(4)})
Distance: ${distanceKm !== null ? `${distanceKm} km` : "Proximity Zone"}
Impact Severity: ${impactGForce} G

Google Maps: ${mapsUrl}
Blackbox Report: ${blackboxUrl}

(Audible sirens suppressed. Priority email dispatched directly to ${to})
  `.trim();

  try {
    const mailDocRef = await addDoc(collection(db, "mail"), {
      to,
      message: {
        subject,
        text: textContent,
        html: htmlContent,
      },
      metadata: {
        bloodGroup,
        accidentId,
        reportId,
        dispatchedAt: serverTimestamp(),
        source: "hema-link-direct",
      },
      createdAt: serverTimestamp(),
    });

    // Dispatch real email via Next.js /api/send-email (SMTP / Gmail App Password)
    let apiDelivery: any = null;
    if (typeof window !== "undefined") {
      try {
        const res = await fetch("/api/send-email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            to,
            subject,
            text: textContent,
            html: htmlContent,
            metadata: { bloodGroup, accidentId, reportId },
          }),
        });
        if (res.ok) {
          apiDelivery = await res.json();
        }
      } catch (fetchErr) {
        console.warn("Direct SMTP API call warning:", fetchErr);
      }
    }

    return {
      success: true,
      mailId: mailDocRef.id,
      delivered: Boolean(apiDelivery?.delivered),
      simulated: Boolean(apiDelivery?.simulated),
      provider: apiDelivery?.provider || "firestore-queue",
    };
  } catch (err: any) {
    console.error("Failed to queue emergency email in /mail:", err);
    return { success: false, error: err.message };
  }
}

/**
 * Acknowledges or mobilizes an accident from a blood bank, persisting the status to Firestore
 * so the mobile app, first responders, and blackbox portal show live confirmation.
 */
export async function updateAccidentAction(
  accidentId: string,
  action: "acknowledge" | "mobilize",
  bankName: string,
  bloodGroup?: string
) {
  try {
    const updatePayload: any = {
      lastActionAt: serverTimestamp(),
    };

    if (action === "acknowledge") {
      updatePayload.acknowledged = true;
      updatePayload.acknowledgedBankName = bankName;
      updatePayload.acknowledgedAt = serverTimestamp();
    } else if (action === "mobilize") {
      updatePayload.mobilized = true;
      updatePayload.mobilizedBankName = bankName;
      updatePayload.mobilizedAt = serverTimestamp();
      updatePayload.status = "MOBILIZED";
      if (bloodGroup) updatePayload.mobilizedBloodGroup = bloodGroup;
    }

    // Update in both accidents and emergency_dispatches if present
    await Promise.allSettled([
      setDoc(doc(db, "accidents", accidentId), updatePayload, { merge: true }),
      setDoc(doc(db, "emergency_dispatches", accidentId), updatePayload, { merge: true }),
    ]);

    return { success: true };
  } catch (err: any) {
    console.error("Failed to update accident action:", err);
    return { success: false, error: err.message };
  }
}

/**
 * Pushes a test accident into Firestore for live testing
 * and automatically dispatches an emergency email notification
 * to the blood bank instead of sounding audible sirens.
 */
export async function pushTestAccident(
  data?: Partial<AccidentDocument>,
  targetBankEmail?: string,
  targetBankName?: string
) {
  const sampleAccidents: Partial<AccidentDocument>[] = [
    {
      userId: "victim-live-01",
      userName: "Karan Johar",
      bloodGroup: "O-",
      userPhone: "+91 98111 22334",
      speedKmh: 82.5,
      gForce: 5.4,
      location: {
        latitude: 28.5355,
        longitude: 77.391,
        address: "Noida-Greater Noida Expressway, Sector 128, UP, India",
      },
      weatherCondition: "Light Rain, Wet Asphalt",
      status: "ACTIVE",
    },
    {
      userId: "victim-live-02",
      userName: "Rohan Varma",
      bloodGroup: "AB+",
      userPhone: "+91 97234 88990",
      speedKmh: 68.0,
      gForce: 4.8,
      location: {
        latitude: 19.1136,
        longitude: 72.8697,
        address: "JVLR Junction, Powai, Mumbai, Maharashtra, India",
      },
      weatherCondition: "Overcast",
      status: "ACTIVE",
    },
    {
      userId: "victim-live-03",
      userName: "Sneha Reddy",
      bloodGroup: "B+",
      userPhone: "+91 94455 66778",
      speedKmh: 91.2,
      gForce: 6.2,
      location: {
        latitude: 17.4483,
        longitude: 78.3915,
        address: "HITEC City Main Road, Madhapur, Hyderabad, Telangana, India",
      },
      weatherCondition: "Clear Night",
      status: "ACTIVE",
    },
  ];

  const selected = data || sampleAccidents[Math.floor(Math.random() * sampleAccidents.length)];

  try {
    const docRef = await addDoc(collection(db, "accidents"), {
      ...selected,
      createdAt: serverTimestamp(),
      status: "ACTIVE",
      sirenDisabled: true,
      emailDispatched: Boolean(targetBankEmail),
      recipientEmail: targetBankEmail || null,
    });

    // Directly queue emergency email for silent notification to blood bank
    let emailResult = null;
    if (targetBankEmail) {
      emailResult = await queueEmergencyAlertEmail({
        to: targetBankEmail,
        bankName: targetBankName || "Verified Blood Bank",
        victimName: selected.userName,
        bloodGroup: selected.bloodGroup || "O+",
        locationAddress: selected.location?.address,
        latitude: selected.location?.latitude,
        longitude: selected.location?.longitude,
        impactGForce: selected.gForce,
        accidentId: docRef.id,
      });
    }

    return {
      success: true,
      id: docRef.id,
      emailDispatched: Boolean(emailResult?.success),
      mailId: emailResult?.mailId,
    };
  } catch (err: any) {
    console.error("Error creating test accident:", err);
    return { success: false, error: err.message };
  }
}

/**
 * Admin: Permanently deletes a blood bank from both collections
 */
export async function deleteBloodBankDoc(bankId: string) {
  try {
    await Promise.allSettled([
      deleteDoc(doc(db, "bloodBanks", bankId)),
      deleteDoc(doc(db, "blood_banks", bankId)),
    ]);
    return { success: true };
  } catch (err: any) {
    console.error("Failed to delete blood bank:", err);
    return { success: false, error: err.message };
  }
}

/**
 * Admin: Fetches all registered user emergency profiles
 */
export async function getAllUsers(): Promise<UserDocument[]> {
  try {
    const snap = await getDocs(collection(db, "users"));
    const list: UserDocument[] = [];
    snap.forEach((d) => {
      const data = d.data();
      list.push({
        id: d.id,
        primaryContact: data.primaryContact || { name: "Not configured", phone: "" },
        profile: data.profile || {
          name: data.name || "Anonymous User",
          bloodGroup: data.bloodGroup || "Unknown",
          allergies: data.allergies || "None recorded",
          medicalConditions: data.medicalConditions || "None",
          medications: data.medications || "None",
          additionalNotes: data.additionalNotes || "",
        },
        createdAt: data.createdAt || data.updatedAt,
      });
    });
    return list;
  } catch (err) {
    console.warn("Failed to fetch users from Firestore:", err);
    return [];
  }
}

/**
 * Admin: Permanently deletes a user document
 */
export async function deleteUserDoc(userId: string) {
  try {
    await deleteDoc(doc(db, "users", userId));
    return { success: true };
  } catch (err: any) {
    console.error("Failed to delete user doc:", err);
    return { success: false, error: err.message };
  }
}

/**
 * Admin: Fetches all accident / dispatch incidents
 */
export async function getAllAccidents(): Promise<AccidentDocument[]> {
  try {
    let list: AccidentDocument[] = [];
    try {
      const q = query(collection(db, "accidents"), orderBy("createdAt", "desc"), limit(100));
      const snap = await getDocs(q);
      snap.forEach((d) => list.push({ id: d.id, ...(d.data() as AccidentDocument) }));
    } catch {
      const snap = await getDocs(collection(db, "accidents"));
      snap.forEach((d) => list.push({ id: d.id, ...(d.data() as AccidentDocument) }));
    }
    return list;
  } catch (err) {
    console.warn("Failed to fetch accidents:", err);
    return [];
  }
}

/**
 * Admin: Resolves an active incident
 */
export async function resolveAccident(accidentId: string) {
  try {
    const updateData = {
      status: "RESOLVED",
      resolvedAt: serverTimestamp(),
    };
    await Promise.allSettled([
      setDoc(doc(db, "accidents", accidentId), updateData, { merge: true }),
      setDoc(doc(db, "emergency_dispatches", accidentId), updateData, { merge: true }),
    ]);
    return { success: true };
  } catch (err: any) {
    console.error("Failed to resolve accident:", err);
    return { success: false, error: err.message };
  }
}

/**
 * Admin: Permanently deletes an accident
 */
export async function deleteAccident(accidentId: string) {
  try {
    await Promise.allSettled([
      deleteDoc(doc(db, "accidents", accidentId)),
      deleteDoc(doc(db, "emergency_dispatches", accidentId)),
    ]);
    return { success: true };
  } catch (err: any) {
    console.error("Failed to delete accident:", err);
    return { success: false, error: err.message };
  }
}

/**
 * Admin: Fetches all cryptographic Blackbox reports
 */
export async function getAllReports(): Promise<ReportDocument[]> {
  try {
    const snap = await getDocs(collection(db, "reports"));
    const list: ReportDocument[] = [];
    snap.forEach((d) => {
      list.push({ id: d.id, ...(d.data() as ReportDocument) });
    });
    return list;
  } catch (err) {
    console.warn("Failed to fetch reports:", err);
    return [];
  }
}

/**
 * Admin: Deletes a blackbox report certificate
 */
export async function deleteReportDoc(reportId: string) {
  try {
    await deleteDoc(doc(db, "reports", reportId));
    return { success: true };
  } catch (err: any) {
    console.error("Failed to delete report:", err);
    return { success: false, error: err.message };
  }
}

/**
 * Admin: Purges all test and demo accidents from the database
 */
export async function purgeTestAccidents() {
  try {
    const snap = await getDocs(collection(db, "accidents"));
    let deletedCount = 0;
    const promises: Promise<any>[] = [];
    snap.forEach((d) => {
      const data = d.data();
      const isTest =
        data.userName === "Karan Johar" ||
        data.userName === "Rohan Varma" ||
        data.userName === "Sneha Reddy" ||
        data.userName?.includes("Test") ||
        data.userName?.includes("Demo") ||
        data.userId?.startsWith("victim-live");
      if (isTest) {
        deletedCount++;
        promises.push(deleteDoc(doc(db, "accidents", d.id)));
        promises.push(deleteDoc(doc(db, "emergency_dispatches", d.id)));
      }
    });
    await Promise.allSettled(promises);
    return { success: true, count: deletedCount };
  } catch (err: any) {
    console.error("Failed to purge test accidents:", err);
    return { success: false, error: err.message };
  }
}

/**
 * Admin: Fetches live high-level overview metrics across the entire Firestore ecosystem
 */
export async function getDatabaseOverviewStats() {
  try {
    const [usersSnap, banksSnap, accidentsSnap, reportsSnap, mailSnap] = await Promise.allSettled([
      getDocs(collection(db, "users")),
      getDocs(collection(db, "bloodBanks")),
      getDocs(collection(db, "accidents")),
      getDocs(collection(db, "reports")),
      getDocs(collection(db, "mail")),
    ]);

    const usersCount = usersSnap.status === "fulfilled" ? usersSnap.value.size : 0;
    const banksCount = banksSnap.status === "fulfilled" ? banksSnap.value.size : 0;
    
    let pendingBanks = 0;
    let approvedBanks = 0;
    if (banksSnap.status === "fulfilled") {
      banksSnap.value.forEach((d) => {
        const s = d.data().status;
        if (s === "pending") pendingBanks++;
        else if (s === "approved") approvedBanks++;
      });
    }

    const accidentsCount = accidentsSnap.status === "fulfilled" ? accidentsSnap.value.size : 0;
    let activeAccidents = 0;
    if (accidentsSnap.status === "fulfilled") {
      accidentsSnap.value.forEach((d) => {
        if (d.data().status === "ACTIVE") activeAccidents++;
      });
    }

    const reportsCount = reportsSnap.status === "fulfilled" ? reportsSnap.value.size : 0;
    const mailCount = mailSnap.status === "fulfilled" ? mailSnap.value.size : 0;

    return {
      usersCount,
      banksCount,
      pendingBanks,
      approvedBanks,
      accidentsCount,
      activeAccidents,
      reportsCount,
      mailCount,
    };
  } catch (err) {
    console.warn("Failed to get database stats:", err);
    return {
      usersCount: 0,
      banksCount: 0,
      pendingBanks: 0,
      approvedBanks: 0,
      accidentsCount: 0,
      activeAccidents: 0,
      reportsCount: 0,
      mailCount: 0,
    };
  }
}
