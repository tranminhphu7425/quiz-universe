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

/**
 * Lấy toàn bộ danh sách môn học
 */
export function fetchAllSubjects(
  signal?: AbortSignal
): Promise<Subject[]> {
  return apiService.get<Subject[]>(
    `/subjects`,
    { signal }
  );
}
