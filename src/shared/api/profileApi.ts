// src/shared/api/profile.api.ts
import { apiService } from "./api";
import type { ProfileSetupPayload } from "../types/profile";

export const ProfileApi = {
  setupProfile(payload: ProfileSetupPayload) {
    return apiService.post("/profile/setup", payload);
  },
};
