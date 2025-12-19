package com.quizuniverse.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "user_favorite_subjects")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FavoriteSubject {
    
    @EmbeddedId
    private FavoriteSubjectId id;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("userId")
    @JoinColumn(name = "user_id")
    private User user;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("subjectId")
    @JoinColumn(name = "subject_id")
    private Subject subject;
    
    @Column(name = "created_at")
    private LocalDateTime createdAt;
}