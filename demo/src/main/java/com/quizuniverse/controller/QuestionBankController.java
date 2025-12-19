// QuestionBankController.java
package com.quizuniverse.controller;

import com.quizuniverse.dto.CreateQuestionBankRequest;
import com.quizuniverse.dto.QuestionBankDTO;
import com.quizuniverse.dto.UpdateQuestionBankRequest;
import com.quizuniverse.service.QuestionBankService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import java.util.Map;
import java.util.UUID;
@RestController
@RequestMapping("/api/question-banks")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
@RequiredArgsConstructor

@Tag(name = "Question Bank Management", description = "APIs for managing question banks")
public class QuestionBankController {
    
    private final QuestionBankService questionBankService;

    @PostMapping
    @Operation(summary = "Create a new question bank")
    public ResponseEntity<QuestionBankDTO> createQuestionBank(
            @Valid @RequestBody CreateQuestionBankRequest request,
            Authentication authentication
    ) {
        UUID userId = UUID.fromString(authentication.getName());
        QuestionBankDTO createdBank =
                questionBankService.createQuestionBank(request, userId);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdBank);
    }

    @PutMapping("/{bankId}")
    public ResponseEntity<QuestionBankDTO> updateQuestionBank(
            @PathVariable Long bankId,
            @Valid @RequestBody UpdateQuestionBankRequest request,
            Authentication authentication
    ) {
        UUID userId = UUID.fromString(authentication.getName());
        return ResponseEntity.ok(
                questionBankService.updateQuestionBank(bankId, request, userId)
        );
    }

    @GetMapping("/{bankId}")
    public ResponseEntity<QuestionBankDTO> getQuestionBankById(
            @PathVariable Long bankId,
            Authentication authentication
    ) {
        UUID userId = UUID.fromString(authentication.getName());
        return ResponseEntity.ok(
                questionBankService.getQuestionBankById(bankId, userId)
        );
    }

    @DeleteMapping("/{bankId}")
    public ResponseEntity<Void> deleteQuestionBank(
            @PathVariable Long bankId,
            Authentication authentication
    ) {
        UUID userId = UUID.fromString(authentication.getName());
        questionBankService.deleteQuestionBank(bankId, userId);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/visibility/{bankId}")
    public ResponseEntity<QuestionBankDTO> changeVisibility(
            @PathVariable Long bankId,
            @RequestParam String visibility,
            Authentication authentication
    ) {
        UUID userId = UUID.fromString(authentication.getName());
        return ResponseEntity.ok(
                questionBankService.changeVisibility(bankId, visibility, userId)
        );
    }

    @GetMapping("/accessible/{bankId}")
    public ResponseEntity<Boolean> isBankAccessible(
            @PathVariable Long bankId,
            Authentication authentication
    ) {
        UUID userId = UUID.fromString(authentication.getName());
        return ResponseEntity.ok(
                questionBankService.isBankAccessible(bankId, userId)
        );
    }

    // ===== PUBLIC APIs (không cần user) =====

    @GetMapping
    public ResponseEntity<Page<QuestionBankDTO>> getAllQuestionBanks(
            @PageableDefault(size = 20, sort = "createdAt") Pageable pageable
    ) {
        return ResponseEntity.ok(
                questionBankService.getAllQuestionBanks(pageable)
        );
    }

    @GetMapping("/subject/{subjectId}")
    public ResponseEntity<Page<QuestionBankDTO>> getQuestionBanksBySubject(
            @PathVariable Long subjectId,
            @PageableDefault(size = 20) Pageable pageable
    ) {
        return ResponseEntity.ok(
                questionBankService.getQuestionBanksBySubject(subjectId, pageable)
        );
    }

    @GetMapping("/search")
    public ResponseEntity<Page<QuestionBankDTO>> searchQuestionBanks(
            @RequestParam String keyword,
            @PageableDefault(size = 20) Pageable pageable
    ) {
        return ResponseEntity.ok(
                questionBankService.searchQuestionBanks(keyword, pageable)
        );
    }

    @GetMapping("/name/{id}")
    public ResponseEntity<Map<String, Object>> getQuestionBankName(@PathVariable long id) {
        String name = questionBankService.getQuestionBankNameById(id);
        return ResponseEntity.ok(Map.of("id", id, "name", name));
    }
}