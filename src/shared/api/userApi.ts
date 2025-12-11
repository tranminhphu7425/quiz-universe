// src/shared/api/userApi.ts
import { fetchJson } from "@/shared/api/apiClient";
import { User } from "@/app/providers/AuthProvider";

export async function getUserProfile(userId: string): Promise<User> {
  return await fetchJson<User>(`/api/users/${userId}`);
}

export async function updateUserProfile(userId: string, payload: Partial<User>): Promise<User> {
  console.log("Updating user profile with payload:", payload);
  return await fetchJson<User>(`/api/users/${userId}`, {
    method: "PUT",
    body: payload,
  });

  
}