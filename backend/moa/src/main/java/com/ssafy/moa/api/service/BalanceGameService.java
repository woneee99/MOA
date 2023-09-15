package com.ssafy.moa.api.service;

import com.ssafy.moa.api.dto.BalanceGameDto;
import com.ssafy.moa.api.dto.BalanceGameResDto;

import java.util.List;

public interface BalanceGameService {
    Long createBalanceGame(Long memberId, BalanceGameDto balanceGameDto);

    List<BalanceGameResDto> getAllBalanceGame();
}
