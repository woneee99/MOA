package com.ssafy.moa.api.controller;

import com.ssafy.moa.api.dto.ExchangeDiaryDto.*;
import com.ssafy.moa.api.service.ExchangeDiaryService;
import com.ssafy.moa.common.utils.ApiUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

import static com.ssafy.moa.common.utils.ApiUtils.success;

@RestController
@RequestMapping("/buddy/diary")
@RequiredArgsConstructor
public class ExchangeDiaryController {

    private final ExchangeDiaryService exchangeDiaryService;

    @PostMapping
    public ApiUtils.ApiResult<Long> saveExchangeDiary(MultipartFile multipartFile, @RequestPart(value = "exchangeDiaryRequest") ExchangeDiaryRequest exchangeDiaryRequest) throws IOException {
        return success(exchangeDiaryService.saveExchangeDiary(multipartFile, exchangeDiaryRequest));
    }

}
