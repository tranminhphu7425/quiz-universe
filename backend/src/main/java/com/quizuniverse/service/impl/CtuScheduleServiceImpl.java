package com.quizuniverse.service.impl;

import java.util.Collections;
import java.util.Map;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.quizuniverse.entity.CtuSchedule;
import com.quizuniverse.repository.CtuScheduleRepository;
import com.quizuniverse.service.CtuScheduleService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CtuScheduleServiceImpl implements CtuScheduleService {

    private final CtuScheduleRepository ctuScheduleRepository;
    private final ObjectMapper objectMapper;

    @Override
    public Optional<Map<String, Object>> getScheduleForUser(String userId) {
        return ctuScheduleRepository.findByUserId(userId).map(row -> {
            try {
                if (row.getDataJson() == null || row.getDataJson().isBlank()) {
                    return Collections.<String, Object>emptyMap();
                }
                return objectMapper.readValue(row.getDataJson(), new TypeReference<Map<String, Object>>() {
                });
            } catch (Exception e) {
                // Nếu dữ liệu cũ hỏng/không parse được, trả empty để frontend không crash
                return Collections.<String, Object>emptyMap();
            }
        });
    }

    @Override
    public Map<String, Object> saveScheduleForUser(String userId, Map<String, Object> payload) {
        try {
            String json = objectMapper.writeValueAsString(payload);

            CtuSchedule row = ctuScheduleRepository.findByUserId(userId).orElseGet(CtuSchedule::new);
            row.setUserId(userId);
            row.setDataJson(json);
            ctuScheduleRepository.save(row);

            return payload;
        } catch (Exception e) {
            throw new RuntimeException("Failed to save CTU schedule", e);
        }
    }
}

