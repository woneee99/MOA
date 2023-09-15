package com.ssafy.moa.api.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class BalanceGameDto {
    private Long balanceGameId;
    private String balanceGameTitle;
    private Integer balanceGameTime;
    private List<BalanceGameListDto> balanceGameList;

    @Builder
    public BalanceGameDto(Long balanceGameId, String balanceGameTitle, Integer balanceGameTime, List<BalanceGameListDto> balanceGameList) {
        this.balanceGameId = balanceGameId;
        this.balanceGameTitle = balanceGameTitle;
        this.balanceGameTime = balanceGameTime;
        this.balanceGameList = balanceGameList;
    }

    @Override
    public String toString() {
        return "BalanceGameDto{" +
                "balanceGameId=" + balanceGameId +
                ", balanceGameTitle='" + balanceGameTitle + '\'' +
                ", balanceGameTime=" + balanceGameTime +
                ", balanceGameList=" + balanceGameList +
                '}';
    }
}
