import { apiService } from "@/shared/api/api";

export type CtuSchedulePayload = {
  addedCourses: unknown[];
  selectedClasses: unknown[];
  currentWeek?: number;
  savedAt?: string;
};

export const CtuScheduleApi = {
  getMySchedule(signal?: AbortSignal): Promise<CtuSchedulePayload | null> {
    return apiService.get<CtuSchedulePayload | null>(`/ctu-schedule`, { signal });
  },

  saveMySchedule(payload: CtuSchedulePayload): Promise<CtuSchedulePayload> {
    return apiService.put<CtuSchedulePayload>(`/ctu-schedule`, payload);
  }
};

export const fetchMyCtuSchedule = CtuScheduleApi.getMySchedule;
export const saveMyCtuSchedule = CtuScheduleApi.saveMySchedule;
