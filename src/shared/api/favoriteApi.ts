// src/shared/api/favoriteApi.ts

import { apiService } from './api';
import {
  FavoriteQuestionBank,
  FavoriteSubject,
} from '../types/favorite';

export const FavoriteApi = {
  // Question Bank Favorites
  addQuestionBank(bankId: number): Promise<FavoriteQuestionBank> {
    return apiService.post(`/favorites/question-banks/${bankId}`);
  },

  removeQuestionBank(bankId: number): Promise<void> {
    return apiService.delete(`/favorites/question-banks/${bankId}`);
  },

  getQuestionBanks(): Promise<FavoriteQuestionBank[]> {
    return apiService.get(`/favorites/question-banks`);
  },

  checkQuestionBank(bankId: number): Promise<boolean> {
    return apiService.get(`/favorites/question-banks/${bankId}/status`);
  },

  // Subject Favorites
  addSubject(subjectId: number): Promise<FavoriteSubject> {
    return apiService.post(`/favorites/subjects/${subjectId}`);
  },

  removeSubject(subjectId: number): Promise<void> {
    return apiService.delete(`/favorites/subjects/${subjectId}`);
  },

  getSubjects(): Promise<FavoriteSubject[]> {
    return apiService.get(`/favorites/subjects`);
  },

  checkSubject(subjectId: number): Promise<boolean> {
    return apiService.get(`/favorites/subjects/${subjectId}/status`);
  },
};

// Duy trì tên cũ để tránh breaking changes nếu chưa kịp sửa hết ở Component
export const favoriteService = FavoriteApi;

export const addFavoriteQuestionBank = FavoriteApi.addQuestionBank;
export const removeFavoriteQuestionBank = FavoriteApi.removeQuestionBank;
export const getFavoriteQuestionBanks = FavoriteApi.getQuestionBanks;
export const checkQuestionBankFavorite = FavoriteApi.checkQuestionBank;
export const addFavoriteSubject = FavoriteApi.addSubject;
export const removeFavoriteSubject = FavoriteApi.removeSubject;
export const getFavoriteSubjects = FavoriteApi.getSubjects;
export const checkSubjectFavorite = FavoriteApi.checkSubject;
