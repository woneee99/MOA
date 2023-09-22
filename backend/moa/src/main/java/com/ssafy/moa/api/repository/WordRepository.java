package com.ssafy.moa.api.repository;

import com.ssafy.moa.api.entity.Word;
import org.springframework.data.jpa.repository.JpaRepository;


public interface WordRepository extends JpaRepository<Word, Long> {
}
