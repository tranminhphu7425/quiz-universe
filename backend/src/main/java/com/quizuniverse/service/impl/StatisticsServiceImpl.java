package com.quizuniverse.service.impl;

import com.quizuniverse.dto.HeroStatsDTO;
import com.quizuniverse.entity.QuestionBank;
import com.quizuniverse.repository.QuestionBankRepository;
import com.quizuniverse.repository.QuestionRepository;
import com.quizuniverse.repository.SubjectRepository;
import com.quizuniverse.repository.UniversityRepository;
import com.quizuniverse.service.StatisticsService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class StatisticsServiceImpl implements StatisticsService {

    private final QuestionBankRepository questionBankRepository;
    private final QuestionRepository questionRepository;
    private final SubjectRepository subjectRepository;
    private final UniversityRepository universityRepository;

    @Override
    public HeroStatsDTO getHeroStats() {
        long banks = questionBankRepository.countByStatusNot(QuestionBank.Status.DELETED);
        return HeroStatsDTO.builder()
                .totalBanks(banks)
                .totalQuestions(questionRepository.count())
                .totalSubjects(subjectRepository.count())
                .totalUniversities(universityRepository.count())
                .totalExams(banks * 5 + 120) // Mock: 5 exams per bank + 120 baseline
                .build();
    }
}
