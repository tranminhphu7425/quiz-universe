import { apiService } from "@/shared/api/api";
import { Question, UpdateQuestionPayload } from "../types/question";

export const QuestionApi = {
  /* ===================== QUERY ===================== */

  getBySubjectId(subjectId: number, signal?: AbortSignal): Promise<Question[]> {
    return apiService.get<Question[]>(
      `/questions/subject/${subjectId}`,
      { signal }
    );
  },

  getByBankId(bankId: number, signal?: AbortSignal): Promise<Question[]> {
    return apiService.get<Question[]>(
      `/questions/question-bank/${bankId}`,
      { signal }
    );
  },

  getTotalCount(signal?: AbortSignal): Promise<number> {
    return apiService.get<number>(`/questions/count`, { signal });
  },

  /* ===================== MUTATION ===================== */

  create(subjectId: number, payload: UpdateQuestionPayload): Promise<Question> {
    return apiService.post<Question>(
      `/questions/subject/${subjectId}`,
      payload
    );
  },

  createInBank(bankId: number, payload: UpdateQuestionPayload): Promise<Question> {
    return apiService.post<Question>(
      `/questions/question-bank/${bankId}`,
      payload
    );
  },

  update(qId: number, payload: UpdateQuestionPayload): Promise<Question> {
    return apiService.put<Question>(
      `/questions/${qId}`,
      payload
    );
  },

  delete(qId: number): Promise<void> {
    return apiService.delete<void>(`/questions/${qId}`);
  },
};

export const fetchQuestionsBySubjectId = QuestionApi.getBySubjectId;
export const fetchQuestionsByBankId = QuestionApi.getByBankId;
export const fetchTotalQuestionCount = QuestionApi.getTotalCount;
export const createQuestionApi = QuestionApi.create;
export const createQuestionInBankApi = QuestionApi.createInBank;
export const updateQuestionApi = QuestionApi.update;
export const deleteQuestionApi = QuestionApi.delete;
