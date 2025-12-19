import { apiService, publicApiService } from "./api";
import type {
  QuestionBank,
  CreateQuestionBankRequest,
  UpdateQuestionBankRequest,
} from "../types/questionBank";
import type { PageParams, PaginatedResponse } from "../types/pagination";

export const QuestionBankApi = {
  create(data: CreateQuestionBankRequest) {
    return apiService.post<QuestionBank>("/question-banks", data);
  },

  getAll(params?: PageParams) {
    return apiService.get<PaginatedResponse<QuestionBank>>(
      "/question-banks",
      { params }
    );
  },

  getById(bankId: number) {
    return apiService.get<QuestionBank>(`/question-banks/${bankId}`);
  },

  update(bankId: number, data: UpdateQuestionBankRequest) {
    return apiService.put<QuestionBank>(
      `/question-banks/${bankId}`,
      data
    );
  },

  delete(bankId: number) {
    return apiService.delete<void>(`/question-banks/${bankId}`);
  },

  changeVisibility(bankId: number, visibility: string) {
    return apiService.patch<QuestionBank>(
      `/question-banks/${bankId}/visibility`,
      null,
      { params: { visibility } }
    );
  },

  getBySubject(subjectId: number, params?: PageParams) {
    return apiService.get<PaginatedResponse<QuestionBank>>(
      `/question-banks/subject/${subjectId}`,
      { params }
    );
  },

  getMine(params?: PageParams) {
    return apiService.get<PaginatedResponse<QuestionBank>>(
      "/question-banks/me",
      { params }
    );
  },

  search(keyword: string, params?: PageParams) {
    return apiService.get<PaginatedResponse<QuestionBank>>(
      "/question-banks/search",
      { params: { keyword, ...params } }
    );
  },

  clone(bankId: number, newName?: string) {
    return apiService.post<QuestionBank>(
      "/question-banks/clone",
      { bankId, newName }
    );
  },

  statistics() {
    return apiService.get<{
      totalBanks: number;
      totalQuestions: number;
      publicBanks: number;
      privateBanks: number;
      orgBanks: number;
    }>("/question-banks/statistics");
  },
};
