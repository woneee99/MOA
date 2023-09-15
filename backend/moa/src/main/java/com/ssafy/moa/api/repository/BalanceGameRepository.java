package com.ssafy.moa.api.repository;

import com.ssafy.moa.api.entity.BalanceGame;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BalanceGameRepository extends JpaRepository<BalanceGame, Long> {
    Optional<List<BalanceGame>> findAllByOrderByCreatedAtDesc();

}
