package com.ssafy.moa.api.repository;

import com.ssafy.moa.api.entity.Article;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ArticleRepository extends JpaRepository<Article, Long> {
}
