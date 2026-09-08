import { publicApiService } from "./api";

export interface HeroStats {
  totalBanks: number;
  totalQuestions: number;
  totalSubjects: number;
  totalUniversities: number;
  totalExams: number;
}

export const HeroApi = {
  getStatistics(): Promise<HeroStats> {
    return publicApiService.get<HeroStats>("/statistics/hero");
  },
};
