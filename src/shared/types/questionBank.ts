// src/api/types/questionBank.ts
export enum QuestionBankVisibility {
  PRIVATE = 'PRIVATE',
  ORG = 'ORG',
  PUBLIC = 'PUBLIC'
}

export interface QuestionBank {
  bankId: number;
  name: string;
  subjectId: number;
  subjectName: string;
  description?: string;
  visibility: QuestionBankVisibility;
  createdBy: number;
  creatorName: string;
  createdAt: string;
  updatedAt?: string;
  questionCount: number;
}

export interface CreateQuestionBankRequest {
  name: string;
  subjectId: number;
  description?: string;
  visibility?: QuestionBankVisibility;
}

export interface UpdateQuestionBankRequest {
  name: string;
  description?: string;
  visibility?: QuestionBankVisibility;
}

export interface QuestionBankStats {
  totalBanks: number;
  totalQuestions: number;
  publicBanks: number;
  privateBanks: number;
}