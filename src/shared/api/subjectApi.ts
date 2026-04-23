import { apiService } from "@/shared/api/api";
import { Subject, SubjectNameResponse } from "../types/subject";

/* ===================== QUERY ===================== */

/**
 * Lấy tên môn học theo ID
 */
export function fetchSubjectNameById(
  subjectId: number,
  signal?: AbortSignal
): Promise<SubjectNameResponse> {
  return apiService.get<SubjectNameResponse>(
    `/subjects/${subjectId}/name`,
    { signal }
  );
}

import { PageParams, PaginatedResponse } from "../types/pagination";

/**
 * Lấy toàn bộ danh sách môn học
 */
export function fetchAllSubjects(
  signal?: AbortSignal
): Promise<Subject[]> {
  return apiService.get<Subject[]>(
    `/subjects/all`,
    { signal }
  );
}

/**
 * Lấy danh sách môn học có phân trang
 */
export function fetchSubjects(
  params?: PageParams,
  signal?: AbortSignal
): Promise<PaginatedResponse<Subject>> {
  return apiService.get<PaginatedResponse<Subject>>(
    `/subjects`,
    { params, signal }
  );
}

/**
 * Tạo môn học mới
 */
export function createSubject(
  data: Partial<Subject>,
  signal?: AbortSignal
): Promise<Subject> {
  return apiService.post<Subject>(
    `/subjects/create`,
    data,
    { signal }
  );
}

/**
 * Cập nhật môn học
 */
export function updateSubject(
  id: number,
  data: Partial<Subject>,
  signal?: AbortSignal
): Promise<Subject> {
  return apiService.put<Subject>(
    `/subjects/${id}`,
    data,
    { signal }
  );
}

/**
 * Xóa môn học
 */
export function deleteSubject(
  id: number,
  signal?: AbortSignal
): Promise<void> {
  return apiService.delete<void>(
    `/subjects/${id}`,
    { signal }
  );
}
