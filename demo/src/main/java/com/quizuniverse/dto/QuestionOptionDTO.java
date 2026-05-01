package com.quizuniverse.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class QuestionOptionDTO {
    private Long optionId;
    private String label;
    private String content;
    private Boolean isCorrect;
    private Integer sortOrder;
    private String imageUrl;
}