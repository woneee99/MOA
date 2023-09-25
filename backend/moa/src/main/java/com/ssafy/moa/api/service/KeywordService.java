package com.ssafy.moa.api.service;

import com.ssafy.moa.api.dto.KeywordReqDto;

import java.util.List;

public interface KeywordService {
    Long createKeyword(Long memberId, List<KeywordReqDto> keywordList);
}
