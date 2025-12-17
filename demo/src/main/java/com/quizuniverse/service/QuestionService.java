package com.quizuniverse.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.quizuniverse.dto.QuestionDTO;
import com.quizuniverse.dto.QuestionOptionDTO;
import com.quizuniverse.dto.UpdateQuestionPayload;
import com.quizuniverse.entity.Question;
import com.quizuniverse.entity.QuestionOption;
import com.quizuniverse.entity.Subject;
import com.quizuniverse.repository.QuestionOptionRepository;
import com.quizuniverse.repository.QuestionRepository;
import com.quizuniverse.repository.SubjectRepository;

import jakarta.transaction.Transactional;

@Service
public class QuestionService {

    private final QuestionRepository questionRepository;
    private final QuestionOptionRepository optionRepository;
    private final SubjectRepository subjectRepository;

    public QuestionService(QuestionRepository questionRepository, QuestionOptionRepository optionRepository, SubjectRepository subjectRepository) {
        this.questionRepository = questionRepository;
        this.optionRepository = optionRepository;
        this.subjectRepository = subjectRepository;
    }

    public List<QuestionDTO> getQuestionsBySubjectId(Long subjectId) {
        return questionRepository.findBySubjectIdWithOptions(subjectId)
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<QuestionDTO> getQuestionsByBankId(Long bankId) {
        return questionRepository.findByBankIdWithOptions(bankId)
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

    @Transactional
    public Question createQuestion(Long subjectId, QuestionDTO dto) {

        // 1. Lấy subject
        Subject subject = subjectRepository.findById(subjectId)
                .orElseThrow(() -> new RuntimeException("Subject not found: " + subjectId));

        // 2. Tạo question
        Question question = new Question();
        question.setSubject(subject);
        question.setStem(dto.getStem());
        question.setExplanation(dto.getExplanation());
        question.setQuestionType(dto.getQuestionType());
        question.setStatus(Question.QuestionStatus.approved);
        question.setCreatedAt(LocalDateTime.now());
        question.setUpdatedAt(LocalDateTime.now());

        Question savedQuestion = questionRepository.save(question);

        // 3. Tạo options (nếu có)
        if (dto.getOptions() != null && !dto.getOptions().isEmpty()) {
            List<QuestionOption> options = dto.getOptions().stream()
                    .map(optDto -> {
                        QuestionOption opt = new QuestionOption();
                        opt.setQuestion(savedQuestion);
                        opt.setLabel(optDto.getLabel());
                        opt.setContent(optDto.getContent());
                        opt.setIsCorrect(Boolean.TRUE.equals(optDto.getIsCorrect()));
                        opt.setSortOrder(optDto.getSortOrder());
                        return opt;
                    })
                    .toList();

            optionRepository.saveAll(options);
            savedQuestion.setOptions(options);
        }

        return savedQuestion;
    }

    @Transactional
    public void deleteQuestion(Long id) {
        Question question = questionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Question not found with id: " + id));

        // Xóa tất cả options trước (nếu cascade chưa xử lý tự động)
        optionRepository.deleteAll(question.getOptions());

        // Xóa câu hỏi
        questionRepository.delete(question);
    }

}
