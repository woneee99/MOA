package com.ssafy.moa.api.controller;

import com.ssafy.moa.api.dto.BalanceGameDto;
import com.ssafy.moa.api.dto.BalanceGameReqDto;
import com.ssafy.moa.api.dto.BalanceGameResDto;
import com.ssafy.moa.api.jwt.JwtTokenProvider;
import com.ssafy.moa.api.service.BalanceGameService;
import com.ssafy.moa.common.utils.ApiUtils.ApiResult;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
    public ApiResult<Long> createBalanceGame(/*@RequestHeader("Authorization") String header,*/ @RequestBody BalanceGameReqDto balanceGameReqDto){
//        String token = header.substring(7);
//        Authentication authentication = jwtTokenProvider.getAuthentication(token);
        Long memberId = 4L;
        log.info(balanceGameReqDto.toString());
        return success(balanceGameService.createBalanceGame(memberId, balanceGameReqDto));
    }

    @Operation(summary = "밸런스게임 전체 조회", description = "전체 밸런스게임을 최신순으로 조회할 수 있습니다. (밸런스게임 고유 Id, 제목) 반환", tags = { "BalanceGame Controller" })
    @GetMapping
    public ApiResult<List<BalanceGameResDto>> getAllBalanceGame(){
        return success(balanceGameService.getAllBalanceGame());
    }

    @Operation(summary = "밸런스게임 상세 조회", description = "밸런스게임을 디테일하게 조회할 수 있습니다.", tags = { "BalanceGame Controller" })
    @GetMapping("/{balanceGameId}")
    public ApiResult<BalanceGameDto> getBalanceGame(@PathVariable("balanceGameId") Long balanceGameId){
        return success(balanceGameService.getBalanceGame(balanceGameId));
    }
}
