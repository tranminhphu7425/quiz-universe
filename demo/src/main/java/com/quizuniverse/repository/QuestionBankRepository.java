// QuestionBankRepository.java
package com.quizuniverse.repository;

import com.quizuniverse.entity.QuestionBank;
import com.quizuniverse.entity.QuestionBank.Visibility;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface QuestionBankRepository extends JpaRepository<QuestionBank, Long> {
    
    Page<QuestionBank> findBySubject_Id(Long subjectId, Pageable pageable);
    
    Page<QuestionBank> findByCreatedBy_UserId(Long userId, Pageable pageable);
    
    Page<QuestionBank> findBySubject_IdAndCreatedBy_UserId(Long subjectId, Long userId, Pageable pageable);
    
    Page<QuestionBank> findByVisibility(Visibility visibility, Pageable pageable);
    
    @Query("SELECT qb FROM QuestionBank qb WHERE " +
           "(qb.visibility = 'PUBLIC' OR " +
           "(qb.visibility = 'ORG') OR " +
           "qb.createdBy.userId = :userId) " +
           "AND qb.subject.id = :id")
    Page<QuestionBank> findAccessibleBanks(@Param("id") Long subjectId,
                                          @Param("userId") Long userId,
                                          @Param("orgId") Long orgId,
                                          Pageable pageable);
    
    @Query("SELECT COUNT(q) FROM Question q WHERE q.bank.bankId = :bankId")
    Long countQuestionsInBank(@Param("bankId") Long bankId);
    
    @Query("SELECT qb FROM QuestionBank qb WHERE " +
           "LOWER(qb.name) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
           "LOWER(qb.description) LIKE LOWER(CONCAT('%', :search, '%'))")
    Page<QuestionBank> searchBanks(@Param("search") String search, Pageable pageable);
    
    boolean existsByNameAndSubject_Id(String name, Long subjectId);
    
    Optional<QuestionBank> findByBankIdAndCreatedBy_UserId(Long bankId, Long userId);
}