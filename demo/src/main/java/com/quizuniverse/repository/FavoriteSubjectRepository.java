package com.quizuniverse.repository;

import com.quizuniverse.entity.Subject;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.Modifying;

import java.util.List;

public interface FavoriteSubjectRepository extends JpaRepository<Subject, Long> {

    @Modifying
    @Transactional
    @Query(value = "INSERT IGNORE INTO user_favorite_subjects (user_id, subject_id) VALUES (:userId, :subjectId)", nativeQuery = true)
    void insertIgnore(@Param("userId") Long userId, @Param("subjectId") Long subjectId);

    @Modifying
    @Transactional
    @Query(value = "DELETE FROM user_favorite_subjects WHERE user_id = :userId AND subject_id = :subjectId", nativeQuery = true)
    void deleteByUserIdAndSubjectId(@Param("userId") Long userId, @Param("subjectId") Long subjectId);

    @Query(value = """
                SELECT s.* FROM subjects s
                JOIN user_favorite_subjects ufs ON s.subject_id = ufs.subject_id
                WHERE ufs.user_id = :userId
            """, nativeQuery = true)
    List<Subject> findFavoriteSubjectsByUserId(@Param("userId") Long userId);

    @Query(value = """
                SELECT COUNT(*)
                FROM user_favorite_subjects ufs
                WHERE ufs.subject_id = :subjectId
            """, nativeQuery = true)
    int countFavoritesBySubjectId(@Param("subjectId") Long subjectId);

}
