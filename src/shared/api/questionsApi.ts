import { apiService } from "@/shared/api/api";
import { Question, UpdateQuestionPayload } from "../types/question";

/* ===================== QUERY ===================== */

export function fetchQuestionsBySubjectId(
  subjectId: number,
  signal?: AbortSignal
): Promise<Question[]> {
  return apiService.get<Question[]>(
    `/questions/subject/${subjectId}`,
    { signal }
  );
}




export function fetchQuestionsByBankId(
  bankId: number,
  signal?: AbortSignal
): Promise<Question[]> {
  return apiService.get<Question[]>(
    `/questions/question-bank/${bankId}`,
    { signal }
  );
}

export function fetchTotalQuestionCount(
  signal?: AbortSignal
): Promise<number> {
  return apiService.get<number>(`/questions/count`, { signal });
}

/* ===================== MUTATION ===================== */

export function createQuestionApi(
  subjectId: number,
  payload: UpdateQuestionPayload
): Promise<Question> {
  return apiService.post<Question>(
    `/questions/subject/${subjectId}`,
    payload
  );
}

export function updateQuestionApi(
  qId: number,
  payload: UpdateQuestionPayload
): Promise<Question> {
  return apiService.put<Question>(
    `/questions/${qId}`,
    payload
  );
}

export function deleteQuestionApi(qId: number): Promise<void> {
  return apiService.delete<void>(`/questions/${qId}`);
}
