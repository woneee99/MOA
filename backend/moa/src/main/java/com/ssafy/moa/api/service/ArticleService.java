package com.ssafy.moa.api.service;

import com.ssafy.moa.api.dto.scrap.ArticleReqDto;

public interface ArticleService {
    Long createArticleScrap(Long memberId, ArticleReqDto articleReqDto);
}
