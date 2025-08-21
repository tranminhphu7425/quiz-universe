package com.quizuniverse.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.quizuniverse.entity.Subject;

@Repository
public interface SubjectRepository extends JpaRepository<Subject, Long> {
    
    @Query("SELECT s FROM Subject s ORDER BY s.name")
    List<Subject> findAllOrderByName();
    
    Subject findByCode(String code);
}