package com.quizuniverse.repository;

// MajorRepository.java
import org.springframework.data.jpa.repository.JpaRepository;

import com.quizuniverse.entity.Major;

public interface MajorRepository extends JpaRepository<Major, Long> {
}
