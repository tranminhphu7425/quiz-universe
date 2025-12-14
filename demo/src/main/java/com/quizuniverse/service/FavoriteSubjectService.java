
package com.quizuniverse.service;

import com.quizuniverse.repository.FavoriteSubjectRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.quizuniverse.entity.Subject;
import java.util.List;


@Service
public class FavoriteSubjectService {

    @Autowired
    private FavoriteSubjectRepository favoriteSubjectRepository;

    public List<Subject> getFavoriteSubjectsByUserId(Long userId) {
        return favoriteSubjectRepository.findFavoriteSubjectsByUserId(userId);
    }

    @Transactional
    public void addFavorite(Long userId, Long subjectId) {
        favoriteSubjectRepository.insertIgnore(userId, subjectId);
    }

    @Transactional
    public void removeFavorite(Long userId, Long subjectId) {
        favoriteSubjectRepository.deleteByUserIdAndSubjectId(userId, subjectId);
    }


    public int getFavoriteCount(Long subjectId){
        return favoriteSubjectRepository.countFavoritesBySubjectId(subjectId);
    }
}
