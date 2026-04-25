import { University } from "./university";
import { Major } from "./major";

export type Role = "admin" | "user" | "teacher" | string;

export interface User {
  userId: string; // Changed from id to userId to match DB
  id: string; // Alias for userId
  fullName: string | null;
  name: string; // Alias for fullName
  username: string | null;
  email: string;
  role: Role;
  phone: string | null;
  isActive: boolean | null;
  lastLogin: string | null;
  createdAt: string;
  updatedAt: string | null;
  universityCode: string | null;
  majorId: number | null;
  intakeYear: number | null;
  
  // Relations (Virtual/Nested)
  university?: University | null;
  major?: Major | null;
}