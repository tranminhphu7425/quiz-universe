package com.quizuniverse.service;

import com.quizuniverse.dto.QuestionDTO;
import com.quizuniverse.dto.QuestionOptionDTO;
import com.quizuniverse.dto.UpdateQuestionPayload;
import com.quizuniverse.entity.Question;
import com.quizuniverse.entity.QuestionOption;
import com.quizuniverse.repository.QuestionOptionRepository;
import com.quizuniverse.repository.QuestionRepository;

import jakarta.transaction.Transactional;

import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class QuestionService {
    
    private final QuestionRepository questionRepository;
    private final QuestionOptionRepository optionRepository;
    
    public QuestionService(QuestionRepository questionRepository, QuestionOptionRepository optionRepository) {
        this.questionRepository = questionRepository;
        this.optionRepository = optionRepository;
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

    public Long getTotalQuestionCount() {
        return questionRepository.countAllQuestion();
    }
    
    @Transactional
    public QuestionDTO updateQuestion(Long id, UpdateQuestionPayload payload) {
        Question q = questionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Question not found"));

        // cập nhật fields chính
        q.setStem(payload.getStem());
        q.setExplanation(payload.getExplanation());
        q.setQuestionType(payload.getQuestionType());

        // đồng bộ options
        Map<Long, QuestionOption> current = q.getOptions().stream()
                .collect(Collectors.toMap(QuestionOption::getId, o -> o));

        List<QuestionOption> newList = new ArrayList<>();

        for (QuestionOptionDTO dto : payload.getOptions()) {
            QuestionOption opt;
            if (dto.getId() != null && current.containsKey(dto.getId())) {
                // update option cũ
                opt = current.get(dto.getId());
            } else {
                // thêm option mới
                opt = new QuestionOption();
                opt.setQuestion(q);
            }
            opt.setLabel(dto.getLabel());
            opt.setContent(dto.getContent());
            opt.setIsCorrect(dto.getIsCorrect());
            opt.setSortOrder(dto.getSortOrder());
            newList.add(opt);
        }

        // clear & set lại options (orphanRemoval sẽ xóa option thừa)
        q.getOptions().clear();
        q.getOptions().addAll(newList);

        return convertToDTO(questionRepository.save(q));
    }


}