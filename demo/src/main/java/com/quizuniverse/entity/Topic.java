package com.quizuniverse.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "topics")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Topic {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "topic_id")
    private Long id;

    // Mỗi topic thuộc về 1 subject
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "subject_id", nullable = false)
    private Subject subject;

    // Topic cha (self-reference)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "parent_id")
    private Topic parent;

    @Column(length = 32)
    private String code;

    @Column(nullable = false, length = 160)
    private String name;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(name = "sort_order")
    private Integer sortOrder;
}
