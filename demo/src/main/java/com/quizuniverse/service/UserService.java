package com.quizuniverse.service;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.*;
import org.springframework.stereotype.*;

import com.quizuniverse.repository.MajorRepository;
import com.quizuniverse.repository.UniversityRepository;
import com.quizuniverse.repository.UserRepository;
import com.quizuniverse.dto.UserDTO;
import com.quizuniverse.entity.User;

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
        user.setUpdatedAt(LocalDateTime.now());
        userRepository.save(user);

        return new UserDTO(user);

    }

}
