package com.ssafy.moa.api.service;

import com.ssafy.moa.api.entity.Member;
import com.ssafy.moa.api.jwt.JwtTokenProvider;
import com.ssafy.moa.api.jwt.MyUserDetailsService;
import com.ssafy.moa.api.repository.MemberRepository;
import com.ssafy.moa.dto.LoginReqDto;
import com.ssafy.moa.dto.MemberSignUpDto;
import com.ssafy.moa.dto.TokenRespDto;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;
    private final MyUserDetailsService myUserDetailsService;
    private final JwtTokenProvider jwtTokenProvider;

    // 회원가입 구현
    @Transactional
    public MemberSignUpDto signUp(MemberSignUpDto memberSignUpReqDto) {
        // 중복체크 나중에 ..

        String encodedPassword = passwordEncoder.encode(memberSignUpReqDto.getMemberPassword());

        String memberEmail = memberSignUpReqDto.getMemberEmail();
        String memberName = memberSignUpReqDto.getMemberName();
        Boolean memberGender = memberSignUpReqDto.getMemberGender();
        Boolean memberIsForeigner = memberSignUpReqDto.getMemberIsForeigner();

        Member member = new Member(memberEmail, encodedPassword, memberName, memberGender, memberIsForeigner, 0);
        memberRepository.save(member);
        return new MemberSignUpDto(member);
    }

    @Transactional
    public TokenRespDto login(LoginReqDto loginReqDto) {
        UserDetails userDetails = myUserDetailsService.loadUserByUsername(loginReqDto.getMemberEmail());

        if(!passwordEncoder.matches(loginReqDto.getMemberPassword(), userDetails.getPassword())) {
            throw new BadCredentialsException(userDetails.getUsername() + "Invalid Password");
        }

        Authentication authentication = new UsernamePasswordAuthenticationToken(
                userDetails.getUsername(), userDetails.getPassword(), userDetails.getAuthorities()
        );

        return new TokenRespDto(
                "Bearer " + jwtTokenProvider.createAccessToken(authentication),
                "Bearer " + jwtTokenProvider.issueRefreshToken(authentication)
        );
    }
}
