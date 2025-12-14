package com.quizuniverse.dto;


public class QuestionOptionDTO {
    private Long id;
    private String label;
    private String content;
    private Boolean isCorrect;
    private Integer sortOrder;
    
    // Thêm setter methods thủ công nếu Lombok không hoạt động
    public void setId(Long id) {
        this.id = id;
    }
    
    public void setLabel(String label) {
        this.label = label;
    }
    
    public void setContent(String content) {
        this.content = content;
    }
    
    public void setIsCorrect(Boolean isCorrect) {
        this.isCorrect = isCorrect;
    }
    
    public void setSortOrder(Integer sortOrder) {
        this.sortOrder = sortOrder;
    }
    
    // Getter methods (nếu cần)
    public Long getId() {
        return id;
    }
    
    public String getLabel() {
        return label;
    }
    
    public String getContent() {
        return content;
    }
    
    public Boolean getIsCorrect() {
        return isCorrect;
    }
    
    public Integer getSortOrder() {
        return sortOrder;
    }
}