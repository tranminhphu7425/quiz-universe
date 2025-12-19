// src/shared/api/education.api.ts
import { apiService } from "./api";
import type { University } from "../types/university";
import type { Major } from "../types/major";

export const EducationApi = {
  getUniversities(): Promise<University[]> {
    return apiService.get("/universities");
  },

  getMajors(): Promise<Major[]> {
    return apiService.get("/majors");
  },
};
