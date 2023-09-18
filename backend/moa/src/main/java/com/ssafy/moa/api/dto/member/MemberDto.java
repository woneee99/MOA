package com.ssafy.moa.api.dto.member;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class MemberDto {

    private Long memberId;
    private String memberName;
    private String memberEmail;

    @Builder
    public MemberDto(Long memberId, String memberEmail, String memberName) {
        this.memberId = memberId;
        this.memberEmail = memberEmail;
        this.memberName = memberName;
    }
}
