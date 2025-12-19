package com.quizuniverse.controller;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

import org.apache.catalina.connector.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;

import com.quizuniverse.dto.UserDTO;
import com.quizuniverse.entity.Major;
import com.quizuniverse.entity.University;
import com.quizuniverse.entity.User;
import com.quizuniverse.repository.MajorRepository;
import com.quizuniverse.repository.UniversityRepository;
import com.quizuniverse.repository.UserRepository;
import com.quizuniverse.service.UserService;

import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(
    origins = "http://localhost:5173",
    allowedHeaders = { "Content-Type", "Authorization" },
    methods = {
        RequestMethod.GET, RequestMethod.POST,
        RequestMethod.PUT, RequestMethod.DELETE,
        RequestMethod.OPTIONS
    },
    allowCredentials = "true",
    maxAge = 3600
)
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    /**
     * Lấy thông tin user hiện tại (từ JWT)
     */
    @GetMapping("/me")
    public ResponseEntity<UserDTO> getCurrentUser(Authentication authentication) {
        UUID userId = UUID.fromString(authentication.getName());
        UserDTO dto = userService.getUserById(userId);
        return ResponseEntity.ok(dto);
    }

    /**
     * Cập nhật thông tin user hiện tại
     */
    @PutMapping("/me")
    public ResponseEntity<UserDTO> updateCurrentUser(
            @RequestBody UserDTO userDTO,
            Authentication authentication
    ) {
        UUID userId = UUID.fromString(authentication.getName());
        UserDTO updated = userService.updateUserInfo(userId, userDTO);
        return ResponseEntity.ok(updated);
    }
}
