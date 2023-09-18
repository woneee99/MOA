package com.ssafy.moa.api.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;

public class ExchangeDiaryDto {

    @Getter
    @NoArgsConstructor
    public static class ExchangeDiaryRequest {
        private String exchangeDiaryContent;
        private Long memberId;
    }
}
