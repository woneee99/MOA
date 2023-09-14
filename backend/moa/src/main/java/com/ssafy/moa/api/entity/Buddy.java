package com.ssafy.moa.api.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
public class Buddy {

    @Id
    @Column(name = "buddy_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long buddyId;

    @OneToOne
    @JoinColumn(name = "foreigner_id")
    private Foreigner foreigner;

    @OneToOne
    @JoinColumn(name = "korean_id")
    private Korean korean;
}
