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
    
    @Query("SELECT f FROM FavoriteSubject f WHERE f.user.userId = :userId AND f.subject.subjectId = :subjectId")
    Optional<FavoriteSubject> findByUserUserIdAndSubjectId(@Param("userId") String userId, @Param("subjectId") Long subjectId);
    
    @Query("SELECT (COUNT(f) > 0) FROM FavoriteSubject f WHERE f.user.userId = :userId AND f.subject.subjectId = :subjectId")
    boolean existsByUserUserIdAndSubjectId(@Param("userId") String userId, @Param("subjectId") Long subjectId);
    
    @Query("SELECT f FROM FavoriteSubject f JOIN FETCH f.subject WHERE f.user.userId = :userId")
    List<FavoriteSubject> findByUserIdWithSubject(@Param("userId") String userId);
    
    @org.springframework.data.jpa.repository.Modifying
    @Query("DELETE FROM FavoriteSubject f WHERE f.user.userId = :userId AND f.subject.subjectId = :subjectId")
    void deleteByUserUserIdAndSubjectId(@Param("userId") String userId, @Param("subjectId") Long subjectId);
    
    @Query("SELECT COUNT(f) FROM FavoriteSubject f WHERE f.subject.subjectId = :subjectId")
    int countBySubjectId(@Param("subjectId") Long subjectId);
}