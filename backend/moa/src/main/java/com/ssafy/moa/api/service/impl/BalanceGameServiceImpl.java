package com.ssafy.moa.api.service.impl;

import com.ssafy.moa.api.dto.BalanceGameDto;
import com.ssafy.moa.api.dto.BalanceGameReqDto;
import com.ssafy.moa.api.dto.BalanceGameListDto;
import com.ssafy.moa.api.dto.BalanceGameResDto;
import com.ssafy.moa.api.entity.BalanceGame;
import com.ssafy.moa.api.entity.BalanceGameList;
import com.ssafy.moa.api.entity.Member;
import com.ssafy.moa.api.repository.BalanceGameListRepository;
import com.ssafy.moa.api.repository.BalanceGameRepository;
import com.ssafy.moa.api.repository.MemberRepository;
import com.ssafy.moa.api.service.BalanceGameService;
import com.ssafy.moa.common.exception.NotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class BalanceGameServiceImpl implements BalanceGameService {

    private final MemberRepository memberRepository;
    private final BalanceGameRepository balanceGameRepository;
    private final BalanceGameListRepository balanceGameListRepository;

    @Override
    @Transactional(rollbackFor = Exception.class)
    public Long createBalanceGame(Long memberId, BalanceGameReqDto balanceGameReqDto) {
        Member member = memberRepository.findByMemberId(memberId)
                .orElseThrow(() -> new NotFoundException("Not Found Member"));

        BalanceGame balanceGame = BalanceGame.builder()
                .balanceGameTitle(balanceGameReqDto.getBalanceGameTitle())
                .balanceGameTime(balanceGameReqDto.getBalanceGameTime())
                .member(member)
                .build();

        for (BalanceGameListDto balanceGameListDto : balanceGameReqDto.getBalanceGameList()){
            BalanceGameList balanceGameList = BalanceGameList.builder()
                    .balanceGameOne(balanceGameListDto.getBalanceGameOne())
                    .balanceGameTwo(balanceGameListDto.getBalanceGameTwo())
                    .balanceOrder(balanceGameListDto.getBalanceOrder())
                    .balanceGame(balanceGame)
                    .build();
            balanceGameListRepository.save(balanceGameList);
        }

        return balanceGameRepository.save(balanceGame).getBalanceGameId();
    }

    @Override
    public List<BalanceGameResDto> getAllBalanceGame() {
        List<BalanceGame> balanceGameList = balanceGameRepository.findAllByOrderByCreatedAtDesc().orElseThrow(() -> new NotFoundException("Not Found Balance Game"));
        List<BalanceGameResDto> result = new ArrayList<>();
        balanceGameList.forEach(e -> {
            result.add(BalanceGameResDto.from(e));
        });
        return result;
    }

    @Override
    public BalanceGameDto getBalanceGame(Long balanceGameId) {
        return balanceGameRepository.findBalanceGame(balanceGameId).orElseThrow(() -> new NotFoundException("Not Found Balance Game Detail"));
    }

    @Override
    @Transactional
    public Long deleteBalanceGame(Long balanceGameId) {
        return balanceGameRepository.deleteByBalanceGameId(balanceGameId);
    }
}
