package com.quizuniverse.controller;

import com.quizuniverse.dto.LoginRequest;
import com.quizuniverse.dto.LoginResponse;
import com.quizuniverse.dto.RegisterRequest;
import com.quizuniverse.dto.RegisterResponse;
import com.quizuniverse.dto.UserDTO;
import com.quizuniverse.entity.User;
import com.quizuniverse.repository.UserRepository;
import com.quizuniverse.service.AuthService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.UUID;


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
    public ResponseEntity<RegisterResponse> register(@RequestBody RegisterRequest request) {
       RegisterResponse response = authService.register(request);
        return ResponseEntity.ok(response);
    }
    
}
