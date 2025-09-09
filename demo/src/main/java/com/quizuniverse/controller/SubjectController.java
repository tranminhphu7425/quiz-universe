package com.quizuniverse.controller;

import com.quizuniverse.dto.SubjectDTO;
import com.quizuniverse.service.SubjectService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;
import com.quizuniverse.service.SubjectNotFoundException;

@RestController
@RequestMapping("/api/subjects")
@CrossOrigin(origins = "*")
public class SubjectController {
    
    private final SubjectService subjectService;
    
    public SubjectController(SubjectService subjectService) {
        this.subjectService = subjectService;
    }
    
    @GetMapping
    public ResponseEntity<List<SubjectDTO>> getAllSubjects() {
        List<SubjectDTO> subjects = subjectService.getAllSubjects();
        return ResponseEntity.ok(subjects);
    }

    @GetMapping("/{id}/name")
    public ResponseEntity<Map<String, Object>> getSubjectName(@PathVariable long id){
        String name = subjectService.getSubjectNameById(id);
        return ResponseEntity.ok(Map.of("id", id, "name", name));
    }
     // Handler 404
     @ExceptionHandler(SubjectNotFoundException.class)
     public ResponseEntity<Map<String, String>> handleNotFound(SubjectNotFoundException ex) {
         return ResponseEntity.status(404).body(Map.of("error", ex.getMessage()));
     }
}