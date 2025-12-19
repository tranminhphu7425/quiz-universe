// src/services/favorites/favoriteService.ts

import { apiService } from './api';
import {
  FavoriteQuestionBank,
  FavoriteSubject,
} from '../types/favorite';

import { QuestionBank } from '../types/questionBank';

class FavoriteService {
  // Question Bank Favorites
  async addFavoriteQuestionBank(bankId: number): Promise<FavoriteQuestionBank> {
    return await apiService.post(`/favorites/question-banks/${bankId}`);
  }

  async removeFavoriteQuestionBank(bankId: number): Promise<void> {
    await apiService.delete(`/favorites/question-banks/${bankId}`);
  }

  async getFavoriteQuestionBanks(): Promise<FavoriteQuestionBank[]> {
    return await apiService.get(`/favorites/question-banks`);
  }

  async checkQuestionBankFavorite(bankId: number): Promise<boolean> {
    return await apiService.get(`/favorites/question-banks/${bankId}/status`);
  }

  // Subject Favorites
  async addFavoriteSubject(subjectId: number): Promise<FavoriteSubject> {
    return await apiService.post(`/favorites/subjects/${subjectId}`);
  }

  async removeFavoriteSubject(subjectId: number): Promise<void> {
    await apiService.delete(`/favorites/subjects/${subjectId}`);
  }

  async getFavoriteSubjects(): Promise<FavoriteSubject[]> {
    return await apiService.get(`/favorites/subjects`);
  }

  async checkSubjectFavorite(subjectId: number): Promise<boolean> {
    return await apiService.get(`/favorites/subjects/${subjectId}/status`);
  }
}

export const favoriteService = new FavoriteService();
