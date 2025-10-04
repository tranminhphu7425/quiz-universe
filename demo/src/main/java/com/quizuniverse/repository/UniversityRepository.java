package com.quizuniverse.repository;



// UniversityRepository.java
import org.springframework.data.jpa.repository.JpaRepository;

import com.quizuniverse.entity.University;

public interface UniversityRepository extends JpaRepository<University, String> {
}
