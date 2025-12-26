// src/shared/api/userApi.ts

import { apiService } from "@/shared/api/api";
import type { ProfileSetupPayload } from "@/shared/types/profile";
import type { User } from "@/shared/types/user";

export const UserApi = {
  /**
   * Setup user profile (authenticated)
   */
  setupProfile(payload: ProfileSetupPayload) {
    return apiService.post<void>("/profile/setup", payload);
  },

  /**
   * Get user profile by userId
   */
  getUserProfile() {
    return apiService.get<User>(`/users`);
  },

  /**
   * Update user profile
   */
  updateUserProfile(payload: Partial<User>) {
    console.log("Updating user profile with payload:", payload);
    return apiService.put<User>(`/users`, payload);
  },
};
