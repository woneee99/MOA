package com.ssafy.moa.api.repository;

import com.ssafy.moa.api.entity.ExchangeDiary;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ExchangeDiaryRepository extends JpaRepository<ExchangeDiary, Long> {

}
