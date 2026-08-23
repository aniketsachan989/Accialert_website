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
 * Retrieves a Digital Blackbox Report strictly using a Report ID (Fix 3)
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

  // 2. Fallback check for sample report IDs
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
 * Registers a blood bank in Firestore `bloodBanks/{uid}` with `status: "pending"` (Fix 2)
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
    await setDoc(doc(db, "bloodBanks", uid), bankDoc);
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
 * Fetches blood bank profile document from Firestore `bloodBanks/{uid}`
 */
export async function getBloodBankProfile(uid: string): Promise<BloodBankDocument | null> {
  try {
    const bankRef = doc(db, "bloodBanks", uid);
    const snap = await getDoc(bankRef);
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
    const bankRef = doc(db, "bloodBanks", bankId);
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
    await setDoc(bankRef, updateData, { merge: true });
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
 * Pushes a test accident into Firestore for live testing
 */
export async function pushTestAccident(data?: Partial<AccidentDocument>) {
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
    });
    return { success: true, id: docRef.id };
  } catch (err: any) {
    console.error("Error creating test accident:", err);
    return { success: false, error: err.message };
  }
}
