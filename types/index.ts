export type BloodGroup = "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";

export interface UserProfile {
  name: string;
  bloodGroup: BloodGroup;
  allergies: string;
  medicalConditions: string;
  medications: string;
  additionalNotes: string;
}

export interface PrimaryContact {
  name: string;
  phone: string;
}

export interface UserDocument {
  id?: string;
  primaryContact: PrimaryContact;
  profile: UserProfile;
  createdAt?: any;
}

export interface IncidentLocation {
  latitude: number;
  longitude: number;
  address?: string;
}

export interface IncidentWeather {
  condition: string;
  temp: number;
}

export interface IncidentDocument {
  id?: string;
  timestamp: any;
  speedKmh: number;
  gForce: number;
  weather: IncidentWeather;
  location: IncidentLocation;
  rolloverDetected: boolean;
  powerRipDetected: boolean;
  status: "ACTIVE" | "RESOLVED";
}

export interface AccidentDocument {
  id?: string;
  userId: string;
  userName: string;
  bloodGroup: BloodGroup | string;
  userPhone: string;
  speedKmh: number;
  gForce: number;
  location: IncidentLocation;
  weatherCondition: string;
  status: "ACTIVE" | "RESOLVED";
  createdAt: any;
  notes?: string;
}

export type BloodBankStatus = "pending" | "approved" | "rejected";

export interface BloodBankDocument {
  id?: string;
  uid?: string;
  name: string;
  licenseNo: string;
  phone: string;
  email: string;
  address: string;
  lat: number;
  lng: number;
  supportedGroups: string[];
  status: BloodBankStatus;
  isVerified?: boolean;
  createdAt: any;
  approvedAt?: any;
  rejectedAt?: any;
  rejectionReason?: string;
}

export interface ReportDocument {
  id?: string;
  reportId: string;
  accidentId?: string;
  userId?: string;
  user: UserDocument;
  incident: IncidentDocument;
  createdAt: any;
  verifiedBy?: string;
}

export interface AccessLogDocument {
  id?: string;
  reportId: string;
  institutionId: string;
  institutionName?: string;
  timestamp: any;
  ipOrUserAgent?: string;
}

export interface SimulationStage {
  id: number;
  title: string;
  shortTitle: string;
  tagline: string;
  description: string;
  metrics: {
    gForce: number;
    speedKmh: number;
    countdown: number;
    confidence: number;
    status: string;
  };
  details: string[];
}
