package com.quizuniverse.repository;

import com.quizuniverse.entity.FavoriteSubject;
import com.quizuniverse.entity.FavoriteSubjectId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FavoriteSubjectRepository extends JpaRepository<FavoriteSubject, FavoriteSubjectId> {
    
    Optional<FavoriteSubject> findByUserUserIdAndSubjectId(String userId, Long subjectId);
    
    boolean existsByUserUserIdAndSubjectId(String userId, Long subjectId);
    
    @Query("SELECT f FROM FavoriteSubject f JOIN FETCH f.subject WHERE f.user.userId = :userId")
    List<FavoriteSubject> findByUserIdWithSubject(@Param("userId") String userId);
    
    void deleteByUserUserIdAndSubjectId(String userId, Long subjectId);
    
    int countBySubjectId(Long subjectId);
}