// QuestionBankService.java
package com.quizuniverse.service;

import com.quizuniverse.dto.CreateQuestionBankRequest;
import com.quizuniverse.dto.QuestionBankDTO;
import com.quizuniverse.dto.UpdateQuestionBankRequest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface QuestionBankService {
    
    QuestionBankDTO createQuestionBank(CreateQuestionBankRequest request, Long userId);
    
    QuestionBankDTO updateQuestionBank(Long bankId, UpdateQuestionBankRequest request, Long userId);
    
    QuestionBankDTO getQuestionBankById(Long bankId, Long userId);
    
    Page<QuestionBankDTO> getAllQuestionBanks(Pageable pageable);
    
    Page<QuestionBankDTO> getQuestionBanksBySubject(Long subjectId, Pageable pageable);
    
    Page<QuestionBankDTO> getQuestionBanksByUser(Long userId, Pageable pageable);
    
    Page<QuestionBankDTO> searchQuestionBanks(String keyword, Pageable pageable);
    
    void deleteQuestionBank(Long bankId, Long userId);
    
    QuestionBankDTO changeVisibility(Long bankId, String visibility, Long userId);
    
    Long countQuestionsInBank(Long bankId);
    
    boolean isBankAccessible(Long bankId, Long userId);
}