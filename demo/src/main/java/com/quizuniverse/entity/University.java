package com.quizuniverse.entity;

import jakarta.persistence.Id;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name = "universities")

public class University {
    @Id
    private String universityCode;
    private String universityName;
    public String getUniversityCode() {
        return universityCode;
    }
    public void setUniversityCode(String universityCode) {
        this.universityCode = universityCode;
    }
    public String getUniversityName() {
        return universityName;
    }
    public void setUniversityName(String universityName) {
        this.universityName = universityName;
    }

    
}
