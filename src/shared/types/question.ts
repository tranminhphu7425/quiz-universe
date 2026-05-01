export type QuestionType = 'mcq_single' | 'mcq_multi' | 'true_false' | 'fill_in';
export type QuestionStatus = 'draft' | 'review' | 'approved' | 'retired';

export interface QuestionOption {
  optionId: number;
  questionId: number;
  label: string;
  content: string;
  isCorrect: boolean;
  feedback?: string;
  sortOrder: number;
  imageUrl?: string;
}

export interface Question {
  questionId: number;
  bankId?: number;
  subjectId: number;
  stem: string;
  explanation?: string;
  difficultyId?: number;
  bloomId?: number;
  questionType: QuestionType;
  status: QuestionStatus;
  sourceId?: number;
  sectionId?: number;
  createdBy?: string;
  updatedBy?: string;
  createdAt: string;
  updatedAt?: string;
  versionNo: number;
  imageUrl?: string;

  // Relations
  options?: QuestionOption[];
}

export interface QuestionVersion {
  qvId: number;
  questionId: number;
  versionNo: number;
  stem?: string;
  explanation?: string;
  updatedBy?: string;
  updatedAt: string;
  changeNote?: string;
}

export type UpdateQuestionPayload = Omit<Partial<Question>, 'options'> & {
  options?: Array<Partial<QuestionOption>>;
};
