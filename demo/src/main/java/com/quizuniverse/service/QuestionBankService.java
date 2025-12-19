// QuestionBankService.java
package com.quizuniverse.service;

import com.quizuniverse.dto.CreateQuestionBankRequest;
import com.quizuniverse.dto.QuestionBankDTO;
import com.quizuniverse.dto.UpdateQuestionBankRequest;

import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.transaction.annotation.Transactional;

public interface QuestionBankService {
    
    QuestionBankDTO createQuestionBank(CreateQuestionBankRequest request, UUID userId);
    
    QuestionBankDTO updateQuestionBank(Long bankId, UpdateQuestionBankRequest request, UUID userId);
    
    QuestionBankDTO getQuestionBankById(Long bankId, UUID userId);
    
    Page<QuestionBankDTO> getAllQuestionBanks(Pageable pageable);
    
    Page<QuestionBankDTO> getQuestionBanksBySubject(Long subjectId, Pageable pageable);
    
    Page<QuestionBankDTO> getQuestionBanksByUser(UUID userId, Pageable pageable);
    
    Page<QuestionBankDTO> searchQuestionBanks(String keyword, Pageable pageable);
    
    void deleteQuestionBank(Long bankId, UUID userId);
    
    QuestionBankDTO changeVisibility(Long bankId, String visibility, UUID userId);
    
    Long countQuestionsInBank(Long bankId);
    
    boolean isBankAccessible(Long bankId, UUID userId);


   
    String getQuestionBankNameById(Long bankId);
        

}