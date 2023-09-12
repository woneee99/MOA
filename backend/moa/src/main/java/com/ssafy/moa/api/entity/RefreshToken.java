package com.ssafy.moa.api.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@Getter
public class RefreshToken {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column
    private Long refreshTokenId;

    private String memberEmail;
    private String token;

    private RefreshToken(String email, String token) {
        memberEmail = email; // 이게 몰까나? 이건 왜 this를 안해줬지 ???
        this.token = token;
    }

    public static RefreshToken createToken(String memberEmail, String token) {
        return new RefreshToken(memberEmail, token);
    }

    public void changeToken(String token) {
        this.token = token;
    }
}
