package com.quizuniverse.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.quizuniverse.dto.UserDTO;
import com.quizuniverse.entity.User;
import com.quizuniverse.repository.UserRepository;
import com.quizuniverse.exception.ResourceNotFoundException;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;


    public UserDTO getUserById(UUID id) {
        return userRepository.findByUserId(id.toString())
                .map(User::convertToDTO)
                .orElseThrow(() -> new ResourceNotFoundException("User not found: " + id));
    }

    public UserDTO updateUserInfo(UUID userId, UserDTO userDTO) {
        User user = userRepository.findByUserId(userId.toString())
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

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

    /* ================= ADMIN ================= */

    /**
     * Lấy danh sách tất cả users (cho admin)
     */
    public List<UserDTO> getAllUsers() {
        return userRepository.findAll()
                .stream()
                .map(User::convertToDTO)
                .collect(Collectors.toList());
    }

    /**
     * Cập nhật vai trò của user
     */
    public UserDTO updateUserRole(String userId, String newRole) {
        User user = userRepository.findByUserId(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found: " + userId));

        user.setRole(newRole);
        user.setUpdatedAt(LocalDateTime.now());
        userRepository.save(user);
        return new UserDTO(user);
    }

    /**
     * Bật/tắt trạng thái hoạt động của user
     */
    public UserDTO toggleUserActive(String userId) {
        User user = userRepository.findByUserId(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found: " + userId));

        Boolean current = user.getIsActive();
        user.setIsActive(current == null || !current);
        user.setUpdatedAt(LocalDateTime.now());
        userRepository.save(user);
        return new UserDTO(user);
    }

    /**
     * Xóa user (cho admin)
     */
    public void deleteUser(String userId) {
        User user = userRepository.findByUserId(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found: " + userId));
        userRepository.delete(user);
    }
}