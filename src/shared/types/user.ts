/** Vai trò & user */
import { University } from "./university";
import { Major } from "./major";


export type Role = "admin" | "user" | "teacher";

export interface User {
  id: string;
  name: string;
  username: string;
  role: Role;
  phone: string;
  email?: string;
  university: University | null;
  major: Major | null;
  intakeYear?: number;
}