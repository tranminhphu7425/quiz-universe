package com.quizuniverse.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "question_options")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class QuestionOption {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "option_id")
    private Long id;

    // Nhiều option thuộc về 1 question
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "question_id", nullable = false)
    private Question question;

    @Column(name = "label", length = 8, nullable = false)
    private String label;

    @Column(name = "content", columnDefinition = "TEXT", nullable = false)
    private String content;

    @Column(name = "is_correct", nullable = false)
    private Boolean isCorrect;

    @Column(name = "sort_order")
    private Integer sortOrder;
}
