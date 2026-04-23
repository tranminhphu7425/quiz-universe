package com.quizuniverse.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.data.repository.query.Param;

import com.quizuniverse.entity.Subject;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

@Repository
public interface SubjectRepository extends JpaRepository<Subject, Long> {
    
    @Query("SELECT s FROM Subject s ORDER BY s.name")
    List<Subject> findAllOrderByName();
    
    Subject findByCode(String code);

    @Query("select s.name from Subject s where s.id = :id")
    String findNameById(@Param("id") Long id);

    Page<Subject> findByCodeContainingIgnoreCaseOrNameContainingIgnoreCase(String code, String name, Pageable pageable);

}