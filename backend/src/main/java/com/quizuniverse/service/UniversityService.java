package com.quizuniverse.service;

import org.springframework.stereotype.Service;

import com.quizuniverse.entity.University;
import com.quizuniverse.repository.UniversityRepository;

import java.util.List;

@Service
public class UniversityService {
    private final UniversityRepository repo;

    public UniversityService(UniversityRepository repo) {
        this.repo = repo;
    }

    public List<University> getAll() {
        return repo.findAll();
    }
}
