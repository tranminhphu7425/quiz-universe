package com.quizuniverse.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class HeroStatsDTO {
    private long totalBanks;
    private long totalQuestions;
    private long totalSubjects;
    private long totalUniversities;
    private long totalExams;
}
