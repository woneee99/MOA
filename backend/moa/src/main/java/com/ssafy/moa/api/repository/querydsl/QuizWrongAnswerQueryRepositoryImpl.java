package com.ssafy.moa.api.repository.querydsl;

import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import static com.ssafy.moa.api.entity.QQuizWrongAnswer.quizWrongAnswer;

@Repository
@RequiredArgsConstructor
public class QuizWrongAnswerQueryRepositoryImpl implements QuizWrongAnswerQueryRepository {

    private final JPAQueryFactory jpaQueryFactory;

    @Override
    public Long getWrongQuizCount(Long memberId) {
        return jpaQueryFactory.select(quizWrongAnswer.count())
                .from(quizWrongAnswer)
                .where(quizWrongAnswer.member.memberId.eq(memberId))
                .fetchOne();
    }
}
