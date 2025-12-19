package com.quizuniverse.service;

import com.quizuniverse.dto.*;

import java.util.List;
import java.util.UUID;

public interface FavoriteService {
    
    // Question Bank Favorites
    FavoriteQuestionBankDTO addFavoriteQuestionBank(UUID userId, Long bankId);
    void removeFavoriteQuestionBank(UUID userId, Long bankId);
    boolean toggleFavoriteQuestionBank(UUID userId, Long bankId);
    List<FavoriteQuestionBankDTO> getUserFavoriteQuestionBanks(UUID userId);
    boolean isQuestionBankFavorite(UUID userId, Long bankId);
    
    // Subject Favorites
    FavoriteSubjectDTO addFavoriteSubject(UUID userId, Long subjectId);
    void removeFavoriteSubject(UUID userId, Long subjectId);
    boolean toggleFavoriteSubject(UUID userId, Long subjectId);
    List<FavoriteSubjectDTO> getUserFavoriteSubjects(UUID userId);
    boolean isSubjectFavorite(UUID userId, Long subjectId);
    
    // Combined operations
    UserFavoriteResponse getUserFavorites(UUID userId);
    ToggleFavoriteResponse toggleFavorite(ToggleFavoriteRequest request);
    FavoritesStatusResponse getFavoritesStatus(UUID userId, List<Long> bankIds, List<Long> subjectIds);
}