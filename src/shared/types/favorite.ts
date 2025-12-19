// src/services/favorites/types.ts

export interface FavoriteQuestionBank {
  userId: number;
  bankId: number;
  subjectName: string;
  bankName: string;
  bankDescription: string;
  createdAt: string;
}

export interface FavoriteSubject {
  userId: number;
  subjectId: number;
  subjectName: string;
  subjectCode: string;
  createdAt: string;
}

export interface UserFavoriteResponse {
  userId: number;
  userName: string;
  favoriteQuestionBanks: FavoriteQuestionBank[];
  favoriteSubjects: FavoriteSubject[];
}

export interface ToggleFavoriteRequest {
  userId: number;
  targetId: number;
  type: FavoriteType;
}

export interface ToggleFavoriteResponse {
  userId: number;
  targetId: number;
  type: FavoriteType;
  added: boolean;
  message: string;
}

export interface FavoritesStatusRequest {
  bankIds: number[];
  subjectIds: number[];
}

export interface FavoritesStatusResponse {
  userId: number;
  questionBankStatus: Record<number, boolean>;
  subjectStatus: Record<number, boolean>;
}

export enum FavoriteType {
  QUESTION_BANK = 'QUESTION_BANK',
  SUBJECT = 'SUBJECT'
}
