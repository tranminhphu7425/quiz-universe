package com.quizuniverse.dto;

import lombok.Data;

@Data
public class ToggleFavoriteResponse {
    private String userId;
    private Long targetId;
    private FavoriteType type;
    private boolean added;
    private String message;
}