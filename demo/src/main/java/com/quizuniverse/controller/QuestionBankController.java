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
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/question-banks")
@RequiredArgsConstructor
@Tag(name = "Question Bank Management", description = "APIs for managing question banks")
public class QuestionBankController {
    
    private final QuestionBankService questionBankService;
    
    @PostMapping
    @Operation(summary = "Create a new question bank")
    public ResponseEntity<QuestionBankDTO> createQuestionBank(
            @Valid @RequestBody CreateQuestionBankRequest request,
            @AuthenticationPrincipal Long userId) {
        
        QuestionBankDTO createdBank = questionBankService.createQuestionBank(request, userId);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdBank);
    }
    
    @PutMapping("/{bankId}")
    @Operation(summary = "Update an existing question bank")
    public ResponseEntity<QuestionBankDTO> updateQuestionBank(
            @PathVariable Long bankId,
            @Valid @RequestBody UpdateQuestionBankRequest request,
            @AuthenticationPrincipal Long userId) {
        
        QuestionBankDTO updatedBank = questionBankService.updateQuestionBank(bankId, request, userId);
        return ResponseEntity.ok(updatedBank);
    }
    
    @GetMapping("/{bankId}")
    @Operation(summary = "Get question bank by ID")
    public ResponseEntity<QuestionBankDTO> getQuestionBankById(
            @PathVariable Long bankId,
            @AuthenticationPrincipal Long userId) {
        
        QuestionBankDTO questionBank = questionBankService.getQuestionBankById(bankId, userId);
        return ResponseEntity.ok(questionBank);
    }
    
    @GetMapping
    @Operation(summary = "Get all question banks with pagination")
    public ResponseEntity<Page<QuestionBankDTO>> getAllQuestionBanks(
            @PageableDefault(size = 20, sort = "createdAt") Pageable pageable) {
        
        Page<QuestionBankDTO> banks = questionBankService.getAllQuestionBanks(pageable);
        return ResponseEntity.ok(banks);
    }
    
    @GetMapping("/subject/{subjectId}")
    @Operation(summary = "Get question banks by subject")
    public ResponseEntity<Page<QuestionBankDTO>> getQuestionBanksBySubject(
            @PathVariable Long subjectId,
            @PageableDefault(size = 20) Pageable pageable) {
        
        Page<QuestionBankDTO> banks = questionBankService.getQuestionBanksBySubject(subjectId, pageable);
        return ResponseEntity.ok(banks);
    }
    
    @GetMapping("/user/{userId}")
    @Operation(summary = "Get question banks by user")
    public ResponseEntity<Page<QuestionBankDTO>> getQuestionBanksByUser(
            @PathVariable Long userId,
            @PageableDefault(size = 20) Pageable pageable) {
        
        Page<QuestionBankDTO> banks = questionBankService.getQuestionBanksByUser(userId, pageable);
        return ResponseEntity.ok(banks);
    }
    
    @GetMapping("/search")
    @Operation(summary = "Search question banks")
    public ResponseEntity<Page<QuestionBankDTO>> searchQuestionBanks(
            @RequestParam String keyword,
            @PageableDefault(size = 20) Pageable pageable) {
        
        Page<QuestionBankDTO> banks = questionBankService.searchQuestionBanks(keyword, pageable);
        return ResponseEntity.ok(banks);
    }
    
    @DeleteMapping("/{bankId}")
    @Operation(summary = "Delete a question bank")
    public ResponseEntity<Void> deleteQuestionBank(
            @PathVariable Long bankId,
            @AuthenticationPrincipal Long userId) {
        
        questionBankService.deleteQuestionBank(bankId, userId);
        return ResponseEntity.noContent().build();
    }
    
    @PatchMapping("/{bankId}/visibility")
    @Operation(summary = "Change question bank visibility")
    public ResponseEntity<QuestionBankDTO> changeVisibility(
            @PathVariable Long bankId,
            @RequestParam String visibility,
            @AuthenticationPrincipal Long userId) {
        
        QuestionBankDTO updatedBank = questionBankService.changeVisibility(bankId, visibility, userId);
        return ResponseEntity.ok(updatedBank);
    }
    
    @GetMapping("/{bankId}/question-count")
    @Operation(summary = "Get question count in bank")
    public ResponseEntity<Long> getQuestionCount(@PathVariable Long bankId) {
        Long count = questionBankService.countQuestionsInBank(bankId);
        return ResponseEntity.ok(count);
    }
    
    @GetMapping("/{bankId}/accessible")
    @Operation(summary = "Check if user can access the question bank")
    public ResponseEntity<Boolean> isBankAccessible(
            @PathVariable Long bankId,
            @AuthenticationPrincipal Long userId) {
        
        boolean accessible = questionBankService.isBankAccessible(bankId, userId);
        return ResponseEntity.ok(accessible);
    }
}