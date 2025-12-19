package com.quizuniverse.dto;

import lombok.Data;
import java.util.List;

@Data
public class UserFavoriteResponse {
    private String userId;
    private String userName;
    private List<FavoriteQuestionBankDTO> favoriteQuestionBanks;
    private List<FavoriteSubjectDTO> favoriteSubjects;
}