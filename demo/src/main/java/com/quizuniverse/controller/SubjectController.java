package com.quizuniverse.controller;

import com.quizuniverse.dto.SubjectDTO;
import com.quizuniverse.service.SubjectService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;
import com.quizuniverse.service.SubjectNotFoundException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;

@RestController
@RequestMapping("/api/subjects")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class SubjectController {
    
    private final SubjectService subjectService;
    
    public SubjectController(SubjectService subjectService) {
        this.subjectService = subjectService;
    }
    
    @GetMapping("/all")
    public ResponseEntity<List<SubjectDTO>> getAllSubjects() {
        List<SubjectDTO> subjects = subjectService.getAllSubjects();
        return ResponseEntity.ok(subjects);
    }

    @GetMapping("/{id}")
    public ResponseEntity<SubjectDTO> getSubjectById(@PathVariable long id) {
        SubjectDTO subject = subjectService.getSubjectById(id);
        return ResponseEntity.ok(subject);
    }
    


    @GetMapping
    public ResponseEntity<Page<SubjectDTO>> getSubjects(
            @RequestParam(required = false) String keyword,
            @PageableDefault(size = 10, sort = "name") Pageable pageable) {
        Page<SubjectDTO> subjects = subjectService.getSubjects(keyword, pageable);
        return ResponseEntity.ok(subjects);
    }

    @GetMapping("/{id}/name")
    public ResponseEntity<Map<String, Object>> getSubjectName(@PathVariable long id){
        String name = subjectService.getSubjectNameById(id);
        return ResponseEntity.ok(Map.of("id", id, "name", name));
    }
    
    @PostMapping("/create")
    public ResponseEntity<SubjectDTO> createSubject(@RequestBody SubjectDTO subjectDTO) {
        SubjectDTO created = subjectService.createSubject(subjectDTO);
        return ResponseEntity.ok(created);
    }

    @PutMapping("/{id}")
    public ResponseEntity<SubjectDTO> updateSubject(@PathVariable Long id, @RequestBody SubjectDTO subjectDTO) {
        SubjectDTO updated = subjectService.updateSubject(id, subjectDTO);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, String>> deleteSubject(@PathVariable Long id) {
        subjectService.deleteSubject(id);
        return ResponseEntity.ok(Map.of("message", "Đã xóa môn học thành công"));
    }
     // Handler 404
     @ExceptionHandler(SubjectNotFoundException.class)
     public ResponseEntity<Map<String, String>> handleNotFound(SubjectNotFoundException ex) {
         return ResponseEntity.status(404).body(Map.of("error", ex.getMessage()));
     }
}