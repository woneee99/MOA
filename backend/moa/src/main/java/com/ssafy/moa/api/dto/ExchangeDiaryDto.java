package com.ssafy.moa.api.dto;

import com.ssafy.moa.api.dto.member.MemberDto;
import com.ssafy.moa.api.entity.Member;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

public class ExchangeDiaryDto {

    @Getter
    @NoArgsConstructor
    public static class ExchangeDiaryRequest {
        private String exchangeDiaryTitle;
        private String exchangeDiaryContent;
        private Long memberId;
    }

    @Getter
    public static class ExchangeDiaryDetailResponse {
        private MemberDto member;
        private String exchangeDiaryTitle;
        private String exchangeDiaryContent;
        private String exchangeDiaryImgUrl;
        private LocalDateTime exchangeDiaryDate;

        @Builder
        public ExchangeDiaryDetailResponse(MemberDto member, String exchangeDiaryTitle, String exchangeDiaryContent, String exchangeDiaryImgUrl, LocalDateTime exchangeDiaryDate) {
            this.member = member;
            this.exchangeDiaryTitle = exchangeDiaryTitle;
            this.exchangeDiaryContent = exchangeDiaryContent;
            this.exchangeDiaryImgUrl = exchangeDiaryImgUrl;
            this.exchangeDiaryDate = exchangeDiaryDate;
        }
    }

    @Getter
    public static class ExchangeDiaryResponse {
        List<ExchangeDiaryResponse> exchangeDiaryResponseList;


    }

}
