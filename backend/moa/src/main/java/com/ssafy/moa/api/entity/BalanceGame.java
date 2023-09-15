package com.ssafy.moa.api.entity;

import com.ssafy.moa.api.dto.BalanceGameDto;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor
@Table(name = "balance_game")
public class BalanceGame {
    @Id
    @Column(name = "balance_game_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long balanceGameId;

    @NotNull
    @Column(name = "balance_game_title")
    private String balanceGameTitle;

    @Column(name = "balance_game_time")
    private Integer balanceGameTime;

    @NotNull
    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @NotNull
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @ManyToOne
    @JoinColumn(name = "member_id", referencedColumnName = "member_id")
    private Member member;

    @OneToMany(mappedBy = "balanceGame", cascade = CascadeType.ALL)
    private List<BalanceGameList> balanceGameList;

//    @Builder
//    public BalanceGame(Long balanceGameId, String balanceGameTitle, Integer balanceGameTime, LocalDateTime createdAt, LocalDateTime updatedAt, Member member) {
//        this.balanceGameId = balanceGameId;
//        this.balanceGameTitle = balanceGameTitle;
//        this.balanceGameTime = balanceGameTime;
//        this.createdAt = createdAt;
//        this.updatedAt = updatedAt;
//        this.member = member;
//    }

    @Builder
    public BalanceGame(Long balanceGameId, String balanceGameTitle, Integer balanceGameTime, Member member) {
        this.balanceGameId = balanceGameId;
        this.balanceGameTitle = balanceGameTitle;
        this.balanceGameTime = balanceGameTime;
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
        this.member = member;
    }

    public void change(BalanceGameDto bg){
        this.balanceGameTitle = bg.getBalanceGameTitle();
        this.balanceGameTime = bg.getBalanceGameTime();
        this.updatedAt = LocalDateTime.now();
    }

    @Override
    public String toString() {
        return "BalanceGame{" +
                "balanceGameId=" + balanceGameId +
                ", balanceGameTitle='" + balanceGameTitle + '\'' +
                ", balanceGameTime=" + balanceGameTime +
                ", createdAt=" + createdAt +
                ", updatedAt=" + updatedAt +
                ", member=" + member +
                ", balanceGameList=" + balanceGameList +
                '}';
    }
}
