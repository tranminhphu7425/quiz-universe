package com.quizuniverse.dto;

import lombok.Data;
import java.util.Map;

@Data
public class FavoritesStatusResponse {
    private  String userId;
    private Map<Long, Boolean> questionBankStatus;
    private Map<Long, Boolean> subjectStatus;
}