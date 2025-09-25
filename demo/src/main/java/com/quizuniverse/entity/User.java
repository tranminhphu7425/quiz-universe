package com.quizuniverse.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

import com.quizuniverse.dto.UserDTO;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Long userId;

    @Column(name = "full_name", length = 255)
    private String fullName;

    @Column(name = "email", nullable = false, unique = true, length = 100)
    private String email;


    @Column(name = "role", nullable = false)
    private String role;

    @Column(name = "created_at", nullable = false, updatable = false,
            columnDefinition = "timestamp default current_timestamp")
    private LocalDateTime createdAt;

    @Column(name = "password", nullable = false, length = 255)
    private String password;

    @Column(name = "username", nullable = false, unique = true, length = 50)
    private String username;

    @Column(name = "is_active")
    private Boolean isActive;

    @Column(name = "last_login")
    private LocalDateTime lastLogin;

    @Column(name = "password_hash", length = 255)
    private String passwordHash;

    @Column(name = "phone", length = 255)
    private String phone;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;



    // ===== Getters và Setters =====
    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public Boolean getIsActive() { return isActive; }
    public void setIsActive(Boolean isActive) { this.isActive = isActive; }

    public LocalDateTime getLastLogin() { return lastLogin; }
    public void setLastLogin(LocalDateTime lastLogin) { this.lastLogin = lastLogin; }

    public String getPasswordHash() { return passwordHash; }
    public void setPasswordHash(String passwordHash) { this.passwordHash = passwordHash; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }

    public UserDTO convertToDTO(){
        return new UserDTO(this);
    }
}
