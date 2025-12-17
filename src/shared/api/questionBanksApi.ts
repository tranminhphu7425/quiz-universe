// src/api/questionBanks.ts
const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:8080/api";

// Types
export interface QuestionBank {
  bankId: number;
  name: string;
  subjectId: number;
  subjectName: string;
  description?: string;
  visibility: 'PRIVATE' | 'ORG' | 'PUBLIC';
  createdBy: number;
  creatorName: string;
  createdAt: string;
  updatedAt?: string;
  questionCount: number;
}

export interface CreateQuestionBankRequest {
  name: string;
  subjectId: number;
  description?: string;
  visibility?: 'PRIVATE' | 'ORG' | 'PUBLIC';
}

export interface UpdateQuestionBankRequest {
  name: string;
  description?: string;
  visibility?: 'PRIVATE' | 'ORG' | 'PUBLIC';
}

export interface PaginatedResponse<T> {
  content: T[];
  pageable: {
    pageNumber: number;
    pageSize: number;
    sort: {
      sorted: boolean;
      unsorted: boolean;
      empty: boolean;
    };
    offset: number;
    paged: boolean;
    unpaged: boolean;
  };
  totalPages: number;
  totalElements: number;
  last: boolean;
  size: number;
  number: number;
  sort: {
    sorted: boolean;
    unsorted: boolean;
    empty: boolean;
  };
  numberOfElements: number;
  first: boolean;
  empty: boolean;
}

export interface PageParams {
  page?: number;
  size?: number;
  sort?: string;
}



export async function fetchQuestionBankNameById(subjectId: number) {
    const res = await fetch(`${import.meta.env.VITE_API_BASE}/question-banks/${subjectId}/name`);
    if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(text || `HTTP ${res.status}`);
    }
    return res.json() as Promise<{ id: number; name: string }>;
}


// Helper function to get auth token
function getAuthToken(): string | null {
  // Adjust based on your auth storage (localStorage, cookies, etc.)
  return localStorage.getItem('token') || sessionStorage.getItem('token');
}

