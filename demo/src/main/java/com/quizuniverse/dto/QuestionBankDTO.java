// QuestionBankDTO.java
package com.quizuniverse.dto;

import com.quizuniverse.entity.QuestionBank.Visibility;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class QuestionBankDTO {
    private Long bankId;
    private String name;
    private Long subjectId;
    private String subjectName;
    private String description;
    private Visibility visibility;
    private Long createdBy;
    private String creatorName;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private Integer questionCount;
}