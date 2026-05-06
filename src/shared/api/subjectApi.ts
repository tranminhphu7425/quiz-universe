import { apiService, publicApiService } from "@/shared/api/api";
import { Subject, SubjectNameResponse } from "../types/subject";
import { PageParams, PaginatedResponse } from "../types/pagination";

export const SubjectApi = {
  /* ===================== QUERY ===================== */

  /**
   * Lấy tên môn học theo ID
   */
  getName(subjectId: number, signal?: AbortSignal): Promise<SubjectNameResponse> {
    return apiService.get<SubjectNameResponse>(
      `/subjects/${subjectId}/name`,
      { signal }
    );
  },

  /**
   * Lấy thông tin đầy đủ của một môn học theo ID
   */
  getById(subjectId: number, signal?: AbortSignal): Promise<Subject> {
    return publicApiService.get<Subject>(
      `/subjects/${subjectId}`,
      { signal }
    );
  },

  /**
   * Lấy toàn bộ danh sách môn học
   */
  getAll(signal?: AbortSignal): Promise<Subject[]> {
    return apiService.get<Subject[]>(
      `/subjects/all`,
      { signal }
    );
  },

  /**
   * Lấy danh sách môn học có phân trang
   */
  getList(params?: PageParams, signal?: AbortSignal): Promise<PaginatedResponse<Subject>> {
    return publicApiService.get<PaginatedResponse<Subject>>(
      `/subjects`,
      { params, signal }
    );
  },

  /* ===================== MUTATION ===================== */

  /**
   * Tạo môn học mới
   */
  create(data: Partial<Subject>, signal?: AbortSignal): Promise<Subject> {
    return apiService.post<Subject>(
      `/subjects/create`,
      data,
      { signal }
    );
  },

  /**
   * Cập nhật môn học
   */
  update(id: number, data: Partial<Subject>, signal?: AbortSignal): Promise<Subject> {
    return apiService.put<Subject>(
      `/subjects/${id}`,
      data,
      { signal }
    );
  },

  /**
   * Xóa môn học
   */
  delete(id: number, signal?: AbortSignal): Promise<void> {
    return apiService.delete<void>(
      `/subjects/${id}`,
      { signal }
    );
  },
};

// Aliases for backward compatibility if needed during migration
export const fetchSubjectById = SubjectApi.getById;
export const fetchSubjects = SubjectApi.getList;
export const fetchSubjectNameById = SubjectApi.getName;
export const fetchAllSubjects = SubjectApi.getAll;
export const createSubject = SubjectApi.create;
export const updateSubject = SubjectApi.update;
export const deleteSubject = SubjectApi.delete;
