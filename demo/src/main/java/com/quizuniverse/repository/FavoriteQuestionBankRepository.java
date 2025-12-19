package com.quizuniverse.repository;

import com.quizuniverse.entity.FavoriteQuestionBank;
import com.quizuniverse.entity.FavoriteQuestionBankId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


@Repository
public interface FavoriteQuestionBankRepository extends JpaRepository<FavoriteQuestionBank, FavoriteQuestionBankId> {
    
    Optional<FavoriteQuestionBank> findByUserUserIdAndQuestionBankBankId(String userId, Long bankId);
    
    boolean existsByUserUserIdAndQuestionBankBankId(String userId, Long bankId);
    
    @Query("SELECT f FROM FavoriteQuestionBank f JOIN FETCH f.questionBank WHERE f.user.userId = :userId")
    List<FavoriteQuestionBank> findByUserIdWithQuestionBank(@Param("userId") String userId);
    
    void deleteByUserUserIdAndQuestionBankBankId(String userId, Long bankId);
    
    int countByQuestionBankBankId(Long bankId);
}