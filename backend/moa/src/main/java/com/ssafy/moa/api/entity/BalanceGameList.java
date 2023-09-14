package com.ssafy.moa.api.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
public class BalanceGameList {
    @Id
    @Column(name = "balance_game_list_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long balanceGameListId;

    @NotNull
    @Column(name = "balance_game_one")
    private String balanceGameOne;

    @NotNull
    @Column(name = "balance_game_two")
    private String balanceGameTwo;

    @NotNull
    @Column(name = "balance_order")
    private Integer balanceOrder;

    @ManyToOne
    @JoinColumn(name = "balance_game_id", referencedColumnName = "balance_game_id")
    private BalanceGame balanceGame;
}
