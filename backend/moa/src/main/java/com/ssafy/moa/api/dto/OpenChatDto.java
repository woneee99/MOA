package com.ssafy.moa.api.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

public class OpenChatDto {

    @Getter
    @NoArgsConstructor
    public static class SaveOpenChatRequest {
        private Long memberId;
        private String openChatTitle;
        private String openChatContent;
    }
}
