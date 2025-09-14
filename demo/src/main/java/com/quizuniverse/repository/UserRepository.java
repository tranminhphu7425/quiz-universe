package com.quizuniverse.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.quizuniverse.entity.User;

public interface UserRepository extends JpaRepository<User, Integer> {
    User findByEmail(String email);
}
