package com.quizuniverse.controller;

import com.quizuniverse.dto.*;
import com.quizuniverse.service.FavoriteService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/favorites")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class FavoriteController {

    private final FavoriteService favoriteService;

    // Question Bank Endpoints

    @PostMapping("/question-banks/{bankId}")
    public ResponseEntity<FavoriteQuestionBankDTO> addFavoriteQuestionBank(
            @PathVariable Long bankId,
            Authentication authentication
    ) {
        UUID userId = UUID.fromString(authentication.getName());
        System.out.println("userId in FavoriteController: " + userId);
        FavoriteQuestionBankDTO result =
                favoriteService.addFavoriteQuestionBank(userId, bankId);
        return ResponseEntity.ok(result);
    }

    @DeleteMapping("/question-banks/{bankId}")
    public ResponseEntity<Void> removeFavoriteQuestionBank(
            @PathVariable Long bankId,
            Authentication authentication
    ) {
        UUID userId = UUID.fromString(authentication.getName());
        favoriteService.removeFavoriteQuestionBank(userId, bankId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/question-banks")
    public ResponseEntity<List<FavoriteQuestionBankDTO>> getUserFavoriteQuestionBanks(
            Authentication authentication
    ) {
        
        UUID userId = UUID.fromString(authentication.getName());
        System.out.println("userId in FavoriteController: " + userId);
        return ResponseEntity.ok(
                favoriteService.getUserFavoriteQuestionBanks(userId)
        );
    }

    @GetMapping("/question-banks/{bankId}/status")
    public ResponseEntity<Boolean> isQuestionBankFavorite(
            @PathVariable Long bankId,
            Authentication authentication
    ) {
        UUID userId = UUID.fromString(authentication.getName());
        return ResponseEntity.ok(
                favoriteService.isQuestionBankFavorite(userId, bankId)
        );
    }

    /* ================= SUBJECT ================= */

    @PostMapping("/subjects/{subjectId}")
    public ResponseEntity<FavoriteSubjectDTO> addFavoriteSubject(
            @PathVariable Long subjectId,
            Authentication authentication
    ) {
        UUID userId = UUID.fromString(authentication.getName());
        return ResponseEntity.ok(
                favoriteService.addFavoriteSubject(userId, subjectId)
        );
    }

    @DeleteMapping("/subjects/{subjectId}")
    public ResponseEntity<Void> removeFavoriteSubject(
            @PathVariable Long subjectId,
            Authentication authentication
    ) {
        UUID userId = UUID.fromString(authentication.getName());
        favoriteService.removeFavoriteSubject(userId, subjectId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/subjects")
    public ResponseEntity<List<FavoriteSubjectDTO>> getUserFavoriteSubjects(
            Authentication authentication
    ) {
        UUID userId = UUID.fromString(authentication.getName());
        return ResponseEntity.ok(
                favoriteService.getUserFavoriteSubjects(userId)
        );
    }

    @GetMapping("/subjects/{subjectId}/status")
    public ResponseEntity<Boolean> isSubjectFavorite(
            @PathVariable Long subjectId,
            Authentication authentication
    ) {
        UUID userId = UUID.fromString(authentication.getName());
        return ResponseEntity.ok(
                favoriteService.isSubjectFavorite(userId, subjectId)
        );
    }

    /* ================= COMBINED ================= */

    @GetMapping("/me")
    public ResponseEntity<UserFavoriteResponse> getUserFavorites(
            Authentication authentication
    ) {
        UUID userId = UUID.fromString(authentication.getName());
        return ResponseEntity.ok(
                favoriteService.getUserFavorites(userId)
        );
    }

    @PostMapping("/toggle")
    public ResponseEntity<ToggleFavoriteResponse> toggleFavorite(
            @RequestBody ToggleFavoriteRequest request,
            Authentication authentication
    ) {
        UUID userId = UUID.fromString(authentication.getName());
        request.setUserId(userId.toString());
        return ResponseEntity.ok(
                favoriteService.toggleFavorite(request)
        );
    }



    @PostMapping("/status")
    public ResponseEntity<FavoritesStatusResponse> getFavoritesStatus(
            @RequestBody FavoritesStatusRequest request,
            Authentication authentication) {
        String userIdStr = (String) authentication.getPrincipal();
        UUID userId = UUID.fromString(userIdStr);

        FavoritesStatusResponse response = favoriteService.getFavoritesStatus(
                userId,
                request.getBankIds(),
                request.getSubjectIds());

        return ResponseEntity.ok(response);
    }

}
