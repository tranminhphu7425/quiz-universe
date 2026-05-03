package com.quizuniverse.service;

import java.util.Map;
import java.util.Optional;

public interface CtuScheduleService {
    Optional<Map<String, Object>> getScheduleForUser(String userId);

    Map<String, Object> saveScheduleForUser(String userId, Map<String, Object> payload);
}

