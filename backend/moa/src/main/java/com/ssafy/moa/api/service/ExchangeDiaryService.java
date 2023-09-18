package com.ssafy.moa.api.service;

import com.ssafy.moa.api.dto.ExchangeDiaryDto;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface ExchangeDiaryService {
    Long saveExchangeDiary(MultipartFile multipartFile, ExchangeDiaryDto.ExchangeDiaryRequest exchangeDiaryRequest) throws IOException;
}
