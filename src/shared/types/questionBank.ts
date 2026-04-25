export enum QuestionBankVisibility {
  PRIVATE = 'PRIVATE',
  ORG = 'ORG',
  PUBLIC = 'PUBLIC'
}

export interface QuestionBank {
  bankId: number;
  name: string;
  subjectId: number;
  description?: string;
  visibility: QuestionBankVisibility;
  status: "ACTIVE" | "DELETED";
  createdBy: string; // UUID string
  createdAt: string;
  updatedAt?: string;
  
  // UI/Extra fields usually provided by backend JOINs
  subjectName?: string;
  creatorName?: string;
  questionCount?: number;
  viewCount?: number;
}

export interface CreateQuestionBankRequest {
  name: string;
  subjectId: number;
  description?: string;
  visibility?: QuestionBankVisibility;
}

export interface UpdateQuestionBankRequest {
  name?: string;
  description?: string;
  visibility?: QuestionBankVisibility;
  status?: "ACTIVE" | "DELETED";
}

export interface QuestionBankStats {
  totalBanks: number;
  totalQuestions: number;
  publicBanks: number;
  privateBanks: number;
}