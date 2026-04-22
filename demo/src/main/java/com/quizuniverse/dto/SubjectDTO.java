package com.quizuniverse.dto;

import java.time.LocalDateTime;

public class SubjectDTO {
    private Long id;
    private String code;
    private String name;
    private String description;
    private Long credit;
    private LocalDateTime createdAt;
    
    // Setter methods
    public void setId(Long id) {
        this.id = id;
    }
    
    public void setCode(String code) {
        this.code = code;
    }
    
    public void setName(String name) {
        this.name = name;
    }
    
    public void setDescription(String description) {
        this.description = description;
    }

    public void setCredit(Long credit) {
        this.credit = credit;
    }
    
    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
    
    // Getter methods (nếu cần)
    public Long getId() {
        return id;
    }
    
    public String getCode() {
        return code;
    }
    
    public String getName() {
        return name;
    }
    
    public String getDescription() {
        return description;
    }

    public Long getCredit() {
        return credit;
    }
    
    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
}