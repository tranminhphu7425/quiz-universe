package com.quizuniverse.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.quizuniverse.entity.CtuSchedule;

public interface CtuScheduleRepository extends JpaRepository<CtuSchedule, Long> {
    Optional<CtuSchedule> findByUserId(String userId);
}

