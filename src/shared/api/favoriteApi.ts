// src/api/favorites.ts
import axios from "axios";
import { Subject } from "./subjectApi";
import { QuestionBank } from "./questionBanksApi";

const favoriteApi = axios.create({
  baseURL: import.meta.env.VITE_API_BASE,
  withCredentials: true, // Cho phép gửi cookie nếu dùng Spring Security
});

// Types
export interface FavoriteSubject {
  subjectId: number;
  userId: number;
  subjectName: string;
  subjectCode: string;
  addedAt: string;
}


export interface FavoriteStats {
  totalFavoriteSubjects: number;
  totalFavoriteBanks: number;
  recentFavorites: Array<Subject | QuestionBank>;
}

// Helper function for auth headers
function getAuthHeaders(token: string) {
  return {
    headers: { 
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}` 
    }
  };
}

// ==================== SUBJECT FAVORITES ====================

/**
 * Get user's favorite subjects
 */
export async function fetchFavoriteSubjects(userId: string | undefined, token: string): Promise<Subject[]> {
  const res = await favoriteApi.get(`/users/${userId}/favorite-subjects`, getAuthHeaders(token));
  return res.data;
}

/**
 * Add subject to favorites
 */
export async function addFavoriteSubject(subjectId: number, userId: string | undefined, token: string): Promise<void> {
  await favoriteApi.post(
    `/users/${userId}/favorite-subjects/${subjectId}`,
    null,
    getAuthHeaders(token)
  );
}

/**
 * Remove subject from favorites
 */
export async function removeFavoriteSubject(subjectId: number, userId: string | undefined, token: string): Promise<void> {
  await favoriteApi.delete(
    `/users/${userId}/favorite-subjects/${subjectId}`,
    getAuthHeaders(token)
  );
}

/**
 * Check if subject is favorited
 */
export async function isSubjectFavorited(subjectId: number, userId: string | undefined, token: string): Promise<boolean> {
  try {
    const res = await favoriteApi.get(
      `/users/${userId}/favorite-subjects/${subjectId}/check`,
      getAuthHeaders(token)
    );
    return res.data.isFavorited;
  } catch (error) {
    return false;
  }
}

// ==================== QUESTION BANK FAVORITES ====================

/**
 * Get user's favorite question banks
 */
export async function fetchFavoriteQuestionBanks(userId: string | undefined, token: string): Promise<QuestionBank[]> {
  const res = await favoriteApi.get(`/users/${userId}/favorite-banks`, getAuthHeaders(token));
  return res.data;
}

/**
 * Add question bank to favorites
 */
export async function addFavoriteQuestionBank(bankId: number, userId: string | undefined, token: string): Promise<void> {
  await favoriteApi.post(
    `/users/${userId}/favorite-banks/${bankId}`,
    null,
    getAuthHeaders(token)
  );
}

/**
 * Remove question bank from favorites
 */
export async function removeFavoriteQuestionBank(bankId: number, userId: string | undefined, token: string): Promise<void> {
  await favoriteApi.delete(
    `/users/${userId}/favorite-banks/${bankId}`,
    getAuthHeaders(token)
  );
}

/**
 * Check if question bank is favorited
 */
export async function isQuestionBankFavorited(bankId: number, userId: string | undefined, token: string): Promise<boolean> {
  try {
    const res = await favoriteApi.get(
      `/users/${userId}/favorite-banks/${bankId}/check`,
      getAuthHeaders(token)
    );
    return res.data.isFavorited;
  } catch (error) {
    return false;
  }
}

// ==================== COMBINED FAVORITES ====================

/**
 * Get all favorites (both subjects and question banks)
 */
export async function fetchAllFavorites(userId: string | undefined, token: string): Promise<{
  subjects: Subject[];
  questionBanks: QuestionBank[];
}> {
  const [subjects, questionBanks] = await Promise.all([
    fetchFavoriteSubjects(userId, token),
    fetchFavoriteQuestionBanks(userId, token)
  ]);
  
  return { subjects, questionBanks };
}

/**
 * Get favorite statistics
 */
export async function getFavoriteStats(userId: string | undefined, token: string): Promise<FavoriteStats> {
  const res = await favoriteApi.get(`/users/${userId}/favorites/stats`, getAuthHeaders(token));
  return res.data;
}

/**
 * Toggle favorite status for subject or question bank
 */
export async function toggleFavorite(
  type: 'subject' | 'bank',
  id: number,
  userId: string | undefined,
  token: string
): Promise<{ isFavorited: boolean }> {
  const endpoint = type === 'subject' ? 'favorite-subjects' : 'favorite-banks';
  
  // First check current status
  try {
    // Try to remove if exists
    await favoriteApi.delete(
      `/users/${userId}/${endpoint}/${id}`,
      getAuthHeaders(token)
    );
    return { isFavorited: false };
  } catch (removeError) {
    // If remove fails (404), add it
    try {
      await favoriteApi.post(
        `/users/${userId}/${endpoint}/${id}`,
        null,
        getAuthHeaders(token)
      );
      return { isFavorited: true };
    } catch (addError) {
      throw new Error(`Failed to toggle favorite for ${type} ${id}`);
    }
  }
}

/**
 * Clear all favorites of a specific type
 */
export async function clearAllFavorites(
  type: 'subject' | 'bank',
  userId: string | undefined,
  token: string
): Promise<void> {
  const endpoint = type === 'subject' ? 'favorite-subjects' : 'favorite-banks';
  await favoriteApi.delete(`/users/${userId}/${endpoint}`, getAuthHeaders(token));
}

/**
 * Import favorites from another user (admin only)
 */
export async function importFavorites(
  sourceUserId: string,
  targetUserId: string,
  token: string,
  options?: {
    includeSubjects?: boolean;
    includeBanks?: boolean;
    overwrite?: boolean;
  }
): Promise<{ importedSubjects: number; importedBanks: number }> {
  const res = await favoriteApi.post(
    `/users/${targetUserId}/favorites/import`,
    {
      sourceUserId,
      ...options
    },
    getAuthHeaders(token)
  );
  
  return res.data;
}

/**
 * Export favorites to JSON file
 */
export async function exportFavorites(
  userId: string | undefined,
  token: string,
  format: 'json' | 'csv' = 'json'
): Promise<Blob> {
  const res = await favoriteApi.get(
    `/users/${userId}/favorites/export?format=${format}`,
    {
      ...getAuthHeaders(token),
      responseType: 'blob'
    }
  );
  
  return res.data;
}

// ==================== REAL-TIME FAVORITE UPDATES ====================

/**
 * Subscribe to favorite updates (using WebSocket or Server-Sent Events)
 */
export function subscribeToFavoriteUpdates(
  userId: string,
  token: string,
  onUpdate: (data: any) => void
): () => void {
  const eventSource = new EventSource(`${import.meta.env.VITE_API_BASE}/users/${userId}/favorites/stream`, {
    withCredentials: true
  });

  eventSource.onmessage = (event) => {
    try {
      const data = JSON.parse(event.data);
      onUpdate(data);
    } catch (error) {
      console.error('Failed to parse favorite update:', error);
    }
  };

  eventSource.onerror = (error) => {
    console.error('Favorite update stream error:', error);
    eventSource.close();
  };

  // Return cleanup function
  return () => eventSource.close();
}

// ==================== BATCH OPERATIONS ====================

/**
 * Batch add favorites
 */
export async function batchAddFavorites(
  type: 'subject' | 'bank',
  ids: number[],
  userId: string | undefined,
  token: string
): Promise<{ success: boolean; added: number; failed: number }> {
  const endpoint = type === 'subject' ? 'favorite-subjects' : 'favorite-banks';
  
  const res = await favoriteApi.post(
    `/users/${userId}/${endpoint}/batch`,
    { ids },
    getAuthHeaders(token)
  );
  
  return res.data;
}

/**
 * Batch remove favorites
 */
export async function batchRemoveFavorites(
  type: 'subject' | 'bank',
  ids: number[],
  userId: string | undefined,
  token: string
): Promise<{ success: boolean; removed: number; failed: number }> {
  const endpoint = type === 'subject' ? 'favorite-subjects' : 'favorite-banks';
  
  const res = await favoriteApi.delete(
    `/users/${userId}/${endpoint}/batch`,
    {
      ...getAuthHeaders(token),
      data: { ids }
    }
  );
  
  return res.data;
}

// ==================== UTILITY FUNCTIONS ====================

/**
 * Get recently favorited items
 */
export async function getRecentFavorites(
  userId: string | undefined,
  token: string,
  limit: number = 10
): Promise<Array<Subject | QuestionBank>> {
  const res = await favoriteApi.get(
    `/users/${userId}/favorites/recent?limit=${limit}`,
    getAuthHeaders(token)
  );
  
  return res.data;
}

/**
 * Get most favorited subjects (popular)
 */
export async function getPopularSubjects(token: string, limit: number = 10): Promise<FavoriteSubject[]> {
  const res = await favoriteApi.get(
    `/favorites/subjects/popular?limit=${limit}`,
    getAuthHeaders(token)
  );
  
  return res.data;
}

/**
 * Get most favorited question banks (popular)
 */
export async function getPopularQuestionBanks(token: string, limit: number = 10): Promise<QuestionBank[]> {
  const res = await favoriteApi.get(
    `/favorites/banks/popular?limit=${limit}`,
    getAuthHeaders(token)
  );
  
  return res.data;
}

// Helper function for file download
export function downloadFavoriteExport(blob: Blob, filename: string): void {
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
}

// For backward compatibility (legacy functions)
export {
  fetchFavoriteSubjects as fetchFavorites,
  addFavoriteSubject as addFavorite,
  removeFavoriteSubject as removeFavorite
};

export default favoriteApi;