// Helper function for fetch requests
async function fetchWithAuth(url: string, options: RequestInit = {}): Promise<Response> {
  const token = getAuthToken();
  
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` }),
    ...options.headers,
  };

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const text = await response.text().catch(() => "");
    throw new Error(text || `HTTP ${response.status}`);
  }

  return response;
}

// Question Banks API Functions

/**
 * Create a new question bank
 */
export async function createQuestionBank(data: CreateQuestionBankRequest): Promise<QuestionBank> {
  const res = await fetchWithAuth(`${API_BASE}/question-banks`, {
    method: 'POST',
    body: JSON.stringify(data),
  });
  
  return res.json();
}

/**
 * Get all question banks with pagination
 */
export async function getAllQuestionBanks(params?: PageParams): Promise<PaginatedResponse<QuestionBank>> {
  const queryParams = new URLSearchParams();
  
  if (params?.page !== undefined) queryParams.append('page', params.page.toString());
  if (params?.size !== undefined) queryParams.append('size', params.size.toString());
  if (params?.sort) queryParams.append('sort', params.sort);
  
  const url = `${API_BASE}/question-banks${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
  const res = await fetchWithAuth(url);
  
  return res.json();
}

/**
 * Get question bank by ID
 */
export async function getQuestionBankById(bankId: number): Promise<QuestionBank> {
  const res = await fetchWithAuth(`${API_BASE}/question-banks/${bankId}`);
  return res.json();
}

/**
 * Update question bank
 */
export async function updateQuestionBank(
  bankId: number, 
  data: UpdateQuestionBankRequest
): Promise<QuestionBank> {
  const res = await fetchWithAuth(`${API_BASE}/question-banks/${bankId}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
  
  return res.json();
}

/**
 * Delete question bank
 */
export async function deleteQuestionBank(bankId: number): Promise<void> {
  const res = await fetchWithAuth(`${API_BASE}/question-banks/${bankId}`, {
    method: 'DELETE',
  });
  
  // If response has no content, just return
  if (res.status === 204 || res.headers.get('content-length') === '0') {
    return;
  }
  
  // Otherwise, parse JSON response if exists
  return res.json();
}

/**
 * Change question bank visibility
 */
export async function changeQuestionBankVisibility(
  bankId: number, 
  visibility: 'PRIVATE' | 'ORG' | 'PUBLIC'
): Promise<QuestionBank> {
  const url = `${API_BASE}/question-banks/${bankId}/visibility?visibility=${visibility}`;
  const res = await fetchWithAuth(url, {
    method: 'PATCH',
  });
  
  return res.json();
}

/**
 * Get question banks by subject
 */
export async function getQuestionBanksBySubject(
  subjectId: number, 
  params?: PageParams
): Promise<PaginatedResponse<QuestionBank>> {
  const queryParams = new URLSearchParams();
  
  if (params?.page !== undefined) queryParams.append('page', params.page.toString());
  if (params?.size !== undefined) queryParams.append('size', params.size.toString());
  if (params?.sort) queryParams.append('sort', params.sort);
  
  const url = `${API_BASE}/question-banks/subject/${subjectId}${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
  const res = await fetchWithAuth(url);
  
  return res.json();
}

/**
 * Get question banks by user
 */
export async function getQuestionBanksByUser(
  userId: number, 
  params?: PageParams
): Promise<PaginatedResponse<QuestionBank>> {
  const queryParams = new URLSearchParams();
  
  if (params?.page !== undefined) queryParams.append('page', params.page.toString());
  if (params?.size !== undefined) queryParams.append('size', params.size.toString());
  if (params?.sort) queryParams.append('sort', params.sort);
  
  const url = `${API_BASE}/question-banks/user/${userId}${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
  const res = await fetchWithAuth(url);
  
  return res.json();
}

/**
 * Search question banks
 */
export async function searchQuestionBanks(
  keyword: string, 
  params?: PageParams
): Promise<PaginatedResponse<QuestionBank>> {
  const queryParams = new URLSearchParams();
  
  queryParams.append('keyword', keyword);
  if (params?.page !== undefined) queryParams.append('page', params.page.toString());
  if (params?.size !== undefined) queryParams.append('size', params.size.toString());
  if (params?.sort) queryParams.append('sort', params.sort);
  
  const url = `${API_BASE}/question-banks/search?${queryParams.toString()}`;
  const res = await fetchWithAuth(url);
  
  return res.json();
}

/**
 * Get question count in bank
 */
export async function getQuestionCountInBank(bankId: number): Promise<number> {
  const res = await fetchWithAuth(`${API_BASE}/question-banks/${bankId}/question-count`);
  return res.json();
}

/**
 * Check if bank is accessible to current user
 */
export async function isQuestionBankAccessible(bankId: number): Promise<boolean> {
  const res = await fetchWithAuth(`${API_BASE}/question-banks/${bankId}/accessible`);
  return res.json();
}

/**
 * Clone question bank
 */
export async function cloneQuestionBank(
  bankId: number, 
  newName?: string
): Promise<QuestionBank> {
  const res = await fetchWithAuth(`${API_BASE}/question-banks/clone`, {
    method: 'POST',
    body: JSON.stringify({ bankId, newName }),
  });
  
  return res.json();
}

/**
 * Export question bank
 */
export async function exportQuestionBank(
  bankId: number, 
  format: 'json' | 'csv' | 'pdf' = 'json'
): Promise<Blob> {
  const res = await fetchWithAuth(`${API_BASE}/question-banks/${bankId}/export?format=${format}`);
  
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(text || `HTTP ${res.status}`);
  }
  
  return res.blob();
}

/**
 * Get question bank statistics
 */
export async function getQuestionBankStatistics(): Promise<{
  totalBanks: number;
  totalQuestions: number;
  publicBanks: number;
  privateBanks: number;
  orgBanks: number;
}> {
  const res = await fetchWithAuth(`${API_BASE}/question-banks/statistics`);
  return res.json();
}

/**
 * Get all accessible question banks for current user
 * (Combines public, org, and user's own banks)
 */
export async function getAccessibleQuestionBanks(
  params?: PageParams
): Promise<PaginatedResponse<QuestionBank>> {
  const queryParams = new URLSearchParams();
  
  if (params?.page !== undefined) queryParams.append('page', params.page.toString());
  if (params?.size !== undefined) queryParams.append('size', params.size.toString());
  if (params?.sort) queryParams.append('sort', params.sort);
  
  const url = `${API_BASE}/question-banks/accessible${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
  const res = await fetchWithAuth(url);
  
  return res.json();
}

/**
 * Get user's question banks (created by current user)
 */
export async function getMyQuestionBanks(
  params?: PageParams
): Promise<PaginatedResponse<QuestionBank>> {
  // Assuming there's a "me" endpoint or we get userId from token
  const queryParams = new URLSearchParams();
  
  if (params?.page !== undefined) queryParams.append('page', params.page.toString());
  if (params?.size !== undefined) queryParams.append('size', params.size.toString());
  if (params?.sort) queryParams.append('sort', params.sort);
  
  const url = `${API_BASE}/question-banks/me${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
  const res = await fetchWithAuth(url);
  
  return res.json();
}

/**
 * Validate question bank name (check if exists for subject)
 */
export async function validateQuestionBankName(
  name: string, 
  subjectId: number
): Promise<{ valid: boolean; message?: string }> {
  try {
    const res = await fetchWithAuth(
      `${API_BASE}/question-banks/validate-name?name=${encodeURIComponent(name)}&subjectId=${subjectId}`
    );
    return res.json();
  } catch (error) {
    return { valid: false, message: 'Validation failed' };
  }
}

// Utility function to download exported file
export function downloadBlob(blob: Blob, filename: string): void {
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
}

// Example usage with AbortSignal
export async function fetchQuestionBanksWithSignal(
  signal?: AbortSignal,
  params?: PageParams
): Promise<PaginatedResponse<QuestionBank>> {
  const queryParams = new URLSearchParams();
  
  if (params?.page !== undefined) queryParams.append('page', params.page.toString());
  if (params?.size !== undefined) queryParams.append('size', params.size.toString());
  if (params?.sort) queryParams.append('sort', params.sort);
  
  const url = `${API_BASE}/question-banks${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
  const res = await fetchWithAuth(url, { signal });
  
  return res.json();
}

// Batch operations
export async function batchUpdateQuestionBanksVisibility(
  bankIds: number[], 
  visibility: 'PRIVATE' | 'ORG' | 'PUBLIC'
): Promise<{ success: boolean; message: string }> {
  const res = await fetchWithAuth(`${API_BASE}/question-banks/batch-visibility`, {
    method: 'POST',
    body: JSON.stringify({ bankIds, visibility }),
  });
  
  return res.json();
}

export async function batchDeleteQuestionBanks(
  bankIds: number[]
): Promise<{ success: boolean; message: string }> {
  const res = await fetchWithAuth(`${API_BASE}/question-banks/batch-delete`, {
    method: 'POST',
    body: JSON.stringify({ bankIds }),
  });
  
  return res.json();
}

// Get recent question banks
export async function getRecentQuestionBanks(limit: number = 5): Promise<QuestionBank[]> {
  const res = await fetchWithAuth(`${API_BASE}/question-banks/recent?limit=${limit}`);
  return res.json();
}

// Get popular question banks (most questions)
export async function getPopularQuestionBanks(limit: number = 5): Promise<QuestionBank[]> {
  const res = await fetchWithAuth(`${API_BASE}/question-banks/popular?limit=${limit}`);
  return res.json();
}