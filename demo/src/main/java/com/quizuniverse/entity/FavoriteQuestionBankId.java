package com.quizuniverse.entity;

import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;


@Embeddable
@Data
@NoArgsConstructor
@AllArgsConstructor
public class FavoriteQuestionBankId implements Serializable {
    private String userId;
    private Long bankId;
}