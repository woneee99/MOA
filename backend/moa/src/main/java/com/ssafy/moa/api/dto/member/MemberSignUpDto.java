package com.ssafy.moa.api.dto.member;

import com.ssafy.moa.api.entity.Member;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
public class MemberSignUpDto {

    private String memberEmail;
    private String memberPassword;
    private String memberName;
    private Integer memberGender;
    private Boolean memberIsForeigner;
    private String nationName; // 외국인 유학생일 경우 국가 이름 필요

    @Builder
    public MemberSignUpDto(Member member) {
        this.memberEmail = member.getMemberEmail();
        this.memberPassword = member.getMemberPassword();
        this.memberName = member.getMemberName();
        this.memberGender = member.getMemberGender();
        this.memberIsForeigner = member.getMemberIsForeigner();
    }

}
