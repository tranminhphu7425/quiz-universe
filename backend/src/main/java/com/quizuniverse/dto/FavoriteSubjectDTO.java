package com.quizuniverse.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class FavoriteSubjectDTO {
    private String userId;
    private Long subjectId;
    private String subjectName;
    private String subjectCode;
    private LocalDateTime createdAt;
}