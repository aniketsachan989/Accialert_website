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
} from "@/types";

/**
 * Verified sample data for demo/fallback verification testing in Blackbox and Blood Bank portals
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
 * Searches Firestore for user matching profile name, bloodGroup, and primary contact phone
 */
export async function searchBlackboxUser(
  name: string,
  bloodGroup: string,
  phone: string
): Promise<{ user: UserDocument | null; incident: IncidentDocument | null; source: "firestore" | "sample" | "none" }> {
  const cleanName = name.trim().toLowerCase();
  const cleanPhone = phone.replace(/[^0-9+]/g, "");

  try {
    const usersRef = collection(db, "users");
    const snapshot = await getDocs(usersRef);

    for (const docSnap of snapshot.docs) {
      const data = docSnap.data() as UserDocument;
      const userName = (data.profile?.name || "").trim().toLowerCase();
      const userBg = (data.profile?.bloodGroup || "").trim();
      const userPhone = (data.primaryContact?.phone || "").replace(/[^0-9+]/g, "");

      if (
        userName === cleanName &&
        userBg.toUpperCase() === bloodGroup.trim().toUpperCase() &&
        (userPhone.includes(cleanPhone) || cleanPhone.includes(userPhone))
      ) {
        const userId = docSnap.id;
        const matchedUser: UserDocument = { id: userId, ...data };

        // Fetch latest incident from sub-collection /users/{userId}/incidents
        let latestIncident: IncidentDocument | null = null;
        try {
          const incRef = collection(db, "users", userId, "incidents");
          const incSnap = await getDocs(query(incRef, limit(1)));
          if (!incSnap.empty) {
            latestIncident = {
              id: incSnap.docs[0].id,
              ...(incSnap.docs[0].data() as IncidentDocument),
            };
          }
        } catch (e) {
          console.warn("Could not fetch sub-collection incidents:", e);
        }

        // If no subcollection incident, try to match /accidents collection
        if (!latestIncident) {
          try {
            const accRef = collection(db, "accidents");
            const accSnap = await getDocs(query(accRef, where("userId", "==", userId), limit(1)));
            if (!accSnap.empty) {
              const accData = accSnap.docs[0].data() as AccidentDocument;
              latestIncident = {
                id: accSnap.docs[0].id,
                timestamp: accData.createdAt || new Date().toISOString(),
                speedKmh: accData.speedKmh,
                gForce: accData.gForce,
                weather: { condition: accData.weatherCondition || "Clear", temp: 26 },
                location: accData.location,
                rolloverDetected: true,
                powerRipDetected: true,
                status: accData.status || "ACTIVE",
              };
            }
          } catch (e) {
            console.warn("Could not fetch accidents:", e);
          }
        }

        return { user: matchedUser, incident: latestIncident, source: "firestore" };
      }
    }
  } catch (err) {
    console.warn("Firestore query encountered error or permission limitation, falling back to local verification:", err);
  }

  // Fallback to sample data matching
  const sampleMatch = SAMPLE_USERS.find((u) => {
    const sName = u.profile.name.toLowerCase();
    const sBg = u.profile.bloodGroup.toUpperCase();
    const sPhone = u.primaryContact.phone.replace(/[^0-9+]/g, "");
    return (
      (sName.includes(cleanName) || cleanName.includes(sName)) &&
      sBg === bloodGroup.trim().toUpperCase() &&
      (sPhone.includes(cleanPhone) || cleanPhone.includes(sPhone))
    );
  });

  if (sampleMatch && sampleMatch.id) {
    return {
      user: sampleMatch,
      incident: SAMPLE_INCIDENTS[sampleMatch.id] || null,
      source: "sample",
    };
  }

  return { user: null, incident: null, source: "none" };
}

/**
 * Submits a new blood bank registration to Firestore
 */
export async function registerBloodBank(data: Omit<BloodBankDocument, "createdAt" | "isVerified">) {
  try {
    const bankDoc: BloodBankDocument = {
      ...data,
      isVerified: true,
      createdAt: serverTimestamp(),
    };
    const ref = await addDoc(collection(db, "blood_banks"), bankDoc);
    return { success: true, id: ref.id };
  } catch (err: any) {
    console.error("Failed to write blood bank:", err);
    return { success: false, error: err.message || "Failed to register" };
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
