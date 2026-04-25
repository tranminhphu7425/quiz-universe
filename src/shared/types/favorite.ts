export interface FavoriteQuestionBank {
  userId: string;
  bankId: number;
  createdAt: string;
  subjectName?: string;
  
  // UI fields often joined
  bankName?: string;
  bankDescription?: string;
}

export interface FavoriteSubject {
  userId: string;
  subjectId: number;
  createdAt: string;
  
  // UI fields often joined
  subjectName?: string;
  subjectCode?: string;
}

export interface UserFavoriteResponse {
  userId: string;
  userName?: string;
  favoriteQuestionBanks: FavoriteQuestionBank[];
  favoriteSubjects: FavoriteSubject[];
}

export interface ToggleFavoriteRequest {
  userId?: string;
  targetId: number;
  type: FavoriteType;
}

export interface ToggleFavoriteResponse {
  userId: string;
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
  userId: string;
  questionBankStatus: Record<number, boolean>;
  subjectStatus: Record<number, boolean>;
}

export enum FavoriteType {
  QUESTION_BANK = 'QUESTION_BANK',
  SUBJECT = 'SUBJECT'
}
