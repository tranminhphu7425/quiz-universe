package com.quizuniverse.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.quizuniverse.entity.Subject;
import com.quizuniverse.service.FavoriteSubjectService;

@RestController
@RequestMapping("/api/subjects")
@CrossOrigin(origins = "http://127.0.0.1:5173", allowedHeaders = { "Content-Type", "Authorization" }, methods = {
        RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE,
        RequestMethod.OPTIONS }, allowCredentials = "true", // nếu có gửi cookie/authorization
        maxAge = 3600)


public class FavoriteSubjectController {

    @Autowired
    private FavoriteSubjectService favoriteSubjectService;

    @GetMapping("/favorites")
    public ResponseEntity<List<Subject>> getFavoritesByUserId(@RequestParam("userId") Long userId) {
        List<Subject> favorites = favoriteSubjectService.getFavoriteSubjectsByUserId(userId);
        return ResponseEntity.ok(favorites);
    }

    @PostMapping("/{subjectId}/favorite")
    public ResponseEntity<?> addFavorite(@PathVariable Long subjectId, @RequestParam Long userId) {
        favoriteSubjectService.addFavorite(userId, subjectId);
        return ResponseEntity.ok().body("Đã thêm vào yêu thích");
    }

    @DeleteMapping("/{subjectId}/favorite")
    public ResponseEntity<?> removeFavorite(@PathVariable Long subjectId, @RequestParam Long userId) {
        favoriteSubjectService.removeFavorite(userId, subjectId);
        return ResponseEntity.ok().body("Đã xóa khỏi yêu thích");
    }

    @GetMapping("/{id}/favorites/count")
    public int getFavoriteCount(@PathVariable Long id ){
        return favoriteSubjectService.getFavoriteCount(id);
    }
}


