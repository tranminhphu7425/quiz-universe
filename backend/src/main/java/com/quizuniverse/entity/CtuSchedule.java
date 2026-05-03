package com.quizuniverse.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.Table;

import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "ctu_schedules")
@Getter
@Setter
public class CtuSchedule {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "user_id", length = 36, nullable = false)
    private String userId;

    /**
     * Lưu JSON (addedCourses + selectedClasses + ...), để không phụ thuộc schema frontend.
     */
    @Lob
    @Column(name = "data_json", columnDefinition = "LONGTEXT", nullable = false)
    private String dataJson;

    /**
     * Để DB tự set bằng DEFAULT CURRENT_TIMESTAMP.
     * Tránh Hibernate insert NULL -> lỗi "created_at cannot be null".
     */
    @Column(name = "created_at", nullable = false, updatable = false, insertable = false)
    private LocalDateTime createdAt;

    /**
     * Để DB tự set bằng ON UPDATE CURRENT_TIMESTAMP.
     */
    @Column(name = "updated_at", nullable = false, insertable = false, updatable = false)
    private LocalDateTime updatedAt;
}

