package com.quizuniverse.controller;

import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.quizuniverse.dto.SubjectDTO;
import com.quizuniverse.service.SubjectNotFoundException;
import com.quizuniverse.service.SubjectService;

@RestController
@RequestMapping("/api/subjects")
@CrossOrigin(origins = "http://127.0.0.1:5173", allowCredentials = "true")
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