package com.quizuniverse.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SubjectDTO {
    private Long subjectId;
    private String code;
    private String name;
    private String description;
    private Integer credit;
    private Integer bankCount;
    private LocalDateTime createdAt;
}