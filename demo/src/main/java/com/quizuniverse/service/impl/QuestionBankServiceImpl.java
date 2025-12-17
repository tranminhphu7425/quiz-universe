// QuestionBankServiceImpl.java
package com.quizuniverse.service.impl;

import com.quizuniverse.exception.ResourceNotFoundException;
import com.quizuniverse.exception.UnauthorizedAccessException;
import com.quizuniverse.dto.CreateQuestionBankRequest;
import com.quizuniverse.dto.QuestionBankDTO;
import com.quizuniverse.dto.UpdateQuestionBankRequest;
import com.quizuniverse.entity.QuestionBank;
import com.quizuniverse.entity.Subject;
import com.quizuniverse.entity.User;
import com.quizuniverse.repository.QuestionBankRepository;
import com.quizuniverse.repository.SubjectRepository;
import com.quizuniverse.repository.UserRepository;
import com.quizuniverse.service.QuestionBankService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Slf4j
@Service
@RequiredArgsConstructor
public class QuestionBankServiceImpl implements QuestionBankService {
    
    private final QuestionBankRepository questionBankRepository;
    private final SubjectRepository subjectRepository;
    private final UserRepository userRepository;
    
    @Override
    @Transactional
    public QuestionBankDTO createQuestionBank(CreateQuestionBankRequest request, Long userId) {
        // Check if bank name already exists for this subject
        if (questionBankRepository.existsByNameAndSubject_Id(request.getName(), request.getSubjectId())) {
            throw new IllegalArgumentException("Question bank with this name already exists for the subject");
        }
        
        Subject subject = subjectRepository.findById(request.getSubjectId())
                .orElseThrow(() -> new ResourceNotFoundException("Subject not found"));
        
        User creator = userRepository.findByUserId(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        
        QuestionBank questionBank = QuestionBank.builder()
                .name(request.getName())
                .subject(subject)
                .description(request.getDescription())
                .visibility(request.getVisibility())
                .createdBy(creator)
                .createdAt(LocalDateTime.now())
                .build();
        
        QuestionBank savedBank = questionBankRepository.save(questionBank);
        log.info("Question bank created: {} by user: {}", savedBank.getName(), userId);
        
        return convertToDTO(savedBank);
    }
    
    @Override
    @Transactional
    public QuestionBankDTO updateQuestionBank(Long bankId, UpdateQuestionBankRequest request, Long userId) {
        QuestionBank questionBank = questionBankRepository.findByBankIdAndCreatedBy_UserId(bankId, userId)
                .orElseThrow(() -> new UnauthorizedAccessException("You are not authorized to update this question bank"));
        
        // Check name uniqueness (excluding current bank)
        if (!questionBank.getName().equals(request.getName()) &&
            questionBankRepository.existsByNameAndSubject_Id(request.getName(), questionBank.getSubject().getId())) {
            throw new IllegalArgumentException("Question bank with this name already exists for the subject");
        }
        
        questionBank.setName(request.getName());
        questionBank.setDescription(request.getDescription());
        
        if (request.getVisibility() != null) {
            questionBank.setVisibility(request.getVisibility());
        }
        
        questionBank.setUpdatedAt(LocalDateTime.now());
        
        QuestionBank updatedBank = questionBankRepository.save(questionBank);
        log.info("Question bank updated: {} by user: {}", updatedBank.getName(), userId);
        
        return convertToDTO(updatedBank);
    }
    
    @Override
    @Transactional(readOnly = true)
    public QuestionBankDTO getQuestionBankById(Long bankId, Long userId) {
        QuestionBank questionBank = questionBankRepository.findById(bankId)
                .orElseThrow(() -> new ResourceNotFoundException("Question bank not found"));
        
        // Check access permissions
        if (!isBankAccessible(bankId, userId)) {
            throw new UnauthorizedAccessException("You don't have access to this question bank");
        }
        
        return convertToDTO(questionBank);
    }
    
    @Override
    @Transactional(readOnly = true)
    public Page<QuestionBankDTO> getAllQuestionBanks(Pageable pageable) {
        return questionBankRepository.findAll(pageable)
                .map(this::convertToDTO);
    }
    
    @Override
    @Transactional(readOnly = true)
    public Page<QuestionBankDTO> getQuestionBanksBySubject(Long subjectId, Pageable pageable) {
        return questionBankRepository.findBySubject_Id(subjectId, pageable)
                .map(this::convertToDTO);
    }
    
    @Override
    @Transactional(readOnly = true)
    public Page<QuestionBankDTO> getQuestionBanksByUser(Long userId, Pageable pageable) {
        return questionBankRepository.findByCreatedBy_UserId(userId, pageable)
                .map(this::convertToDTO);
    }
    
    @Override
    @Transactional(readOnly = true)
    public Page<QuestionBankDTO> searchQuestionBanks(String keyword, Pageable pageable) {
        return questionBankRepository.searchBanks(keyword, pageable)
                .map(this::convertToDTO);
    }
    
    @Override
    @Transactional
    public void deleteQuestionBank(Long bankId, Long userId) {
        QuestionBank questionBank = questionBankRepository.findByBankIdAndCreatedBy_UserId(bankId, userId)
                .orElseThrow(() -> new UnauthorizedAccessException("You are not authorized to delete this question bank"));
        
        questionBankRepository.delete(questionBank);
        log.info("Question bank deleted: {} by user: {}", questionBank.getName(), userId);
    }
    
    @Override
    @Transactional
    public QuestionBankDTO changeVisibility(Long bankId, String visibility, Long userId) {
        QuestionBank questionBank = questionBankRepository.findByBankIdAndCreatedBy_UserId(bankId, userId)
                .orElseThrow(() -> new UnauthorizedAccessException("You are not authorized to change visibility of this question bank"));
        
        try {
            QuestionBank.Visibility newVisibility = QuestionBank.Visibility.valueOf(visibility.toUpperCase());
            questionBank.setVisibility(newVisibility);
            questionBank.setUpdatedAt(LocalDateTime.now());
            
            QuestionBank updatedBank = questionBankRepository.save(questionBank);
            log.info("Visibility changed to {} for bank: {} by user: {}", visibility, bankId, userId);
            
            return convertToDTO(updatedBank);
        } catch (IllegalArgumentException e) {
            throw new IllegalArgumentException("Invalid visibility value: " + visibility);
        }
    }
    
    @Override
    @Transactional(readOnly = true)
    public Long countQuestionsInBank(Long bankId) {
        return questionBankRepository.countQuestionsInBank(bankId);
    }
    
    @Override
    @Transactional(readOnly = true)
    public boolean isBankAccessible(Long bankId, Long userId) {
        QuestionBank questionBank = questionBankRepository.findById(bankId)
                .orElseThrow(() -> new ResourceNotFoundException("Question bank not found"));
        
        // PUBLIC banks are accessible to everyone
        if (questionBank.getVisibility() == QuestionBank.Visibility.PUBLIC) {
            return true;
        }
        
        // Check if user is the creator
        if (questionBank.getCreatedBy().getUserId().equals(userId)) {
            return true;
        }
        
        // For ORG visibility - check organization membership
        if (questionBank.getVisibility() == QuestionBank.Visibility.ORG) {
            // Implement organization check logic here
            // return user.getOrganization().getId().equals(questionBank.getCreatedBy().getOrganization().getId());
        }
        
        return false;
    }
    
    private QuestionBankDTO convertToDTO(QuestionBank questionBank) {
        return QuestionBankDTO.builder()
                .bankId(questionBank.getBankId())
                .name(questionBank.getName())
                .subjectId(questionBank.getSubject().getId())
                .subjectName(questionBank.getSubject().getName())
                .description(questionBank.getDescription())
                .visibility(questionBank.getVisibility())
                .createdBy(questionBank.getCreatedBy().getUserId())
                .creatorName(questionBank.getCreatedBy().getFullName())
                .createdAt(questionBank.getCreatedAt())
                .updatedAt(questionBank.getUpdatedAt())
                .questionCount(countQuestionsInBank(questionBank.getBankId()).intValue())
                .build();
    }
}