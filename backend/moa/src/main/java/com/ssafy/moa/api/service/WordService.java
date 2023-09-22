package com.ssafy.moa.api.service;

import com.ssafy.moa.api.dto.scrap.WordReqDto;

public interface WordService {
    Long createWordScrap(Long memberId, WordReqDto wordReqDto);
}
