package com.quizuniverse.entity;

import java.time.LocalDateTime;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "questions")

public class Question {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "question_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "subject_id", nullable = false)
    private Subject subject;

    @Column(name = "stem", columnDefinition = "TEXT", nullable = false)
    private String stem;

    @Column(name = "explanation", columnDefinition = "TEXT")
    private String explanation;

    @Enumerated(EnumType.STRING)
    @Column(name = "question_type")
    private QuestionType questionType;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private QuestionStatus status;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    // @OneToMany(mappedBy = "question", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    // private List<QuestionOption> options;

    // Thay đổi annotation @OneToMany trong entity Question
    @OneToMany(mappedBy = "question", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private List<QuestionOption> options;

    public enum QuestionType {
        mcq_single,
        mcq_multiple,
        true_false,
        fill_in,
    }

    public enum QuestionStatus {
        draft, review, approved, retired
    }

    // Getter methods
    public Long getId() {
        return id;
    }

    public Subject getSubject() {
        return subject;
    }

    public String getStem() {
        return stem;
    }

    public String getExplanation() {
        return explanation;
    }

    public QuestionType getQuestionType() {
        return questionType;
    }

    public QuestionStatus getStatus() {
        return status;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public List<QuestionOption> getOptions() {
        return options;
    }

    // Setter methods
    public void setId(Long id) {
        this.id = id;
    }

    public void setSubject(Subject subject) {
        this.subject = subject;
    }

    public void setStem(String stem) {
        this.stem = stem;
    }

    public void setExplanation(String explanation) {
        this.explanation = explanation;
    }

    public void setQuestionType(QuestionType questionType) {
        this.questionType = questionType;
    }

    public void setStatus(QuestionStatus status) {
        this.status = status;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }

    public void setOptions(List<QuestionOption> options) {
        this.options = options;
    }

    public void setQuestionType(String questionType) {
        this.questionType = QuestionType.valueOf(questionType);
    }
}
