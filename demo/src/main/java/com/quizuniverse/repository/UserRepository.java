package com.quizuniverse.repository;

import com.quizuniverse.entity.User;

import java.util.Optional;


import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, String> {
    Optional<User> findByEmail(String email);

    Optional<User> findByUsername(String username);
    Optional<User> findByUserId(String userId);
    
    Boolean existsByEmail(String email);
}
