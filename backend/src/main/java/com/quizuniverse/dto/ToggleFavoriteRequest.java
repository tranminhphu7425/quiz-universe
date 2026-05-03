package com.quizuniverse.dto;

import lombok.Data;

@Data
public class ToggleFavoriteRequest {
    private String userId;
    private Long targetId; // bankId hoặc subjectId
    private FavoriteType type; // QUESTION_BANK hoặc SUBJECT
}
