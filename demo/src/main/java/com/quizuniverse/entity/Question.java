package com.quizuniverse.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "questions")
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Question {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "question_id")
    private Long id;

    // Mỗi question thuộc về 1 question bank
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "bank_id", nullable = false)
    private QuestionBank bank;

    // Mỗi question thuộc về 1 subject
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "subject_id", nullable = false)
    private Subject subject;

    @Column(name = "stem", columnDefinition = "TEXT", nullable = false)
    private String stem;

    @Column(name = "explanation", columnDefinition = "TEXT")
    private String explanation;

    @Enumerated(EnumType.STRING)
    @Column(name = "question_type", nullable = false)
    private QuestionType questionType;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private QuestionStatus status;

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    /**
     * Một question có nhiều option
     * - mappedBy = "question": FK nằm ở QuestionOption
     * - cascade = ALL: lưu/xóa question → option đi theo
     * - orphanRemoval = true: remove option khỏi list → xóa DB
     */
    @OneToMany(
        mappedBy = "question",
        cascade = CascadeType.ALL,
        orphanRemoval = true,
        fetch = FetchType.LAZY
    )
    @Builder.Default
    private List<QuestionOption> options = new ArrayList<>();

    // ===== Enum =====
    public enum QuestionType {
        mcq_single,
        mcq_multiple,
        true_false,
        fill_in
    }

    public enum QuestionStatus {
        draft,
        review,
        approved,
        retired
    }

    // ===== Lifecycle =====
    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = this.createdAt;
    }

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }

    // ===== Business methods (rất nên có) =====
    public void addOption(QuestionOption option) {
        options.add(option);
        option.setQuestion(this);
    }

    public void removeOption(QuestionOption option) {
        options.remove(option);
        option.setQuestion(null);
    }

    public void changeType(QuestionType type) {
        this.questionType = type;
    }

    public void changeStatus(QuestionStatus status) {
        this.status = status;
    }
}
