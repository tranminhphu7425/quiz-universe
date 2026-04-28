// QuestionBankRepository.java
package com.quizuniverse.repository;

import com.quizuniverse.entity.QuestionBank;
import com.quizuniverse.entity.QuestionBank.Visibility;
import com.quizuniverse.entity.QuestionBank.Status;
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
    
    Page<QuestionBank> findBySubject_SubjectId(Long subjectId, Pageable pageable);
    
    Page<QuestionBank> findByCreatedBy_UserId(String userId, Pageable pageable);
    
    Page<QuestionBank> findBySubject_SubjectIdAndCreatedBy_UserId(Long subjectId, String userId, Pageable pageable);
    
    Page<QuestionBank> findByVisibility(Visibility visibility, Pageable pageable);

    Page<QuestionBank> findByStatus(Status status, Pageable pageable);

    List<QuestionBank> findByStatus(Status status);

    Page<QuestionBank> findBySubject_SubjectIdAndStatus(Long subjectId, Status status, Pageable pageable);


    @Query("select s.name from QuestionBank s where s.bankId = :bankId")
    String findNameById(@Param("bankId") Long bankId);
    
    @Query("SELECT qb FROM QuestionBank qb WHERE " +
           "(qb.visibility = 'PUBLIC' OR " +
           "(qb.visibility = 'ORG') OR " +
           "qb.createdBy.userId = :userId) " +
           "AND qb.subject.subjectId = :id " +
           "AND qb.status = 'ACTIVE'")
    Page<QuestionBank> findAccessibleBanks(@Param("id") Long subjectId,
                                          @Param("userId") String userId,
                                          Pageable pageable);
    
    @Query("SELECT COUNT(q) FROM Question q WHERE q.bank.bankId = :bankId")
    Long countQuestionsInBank(@Param("bankId") Long bankId);
    
    @Query("SELECT qb FROM QuestionBank qb WHERE " +
           "(LOWER(qb.name) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
           "LOWER(qb.description) LIKE LOWER(CONCAT('%', :search, '%'))) " +
           "AND qb.status = 'ACTIVE'")
    Page<QuestionBank> searchBanks(@Param("search") String search, Pageable pageable);
    
    boolean existsByNameAndSubject_SubjectId(String name, Long subjectId);
    
    Optional<QuestionBank> findByBankIdAndCreatedBy_UserId(Long bankId, String userId);
}