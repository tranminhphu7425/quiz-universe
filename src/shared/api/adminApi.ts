// src/shared/api/adminApi.ts

import { apiService } from "./api";

export interface AdminUser {
  id: string;
  name: string;
  username: string;
  email: string;
  phone: string;
  role: string;
  isActive: boolean | null;
  createdAt: string | null;
  university: { universityCode: string; universityName: string } | null;
  major: { majorId: number; majorName: string } | null;
}

/* ===================== QUERY ===================== */

export function getAdminStats() {
  return apiService.get<any>("/admin/stats");
}

export function getAdminUsers(): Promise<AdminUser[]> {
  return apiService.get<AdminUser[]>("/admin/users");
}

/* ===================== MUTATION ===================== */

export function updateUserRole(
  userId: string,
  role: string
): Promise<AdminUser> {
  return apiService.put<AdminUser>(`/admin/users/${userId}/role`, { role });
}

export function toggleUserActive(userId: string): Promise<AdminUser> {
  return apiService.put<AdminUser>(`/admin/users/${userId}/toggle-active`);
}

export function deleteAdminUser(userId: string): Promise<void> {
  return apiService.delete<void>(`/admin/users/${userId}`);
}
