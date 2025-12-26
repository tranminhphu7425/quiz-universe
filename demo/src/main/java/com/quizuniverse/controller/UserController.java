package com.quizuniverse.controller;

import java.util.List;
import java.util.UUID;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.quizuniverse.dto.ProfileSetupRequest;
import com.quizuniverse.dto.UserDTO;
import com.quizuniverse.entity.Major;
import com.quizuniverse.entity.University;
import com.quizuniverse.entity.User;
import com.quizuniverse.service.MajorService;
import com.quizuniverse.service.ProfileService;
import com.quizuniverse.service.UniversityService;
import com.quizuniverse.service.UserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api")
@CrossOrigin(
    origins = "http://localhost:5173",
    allowedHeaders = { "Content-Type", "Authorization" },
    allowCredentials = "true",
    maxAge = 3600
)
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    private final UniversityService universityService;
    private final MajorService majorService;
    private final ProfileService profileService;

    /* ================= USER ================= */

    /**
     * Lấy thông tin user hiện tại (từ JWT)
     */
    @GetMapping("/users")
    public ResponseEntity<UserDTO> getCurrentUser(Authentication authentication) {
        UUID userId = UUID.fromString(authentication.getName());
        UserDTO dto = userService.getUserById(userId);
        return ResponseEntity.ok(dto);
    }

    /**
     * Cập nhật thông tin user hiện tại
     */
    @PutMapping("/users")
    public ResponseEntity<UserDTO> updateCurrentUser(
            @RequestBody UserDTO userDTO,
            Authentication authentication
    ) {
        UUID userId = UUID.fromString(authentication.getName());
        UserDTO updated = userService.updateUserInfo(userId, userDTO);
        return ResponseEntity.ok(updated);
    }

    /* ================= PROFILE ================= */

    /**
     * Lấy danh sách universities
     */
    @GetMapping("/universities")
    public List<University> getUniversities() {
        return universityService.getAll();
    }

    /**
     * Lấy danh sách majors
     */
    @GetMapping("/majors")
    public List<Major> getMajors() {
        return majorService.getAll();
    }

    /**
     * Setup profile lần đầu
     */
    @PostMapping("/profile/setup")
    public User setupProfile(
            @RequestBody ProfileSetupRequest req,
            Authentication authentication
    ) {
        UUID userId = UUID.fromString(authentication.getName());
        return profileService.updateProfile(userId, req);
    }

}
