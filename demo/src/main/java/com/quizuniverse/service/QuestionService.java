package com.quizuniverse.service;

import com.quizuniverse.dto.QuestionDTO;
import com.quizuniverse.dto.QuestionOptionDTO;
import com.quizuniverse.entity.Question;
import com.quizuniverse.repository.QuestionRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class QuestionService {
    
    private final QuestionRepository questionRepository;
    
    public QuestionService(QuestionRepository questionRepository) {
        this.questionRepository = questionRepository;
    }
    
    public List<QuestionDTO> getQuestionsBySubjectId(Long subjectId) {
        return questionRepository.findBySubjectIdWithOptions(subjectId)
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    private QuestionDTO convertToDTO(Question question) {
        QuestionDTO dto = new QuestionDTO();
        dto.setId(question.getId());
        dto.setStem(question.getStem());
        dto.setExplanation(question.getExplanation());
        dto.setQuestionType(question.getQuestionType().name());
        dto.setStatus(question.getStatus().name());
        dto.setCreatedAt(question.getCreatedAt());
        dto.setUpdatedAt(question.getUpdatedAt());
        
        dto.setOptions(question.getOptions().stream()
                .map(option -> {
                    QuestionOptionDTO optionDTO = new QuestionOptionDTO();
                    optionDTO.setId(option.getId());
                    optionDTO.setLabel(option.getLabel());
                    optionDTO.setContent(option.getContent());
                    optionDTO.setIsCorrect(option.getIsCorrect());
                    optionDTO.setSortOrder(option.getSortOrder());
                    return optionDTO;
                })
                .collect(Collectors.toList()));
        
        return dto;
    }
}