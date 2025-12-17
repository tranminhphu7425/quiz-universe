package com.quizuniverse.controller;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.quizuniverse.dto.QuestionDTO;
import com.quizuniverse.dto.UpdateQuestionPayload;
import com.quizuniverse.entity.Question;
import com.quizuniverse.service.QuestionService;

@RestController
@RequestMapping("/api/questions")
@CrossOrigin(
        origins = "http://localhost:5173",
        allowedHeaders = {"Content-Type", "Authorization"},
        methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE, RequestMethod.OPTIONS},
        allowCredentials = "true", // nếu có gửi cookie/authorization
        maxAge = 3600
)
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

    @GetMapping("/question-bank/{bankId}")
    public ResponseEntity<List<QuestionDTO>> getQuestionsByQuestionBank(
            @PathVariable Long bankId) {
        List<QuestionDTO> questions = questionService.getQuestionsByBankId(bankId);
        return ResponseEntity.ok(questions);
    }


    @GetMapping("/count")
    public ResponseEntity<Long> getTotalQuestionCount() {
        Long count = questionService.getTotalQuestionCount();
        return ResponseEntity.ok(count);
    }

    @PutMapping("/{id}")
    public ResponseEntity<QuestionDTO> updateQuestion(
            @PathVariable Long id,
            @RequestBody UpdateQuestionPayload payload) {
        QuestionDTO updated = questionService.updateQuestion(id, payload);
        return ResponseEntity.ok(updated);
    }

    @PostMapping("/subject/{subjectId}")
    public ResponseEntity<Question> createQuestion(
            @PathVariable Long subjectId,
            @RequestBody QuestionDTO dto
    ) {
        Question question = questionService.createQuestion(subjectId, dto);
        return ResponseEntity.ok(question);
    }

    // Thêm phương thức này vào QuestionController.java (sau phương thức createQuestion)
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteQuestion(@PathVariable Long id) {
        try {
            questionService.deleteQuestion(id);
            return ResponseEntity.noContent().build(); // HTTP 204 No Content
        } catch (RuntimeException e) {
            return ResponseEntity.status(404).body(Map.of(
                    "error", e.getMessage(),
                    "timestamp", LocalDateTime.now()
            ));
        }
    }


    

}
