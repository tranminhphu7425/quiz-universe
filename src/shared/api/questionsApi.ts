const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:8080/api";

export type Question = {
  id: number;
  stem: string;
  explanation?: string | null;
  questionType: "mcq_single" | "mcq_multi" | string;
  status: "approved" | "draft" | "rejected" | string;
  createdAt: string;
  updatedAt?: string;
  options: QuestionOption[];
};


export type QuestionOption = {
  id: number;
  label: string;        // "A" | "B" | ...
  content: string;
  isCorrect: boolean;
  sortOrder?: number;
};


export async function fetchQuestionsBySubjectId(subjectId: number, signal?: AbortSignal): Promise<Question[]> {
    const res = await fetch(`${API_BASE}/questions/subject/${subjectId}`, { signal });

    if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(text || `HTTP ${res.status}`);
    }
    const json = (await res.json()) as Question[];
    return Array.isArray(json) ? (json as Question[]) : [];
}