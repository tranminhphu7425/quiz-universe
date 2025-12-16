package com.quizuniverse.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.quizuniverse.entity.Question;

@Repository
public interface QuestionRepository extends JpaRepository<Question, Long> {

    @Query("SELECT q FROM Question q WHERE q.subject.id = :subjectId AND q.status = 'APPROVED' ORDER BY q.createdAt DESC")
    List<Question> findBySubjectId(@Param("subjectId") Long subjectId);

    @Query("SELECT q FROM Question q JOIN FETCH q.options WHERE q.subject.id = :subjectId AND q.status = 'APPROVED'")
    List<Question> findBySubjectIdWithOptions(@Param("subjectId") Long subjectId);

    @Query("SELECT COUNT(q) FROM Question q")
    Long countAllQuestion();

    // Thêm phương thức này vào QuestionRepository.java
    boolean existsById(Long id);

}
