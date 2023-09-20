package com.ssafy.moa.api.controller;

import com.ssafy.moa.api.dto.quiz.QuizQuestionDto;
import com.ssafy.moa.api.dto.quiz.QuizSubmitReqDto;
import com.ssafy.moa.api.dto.quiz.QuizSubmitRespDto;
import com.ssafy.moa.api.service.QuizService;
import com.ssafy.moa.common.utils.ApiUtils;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import com.ssafy.moa.common.utils.ApiUtils.ApiResult;
import static com.ssafy.moa.common.utils.ApiUtils.success;

@RestController
@RequiredArgsConstructor
@RequestMapping("/quiz")
public class QuizController {

    private final QuizService quizService;

    // 단어 퀴즈 출제 API
    @GetMapping("/word")
    @Operation(summary = "단어 퀴즈 출제 API", description = "단어 퀴즈를 랜덤으로 15개 출제하는 API입니다.")
    public ApiResult<List<QuizQuestionDto>> questionWordQuiz(){
        List<QuizQuestionDto> quizQuestionDtoList = quizService.questionWordQuiz();
        return success(quizQuestionDtoList);
    }

    // 단어 퀴즈 제출 API
    @PostMapping("/word")
    @Operation(summary = "단어 퀴즈 제출 API", description = "단어 퀴즈를 풀고 한 문제씩 답을 확인하는 API입니다.")
    public ApiResult<QuizSubmitRespDto> submitWordQuiz(@RequestBody QuizSubmitReqDto quizSubmitReqDto) {
        QuizSubmitRespDto quizSubmitRespDto = quizService.submitWordQuiz(quizSubmitReqDto);
        return success(quizSubmitRespDto);
    }


}
