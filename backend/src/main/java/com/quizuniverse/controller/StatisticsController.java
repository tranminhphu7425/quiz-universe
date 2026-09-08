package com.quizuniverse.controller;

import com.quizuniverse.dto.HeroStatsDTO;
import com.quizuniverse.service.StatisticsService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/statistics")
@RequiredArgsConstructor
@Tag(name = "Statistics", description = "APIs for global statistics")
public class StatisticsController {

    private final StatisticsService statisticsService;

    @GetMapping("/hero")
    @Operation(summary = "Get aggregated statistics for hero section")
    public ResponseEntity<HeroStatsDTO> getHeroStats() {
        return ResponseEntity.ok(statisticsService.getHeroStats());
    }
}
