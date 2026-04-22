import { apiService } from "@/shared/api/api";

export type CtuSchedulePayload = {
  addedCourses: unknown[];
  selectedClasses: unknown[];
  currentWeek?: number;
  savedAt?: string;
};

export function fetchMyCtuSchedule(signal?: AbortSignal): Promise<CtuSchedulePayload | null> {
  return apiService.get<CtuSchedulePayload | null>(`/ctu-schedule`, { signal });
}

export function saveMyCtuSchedule(payload: CtuSchedulePayload): Promise<CtuSchedulePayload> {
  return apiService.put<CtuSchedulePayload>(`/ctu-schedule`, payload);
}

