package com.ssafy.moa.api.repository;

import com.ssafy.moa.api.entity.QuizWrongAnswer;
import com.ssafy.moa.api.repository.querydsl.QuizWrongAnswerQueryRepository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface QuizWrongAnswerRepository extends JpaRepository<QuizWrongAnswer, Long>, QuizWrongAnswerQueryRepository {

    @Query("SELECT qwa FROM QuizWrongAnswer qwa WHERE qwa.member.memberId = :memberId AND qwa.quiz.quizId = :quizId")
    QuizWrongAnswer findByMemberIdAndQuizId(Long memberId, Long quizId);
}
