package com.ssafy.moa.api.repository.querydsl;

public interface QuizWrongAnswerQueryRepository {

    Long getWrongQuizCount(Long memberId);

}
