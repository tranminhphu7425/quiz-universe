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

export const AdminApi = {
  /* ===================== QUERY ===================== */
  
  getStats() {
    return apiService.get<any>("/admin/stats");
  },

  getUsers(): Promise<AdminUser[]> {
    return apiService.get<AdminUser[]>("/admin/users");
  },

  /* ===================== MUTATION ===================== */

  updateUserRole(userId: string, role: string): Promise<AdminUser> {
    return apiService.put<AdminUser>(`/admin/users/${userId}/role`, { role });
  },

  toggleUserActive(userId: string): Promise<AdminUser> {
    return apiService.put<AdminUser>(`/admin/users/${userId}/toggle-active`);
  },

  deleteUser(userId: string): Promise<void> {
    return apiService.delete<void>(`/admin/users/${userId}`);
  },
};

export const getAdminStats = AdminApi.getStats;
export const getAdminUsers = AdminApi.getUsers;
export const updateUserRole = AdminApi.updateUserRole;
export const toggleUserActive = AdminApi.toggleUserActive;
export const deleteAdminUser = AdminApi.deleteUser;
