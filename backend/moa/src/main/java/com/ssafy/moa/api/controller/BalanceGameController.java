package com.ssafy.moa.api.controller;

import com.ssafy.moa.api.dto.BalanceGameDto;
import com.ssafy.moa.api.jwt.JwtTokenProvider;
import com.ssafy.moa.api.service.BalanceGameService;
import com.ssafy.moa.common.utils.ApiUtils;
import com.ssafy.moa.common.utils.ApiUtils.ApiResult;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import static com.ssafy.moa.common.utils.ApiUtils.success;
@RestController
@RequestMapping("/balance")
@RequiredArgsConstructor
@Slf4j
public class BalanceGameController {
    private final BalanceGameService balanceGameService;
    private final JwtTokenProvider jwtTokenProvider;

    @Operation(summary = "밸런스게임 등록", description = "밸런스게임을 등록할 수 있습니다.", tags = { "BalanceGame Controller" })
    // Todo : 추후 authentication를 사용해서 실제 memberId로 변경
    @PostMapping
    public ApiResult<Long> createBalanceGame(/*@RequestHeader("Authorization") String header,*/ @RequestBody BalanceGameDto balanceGameDto){
//        String token = header.substring(7);
//        Authentication authentication = jwtTokenProvider.getAuthentication(token);
        Long memberId = 4L;
        log.info(balanceGameDto.toString());
        return success(balanceGameService.createBalanceGame(memberId, balanceGameDto));
    }
}
