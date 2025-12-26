package com.quizuniverse.service;

import com.quizuniverse.dto.LoginRequest;
import com.quizuniverse.dto.LoginResponse;
import com.quizuniverse.dto.RegisterRequest;
import com.quizuniverse.dto.RegisterResponse;
import com.quizuniverse.entity.User;
import com.quizuniverse.repository.UserRepository;
import com.quizuniverse.security.JwtUtil;

import java.time.LocalDateTime;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.quizuniverse.dto.ChangePasswordRequest;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private JwtUtil jwtUtil;
    @Autowired
    private PasswordEncoder passwordEncoder;

    public LoginResponse login(LoginRequest req) {
        User user = userRepository.findByEmail(req.getEmail())
                .orElseThrow(() -> new RuntimeException("Invalid email or password"));

        if (!passwordEncoder.matches(req.getPassword(), user.getPasswordHash())) {
            throw new RuntimeException("Invalid email or password");
        }

        String token = jwtUtil.generateToken(user.getUserId().toString());
        return new LoginResponse(token, user.convertToDTO());
    }

    public RegisterResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email đã tồn tại");
        }
        User user = new User();
        user.setUserId(UUID.randomUUID().toString());
        user.setFullName(request.getName());
        user.setEmail(request.getEmail());
        user.setPasswordHash(passwordEncoder.encode(request.getPassword())); // mã hoá
        user.setRole("user");
        user.setIsActive(true); // có thể set mặc định luôn
        user.setCreatedAt(LocalDateTime.now()); // ✅ thêm dòng này

        User saved = userRepository.save(user);
        String token = jwtUtil.generateToken(saved.getUserId().toString());

        return new RegisterResponse(token, UUID.fromString(saved.getUserId()), saved.getFullName(), saved.getEmail());
    }

    public void changePassword(UUID userId, ChangePasswordRequest payload) {
        User user = userRepository.findById(userId.toString())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!passwordEncoder.matches(payload.getCurrentPassword(), user.getPasswordHash())) {
            throw new RuntimeException("Old password is incorrect");
        }

        user.setPasswordHash(passwordEncoder.encode(payload.getNewPassword()));
        userRepository.save(user);
    }


}
