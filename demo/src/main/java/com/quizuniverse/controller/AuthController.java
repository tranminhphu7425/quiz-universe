package com.quizuniverse.controller;

import com.quizuniverse.dto.LoginRequest;
import com.quizuniverse.dto.UserDTO;
import com.quizuniverse.entity.User;
import com.quizuniverse.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        if (request.getEmail() == null || request.getPassword() == null) {
            return ResponseEntity.badRequest().body("Thiếu email hoặc mật khẩu");
        }

        User user = userRepository.findByEmail(request.getEmail());

        if (user == null || !user.getPasswordHash().equals(request.getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("Sai email hoặc mật khẩu");
        }

        // Giả lập token (sau này dùng JWT thì thay ở đây)
        String token = UUID.randomUUID().toString();

        UserDTO userDTO = new UserDTO(user);

        return ResponseEntity.ok(Map.of(
                "token", token,
                "user", userDTO
        ));
    }
}
