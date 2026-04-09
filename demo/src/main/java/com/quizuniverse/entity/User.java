package com.quizuniverse.entity;

import java.time.LocalDateTime;

import com.quizuniverse.dto.UserDTO;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

import lombok.Setter;
import lombok.Getter;

@Entity
@Table(name = "users")
@Setter
@Getter
public class User {

    @Id
    @Column(name = "user_id", length = 36, nullable = false, updatable = false)
    private String userId;

    @Column(name = "full_name", length = 255)
    private String fullName;

    @Column(name = "email", nullable = false, unique = true, length = 100)
    private String email;

    @Column(name = "role", nullable = false)
    private String role;

    @Column(name = "created_at", nullable = false, updatable = false, columnDefinition = "timestamp default current_timestamp")
    private LocalDateTime createdAt;

    // @Column(name = "password", nullable = false, length = 255)
    // private String password;

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

    @ManyToOne
    @JoinColumn(name = "university_code")
    private University university;

    @ManyToOne
    @JoinColumn(name = "major_id")
    private Major major;

    @Column(name = "intake_year")
    private Integer intakeYear;


    public UserDTO convertToDTO() {
        return new UserDTO(this);
    }
}
