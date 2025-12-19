// QuestionBankDTO.java
package com.quizuniverse.dto;

import com.quizuniverse.entity.QuestionBank.Visibility;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.UUID;

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
    private UUID createdBy;
    private String creatorName;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private Integer questionCount;
}