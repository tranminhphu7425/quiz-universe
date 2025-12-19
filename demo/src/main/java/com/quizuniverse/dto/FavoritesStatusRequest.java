package com.quizuniverse.dto;

import lombok.Data;
import java.util.List;

@Data
public class FavoritesStatusRequest {
    private List<Long> bankIds;
    private List<Long> subjectIds;
}