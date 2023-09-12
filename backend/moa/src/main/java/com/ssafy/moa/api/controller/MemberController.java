package com.ssafy.moa.api.controller;

import com.ssafy.moa.api.jwt.JwtTokenProvider;
import com.ssafy.moa.api.service.MemberService;
import com.ssafy.moa.dto.LoginReqDto;
import com.ssafy.moa.dto.MemberSignUpDto;
import com.ssafy.moa.dto.TokenRespDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/member")
public class MemberController {

    private final MemberService memberService;
    private final JwtTokenProvider jwtTokenProvider;

    // 회원가입
    @PostMapping("/signup")
    public ResponseEntity<MemberSignUpDto> signUp(@RequestBody MemberSignUpDto memberSignUpReqDto) {
        MemberSignUpDto memberSignUpRespDto = memberService.signUp(memberSignUpReqDto);
        return ResponseEntity.ok(memberSignUpRespDto);
    }

    // 로그인
    @PostMapping("/login")
    public ResponseEntity<TokenRespDto> login(@RequestBody LoginReqDto loginReqDto) {
        TokenRespDto tokenRespDto = memberService.login(loginReqDto);
        return ResponseEntity.ok(tokenRespDto);
    }

    // 테스트
    @GetMapping("/test")
    public ResponseEntity<?> test(@RequestHeader("Authorization") String header) {
        String token = header.substring(7);
        Authentication authentication = jwtTokenProvider.getAuthentication(token);

        if (authentication != null) {
            // 인증 및 권한 검사 통과
            // 원하는 동작 수행
            return ResponseEntity.ok(authentication.getName() + "님은 접근 가능합니다.");
        } else {
            // 인증 및 권한 검사 실패
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Access denied");
        }
    }



}
