package com.quizuniverse.controller;

import com.quizuniverse.dto.QuestionDTO;
import com.quizuniverse.service.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/questions")
@CrossOrigin(origins = "*")
public class QuestionController {

    private final QuestionService questionService;

    @Autowired
    public QuestionController(QuestionService questionService) {
        this.questionService = questionService;
    }

    @GetMapping("/subject/{subjectId}")
    public ResponseEntity<List<QuestionDTO>> getQuestionsBySubject(
            @PathVariable Long subjectId) {
        List<QuestionDTO> questions = questionService.getQuestionsBySubjectId(subjectId);
        return ResponseEntity.ok(questions);
    }

    @GetMapping("/count")
    public ResponseEntity<Long> getTotalQuestionCount() {
        Long count = questionService.getTotalQuestionCount();
        return ResponseEntity.ok(count);
    }
}