import type { Language } from "../locales/locales";

export interface RSVPSubmission {
  fullName: string;
  attendance: "yes" | "no";
  language: Language;
  timestamp: string;
}
