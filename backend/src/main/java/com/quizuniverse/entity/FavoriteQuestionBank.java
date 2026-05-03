package com.quizuniverse.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "user_favorite_question_banks")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FavoriteQuestionBank {

    @EmbeddedId
    private FavoriteQuestionBankId bankId;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("userId")
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("bankId")
    @JoinColumn(name = "bank_id")
    private QuestionBank questionBank;

    

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Transient
    public String getSubjectName() {
        return questionBank != null && questionBank.getSubject() != null
                ? questionBank.getSubject().getName()
                : null;
    }

}
