package com.quizuniverse.dto;


import java.time.LocalDateTime;
import java.util.List;

public class QuestionDTO {
    private Long id;
    private String stem;
    private String explanation;
    private String questionType;
    private String status;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private List<QuestionOptionDTO> options;
    
    // Thêm getter/setter thủ công nếu không dùng Lombok
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public String getStem() {
        return stem;
    }
    
    public void setStem(String stem) {
        this.stem = stem;
    }
    
    public String getExplanation() {
        return explanation;
    }
    
    public void setExplanation(String explanation) {
        this.explanation = explanation;
    }
    
    public String getQuestionType() {
        return questionType;
    }
    
    public void setQuestionType(String questionType) {
        this.questionType = questionType;
    }
    
    public String getStatus() {
        return status;
    }
    
    public void setStatus(String status) {
        this.status = status;
    }
    
    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
    
    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
    
    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }
    
    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
    
    public List<QuestionOptionDTO> getOptions() {
        return options;
    }
    
    public void setOptions(List<QuestionOptionDTO> options) {
        this.options = options;
    }
}