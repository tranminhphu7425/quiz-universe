package com.quizuniverse.service;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.quizuniverse.dto.UserDTO;
import com.quizuniverse.entity.User;
import com.quizuniverse.repository.UserRepository;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;


    public UserDTO getUserById(Long id) {
        return userRepository.findByUserId(id)
                .map(User::convertToDTO)
                .orElse(null);
    }

    public UserDTO updateUserInfo(Long userId, UserDTO userDTO) {
        User user = userRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setFullName(userDTO.getName());
        user.setUsername(userDTO.getUsername());
        user.setPhone(userDTO.getPhone());
        user.setEmail(userDTO.getEmail());
        user.setUniversity(userDTO.getUniversity());
        user.setMajor(userDTO.getMajor());
        user.setUpdatedAt(LocalDateTime.now());
        userRepository.save(user);

        return new UserDTO(user);

    }

}