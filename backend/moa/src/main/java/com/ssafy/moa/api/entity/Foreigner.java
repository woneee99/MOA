package com.ssafy.moa.api.entity;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
public class Foreigner {

    @Id
    @GeneratedValue
    @Column(name = "foreigner_id")
    private Long foreignerId;

    @Column(length = 100)
    private String foreignerKoreaName;
    private int foreignerLikeGender;

    @ManyToOne
    @JoinColumn(name = "member_id", referencedColumnName = "member_id")
    private Member member;

    @ManyToOne
    @JoinColumn(name = "nation_code", referencedColumnName = "nation_code")
    private NationCode nationCode;

    @OneToOne
    @JoinColumn(name = "buddy_id")
    private Buddy buddy;

    public void update(int foreignerLikeGender) {
        this.foreignerLikeGender = foreignerLikeGender;
    }

    //회원가입 시 사용할 Foreigner Builder
    public Foreigner(Member member, NationCode nationCode) {
        this.member = member;
        this.nationCode = nationCode;
    }

}
