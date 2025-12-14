package com.quizuniverse.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.quizuniverse.entity.QuestionOption;

public interface QuestionOptionRepository extends JpaRepository<QuestionOption, Long> {}