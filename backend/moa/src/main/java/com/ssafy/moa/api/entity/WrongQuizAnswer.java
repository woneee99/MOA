package com.ssafy.moa.api.entity;


import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
public class WrongQuizAnswer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long wrongQuizAnswerId;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

    @OneToOne
    @JoinColumn(name = "quiz_id")
    private DailyKoreanQuiz quiz;

    @Builder
    public WrongQuizAnswer(Member member, DailyKoreanQuiz quiz) {
        this.member = member;
        this.quiz = quiz;
    }

}
