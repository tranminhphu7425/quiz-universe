// UpdateQuestionBankRequest.java
package com.quizuniverse.dto;

import com.quizuniverse.entity.QuestionBank;
import com.quizuniverse.entity.QuestionBank.Visibility;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class UpdateQuestionBankRequest {
    
    @NotBlank(message = "Bank name is required")
    private String name;
    
    private String description;
    
    private Visibility visibility;
}