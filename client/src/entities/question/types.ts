export type QuestionBrief = {
  question_id: number;
  stem: string;
  question_type: 'mcq_single' | 'mcq_multi' | 'true_false';
  difficulty: string;
  subject_code: string;
};

export type QuestionOption = {
  option_id: number;
  label: string;        // A, B, C...
  content: string;
  is_correct: 0 | 1 | boolean;
  sort_order: number;
};

export type QuestionFull = {
  question_id: number;
  stem: string;
  explanation?: string | null;
  difficulty?: string;
  bloom?: string | null;
  question_type: 'mcq_single' | 'mcq_multi' | 'true_false';
  options: QuestionOption[];
};
