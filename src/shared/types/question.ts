export type QuestionOption = {
  id: number;
  label: string;
  content: string;
  isCorrect: boolean;
  sortOrder?: number;
};

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

export type UpdateQuestionPayload =
  Omit<Partial<Question>, 'options'> & {
    options?: Array<Partial<QuestionOption>>;
  };
