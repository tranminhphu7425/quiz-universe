package com.quizuniverse.service.impl;

import com.quizuniverse.dto.*;
import com.quizuniverse.entity.*;
import com.quizuniverse.repository.*;
import com.quizuniverse.service.FavoriteService;

import lombok.Data;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class FavoriteServiceImpl implements FavoriteService {
    
    private final FavoriteQuestionBankRepository favoriteQuestionBankRepository;
    private final FavoriteSubjectRepository favoriteSubjectRepository;
    private final UserRepository userRepository;
    private final QuestionBankRepository questionBankRepository;
    private final SubjectRepository subjectRepository;
    
    // Question Bank Methods
    
    @Override
    @Transactional
    public FavoriteQuestionBankDTO addFavoriteQuestionBank(UUID userId, Long bankId) {
        // Validate user and question bank exist
        User user = userRepository.findByUserId(userId.toString())
                .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));
        
        QuestionBank questionBank = questionBankRepository.findById(bankId)
                .orElseThrow(() -> new RuntimeException("Question bank not found with id: " + bankId));
        
        // Check if already favorite
        if (favoriteQuestionBankRepository.existsByUserUserIdAndQuestionBankBankId(userId.toString(), bankId)) {
            throw new RuntimeException("Question bank already in favorites");
        }
        
        // Create and save favorite
        FavoriteQuestionBank favorite = FavoriteQuestionBank.builder()
                .bankId(new FavoriteQuestionBankId(userId.toString(), bankId))
                .user(user)
                .questionBank(questionBank)
                .createdAt(LocalDateTime.now())
                .build();
        
        favoriteQuestionBankRepository.save(favorite);
        
        return mapToFavoriteQuestionBankDTO(favorite);
    }
    
    @Override
    @Transactional
    public void removeFavoriteQuestionBank(UUID userId, Long bankId) {
        if (!favoriteQuestionBankRepository.existsByUserUserIdAndQuestionBankBankId(userId.toString(), bankId)) {
            throw new RuntimeException("Question bank not found in favorites");
        }
        favoriteQuestionBankRepository.deleteByUserUserIdAndQuestionBankBankId(userId.toString(), bankId);
    }
    
    @Override
    @Transactional
    public boolean toggleFavoriteQuestionBank(UUID userId, Long bankId) {
        boolean isFavorite = favoriteQuestionBankRepository.existsByUserUserIdAndQuestionBankBankId(userId.toString(), bankId);
        
        if (isFavorite) {
            removeFavoriteQuestionBank(userId, bankId);
            return false;
        } else {
            addFavoriteQuestionBank(userId, bankId);
            return true;
        }
    }
    
    @Override
    @Transactional(readOnly = true)
    public List<FavoriteQuestionBankDTO> getUserFavoriteQuestionBanks(UUID userId) {
        return favoriteQuestionBankRepository.findByUserIdWithQuestionBank(userId.toString())
                .stream()
                .map(this::mapToFavoriteQuestionBankDTO)
                .collect(Collectors.toList());
    }
    
    @Override
    @Transactional(readOnly = true)
    public boolean isQuestionBankFavorite(UUID userId, Long bankId) {
        return favoriteQuestionBankRepository.existsByUserUserIdAndQuestionBankBankId(userId.toString(), bankId);
    }
    
    // Subject Methods
    
    @Override
    @Transactional
    public FavoriteSubjectDTO addFavoriteSubject(UUID userId, Long subjectId) {
        User user = userRepository.findByUserId(userId.toString())
                .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));
        
        Subject subject = subjectRepository.findById(subjectId)
                .orElseThrow(() -> new RuntimeException("Subject not found with id: " + subjectId));
        
        if (favoriteSubjectRepository.existsByUserUserIdAndSubjectId(userId.toString(), subjectId)) {
            throw new RuntimeException("Subject already in favorites");
        }
        
        FavoriteSubject favorite = FavoriteSubject.builder()
                .id(new FavoriteSubjectId(userId.toString(), subjectId))
                .user(user)
                .subject(subject)
                .createdAt(LocalDateTime.now())
                .build();
        
        favoriteSubjectRepository.save(favorite);
        
        return mapToFavoriteSubjectDTO(favorite);
    }
    
    @Override
    @Transactional
    public void removeFavoriteSubject(UUID userId, Long subjectId) {
        if (!favoriteSubjectRepository.existsByUserUserIdAndSubjectId(userId.toString(), subjectId)) {
            throw new RuntimeException("Subject not found in favorites");
        }
        favoriteSubjectRepository.deleteByUserUserIdAndSubjectId(userId.toString(), subjectId);
    }
    
    @Override
    @Transactional
    public boolean toggleFavoriteSubject(UUID userId, Long subjectId) {
        boolean isFavorite = favoriteSubjectRepository.existsByUserUserIdAndSubjectId(userId.toString(), subjectId);
        
        if (isFavorite) {
            removeFavoriteSubject(userId, subjectId);
            return false;
        } else {
            addFavoriteSubject(userId, subjectId);
            return true;
        }
    }
    
    @Override
    @Transactional(readOnly = true)
    public List<FavoriteSubjectDTO> getUserFavoriteSubjects(UUID userId) {
        return favoriteSubjectRepository.findByUserIdWithSubject(userId.toString())
                .stream()
                .map(this::mapToFavoriteSubjectDTO)
                .collect(Collectors.toList());
    }
    
    @Override
    @Transactional(readOnly = true)
    public boolean isSubjectFavorite(UUID userId, Long subjectId) {
        return favoriteSubjectRepository.existsByUserUserIdAndSubjectId(userId.toString(), subjectId);
    }
    
    // Combined Methods
    
    @Override
    @Transactional(readOnly = true)
    public UserFavoriteResponse getUserFavorites(UUID userId) {
        User user = userRepository.findByUserId(userId.toString())
                .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));
        
        List<FavoriteQuestionBankDTO> questionBankFavorites = getUserFavoriteQuestionBanks(userId);
        List<FavoriteSubjectDTO> subjectFavorites = getUserFavoriteSubjects(userId);
        
        UserFavoriteResponse response = new UserFavoriteResponse();
        response.setUserId(userId.toString());
        response.setUserName(user.getFullName());
        response.setFavoriteQuestionBanks(questionBankFavorites);
        response.setFavoriteSubjects(subjectFavorites);
        
        return response;
    }
    
    @Override
    @Transactional
    public ToggleFavoriteResponse toggleFavorite(ToggleFavoriteRequest request) {
        ToggleFavoriteResponse response = new ToggleFavoriteResponse();
        response.setUserId(request.getUserId());
        response.setTargetId(request.getTargetId());
        response.setType(request.getType());
        
        switch (request.getType()) {
            case QUESTION_BANK:
                boolean isFavorite = toggleFavoriteQuestionBank(UUID.fromString(request.getUserId()), request.getTargetId());
                response.setAdded(isFavorite);
                response.setMessage(isFavorite ? 
                    "Added to favorites" : "Removed from favorites");
                break;
                
            case SUBJECT:
                isFavorite = toggleFavoriteSubject(UUID.fromString(request.getUserId()), request.getTargetId());
                response.setAdded(isFavorite);
                response.setMessage(isFavorite ? 
                    "Added to favorites" : "Removed from favorites");
                break;
                
            default:
                throw new RuntimeException("Invalid favorite type: " + request.getType());
        }
        
        return response;
    }
    
    @Override
    @Transactional(readOnly = true)
    public FavoritesStatusResponse getFavoritesStatus(UUID userId, List<Long> bankIds, List<Long> subjectIds) {
        FavoritesStatusResponse response = new FavoritesStatusResponse();
        response.setUserId(userId.toString());
        
        // Check question banks
        if (bankIds != null && !bankIds.isEmpty()) {
            Map<Long, Boolean> bankStatus = new HashMap<>();
            for (Long bankId : bankIds) {
                bankStatus.put(bankId, isQuestionBankFavorite(userId, bankId));
            }
            response.setQuestionBankStatus(bankStatus);
        }
        
        // Check subjects
        if (subjectIds != null && !subjectIds.isEmpty()) {
            Map<Long, Boolean> subjectStatus = new HashMap<>();
            for (Long subjectId : subjectIds) {
                subjectStatus.put(subjectId, isSubjectFavorite(userId, subjectId));
            }
            response.setSubjectStatus(subjectStatus);
        }
        
        return response;
    }
    
    // Helper methods for mapping
    
    private FavoriteQuestionBankDTO mapToFavoriteQuestionBankDTO(FavoriteQuestionBank favorite) {
        FavoriteQuestionBankDTO dto = new FavoriteQuestionBankDTO();
        dto.setUserId(favorite.getUser().getUserId());
        dto.setBankId(favorite.getBankId().getBankId());
        dto.setSubjectName(favorite.getQuestionBank().getSubject().getName());
        dto.setBankName(favorite.getQuestionBank().getName());
        dto.setBankDescription(favorite.getQuestionBank().getDescription());
        dto.setCreatedAt(favorite.getCreatedAt());
        return dto;
    }
    
    private FavoriteSubjectDTO mapToFavoriteSubjectDTO(FavoriteSubject favorite) {
        FavoriteSubjectDTO dto = new FavoriteSubjectDTO();
        dto.setUserId(favorite.getId().getUserId().toString());
        dto.setSubjectId(favorite.getId().getSubjectId());
        dto.setSubjectName(favorite.getSubject().getName());
        dto.setSubjectCode(favorite.getSubject().getCode());
        dto.setCreatedAt(favorite.getCreatedAt());
        return dto;
    }
}

