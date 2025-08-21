package com.quizuniverse.service;

import com.quizuniverse.dto.SubjectDTO;
import com.quizuniverse.entity.Subject;
import com.quizuniverse.repository.SubjectRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class SubjectService {
    
    private final SubjectRepository subjectRepository;
    
    public SubjectService(SubjectRepository subjectRepository) {
        this.subjectRepository = subjectRepository;
    }
    
    public List<SubjectDTO> getAllSubjects() {
        return subjectRepository.findAllOrderByName()
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    private SubjectDTO convertToDTO(Subject subject) {
        SubjectDTO dto = new SubjectDTO();
        dto.setId(subject.getId());
        dto.setCode(subject.getCode());
        dto.setName(subject.getName()); // Đảm bảo Subject entity có getName()
        dto.setDescription(subject.getDescription());
        dto.setCreatedAt(subject.getCreatedAt());
        return dto;
    }
}