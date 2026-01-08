package com.quizuniverse.controller;

import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.quizuniverse.dto.ChangePasswordRequest;
import com.quizuniverse.dto.LoginRequest;
import com.quizuniverse.dto.LoginResponse;
import com.quizuniverse.dto.RegisterRequest;
import com.quizuniverse.dto.RegisterResponse;
import com.quizuniverse.service.AuthService;

import jakarta.validation.Valid;


@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")

public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest request) {
        return ResponseEntity.ok(authService.login(request));
    }

    @PostMapping("/register")
    public ResponseEntity<RegisterResponse> register(@Valid @RequestBody RegisterRequest request) {
       RegisterResponse response = authService.register(request);
        return ResponseEntity.ok(response);
    }


    @PostMapping("/change-password")

    public ResponseEntity<?> changePassword(

        @RequestBody ChangePasswordRequest payload,
        Authentication authentication

    ) {
        UUID userId = UUID.fromString(authentication.getName());
        authService.changePassword(userId, payload);
        return ResponseEntity.ok(Map.of("message", "Password changed successfully"));

    }
    
}
