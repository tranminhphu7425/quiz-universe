const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:8080/api";

export type Question = {
  id: number;
  stem: string;
  explanation?: string | null;
  questionType: 'mcq_single' | 'mcq_multiple' | 'fill_in' | string;
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


export async function fetchTotalQuestionCount(signal?: AbortSignal): Promise<number> {
  const res = await fetch(`${API_BASE}/questions/count`, { signal });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(text || `HTTP ${res.status}`);
  }
  const json = (await res.json()) as number;
  return typeof json === 'number' ? json : 0;
}


// ===== API (minimal) =====
export async function updateQuestionApi(qId: number, payload: UpdateQuestionPayload ) {
  const res = await fetch(`${API_BASE}/questions/${qId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(text || `HTTP ${res.status}`);
  }
  return (await res.json()) as Question;
}


export type UpdateQuestionPayload = Omit<Partial<Question>, 'options'> & { options?: Array<Partial<QuestionOption>>; };