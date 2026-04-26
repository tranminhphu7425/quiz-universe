package com.quizuniverse.service;

import com.quizuniverse.dto.SubjectDTO;
import com.quizuniverse.entity.Subject;
import com.quizuniverse.repository.SubjectRepository;
import org.springframework.transaction.annotation.Transactional;



import org.springframework.stereotype.Service;
import com.quizuniverse.exception.SubjectCodeAlreadyExistsException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import java.time.LocalDateTime;
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

    public SubjectDTO getSubjectById(Long id){
        return subjectRepository.findById(id)
                .map(this::convertToDTO)
                .orElseThrow(() -> new SubjectNotFoundException(id));
    }

    @Transactional(readOnly = true)
    public Page<SubjectDTO> getSubjects(String keyword, Pageable pageable) {
        if (keyword != null && !keyword.trim().isEmpty()) {
            return subjectRepository.findByCodeContainingIgnoreCaseOrNameContainingIgnoreCase(keyword, keyword, pageable)
                    .map(this::convertToDTO);
        }
        return subjectRepository.findAll(pageable)
                .map(this::convertToDTO);
    }
    
    private SubjectDTO convertToDTO(Subject subject) {
        SubjectDTO dto = new SubjectDTO();
        dto.setSubjectId(subject.getSubjectId());
        dto.setCode(subject.getCode());
        dto.setName(subject.getName()); 
        dto.setDescription(subject.getDescription());
        dto.setCredit(subject.getCredit());
        dto.setCreatedAt(subject.getCreatedAt());
        return dto;
    }

    @Transactional(readOnly = true)
    public String getSubjectNameById(Long id){
        String name = subjectRepository.findNameById(id);
        if(name == null){
            throw new SubjectNotFoundException(id);
        }
        return name;
    }

    @Transactional
    public SubjectDTO createSubject(SubjectDTO dto) {

        if (subjectRepository.findByCode(dto.getCode()) != null) {
            throw new SubjectCodeAlreadyExistsException(dto.getCode());
        }

        Subject subject = new Subject();
        subject.setCode(dto.getCode());
        subject.setName(dto.getName());
        subject.setDescription(dto.getDescription());
        subject.setCreatedAt(LocalDateTime.now());
        
        Subject savedSubject = subjectRepository.save(subject);
        return convertToDTO(savedSubject);
    }

    @Transactional
    public SubjectDTO updateSubject(Long id, SubjectDTO dto) {
        Subject subject = subjectRepository.findById(id)
                .orElseThrow(() -> new SubjectNotFoundException(id));
        
        // Kiểm tra mã môn học trùng (nếu thay đổi)
        if (!subject.getCode().equals(dto.getCode())) {
            Subject existing = subjectRepository.findByCode(dto.getCode());
            if (existing != null) {
                throw new SubjectCodeAlreadyExistsException(dto.getCode());
            }
        }
        
        subject.setCode(dto.getCode());
        subject.setName(dto.getName());
        subject.setDescription(dto.getDescription());
        
        Subject savedSubject = subjectRepository.save(subject);
        return convertToDTO(savedSubject);
    }

    @Transactional
    public void deleteSubject(Long id) {
        if (!subjectRepository.existsById(id)) {
            throw new SubjectNotFoundException(id);
        }
        subjectRepository.deleteById(id);
    }
}
