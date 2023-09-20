package com.ssafy.moa.api.service;


import com.ssafy.moa.api.dto.quiz.QuizQuestionDto;
import com.ssafy.moa.api.dto.quiz.QuizSubmitReqDto;
import com.ssafy.moa.api.dto.quiz.QuizSubmitRespDto;

import java.util.List;

public interface QuizService {
    List<QuizQuestionDto> questionWordQuiz();

    QuizSubmitRespDto submitWordQuiz(QuizSubmitReqDto quizSubmitReqDto);
}
