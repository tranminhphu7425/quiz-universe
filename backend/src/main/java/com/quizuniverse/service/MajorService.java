package com.quizuniverse.service;

import org.springframework.stereotype.Service;

import com.quizuniverse.entity.Major;
import com.quizuniverse.repository.MajorRepository;

import java.util.List;

@Service
public class MajorService {
    private final MajorRepository repo;

    public MajorService(MajorRepository repo) {
        this.repo = repo;
    }

    public List<Major> getAll() {
        return repo.findAll();
    }
}
