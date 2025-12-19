package com.quizuniverse.dto;

import java.time.LocalDateTime;

import lombok.Data;

@Data
public class FavoriteQuestionBankDTO {
    private String userId;
    private Long bankId;
    private String subjectName;
    private String bankName;
    private String bankDescription;
    private LocalDateTime createdAt;
}