// CreateQuestionBankRequest.java
package com.quizuniverse.dto;

import com.quizuniverse.entity.QuestionBank;
import com.quizuniverse.entity.QuestionBank.Visibility;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class CreateQuestionBankRequest {
    
    @NotBlank(message = "Bank name is required")
    private String name;
    
    @NotNull(message = "Subject ID is required")
    private Long subjectId;
    
    private String description;
    
    private Visibility visibility = Visibility.PRIVATE;
}