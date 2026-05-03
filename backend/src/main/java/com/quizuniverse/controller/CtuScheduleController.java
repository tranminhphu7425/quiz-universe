package com.quizuniverse.controller;

import java.util.Map;
import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.quizuniverse.service.CtuScheduleService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/ctu-schedule")
@RequiredArgsConstructor
public class CtuScheduleController {

    private final CtuScheduleService ctuScheduleService;

    @GetMapping
    public ResponseEntity<?> getMySchedule(Authentication authentication) {
        if (authentication == null || authentication.getName() == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message", "Unauthorized"));
        }

        UUID userId = UUID.fromString(authentication.getName());
        return ResponseEntity.ok(
            ctuScheduleService.getScheduleForUser(userId.toString()).orElse(null)
        );
    }

    @PutMapping
    public ResponseEntity<?> saveMySchedule(
        @RequestBody Map<String, Object> payload,
        Authentication authentication
    ) {
        if (authentication == null || authentication.getName() == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message", "Unauthorized"));
        }

        UUID userId = UUID.fromString(authentication.getName());
        return ResponseEntity.ok(ctuScheduleService.saveScheduleForUser(userId.toString(), payload));
    }
}

