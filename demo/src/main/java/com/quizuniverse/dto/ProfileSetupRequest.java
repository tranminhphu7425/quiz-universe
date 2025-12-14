package com.quizuniverse.dto;

public class ProfileSetupRequest {
    private String university; // university_code
    private String major;      // major name hoặc major_id tuỳ bạn
    private Integer intakeYear;

    // getters/setters
    public String getUniversity() { return university; }
    public void setUniversity(String university) { this.university = university; }

    public String getMajor() { return major; }
    public void setMajor(String major) { this.major = major; }

    public Integer getIntakeYear() { return intakeYear; }
    public void setIntakeYear(Integer intakeYear) { this.intakeYear = intakeYear; }
}
